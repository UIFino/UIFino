# 参数实验室与MCP沙盒

- **模块定位**：实现可视化前端参数工具台（背景生成器、阴影与表面令牌实验室）以及面向 AI 编程助手的 MCP 协议接入配置与多维智能检索沙盒。
- **对应代码**：`src/features/tools/`、`src/features/mcp/`、`src/app/[locale]/(site)/tools/`、`src/app/[locale]/(site)/mcp/`
- **所属里程碑**：[M7](../roadmap.md#里程碑总览)
- **前端设计规范**：[前端设计](../前端设计.md)
- **当前状态**：已完成
- **最近更新时间**：2026-11-28

## 1. 职责与边界
- **负责**：
  1. 五大参数工作室（`/tools` 与 `/tools/{background,shadow,colors,typography,motion}`）：支持「载入站内图鉴/风格参数」与「带入组件库工作台」双向互通；背景纹理支持四引擎与四周径向渐隐遮罩；多层阴影支持三档成套高度（卡片/下拉/弹窗）+ 顶光内边 + 磨砂模糊 + 可视化同心圆角卡尺；配色对比支持 OKLCH 50–950 智能锚定色阶 + 冷暖中性灰 + 微缩组件群实时换肤 + 4 组 AA/AAA 对比度矩阵；字号排版支持固定比例与 Utopia 流体 `clamp()` 字阶/间距 + 开源字体三件套；交互动效支持「匀速对照组 vs 当前曲线」双轨同台赛跑及 `linear()` 原生 CSS 弹簧导出；
  2. AI 接入四环交付（`/mcp`、`/api/mcp`、`/r/*`、`scripts/uifino-cli.mjs`）：① 免登录零密钥的 `/api/mcp` Streamable HTTP（JSON-RPC 2.0）端点暴露 5 个真实工具；② 兼容 `shadcn` 的 `/r/registry.json` 与 `/r/[name]` 静态注册表接口及轻量 `uifino-cli.mjs`；③ `#skill` 防丑护栏规则包（Claude Skill / Cursor `.mdc` / `AGENTS.md` / `DESIGN.md`）；④ `#sandbox` 真机透明检索沙盒与免配置单次完整施工指令。
- **不负责**：底层渐变、OKLCH、弹簧与阴影数学拼装公式（由 `core/studios/` 承担）及底层注册表序列化与检索算法（由 `core/ai-delivery/` 与 `core/search/` 承担）。

## 2. 结构与数据流
- `/tools` 默认重定向至 `/tools/background`，工具栏切换工作室时通过路由 `/tools/[studio]` 切换，同时支持悬停大菜单通过 `?preset=...` 查询参数一键载入指定预设。
- MCP 页支持从顶部大菜单带 `?client=cursor` 等参数直达对应客户端配置面板，沙盒命中结果支持一键跳入对应品牌图鉴详情或组件工作台。

## 3. 关键决策
- 每个实验室（`background-studio/`、`shadow-studio/`）独立成目录并共享 `studio-layout/` 工具栏壳层，后续新增排版阶梯或配色对比度实验室只需平行添加子目录。

## 4. 当前实现
- 已完成 `features/tools/{studio-layout,background-studio,shadow-studio}/` 与 `features/mcp/{client-setup,query-sandbox}/` 及对应多语言路由，远程 `pnpm gate`（`tsc` + `eslint` + `vitest` + `next build` 129 个静态页面预渲染）全部通过。

## 5. 验证方式
- 拖动各实验室滑块与切换预设，验证画布与代码框零卡顿同步更新；测试 MCP 客户端切换与检索沙盒过滤结果跳转，最后运行 `pnpm gate` 并完成全站截图核验。

## 6. 待扩展项
- 在 `/api/mcp` 提供真实可被编辑器直接连接的 MCP Streamable HTTP 端点。

## 7. 改动历史
- 2026-11-28：落地第 5 工作室「交互动效（`/tools/motion`）」并全面升级背景遮罩、三档阴影与圆角卡尺、OKLCH 色阶与组件体检、Utopia 流体字阶；落地「接入到 AI」四环体系（真实 `/api/mcp` JSON-RPC 端点、`/r/registry.json` 与 `/r/[name]` 兼容注册表、`scripts/uifino-cli.mjs`、Skill/Rules 护栏包与透明检索沙盒）。
- 2026-11-27：新增 `/tools` 四大工作室总览页、「配色对比（`/tools/colors`）」与「字号排版（`/tools/typography`）」两个新工作室及同心圆角换算；接入到AI 频道扩充 `Cline` 配置、`#cli` 命令行速查与 `#prompts` 复刻提示词库。
- 2026-11-27：创建模块设计文档，定义双参数实验室与 MCP 检索沙盒结构。
