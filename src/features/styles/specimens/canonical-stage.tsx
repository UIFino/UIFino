"use client";

import { useState } from "react";
import { resolveStylePlaygroundPhysics, type UiStyleSpec } from "@/core/styles";
import type { RadiusStop, ThemeMode } from "@/core/tokens";
import {
  CardsAuthStageTemplate,
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
}

export function LiveStyleCanonicalStage({
  style,
  mode,
  isZh,
  template = "dashboard",
  radiusOverride
}: LiveStyleCanonicalStageProps) {
  const [endpointInput, setEndpointInput] = useState("edge.uifino.dev/v2/gateway");
  const p = resolveStylePlaygroundPhysics(style, mode, radiusOverride);
  const { palette } = p;

  const kpis = isZh
    ? [
        { label: "月度调用请求", value: "12,840,920", delta: "+18.4%" },
        { label: "P99 响应延迟", value: "14.2 ms", delta: "-3.1 ms" },
        { label: "在线智能体", value: "1,024", delta: "99.98%" }
      ]
    : [
        { label: "Monthly Requests", value: "12,840,920", delta: "+18.4%" },
        { label: "P99 Latency", value: "14.2 ms", delta: "-3.1 ms" },
        { label: "Active Agents", value: "1,024", delta: "99.98%" }
      ];

  const rows = isZh
    ? [
        { id: "rel-942", title: "同步 DESIGN.md 表面阴影令牌至生产集群", env: "PROD", time: "2m ago" },
        { id: "rel-941", title: "多区域边缘路由鉴权策略热更新", env: "EU-WEST", time: "19m ago" },
        { id: "rel-940", title: "构建 React + Tailwind 组件语法树快照索引", env: "CI", time: "1h ago" }
      ]
    : [
        { id: "rel-942", title: "Sync DESIGN.md surface tokens to production cluster", env: "PROD", time: "2m ago" },
        { id: "rel-941", title: "Hot-reload multi-region edge gateway auth policy", env: "EU-WEST", time: "19m ago" },
        { id: "rel-940", title: "Compile React & Tailwind component AST snapshot index", env: "CI", time: "1h ago" }
      ];

  const cardStyle: React.CSSProperties = {
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
      className="relative overflow-hidden border border-hairline p-5 transition-colors duration-200 sm:p-7"
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
            className="absolute -top-20 -left-16 h-64 w-64 rounded-full opacity-35 blur-3xl"
            style={{ backgroundColor: palette.accent }}
          />
          <div
            className="absolute -right-12 bottom-0 h-60 w-60 rounded-full opacity-25 blur-3xl"
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
          <>
            {/* 1. Canonical Workspace Header */}
        <div
          className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
          style={cardStyle}
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              className="inline-block h-2.5 w-2.5 shrink-0"
              style={{
                backgroundColor: palette.accent,
                borderRadius: p.badgeRadiusPx === 999 ? "999px" : `${p.ctrlRadiusPx}px`
              }}
            />
            <span
              className="truncate text-[15px] font-semibold"
              style={{ fontFamily: p.fontDisplayCss, letterSpacing: p.letterSpacing }}
            >
              {isZh ? "网关遥测控制台" : "Gateway Telemetry Console"}
            </span>
            <span
              className="px-2 py-0.5 font-mono text-[11px] font-medium"
              style={{
                backgroundColor: p.elevatedAlphaBg,
                color: palette.muted,
                borderRadius: `${p.badgeRadiusPx}px`,
                border: `1px solid ${palette.border}`
              }}
            >
              {p.hasScanlines ? "[LIVE_V2.4]" : "v2.4"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-1 font-mono text-[11px]"
              style={{
                backgroundColor: p.elevatedAlphaBg,
                color: palette.muted,
                borderRadius: `${p.ctrlRadiusPx}px`,
                border: `1px solid ${palette.border}`
              }}
            >
              ⌘K
            </span>
            <span
              className="px-2.5 py-1 font-mono text-[11px] font-semibold"
              style={{
                backgroundColor: palette.accent,
                color: palette.accentFg,
                borderRadius: `${p.badgeRadiusPx}px`
              }}
            >
              {p.hasScanlines ? "[ONLINE]" : isZh ? "运行就绪" : "READY"}
            </span>
          </div>
        </div>

        {/* 2. Canonical 3-Column KPI Strip */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
          {kpis.map((kpi, idx) => (
            <div key={kpi.label} className="grid gap-1.5 p-4" style={cardStyle}>
              <div className="flex items-center justify-between gap-2">
                <span
                  className="text-xs font-medium"
                  style={{
                    color: palette.muted,
                    textTransform: p.uppercaseLabels ? "uppercase" : "none"
                  }}
                >
                  {p.hasTopHeavyRule ? `0${idx + 1} · ${kpi.label}` : kpi.label}
                </span>
                <span
                  className="px-1.5 py-0.5 font-mono text-[11px] font-semibold tabular-nums"
                  style={{
                    backgroundColor: p.elevatedAlphaBg,
                    color: palette.accent,
                    borderRadius: `${p.badgeRadiusPx}px`
                  }}
                >
                  {kpi.delta}
                </span>
              </div>
              <div
                className="text-[24px] leading-tight font-semibold tabular-nums"
                style={{
                  fontFamily: p.fontDisplayCss,
                  letterSpacing: p.letterSpacing
                }}
              >
                {kpi.value}
              </div>
            </div>
          ))}
        </div>

        {/* 3. Canonical Interactive Form & Primary/Secondary Buttons */}
        <div
          className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center"
          style={cardStyle}
        >
          <div className="min-w-0 flex-1">
            <label className="sr-only" htmlFor="style-stage-endpoint">
              Endpoint URL
            </label>
            <input
              id="style-stage-endpoint"
              type="text"
              value={endpointInput}
              onChange={(e) => setEndpointInput(e.target.value)}
              className="h-9 w-full px-3 font-mono text-[12.5px] outline-none"
              style={{
                backgroundColor: p.elevatedAlphaBg,
                color: palette.ink,
                borderColor: palette.border,
                borderStyle: "solid",
                borderWidth: `${p.borderWidthPx}px`,
                borderRadius: `${p.ctrlRadiusPx}px`,
                boxShadow: p.inputInsetShadow
              }}
            />
          </div>

          <div className="flex shrink-0 items-center gap-2.5">
            <button
              type="button"
              className="h-9 cursor-pointer px-3.5 text-[12.5px] font-medium transition-opacity hover:opacity-85"
              style={{
                backgroundColor: p.elevatedAlphaBg,
                color: palette.ink,
                borderColor: palette.border,
                borderStyle: "solid",
                borderWidth: `${p.borderWidthPx}px`,
                borderRadius: `${p.ctrlRadiusPx}px`
              }}
            >
              {isZh ? "测试连通" : "Ping Node"}
            </button>

            <button
              type="button"
              className="h-9 cursor-pointer px-4 text-[12.5px] font-semibold transition-opacity hover:opacity-90"
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
              {p.hasScanlines
                ? isZh
                  ? "[发布规则]"
                  : "[DEPLOY]"
                : isZh
                  ? "发布配置"
                  : "Deploy Rule"}
            </button>
          </div>
        </div>

        {/* 4. Canonical Activity / Deployment Rows */}
        <div className="overflow-hidden" style={cardStyle}>
          {rows.map((row, idx) => (
            <div
              key={row.id}
              className="flex items-center justify-between gap-3 px-4 py-2.5 text-[12.5px]"
              style={{
                borderTop: idx === 0 ? "none" : `1px solid ${palette.border}`
              }}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="font-mono text-[11px] shrink-0" style={{ color: palette.muted }}>
                  {row.id}
                </span>
                <span className="truncate font-medium">{row.title}</span>
              </div>

              <div className="flex shrink-0 items-center gap-2.5">
                <span
                  className="px-2 py-0.5 font-mono text-[10.5px]"
                  style={{
                    backgroundColor: p.elevatedAlphaBg,
                    color: palette.ink,
                    borderRadius: `${p.badgeRadiusPx}px`,
                    border: `1px solid ${palette.border}`
                  }}
                >
                  {row.env}
                </span>
                <span className="font-mono text-[11px] tabular-nums" style={{ color: palette.muted }}>
                  {row.time}
                </span>
              </div>
            </div>
          ))}
        </div>
          </>
        )}
      </div>
    </div>
  );
}
