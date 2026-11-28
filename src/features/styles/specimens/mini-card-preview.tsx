import type { CSSProperties } from "react";
import {
  resolveStylePlaygroundPhysics,
  type ResolvedStylePlaygroundPhysics,
  type UiStyleSpec
} from "@/core/styles";
import type { ThemeMode } from "@/core/tokens";

export interface StyleMiniPreviewProps {
  readonly style: UiStyleSpec;
  readonly mode: ThemeMode;
}

function getCardStyle(p: ResolvedStylePlaygroundPhysics): CSSProperties {
  return {
    backgroundColor: p.surfaceAlphaBg,
    borderColor: p.palette.border,
    borderStyle: "solid",
    borderWidth: `${p.borderWidthPx}px`,
    borderRadius: `${p.cardRadiusPx}px`,
    boxShadow: p.cardShadow,
    backdropFilter: p.backdropFilter,
    WebkitBackdropFilter: p.backdropFilter
  };
}

function renderDistinctMiniature(style: UiStyleSpec, p: ResolvedStylePlaygroundPhysics) {
  const { palette } = p;
  const cardStyle = getCardStyle(p);
  const pillStyle: CSSProperties = {
    backgroundColor: p.elevatedAlphaBg,
    color: palette.ink,
    border: `${p.borderWidthPx}px solid ${palette.border}`,
    borderRadius: `${p.badgeRadiusPx}px`
  };
  const primaryBtnStyle: CSSProperties = {
    backgroundColor: palette.accent,
    color: palette.accentFg,
    borderColor: p.borderWidthPx === 2 ? palette.border : palette.accent,
    borderStyle: "solid",
    borderWidth: `${p.borderWidthPx}px`,
    borderRadius: `${p.ctrlRadiusPx}px`,
    boxShadow: p.buttonShadow
  };

  switch (style.surfaceEffect) {
    case "hairline":
      return (
        <div className="relative z-10 grid flex-1 content-between gap-2">
          <div
            className="flex items-center justify-between font-mono text-[9.5px]"
            style={{ color: palette.muted }}
          >
            <span>GRID // 1PX HAIRLINE</span>
            <span style={{ color: palette.accent }}>● READY</span>
          </div>
          <div
            className="grid grid-cols-2 gap-px overflow-hidden"
            style={{ backgroundColor: palette.border, border: `1px solid ${palette.border}` }}
          >
            {[
              ["P99", "14.2ms"],
              ["SLA", "99.98%"],
              ["TOKENS", "24 VARS"],
              ["RADIUS", "0px"]
            ].map(([k, v], idx) => (
              <div
                key={k}
                className="grid gap-0.5 px-2.5 py-2"
                style={{ backgroundColor: palette.surface }}
              >
                <span className="font-mono text-[8.5px]" style={{ color: palette.muted }}>
                  {k}
                </span>
                <span
                  className="font-mono text-[12px] font-semibold tabular-nums"
                  style={{ color: idx === 1 ? palette.accent : palette.ink }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    case "flat-mono":
      return (
        <div className="relative z-10 grid flex-1 content-between gap-2">
          <div
            className="flex items-center justify-between border-b pb-1.5"
            style={{ borderColor: palette.border }}
          >
            <span
              className="font-mono text-[9.5px] tracking-widest uppercase"
              style={{ color: palette.muted }}
            >
              MONOCHROME
            </span>
            <span className="font-mono text-[9.5px]" style={{ color: palette.ink }}>
              4px
            </span>
          </div>
          <div className="grid gap-2">
            <div
              className="text-[18px] leading-[1.08] font-bold tracking-tight"
              style={{ fontFamily: p.fontDisplayCss }}
            >
              Zero Noise,
              <br />
              Pure Signal.
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[9.5px]" style={{ color: palette.muted }}>
                Contrast 18.2:1
              </span>
              <span className="px-2.5 py-1 text-[10px] font-semibold" style={primaryBtnStyle}>
                Inspect →
              </span>
            </div>
          </div>
        </div>
      );

    case "swiss-rule":
      return (
        <div className="relative z-10 grid flex-1 content-between gap-2">
          <div>
            <div className="h-[2px] w-full" style={{ backgroundColor: palette.ink }} />
            <div className="mt-1.5 flex items-baseline justify-between">
              <span className="font-mono text-[9px] font-bold tracking-widest uppercase">
                01 / SWISS SYSTEM
              </span>
              <span className="font-mono text-[9px] font-bold" style={{ color: palette.accent }}>
                RED-01
              </span>
            </div>
          </div>
          <div className="grid grid-cols-[1.2fr_0.8fr] items-end gap-2">
            <div
              className="text-[24px] leading-[0.95] font-bold tracking-[-0.04em]"
              style={{ fontFamily: p.fontDisplayCss }}
            >
              Aa
              <span
                className="ml-1 text-[11px] font-medium tracking-normal"
                style={{ color: palette.muted }}
              >
                Grid
              </span>
            </div>
            <div
              className="grid gap-1 border-t pt-1 font-mono text-[8.5px]"
              style={{ borderColor: palette.ink }}
            >
              <div className="flex justify-between">
                <span>SCALE</span>
                <span>1.25</span>
              </div>
              <div className="flex justify-between">
                <span>RAD</span>
                <span>0px</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "soft-shadow":
      return (
        <div className="relative z-10 grid flex-1 content-between gap-2">
          <div
            className="flex items-center justify-between text-[9.5px]"
            style={{ color: palette.muted }}
          >
            <span className="font-medium">Revenue Pulse</span>
            <span
              className="px-1.5 py-0.5 font-mono text-[9px] font-semibold"
              style={{ ...pillStyle, color: palette.accent }}
            >
              +24.8%
            </span>
          </div>
          <div className="grid gap-2 p-2.5" style={cardStyle}>
            <div className="flex items-end justify-between gap-2">
              <div className="text-[16px] leading-none font-bold tabular-nums">$84,210</div>
              <div className="flex h-6 items-end gap-1">
                {[38, 62, 50, 76, 68, 95].map((h, i) => (
                  <span
                    key={i}
                    className="w-1.5 rounded-t-[2px]"
                    style={{
                      height: `${h}%`,
                      backgroundColor: i === 5 ? palette.accent : palette.border
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-0.5">
              <span className="text-[9.5px]" style={{ color: palette.muted }}>
                3-tier depth
              </span>
              <span className="px-2 py-0.5 text-[9.5px] font-semibold" style={primaryBtnStyle}>
                Upgrade
              </span>
            </div>
          </div>
        </div>
      );

    case "warm-paper":
      return (
        <div className="relative z-10 grid flex-1 content-between gap-2">
          <div
            className="flex items-center justify-between border-b pb-1 text-[9px]"
            style={{ borderColor: palette.border, color: palette.muted }}
          >
            <span className="font-mono tracking-wider uppercase">Issue No. 14</span>
            <span>6 min read</span>
          </div>
          <div className="grid gap-1.5">
            <div
              className="text-[16px] leading-[1.15] font-semibold"
              style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.015em" }}
            >
              Calm interfaces begin with paper &amp; measure.
            </div>
            <div
              className="border-l-2 pl-2 text-[9.5px] leading-[1.4]"
              style={{ borderColor: palette.accent, color: palette.muted }}
            >
              Editorial pacing avoids rigid Chrome cards.
            </div>
          </div>
        </div>
      );

    case "frosted-glass":
      return (
        <div className="relative z-10 grid flex-1 content-between gap-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 font-mono text-[9px]" style={pillStyle}>
              backdrop-blur(16px)
            </span>
            <span className="font-mono text-[9px]" style={{ color: palette.accent }}>
              GLASS
            </span>
          </div>
          <div className="grid gap-2 p-2.5" style={cardStyle}>
            <div
              className="flex items-center justify-between px-2.5 py-1.5 text-[10px]"
              style={{
                backgroundColor: p.elevatedAlphaBg,
                borderRadius: `${p.ctrlRadiusPx}px`,
                border: `1px solid ${palette.border}`
              }}
            >
              <span style={{ color: palette.muted }}>⌘ Switch command…</span>
              <span className="font-mono text-[9px]" style={{ color: palette.accent }}>
                ↵
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                <span className="px-2 py-0.5 text-[9px]" style={pillStyle}>
                  Raycast
                </span>
                <span className="px-2 py-0.5 text-[9px]" style={pillStyle}>
                  Arc
                </span>
              </div>
              <span className="px-2 py-0.5 text-[9.5px] font-semibold" style={primaryBtnStyle}>
                Launch
              </span>
            </div>
          </div>
        </div>
      );

    case "bento-ring":
      return (
        <div className="relative z-10 grid flex-1 grid-cols-2 grid-rows-[auto_1fr] gap-2">
          <div
            className="col-span-2 flex items-center justify-between px-2.5 py-2"
            style={cardStyle}
          >
            <div>
              <div className="text-[9px]" style={{ color: palette.muted }}>
                Bento Core
              </div>
              <div className="text-[13px] font-bold tabular-nums">12 Modules</div>
            </div>
            <span className="px-2 py-0.5 text-[9.5px] font-semibold" style={primaryBtnStyle}>
              16px Ring
            </span>
          </div>
          <div className="grid place-items-center p-2 text-center" style={cardStyle}>
            <span
              className="font-mono text-[13px] font-bold tabular-nums"
              style={{ color: palette.accent }}
            >
              4.8x
            </span>
          </div>
          <div className="grid place-items-center p-2 text-center" style={cardStyle}>
            <span className="text-[10px] font-semibold">Modular</span>
          </div>
        </div>
      );

    case "brutalist-offset":
      return (
        <div className="relative z-10 grid flex-1 content-between gap-2">
          <div className="flex items-center justify-between">
            <span
              className="px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase"
              style={{ ...pillStyle, backgroundColor: palette.accent, color: palette.accentFg }}
            >
              RAW // 2PX
            </span>
            <span className="font-mono text-[9.5px] font-bold">4px OFFSET</span>
          </div>
          <div className="flex items-center justify-between gap-2 p-2.5" style={cardStyle}>
            <div className="text-[13px] leading-tight font-extrabold uppercase">
              Build Fast.
              <br />
              Zero Soft.
            </div>
            <span
              className="shrink-0 px-2.5 py-1 text-[10px] font-extrabold uppercase"
              style={primaryBtnStyle}
            >
              SHIP!
            </span>
          </div>
        </div>
      );

    case "soft-tactile":
      return (
        <div className="relative z-10 grid flex-1 content-between gap-2">
          <div
            className="flex items-center justify-between text-[9.5px]"
            style={{ color: palette.muted }}
          >
            <span className="font-semibold" style={{ color: palette.ink }}>
              Tactile Deck
            </span>
            <span className="font-mono text-[9px]">12px BEVEL</span>
          </div>
          <div className="grid gap-2 p-2.5" style={cardStyle}>
            <div className="flex items-center justify-between gap-2">
              <div
                className="h-2.5 flex-1 overflow-hidden p-0.5"
                style={{
                  backgroundColor: p.elevatedAlphaBg,
                  borderRadius: "999px",
                  boxShadow: p.inputInsetShadow
                }}
              >
                <div
                  className="h-full w-2/3 rounded-full"
                  style={{ backgroundColor: palette.accent }}
                />
              </div>
              <div
                className="flex h-5 w-9 items-center justify-end rounded-full p-0.5"
                style={{ backgroundColor: palette.accent, boxShadow: p.buttonShadow }}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full"
                  style={{ backgroundColor: palette.accentFg }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[9.5px]" style={{ color: palette.muted }}>
                Top Bevel + Inset
              </span>
              <span className="px-2.5 py-0.5 text-[9.5px] font-semibold" style={primaryBtnStyle}>
                Press
              </span>
            </div>
          </div>
        </div>
      );

    case "retro-terminal":
    default:
      return (
        <div className="relative z-10 grid flex-1 content-between gap-2 font-mono">
          <div
            className="flex items-center justify-between border-b pb-1 text-[9px]"
            style={{ borderColor: palette.border, color: palette.muted }}
          >
            <span>[SYS // TTY0]</span>
            <span style={{ color: palette.accent }}>ONLINE</span>
          </div>
          <div className="grid gap-1.5 p-2.5 text-[10px]" style={cardStyle}>
            <div className="flex items-center gap-1.5">
              <span style={{ color: palette.accent }}>&gt;</span>
              <span className="truncate">uifino deploy --prod</span>
              <span
                className="inline-block h-3 w-1.5"
                style={{ backgroundColor: palette.accent }}
              />
            </div>
            <div
              className="flex items-center justify-between text-[9px]"
              style={{ color: palette.muted }}
            >
              <span>[########--] 82%</span>
              <span style={{ color: palette.accent }}>0ms</span>
            </div>
          </div>
        </div>
      );
  }
}

export function StyleMiniPreview({ style, mode }: StyleMiniPreviewProps) {
  const p = resolveStylePlaygroundPhysics(style, mode);
  const { palette } = p;
  const ribbon = [
    palette.canvas,
    palette.surface,
    palette.elevated,
    palette.border,
    palette.accent
  ];

  return (
    <div
      className="relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden select-none"
      style={{
        backgroundColor: palette.canvas,
        color: palette.ink,
        fontFamily: p.fontBodyCss
      }}
    >
      {p.hasAmbientOrbs ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-8 -right-8 h-32 w-32 rounded-full opacity-45 blur-2xl"
            style={{ backgroundColor: palette.accent }}
          />
          <div
            className="absolute -bottom-8 -left-6 h-24 w-24 rounded-full opacity-30 blur-2xl"
            style={{ backgroundColor: mode === "dark" ? "#6366F1" : "#38BDF8" }}
          />
        </div>
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

      <div className="relative z-10 flex flex-1 flex-col p-3.5">
        {renderDistinctMiniature(style, p)}
      </div>

      {/* Crisp Semantic 5-Token Palette Ribbon */}
      <div
        aria-hidden="true"
        className="relative z-10 grid h-2 w-full shrink-0 grid-cols-5 border-t"
        style={{ borderColor: palette.border }}
      >
        {ribbon.map((hex, i) => (
          <span key={`${hex}-${i}`} style={{ backgroundColor: hex }} />
        ))}
      </div>
    </div>
  );
}
