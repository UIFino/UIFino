"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
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
  const locale = useLocale();
  const isZh = locale === "zh";
  const [presetQuery, setPresetQuery] = useQueryState("preset", parseAsString.withDefault(""));
  const [format, setFormat] = useState<StudioCodeFormat>("css");
  const [params, setParams] = useState<ShadowStudioParams>(() => ({
    ...((SHADOW_PRESETS[1] ?? SHADOW_PRESETS[0]) as ShadowStudioParams),
    backdropBlur: 0
  }));
  const [innerPadding, setInnerPadding] = useState(8);

  useEffect(() => {
    if (presetQuery) {
      const matched = SHADOW_PRESETS.find((sp) => sp.id === presetQuery);
      if (matched) {
        setParams((prev) => ({ ...matched, backdropBlur: prev.backdropBlur ?? 0 }));
      }
    }
  }, [presetQuery]);

  const result = computeShadowStudio(params, format);
  const outerRadius = params.radius + innerPadding;

  return (
    <StudioShell
      activeStudio="shadow"
      format={format}
      currentCode={result.code}
      onFormatChange={setFormat}
      onLoadSkin={(skin) => {
        const parsedRadius = Number.parseInt(
          "defaultRadius" in skin ? String(skin.defaultRadius) : "8",
          10
        );
        setParams((prev) => ({
          ...prev,
          radius: Number.isFinite(parsedRadius) ? Math.min(20, Math.max(0, parsedRadius)) : 8
        }));
      }}
    >
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid min-w-0 gap-4">
          {/* 3-Tier Simultaneous Elevation Stage */}
          <div className="border border-hairline">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline bg-surface px-3.5 py-2.5">
              <span className="eyebrow-mono">
                {isZh ? "三档成套高度与微缩组件对照" : "3-TIER ELEVATION LADDER"}
              </span>
              <SegmentedControl
                options={[
                  { value: "dark" as ThemeMode, label: isZh ? "深色画布" : "Dark Canvas" },
                  { value: "light" as ThemeMode, label: isZh ? "浅色画布" : "Light Canvas" }
                ]}
                value={params.mode}
                onChange={(mode) => setParams((prev) => ({ ...prev, mode }))}
              />
            </div>

            <div
              className="grid grid-cols-1 gap-4 p-6 md:grid-cols-3"
              style={{ backgroundColor: result.canvasBg }}
            >
              {result.tiers.map((tier, idx) => (
                <div
                  key={tier.id}
                  className="flex flex-col justify-between gap-3 border p-4"
                  style={{
                    backgroundColor: result.surfaceBg,
                    color: result.ink,
                    borderColor: result.borderCol,
                    borderRadius: `${result.radius}px`,
                    boxShadow: tier.boxShadow,
                    backdropFilter:
                      result.backdropBlur > 0 ? `blur(${result.backdropBlur}px)` : undefined
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10.5px] font-semibold uppercase" style={{ color: result.muted }}>
                      {isZh ? tier.labelZh : tier.labelEn}
                    </span>
                    <span className="font-mono text-[10px]" style={{ color: result.muted }}>
                      z-{tier.zIndex}
                    </span>
                  </div>

                  {idx === 0 ? (
                    <div>
                      <div className="text-[13px] font-semibold">API Latency</div>
                      <div className="font-mono-ui mt-1 text-xl font-bold tabular-nums">12.4 ms</div>
                    </div>
                  ) : idx === 1 ? (
                    <div className="grid gap-1 text-[11.5px]">
                      <div
                        className="border px-2 py-1"
                        style={{
                          borderColor: result.borderCol,
                          borderRadius: `${Math.max(0, result.radius - 2)}px`
                        }}
                      >
                        Copy CSS Tokens
                      </div>
                      <div className="px-2 py-1" style={{ color: result.muted }}>
                        Download DESIGN.md
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-2">
                      <div className="text-[12.5px] font-semibold">Production Token</div>
                      <div className="flex justify-end gap-1.5">
                        <span
                          className="border px-2.5 py-1 text-[11px]"
                          style={{
                            borderColor: result.borderCol,
                            borderRadius: `${Math.max(0, result.radius - 2)}px`
                          }}
                        >
                          Cancel
                        </span>
                        <span
                          className="px-2.5 py-1 text-[11px] font-semibold"
                          style={{
                            backgroundColor: result.ink,
                            color: params.mode === "light" ? "#FFFFFF" : "#111113",
                            borderRadius: `${Math.max(0, result.radius - 2)}px`
                          }}
                        >
                          Save
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
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
                    setParams((prev) => ({ ...sp, backdropBlur: prev.backdropBlur ?? 0 }));
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

        {/* Right: Shadow & Rim Sliders + Visual Concentric Caliper */}
        <div className="grid gap-4 border border-hairline bg-surface p-5">
          <div className="eyebrow-mono text-accent-text">SHADOW &amp; SURFACE TOKENS</div>

          <RangeSlider
            label={isZh ? "垂直偏移 (Y)" : "Vertical Offset (Y)"}
            valueDisplay={`${params.yOffset}px`}
            min={0}
            max={40}
            value={params.yOffset}
            onChange={(yOffset) => setParams((prev) => ({ ...prev, yOffset }))}
          />

          <RangeSlider
            label={isZh ? "环境模糊半径" : "Ambient Blur"}
            valueDisplay={`${params.blur}px`}
            min={0}
            max={80}
            value={params.blur}
            onChange={(blur) => setParams((prev) => ({ ...prev, blur }))}
          />

          <RangeSlider
            label={isZh ? "阴影不透明度" : "Shadow Opacity"}
            valueDisplay={`${params.opacity}%`}
            min={0}
            max={85}
            value={params.opacity}
            onChange={(opacity) => setParams((prev) => ({ ...prev, opacity }))}
          />

          <RangeSlider
            label={isZh ? "顶部 1px 内高光 (Rim Light)" : "Top 1px Inner Rim Highlight"}
            valueDisplay={`${params.rimLight}%`}
            min={0}
            max={30}
            value={params.rimLight}
            onChange={(rimLight) => setParams((prev) => ({ ...prev, rimLight }))}
          />

          <RangeSlider
            label={isZh ? "1px 细线边框透明度" : "Hairline Border Alpha"}
            valueDisplay={`${params.borderAlpha}%`}
            min={4}
            max={40}
            value={params.borderAlpha}
            onChange={(borderAlpha) => setParams((prev) => ({ ...prev, borderAlpha }))}
          />

          <RangeSlider
            label={isZh ? "背景磨砂模糊 (Backdrop Blur)" : "Backdrop Blur"}
            valueDisplay={`${params.backdropBlur ?? 0}px`}
            min={0}
            max={24}
            step={2}
            value={params.backdropBlur ?? 0}
            onChange={(backdropBlur) => setParams((prev) => ({ ...prev, backdropBlur }))}
          />

          {(params.backdropBlur ?? 0) > 14 ? (
            <div className="border border-accent-border bg-accent-soft px-3 py-2 text-[11.5px] text-ink">
              {isZh
                ? "提示：磨砂模糊高于 14px 时，移动端列表滚动可能出现明显掉帧。"
                : "Notice: Backdrop blur > 14px can cause scroll frame drops on mobile Safari."}
            </div>
          ) : null}

          <RangeSlider
            label={isZh ? "内层容器圆角" : "Inner Surface Radius"}
            valueDisplay={`${params.radius}px`}
            min={0}
            max={20}
            step={2}
            value={params.radius}
            onChange={(radius) => setParams((prev) => ({ ...prev, radius }))}
          />

          {/* Visual Concentric Radius Caliper */}
          <div id="radius-calc" className="border-t border-hairline pt-4">
            <div className="eyebrow-mono mb-2">
              {isZh ? "可视化同心圆角卡尺" : "CONCENTRIC RADIUS CALIPER"}
            </div>
            <RangeSlider
              label={isZh ? "外框内边距 (Padding)" : "Container Padding"}
              valueDisplay={`${innerPadding}px`}
              min={4}
              max={24}
              step={2}
              value={innerPadding}
              onChange={setInnerPadding}
            />

            <div className="mt-3 flex items-center justify-center border border-hairline bg-code p-4">
              <div
                className="w-full border border-accent-border bg-surface transition-all"
                style={{
                  borderRadius: `${outerRadius}px`,
                  padding: `${innerPadding}px`
                }}
              >
                <div
                  className="flex items-center justify-between border border-hairline bg-canvas px-3 py-2.5 text-xs"
                  style={{ borderRadius: `${params.radius}px` }}
                >
                  <span className="font-mono text-muted">inner {params.radius}px</span>
                  <span className="font-mono font-semibold text-accent-text">
                    outer {outerRadius}px
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-2 font-mono text-[11.5px] text-muted">
              outer ({outerRadius}px) = inner ({params.radius}px) + padding ({innerPadding}px)
            </div>
          </div>
        </div>
      </div>
    </StudioShell>
  );
}
