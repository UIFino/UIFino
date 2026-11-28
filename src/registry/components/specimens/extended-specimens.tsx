import type { SpecimenRenderProps } from "./hero-specimens";

export function QuotesWallSpecimen({ tokens: tk, isMobile, compact }: SpecimenRenderProps) {
  const pad = compact ? "16px" : isMobile ? "18px" : tk.padStage;
  const cardPad = compact ? "10px" : tk.padCard;
  const gap = compact ? "8px" : tk.gap;

  const quotes = [
    { author: "Maya Lin · Staff Engineer", quote: "Cut edge tail latency by 42% in a single sprint." },
    { author: "Alex Chen · Infra Lead", quote: "Zero cold-start regressions after switching workers." }
  ] as const;

  return (
    <div style={{ backgroundColor: tk.canvas, color: tk.ink, padding: pad }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap
        }}
      >
        {quotes.map((q) => (
          <div
            key={q.author}
            className="grid gap-2 border"
            style={{
              backgroundColor: tk.surface,
              borderColor: tk.border,
              borderRadius: tk.card,
              padding: cardPad
            }}
          >
            <div className="text-xs leading-relaxed">“{q.quote}”</div>
            <div className="font-mono text-[10.5px]" style={{ color: tk.muted }}>
              — {q.author}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FaqAccordionSpecimen({ tokens: tk, isMobile, compact }: SpecimenRenderProps) {
  const pad = compact ? "16px" : isMobile ? "18px" : tk.padStage;

  const items = [
    { q: "How are multi-region edge failovers handled?", a: "Traffic reroutes automatically within 150ms across healthy PoPs.", open: true },
    { q: "Can teams enforce SAML SSO and immutable logs?", a: "Yes, every workspace role binds directly to policy rules.", open: false }
  ] as const;

  return (
    <div style={{ backgroundColor: tk.canvas, color: tk.ink, padding: pad }}>
      <div
        className="mx-auto max-w-[520px] overflow-hidden border"
        style={{
          backgroundColor: tk.surface,
          borderColor: tk.border,
          borderRadius: tk.card
        }}
      >
        {items.map((it, idx) => (
          <div
            key={it.q}
            className="px-3.5 py-2.5"
            style={{ borderTop: idx === 0 ? "none" : `1px solid ${tk.border}` }}
          >
            <div className="flex items-center justify-between gap-2 text-xs font-semibold">
              <span className="truncate">{it.q}</span>
              <span className="font-mono" style={{ color: tk.accent }}>
                {it.open ? "−" : "+"}
              </span>
            </div>
            {it.open && !compact ? (
              <div className="mt-1.5 text-[11.5px]" style={{ color: tk.muted }}>
                {it.a}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CtaBannerSpecimen({ tokens: tk, isMobile, compact }: SpecimenRenderProps) {
  const pad = compact ? "16px" : isMobile ? "18px" : tk.padStage;

  return (
    <div style={{ backgroundColor: tk.canvas, color: tk.ink, padding: pad }}>
      <div
        className="flex flex-wrap items-center justify-between gap-3 border"
        style={{
          backgroundColor: tk.surface,
          borderColor: tk.border,
          borderRadius: tk.card,
          padding: compact ? "12px" : tk.padCard
        }}
      >
        <div className="min-w-0">
          <div className="font-semibold" style={{ fontSize: compact ? "13px" : "18px" }}>
            Ship consistent interfaces faster
          </div>
          {!compact ? (
            <div className="mt-1 font-mono text-[11px]" style={{ color: tk.muted }}>
              $ npx acme-cloud@latest init
            </div>
          ) : null}
        </div>
        <span
          className="inline-flex items-center px-3.5 text-xs font-semibold"
          style={{
            height: compact ? "26px" : tk.btnH,
            backgroundColor: tk.accent,
            color: tk.accentFg,
            borderRadius: tk.ctrl
          }}
        >
          Get Started →
        </span>
      </div>
    </div>
  );
}

export function FooterGridSpecimen({ tokens: tk, isMobile, compact }: SpecimenRenderProps) {
  const pad = compact ? "16px" : isMobile ? "18px" : tk.padStage;

  return (
    <div style={{ backgroundColor: tk.canvas, color: tk.ink, padding: pad }}>
      <div
        className="grid gap-3 border"
        style={{
          backgroundColor: tk.surface,
          borderColor: tk.border,
          borderRadius: tk.card,
          padding: compact ? "12px" : tk.padCard,
          gridTemplateColumns: isMobile ? "1fr 1fr" : "1.4fr 1fr 1fr 1fr"
        }}
      >
        <div>
          <div className="font-mono text-xs font-bold">acme cloud</div>
          <div className="mt-1 text-[10.5px]" style={{ color: tk.muted }}>
            Edge compute &amp; runtime
          </div>
        </div>
        {(
          [
            ["Product", ["Docs", "Changelog"]],
            ["Compute", ["Gateways", "Workers"]],
            ["Company", ["Security", "Status"]]
          ] as const
        ).map(([col, links]) => (
          <div key={col} className="text-[10.5px]">
            <div className="font-mono font-semibold">{col}</div>
            {links.map((l) => (
              <div key={l} className="mt-1" style={{ color: tk.muted }}>
                {l}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function NavbarBarSpecimen({ tokens: tk, isMobile, compact }: SpecimenRenderProps) {
  const pad = compact ? "16px" : isMobile ? "18px" : tk.padStage;

  return (
    <div style={{ backgroundColor: tk.canvas, color: tk.ink, padding: pad }}>
      <div
        className="flex items-center justify-between gap-3 border px-3.5 py-2.5"
        style={{
          backgroundColor: tk.surface,
          borderColor: tk.border,
          borderRadius: tk.card
        }}
      >
        <div className="flex items-center gap-4 text-xs">
          <span className="font-mono font-bold">acme</span>
          {!isMobile ? (
            <span className="flex items-center gap-3" style={{ color: tk.muted }}>
              <span style={{ color: tk.ink, fontWeight: 600 }}>Docs</span>
              <span>Pricing</span>
              <span>Changelog</span>
            </span>
          ) : null}
        </div>
        <span
          className="inline-flex items-center px-2.5 text-[11px] font-semibold"
          style={{
            height: "26px",
            backgroundColor: tk.accent,
            color: tk.accentFg,
            borderRadius: tk.ctrl
          }}
        >
          Sign in
        </span>
      </div>
    </div>
  );
}

export function SidebarNavSpecimen({ tokens: tk, isMobile, compact }: SpecimenRenderProps) {
  const pad = compact ? "14px" : isMobile ? "18px" : tk.padStage;

  return (
    <div style={{ backgroundColor: tk.canvas, color: tk.ink, padding: pad }}>
      <div
        className="grid overflow-hidden border"
        style={{
          backgroundColor: tk.surface,
          borderColor: tk.border,
          borderRadius: tk.card,
          gridTemplateColumns: "156px 1fr"
        }}
      >
        <div className="grid gap-1 border-r p-2.5 text-[11px]" style={{ borderColor: tk.border }}>
          <div
            className="px-2 py-1 font-semibold"
            style={{ backgroundColor: tk.elevated, borderRadius: tk.ctrl }}
          >
            Overview
          </div>
          <div className="px-2 py-1" style={{ color: tk.muted }}>
            Deployments
          </div>
          <div className="px-2 py-1" style={{ color: tk.muted }}>
            API Keys
          </div>
        </div>
        <div className="p-3 text-xs" style={{ color: tk.muted }}>
          <div className="font-semibold" style={{ color: tk.ink }}>
            Workspace Navigation
          </div>
          <div className="mt-1 font-mono text-[10.5px]">Collapsible rail · ⌘B</div>
        </div>
      </div>
    </div>
  );
}

export function AiChatThreadSpecimen({ tokens: tk, isMobile, compact }: SpecimenRenderProps) {
  const pad = compact ? "14px" : isMobile ? "18px" : tk.padStage;

  return (
    <div style={{ backgroundColor: tk.canvas, color: tk.ink, padding: pad }}>
      <div
        className="mx-auto grid max-w-[460px] gap-2.5 border p-3"
        style={{
          backgroundColor: tk.surface,
          borderColor: tk.border,
          borderRadius: tk.card
        }}
      >
        <div
          className="ml-auto px-3 py-1.5 text-xs"
          style={{
            backgroundColor: tk.elevated,
            borderRadius: tk.ctrl
          }}
        >
          Inspect P99 latency spikes in eu-west over the last 1h
        </div>
        <div
          className="border px-3 py-2 text-xs"
          style={{
            backgroundColor: tk.canvas,
            borderColor: tk.border,
            borderRadius: tk.ctrl
          }}
        >
          <span className="font-mono text-[10.5px]" style={{ color: tk.accent }}>
            ● Agent · 14ms
          </span>
          <div className="mt-1" style={{ color: tk.muted }}>
            Queried 42 edge traces · Peak latency 28.4ms on fra1.
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatsKpiSpecimen({ tokens: tk, isMobile, compact }: SpecimenRenderProps) {
  const pad = compact ? "14px" : isMobile ? "18px" : tk.padStage;
  const gap = compact ? "8px" : tk.gap;

  return (
    <div style={{ backgroundColor: tk.canvas, color: tk.ink, padding: pad }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap
        }}
      >
        {(
          [
            ["MRR", "$84,200", "+14.2%"],
            ["Active Users", "18,490", "+6.8%"],
            ["Error Rate", "0.02%", "-0.01%"]
          ] as const
        ).map(([label, val, delta]) => (
          <div
            key={label}
            className="border p-3"
            style={{
              backgroundColor: tk.surface,
              borderColor: tk.border,
              borderRadius: tk.card
            }}
          >
            <div className="flex items-center justify-between text-[11px]" style={{ color: tk.muted }}>
              <span>{label}</span>
              <span className="font-mono" style={{ color: tk.accent }}>
                {delta}
              </span>
            </div>
            <div className="font-mono-ui mt-1 text-lg font-bold tabular-nums">{val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FormDialogSpecimen({ tokens: tk, isMobile, compact }: SpecimenRenderProps) {
  const pad = compact ? "14px" : isMobile ? "18px" : tk.padStage;

  return (
    <div
      className="flex justify-center"
      style={{ backgroundColor: tk.canvas, color: tk.ink, padding: pad }}
    >
      <div
        className="grid w-full max-w-[380px] gap-2.5 border p-3.5"
        style={{
          backgroundColor: tk.surface,
          borderColor: tk.border,
          borderRadius: tk.card
        }}
      >
        <div className="text-xs font-semibold">Create Webhook Endpoint</div>
        <div
          className="border px-2.5 py-1.5 font-mono text-[11px]"
          style={{
            backgroundColor: tk.canvas,
            borderColor: tk.border,
            borderRadius: tk.ctrl,
            color: tk.muted
          }}
        >
          https://api.acme.dev/webhooks
        </div>
        <div className="flex justify-end gap-2">
          <span
            className="inline-flex h-7 items-center border px-2.5 text-[11px]"
            style={{ borderColor: tk.border, borderRadius: tk.ctrl }}
          >
            Cancel
          </span>
          <span
            className="inline-flex h-7 items-center px-3 text-[11px] font-semibold"
            style={{
              backgroundColor: tk.accent,
              color: tk.accentFg,
              borderRadius: tk.ctrl
            }}
          >
            Save
          </span>
        </div>
      </div>
    </div>
  );
}

export function SpotlightCardSpecimen({ tokens: tk, isMobile, compact }: SpecimenRenderProps) {
  const pad = compact ? "14px" : isMobile ? "18px" : tk.padStage;

  return (
    <div style={{ backgroundColor: tk.canvas, color: tk.ink, padding: pad }}>
      <div
        className="relative overflow-hidden border p-4"
        style={{
          backgroundColor: tk.surface,
          borderColor: tk.accent,
          borderRadius: tk.card
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 right-6 h-28 w-28 rounded-full opacity-25 blur-2xl"
          style={{ backgroundColor: tk.accent }}
        />
        <div className="relative z-10">
          <div className="font-mono text-[10.5px]" style={{ color: tk.accent }}>
            CURSOR RADIAL SPOTLIGHT
          </div>
          <div className="mt-1 text-sm font-semibold">
            GPU-composited border illumination
          </div>
        </div>
      </div>
    </div>
  );
}

export function HoverCardSpecimen({ tokens: tk, isMobile, compact }: SpecimenRenderProps) {
  const pad = compact ? "14px" : isMobile ? "18px" : tk.padStage;

  return (
    <div style={{ backgroundColor: tk.canvas, color: tk.ink, padding: pad }}>
      <div className="grid grid-cols-2 gap-2.5">
        {["Micro-Lift 2px", "Border Glow"].map((label, idx) => (
          <div
            key={label}
            className="border p-3 transition-transform duration-150 hover:-translate-y-0.5"
            style={{
              backgroundColor: idx === 0 ? tk.elevated : tk.surface,
              borderColor: idx === 0 ? tk.accent : tk.border,
              borderRadius: tk.card
            }}
          >
            <div className="font-mono text-[10px]" style={{ color: tk.muted }}>
              160ms cubic-bezier
            </div>
            <div className="mt-1 text-xs font-semibold">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
