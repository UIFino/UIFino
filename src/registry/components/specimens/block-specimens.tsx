import type { SpecimenRenderProps } from "./hero-specimens";

export function PricingTiersSpecimen({ tokens: tk, isMobile, compact }: SpecimenRenderProps) {
  const pad = compact ? "16px" : isMobile ? "18px" : tk.padStage;
  const cardPad = compact ? "10px" : tk.padCard;
  const gap = compact ? "8px" : tk.gap;

  const tiers = [
    { tier: "Starter", price: "$0", note: "Public DESIGN.md & core blocks", hot: false },
    { tier: "Pro", price: "$24", note: "Full MCP server + 10 UI style skins", hot: true },
    { tier: "Team", price: "$79", note: "Private brand tokens & CI sync", hot: false }
  ] as const;

  return (
    <div style={{ backgroundColor: tk.canvas, color: tk.ink, padding: pad }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${isMobile ? 1 : 3}, minmax(0, 1fr))`,
          gap
        }}
      >
        {tiers.map((t) => (
          <div
            key={t.tier}
            className="flex flex-col justify-between gap-2.5 border"
            style={{
              backgroundColor: tk.surface,
              borderColor: t.hot ? tk.accent : tk.border,
              borderRadius: tk.card,
              padding: cardPad
            }}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">{t.tier}</span>
                {t.hot ? (
                  <span
                    className="px-1.5 py-px font-mono text-[9px] font-bold"
                    style={{
                      backgroundColor: tk.accent,
                      color: tk.accentFg,
                      borderRadius: tk.badge
                    }}
                  >
                    POPULAR
                  </span>
                ) : null}
              </div>
              <div
                className="font-mono-ui mt-1.5 font-bold"
                style={{ fontSize: compact ? "16px" : "24px" }}
              >
                {t.price}
                <span className="text-[11px] font-normal" style={{ color: tk.muted }}>
                  /mo
                </span>
              </div>
              {!compact ? (
                <p className="mt-1.5 text-xs" style={{ color: tk.muted }}>
                  {t.note}
                </p>
              ) : null}
            </div>
            <span
              className="flex items-center justify-center border text-[11px] font-semibold"
              style={{
                height: compact ? "24px" : tk.btnH,
                borderRadius: tk.ctrl,
                backgroundColor: t.hot ? tk.accent : tk.elevated,
                color: t.hot ? tk.accentFg : tk.ink,
                borderColor: tk.border
              }}
            >
              Select {t.tier}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AuthCardSpecimen({ tokens: tk, isMobile, compact }: SpecimenRenderProps) {
  const pad = compact ? "16px" : isMobile ? "18px" : tk.padStage;
  const cardPad = compact ? "10px" : tk.padCard;

  return (
    <div
      className="flex justify-center"
      style={{ backgroundColor: tk.canvas, color: tk.ink, padding: pad }}
    >
      <div
        className="grid w-full max-w-[360px] border"
        style={{
          backgroundColor: tk.surface,
          borderColor: tk.border,
          borderRadius: tk.card,
          padding: cardPad,
          gap: compact ? "7px" : "12px"
        }}
      >
        <div>
          <div className="font-semibold" style={{ fontSize: compact ? "13px" : "16px" }}>
            Sign in to Workspace
          </div>
          {!compact ? (
            <div className="mt-0.5 text-xs" style={{ color: tk.muted }}>
              Authenticate with Passkey or work email
            </div>
          ) : null}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {["GitHub", "Passkey"].map((provider) => (
            <div
              key={provider}
              className="flex items-center justify-center border text-[11px]"
              style={{
                height: compact ? "24px" : "32px",
                borderColor: tk.border,
                borderRadius: tk.ctrl
              }}
            >
              {provider}
            </div>
          ))}
        </div>
        <div
          className="flex items-center border px-2.5 font-mono text-[11px]"
          style={{
            height: compact ? "26px" : "34px",
            backgroundColor: tk.canvas,
            borderColor: tk.border,
            borderRadius: tk.ctrl,
            color: tk.muted
          }}
        >
          engineer@acme.dev
        </div>
        <div
          className="flex items-center justify-center text-xs font-semibold"
          style={{
            height: compact ? "26px" : tk.btnH,
            backgroundColor: tk.accent,
            color: tk.accentFg,
            borderRadius: tk.ctrl
          }}
        >
          Continue →
        </div>
      </div>
    </div>
  );
}

export function CmdkPaletteSpecimen({ tokens: tk, isMobile, compact }: SpecimenRenderProps) {
  const pad = compact ? "16px" : isMobile ? "18px" : tk.padStage;

  return (
    <div
      className="flex justify-center"
      style={{ backgroundColor: tk.canvas, color: tk.ink, padding: pad }}
    >
      <div
        className="w-full max-w-[460px] overflow-hidden border"
        style={{
          backgroundColor: tk.surface,
          borderColor: tk.border,
          borderRadius: tk.card
        }}
      >
        <div
          className="flex items-center justify-between border-b px-3.5 py-2.5 text-xs"
          style={{ borderColor: tk.border, color: tk.muted }}
        >
          <span>Jump to DESIGN.md, block, or tool…</span>
          <span
            className="font-mono-ui border px-[5px] py-px text-[10px]"
            style={{ borderColor: tk.border, borderRadius: tk.badge }}
          >
            ESC
          </span>
        </div>
        <div className="grid gap-1 p-2 text-xs">
          <div
            className="flex items-center justify-between px-2.5 py-[7px]"
            style={{ backgroundColor: tk.elevated, borderRadius: tk.ctrl }}
          >
            <span>Linear DESIGN.md Protocol</span>
            <span className="font-mono-ui text-[10.5px]" style={{ color: tk.accent }}>
              Catalog ↵
            </span>
          </div>
          <div
            className="flex items-center justify-between px-2.5 py-[7px]"
            style={{ color: tk.muted }}
          >
            <span>Telemetry Counter Hero</span>
            <span className="font-mono-ui text-[10.5px]">Section</span>
          </div>
          {!compact ? (
            <div
              className="flex items-center justify-between px-2.5 py-[7px]"
              style={{ color: tk.muted }}
            >
              <span>Chartreuse Aurora Studio</span>
              <span className="font-mono-ui text-[10.5px]">Tool</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function DataTableSpecimen({ tokens: tk, isMobile, compact }: SpecimenRenderProps) {
  const pad = compact ? "16px" : isMobile ? "18px" : tk.padStage;

  return (
    <div style={{ backgroundColor: tk.canvas, color: tk.ink, padding: pad }}>
      <div
        className="overflow-x-auto border"
        style={{
          borderColor: tk.border,
          backgroundColor: tk.surface,
          borderRadius: tk.card
        }}
      >
        <table
          className="w-full border-collapse"
          style={{ fontSize: compact ? "10.5px" : "12.5px" }}
        >
          <thead>
            <tr
              className="border-b text-left font-mono text-[10.5px]"
              style={{ borderColor: tk.border, color: tk.muted }}
            >
              <th className="px-3 py-2">RESOURCE</th>
              <th className="px-3 py-2">TYPE</th>
              <th className="px-3 py-2">STATUS</th>
              <th className="px-3 py-2 text-right">LATENCY</th>
            </tr>
          </thead>
          <tbody>
            {(
              [
                ["linear.app/design-md", "Catalog", "Verified", "11ms"],
                ["hero-telemetry-counter", "Section", "Synced", "14ms"],
                ["auth-passkey-card", "Block", "Synced", "09ms"]
              ] as const
            ).map(([res, tp, st, lat]) => (
              <tr key={res} className="border-b" style={{ borderColor: tk.border }}>
                <td className="font-mono-ui px-3 py-2 font-medium">{res}</td>
                <td className="px-3 py-2" style={{ color: tk.muted }}>
                  {tp}
                </td>
                <td className="px-3 py-2">
                  <span style={{ color: tk.accent }}>●</span> {st}
                </td>
                <td className="font-mono-ui px-3 py-2 text-right">{lat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function EmptyStateSpecimen({ tokens: tk, isMobile, compact }: SpecimenRenderProps) {
  const pad = compact ? "16px" : isMobile ? "18px" : tk.padStage;

  return (
    <div
      className="flex justify-center"
      style={{ backgroundColor: tk.canvas, color: tk.ink, padding: pad }}
    >
      <div
        className="grid w-full max-w-[420px] gap-2.5 border border-dashed text-center"
        style={{
          backgroundColor: tk.surface,
          borderColor: tk.border,
          borderRadius: tk.card,
          padding: compact ? "14px" : "24px"
        }}
      >
        <div className="font-mono-ui text-[10px]" style={{ color: tk.muted }}>
          0 RECORDS · BLUEPRINT EMPTY
        </div>
        <div className="font-semibold" style={{ fontSize: compact ? "13px" : "16px" }}>
          No deployments match current filter
        </div>
        {!compact ? (
          <div className="text-xs" style={{ color: tk.muted }}>
            Reset active filters or import your first DESIGN.md protocol via CLI.
          </div>
        ) : null}
        <div className="mt-1 flex justify-center gap-2">
          <span
            className="inline-flex items-center px-3 text-[11.5px] font-semibold"
            style={{
              height: compact ? "24px" : tk.btnH,
              backgroundColor: tk.accent,
              color: tk.accentFg,
              borderRadius: tk.ctrl
            }}
          >
            Create Item
          </span>
          <span
            className="inline-flex items-center border px-3 text-[11.5px]"
            style={{
              height: compact ? "24px" : tk.btnH,
              borderColor: tk.border,
              borderRadius: tk.ctrl
            }}
          >
            Clear Filters
          </span>
        </div>
      </div>
    </div>
  );
}

export function BentoGridSpecimen({ tokens: tk, isMobile, compact }: SpecimenRenderProps) {
  const pad = compact ? "16px" : isMobile ? "18px" : tk.padStage;
  const cardPad = compact ? "10px" : tk.padCard;
  const gap = compact ? "8px" : tk.gap;

  return (
    <div style={{ backgroundColor: tk.canvas, color: tk.ink, padding: pad }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.35fr 1fr",
          gap
        }}
      >
        <div
          className="flex min-w-0 flex-col justify-between border"
          style={{
            backgroundColor: tk.surface,
            borderColor: tk.border,
            borderRadius: tk.card,
            padding: cardPad
          }}
        >
          <div>
            <span className="font-mono-ui text-[10px]" style={{ color: tk.accent }}>
              01 · PROTOCOL MATRIX
            </span>
            <div
              className="mt-1.5 font-semibold"
              style={{ fontSize: compact ? "14px" : "18px" }}
            >
              Zero-drift design tokens
            </div>
          </div>
          <div
            className="mt-3 truncate border px-2.5 py-2 font-mono text-[11px]"
            style={{
              backgroundColor: tk.canvas,
              borderColor: tk.border,
              borderRadius: tk.ctrl,
              color: tk.muted
            }}
          >
            radius: {tk.card} · density: {tk.density}
          </div>
        </div>
        <div className="grid min-w-0" style={{ gap }}>
          <div
            className="border"
            style={{
              backgroundColor: tk.surface,
              borderColor: tk.border,
              borderRadius: tk.card,
              padding: cardPad
            }}
          >
            <span className="font-mono-ui text-[10px]" style={{ color: tk.muted }}>
              02 · STACK
            </span>
            <div className="mt-1 font-mono text-xs font-semibold">
              React 19 · Tailwind v4
            </div>
          </div>
          <div
            className="border"
            style={{
              backgroundColor: tk.surface,
              borderColor: tk.border,
              borderRadius: tk.card,
              padding: cardPad
            }}
          >
            <span className="font-mono-ui text-[10px]" style={{ color: tk.muted }}>
              03 · MCP READY
            </span>
            <div className="mt-1 font-mono text-xs" style={{ color: tk.accent }}>
              14ms retrieval
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
