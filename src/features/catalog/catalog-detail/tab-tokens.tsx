"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CodeViewer } from "@/components/patterns/code-viewer";
import { Badge } from "@/components/primitives/badge";
import type {
  CatalogBrandSpec,
  CatalogHoverDiff,
  CatalogMeasuredColor,
  CatalogMeasuredGeometry,
  CatalogMeasuredType
} from "@/core/design-md";
import { useClipboard } from "@/hooks/use-clipboard";

function LiveHoverPreviewButton({
  hd,
  radius,
  isZh
}: {
  readonly hd: CatalogHoverDiff;
  readonly radius: string;
  readonly isZh: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex h-8 cursor-pointer items-center border px-3 font-mono text-[11px] font-medium select-none"
      style={{
        backgroundColor: hovered ? hd.hoverBg : hd.restBg,
        borderColor: hovered ? hd.hoverBorder : hd.restBorder,
        color: hovered ? hd.hoverColor : hd.restColor,
        borderRadius: radius,
        transition: `all ${hd.transition}`
      }}
    >
      {hovered
        ? isZh
          ? `悬停态 (${hd.hoverBg})`
          : `Hover (${hd.hoverBg})`
        : isZh
          ? `移入试试 (${hd.restBg})`
          : `Hover me (${hd.restBg})`}
    </span>
  );
}

export function CatalogTokensCssTab({
  item,
  rawCss,
  isZh
}: {
  readonly item: CatalogBrandSpec;
  readonly rawCss: string;
  readonly isZh: boolean;
}) {
  const t = useTranslations("catalog");
  const { copy } = useClipboard();

  const pal = (item.defaultTheme ?? "dark") === "light" ? item.light : item.dark;
  const colors: readonly CatalogMeasuredColor[] = item.scraped?.measuredColors ?? [
    { roleZh: "主画布底色", roleEn: "Primary Canvas", cssVar: "--brand-canvas", hex: pal.canvas, share: "66%" },
    { roleZh: "卡片表面色", roleEn: "Card Surface", cssVar: "--brand-surface", hex: pal.surface, share: "18%" },
    { roleZh: "悬浮层底色", roleEn: "Elevated Layer", cssVar: "--brand-elevated", hex: pal.elevated, share: "6%" },
    { roleZh: "1px 结构边框", roleEn: "1px Border", cssVar: "--brand-border", hex: pal.border, share: "4%" },
    { roleZh: "主标题正文色", roleEn: "Primary Ink", cssVar: "--brand-ink", hex: pal.ink, share: "4%" },
    { roleZh: "次级说明字色", roleEn: "Muted Ink", cssVar: "--brand-muted", hex: pal.muted, share: "1%" },
    { roleZh: "主按钮焦点色", roleEn: "Primary Accent", cssVar: "--brand-accent", hex: pal.accent, share: "1%" }
  ];

  const openAlt = item.openFontAlt ?? "Inter + JetBrains Mono";
  const typeRows: readonly CatalogMeasuredType[] = item.scraped?.measuredTypography ?? [
    {
      level: "H1 Display",
      detectedFamily: item.fonts.display,
      freeAlternative: openAlt,
      size: "56px",
      weight: "600",
      lineHeight: "1.06",
      tracking: item.fonts.tracking,
      cssSnippet: `font-family: "${openAlt}", sans-serif; font-size: 56px; font-weight: 600; line-height: 1.06; letter-spacing: ${item.fonts.tracking};`
    },
    {
      level: "H2 Section",
      detectedFamily: item.fonts.display,
      freeAlternative: openAlt,
      size: "32px",
      weight: "600",
      lineHeight: "1.15",
      tracking: "-0.025em",
      cssSnippet: `font-family: "${openAlt}", sans-serif; font-size: 32px; font-weight: 600; line-height: 1.15; letter-spacing: -0.025em;`
    },
    {
      level: "Body Copy",
      detectedFamily: item.fonts.body,
      freeAlternative: "Inter",
      size: "15px",
      weight: "400",
      lineHeight: "1.6",
      tracking: "-0.01em",
      cssSnippet: `font-family: Inter, sans-serif; font-size: 15px; font-weight: 400; line-height: 1.6;`
    },
    {
      level: "Monospace",
      detectedFamily: item.fonts.mono,
      freeAlternative: "JetBrains Mono",
      size: "13px",
      weight: "500",
      lineHeight: "1.45",
      tracking: "0em",
      cssSnippet: `font-family: "JetBrains Mono", monospace; font-size: 13px; font-variant-numeric: tabular-nums;`
    }
  ];

  const geometries: readonly CatalogMeasuredGeometry[] = item.scraped?.measuredGeometry ?? [
    {
      targetZh: "主操作按钮",
      targetEn: "Primary Button",
      radius: item.defaultRadius,
      border: `1px solid ${pal.border}`,
      shadow: "none",
      extra: "height: 36px",
      cssSnippet: `border-radius: ${item.defaultRadius}; border: 1px solid ${pal.border}; height: 36px;`
    },
    {
      targetZh: "业务内容卡片",
      targetEn: "Surface Card",
      radius: item.defaultRadius,
      border: `1px solid ${pal.border}`,
      shadow: "none",
      extra: `max-width: ${item.scraped?.containerMaxWidth ?? "1200px"}`,
      cssSnippet: `background: ${pal.surface}; border: 1px solid ${pal.border}; border-radius: ${item.defaultRadius};`
    }
  ];

  const hoverDiffs: readonly CatalogHoverDiff[] = item.scraped?.hoverDiffs ?? [
    {
      targetZh: "主按钮悬停反馈",
      targetEn: "Primary CTA Hover",
      restBg: pal.accent,
      restBorder: pal.accent,
      restColor: pal.accentFg,
      hoverBg: item.light.accent,
      hoverBorder: item.light.accent,
      hoverColor: pal.accentFg,
      transition: "150ms cubic-bezier(0.25, 1, 0.5, 1)",
      cssSnippet: `.btn-primary { background: ${pal.accent}; color: ${pal.accentFg}; transition: filter 150ms ease; }\n.btn-primary:hover { filter: brightness(1.08); }`
    },
    {
      targetZh: "次级卡片悬停态",
      targetEn: "Surface Card Hover",
      restBg: pal.surface,
      restBorder: pal.border,
      restColor: pal.muted,
      hoverBg: pal.elevated,
      hoverBorder: pal.ink,
      hoverColor: pal.ink,
      transition: "160ms ease-out",
      cssSnippet: `.card-item { background: ${pal.surface}; border: 1px solid ${pal.border}; transition: all 160ms ease-out; }\n.card-item:hover { background: ${pal.elevated}; color: ${pal.ink}; }`
    }
  ];

  const previewFontSizePx = (rawSize: string) => {
    const n = Number.parseFloat(rawSize);
    if (!Number.isFinite(n)) return 14;
    return Math.round(Math.min(24, Math.max(12, n * 0.42)));
  };

  return (
    <div className="grid gap-5">
      {/* 01 Color Roles & Area Share */}
      <div className="border border-hairline bg-surface p-5">
        <div className="eyebrow-mono mb-3.5">{t("colorShareTitle")}</div>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {colors.map((c) => {
            const cssLine = `${c.cssVar}: ${c.hex};`;
            return (
              <button
                key={c.cssVar + c.roleEn}
                type="button"
                onClick={() => void copy(cssLine, `Copied ${cssLine}`)}
                className="flex cursor-pointer flex-col gap-2 border border-hairline bg-canvas p-3 text-left transition-colors hover:border-accent-border"
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="h-7 w-12 border border-hairline"
                    style={{ backgroundColor: c.hex }}
                  />
                  <Badge>{c.share}</Badge>
                </div>
                <div className="text-xs font-semibold text-ink">
                  {isZh ? c.roleZh : c.roleEn}
                </div>
                <div className="font-mono text-[11px] text-muted">
                  {c.hex} · {c.cssVar}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 02 Typography & Free Alternatives (Clean Chinese headers + live weight/tracking specimen) */}
      <div className="border border-hairline bg-surface p-5">
        <div className="eyebrow-mono mb-3.5">{t("typeAltTitle")}</div>
        <div className="overflow-x-auto border border-hairline bg-canvas">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-hairline text-[11px] font-medium text-muted">
                <th className="px-3.5 py-2.5">{isZh ? "层级" : "LEVEL"}</th>
                <th className="px-3.5 py-2.5">{isZh ? "样字预览" : "SPECIMEN"}</th>
                <th className="px-3.5 py-2.5">{isZh ? "原站字族" : "DETECTED FONT"}</th>
                <th className="px-3.5 py-2.5">{isZh ? "免费开源平替" : "OPEN ALTERNATIVE"}</th>
                <th className="px-3.5 py-2.5">{isZh ? "字号 · 字重 · 行高 · 字距" : "SIZE / WEIGHT / LH / TRACKING"}</th>
              </tr>
            </thead>
            <tbody>
              {typeRows.map((tr) => {
                const isMono = tr.level.toLowerCase().includes("mono") || tr.level.toLowerCase().includes("code");
                const numericWeight = Number.parseInt(tr.weight, 10) || 400;
                const cleanTracking = tr.tracking.includes("(")
                  ? tr.tracking.split("(")[0]?.trim() || "0em"
                  : tr.tracking;
                return (
                  <tr
                    key={tr.level}
                    onClick={() => void copy(tr.cssSnippet, `Copied ${tr.level} CSS`)}
                    className="cursor-pointer border-b border-hairline transition-colors hover:bg-surface-hover"
                  >
                    <td className="font-mono-ui px-3.5 py-2.5 font-semibold text-accent-text">
                      {tr.level}
                    </td>
                    <td
                      className="px-3.5 py-2.5 text-ink"
                      style={{
                        fontFamily: isMono
                          ? "var(--font-mono)"
                          : item.fonts.serif
                            ? "var(--font-serif)"
                            : "var(--font-sans)",
                        fontSize: `${previewFontSizePx(tr.size)}px`,
                        fontWeight: numericWeight,
                        letterSpacing: cleanTracking
                      }}
                    >
                      Aa 设计 98
                    </td>
                    <td className="px-3.5 py-2.5 font-medium text-ink">{tr.detectedFamily}</td>
                    <td className="px-3.5 py-2.5">
                      <Badge>{tr.freeAlternative}</Badge>
                    </td>
                    <td className="font-mono-ui px-3.5 py-2.5 text-muted">
                      {tr.size} · {tr.weight} · {tr.lineHeight} · {tr.tracking}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 03 Geometry & Elevation + 04 Live Interactive Hover Diff */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="border border-hairline bg-surface p-5">
          <div className="eyebrow-mono mb-3.5">{t("geometryTitle")}</div>
          <div className="grid gap-2.5">
            {geometries.map((geo) => (
              <button
                key={geo.targetEn}
                type="button"
                onClick={() => void copy(geo.cssSnippet, `Copied ${geo.targetEn} CSS`)}
                className="grid cursor-pointer gap-1.5 border border-hairline bg-canvas p-3.5 text-left transition-colors hover:border-accent-border"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-ink">
                    {isZh ? geo.targetZh : geo.targetEn}
                  </span>
                  <Badge>radius: {geo.radius}</Badge>
                </div>
                <div className="font-mono text-[11px] text-muted">
                  border: {geo.border} · shadow: {geo.shadow}
                  {geo.extra ? ` · ${geo.extra}` : ""}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="border border-hairline bg-surface p-5">
          <div className="eyebrow-mono mb-3.5">{t("hoverDiffTitle")}</div>
          <div className="grid gap-2.5">
            {hoverDiffs.map((hd) => (
              <div
                key={hd.targetEn}
                className="grid gap-2 border border-hairline bg-canvas p-3.5 text-left"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-ink">
                    {isZh ? hd.targetZh : hd.targetEn}
                  </span>
                  <button
                    type="button"
                    onClick={() => void copy(hd.cssSnippet, `Copied ${hd.targetEn} hover CSS`)}
                    className="cursor-pointer font-mono text-[10.5px] text-accent-text hover:underline"
                  >
                    {isZh ? "复制 CSS" : "Copy CSS"}
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <LiveHoverPreviewButton hd={hd} radius={item.defaultRadius} isZh={isZh} />
                  <span className="font-mono text-[10.5px] text-subtle">{hd.transition}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 05 Full Copy-Paste CSS Variables */}
      <div className="grid gap-2">
        <div className="eyebrow-mono">{t("fullCssTitle")}</div>
        <CodeViewer
          code={rawCss}
          lang="css"
          title={`${item.id}-tokens.css`}
          copyLabel={t("copyCss")}
        />
      </div>
    </div>
  );
}
