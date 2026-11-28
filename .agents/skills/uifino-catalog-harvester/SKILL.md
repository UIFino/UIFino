---
name: uifino-catalog-harvester
description: >-
  全自动批量采集标杆网站并生成 UIFino「设计图鉴（Catalog）」资产与 DESIGN.md 实测数据，完成后自动回写 docs/资产扩充/01-设计图鉴/ 下的分类文档与三级总览。
  支持主控会话按行业分类文档经 fleet 多路并发派单，也支持单个会话按指定行业文档执行「读分类表 → 无头浏览器实测抓取 → 视觉校准与双语护栏提炼 → 像素级硬门禁质检 → 回写三级进度」全闭环。
  当用户说「批量抓图鉴」「按进度表抓网站」「抓开发工具/金融支付图鉴」「跑图鉴 skill」「扩充设计图鉴」时激活。
---

# UIFino 设计图鉴全自动批量产出 Skill (`uifino-catalog-harvester`)

本 Skill 以 **[docs/资产扩充/01-设计图鉴/\_总览.md](../../../docs/资产扩充/01-设计图鉴/_总览.md)** 及其下属 6 份行业独立文档（`人工智能.md` · `开发工具.md` · `效率办公.md` · `金融支付.md` · `内容社区.md` · `生活出行.md`）为任务账本，一行业一文档、互不冲突。

## 铁律与红线

1. **三级进度回写铁律**：开工前必读目标行业文档（如 `docs/资产扩充/01-设计图鉴/开发工具.md`）；采集通过门禁或受阻跳过后，**必须运行 [update-progress.mjs](./scripts/update-progress.mjs) 自动同步刷新「行业子文档 → `01-设计图鉴/_总览.md` → `docs/资产扩充/README.md`」三级进度数字**，未更新进度表不算完工。
2. **零脑补数值**：色号占比、原站字体、字号字重行高字距、圆角阴影、区块百分比坐标必须以 [harvest-site.mjs](./scripts/harvest-site.mjs) 采集出的 `raw-probe.json` 与真实截图为准，禁止凭印象编造。
3. **反爬与验证码即停**：采集脚本或页面截图一旦遇到 Cloudflare Turnstile、reCAPTCHA、hCaptcha、「Verify you are human」或 403 拦截页，**立即停止该站点采集**，严禁尝试绕过、点击或等待验证码；运行 `update-progress.mjs --id <id> --status 受阻跳过 --note "<拦截原因>"` 留痕并切下一个站点。
4. **像素级边界与短词铁律**：
   - 中文分类与适用/慎用短词控制在 2～4 个字（严禁「XX与XX」）；
   - 首页与定价页区块坐标必须从 `0%` 到 `100%` 连续覆盖，不得留超过 `5%` 的空白死区；
   - **严禁把首屏顶部留白吞进 `01 导航栏`**：导航栏 `heightPct` 换算回真实图片像素高必须等于 `<header>` 自身高度（`40px ~ 115px`），下方留白一律归入 `02 首屏`。
5. **开源平替字体必走白名单**：商业收费字体一律对照 [font-alternatives.md](./references/font-alternatives.md) 映射为免费开源商用字体组合。

---

## 模式 A：单会话按行业文档执行（如「把开发工具里前 5 个抓完」）

1. **第 0 步：读对应行业文档领任务**
   - 读取 `docs/资产扩充/01-设计图鉴/<行业>.md`（未指明行业时先看 `_总览.md`），挑状态为 `待采集` 的站点，标记为 `进行中`：
     ```bash
     node .agents/skills/uifino-catalog-harvester/scripts/update-progress.mjs --id <id> --status 进行中
     ```
2. **第 1 步：运行无头浏览器实测探测脚本**
   ```bash
   node .agents/skills/uifino-catalog-harvester/scripts/harvest-site.mjs --id <id> --url <baseUrl>
   ```
   （海外站点需要代理时追加 `--proxy http://127.0.0.1:7897` 或设置 `HTTPS_PROXY`；若退出码为 `4` 报 `BLOCKED_BY_CHALLENGE`，运行 `update-progress.mjs --id <id> --status 受阻跳过 --note "人机验证拦截"` 并切下一个站点。）
3. **第 2 步：对照真机长图与 `raw-probe.json` 校准切块并生成资产文件**
   - 查看 `public/catalog/<id>/cover.jpg`、`pages/*-desktop.jpg` 与 `raw-probe.json`；
   - 对照 `src/registry/catalog/websites/linear/index.ts` 与 `scraped.ts` 黄金样板，在 `src/registry/catalog/websites/<id>/` 下生成 `scraped.ts` 与 `index.ts`（完成后删除临时 `public/catalog/<id>/raw-probe.json`）。
4. **第 3 步：跑像素级硬门禁质检**
   ```bash
   node .agents/skills/uifino-catalog-harvester/scripts/validate-brand.mjs <id>
   ```
5. **第 4 步：同步总索引 + 自动汇总三级进度文档（必做收尾）**
   ```bash
   node .agents/skills/uifino-catalog-harvester/scripts/sync-catalog-index.mjs
   node .agents/skills/uifino-catalog-harvester/scripts/update-progress.mjs --id <id> --status 已完成
   pnpm typecheck
   ```

---

## 模式 B：主控会话经 `fleet` 派 AI 集团多路并发生产

1. **主控领单**：从 `docs/资产扩充/01-设计图鉴/<行业>.md` 挑出本批 `待采集` 的 8～12 个网站，统一标为 `进行中`。
2. **并发派发单站苦工**：每个苦工只允许读写专属目录 `public/catalog/<id>/` 与 `src/registry/catalog/websites/<id>/` 并跑过 `validate-brand.mjs <id>`，**严禁苦工碰公共索引、进度文档或 git**。
3. **主控回收并一键汇总三级进度**：
   ```bash
   node .agents/skills/uifino-catalog-harvester/scripts/sync-catalog-index.mjs
   node .agents/skills/uifino-catalog-harvester/scripts/update-progress.mjs --reconcile
   pnpm gate
   ```
   确认行业子表、`_总览.md` 与 `docs/资产扩充/README.md` 统计全部更新无误后提交。
