import type { CatalogBrandSpec } from "./types";

export function serializeDesignMdFrontmatter(spec: CatalogBrandSpec): string {
  const siteUrl = spec.siteUrl ?? (spec.kind === "website" ? `https://${spec.slug}` : "");
  const goodFor = (spec.goodForEn ?? ["Product Marketing", "Developer Console"])
    .map((s) => `"${s}"`)
    .join(", ");
  const avoidFor = (spec.notForEn ?? ["Flash-Sale E-Commerce", "Dense Ad Portals"])
    .map((s) => `"${s}"`)
    .join(", ");

  return `---
protocol: uifino/design-md@2.0
name: "${spec.name} Design System"
slug: "${spec.slug}"
${siteUrl ? `url: "${siteUrl}"\n` : ""}platform: "${spec.kind}"
category: "${spec.category}"
fit_for: [${goodFor}]
avoid_for: [${avoidFor}]
typography:
  display: "${spec.fonts.display}"
  open_alternative: "${spec.openFontAlt ?? "Inter / Geist"}"
  body: "${spec.fonts.body}"
  mono: "${spec.fonts.mono}"
  headline_tracking: "${spec.fonts.tracking}"
tokens:
  default_radius: "${spec.defaultRadius}"
  radius_ladder: [${spec.radiusScale.map((r) => `"${r}"`).join(", ")}]
  spacing_px: [${spec.spacingScale.join(", ")}]
colors:
  light:
    canvas: "${spec.light.canvas}"
    surface: "${spec.light.surface}"
    elevated: "${spec.light.elevated}"
    border: "${spec.light.border}"
    ink: "${spec.light.ink}"
    muted: "${spec.light.muted}"
    accent: "${spec.light.accent}"
    accent_foreground: "${spec.light.accentFg}"
  dark:
    canvas: "${spec.dark.canvas}"
    surface: "${spec.dark.surface}"
    elevated: "${spec.dark.elevated}"
    border: "${spec.dark.border}"
    ink: "${spec.dark.ink}"
    muted: "${spec.dark.muted}"
    accent: "${spec.dark.accent}"
    accent_foreground: "${spec.dark.accentFg}"
---`;
}
