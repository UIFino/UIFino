"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { Link } from "@/i18n/navigation";

export function WorkflowRail() {
  const t = useTranslations("home");
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const steps = [
    [1, t("wf1")],
    [2, t("wf2")],
    [3, t("wf3")],
    [4, t("wf4")]
  ] as const;

  return (
    <div>
      <Badge variant="ribbon">{t("workflowRibbon")}</Badge>

      <div className="mt-[18px] grid grid-cols-4 gap-1.5">
        {steps.map(([num, label]) => {
          const active = step === num;
          return (
            <button
              key={num}
              type="button"
              onClick={() => setStep(num)}
              className="cursor-pointer border-0 bg-transparent p-0 text-left"
            >
              <div
                className="h-[3px] transition-colors duration-150"
                style={{
                  backgroundColor: active ? "var(--accent-fill)" : "var(--gray-300)"
                }}
              />
              <div
                className="font-mono-ui mt-[7px] truncate text-[11px]"
                style={{
                  fontWeight: active ? 700 : 500,
                  color: active ? "var(--text-primary)" : "var(--text-subtle)"
                }}
              >
                {label}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 border border-hairline bg-surface p-4">
        {step === 1 ? (
          <div className="grid gap-2.5">
            <div className="flex items-center justify-between font-mono text-[11px] text-muted">
              <span>linear.app / DESIGN.md</span>
              <span className="text-accent-text">42 TOKENS</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {(
                [
                  ["#08090A", "Canvas"],
                  ["#121316", "Surface"],
                  ["#23252A", "Hairline"],
                  ["#F7F8F8", "Ink"],
                  ["#5E6AD2", "Accent"]
                ] as const
              ).map(([hex, lbl]) => (
                <div key={lbl} className="border border-hairline bg-code p-1.5">
                  <div className="h-6 border border-strong" style={{ backgroundColor: hex }} />
                  <div className="font-mono-ui mt-[5px] text-[9.5px]">{hex}</div>
                  <div className="text-[9px] text-subtle">{lbl}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border border-hairline bg-code px-2.5 py-2 font-mono text-[11px]">
              <span>Geist / Geist Mono · radius 6px</span>
              <Link href="/catalog/linear" className="text-accent-text hover:underline">
                {t("openSpec")}
              </Link>
            </div>
          </div>
        ) : step === 2 ? (
          <div className="grid gap-2.5">
            <div className="flex items-center justify-between font-mono text-[11px] text-muted">
              <span>hero-telemetry-counter</span>
              <span className="text-accent-text">React · Tailwind</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="border border-hairline bg-code p-2.5">
                <div className="eyebrow-mono">RADIUS</div>
                <div className="font-mono-ui mt-1 text-[13px]">
                  0px · 4px · <span className="font-bold text-accent-text">[6px]</span> · 12px
                </div>
              </div>
              <div className="border border-hairline bg-code p-2.5">
                <div className="eyebrow-mono">DENSITY</div>
                <div className="font-mono-ui mt-1 text-[13px]">
                  Compact · <span className="font-bold text-accent-text">[Default]</span> · Spacious
                </div>
              </div>
            </div>
            <Link href="/components/hero/hero-telemetry-counter">
              <Button
                variant="hairline"
                className="w-full justify-between font-mono text-[11.5px]"
              >
                <span>{t("openWorkbench")}</span>
                <span className="text-accent-text">→</span>
              </Button>
            </Link>
          </div>
        ) : step === 3 ? (
          <pre className="m-0 overflow-x-auto border border-hairline bg-code p-3 font-mono text-[11.5px] leading-[1.55] text-body">{`---
protocol: uifino/design-md@1.0
skin: "Linear (#08090A / #5E6AD2)"
assets: ["section/hero-telemetry-counter", "block/auth-passkey-card"]
guardrails:
  - "1px solid #23252A structural borders; zero arbitrary neon gradients"
  - "tabular-nums on all metrics; collapse 4-col strip below 640px"
---`}</pre>
        ) : (
          <div className="grid gap-2 font-mono text-[11.5px]">
            <div className="border border-hairline bg-code px-3 py-[9px] text-body">
              <span className="text-accent-text">Prompt ▸</span> Build a dark SaaS telemetry hero
              &amp; passkey login matching Linear DESIGN.md.
            </div>
            <div className="flex items-center justify-between border border-accent-border bg-code px-3 py-[9px] text-ink">
              <span>✓ MCP matched linear.app + 2 tuned React blocks (14ms)</span>
              <Link href="/mcp" className="text-accent-text hover:underline">
                MCP →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
