import type { CatalogBrandSpec } from "./types";

export function serializeDesignMdFrontmatter(spec: CatalogBrandSpec): string {
  return `---
protocol: uifino/design-md@1.0
name: "${spec.name} Design System"
slug: "${spec.slug}"
platform: "${spec.kind}"
category: "${spec.category}"
typography:
  display: "${spec.fonts.display}"
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
