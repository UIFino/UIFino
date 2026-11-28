import type { ComponentAssetMeta } from "@/core/codegen";
import type { ResolvedWorkbenchTokens } from "@/core/tokens";
import { AnimatedCounter } from "./animated-counter";

export interface SpecimenRenderProps {
  readonly item: ComponentAssetMeta;
  readonly tokens: ResolvedWorkbenchTokens;
  readonly isMobile: boolean;
  readonly compact: boolean;
  readonly replayKey?: number;
}

export function TelemetryHeroSpecimen({
  tokens: tk,
  isMobile,
  compact,
  replayKey
}: SpecimenRenderProps) {
  const pad = compact ? "16px" : isMobile ? "18px" : tk.padStage;
  const cardPad = compact ? "10px" : tk.padCard;

  return (
    <div style={{ backgroundColor: tk.canvas, color: tk.ink, padding: pad, textAlign: "center" }}>
      <span
        className="inline-flex items-center gap-1.5 border px-[9px] py-0.5 font-mono"
        style={{
          backgroundColor: tk.surface,
          borderColor: tk.border,
          borderRadius: tk.badge,
          fontSize: compact ? "9px" : "11px",
          color: tk.muted
        }}
      >
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: tk.accent }}
        />
        Release v2.4 · Edge Telemetry
      </span>
      <h3
        className="mx-auto leading-[1.08] font-bold tracking-[-0.03em]"
        style={{
          marginTop: compact ? "8px" : "14px",
          maxWidth: "560px",
          fontFamily: tk.fontDisplay,
          fontSize: compact ? "16px" : isMobile ? "24px" : "34px"
        }}
      >
        Observe every edge request in real time.
      </h3>
      {!compact ? (
        <p className="mx-auto mt-2.5 max-w-[480px] text-[13.5px]" style={{ color: tk.muted }}>
          Sub-second latency tracking, error budgets, and instant rollouts across 48 global edge
          regions.
        </p>
      ) : null}
      <div
        className="flex flex-wrap justify-center gap-2"
        style={{ marginTop: compact ? "10px" : "18px" }}
      >
        <span
          className="inline-flex items-center px-3.5 font-semibold"
          style={{
            height: compact ? "26px" : tk.btnH,
            backgroundColor: tk.accent,
            color: tk.accentFg,
            borderRadius: tk.ctrl,
            fontSize: compact ? "10.5px" : "12.5px"
          }}
        >
          Deploy Workspace →
        </span>
        <span
          className="inline-flex items-center border px-3.5"
          style={{
            height: compact ? "26px" : tk.btnH,
            backgroundColor: tk.surface,
            borderColor: tk.border,
            color: tk.ink,
            borderRadius: tk.ctrl,
            fontSize: compact ? "10.5px" : "12.5px"
          }}
        >
          Live Docs
        </span>
      </div>

      <div
        className="overflow-hidden border"
        style={{
          marginTop: compact ? "12px" : "22px",
          display: "grid",
          gridTemplateColumns: `repeat(${isMobile ? 2 : 4}, minmax(0, 1fr))`,
          borderColor: tk.border,
          backgroundColor: tk.surface,
          borderRadius: tk.card
        }}
      >
        {(
          [
            ["128", "M", "Monthly Requests"],
            ["99.98", "%", "Uptime SLA"],
            ["14", "ms", "Global P99"],
            ["48", "", "Edge PoPs"]
          ] as const
        ).map(([num, suf, lbl], idx) => (
          <div
            key={lbl}
            style={{
              padding: cardPad,
              borderRight: idx < 3 ? `1px solid ${tk.border}` : "0"
            }}
          >
            <div
              className="font-mono-ui font-bold"
              style={{ fontSize: compact ? "13px" : "21px" }}
            >
              {compact ? num : <AnimatedCounter target={num} replayKey={replayKey} />}
              <span style={{ color: tk.accent }}>{suf}</span>
            </div>
            <div
              className="mt-0.5"
              style={{ fontSize: compact ? "9px" : "11px", color: tk.muted }}
            >
              {lbl}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SplitCliOrEditorialHeroSpecimen({
  item,
  tokens: tk,
  isMobile,
  compact
}: SpecimenRenderProps) {
  const pad = compact ? "16px" : isMobile ? "18px" : tk.padStage;
  const cardPad = compact ? "10px" : tk.padCard;
  const gap = compact ? "8px" : tk.gap;
  const isSerif = item.archetype === "editorial-hero";

  return (
    <div
      className="items-center"
      style={{
        backgroundColor: tk.canvas,
        color: tk.ink,
        padding: pad,
        display: "grid",
        gridTemplateColumns: isMobile || compact ? "1fr" : "1.15fr 0.85fr",
        gap
      }}
    >
      <div className="min-w-0">
        <div
          className="font-mono-ui text-[10px] tracking-[0.08em] uppercase"
          style={{ color: tk.accent }}
        >
          {item.subcat}
        </div>
        <h3
          className="mt-2 leading-[1.08] font-semibold tracking-[-0.025em]"
          style={{
            fontFamily: isSerif ? "var(--font-serif)" : tk.fontDisplay,
            fontSize: compact ? "17px" : isMobile ? "25px" : "32px"
          }}
        >
          {isSerif ? "Publishing tools built for deep reading." : "Deploy edge workers from one command."}
        </h3>
        <div
          className="mt-3 flex items-center justify-between gap-2 border px-3 py-2 font-mono"
          style={{
            backgroundColor: tk.surface,
            borderColor: tk.border,
            borderRadius: tk.ctrl,
            fontSize: compact ? "9.5px" : "12px"
          }}
        >
          <span className="truncate">
            <span style={{ color: tk.accent }}>$</span> npx acme-edge@latest deploy --prod
          </span>
          <span className="text-[10px]" style={{ color: tk.muted }}>
            COPY
          </span>
        </div>
      </div>

      {!compact ? (
        <div
          className="border font-mono text-[11.5px]"
          style={{
            backgroundColor: tk.surface,
            borderColor: tk.border,
            borderRadius: tk.card,
            padding: cardPad
          }}
        >
          <div
            className="flex justify-between border-b pb-2"
            style={{ borderColor: tk.border, color: tk.muted }}
          >
            <span>edge.config.ts</span>
            <span style={{ color: tk.accent }}>p99: 11.4ms</span>
          </div>
          <div className="mt-2 leading-[1.6]" style={{ color: tk.muted }}>
            region: <span style={{ color: tk.ink }}>iad1 (prod)</span>
            <br />
            runtime: <span style={{ color: tk.accent }}>v8-isolate</span>
            <br />
            cache: <span style={{ color: tk.ink }}>global-kv</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
