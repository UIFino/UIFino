"use client";

import type { ThemePalette } from "@/core/tokens";
import { useClipboard } from "@/hooks/use-clipboard";

export interface StylePalettePanelProps {
  readonly modeLabel: string;
  readonly palette: ThemePalette;
}

const TOKEN_KEYS: readonly { readonly key: keyof ThemePalette; readonly role: string }[] = [
  { key: "canvas", role: "Canvas" },
  { key: "surface", role: "Surface" },
  { key: "elevated", role: "Elevated" },
  { key: "border", role: "Border" },
  { key: "ink", role: "Primary Ink" },
  { key: "muted", role: "Muted Ink" },
  { key: "accent", role: "Accent" },
  { key: "accentFg", role: "Accent Foreground" }
];

export function StylePalettePanel({ modeLabel, palette }: StylePalettePanelProps) {
  const { copy } = useClipboard();

  return (
    <div className="border border-hairline bg-surface p-[18px]">
      <div className="mb-3.5 flex items-center justify-between">
        <span className="eyebrow-mono">{modeLabel} MODE TOKENS</span>
        <span className="font-mono-ui text-[11px] text-subtle">Click hex to copy</span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {TOKEN_KEYS.map(({ key, role }) => {
          const hex = palette[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => void copy(hex, `Copied ${hex}`)}
              className="flex cursor-pointer flex-col gap-2 border border-hairline bg-canvas p-2.5 text-left transition-colors hover:border-accent-border"
            >
              <span
                className="h-9 w-full border border-hairline"
                style={{ backgroundColor: hex }}
              />
              <div>
                <div className="truncate text-[11.5px] font-medium text-ink">{role}</div>
                <div className="font-mono-ui text-[11px] text-muted">{hex}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
