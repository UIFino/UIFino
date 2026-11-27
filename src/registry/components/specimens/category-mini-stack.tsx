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
  } else if (miniKind === "page") {
    frontInner = (
      <div className="grid h-full grid-cols-[34px_1fr] gap-1.5">
        <div className="flex flex-col gap-1 border-r border-hairline pr-1">
          <div className="h-1 w-[80%] bg-accent-text" />
          <div className="h-[3px] w-full bg-gray-300" />
          <div className="h-[3px] w-[70%] bg-gray-300" />
        </div>
        <div className="flex flex-col gap-[5px]">
          <div className="grid grid-cols-3 gap-1">
            <div className="h-[18px] border border-hairline bg-surface" />
            <div className="h-[18px] border border-hairline bg-surface" />
            <div className="h-[18px] border border-hairline bg-surface" />
          </div>
          <div className="flex-1 border border-hairline bg-surface" />
        </div>
      </div>
    );
  } else if (miniKind === "motion") {
    frontInner = (
      <div className="flex h-[82px] flex-col justify-between">
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
      <div className="grid h-[82px] grid-cols-[1.4fr_1fr] gap-[5px]">
        <div className="border border-hairline bg-surface p-1.5">
          <div className="font-mono-ui text-[8.5px] text-accent-text">01 · SYNC</div>
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
