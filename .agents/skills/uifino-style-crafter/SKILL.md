---
name: uifino-style-crafter
description: >-
  为 UIFino「02 设计风格（Styles）」单点精雕或批量扩充大师级专属流派卡槽（showcase.tsx 高定代表作画卷 + thumbnail.tsx 封面 + 双色板协议），完成后自动注册并回写 docs/资产扩充/02-设计风格/ 三级进度。
  当用户说「精修某套风格」「生产新设计风格」「按现代克制/质感先锋进度表做风格」「跑风格 skill」时激活。
---

# UIFino 设计风格高定精雕 Skill (`uifino-style-crafter`)

每套设计风格绝不允许共用粗糙的万能假后台模板，必须在自己的独立目录 `src/registry/styles/<slug>/` 内量身打造**最契合该流派灵魂的高定代表作样板画卷（`showcase.tsx`）**与**专属列表缩略封面（`thumbnail.tsx`）**。

## 铁律与红线

1. **先看真标杆再动笔**：动工前先联网搜索或查阅进度表备注里的 2～3 个真实代表站点，提取该流派真正的字号悬殊比、留白密度、分割线/阴影手法与典型业务语境（例如「人文衬线」做智识长文与写作席，「新粗野派」做撞色数字潮品商店，「细线网格」做精密遥测控制台）。
2. **严格响应动态物理参数**：`showcase.tsx` 与 `thumbnail.tsx` 接收 `{ physics, isZh }` 属性，所有画布底、卡片底、浮层底、边框、主次文字、主按钮色以及卡片圆角/控制圆角/描边粗细**必须绑定 `physics.palette` 与 `physics.cardRadiusPx / ctrlRadiusPx / borderWidthPx`**，确保用户在顶栏切换 `Dark / Light` 明暗模式与 `0~16px` 圆角档位时，整幅画卷实时无死角响应，严禁写死破坏换肤的孤岛背景色。
3. **无障碍对比度硬底线**：`light` 与 `dark` 双套色板必须保证 `ink vs canvas` 对比度 `>= 4.5:1`、`muted vs surface` 对比度 `>= 3.0:1`。
4. **单卡槽隔离防冲突**：单路会话/苦工只允许读写 `src/registry/styles/<slug>/` 目录；多路并发时严禁苦工手改 `src/registry/styles/index.ts`，统一通过 [sync-styles-index.mjs](./scripts/sync-styles-index.mjs) 自动生成。

---

## 标准 5 步作业流

### 第 0 步：读进度表领任务
读取 `docs/资产扩充/02-设计风格/现代克制.md` 或 `质感先锋.md`，挑状态为 `初稿待精修` 或 `待生产` 的目标 `<slug>`，标记为 `进行中`：
```bash
node .agents/skills/uifino-style-crafter/scripts/update-progress.mjs --id <slug> --status 进行中
```

### 第 1 步：编写专属高定样板 `src/registry/styles/<slug>/showcase.tsx`
- 导出组件 `export function <PascalSlug>Showcase({ physics, isZh }: { readonly physics: ResolvedStylePlaygroundPhysics; readonly isZh: boolean })`；
- 构图要求饱满、留白考究、具备真实交互（如标签切换、输入框、折线/柱状精细 SVG 数据图、按钮悬停反馈），代码量建议 `220 ~ 450` 行，彻底杜绝豆腐块 Demo 感；
- 双语支持：所有可见标题、按钮、标签根据 `isZh` 切换地道中英文，严禁出现 `Lorem ipsum` 或自吹口号。

### 第 2 步：编写专属列表缩略图 `src/registry/styles/<slug>/thumbnail.tsx`
- 导出 `export function <PascalSlug>Thumbnail({ physics, isZh }: { readonly physics: ResolvedStylePlaygroundPhysics; readonly isZh: boolean })`；
- 在 `aspect-[16/10]` 容器内浓缩呈现该流派最具辨识度的视觉特征。

### 第 3 步：装填流派名片 `src/registry/styles/<slug>/index.ts`
- 导出 `export const <camelSlug>Style: UiStyleSpec`，挂载 `Showcase: <PascalSlug>Showcase`、`Thumbnail: <PascalSlug>Thumbnail`、`references: [...]`，并配齐双语 `goodForZh/En`、`notForZh/En`、`dosZh/En`、`dontsZh/En` 与经过对比度测算的 `light` / `dark` 色板。

### 第 4 步：运行硬门禁质检、自动注册与三级进度回写
```bash
node .agents/skills/uifino-style-crafter/scripts/validate-style.mjs <slug>
node .agents/skills/uifino-style-crafter/scripts/sync-styles-index.mjs
node .agents/skills/uifino-style-crafter/scripts/update-progress.mjs --id <slug> --status 已完成
pnpm typecheck
```
（多路 `fleet` 并发时，苦工跑完 `validate-style.mjs <slug>` 即交活，由主控统一执行 `sync-styles-index.mjs` 与 `update-progress.mjs --reconcile`。）
