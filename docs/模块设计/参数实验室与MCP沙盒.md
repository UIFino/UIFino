# 参数实验室与MCP沙盒

- **模块定位**：实现可视化前端参数工具台（背景生成器、阴影与表面令牌实验室）以及面向 AI 编程助手的 MCP 协议接入配置与多维智能检索沙盒。
- **对应代码**：`src/features/tools/`、`src/features/mcp/`、`src/app/[locale]/(site)/tools/`、`src/app/[locale]/(site)/mcp/`
- **所属里程碑**：[M5](../roadmap.md#里程碑总览)
- **前端设计规范**：[前端设计](../前端设计.md)
- **当前状态**：已完成
- **最近更新时间**：2026-11-27

## 1. 职责与边界
- **负责**：
  1. 背景生成器（`/tools/background`）：网格、点阵、极光、胶片颗粒四引擎切换，6 套精选预设，画布色/强调色拾色器与间距/强度/扩散/噪点实时滑块，叠加内容开关，以及 CSS / Tailwind 实时高亮代码复制；
  2. 阴影与表面令牌实验室（`/tools/shadow`）：深浅画布切换，4 套高度预设，垂直偏移/环境模糊/阴影不透明度/顶部 1px 内高光/细线边框透明度/表面圆角六维实时滑块，以及 CSS 变量 / Tailwind 代码导出；
  3. MCP 频道（`/mcp`）：Claude Code、Cursor、Windsurf、Codex CLI 四类客户端接入代码一键复制，4 个暴露工具说明，以及按视觉风格、布局骨架、关键词实时匹配图鉴与组件并输出结构化 JSON 响应的交互沙盒。
- **不负责**：底层渐变与阴影数学拼装公式（由 `core/studios/` 承担）及底层检索过滤算法（由 `core/search/` 承担）。

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
- 2026-11-27：新增 `/tools` 四大工作室总览页、「配色对比（`/tools/colors`）」与「字号排版（`/tools/typography`）」两个新工作室及同心圆角换算；接入到AI 频道扩充 `Cline` 配置、`#cli` 命令行速查与 `#prompts` 复刻提示词库。
- 2026-11-27：创建模块设计文档，定义双参数实验室与 MCP 检索沙盒结构。
