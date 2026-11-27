"use client";

import { useEffect, useState } from "react";
import { parseAsString, useQueryState } from "nuqs";
import { CodeViewer } from "@/components/patterns/code-viewer";
import { Button } from "@/components/primitives/button";
import { SegmentedControl } from "@/components/primitives/segmented";
import { RangeSlider } from "@/components/primitives/slider";
import {
  computeShadowStudio,
  type ShadowStudioParams,
  type StudioCodeFormat
} from "@/core/studios/shadow";
import type { ThemeMode } from "@/core/tokens";
import { SHADOW_PRESETS } from "@/registry/tools";
import { StudioShell } from "../studio-shell";

export function ShadowStudioView() {
  const [presetQuery, setPresetQuery] = useQueryState("preset", parseAsString.withDefault(""));
  const [format, setFormat] = useState<StudioCodeFormat>("css");
  const [params, setParams] = useState<ShadowStudioParams>(
    () => (SHADOW_PRESETS[1] ?? SHADOW_PRESETS[0]) as ShadowStudioParams
  );

  useEffect(() => {
    if (presetQuery) {
      const matched = SHADOW_PRESETS.find((sp) => sp.id === presetQuery);
      if (matched) {
        setParams(matched);
      }
    }
  }, [presetQuery]);

  const result = computeShadowStudio(params, format);

  return (
    <StudioShell
      activeStudio="shadow"
      format={format}
      currentCode={result.code}
      onFormatChange={setFormat}
    >
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid min-w-0 gap-4">
          <div className="border border-hairline">
            <div className="flex items-center justify-between border-b border-hairline bg-surface px-3.5 py-2.5">
              <span className="eyebrow-mono">ELEVATION SPECIMEN</span>
              <SegmentedControl
                options={[
                  { value: "dark" as ThemeMode, label: "Dark Canvas" },
                  { value: "light" as ThemeMode, label: "Light Canvas" }
                ]}
                value={params.mode}
                onChange={(mode) => setParams((prev) => ({ ...prev, mode }))}
              />
            </div>

            <div
              className="flex h-[300px] items-center justify-center p-7"
              style={{ backgroundColor: result.canvasBg }}
            >
              <div
                className="grid w-full max-w-[380px] gap-3 border p-[22px]"
                style={{
                  backgroundColor: result.surfaceBg,
                  color: result.ink,
                  borderColor: result.borderCol,
                  borderRadius: `${result.radius}px`,
                  boxShadow: result.boxShadow
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[14.5px] font-semibold">Production API Key</span>
                  <span className="font-mono-ui text-[11px]" style={{ color: result.muted }}>
                    {result.radius}px radius
                  </span>
                </div>
                <div
                  className="border px-2.5 py-2 font-mono text-xs"
                  style={{
                    borderColor: result.borderCol,
                    borderRadius: `${Math.max(0, result.radius - 2)}px`,
                    color: result.muted
                  }}
                >
                  uif_live_98a7c4e10b2d...
                </div>
                <div className="flex justify-end gap-2">
                  <span
                    className="border px-3 py-1.5 text-xs"
                    style={{
                      borderColor: result.borderCol,
                      borderRadius: `${Math.max(0, result.radius - 2)}px`
                    }}
                  >
                    Rotate
                  </span>
                  <span
                    className="px-3 py-1.5 text-xs font-semibold"
                    style={{
                      backgroundColor: result.ink,
                      color: result.surfaceBg,
                      borderRadius: `${Math.max(0, result.radius - 2)}px`
                    }}
                  >
                    Save Token
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-hairline bg-surface p-3.5">
            <div className="eyebrow-mono mb-2.5">ELEVATION PRESETS</div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2">
              {SHADOW_PRESETS.map((sp) => (
                <Button
                  key={sp.id}
                  variant="hairline"
                  size="sm"
                  onClick={() => {
                    setParams(sp);
                    void setPresetQuery(sp.id);
                  }}
                  className="h-[34px] justify-start"
                >
                  <span className="truncate">{sp.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <CodeViewer
            code={result.code}
            lang={format === "tailwind" ? "tsx" : "css"}
            title={format === "tailwind" ? "Tailwind Elevation" : "elevation.css"}
            copyLabel={`Copy ${format === "tailwind" ? "Tailwind" : "CSS"}`}
          />
        </div>

        {/* Right: Shadow & Rim Sliders */}
        <div className="grid gap-4 border border-hairline bg-surface p-5">
          <div className="eyebrow-mono text-accent-text">SHADOW &amp; SURFACE TOKENS</div>

          <RangeSlider
            label="Vertical Offset (Y)"
            valueDisplay={`${params.yOffset}px`}
            min={0}
            max={40}
            value={params.yOffset}
            onChange={(yOffset) => setParams((prev) => ({ ...prev, yOffset }))}
          />

          <RangeSlider
            label="Ambient Blur"
            valueDisplay={`${params.blur}px`}
            min={0}
            max={80}
            value={params.blur}
            onChange={(blur) => setParams((prev) => ({ ...prev, blur }))}
          />

          <RangeSlider
            label="Shadow Opacity"
            valueDisplay={`${params.opacity}%`}
            min={0}
            max={85}
            value={params.opacity}
            onChange={(opacity) => setParams((prev) => ({ ...prev, opacity }))}
          />

          <RangeSlider
            label="Top 1px Inner Rim Highlight"
            valueDisplay={`${params.rimLight}%`}
            min={0}
            max={30}
            value={params.rimLight}
            onChange={(rimLight) => setParams((prev) => ({ ...prev, rimLight }))}
          />

          <RangeSlider
            label="Hairline Border Alpha"
            valueDisplay={`${params.borderAlpha}%`}
            min={4}
            max={40}
            value={params.borderAlpha}
            onChange={(borderAlpha) => setParams((prev) => ({ ...prev, borderAlpha }))}
          />

          <RangeSlider
            label="Surface Radius"
            valueDisplay={`${params.radius}px`}
            min={0}
            max={20}
            step={2}
            value={params.radius}
            onChange={(radius) => setParams((prev) => ({ ...prev, radius }))}
          />
        </div>
      </div>
    </StudioShell>
  );
}
