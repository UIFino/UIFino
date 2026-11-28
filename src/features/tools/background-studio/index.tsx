"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
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
  const locale = useLocale();
  const isZh = locale === "zh";
  const [presetQuery, setPresetQuery] = useQueryState("preset", parseAsString.withDefault(""));

  const [format, setFormat] = useState<StudioCodeFormat>("css");
  const [showSample, setShowSample] = useState(true);
  const [params, setParams] = useState<BackgroundStudioParams>(() => ({
    ...(BG_PRESETS[0] as BackgroundStudioParams),
    maskFade: true,
    maskRadius: 74
  }));

  useEffect(() => {
    if (presetQuery) {
      const matched = BG_PRESETS.find((pr) => pr.id === presetQuery);
      if (matched) {
        setParams((prev) => ({
          ...matched,
          maskFade: prev.maskFade ?? true,
          maskRadius: prev.maskRadius ?? 74
        }));
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
      onLoadSkin={(skin) =>
        setParams((prev) => ({
          ...prev,
          canvas: skin.dark.canvas,
          accent: skin.dark.accent
        }))
      }
    >
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left: Live Canvas + Presets + Code Output */}
        <div className="grid min-w-0 gap-4">
          <div className="border border-hairline bg-surface">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline px-3.5 py-2.5">
              <SegmentedControl
                options={[
                  { value: "grid" as BackgroundEngineType, label: isZh ? "细线网格" : "Grid" },
                  { value: "dots" as BackgroundEngineType, label: isZh ? "点阵矩阵" : "Dot Matrix" },
                  { value: "aurora" as BackgroundEngineType, label: isZh ? "极光聚光" : "Aurora" },
                  { value: "grain" as BackgroundEngineType, label: isZh ? "胶片噪点" : "Film Grain" }
                ]}
                value={params.engine}
                onChange={(engine) => setParams((prev) => ({ ...prev, engine }))}
              />

              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-muted">
                  <input
                    type="checkbox"
                    checked={params.maskFade ?? true}
                    onChange={(e) =>
                      setParams((prev) => ({ ...prev, maskFade: e.target.checked }))
                    }
                  />
                  <span>{isZh ? "径向渐隐遮罩" : "Radial Mask"}</span>
                </label>
                <label className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-muted">
                  <input
                    type="checkbox"
                    checked={showSample}
                    onChange={(e) => setShowSample(e.target.checked)}
                  />
                  <span>{t("sampleOverlay")}</span>
                </label>
              </div>
            </div>

            <div
              className="relative flex h-[320px] items-center justify-center overflow-hidden p-6"
              style={{ backgroundColor: result.canvas }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: result.backgroundImage,
                  backgroundSize: result.backgroundSize,
                  maskImage: result.maskImage,
                  WebkitMaskImage: result.maskImage
                }}
              />
              {showSample ? (
                <div className="relative z-10 max-w-[460px] border border-white/15 bg-[#111113]/75 px-6 py-5 text-center text-[#f4f4f6] backdrop-blur-[6px]">
                  <div className="font-mono-ui text-[10px] tracking-[0.1em] text-[#ceff00]">
                    HERO READABILITY CHECK
                  </div>
                  <div className="mt-1.5 text-[23px] font-bold tracking-[-0.025em]">
                    {isZh ? "高对比首屏字体叠层压测" : "Engineered background layer"}
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#b8b8bf]">
                    {isZh
                      ? "验证网格与极光亮度是否喧宾夺主，确保正文与行动按钮清晰可读。"
                      : "Stress-test headline, muted copy, and primary CTA contrast against the pattern."}
                  </p>
                  <div className="mt-3.5 flex items-center justify-center gap-2">
                    <span className="inline-flex bg-white px-3.5 py-1.5 text-xs font-semibold text-black">
                      {isZh ? "立即使用" : "Get Started"}
                    </span>
                    <span className="inline-flex border border-white/20 px-3.5 py-1.5 text-xs text-white/85">
                      {isZh ? "查看规范" : "Read Spec"}
                    </span>
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
                    setParams((prev) => ({
                      ...preset,
                      maskFade: prev.maskFade ?? true,
                      maskRadius: prev.maskRadius ?? 74
                    }));
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
          <div className="eyebrow-mono text-accent-text">LAYER PARAMETERS</div>

          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-1.5 text-xs">
              <span className="text-muted">{isZh ? "画布底色" : "Base Canvas"}</span>
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
              <span className="text-muted">{isZh ? "网格/光效色" : "Primary Accent"}</span>
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
            label={isZh ? "网格/点阵间距" : "Pattern Pitch / Scale"}
            valueDisplay={`${params.cellSize}px`}
            min={12}
            max={80}
            step={2}
            value={params.cellSize}
            onChange={(cellSize) => setParams((prev) => ({ ...prev, cellSize }))}
          />

          <RangeSlider
            label={isZh ? "线条/光晕强度" : "Stroke / Glow Intensity"}
            valueDisplay={`${params.opacity}%`}
            min={4}
            max={75}
            step={1}
            value={params.opacity}
            onChange={(opacity) => setParams((prev) => ({ ...prev, opacity }))}
          />

          <RangeSlider
            label={isZh ? "光晕扩散范围" : "Radial Glow Spread"}
            valueDisplay={`${params.spread}%`}
            min={25}
            max={95}
            step={1}
            value={params.spread}
            onChange={(spread) => setParams((prev) => ({ ...prev, spread }))}
          />

          <RangeSlider
            label={isZh ? "边缘渐隐遮罩半径" : "Edge Mask Fade Radius"}
            valueDisplay={`${params.maskRadius ?? 74}%`}
            min={35}
            max={95}
            step={1}
            value={params.maskRadius ?? 74}
            onChange={(maskRadius) => setParams((prev) => ({ ...prev, maskRadius }))}
          />

          <RangeSlider
            label={isZh ? "胶片噪点密度" : "Grain Density"}
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
