import type { UiStyleSpec } from "./types";

function formatPaletteBlock(label: string, p: UiStyleSpec["dark"]): string {
  return [
    `### ${label}`,
    `- **Canvas**: \`${p.canvas}\``,
    `- **Surface**: \`${p.surface}\``,
    `- **Elevated**: \`${p.elevated}\``,
    `- **Border**: \`${p.border}\``,
    `- **Primary Ink**: \`${p.ink}\``,
    `- **Muted Ink**: \`${p.muted}\``,
    `- **Accent**: \`${p.accent}\` (Foreground \`${p.accentFg}\`)`
  ].join("\n");
}

export function compileStyleDesignMd(style: UiStyleSpec): string {
  const scenariosYaml = style.scenarios.map((s) => `"${s}"`).join(", ");
  const dosBlock = style.dosEn.map((rule) => `- **DO**: ${rule}`).join("\n");
  const dontsBlock = style.dontsEn.map((rule) => `- **DON'T**: ${rule}`).join("\n");

  return `---
protocol: "DESIGN.md"
version: "1.0"
kind: "ui-style"
slug: "${style.slug}"
name: "${style.name}"
name_zh: "${style.nameZh}"
group: "${style.group}"
primary_tone: "${style.primaryTone}"
default_radius: "${style.defaultRadius}px"
surface_effect: "${style.surfaceEffect}"
scenarios: [${scenariosYaml}]
---

# ${style.name} (${style.nameZh}) — UI Style Protocol

${style.summaryEn}

## 1. Visual Physics & Surface Signature
- **Default Radius**: \`${style.defaultRadius}px\` (${style.radiusLabelEn})
- **Border Contract**: \`${style.borderSpec}\`
- **Elevation & Shadow**: \`${style.shadowSpec}\`
- **Surface Material**: \`${style.surfaceEffect}\`

## 2. Dual-Mode Color Tokens

${formatPaletteBlock("Dark Mode Tokens", style.dark)}

${formatPaletteBlock("Light Mode Tokens", style.light)}

## 3. Typography Pairing
- **Display Font**: ${style.fonts.display} (tracking \`${style.fonts.tracking}\`)
- **Body Font**: ${style.fonts.body}
- **Monospace / Metrics**: ${style.fonts.mono} (\`font-variant-numeric: tabular-nums\`)

## 4. Implementation Guardrails
${dosBlock}
${dontsBlock}
`;
}
