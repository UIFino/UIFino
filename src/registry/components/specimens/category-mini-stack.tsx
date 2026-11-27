import type { ReactNode } from "react";
import type { CategoryMiniKind } from "@/core/codegen";

export function CategoryMiniStack({ miniKind }: { readonly miniKind: CategoryMiniKind }) {
  let frontInner: ReactNode;

  if (miniKind === "hero") {
    frontInner = (
      <div className="pt-0.5 text-center">
        <span className="inline-block border border-strong px-1.5 py-px font-mono text-[8px] text-accent-text">
          v2.4
        </span>
        <div className="mt-[5px] text-[11.5px] leading-[1.15] font-semibold text-ink">
          Production UI with real protocols
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1">
          {["550+", "14ms", "99.9%"].map((v) => (
            <div key={v} className="border border-hairline p-[3px] font-mono text-[8.5px]">
              {v}
            </div>
          ))}
        </div>
      </div>
    );
  } else if (miniKind === "pricing") {
    frontInner = (
      <div className="grid h-full grid-cols-3 gap-[5px]">
        {["$0", "$29", "$99"].map((price, idx) => (
          <div
            key={price}
            className="bg-surface p-1.5"
            style={{
              border: `1px solid ${idx === 1 ? "var(--accent-border)" : "var(--border-hairline)"}`
            }}
          >
            <div
              className="font-mono-ui text-[10px] font-bold"
              style={{ color: idx === 1 ? "var(--accent-text)" : "var(--text-primary)" }}
            >
              {price}
            </div>
            <div className="mt-1.5 h-[3px] w-[85%] bg-gray-300" />
            <div className="mt-1 h-[3px] w-[60%] bg-gray-200" />
          </div>
        ))}
      </div>
    );
  } else if (miniKind === "quotes") {
    frontInner = (
      <div className="grid grid-cols-2 gap-1.5 text-[8.5px]">
        <div className="border border-hairline bg-surface p-1.5">
          <div className="text-ink">“Zero token drift.”</div>
          <div className="mt-1 font-mono text-[7.5px] text-subtle">— Staff UI</div>
        </div>
        <div className="border border-hairline bg-surface p-1.5">
          <div className="text-ink">“14ms MCP sync.”</div>
          <div className="mt-1 font-mono text-[7.5px] text-subtle">— Infra Lead</div>
        </div>
      </div>
    );
  } else if (miniKind === "faq" || miniKind === "accordion") {
    frontInner = (
      <div className="grid gap-1 text-[8.5px]">
        <div className="flex justify-between border border-hairline bg-surface px-1.5 py-1">
          <span className="font-medium text-ink">How does DESIGN.md sync?</span>
          <span className="font-mono text-accent-text">−</span>
        </div>
        <div className="flex justify-between border border-hairline bg-surface px-1.5 py-1 text-muted">
          <span>Custom radius scale?</span>
          <span className="font-mono">+</span>
        </div>
      </div>
    );
  } else if (miniKind === "cta") {
    frontInner = (
      <div className="flex h-[74px] items-center justify-between gap-2 border border-hairline bg-surface px-2.5">
        <div>
          <div className="text-[10px] font-semibold text-ink">Ship faster today</div>
          <div className="mt-0.5 font-mono text-[8px] text-subtle">$ npx uifino init</div>
        </div>
        <span className="bg-accent-fill px-2 py-1 text-[8px] font-bold text-accent-ink">
          Start →
        </span>
      </div>
    );
  } else if (miniKind === "footer") {
    frontInner = (
      <div className="grid h-[74px] grid-cols-4 gap-1.5 border-t border-hairline pt-2 text-[8px]">
        <div className="font-mono font-bold text-ink">uifino</div>
        {[1, 2, 3].map((col) => (
          <div key={col} className="grid content-start gap-1">
            <div className="h-[3px] w-8 bg-gray-300" />
            <div className="h-[3px] w-6 bg-gray-200" />
            <div className="h-[3px] w-7 bg-gray-200" />
          </div>
        ))}
      </div>
    );
  } else if (miniKind === "navbar") {
    frontInner = (
      <div className="grid gap-2">
        <div className="flex items-center justify-between border border-hairline bg-surface px-2 py-1.5 text-[8.5px]">
          <span className="font-mono font-bold text-ink">acme</span>
          <span className="text-muted">Docs · Pricing</span>
          <span className="bg-contrast-bg px-1.5 py-0.5 text-[7.5px] text-contrast-fg">Login</span>
        </div>
        <div className="h-8 border border-dashed border-hairline" />
      </div>
    );
  } else if (miniKind === "sidebar") {
    frontInner = (
      <div className="grid h-[78px] grid-cols-[44px_1fr] gap-1.5">
        <div className="flex flex-col gap-1 border-r border-hairline pr-1.5">
          <div className="h-1.5 w-full bg-accent-fill" />
          <div className="h-1 w-[80%] bg-gray-300" />
          <div className="h-1 w-[65%] bg-gray-200" />
        </div>
        <div className="border border-hairline bg-surface p-1.5 font-mono text-[8px] text-subtle">
          ⌘B Rail
        </div>
      </div>
    );
  } else if (miniKind === "chat") {
    frontInner = (
      <div className="grid gap-1.5 text-[8.5px]">
        <div className="ml-auto border border-hairline bg-surface px-2 py-1 text-ink">
          Generate pricing grid
        </div>
        <div className="border border-accent-border bg-code px-2 py-1 text-accent-text">
          ● Matched DESIGN.md
        </div>
      </div>
    );
  } else if (miniKind === "auth") {
    frontInner = (
      <div className="flex flex-col gap-[5px]">
        <div className="text-[10px] font-semibold">Continue with Passkey</div>
        <div className="flex h-[18px] items-center border border-hairline px-1.5 font-mono text-[8.5px] text-subtle">
          dev@company.com
        </div>
        <div className="flex h-[18px] items-center justify-center bg-contrast-bg text-[8.5px] font-semibold text-contrast-fg">
          Sign in →
        </div>
      </div>
    );
  } else if (miniKind === "cmdk") {
    frontInner = (
      <div>
        <div className="flex justify-between border-b border-hairline pb-[5px] font-mono text-[8.5px] text-subtle">
          <span>Search protocol…</span>
          <span>⌘K</span>
        </div>
        <div className="mt-1.5 flex justify-between bg-gray-100 px-1.5 py-1 text-[9px]">
          <span>Linear DESIGN.md</span>
          <span className="font-mono-ui text-accent-text">↵</span>
        </div>
        <div className="mt-[3px] flex justify-between px-1.5 py-[3px] text-[9px] text-muted">
          <span>Hero Telemetry</span>
          <span className="font-mono-ui">tsx</span>
        </div>
      </div>
    );
  } else if (miniKind === "table") {
    frontInner = (
      <div className="font-mono-ui text-[8.5px]">
        <div className="flex justify-between border-b border-hairline pb-1 text-subtle">
          <span>ASSET</span>
          <span>LATENCY</span>
        </div>
        {[
          ["linear.app", "12ms"],
          ["hero-counter", "14ms"],
          ["auth-passkey", "09ms"]
        ].map(([asset, lat]) => (
          <div key={asset} className="flex justify-between pt-[5px]">
            <span>{asset}</span>
            <span className="text-accent-text">{lat}</span>
          </div>
        ))}
      </div>
    );
  } else if (miniKind === "stats") {
    frontInner = (
      <div className="grid h-[76px] grid-cols-2 gap-1.5">
        <div className="border border-hairline bg-surface p-1.5">
          <div className="text-[7.5px] text-subtle">MRR</div>
          <div className="font-mono-ui mt-1 text-[11px] font-bold text-ink">$84.2k</div>
          <div className="font-mono text-[7.5px] text-accent-text">+14.2%</div>
        </div>
        <div className="border border-hairline bg-surface p-1.5">
          <div className="text-[7.5px] text-subtle">P99</div>
          <div className="font-mono-ui mt-1 text-[11px] font-bold text-ink">14ms</div>
          <div className="font-mono text-[7.5px] text-accent-text">-3.1ms</div>
        </div>
      </div>
    );
  } else if (miniKind === "form") {
    frontInner = (
      <div className="grid gap-1.5 border border-hairline bg-surface p-1.5 text-[8.5px]">
        <div className="font-semibold text-ink">Create Endpoint</div>
        <div className="border border-hairline bg-canvas px-1.5 py-0.5 font-mono text-[8px] text-subtle">
          https://api.acme.dev
        </div>
        <div className="ml-auto bg-accent-fill px-2 py-0.5 text-[7.5px] font-bold text-accent-ink">
          Save
        </div>
      </div>
    );
  } else if (miniKind === "empty") {
    frontInner = (
      <div className="flex h-[76px] flex-col items-center justify-center gap-1 border border-dashed border-hairline text-center">
        <div className="font-mono text-[8px] text-subtle">0 ITEMS</div>
        <div className="text-[9px] font-medium text-ink">No matching records</div>
      </div>
    );
  } else if (miniKind === "spotlight" || miniKind === "hover") {
    frontInner = (
      <div className="relative flex h-[76px] flex-col justify-between overflow-hidden border border-accent-border bg-surface p-2">
        <span className="font-mono text-[8px] text-accent-text">GPU COMPOSITED</span>
        <span className="text-[10px] font-semibold text-ink">
          {miniKind === "spotlight" ? "Radial Cursor Glow" : "160ms Spring Lift"}
        </span>
      </div>
    );
  } else if (miniKind === "motion") {
    frontInner = (
      <div className="flex h-[78px] flex-col justify-between">
        <div className="flex items-baseline justify-between">
          <span className="font-mono-ui text-base font-bold text-ink">
            99.9<span className="text-accent-text">%</span>
          </span>
          <span className="font-mono-ui text-[8.5px] text-subtle">60 FPS</span>
        </div>
        <div className="grid grid-cols-5 gap-[3px]">
          <span className="h-[3px] bg-accent-fill" />
          <span className="h-[3px] bg-accent-fill" />
          <span className="h-[3px] bg-accent-fill" />
          <span className="h-[3px] bg-gray-300" />
          <span className="h-[3px] bg-gray-300" />
        </div>
      </div>
    );
  } else {
    frontInner = (
      <div className="grid h-[78px] grid-cols-[1.4fr_1fr] gap-[5px]">
        <div className="border border-hairline bg-surface p-1.5">
          <div className="font-mono-ui text-[8.5px] text-accent-text">01 · BENTO</div>
          <div className="mt-1.5 h-1 w-[85%] bg-gray-300" />
          <div className="mt-1 h-1 w-[60%] bg-gray-200" />
        </div>
        <div className="grid gap-[5px]">
          <div className="border border-hairline bg-surface" />
          <div className="border border-hairline bg-surface" />
        </div>
      </div>
    );
  }

  return (
    <div className="mini-stack" aria-hidden="true">
      <div className="mini-sheet mini-sheet-1" />
      <div className="mini-sheet mini-sheet-2" />
      <div className="mini-sheet mini-sheet-3">{frontInner}</div>
    </div>
  );
}
