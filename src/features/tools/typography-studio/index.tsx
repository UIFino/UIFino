"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { CodeViewer } from "@/components/patterns/code-viewer";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { SegmentedControl } from "@/components/primitives/segmented";
import { RangeSlider } from "@/components/primitives/slider";
import type { StudioCodeFormat } from "@/core/studios/background";
import {
  computeFluidSpaceScale,
  computeTypeScale,
  EASING_PRESETS,
  FONT_PAIRINGS,
  serializeTypographyCode
} from "@/core/studios/typography";
import { StudioShell } from "../studio-shell";

const SCALE_RATIOS = [
  { label: "1.125 Major 2nd", value: 1.125 },
  { label: "1.200 Minor 3rd", value: 1.2 },
  { label: "1.250 Major 3rd", value: 1.25 },
  { label: "1.333 Perfect 4th", value: 1.333 }
] as const;

type ScaleMode = "modular" | "fluid";

export function TypographyStudioView() {
  const locale = useLocale();
  const isZh = locale === "zh";

  const [scaleMode, setScaleMode] = useState<ScaleMode>("fluid");
  const [basePx, setBasePx] = useState(16);
  const [ratio, setRatio] = useState(1.25);
  const [pairingId, setPairingId] = useState(FONT_PAIRINGS[0]!.id);
  const [format, setFormat] = useState<StudioCodeFormat>("css");

  const pairing = FONT_PAIRINGS.find((p) => p.id === pairingId) ?? FONT_PAIRINGS[0]!;
  const steps = computeTypeScale(basePx, ratio);
  const spaces = computeFluidSpaceScale(basePx);
  const isFluid = scaleMode === "fluid";
  const code = serializeTypographyCode(steps, EASING_PRESETS[0]!, format, isFluid, pairing);

  return (
    <StudioShell
      activeStudio="typography"
      format={format}
      currentCode={code}
      onFormatChange={setFormat}
      onLoadSkin={(skin) => {
        if ("fonts" in skin && skin.fonts.serif) {
          setPairingId("editorial-serif");
        } else {
          setPairingId("geist-system");
        }
      }}
    >
      <div className="grid gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SegmentedControl
            options={[
              { value: "fluid" as ScaleMode, label: isZh ? "Utopia 流体 clamp() 字阶" : "Fluid clamp() Scale" },
              { value: "modular" as ScaleMode, label: isZh ? "固定比例字阶" : "Fixed Modular Scale" }
            ]}
            value={scaleMode}
            onChange={setScaleMode}
          />

          <div className="flex flex-wrap items-center gap-1.5">
            {FONT_PAIRINGS.map((fp) => (
              <Button
                key={fp.id}
                variant={pairingId === fp.id ? "contrast" : "hairline"}
                size="sm"
                onClick={() => setPairingId(fp.id)}
              >
                {isZh ? fp.nameZh : fp.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left: Scale Ladder + Bilingual Article & Data Card Specimen */}
          <div className="grid min-w-0 gap-4">
            <div className="border border-hairline bg-surface">
              <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
                <span className="eyebrow-mono">
                  {isFluid ? "FLUID CLAMP() LADDER (375px → 1440px)" : "MODULAR TYPE LADDER"}
                </span>
                <Badge variant="accent">{pairing.license}</Badge>
              </div>

              {[...steps].reverse().map((s, idx) => (
                <div
                  key={s.token}
                  className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-baseline sm:justify-between"
                  style={{
                    borderTop: idx === 0 ? "none" : "1px solid var(--border-hairline)"
                  }}
                >
                  <div className="flex shrink-0 flex-col gap-0.5 font-mono text-[11px] text-muted sm:w-52">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-accent-text">{s.token}</span>
                      <span>{s.px}px</span>
                      <span className="text-subtle">lh {s.lineHeight}</span>
                    </div>
                    <span className="truncate text-[10px] text-subtle">
                      {isFluid ? s.clampCss : `${s.rem} · track ${s.tracking}`}
                    </span>
                  </div>

                  <div
                    className="min-w-0 flex-1 truncate font-semibold text-ink"
                    style={{
                      fontFamily: s.power >= 2 ? pairing.display : pairing.body,
                      fontSize: `${s.px}px`,
                      lineHeight: s.lineHeight,
                      letterSpacing: s.tracking
                    }}
                  >
                    {isZh ? s.sampleZh : s.sampleEn}
                  </div>
                </div>
              ))}
            </div>

            {/* Real Bilingual Long-Form & Metric Card Specimen */}
            <div className="border border-hairline bg-surface p-6">
              <div className="eyebrow-mono mb-3 text-accent-text">
                {isZh ? "中英双语长文与数据卡片真实排版预览" : "BILINGUAL ARTICLE & CARD SPECIMEN"}
              </div>
              <article className="max-w-[65ch]">
                <h2
                  className="m-0 font-semibold text-ink"
                  style={{
                    fontFamily: pairing.display,
                    fontSize: `${steps[5]?.px ?? 30}px`,
                    lineHeight: steps[5]?.lineHeight ?? "1.18",
                    letterSpacing: steps[5]?.tracking ?? "-0.025em"
                  }}
                >
                  {isZh
                    ? "克制的排版秩序决定界面的专业质感"
                    : "Typographic hierarchy defines interface restraint."}
                </h2>
                <p
                  className="mt-3 text-body"
                  style={{
                    fontFamily: pairing.body,
                    fontSize: `${steps[2]?.px ?? 16}px`,
                    lineHeight: steps[2]?.lineHeight ?? "1.62"
                  }}
                >
                  {isZh
                    ? "中文混排正文保持 1.60 以上宽松行高与 65ch 单行阅读宽度；大标题自动收紧负字距（-0.025em），让页面像精装杂志般呼吸舒展。Metrics like 99.98% stay aligned via tabular-nums."
                    : "Bilingual copy pairs tight negative tracking on display headings with generous 1.62 body line-height and 65ch reading measure. Metrics like 99.98% stay locked via tabular-nums."}
                </p>
              </article>
            </div>

            <CodeViewer
              code={code}
              lang={format === "tailwind" ? "tsx" : "css"}
              title={format === "tailwind" ? "typography.config.ts" : "typography.css"}
              copyLabel={`Copy ${format === "tailwind" ? "Tailwind" : "CSS"}`}
            />
          </div>

          {/* Right: Controls + Fluid Spacing Table */}
          <div className="grid gap-4 border border-hairline bg-surface p-5">
            <div className="eyebrow-mono text-accent-text">SCALE &amp; PAIRING CONTROLS</div>

            <div className="border border-hairline bg-code p-3 text-xs">
              <div className="font-semibold text-ink">{isZh ? pairing.nameZh : pairing.name}</div>
              <div className="mt-1 text-muted">{isZh ? pairing.toneZh : pairing.toneEn}</div>
            </div>

            <RangeSlider
              label={isZh ? "桌面端基准正文 (Base)" : "Desktop Base Body Size"}
              valueDisplay={`${basePx}px`}
              min={13}
              max={20}
              step={1}
              value={basePx}
              onChange={setBasePx}
            />

            <div>
              <div className="mb-2 text-xs text-muted">{isZh ? "比例系数 (Ratio)" : "Modular Ratio"}</div>
              <div className="grid gap-1.5">
                {SCALE_RATIOS.map((r) => (
                  <Button
                    key={r.label}
                    variant="hairline"
                    size="sm"
                    onClick={() => setRatio(r.value)}
                    className={
                      ratio === r.value
                        ? "justify-between border-accent-border text-accent-text"
                        : "justify-between"
                    }
                  >
                    <span>{r.label}</span>
                    <span className="font-mono">{r.value}</span>
                  </Button>
                ))}
              </div>
            </div>

            {isFluid ? (
              <div className="border-t border-hairline pt-4">
                <div className="eyebrow-mono mb-2">
                  {isZh ? "配套流体间距 (FLUID SPACING)" : "FLUID SPACING CLAMP()"}
                </div>
                <div className="grid gap-1.5 font-mono text-[11px]">
                  {spaces.map((sp) => (
                    <div
                      key={sp.token}
                      className="flex items-center justify-between gap-2 border border-hairline bg-code px-2.5 py-1.5"
                    >
                      <span className="text-accent-text">--{sp.token}</span>
                      <span className="text-muted">
                        {sp.minPx}px → {sp.maxPx}px
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </StudioShell>
  );
}
