import type { CatalogBrandSpec } from "./types";

const DEFAULT_ANTI_AI_EN = [
  "NEVER apply multi-stop purple/cyan rainbow text gradients to headlines.",
  "NEVER replace crisp 1px structural borders with heavy colorful neon outer glows.",
  "NEVER inflate card border-radius beyond the brand's native radius ladder."
];

export function buildDesignMdSections(spec: CatalogBrandSpec): string {
  const spacingLadder = `${spec.spacingScale.join("px · ")}px`;
  const mustKeep = spec.rules.map((rule) => `- **DO**: ${rule}`).join("\n");
  const antiAi = (spec.antiAiRulesEn ?? DEFAULT_ANTI_AI_EN)
    .map((rule) => `- **DON'T**: ${rule}`)
    .join("\n");

  const pageAnatomyBlock = spec.scraped?.pages.length
    ? `\n## 4. Reference Page Anatomy (${spec.scraped.pages[0]!.path})\n` +
      spec.scraped.pages[0]!.anatomy
        .map((sec) => `- **${sec.index} ${sec.nameEn}** (${sec.layoutEn}): ${sec.noteEn}`)
        .join("\n") +
      "\n"
    : "";

  return `# ${spec.name} — DESIGN.md Protocol

## 1. Visual Direction & Fit
${spec.summaryEn}

- **Best Suited For**: ${(spec.goodForEn ?? ["SaaS Marketing", "Product UI", "Changelogs"]).join(" · ")}
- **Avoid Using For**: ${(spec.notForEn ?? ["Discount Marketplaces", "Gamified Arcade Portals"]).join(" · ")}

## 2. Surface & Color Hierarchy
- **Dark Mode**: Canvas \`${spec.dark.canvas}\` · Surface \`${spec.dark.surface}\` · Border \`1px solid ${spec.dark.border}\` · Ink \`${spec.dark.ink}\` · Accent \`${spec.dark.accent}\`
- **Light Mode**: Canvas \`${spec.light.canvas}\` · Surface \`${spec.light.surface}\` · Border \`1px solid ${spec.light.border}\` · Ink \`${spec.light.ink}\` · Accent \`${spec.light.accent}\`

## 3. Typography, Geometry & Spacing
- **Display / Body**: \`${spec.fonts.display}\` (Open-source alternative: \`${spec.openFontAlt ?? "Inter / Geist"}\`), tracking \`${spec.fonts.tracking}\`.
- **Monospace**: \`${spec.fonts.mono}\` with \`font-variant-numeric: tabular-nums\`.
- **Radius & Rhythm**: Default radius \`${spec.defaultRadius}\` (ladder: ${spec.radiusScale.join(", ")}), spacing \`${spacingLadder}\`.
${pageAnatomyBlock}
## 5. Signature Rules & Anti-AI Slop Guardrails
${mustKeep}
${antiAi}
`;
}
