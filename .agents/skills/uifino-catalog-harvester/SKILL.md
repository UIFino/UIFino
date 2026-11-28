---
name: uifino-catalog-harvester
description: >-
  全自动批量采集标杆网站并生成 UIFino「设计图鉴（Catalog）」资产与 DESIGN.md 实测数据。
  支持主控会话经 fleet 多路并发派单，也支持单个苦工对单个公开网站执行「无头浏览器实测抓取 → 视觉校准与双语护栏提炼 → 硬门禁质检」全流程。
  当用户说「批量抓图鉴」「采集网站设计」「跑图鉴 skill」「扩充设计图鉴」「抓某网站进 catalog」时激活。
---

# UIFino 设计图鉴全自动批量产出 Skill (`uifino-catalog-harvester`)

本 Skill 将「逛标杆网站 → 截双端长图与局部切片 → F12 量色值字号圆角 → 写正反设计护栏」固化为可由 AI 集团多路并发、零冲突产出的标准流水线。

## 铁律与红线

1. **零脑补数值**：色号占比、原站字体、字号字重行高字距、圆角阴影、区块百分比坐标必须以 [harvest-site.mjs](./scripts/harvest-site.mjs) 采集出的 `raw-probe.json` 与真实截图为准，禁止凭印象编造。
2. **反爬与验证码即停**：采集脚本或页面截图一旦遇到 Cloudflare Turnstile、reCAPTCHA、hCaptcha、「Verify you are human」或 403 拦截页，**立即停止该站点采集并回报 `BLOCKED_BY_CHALLENGE`**，严禁尝试绕过、点击或等待验证码。
3. **单苦工严格隔离写入范围（防并发冲突）**：
   - 每个苦工只允许读写 `public/catalog/<id>/` 与 `src/registry/catalog/websites/<id>/` 两个专属目录；
   - **严禁苦工修改 `src/registry/catalog/index.ts`** 或任何公共组件代码；公共索引统一由主控在整批收尾时运行 [sync-catalog-index.mjs](./scripts/sync-catalog-index.mjs) 自动生成。
4. **开源平替字体必走白名单**：商业收费字体一律对照 [font-alternatives.md](./references/font-alternatives.md) 映射为可直接免费商用的开源字体组合。
5. **导航与标签短词铁律**：中文分类与适用/慎用短词控制在 2～4 个字（严禁「XX与XX」），整页区块坐标在首页与定价页必须从 `0%` 到 `100%` 连续覆盖，不得留超过 `5%` 的空白死区；**严禁把首屏顶部留白吞进 `01 导航栏`**（导航栏 `heightPct` 换算回真实图片像素高必须等于 `<header>` 自身高度 `44px ~ 115px`，下方留白一律归入 `02 首屏`）。

---

## 模式 A：单个苦工执行单站采集（4 步标准作业）

当你的任务书指定采集单个品牌 `{ id, name, baseUrl, category }` 时，按顺序执行以下 4 步：

### 第 1 步：运行无头浏览器实测探测脚本

```bash
node .agents/skills/uifino-catalog-harvester/scripts/harvest-site.mjs \
  --id <id> \
  --url <baseUrl>
```

（若本机需走代理访问海外站点，可追加 `--proxy http://127.0.0.1:7897` 或设置环境变量 `HTTPS_PROXY`。）

脚本会自动完成：
- 探测公开免登录子页面（`/`、`/pricing`、`/changelog`、`/docs` 或 `/features`、`/login`，最多 4 页）；
- 慢滚触发懒加载并回顶，生成首屏封面 `public/catalog/<id>/cover.jpg`、各子页电脑端（`1440px`）与手机端（`390px`）全长图 `pages/*.jpg`、以及 4～6 张核心区块切片 `sections/*.jpg`；
- 在真实浏览器 DOM 内提取背景/表面/描边/文字/主按钮面积占比色值、原站主色调（`dark` / `light`）、各级标题正文等宽字体的计算样式、按钮/卡片/顶栏几何参数、悬停色差及各页候选区块的 `0% ~ 100%` 百分比坐标，写入 `public/catalog/<id>/raw-probe.json`。

### 第 2 步：对照真机长图与 `raw-probe.json` 视觉核验切块

1. 读取 `public/catalog/<id>/raw-probe.json`，并用读图工具查看 `public/catalog/<id>/cover.jpg`、`pages/home-desktop.jpg` 与其余子页长图。
2. 检查截图是否清晰完整（若发现白屏、人机验证拦截框或整屏遮罩弹窗，按红线处理，绝不拿坏图交差）。
3. 对照长图画面校准每页的 `anatomy`（页面骨架目录）：
   - 将过碎的相邻节点合并为 4～8 个语义清晰的视觉大区块（如「01 吸顶毛玻璃导航栏」「02 居中大字首屏与交互演示窗」）；
   - 确保相邻区块 `topPct + heightPct` 首尾相接覆盖 `0% ~ 100%`（无重叠、无大段空白断档），同时核对手机端 `mobile` 百分比坐标；
   - 每条原语的 `noteZh` / `noteEn` 必须写出从 `raw-probe.json` 读到的具体实测数字（高度、字号、字重、圆角、毛玻璃或边框透明度）。

### 第 3 步：生成品牌规格与实测数据文件

以黄金样板 `src/registry/catalog/websites/linear/index.ts` 与 `scraped.ts` 为精确模板，在 `src/registry/catalog/websites/<id>/` 下写入两个文件：

1. `scraped.ts`：导出 `<camelId>ScrapedData: CatalogScrapedData`（包含校准后的 `pages`、`sections`、`measuredColors`、`measuredTypography`、`measuredGeometry`、`hoverDiffs`，全部基于 `raw-probe.json` 实测值整理，清理掉临时探测噪音后删除 `public/catalog/<id>/raw-probe.json`）。
2. `index.ts`：导出 `<camelId>Spec: CatalogBrandSpec`：
   - 必填 `defaultTheme`（按原站真实画布明暗填 `"dark"` 或 `"light"`）、`coverImg: "/catalog/<id>/cover.jpg"`、`logoSvg`（优先取 `raw-probe.json` 抓到的干净单色 `<svg>`，控制在 4KB 内）；
   - 配齐 `light` 与 `dark` 两套 7 色语义色板（若原站仅单主题，主主题用实测色值，另一套按品牌色相推导高对比度合规对应色板）；
   - 对照 [font-alternatives.md](./references/font-alternatives.md) 填写 `openFontAlt`（格式如 `"Inter + JetBrains Mono"`）；
   - 撰写针锋相对的 4～6 条 `rules` / `rulesZh`（必守特征，含具体数值）与 4～6 条 `antiAiRulesEn` / `antiAiRulesZh`（针对该品牌调性的防 AI 味死命令）。

### 第 4 步：运行单站硬门禁质检

```bash
node .agents/skills/uifino-catalog-harvester/scripts/validate-brand.mjs <id>
```

- 输出 `[PASS] <id>` 才算通过；若报任何 `[FAIL]`（如缺图、坐标断档、色号非法、缺字段），当场修正后重跑直至全绿。
- 苦工严禁执行 `git commit` 或修改 `src/registry/catalog/index.ts`。

---

## 模式 B：主控会话经 `fleet` 派 AI 集团批量生产

当用户要求批量抓取一批标杆网站时，主控会话按 `fleet-dispatch` 规矩组织流水线：

1. **选定批次名单**：从 [benchmark-websites-pool.md](./references/benchmark-websites-pool.md) 挑选本批目标（建议每批 8～12 个互不重叠的网站，一站一苦工）。
2. **生成任务书并并发派单**：
   - 将任务书写入 `.fleet/briefs/harvest-<id>.md`（确保 `.fleet/` 在 `.gitignore` 中）；
   - 任务书明确给出：目标 `{ id, name, baseUrl, category }`、要求读取并严格按 `.agents/skills/uifino-catalog-harvester/SKILL.md`「模式 A」四步执行、只准写 `public/catalog/<id>/` 与 `src/registry/catalog/websites/<id>/`、跑过 `validate-brand.mjs <id>` 后交活、严禁跑 git。
   - 多路并发启动：
     ```bash
     fleet run --role worker --title "采集图鉴：Linear" --prompt-file .fleet/briefs/harvest-linear.md
     ```
3. **回收质检与一键汇总注册**：
   - 用 `fleet wait <编号...> --any` 回收完成的苦工，逐个复核 `node .agents/skills/uifino-catalog-harvester/scripts/validate-brand.mjs <id>`；
   - 整批通过后，主控运行一次自动索引汇总与全量项目门禁：
     ```bash
     node .agents/skills/uifino-catalog-harvester/scripts/sync-catalog-index.mjs
     pnpm gate
     ```
   - 门禁全绿后按批次提交代码与 `public/catalog/` 截图资产。
