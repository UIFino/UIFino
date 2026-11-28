---
name: uifino-template-crafter
description: >-
  为 UIFino「04 模板（Templates）」单点精雕或批量扩充自包含多路由整站与单页模板卡槽（sandbox.tsx 多路由真机视图 + thumbnail.tsx 封面 + meta.ts 积木与目录树配置），自动注册并回写 docs/资产扩充/04-模板/ 三级进度。
  当用户说「精修某套模板」「生产新模板」「按整站工程/单页模板进度表做模板」「跑模板 skill」时激活。
---

# UIFino 模板自包含精雕 Skill (`uifino-template-crafter`)

每套模板必须在自己的独立目录 `src/registry/templates/<slug>/` 内提供**完整的多路由可交互页面视图（`sandbox.tsx`）**与**专属缩略封面（`thumbnail.tsx`）**，彻底告别公共大锅饭占位界面。

## 铁律与红线

1. **多路由与多视口全真闭环**：
   - `sandbox.tsx` 导出 `<PascalSlug>Sandbox({ activePath, mode, isZh })`；
   - `meta.ts` 的 `detailOverride.routePages` 声明了几个路由（如 `/`、`/pricing`、`/docs`、`/changelog`、`/login`），`sandbox.tsx` 必须逐一实现**结构迥异、内容扎实、可直接点击内部导航跳转**的真实子页面，且完整适配 `mode: "dark" | "light"` 与电脑/平板/手机响应式宽度；
   - 严禁使用静态斜角样机图或空洞营销吹嘘文案。
2. **明确关联真实组件积木**：`detailOverride.includedBlocks` 必须映射到 `src/registry/components/` 中真实存在的组件路径（如 `/components/hero/hero-telemetry-counter`），确保用户点击积木卡片能直达对应组件工作台，绝不允许出现 404 死链。
3. **单目录隔离防冲突**：单路会话只允许读写 `src/registry/templates/<slug>/` 目录，汇总注册统一走 [sync-templates-index.mjs](./scripts/sync-templates-index.mjs)。

---

## 标准 4 步作业流

### 第 0 步：读进度表领任务
读取 `docs/资产扩充/04-模板/整站工程.md` 或 `单页模板.md`，将目标 `<slug>` 标记为 `进行中`：
```bash
node .agents/skills/uifino-template-crafter/scripts/update-progress.mjs --id <slug> --status 进行中
```

### 第 1 步：编写多路由真机沙盒 `sandbox.tsx` 与专属封面 `thumbnail.tsx`
在 `src/registry/templates/<slug>/` 下创建：
1. `sandbox.tsx`：按整站 UI 规格完整实现全部路由子页面与交互切换（整站工程建议 `300 ~ 600` 行，单页模板建议 `200 ~ 380` 行）。
2. `thumbnail.tsx`：导出 `<PascalSlug>Thumbnail({ mode })` 渲染列表页高辨识度封面。

### 第 2 步：装填模板名片 `meta.ts`
在 `meta.ts` 中绑定 `SandboxComponent`、`ThumbnailComponent` 与 `detailOverride`（包含 `goodForZh/En`、`notForZh/En`、`routePages`、`includedBlocks`、`directoryTree`）。

### 第 3 步：硬门禁质检、自动汇总索引与三级进度回写
```bash
node .agents/skills/uifino-template-crafter/scripts/validate-template.mjs <slug>
node .agents/skills/uifino-template-crafter/scripts/sync-templates-index.mjs
node .agents/skills/uifino-template-crafter/scripts/update-progress.mjs --id <slug> --status 已完成
pnpm typecheck
```
