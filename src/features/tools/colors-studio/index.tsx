"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { CodeViewer } from "@/components/patterns/code-viewer";
import { Badge } from "@/components/primitives/badge";
import { SegmentedControl } from "@/components/primitives/segmented";
import type { StudioCodeFormat } from "@/core/studios/background";
import {
  computeWcagContrast,
  generateColorShadeScale,
  serializeColorScaleCode
} from "@/core/studios/colors";
import { useClipboard } from "@/hooks/use-clipboard";
import { StudioShell } from "../studio-shell";

const BRAND_SEED_COLORS = [
  { label: "Indigo", hex: "#5E6AD2" },
  { label: "Signal Lime", hex: "#D4FF33" },
  { label: "Terracotta", hex: "#C96442" },
  { label: "Sky Cyan", hex: "#0EA5E9" },
  { label: "Vermilion", hex: "#FF3B1D" }
] as const;

export function ColorsStudioView() {
  const locale = useLocale();
  const isZh = locale === "zh";
  const { copy } = useClipboard();

  const [tabRaw, setTab] = useQueryState("tab", parseAsString.withDefault("shades"));
  const activeTab: "shades" | "contrast" = tabRaw === "contrast" ? "contrast" : "shades";

  const [baseHex, setBaseHex] = useState("#5E6AD2");
  const [fgHex, setFgHex] = useState("#F3F5F8");
  const [bgHex, setBgHex] = useState("#0A0B0E");
  const [format, setFormat] = useState<StudioCodeFormat>("css");

  const shades = generateColorShadeScale(baseHex);
  const audit = computeWcagContrast(fgHex, bgHex);
  const code = serializeColorScaleCode("primary", shades, format);

  return (
    <StudioShell
      activeStudio="colors"
      format={format}
      currentCode={code}
      onFormatChange={setFormat}
    >
      <div className="grid gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SegmentedControl
            options={[
              { value: "shades" as const, label: isZh ? "色阶生成" : "Shades" },
              { value: "contrast" as const, label: isZh ? "对比度检查" : "Contrast" }
            ]}
            value={activeTab}
            onChange={(v) => void setTab(v)}
          />

          <div className="flex flex-wrap items-center gap-1.5">
            {BRAND_SEED_COLORS.map((seed) => (
              <button
                key={seed.hex}
                type="button"
                onClick={() => setBaseHex(seed.hex)}
                className="inline-flex h-7 cursor-pointer items-center gap-1.5 border border-hairline bg-surface px-2.5 text-xs hover:border-accent-border"
              >
                <span className="h-2.5 w-2.5 border border-hairline" style={{ backgroundColor: seed.hex }} />
                <span>{seed.label}</span>
              </button>
            ))}
          </div>
        </div>

        {activeTab === "shades" ? (
          <div className="grid gap-5">
            <div className="border border-hairline bg-surface p-5">
              <div className="mb-3.5 flex flex-wrap items-center justify-between gap-3">
                <span className="eyebrow-mono">50 — 950 SHADE LADDER</span>
                <label className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-muted">Seed (500):</span>
                  <input
                    type="color"
                    value={baseHex}
                    onChange={(e) => setBaseHex(e.target.value)}
                    className="h-7 w-9 cursor-pointer border border-hairline bg-transparent"
                  />
                  <input
                    type="text"
                    value={baseHex}
                    onChange={(e) => setBaseHex(e.target.value)}
                    className="h-7 w-24 border border-hairline bg-code px-2 font-mono text-xs text-ink"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-6 lg:grid-cols-11">
                {shades.map((s) => (
                  <button
                    key={s.stop}
                    type="button"
                    onClick={() => void copy(s.hex, `Copied ${s.hex}`)}
                    className="flex cursor-pointer flex-col gap-1.5 border border-hairline bg-canvas p-2 text-left transition-colors hover:border-accent-border"
                  >
                    <span
                      className="h-14 w-full border border-hairline"
                      style={{ backgroundColor: s.hex }}
                    />
                    <span className="font-mono text-[11px] font-semibold text-ink">{s.stop}</span>
                    <span className="font-mono text-[10px] text-muted">{s.hex}</span>
                  </button>
                ))}
              </div>
            </div>

            <CodeViewer
              code={code}
              lang={format === "tailwind" ? "tsx" : "css"}
              title={format === "tailwind" ? "colors.config.ts" : "colors.css"}
              copyLabel={`Copy ${format === "tailwind" ? "Tailwind" : "CSS"}`}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div
              className="flex min-h-[250px] flex-col justify-between border border-hairline p-7"
              style={{ backgroundColor: bgHex, color: fgHex }}
            >
              <div className="font-mono text-xs opacity-80">WCAG 2.1 LIVE SPECIMEN</div>
              <div>
                <div className="text-2xl font-semibold">
                  {isZh ? "清晰可读的正文与标题对比度校验" : "Accessible interface contrast check"}
                </div>
                <p className="mt-2 text-sm opacity-90">
                  {isZh
                    ? "正文对比度不低于 4.5:1，大号标题与图标不低于 3.0:1。"
                    : "Body text requires >= 4.5:1 contrast; large headlines require >= 3.0:1."}
                </p>
              </div>
              <div className="font-mono text-xl font-bold tabular-nums">{audit.ratioText}</div>
            </div>

            <div className="grid content-start gap-4 border border-hairline bg-surface p-5">
              <div className="eyebrow-mono text-accent-text">CONTRAST AUDIT</div>

              <div className="grid grid-cols-2 gap-3">
                <label className="grid gap-1.5 text-xs">
                  <span className="text-muted">{isZh ? "前景色 (文字)" : "Foreground"}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={fgHex}
                      onChange={(e) => setFgHex(e.target.value)}
                      className="h-8 w-10 cursor-pointer border border-hairline bg-transparent"
                    />
                    <input
                      type="text"
                      value={fgHex}
                      onChange={(e) => setFgHex(e.target.value)}
                      className="h-8 w-full border border-hairline bg-code px-2 font-mono text-xs"
                    />
                  </div>
                </label>

                <label className="grid gap-1.5 text-xs">
                  <span className="text-muted">{isZh ? "背景色 (画布)" : "Background"}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={bgHex}
                      onChange={(e) => setBgHex(e.target.value)}
                      className="h-8 w-10 cursor-pointer border border-hairline bg-transparent"
                    />
                    <input
                      type="text"
                      value={bgHex}
                      onChange={(e) => setBgHex(e.target.value)}
                      className="h-8 w-full border border-hairline bg-code px-2 font-mono text-xs"
                    />
                  </div>
                </label>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                {(
                  [
                    ["AA Body (4.5)", audit.aaNormal],
                    ["AA Large (3.0)", audit.aaLarge],
                    ["AAA Body (7.0)", audit.aaaNormal]
                  ] as const
                ).map(([label, pass]) => (
                  <div key={label} className="border border-hairline bg-code p-2.5">
                    <div className="text-[11px] text-muted">{label}</div>
                    <div className="mt-1">
                      <Badge variant={pass ? "accent" : "sharp"}>
                        {pass ? "PASS" : "FAIL"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </StudioShell>
  );
}
