import type { ResolvedWorkbenchTokens } from "@/core/tokens";
import type { ComponentAssetMeta, ComponentCategoryMeta } from "./types";

export interface CompileAiPromptInput {
  readonly item: ComponentAssetMeta;
  readonly category: ComponentCategoryMeta;
  readonly tokens: ResolvedWorkbenchTokens;
  readonly pascalName: string;
  readonly componentCode: string;
  readonly demoCode: string;
  readonly cssTokens: string;
  readonly dependencies: readonly string[];
  readonly isZh?: boolean;
}

/**
 * Compiles a 6-in-1 self-contained AI coding instruction so Claude Code / Cursor / Codex
 * can install dependencies, wire tokens, and drop the pure component in without follow-up questions.
 */
export function compileComponentAiPrompt({
  item,
  category,
  tokens,
  pascalName,
  componentCode,
  demoCode,
  cssTokens,
  dependencies,
  isZh = true
}: CompileAiPromptInput): string {
  const installLine =
    dependencies.length > 0
      ? `pnpm add ${dependencies.join(" ")}`
      : isZh
        ? "无额外第三方运行时依赖（仅 React 19 + Tailwind CSS）"
        : "Zero extra runtime dependencies (React + Tailwind CSS only)";

  if (isZh) {
    return `# AI 组件施工指令 — ${item.nameZh ?? item.name} (${pascalName})

请直接按以下 6 条规范完成落地，不要向我反问或省略代码：

## 1. 对齐项目现有 CSS 变量（严禁硬编码孤岛色）
- 若目标项目 \`globals.css\` 已有设计令牌，请将本组件使用的 \`--ui-canvas\`、\`--ui-surface\`、\`--ui-border\`、\`--ui-ink\`、\`--ui-muted\`、\`--ui-accent\` 映射到项目既有变量。
- 当前工作台实时选定参数：皮肤 \`${tokens.skinName}\`（${tokens.mode}）、卡片圆角 \`${tokens.card}\`、密度 \`${tokens.density}\`（卡片内边距 \`${tokens.padCard}\`）。

## 2. 安装外部依赖
\`\`\`bash
${installLine}
\`\`\`

## 3. 写入或合并所需 CSS 变量（\`tokens.css\`）
\`\`\`css
${cssTokens}
\`\`\`

## 4. 拆分落地纯组件与示例文件
请分别写入 \`src/components/${category.id}/${pascalName}.tsx\`（纯组件本体，严禁写死大段业务假数据）与调用示例：

### \`${pascalName}.tsx\`
\`\`\`tsx
${componentCode}
\`\`\`

### \`${pascalName}Demo.tsx\`
\`\`\`tsx
${demoCode}
\`\`\`

## 5. 客户端边界与响应式/无障碍要求
- 如包含点击态、键盘导航或动画状态，顶部保留 \`"use client"\`。
- 所有交互控件必须有可见 \`focus-visible\` 焦点环，数字使用 \`tabular-nums\` 防止抖动，长文本使用 \`min-w-0\` + \`truncate\` 防撑爆。

## 6. 最小调用方式
\`\`\`tsx
import { ${pascalName}Demo } from "@/components/${category.id}/${pascalName}Demo";
export default function Page() {
  return <${pascalName}Demo />;
}
\`\`\``;
  }

  return `# AI Component Implementation Prompt — ${item.name} (${pascalName})

Implement this component directly without asking clarifying questions:

## 1. Bind to Existing Project CSS Variables (No Hardcoded Isolated Hex)
- Map \`--ui-canvas\`, \`--ui-surface\`, \`--ui-border\`, \`--ui-ink\`, \`--ui-muted\`, \`--ui-accent\` to your project's active design system tokens.
- Active Workbench Preset: Skin \`${tokens.skinName}\` (${tokens.mode}), Radius \`${tokens.card}\`, Density \`${tokens.density}\` (\`${tokens.padCard}\`).

## 2. Install External Dependencies
\`\`\`bash
${installLine}
\`\`\`

## 3. Merge CSS Token Variables (\`tokens.css\`)
\`\`\`css
${cssTokens}
\`\`\`

## 4. Create Pure Component & Separated Demo
Write \`src/components/${category.id}/${pascalName}.tsx\` (clean reusable component without hardcoded mock arrays) and \`${pascalName}Demo.tsx\`:

### \`${pascalName}.tsx\`
\`\`\`tsx
${componentCode}
\`\`\`

### \`${pascalName}Demo.tsx\`
\`\`\`tsx
${demoCode}
\`\`\`

## 5. Client Boundary, Responsiveness & Accessibility
- Keep \`"use client"\` if interactive hooks are used.
- Ensure keyboard \`focus-visible\` rings, \`tabular-nums\` on numeric counters, and \`min-w-0\` overflow safety on all flex/grid children.

## 6. Minimal Drop-In Usage
\`\`\`tsx
import { ${pascalName}Demo } from "@/components/${category.id}/${pascalName}Demo";
export default function Page() {
  return <${pascalName}Demo />;
}
\`\`\``;
}
