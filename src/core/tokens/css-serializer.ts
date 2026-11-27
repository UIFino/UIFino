import type { ResolvedWorkbenchTokens } from "./types";

export function serializeTokensCss(tokens: ResolvedWorkbenchTokens): string {
  return `:root {
  /* Skin: ${tokens.skinName} (${tokens.mode}) */
  --ui-canvas: ${tokens.canvas};
  --ui-surface: ${tokens.surface};
  --ui-border: ${tokens.border};
  --ui-ink: ${tokens.ink};
  --ui-muted: ${tokens.muted};
  --ui-accent: ${tokens.accent};
  --ui-accent-fg: ${tokens.accentFg};
  --ui-radius-card: ${tokens.card};
  --ui-radius-ctrl: ${tokens.ctrl};
  --ui-pad-stage: ${tokens.padStage};
  --ui-pad-card: ${tokens.padCard};
  --ui-gap: ${tokens.gap};
}`;
}
