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

  const scraped = spec.scraped;
  let measuredSections = "";

  if (scraped) {
    const colorTable =
      scraped.measuredColors.length > 0
        ? [
            "### Measured Color Area Share",
            "| Role | CSS Variable | Hex | Share |",
            "| :--- | :--- | :--- | :--- |",
            ...scraped.measuredColors.map(
              (c) => `| ${c.roleEn} | \`${c.cssVar}\` | \`${c.hex}\` | ${c.share} |`
            )
          ].join("\n")
        : "";

    const typeTable =
      scraped.measuredTypography.length > 0
        ? [
            "### Measured Typography & Free Open-Source Alternatives",
            "| Level | Detected Font | Free Alternative | Size / Weight / Line-Height / Tracking |",
            "| :--- | :--- | :--- | :--- |",
            ...scraped.measuredTypography.map(
              (t) =>
                `| ${t.level} | ${t.detectedFamily} | \`${t.freeAlternative}\` | ${t.size} · ${t.weight} · ${t.lineHeight} · ${t.tracking} |`
            )
          ].join("\n")
        : "";

    const geometryList =
      scraped.measuredGeometry.length > 0
        ? [
            `### Component Geometry & Surface Physics (Container Max Width: \`${scraped.containerMaxWidth}\`)`,
            ...scraped.measuredGeometry.map(
              (g) =>
                `- **${g.targetEn}**: radius \`${g.radius}\` · border \`${g.border}\` · shadow \`${g.shadow}\`${g.extra ? ` · ${g.extra}` : ""}`
            )
          ].join("\n")
        : "";

    const hoverList =
      scraped.hoverDiffs.length > 0
        ? [
            "### Interactive Hover Transitions",
            ...scraped.hoverDiffs.map(
              (h) =>
                `- **${h.targetEn}**: Rest (\`${h.restBg}\` / border \`${h.restBorder}\` / text \`${h.restColor}\`) → Hover (\`${h.hoverBg}\` / border \`${h.hoverBorder}\` / text \`${h.hoverColor}\`) · \`${h.transition}\``
            )
          ].join("\n")
        : "";

    const pagesAnatomy =
      scraped.pages.length > 0
        ? [
            "## 5. Multi-Page Section Anatomy",
            ...scraped.pages.map((pg) => {
              const items = pg.anatomy
                .map((sec) => {
                  const range = sec.bounds
                    ? ` [${sec.bounds.desktop.topPct}%–${(
                        sec.bounds.desktop.topPct + sec.bounds.desktop.heightPct
                      ).toFixed(1)}%]`
                    : "";
                  return `- **${sec.index} ${sec.nameEn}** (${sec.layoutEn}${range}): ${sec.noteEn}`;
                })
                .join("\n");
              return `### Page: ${pg.titleEn} (\`${pg.path}\`)\n${items}`;
            })
          ].join("\n\n")
        : "";

    measuredSections = [
      "## 4. Measured Live DOM Audit",
      colorTable,
      typeTable,
      geometryList,
      hoverList,
      pagesAnatomy
    ]
      .filter(Boolean)
      .join("\n\n");
  }

  const guardrailHeading = scraped
    ? "## 6. Signature Rules & Anti-AI Slop Guardrails"
    : "## 4. Signature Rules & Anti-AI Slop Guardrails";

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
${measuredSections ? `\n${measuredSections}\n` : ""}
${guardrailHeading}
${mustKeep}
${antiAi}
`;
}
