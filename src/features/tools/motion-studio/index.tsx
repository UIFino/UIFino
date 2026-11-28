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
  MOTION_STUDIO_PRESETS,
  type MotionExportMode,
  type MotionPreviewScene,
  serializeMotionCode,
  synthesizeSpringLinear
} from "@/core/studios/motion";
import { StudioShell } from "../studio-shell";

export function MotionStudioView() {
  const locale = useLocale();
  const isZh = locale === "zh";

  const [presetId, setPresetId] = useState(MOTION_STUDIO_PRESETS[0]!.id);
  const [scene, setScene] = useState<MotionPreviewScene>("drawer");
  const [exportMode, setExportMode] = useState<MotionExportMode>("spring");
  const [durationMs, setDurationMs] = useState(MOTION_STUDIO_PRESETS[0]!.durationMs);
  const [stiffness, setStiffness] = useState(MOTION_STUDIO_PRESETS[0]!.stiffness);
  const [damping, setDamping] = useState(MOTION_STUDIO_PRESETS[0]!.damping);
  const [activeToggle, setActiveToggle] = useState(false);
  const [format, setFormat] = useState<StudioCodeFormat>("css");

  const basePreset =
    MOTION_STUDIO_PRESETS.find((p) => p.id === presetId) ?? MOTION_STUDIO_PRESETS[0]!;
  const tunedPreset = { ...basePreset, stiffness, damping, durationMs };
  const activeTiming =
    exportMode === "spring" ? synthesizeSpringLinear(stiffness, damping) : tunedPreset.bezier;

  const code = serializeMotionCode(tunedPreset, exportMode, format, durationMs);
  const isSlowWarning = durationMs > 420;

  return (
    <StudioShell
      activeStudio="motion"
      format={format}
      currentCode={code}
      onFormatChange={setFormat}
      onLoadSkin={(skin) => {
        if (skin.id === "linear" || skin.id === "vercel") {
          const p = MOTION_STUDIO_PRESETS[0]!;
          setPresetId(p.id);
          setDurationMs(p.durationMs);
          setStiffness(p.stiffness);
          setDamping(p.damping);
        } else {
          const p = MOTION_STUDIO_PRESETS[1]!;
          setPresetId(p.id);
          setDurationMs(p.durationMs);
          setStiffness(p.stiffness);
          setDamping(p.damping);
        }
      }}
    >
      <div className="grid gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <SegmentedControl
              options={[
                {
                  value: "drawer" as MotionPreviewScene,
                  label: isZh ? "侧边抽屉滑出" : "Side Drawer"
                },
                {
                  value: "modal" as MotionPreviewScene,
                  label: isZh ? "模态弹窗浮现" : "Modal Sheet"
                },
                {
                  value: "hover-card" as MotionPreviewScene,
                  label: isZh ? "悬浮卡片微抬" : "Hover Lift"
                }
              ]}
              value={scene}
              onChange={(v) => {
                setScene(v);
                setActiveToggle(false);
              }}
            />

            <SegmentedControl
              options={[
                {
                  value: "spring" as MotionExportMode,
                  label: isZh ? "原生 CSS linear() 弹簧" : "CSS linear() Spring"
                },
                { value: "bezier" as MotionExportMode, label: "cubic-bezier()" }
              ]}
              value={exportMode}
              onChange={setExportMode}
            />
          </div>

          <Button variant="lime" onClick={() => setActiveToggle((v) => !v)}>
            {activeToggle
              ? isZh
                ? "重置并重播对比 ↺"
                : "Reset & Replay ↺"
              : isZh
                ? "触发双轨对比赛跑 ▶"
                : "Trigger Dual-Track Race ▶"}
          </Button>
        </div>

        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left: Dual-Track Side-by-Side Comparison + Code */}
          <div className="grid min-w-0 gap-4">
            <div className="border-hairline bg-hairline grid grid-cols-1 gap-px border md:grid-cols-2">
              {/* Track A: Raw Linear Baseline */}
              <div className="bg-surface p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="eyebrow-mono text-subtle">
                    {isZh ? "对照组 · 生硬匀速 (linear)" : "BASELINE · RAW LINEAR"}
                  </span>
                  <Badge>{durationMs}ms</Badge>
                </div>

                <div className="border-hairline bg-code relative flex h-[210px] items-center justify-center overflow-hidden border p-4">
                  {scene === "drawer" ? (
                    <div
                      className="border-hairline bg-surface absolute inset-y-2 left-2 w-[68%] border p-4"
                      style={{
                        transform: activeToggle ? "translateX(0)" : "translateX(-115%)",
                        transition: `transform ${durationMs}ms linear`
                      }}
                    >
                      <div className="text-ink text-xs font-semibold">Navigation Drawer</div>
                      <div className="bg-hairline mt-2 h-2 w-2/3" />
                      <div className="bg-hairline mt-2 h-2 w-1/2" />
                    </div>
                  ) : scene === "modal" ? (
                    <div
                      className="border-hairline bg-surface w-[84%] border p-4"
                      style={{
                        opacity: activeToggle ? 1 : 0.15,
                        transform: activeToggle
                          ? "translateY(0) scale(1)"
                          : "translateY(22px) scale(0.92)",
                        transition: `all ${durationMs}ms linear`
                      }}
                    >
                      <div className="text-ink text-xs font-semibold">Confirm Deployment</div>
                      <div className="text-muted mt-1.5 text-[11px]">linear timing function</div>
                    </div>
                  ) : (
                    <div
                      className="border-hairline bg-surface w-[80%] border p-4"
                      style={{
                        transform: activeToggle ? "translateY(-10px)" : "translateY(0)",
                        transition: `transform ${durationMs}ms linear`
                      }}
                    >
                      <div className="text-ink text-xs font-semibold">Linear Card Lift</div>
                      <div className="text-muted mt-1 text-[11px]">Constant velocity</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Track B: Tuned UIFino Curve */}
              <div className="bg-surface p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="eyebrow-mono text-accent-text">
                    {isZh ? `当前曲线 · ${basePreset.nameZh}` : `TUNED · ${basePreset.name}`}
                  </span>
                  <Badge variant="accent">{exportMode === "spring" ? "linear()" : "bezier"}</Badge>
                </div>

                <div className="border-accent-border/40 bg-code relative flex h-[210px] items-center justify-center overflow-hidden border p-4">
                  {scene === "drawer" ? (
                    <div
                      className="border-accent-border bg-surface absolute inset-y-2 left-2 w-[68%] border p-4"
                      style={{
                        transform: activeToggle ? "translateX(0)" : "translateX(-115%)",
                        transition: `transform ${durationMs}ms ${activeTiming}`
                      }}
                    >
                      <div className="text-accent-text text-xs font-semibold">
                        Navigation Drawer
                      </div>
                      <div className="bg-hairline mt-2 h-2 w-2/3" />
                      <div className="bg-hairline mt-2 h-2 w-1/2" />
                    </div>
                  ) : scene === "modal" ? (
                    <div
                      className="border-accent-border bg-surface w-[84%] border p-4"
                      style={{
                        opacity: activeToggle ? 1 : 0.15,
                        transform: activeToggle
                          ? "translateY(0) scale(1)"
                          : "translateY(22px) scale(0.92)",
                        transition: `all ${durationMs}ms ${activeTiming}`
                      }}
                    >
                      <div className="text-accent-text text-xs font-semibold">
                        Confirm Deployment
                      </div>
                      <div className="text-muted mt-1.5 text-[11px]">
                        {exportMode} physics curve
                      </div>
                    </div>
                  ) : (
                    <div
                      className="border-accent-border bg-surface w-[80%] border p-4"
                      style={{
                        transform: activeToggle ? "translateY(-10px)" : "translateY(0)",
                        transition: `transform ${durationMs}ms ${activeTiming}`
                      }}
                    >
                      <div className="text-accent-text text-xs font-semibold">Damped Card Lift</div>
                      <div className="text-muted mt-1 text-[11px]">Snappy deceleration</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <CodeViewer
              code={code}
              lang="css"
              title={exportMode === "spring" ? "spring-motion.css (Native linear())" : "motion.css"}
              copyLabel={`Copy ${format === "tailwind" ? "Tailwind" : "CSS"}`}
            />
          </div>

          {/* Right: Presets + Sliders + Guardrail */}
          <div className="border-hairline bg-surface grid gap-4 border p-5">
            <div className="eyebrow-mono text-accent-text">
              {isZh ? "大厂克制预设" : "CURATED MOTION PRESETS"}
            </div>

            <div className="grid gap-2">
              {MOTION_STUDIO_PRESETS.map((mp) => (
                <button
                  key={mp.id}
                  type="button"
                  onClick={() => {
                    setPresetId(mp.id);
                    setDurationMs(mp.durationMs);
                    setStiffness(mp.stiffness);
                    setDamping(mp.damping);
                    setActiveToggle((v) => !v);
                  }}
                  className="flex cursor-pointer items-center justify-between gap-2 border px-3.5 py-2.5 text-left transition-colors"
                  style={{
                    borderColor:
                      presetId === mp.id ? "var(--accent-border)" : "var(--border-hairline)",
                    backgroundColor: presetId === mp.id ? "var(--bg-elevated)" : "var(--bg-canvas)"
                  }}
                >
                  <div>
                    <div className="text-ink text-xs font-semibold">
                      {isZh ? mp.nameZh : mp.name} · {mp.durationMs}ms
                    </div>
                    <div className="text-muted mt-0.5 text-[11px]">
                      {isZh ? mp.usageZh : mp.usageEn}
                    </div>
                  </div>
                  <Badge>{mp.source}</Badge>
                </button>
              ))}
            </div>

            <RangeSlider
              label={isZh ? "动效总时长 (Duration)" : "Duration"}
              valueDisplay={`${durationMs}ms`}
              min={100}
              max={650}
              step={20}
              value={durationMs}
              onChange={setDurationMs}
            />

            {exportMode === "spring" ? (
              <>
                <RangeSlider
                  label={isZh ? "弹簧刚度 (Stiffness)" : "Spring Stiffness"}
                  valueDisplay={`${stiffness}`}
                  min={120}
                  max={520}
                  step={10}
                  value={stiffness}
                  onChange={setStiffness}
                />
                <RangeSlider
                  label={isZh ? "阻尼系数 (Damping)" : "Spring Damping"}
                  valueDisplay={`${damping}`}
                  min={12}
                  max={48}
                  step={1}
                  value={damping}
                  onChange={setDamping}
                />
              </>
            ) : null}

            <div
              className="border px-3 py-2.5 text-[11.5px]"
              style={{
                borderColor: isSlowWarning ? "#FF4D4F" : "var(--border-hairline)",
                backgroundColor: "var(--bg-code)",
                color: isSlowWarning ? "#FF4D4F" : "var(--text-muted)"
              }}
            >
              {isSlowWarning
                ? isZh
                  ? "防晕眩警告：高频 UI 交互建议控制在 140ms–360ms，超过 420ms 会让操作显迟滞。"
                  : "Motion guardrail: Keep UI transitions within 140ms–360ms; > 420ms feels sluggish."
                : isZh
                  ? "护栏通过：已自动附带 prefers-reduced-motion 降级声明，保障无障碍体验。"
                  : "Guardrail OK: Includes prefers-reduced-motion media query automatically."}
            </div>
          </div>
        </div>
      </div>
    </StudioShell>
  );
}
