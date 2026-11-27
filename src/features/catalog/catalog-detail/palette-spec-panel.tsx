import { TokenSwatchGrid } from "@/components/patterns/token-swatch";
import type { CatalogBrandSpec } from "@/core/design-md";
import type { ThemePalette } from "@/core/tokens";

export interface PaletteSpecPanelProps {
  readonly item: CatalogBrandSpec;
  readonly modeLabel: "DARK" | "LIGHT";
  readonly palette: ThemePalette;
}

export function PaletteSpecPanel({ item, modeLabel, palette: p }: PaletteSpecPanelProps) {
  const swatches = [
    ["Canvas", p.canvas],
    ["Surface", p.surface],
    ["Elevated", p.elevated],
    ["Border", p.border],
    ["Primary Ink", p.ink],
    ["Muted Ink", p.muted],
    ["Accent", p.accent]
  ] as const;

  return (
    <div className="min-w-0 border border-hairline bg-surface">
      <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
        <span className="eyebrow-mono text-ink">{modeLabel} THEME SPEC</span>
        <span className="font-mono-ui text-[11.5px] text-muted">Click swatch to copy HEX</span>
      </div>

      {/* 01 Color Palette */}
      <div className="border-b border-hairline p-[18px]">
        <div className="eyebrow-mono mb-3">01 — COLOR PALETTE</div>
        <TokenSwatchGrid swatches={swatches} />
      </div>

      {/* 02 Live Surface Specimen */}
      <div className="p-[18px]" style={{ backgroundColor: p.canvas, color: p.ink }}>
        <div
          className="font-mono-ui text-[10.5px] tracking-[0.08em] uppercase"
          style={{ color: p.muted }}
        >
          02 — LIVE COMPONENT SURFACE ({modeLabel})
        </div>
        <div
          className="mt-3 grid gap-3.5 border p-[18px]"
          style={{
            backgroundColor: p.surface,
            borderColor: p.border,
            borderRadius: item.defaultRadius
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div>
              <div
                className="text-[22px] font-semibold"
                style={{
                  fontFamily: item.fonts.serif ? "var(--font-serif)" : "var(--font-sans)",
                  letterSpacing: item.fonts.tracking
                }}
              >
                {item.name} Interface Specimen
              </div>
              <div className="mt-[3px] text-[13px]" style={{ color: p.muted }}>
                {item.fonts.display} · radius {item.defaultRadius} · 1px border {p.border}
              </div>
            </div>
            <div className="flex gap-2">
              <span
                className="inline-flex h-[34px] items-center px-3.5 text-[12.5px] font-semibold"
                style={{
                  backgroundColor: p.accent,
                  color: p.accentFg,
                  borderRadius: item.defaultRadius
                }}
              >
                {item.ctaLabel}
              </span>
              <span
                className="inline-flex h-[34px] items-center border px-3.5 text-[12.5px]"
                style={{
                  backgroundColor: p.elevated,
                  color: p.ink,
                  borderColor: p.border,
                  borderRadius: item.defaultRadius
                }}
              >
                Secondary
              </span>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2.5">
            {(
              [
                ["Latency P95", "12.4ms"],
                ["Token Coverage", "100%"],
                ["Contrast Ratio", "11.8:1"]
              ] as const
            ).map(([k, v]) => (
              <div
                key={k}
                className="border px-3 py-2.5"
                style={{
                  backgroundColor: p.canvas,
                  borderColor: p.border,
                  borderRadius: item.defaultRadius
                }}
              >
                <div className="text-[11px]" style={{ color: p.muted }}>
                  {k}
                </div>
                <div className="font-mono-ui mt-[3px] text-[17px] font-bold">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
