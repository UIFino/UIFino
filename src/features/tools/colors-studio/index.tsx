"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { CodeViewer } from "@/components/patterns/code-viewer";
import { Badge } from "@/components/primitives/badge";
import { SegmentedControl } from "@/components/primitives/segmented";
import type { StudioCodeFormat } from "@/core/studios/background";
import {
  computeUiColorAuditMatrix,
  computeWcagContrast,
  generateColorShadeScale,
  generateNeutralScale,
  type NeutralTemperature,
  pickReadableForeground,
  serializeColorScaleCode
} from "@/core/studios/colors";
import type { ThemeMode } from "@/core/tokens";
import { useClipboard } from "@/hooks/use-clipboard";
import { StudioShell } from "../studio-shell";

const BRAND_SEED_COLORS = [
  { label: "Indigo", hex: "#5E6AD2" },
  { label: "Signal Lime", hex: "#CEFF00" },
  { label: "Terracotta", hex: "#C96442" },
  { label: "Sky Cyan", hex: "#0EA5E9" },
  { label: "Emerald", hex: "#22C55E" }
] as const;

export function ColorsStudioView() {
  const locale = useLocale();
  const isZh = locale === "zh";
  const { copy } = useClipboard();

  const [tabRaw, setTab] = useQueryState("tab", parseAsString.withDefault("shades"));
  const activeTab: "shades" | "contrast" = tabRaw === "contrast" ? "contrast" : "shades";

  const [baseHex, setBaseHex] = useState("#5E6AD2");
  const [neutralTemp, setNeutralTemp] = useState<NeutralTemperature>("cool");
  const [specimenMode, setSpecimenMode] = useState<ThemeMode>("dark");
  const [fgHex, setFgHex] = useState("#F3F5F8");
  const [bgHex, setBgHex] = useState("#0A0B0E");
  const [format, setFormat] = useState<StudioCodeFormat>("css");

  const shades = generateColorShadeScale(baseHex);
  const neutralShades = generateNeutralScale(neutralTemp);
  const matrix = computeUiColorAuditMatrix(shades, neutralShades, specimenMode);
  const manualAudit = computeWcagContrast(fgHex, bgHex);
  const code = serializeColorScaleCode("primary", shades, format, neutralShades);

  const byStop = (arr: typeof shades, stop: number) =>
    arr.find((s) => s.stop === stop)?.hex ?? "#5E6AD2";

  const spCanvas = specimenMode === "dark" ? byStop(neutralShades, 950) : "#FFFFFF";
  const spSurface = specimenMode === "dark" ? byStop(neutralShades, 900) : byStop(neutralShades, 50);
  const spBorder = specimenMode === "dark" ? byStop(neutralShades, 800) : byStop(neutralShades, 200);
  const spInk = specimenMode === "dark" ? byStop(neutralShades, 50) : byStop(neutralShades, 950);
  const spMuted = specimenMode === "dark" ? byStop(neutralShades, 400) : byStop(neutralShades, 600);
  const spPrimary = shades.find((s) => s.isAnchor)?.hex ?? byStop(shades, 500);
  const spPrimaryFg = pickReadableForeground(spPrimary);

  return (
    <StudioShell
      activeStudio="colors"
      format={format}
      currentCode={code}
      onFormatChange={setFormat}
      onLoadSkin={(skin) => {
        setBaseHex(skin.dark.accent);
        setFgHex(skin.dark.ink);
        setBgHex(skin.dark.canvas);
      }}
    >
      <div className="grid gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <SegmentedControl
              options={[
                { value: "shades" as const, label: isZh ? "OKLCH 色阶与组件体检" : "OKLCH & Specimens" },
                { value: "contrast" as const, label: isZh ? "自由双色对比度" : "Pair Checker" }
              ]}
              value={activeTab}
              onChange={(v) => void setTab(v)}
            />

            <SegmentedControl
              options={[
                { value: "cool" as NeutralTemperature, label: isZh ? "冷灰底" : "Cool Gray" },
                { value: "warm" as NeutralTemperature, label: isZh ? "暖纸灰" : "Warm Gray" },
                { value: "pure" as NeutralTemperature, label: isZh ? "纯中性" : "Pure Gray" }
              ]}
              value={neutralTemp}
              onChange={setNeutralTemp}
            />
          </div>

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
            {/* Primary OKLCH 11-Stop Scale */}
            <div className="border border-hairline bg-surface p-5">
              <div className="mb-3.5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="eyebrow-mono">OKLCH 50 — 950 SMART LADDER</span>
                  <Badge variant="accent">
                    {isZh ? "智能锚定输入色明度档位" : "Auto-Anchored Stop"}
                  </Badge>
                </div>

                <label className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-muted">Seed:</span>
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
                    className="flex cursor-pointer flex-col gap-1.5 border bg-canvas p-2 text-left transition-colors hover:border-accent-border"
                    style={{
                      borderColor: s.isAnchor ? "var(--accent-text)" : "var(--border-hairline)"
                    }}
                  >
                    <span
                      className="relative h-14 w-full border border-hairline"
                      style={{ backgroundColor: s.hex }}
                    >
                      {s.isAnchor ? (
                        <span className="absolute top-1 left-1 bg-black/75 px-1 font-mono text-[9px] text-white">
                          IN
                        </span>
                      ) : null}
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-ink">{s.stop}</span>
                    <span className="font-mono text-[10px] text-muted">{s.hex}</span>
                  </button>
                ))}
              </div>

              {/* Paired Neutral Ladder */}
              <div className="mt-4 border-t border-hairline pt-3.5">
                <div className="eyebrow-mono mb-2">
                  {isZh ? "配套中性灰阶（画布 / 表面 / 1px 描边）" : "PAIRED NEUTRAL GRAY SCALE"}
                </div>
                <div className="grid grid-cols-11 gap-1.5">
                  {neutralShades.map((ns) => (
                    <button
                      key={`n-${ns.stop}`}
                      type="button"
                      onClick={() => void copy(ns.hex, `Copied neutral-${ns.stop}: ${ns.hex}`)}
                      className="cursor-pointer border border-hairline bg-canvas p-1.5 text-left hover:border-accent-border"
                    >
                      <span
                        className="block h-5 w-full border border-hairline"
                        style={{ backgroundColor: ns.hex }}
                      />
                      <span className="mt-1 block font-mono text-[9.5px] text-muted">{ns.stop}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live UI Component Cluster + Contrast Audit Matrix */}
            <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="border border-hairline bg-surface">
                <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
                  <span className="eyebrow-mono">
                    {isZh ? "真实微缩组件实时染肤预览" : "LIVE UI SPECIMEN CLUSTER"}
                  </span>
                  <SegmentedControl
                    options={[
                      { value: "dark" as ThemeMode, label: "Dark" },
                      { value: "light" as ThemeMode, label: "Light" }
                    ]}
                    value={specimenMode}
                    onChange={setSpecimenMode}
                  />
                </div>

                <div className="grid gap-4 p-5" style={{ backgroundColor: spCanvas, color: spInk }}>
                  <div
                    className="grid gap-3 border p-4"
                    style={{ backgroundColor: spSurface, borderColor: spBorder }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="text-sm font-semibold">Workspace Billing &amp; Usage</div>
                        <div className="text-xs" style={{ color: spMuted }}>
                          Token-driven surface hierarchy · {neutralTemp} neutral
                        </div>
                      </div>
                      <span
                        className="px-2 py-0.5 font-mono text-[10.5px] font-semibold"
                        style={{
                          backgroundColor: spPrimary,
                          color: spPrimaryFg
                        }}
                      >
                        ACTIVE
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value="https://api.uifino.dev/v1"
                        className="h-8 flex-1 border px-2.5 font-mono text-xs"
                        style={{
                          backgroundColor: spCanvas,
                          borderColor: spBorder,
                          color: spInk
                        }}
                      />
                      <span
                        className="inline-flex h-8 items-center px-3.5 text-xs font-semibold"
                        style={{ backgroundColor: spPrimary, color: spPrimaryFg }}
                      >
                        {isZh ? "保存更改" : "Save Changes"}
                      </span>
                      <span
                        className="inline-flex h-8 items-center border px-3 text-xs"
                        style={{ borderColor: spBorder, color: spInk }}
                      >
                        {isZh ? "重置" : "Reset"}
                      </span>
                    </div>

                    <div
                      className="border-l-2 px-3 py-2 text-xs"
                      style={{
                        borderLeftColor: spPrimary,
                        backgroundColor: spCanvas,
                        color: spMuted
                      }}
                    >
                      {isZh
                        ? "告警提示条：当前主色与中性底板已按 1px 边框隔离。"
                        : "Alert banner: primary accent isolated with 1px neutral hairline."}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-hairline bg-surface p-5">
                <div className="eyebrow-mono mb-3 text-accent-text">
                  {isZh ? "全角色可读性体检矩阵 (WCAG 2.1)" : "MULTI-ROLE CONTRAST MATRIX"}
                </div>
                <div className="grid gap-2.5">
                  {matrix.map((row) => (
                    <div
                      key={row.id}
                      className="flex items-center justify-between gap-3 border border-hairline bg-canvas px-3.5 py-2.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="inline-flex h-7 w-7 items-center justify-center border border-hairline text-xs font-bold"
                          style={{ backgroundColor: row.bgHex, color: row.fgHex }}
                        >
                          Aa
                        </span>
                        <div>
                          <div className="text-xs font-semibold text-ink">
                            {isZh ? row.roleZh : row.roleEn}
                          </div>
                          <div className="font-mono text-[10.5px] text-muted">
                            {row.fgHex} / {row.bgHex}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold tabular-nums text-ink">
                          {row.audit.ratioText}
                        </span>
                        <Badge variant={row.audit.aaaNormal || row.audit.aaNormal ? "accent" : "sharp"}>
                          {row.audit.aaaNormal ? "AAA" : row.audit.aaNormal ? "AA" : row.audit.aaLarge ? "AA Lg" : "LOW"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
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
              <div className="font-mono text-xl font-bold tabular-nums">{manualAudit.ratioText}</div>
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
                    ["AA Body (4.5)", manualAudit.aaNormal],
                    ["AA Large (3.0)", manualAudit.aaLarge],
                    ["AAA Body (7.0)", manualAudit.aaaNormal]
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
