import { AnimatedCounter } from "./animated-counter";
import type { SpecimenRenderProps } from "./hero-specimens";

export function PageShellSpecimen({ tokens: tk, isMobile, compact }: SpecimenRenderProps) {
  const pad = compact ? "12px" : "18px";
  const cardPad = compact ? "10px" : tk.padCard;
  const gap = compact ? "8px" : tk.gap;

  return (
    <div style={{ backgroundColor: tk.canvas, color: tk.ink, padding: pad }}>
      <div
        className="overflow-hidden border"
        style={{
          borderColor: tk.border,
          borderRadius: tk.card,
          backgroundColor: tk.surface
        }}
      >
        <div
          className="flex items-center justify-between border-b px-3 py-2 text-[11px]"
          style={{ borderColor: tk.border }}
        >
          <span className="font-bold">acme.dev</span>
          <span
            className="px-2 py-0.5 text-[10px] font-semibold"
            style={{
              backgroundColor: tk.accent,
              color: tk.accentFg,
              borderRadius: tk.ctrl
            }}
          >
            Deploy
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "140px 1fr"
          }}
        >
          {!isMobile ? (
            <div
              className="grid content-start gap-1.5 border-r p-2.5 text-[11px]"
              style={{ borderColor: tk.border, color: tk.muted }}
            >
              <div className="font-semibold" style={{ color: tk.ink }}>
                Overview
              </div>
              <div>Protocols</div>
              <div>Telemetry</div>
              <div>API Tokens</div>
            </div>
          ) : null}
          <div className="grid" style={{ padding: cardPad, gap }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${isMobile ? 1 : 3}, 1fr)`,
                gap: "8px"
              }}
            >
              {(
                [
                  ["Requests", "1.42M"],
                  ["P99", "18ms"],
                  ["Errors", "0.01%"]
                ] as const
              ).map(([k, v]) => (
                <div
                  key={k}
                  className="border px-2.5 py-2"
                  style={{
                    backgroundColor: tk.canvas,
                    borderColor: tk.border,
                    borderRadius: tk.ctrl
                  }}
                >
                  <div className="text-[10px]" style={{ color: tk.muted }}>
                    {k}
                  </div>
                  <div className="font-mono-ui mt-0.5 text-[15px] font-bold">{v}</div>
                </div>
              ))}
            </div>
            <div
              className="border p-2.5 font-mono text-[11px]"
              style={{
                backgroundColor: tk.canvas,
                borderColor: tk.border,
                borderRadius: tk.ctrl,
                color: tk.muted
              }}
            >
              ✓ All sections aligned to {tk.skinName} token contract ({tk.card} radius)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MotionLabSpecimen({
  tokens: tk,
  isMobile,
  compact,
  replayKey
}: SpecimenRenderProps) {
  const pad = compact ? "16px" : isMobile ? "18px" : tk.padStage;
  const cardPad = compact ? "10px" : tk.padCard;
  const gap = compact ? "8px" : tk.gap;

  return (
    <div className="grid" style={{ backgroundColor: tk.canvas, color: tk.ink, padding: pad, gap }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${isMobile ? 1 : 3}, 1fr)`,
          gap
        }}
      >
        {(
          [
            ["99.98", "%", "Frame Stability"],
            ["14.2", "ms", "Spring Settle"],
            ["60", "fps", "Compositor Only"]
          ] as const
        ).map(([val, unit, lbl]) => (
          <div
            key={lbl}
            className="border"
            style={{
              backgroundColor: tk.surface,
              borderColor: tk.border,
              borderRadius: tk.card,
              padding: cardPad
            }}
          >
            <div
              className="font-mono-ui font-bold"
              style={{ fontSize: compact ? "16px" : "24px" }}
            >
              {compact ? val : <AnimatedCounter target={val} replayKey={replayKey} />}
              <span style={{ color: tk.accent }}>{unit}</span>
            </div>
            <div className="mt-1 text-[11.5px]" style={{ color: tk.muted }}>
              {lbl}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {[0, 1, 2, 3, 4].map((idx) => (
          <div
            key={idx}
            className="h-1"
            style={{
              borderRadius: tk.badge,
              backgroundColor: idx < 3 ? tk.accent : tk.border
            }}
          />
        ))}
      </div>
    </div>
  );
}
