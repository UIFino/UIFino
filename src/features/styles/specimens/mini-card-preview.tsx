import { resolveStylePlaygroundPhysics, type UiStyleSpec } from "@/core/styles";
import type { ThemeMode } from "@/core/tokens";

export interface StyleMiniPreviewProps {
  readonly style: UiStyleSpec;
  readonly mode: ThemeMode;
}

export function StyleMiniPreview({ style, mode }: StyleMiniPreviewProps) {
  const p = resolveStylePlaygroundPhysics(style, mode);
  const { palette } = p;

  return (
    <div
      className="relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden p-4 select-none"
      style={{
        backgroundColor: palette.canvas,
        color: palette.ink,
        fontFamily: p.fontBodyCss
      }}
    >
      {p.hasAmbientOrbs ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full opacity-40 blur-2xl"
          style={{ backgroundColor: palette.accent }}
        />
      ) : null}

      {p.hasScanlines ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(34,197,94,0.16) 0px, rgba(34,197,94,0.16) 1px, transparent 1px, transparent 3px)"
          }}
        />
      ) : null}

      {/* Top Header Strip */}
      <div className="relative z-10">
        {p.hasTopHeavyRule ? (
          <div className="mb-2 h-[2px] w-full" style={{ backgroundColor: palette.ink }} />
        ) : null}
        <div className="flex items-center justify-between gap-2">
          <span
            className="font-mono text-[10px] tracking-wider uppercase"
            style={{ color: palette.muted }}
          >
            {style.surfaceEffect}
          </span>
          <span
            className="px-1.5 py-0.5 font-mono text-[10px] font-semibold"
            style={{
              backgroundColor: p.elevatedAlphaBg,
              color: palette.ink,
              border: `1px solid ${palette.border}`,
              borderRadius: `${p.badgeRadiusPx}px`
            }}
          >
            R:{style.defaultRadius}px
          </span>
        </div>
      </div>

      {/* Center Mini Specimen Card */}
      <div
        className="relative z-10 grid gap-2.5 p-3"
        style={{
          backgroundColor: p.surfaceAlphaBg,
          borderColor: palette.border,
          borderStyle: "solid",
          borderWidth: `${p.borderWidthPx}px`,
          borderRadius: `${p.cardRadiusPx}px`,
          boxShadow: p.cardShadow,
          backdropFilter: p.backdropFilter,
          WebkitBackdropFilter: p.backdropFilter
        }}
      >
        <div className="flex items-baseline justify-between gap-2">
          <span
            className="truncate text-[17px] leading-tight font-semibold tabular-nums"
            style={{
              fontFamily: p.fontDisplayCss,
              letterSpacing: p.letterSpacing
            }}
          >
            99.98%
          </span>
          <span
            className="font-mono text-[10.5px] font-semibold"
            style={{ color: palette.accent }}
          >
            +18.4%
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="h-6 flex-1 px-2 font-mono text-[10px] leading-6 truncate"
            style={{
              backgroundColor: p.elevatedAlphaBg,
              color: palette.muted,
              borderColor: palette.border,
              borderStyle: "solid",
              borderWidth: `${p.borderWidthPx}px`,
              borderRadius: `${p.ctrlRadiusPx}px`,
              boxShadow: p.inputInsetShadow
            }}
          >
            api.uifino.dev
          </div>
          <span
            className="inline-flex h-6 shrink-0 items-center px-2.5 text-[10.5px] font-semibold"
            style={{
              backgroundColor: palette.accent,
              color: palette.accentFg,
              borderColor: p.borderWidthPx === 2 ? palette.border : palette.accent,
              borderStyle: "solid",
              borderWidth: `${p.borderWidthPx}px`,
              borderRadius: `${p.ctrlRadiusPx}px`,
              boxShadow: p.buttonShadow
            }}
          >
            {p.hasScanlines ? "[RUN]" : "Deploy"}
          </span>
        </div>
      </div>
    </div>
  );
}
