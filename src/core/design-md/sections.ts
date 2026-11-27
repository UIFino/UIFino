import type { CatalogBrandSpec } from "./types";

export function buildDesignMdSections(spec: CatalogBrandSpec): string {
  const spacingLadder = `${spec.spacingScale.join("px · ")}px`;
  const guardrails = spec.rules.map((rule, idx) => `${idx + 1}. ${rule}`).join("\n");

  return `# ${spec.name} — DESIGN.md Protocol

## 1. Visual Direction
${spec.summaryEn}

## 2. Surface & Color Rules
- **Light Canvas / Surface**: \`${spec.light.canvas}\` / \`${spec.light.surface}\` with \`1px solid ${spec.light.border}\` dividers.
- **Dark Canvas / Surface**: \`${spec.dark.canvas}\` / \`${spec.dark.surface}\` with \`1px solid ${spec.dark.border}\` dividers.
- **Single Chromatic Accent**: \`${spec.dark.accent}\` (dark) / \`${spec.light.accent}\` (light) — never pair with arbitrary secondary gradients.

## 3. Typography & Rhythm
- Display face \`${spec.fonts.display}\` with \`${spec.fonts.tracking}\` tracking; body copy in \`${spec.fonts.body}\`; numeric data in \`${spec.fonts.mono}\` (\`tabular-nums\`).
- Base spacing ladder: \`${spacingLadder}\`. Default container radius: \`${spec.defaultRadius}\`.

## 4. Implementation Guardrails for AI Agents
${guardrails}
`;
}
