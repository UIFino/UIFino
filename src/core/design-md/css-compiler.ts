import type { CatalogBrandSpec } from "./types";

export function compileBrandTokensCss(spec: CatalogBrandSpec): string {
  const openFont = spec.openFontAlt ?? `${spec.fonts.display}, Inter, system-ui, sans-serif`;
  const monoFont = `${spec.fonts.mono}, "JetBrains Mono", ui-monospace, monospace`;
  const maxW = spec.scraped?.containerMaxWidth ?? "1200px";

  return `/* ${spec.name} (${spec.slug}) — Extracted Design Tokens */
:root {
  --brand-canvas: ${spec.light.canvas};
  --brand-surface: ${spec.light.surface};
  --brand-elevated: ${spec.light.elevated};
  --brand-border: ${spec.light.border};
  --brand-ink: ${spec.light.ink};
  --brand-muted: ${spec.light.muted};
  --brand-accent: ${spec.light.accent};
  --brand-accent-fg: ${spec.light.accentFg};

  --brand-font-display: ${openFont};
  --brand-font-body: ${spec.fonts.body}, Inter, system-ui, sans-serif;
  --brand-font-mono: ${monoFont};
  --brand-tracking-display: ${spec.fonts.tracking};

  --brand-radius-default: ${spec.defaultRadius};
  --brand-container-max: ${maxW};
}

.dark {
  --brand-canvas: ${spec.dark.canvas};
  --brand-surface: ${spec.dark.surface};
  --brand-elevated: ${spec.dark.elevated};
  --brand-border: ${spec.dark.border};
  --brand-ink: ${spec.dark.ink};
  --brand-muted: ${spec.dark.muted};
  --brand-accent: ${spec.dark.accent};
  --brand-accent-fg: ${spec.dark.accentFg};
}

/* Tailwind CSS v4 @theme bridge */
@theme inline {
  --color-canvas: var(--brand-canvas);
  --color-surface: var(--brand-surface);
  --color-elevated: var(--brand-elevated);
  --color-border: var(--brand-border);
  --color-ink: var(--brand-ink);
  --color-muted: var(--brand-muted);
  --color-accent: var(--brand-accent);
  --color-accent-fg: var(--brand-accent-fg);
  --font-display: var(--brand-font-display);
  --font-sans: var(--brand-font-body);
  --font-mono: var(--brand-font-mono);
  --radius-card: var(--brand-radius-default);
}`;
}
