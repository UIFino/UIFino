---
name: uifino-component-crafter
description: >-
  为 UIFino「03 组件库（Components）」单点精雕或批量扩充自包含真实组件卡槽（component.tsx 纯组件 + demo.tsx 多态演示 + source.ts 原文包 + meta.ts 参数护栏），自动注册并回写 docs/资产扩充/03-组件库/ 三级进度。
  当用户说「精修某个组件」「生产新组件」「按官网区块/功能模块/交互动效进度表做组件」「跑组件 skill」时激活。
---

# UIFino 组件库自包含精雕 Skill (`uifino-component-crafter`)

每个组件必须在自己的独立目录 `src/registry/components/<大类>/<细分类>/<slug>/` 内提供**真实可编译、零假数据污染的纯组件文件（`component.tsx`）**与**多状态实时演示文件（`demo.tsx`）**，通过打包脚本直接将真实源码原文供网页预览、复制、CLI 与 MCP 输出，彻底告别拼凑假代码。

## 铁律与红线

1. **纯组件与演示数据严格分家**：
   - `component.tsx` 只放可复用的干净业务组件与 Props 类型定义，所有示例数据必须经 Props 传入，严禁在纯组件内部写死业务假文案或 `DESIGN.MD VERIFIED` 等自夸徽章；
   - `demo.tsx` 导入 `component.tsx` 注入高水准真实产品级中英示例数据，并接收 `{ tokens, viewport, compact, stateView, replayKey }` 支持工作台实时换肤、圆角密度微调与状态切换（`blocks` 类必须实现贴合自身结构的真实加载骨架/空状态 `stateView`）。
2. **全面响应动态令牌**：颜色、圆角、内边距一律绑定工作台传入的 `tokens` 或语义 CSS 变量，严禁写死破坏换肤的孤岛霓虹色；所有统计指标、价格、时间开启 `tabular-nums`，长文本处理截断溢出。
3. **单目录隔离防冲突**：单路会话只允许读写 `src/registry/components/<sections|blocks|motion>/<cat>/<slug>/` 目录，分类汇总统一走 [sync-components-index.mjs](./scripts/sync-components-index.mjs)。

---

## 标准 5 步作业流

### 第 0 步：读进度表领任务
读取 `docs/资产扩充/03-组件库/` 下的 `官网区块.md`、`功能模块.md` 或 `交互动效.md`，标记目标 `<slug>` 为 `进行中`：
```bash
node .agents/skills/uifino-component-crafter/scripts/update-progress.mjs --id <slug> --status 进行中
```

### 第 1 步：编写纯组件 `component.tsx` 与多态演示 `demo.tsx`
在 `src/registry/components/<sections|blocks|motion>/<cat>/<slug>/` 下创建：
1. `component.tsx`：导出 `<PascalSlug>` 组件与 `<PascalSlug>Props` 接口。
2. `demo.tsx`：导出 `<PascalSlug>Demo` 演示组件，完整响应 `tokens`（画布/卡片/描边/字色/焦点色/圆角/密度）、`compact` 紧凑态、`stateView`（功能模块真实加载/空状态）与 `replayKey` 动效重播。

### 第 2 步：一键打包真实源码原文 `source.ts`
运行源码打包器，自动读取 `component.tsx` 和 `demo.tsx` 原文件生成零转义失真的 `source.ts`：
```bash
node .agents/skills/uifino-component-crafter/scripts/bundle-source.mjs <sections|blocks|motion>/<cat>/<slug>
```

### 第 3 步：更新 `meta.ts` 绑定自包含卡槽
在同目录 `meta.ts` 中导入 `DemoComponent`（自 `./demo`）与 `filesSource`（自 `./source`），配齐地道中文名 `nameZh`、双语护栏 `contract` / `contractZh`、`dependencies`（如 `["lucide-react"]`）以及标准 4 列 `propsSpec`。

### 第 4 步：硬门禁质检、自动汇总分类索引与三级进度回写
```bash
node .agents/skills/uifino-component-crafter/scripts/validate-component.mjs <slug>
node .agents/skills/uifino-component-crafter/scripts/sync-components-index.mjs
node .agents/skills/uifino-component-crafter/scripts/update-progress.mjs --id <slug> --status 已完成
pnpm typecheck
```
