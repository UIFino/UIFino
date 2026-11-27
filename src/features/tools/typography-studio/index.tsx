"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { CodeViewer } from "@/components/patterns/code-viewer";
import { Button } from "@/components/primitives/button";
import { SegmentedControl } from "@/components/primitives/segmented";
import { RangeSlider } from "@/components/primitives/slider";
import type { StudioCodeFormat } from "@/core/studios/background";
import {
  computeTypeScale,
  EASING_PRESETS,
  serializeTypographyCode
} from "@/core/studios/typography";
import { StudioShell } from "../studio-shell";

const SCALE_RATIOS = [
  { label: "1.125 Major 2nd", value: 1.125 },
  { label: "1.200 Minor 3rd", value: 1.2 },
  { label: "1.250 Major 3rd", value: 1.25 },
  { label: "1.333 Perfect 4th", value: 1.333 }
] as const;

export function TypographyStudioView() {
  const locale = useLocale();
  const isZh = locale === "zh";

  const [tabRaw, setTab] = useQueryState("tab", parseAsString.withDefault("scale"));
  const activeTab: "scale" | "easing" = tabRaw === "easing" ? "easing" : "scale";

  const [basePx, setBasePx] = useState(16);
  const [ratio, setRatio] = useState(1.2);
  const [easingId, setEasingId] = useState(EASING_PRESETS[0]!.id);
  const [animToggle, setAnimToggle] = useState(false);
  const [format, setFormat] = useState<StudioCodeFormat>("css");

  const steps = computeTypeScale(basePx, ratio);
  const activeEasing =
    EASING_PRESETS.find((e) => e.id === easingId) ?? EASING_PRESETS[0]!;
  const code = serializeTypographyCode(steps, activeEasing, format);

  return (
    <StudioShell
      activeStudio="typography"
      format={format}
      currentCode={code}
      onFormatChange={setFormat}
    >
      <div className="grid gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SegmentedControl
            options={[
              { value: "scale" as const, label: isZh ? "字号阶梯" : "Type Scale" },
              { value: "easing" as const, label: isZh ? "动效曲线" : "Easing" }
            ]}
            value={activeTab}
            onChange={(v) => void setTab(v)}
          />
        </div>

        {activeTab === "scale" ? (
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="grid gap-4">
              <div className="border border-hairline bg-surface">
                {[...steps].reverse().map((s, idx) => (
                  <div
                    key={s.token}
                    className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-baseline sm:justify-between"
                    style={{
                      borderTop: idx === 0 ? "none" : "1px solid var(--border-hairline)"
                    }}
                  >
                    <div className="flex shrink-0 items-center gap-2.5 font-mono text-xs text-muted sm:w-40">
                      <span className="font-semibold text-accent-text">{s.token}</span>
                      <span>{s.px}px</span>
                      <span className="text-subtle">({s.rem})</span>
                    </div>
                    <div
                      className="min-w-0 flex-1 truncate font-semibold text-ink"
                      style={{ fontSize: `${s.px}px`, lineHeight: s.lineHeight }}
                    >
                      {isZh ? s.sampleZh : s.sampleEn}
                    </div>
                  </div>
                ))}
              </div>

              <CodeViewer
                code={code}
                lang={format === "tailwind" ? "tsx" : "css"}
                title={format === "tailwind" ? "typography.config.ts" : "typography.css"}
                copyLabel={`Copy ${format === "tailwind" ? "Tailwind" : "CSS"}`}
              />
            </div>

            <div className="grid gap-4 border border-hairline bg-surface p-5">
              <div className="eyebrow-mono text-accent-text">MODULAR TYPE LADDER</div>
              <RangeSlider
                label="Base Body Size"
                valueDisplay={`${basePx}px`}
                min={13}
                max={20}
                step={1}
                value={basePx}
                onChange={setBasePx}
              />

              <div>
                <div className="mb-2 text-xs text-muted">Modular Ratio</div>
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
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="grid gap-3 border border-hairline bg-surface p-5">
              <div className="flex items-center justify-between">
                <span className="eyebrow-mono text-accent-text">CUBIC-BEZIER PRESETS</span>
                <Button
                  variant="lime"
                  size="sm"
                  onClick={() => setAnimToggle((v) => !v)}
                >
                  {isZh ? "触发预览位移" : "Trigger Motion"}
                </Button>
              </div>

              <div className="relative h-16 border border-hairline bg-canvas p-3">
                <div
                  className="h-10 w-10 bg-accent-fill"
                  style={{
                    transform: animToggle ? "translateX(220px)" : "translateX(0px)",
                    transitionProperty: "transform",
                    transitionDuration: `${activeEasing.durationMs}ms`,
                    transitionTimingFunction: activeEasing.bezier
                  }}
                />
              </div>

              <div className="grid gap-2">
                {EASING_PRESETS.map((ep) => (
                  <button
                    key={ep.id}
                    type="button"
                    onClick={() => {
                      setEasingId(ep.id);
                      setAnimToggle((v) => !v);
                    }}
                    className="flex cursor-pointer items-center justify-between border border-hairline bg-canvas px-3.5 py-2.5 text-left hover:border-accent-border"
                  >
                    <div>
                      <div className="text-xs font-semibold text-ink">
                        {isZh ? ep.nameZh : ep.name} · {ep.durationMs}ms
                      </div>
                      <div className="mt-0.5 text-[11.5px] text-muted">
                        {isZh ? ep.usageZh : ep.usageEn}
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-accent-text">{ep.bezier}</span>
                  </button>
                ))}
              </div>
            </div>

            <CodeViewer
              code={code}
              lang={format === "tailwind" ? "tsx" : "css"}
              title="motion-typography.css"
              copyLabel="Copy Tokens"
            />
          </div>
        )}
      </div>
    </StudioShell>
  );
}
