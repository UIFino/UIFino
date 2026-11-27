"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { CodeViewer } from "@/components/patterns/code-viewer";
import { Button } from "@/components/primitives/button";
import { SegmentedControl } from "@/components/primitives/segmented";
import { RangeSlider } from "@/components/primitives/slider";
import {
  type BackgroundEngineType,
  type BackgroundStudioParams,
  computeBackgroundStudio,
  type StudioCodeFormat
} from "@/core/studios/background";
import { BG_PRESETS } from "@/registry/tools";
import { StudioShell } from "../studio-shell";

export function BackgroundStudioView() {
  const t = useTranslations("tools");
  const [presetQuery, setPresetQuery] = useQueryState("preset", parseAsString.withDefault(""));

  const [format, setFormat] = useState<StudioCodeFormat>("css");
  const [showSample, setShowSample] = useState(true);
  const [params, setParams] = useState<BackgroundStudioParams>(
    () => BG_PRESETS[0] as BackgroundStudioParams
  );

  useEffect(() => {
    if (presetQuery) {
      const matched = BG_PRESETS.find((pr) => pr.id === presetQuery);
      if (matched) {
        setParams(matched);
      }
    }
  }, [presetQuery]);

  const result = computeBackgroundStudio(params, format);

  return (
    <StudioShell
      activeStudio="background"
      format={format}
      currentCode={result.code}
      onFormatChange={setFormat}
    >
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left: Live Canvas + Presets + Code Output */}
        <div className="grid min-w-0 gap-4">
          <div className="border border-hairline bg-surface">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline px-3.5 py-2.5">
              <SegmentedControl
                options={[
                  { value: "grid" as BackgroundEngineType, label: "Grid" },
                  { value: "dots" as BackgroundEngineType, label: "Dot Matrix" },
                  { value: "aurora" as BackgroundEngineType, label: "Aurora" },
                  { value: "grain" as BackgroundEngineType, label: "Film Grain" }
                ]}
                value={params.engine}
                onChange={(engine) => setParams((prev) => ({ ...prev, engine }))}
              />

              <label className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-muted">
                <input
                  type="checkbox"
                  checked={showSample}
                  onChange={(e) => setShowSample(e.target.checked)}
                />
                <span>{t("sampleOverlay")}</span>
              </label>
            </div>

            <div
              className="relative flex h-[300px] items-center justify-center overflow-hidden p-6"
              style={{
                backgroundColor: result.canvas,
                backgroundImage: result.backgroundImage,
                backgroundSize: result.backgroundSize
              }}
            >
              {showSample ? (
                <div className="max-w-[420px] border border-white/16 bg-[#111113]/72 px-6 py-5 text-center text-[#f4f4f6] backdrop-blur-[6px]">
                  <div className="font-mono-ui text-[10px] tracking-[0.1em] text-[#ceff00]">
                    LIVE SURFACE
                  </div>
                  <div className="mt-1.5 text-[22px] font-bold tracking-[-0.025em]">
                    Engineered background layer
                  </div>
                  <div className="mt-3 inline-flex bg-white px-3.5 py-1.5 text-xs font-semibold text-black">
                    Copy Snippet
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="border border-hairline bg-surface p-3.5">
            <div className="eyebrow-mono mb-2.5">CURATED PRESETS</div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(145px,1fr))] gap-2">
              {BG_PRESETS.map((preset) => (
                <Button
                  key={preset.id}
                  variant="hairline"
                  size="sm"
                  onClick={() => {
                    setParams(preset);
                    void setPresetQuery(preset.id);
                  }}
                  className="h-[34px] justify-start gap-2"
                >
                  <span
                    className="inline-block h-2.5 w-2.5 shrink-0 border border-strong"
                    style={{ backgroundColor: preset.accent }}
                  />
                  <span className="truncate">{preset.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <CodeViewer
            code={result.code}
            lang={format === "tailwind" ? "tsx" : "css"}
            title={format === "tailwind" ? "Tailwind Snippet" : "surface.css"}
            copyLabel={`Copy ${format === "tailwind" ? "Tailwind" : "CSS"}`}
          />
        </div>

        {/* Right: Parameter Sliders & Color Controls */}
        <div className="grid gap-4 border border-hairline bg-surface p-5">
          <div className="eyebrow-mono text-accent-text">PARAMETERS</div>

          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-1.5 text-xs">
              <span className="text-muted">Base Canvas</span>
              <div className="flex items-center gap-2 border border-hairline bg-code px-2 py-1">
                <input
                  type="color"
                  value={params.canvas}
                  onChange={(e) => setParams((prev) => ({ ...prev, canvas: e.target.value }))}
                  className="h-6 w-6 cursor-pointer border-0 bg-transparent p-0"
                />
                <span className="font-mono-ui">{params.canvas}</span>
              </div>
            </label>

            <label className="grid gap-1.5 text-xs">
              <span className="text-muted">Primary Accent</span>
              <div className="flex items-center gap-2 border border-hairline bg-code px-2 py-1">
                <input
                  type="color"
                  value={params.accent}
                  onChange={(e) => setParams((prev) => ({ ...prev, accent: e.target.value }))}
                  className="h-6 w-6 cursor-pointer border-0 bg-transparent p-0"
                />
                <span className="font-mono-ui">{params.accent}</span>
              </div>
            </label>
          </div>

          <RangeSlider
            label="Pattern Pitch / Scale"
            valueDisplay={`${params.cellSize}px`}
            min={12}
            max={80}
            step={2}
            value={params.cellSize}
            onChange={(cellSize) => setParams((prev) => ({ ...prev, cellSize }))}
          />

          <RangeSlider
            label="Stroke / Glow Intensity"
            valueDisplay={`${params.opacity}%`}
            min={4}
            max={75}
            step={1}
            value={params.opacity}
            onChange={(opacity) => setParams((prev) => ({ ...prev, opacity }))}
          />

          <RangeSlider
            label="Radial Mask Spread"
            valueDisplay={`${params.spread}%`}
            min={25}
            max={95}
            step={1}
            value={params.spread}
            onChange={(spread) => setParams((prev) => ({ ...prev, spread }))}
          />

          <RangeSlider
            label="Grain Density"
            valueDisplay={`${params.noise}%`}
            min={0}
            max={60}
            step={2}
            value={params.noise}
            onChange={(noise) => setParams((prev) => ({ ...prev, noise }))}
          />
        </div>
      </div>
    </StudioShell>
  );
}
