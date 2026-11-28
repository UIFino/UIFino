"use client";

import type { CSSProperties } from "react";
import { resolveStylePlaygroundPhysics, type UiStyleSpec } from "@/core/styles";
import type { RadiusStop, ThemeMode } from "@/core/tokens";
import { cn } from "@/lib/cn";
import {
  CardsAuthStageTemplate,
  DashboardStageTemplate,
  LandingStageTemplate,
  TypographyStageTemplate
} from "./stage-templates";

export type StyleStageTemplate = "dashboard" | "landing" | "cards" | "typography";

export interface LiveStyleCanonicalStageProps {
  readonly style: UiStyleSpec;
  readonly mode: ThemeMode;
  readonly isZh: boolean;
  readonly template?: StyleStageTemplate;
  readonly radiusOverride?: RadiusStop;
  readonly fullBleed?: boolean;
}

export function LiveStyleCanonicalStage({
  style,
  mode,
  isZh,
  template = "dashboard",
  radiusOverride,
  fullBleed = true
}: LiveStyleCanonicalStageProps) {
  const p = resolveStylePlaygroundPhysics(style, mode, radiusOverride);
  const { palette } = p;

  const cardStyle: CSSProperties = {
    backgroundColor: p.surfaceAlphaBg,
    borderColor: palette.border,
    borderStyle: "solid",
    borderWidth: `${p.borderWidthPx}px`,
    borderRadius: `${p.cardRadiusPx}px`,
    boxShadow: p.cardShadow,
    backdropFilter: p.backdropFilter,
    WebkitBackdropFilter: p.backdropFilter
  };

  return (
    <div
      className={cn(
        "relative min-h-[560px] overflow-hidden p-5 transition-colors duration-200 sm:p-6",
        fullBleed ? "" : "border-hairline border"
      )}
      style={{
        backgroundColor: palette.canvas,
        color: palette.ink,
        fontFamily: p.fontBodyCss
      }}
    >
      {/* Ambient Aurora Orbs for Frosted Glass */}
      {p.hasAmbientOrbs ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-20 -left-16 h-72 w-72 rounded-full opacity-35 blur-3xl"
            style={{ backgroundColor: palette.accent }}
          />
          <div
            className="absolute -right-12 bottom-0 h-64 w-64 rounded-full opacity-25 blur-3xl"
            style={{ backgroundColor: mode === "dark" ? "#6366F1" : "#38BDF8" }}
          />
        </div>
      ) : null}

      {/* Subtle Scanlines for Retro Terminal */}
      {p.hasScanlines ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(34,197,94,0.14) 0px, rgba(34,197,94,0.14) 1px, transparent 1px, transparent 3px)"
          }}
        />
      ) : null}

      <div className="relative z-10 grid gap-4">
        {/* Swiss Heavy Top Rule */}
        {p.hasTopHeavyRule ? (
          <div className="h-[2px] w-full" style={{ backgroundColor: palette.ink }} />
        ) : null}

        {template === "landing" ? (
          <LandingStageTemplate style={style} physics={p} cardStyle={cardStyle} isZh={isZh} />
        ) : template === "cards" ? (
          <CardsAuthStageTemplate style={style} physics={p} cardStyle={cardStyle} isZh={isZh} />
        ) : template === "typography" ? (
          <TypographyStageTemplate style={style} physics={p} cardStyle={cardStyle} isZh={isZh} />
        ) : (
          <DashboardStageTemplate style={style} physics={p} cardStyle={cardStyle} isZh={isZh} />
        )}
      </div>
    </div>
  );
}
