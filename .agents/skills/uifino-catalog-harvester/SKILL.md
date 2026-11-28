---
name: uifino-catalog-harvester
description: >-
  全自动批量采集标杆网站并生成 UIFino「设计图鉴（Catalog）」资产与 DESIGN.md 实测数据，完成后自动回写 docs/图鉴采集进度.md。
  支持主控会话按进度表经 fleet 多路并发派单，也支持单个会话按进度表逐个或分批执行「读进度表 → 无头浏览器实测抓取 → 视觉校准与双语护栏提炼 → 像素级硬门禁质检 → 更新进度表」全闭环。
  当用户说「批量抓图鉴」「按进度表抓网站」「采集网站设计」「跑图鉴 skill」「扩充设计图鉴」「抓某网站进 catalog」时激活。
---

# UIFino 设计图鉴全自动批量产出 Skill (`uifino-catalog-harvester`)

本 Skill 以 **[docs/图鉴采集进度.md](../../../docs/图鉴采集进度.md)** 为唯一任务源与进度账本，将「挑待采集网站 → 截双端长图与切片 → 浏览器实测样式与坐标 → 像素级门禁质检 → 回写进度文档」串成零漏单闭环。

## 铁律与红线

1. **进度表闭环铁律**：开工前必读 [docs/图鉴采集进度.md](../../../docs/图鉴采集进度.md)；采集通过门禁或受阻跳过后，**必须更新 `docs/图鉴采集进度.md` 对应行的状态、采集页数、日期及顶部统计数字**，未更新进度表不算完工。
2. **零脑补数值**：色号占比、原站字体、字号字重行高字距、圆角阴影、区块百分比坐标必须以 [harvest-site.mjs](./scripts/harvest-site.mjs) 采集出的 `raw-probe.json` 与真实截图为准，禁止凭印象编造。
3. **反爬与验证码即停**：采集脚本或页面截图一旦遇到 Cloudflare Turnstile、reCAPTCHA、hCaptcha、「Verify you are human」或 403 拦截页，**立即停止该站点采集**，禁止尝试绕过、点击或等待验证码；单会话模式下直接运行 `update-progress.mjs --id <id> --status 受阻跳过 --note "<拦截原因>"` 留痕，多路苦工模式下回报 `BLOCKED_BY_CHALLENGE` 由主控统一记入进度表。
4. **像素级边界与短词铁律**：
   - 中文分类与适用/慎用短词控制在 2～4 个字（严禁「XX与XX」）；
   - 首页与定价页区块坐标必须从 `0%` 到 `100%` 连续覆盖，不得留超过 `5%` 的空白死区；
   - **严禁把首屏顶部留白吞进 `01 导航栏`**：导航栏 `heightPct` 换算回真实图片像素高必须等于 `<header>` 自身高度（`40px ~ 115px`），下方留白一律归入 `02 首屏`。
5. **开源平替字体必走白名单**：商业收费字体一律对照 [font-alternatives.md](./references/font-alternatives.md) 映射为免费开源商用字体组合。

---

## 模式 A：单会话直接执行（用户说「按进度表抓 N 个」或「抓某网站」）

1. **第 0 步：读进度表领任务**
   - 读取 `docs/图鉴采集进度.md`，若用户未指定具体品牌，按顺序挑选状态为 `待采集` 的目标站点，先运行：
     ```bash
     node .agents/skills/uifino-catalog-harvester/scripts/update-progress.mjs --id <id> --status 进行中
     ```
2. **第 1 步：运行无头浏览器实测探测脚本**
   ```bash
   node .agents/skills/uifino-catalog-harvester/scripts/harvest-site.mjs --id <id> --url <baseUrl>
   ```
   （海外站点需要代理时追加 `--proxy http://127.0.0.1:7897` 或设置 `HTTPS_PROXY`；若退出码为 `4` 报 `BLOCKED_BY_CHALLENGE`，立即运行 `update-progress.mjs --id <id> --status 受阻跳过 --note "人机验证拦截"` 并切下一个站点。）
3. **第 2 步：对照真机长图与 `raw-probe.json` 校准切块并生成资产文件**
   - 查看 `public/catalog/<id>/cover.jpg`、`pages/*-desktop.jpg` 与 `raw-probe.json`；
   - 对照 `src/registry/catalog/websites/linear/index.ts` 与 `scraped.ts` 黄金样板，在 `src/registry/catalog/websites/<id>/` 下生成 `scraped.ts` 与 `index.ts`（配齐 `defaultTheme`、`coverImg`、`logoSvg`、深浅双 7 色色板、`openFontAlt`、双语 `rules` 与 `antiAiRules`，完成后删掉临时 `public/catalog/<id>/raw-probe.json`）。
4. **第 3 步：跑像素级硬门禁质检**
   ```bash
   node .agents/skills/uifino-catalog-harvester/scripts/validate-brand.mjs <id>
   ```
   （脚本会自动校验图片文件大小、反算导航栏与各区块真实像素高度、交叉核对切片尺寸与文案声明像素值；报错必须当场修到 `[PASS]`。）
5. **第 4 步：同步总索引 + 回写进度表（必做收尾）**
   ```bash
   node .agents/skills/uifino-catalog-harvester/scripts/sync-catalog-index.mjs
   node .agents/skills/uifino-catalog-harvester/scripts/update-progress.mjs --id <id> --status 已完成
   pnpm typecheck
   ```

---

## 模式 B：主控会话经 `fleet` 派 AI 集团多路并发生产

多路苦工并行时，为彻底避免多个苦工同时抢改同一个文件引发冲突，**共享文件统一由主控会话读写**：

1. **主控领单与标记**：
   - 主控从 `docs/图鉴采集进度.md` 挑出本批 `待采集` 的 8～12 个网站，先把它们在进度表中标记为 `进行中`。
2. **主控并发派发单站苦工**：
   - 为每个站生成任务书 `.fleet/briefs/harvest-<id>.md`（要求苦工只读写专属目录 `public/catalog/<id>/` 与 `src/registry/catalog/websites/<id>/`，跑完上面第 1～3 步并通过 `validate-brand.mjs <id>`，**严禁苦工修改 `src/registry/catalog/index.ts`、`docs/图鉴采集进度.md` 或执行 git 命令**）。
   - 多路并发启动：
     ```bash
     fleet run --role worker --title "采集图鉴：<Name>" --prompt-file .fleet/briefs/harvest-<id>.md
     ```
3. **主控回收质检、汇总索引并一键更新进度文档**：
   - 用 `fleet wait <编号...> --any` 回收结果：
     - 对通过 `validate-brand.mjs <id>` 的站点，记入通过名单；
     - 对回报 `BLOCKED_BY_CHALLENGE` 的站点，主控运行 `node .agents/skills/uifino-catalog-harvester/scripts/update-progress.mjs --id <id> --status 受阻跳过 --note "<原因>"`。
   - 本批全部回收后，主控统一执行一次总索引同步、进度表全量自动对账与项目门禁：
     ```bash
     node .agents/skills/uifino-catalog-harvester/scripts/sync-catalog-index.mjs
     node .agents/skills/uifino-catalog-harvester/scripts/update-progress.mjs --reconcile
     pnpm gate
     ```
   - 确认 `docs/图鉴采集进度.md` 状态与顶部完成数准确无误后，连同新增资产一起提交。
