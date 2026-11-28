"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { DualSwatch } from "@/components/primitives/dual-swatch";
import { SegmentedControl } from "@/components/primitives/segmented";
import { computeContrastRatio, type UiStyleSpec } from "@/core/styles";
import type { RadiusStop, ThemeMode } from "@/core/tokens";
import { useClipboard } from "@/hooks/use-clipboard";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { BrandLogoMark, findCatalogBrandById } from "@/registry/catalog";
import { getStyleFitAndRefs, STYLE_GROUP_LABELS, STYLE_TONE_LABELS } from "@/registry/styles";

export interface StyleRightInspectorProps {
  readonly item: UiStyleSpec;
  readonly isZh: boolean;
  readonly stageMode: ThemeMode;
  readonly liveRadius: RadiusStop;
  readonly onCopyMd: () => void;
  readonly onCopyCss: () => void;
  readonly onDownloadMd: () => void;
  readonly onApplySkin: () => void;
}

export function StyleRightInspector({
  item,
  isZh,
  stageMode,
  liveRadius,
  onCopyMd,
  onCopyCss,
  onDownloadMd,
  onApplySkin
}: StyleRightInspectorProps) {
  const t = useTranslations("styles");
  const { copy } = useClipboard();

  const [paletteMode, setPaletteMode] = useState<ThemeMode>(stageMode);

  useEffect(() => {
    setPaletteMode(stageMode);
  }, [item.slug, stageMode]);

  const activePalette = paletteMode === "light" ? item.light : item.dark;
  const displayName = isZh ? item.nameZh : item.name;
  const groupLabel = isZh ? STYLE_GROUP_LABELS[item.group].zh : STYLE_GROUP_LABELS[item.group].en;
  const toneLabel = isZh
    ? STYLE_TONE_LABELS[item.primaryTone].zh
    : STYLE_TONE_LABELS[item.primaryTone].en;

  const fit = getStyleFitAndRefs(item.slug);
  const goodFor = isZh ? (item.goodForZh ?? fit.goodForZh) : (item.goodForEn ?? fit.goodForEn);
  const notFor = isZh ? (item.notForZh ?? fit.notForZh) : (item.notForEn ?? fit.notForEn);

  const relatedBrands = fit.relatedBrandIds
    .map((id) => findCatalogBrandById(id))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  const swatches = [
    [isZh ? "画布" : "Bg", activePalette.canvas],
    [isZh ? "卡片" : "Card", activePalette.surface],
    [isZh ? "浮层" : "Elev", activePalette.elevated],
    [isZh ? "描边" : "Line", activePalette.border],
    [isZh ? "主字" : "Ink", activePalette.ink],
    [isZh ? "次字" : "Muted", activePalette.muted],
    [isZh ? "焦点" : "Accent", activePalette.accent]
  ] as const;

  const contrastAudits = [
    {
      label: isZh ? "主字/画布" : "Ink/Bg",
      audit: computeContrastRatio(activePalette.ink, activePalette.canvas)
    },
    {
      label: isZh ? "辅字/卡片" : "Mute/Card",
      audit: computeContrastRatio(activePalette.muted, activePalette.surface)
    },
    {
      label: isZh ? "按钮/焦点" : "CTA/Accent",
      audit: computeContrastRatio(activePalette.accentFg, activePalette.accent)
    }
  ] as const;

  return (
    <aside className="border-hairline bg-surface/40 border-t xl:sticky xl:top-[calc(var(--header-h)+44px)] xl:h-[calc(100dvh-var(--header-h)-44px)] xl:overflow-y-auto xl:border-t-0 xl:border-l">
      {/* Region 1: Style Identity + Primary Delivery Actions */}
      <div className="border-hairline grid gap-3 border-b p-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <DualSwatch swatch={item.swatch} size="md" />
            <h1 className="text-ink m-0 text-lg font-semibold tracking-tight">{displayName}</h1>
            <Badge>{toneLabel}</Badge>
            <Badge>{liveRadius}px</Badge>
          </div>
          <div className="text-muted mt-1 font-mono text-[11px]">
            {groupLabel} · {item.slug}
          </div>
        </div>

        <Button variant="lime" size="md" className="w-full justify-between" onClick={onCopyMd}>
          <span>{t("copyMd")}</span>
          <span className="font-mono text-[11px] opacity-80">→</span>
        </Button>

        <div className="grid grid-cols-3 gap-1.5">
          <Button variant="hairline" size="xs" className="h-8" onClick={onCopyCss}>
            {t("copyCss")}
          </Button>
          <Button variant="hairline" size="xs" className="h-8" onClick={onDownloadMd}>
            {t("downloadMd")}
          </Button>
          <Button variant="contrast" size="xs" className="h-8" onClick={onApplySkin}>
            {t("applySkinShort")}
          </Button>
        </div>
      </div>

      {/* Region 2: Summary + Fit Lines */}
      <div className="border-hairline grid gap-2.5 border-b p-4">
        <p className="text-body m-0 text-[12.5px] leading-[1.55]">
          {isZh ? item.summaryZh : item.summaryEn}
        </p>

        <div className="grid gap-1.5 text-[11.5px]">
          <div className="flex items-baseline gap-2">
            <span className="text-accent-text shrink-0 font-mono font-semibold">
              {t("fitGood")}
            </span>
            <span className="text-ink">{goodFor.join(" · ")}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="shrink-0 font-mono font-semibold text-[#FF5C5C]">{t("fitAvoid")}</span>
            <span className="text-muted">{notFor.join(" · ")}</span>
          </div>
        </div>
      </div>

      {/* Region 3: 7-Swatch Ribbon + Contrast AA/AAA Gate */}
      <div className="border-hairline grid gap-3 border-b p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="eyebrow-mono">DESIGN TOKENS</span>
          <SegmentedControl
            options={[
              { value: "dark" as ThemeMode, label: isZh ? "深" : "Dark" },
              { value: "light" as ThemeMode, label: isZh ? "浅" : "Light" }
            ]}
            value={paletteMode}
            onChange={setPaletteMode}
            itemClassName="h-[24px] px-2 text-[11px]"
          />
        </div>

        <div className="border-hairline bg-canvas grid grid-cols-7 border">
          {swatches.map(([label, hex]) => (
            <button
              key={label}
              type="button"
              title={`${label}: ${hex}`}
              onClick={() => void copy(hex, `Copied ${label}: ${hex}`)}
              className="group flex cursor-pointer flex-col items-center pb-1.5 transition-opacity hover:opacity-90"
            >
              <span
                className={
                  paletteMode === "dark"
                    ? "block h-7 w-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
                    : "block h-7 w-full shadow-[inset_0_0_0_1px_rgba(15,23,42,0.10)]"
                }
                style={{ backgroundColor: hex }}
              />
              <span className="text-ink mt-1 text-[10px] font-medium">{label}</span>
              <span className="text-muted group-hover:text-accent-text w-full truncate text-center font-mono text-[8.5px]">
                {hex.replace("#", "")}
              </span>
            </button>
          ))}
        </div>

        {/* 3 Core Contrast Ratio Audit Pills */}
        <div className="grid grid-cols-3 gap-1.5">
          {contrastAudits.map((c) => (
            <div
              key={c.label}
              className="border-hairline bg-canvas grid gap-0.5 border px-2 py-1.5 text-[10px]"
            >
              <span className="text-muted truncate">{c.label}</span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 font-mono font-semibold tabular-nums",
                  c.audit.passesAA ? "text-emerald-400" : "text-amber-400"
                )}
              >
                {c.audit.passesAA ? (
                  <CheckCircle2 className="h-3 w-3 shrink-0" />
                ) : (
                  <AlertTriangle className="h-3 w-3 shrink-0" />
                )}
                <span>
                  {c.audit.formatted} {c.audit.grade}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Region 4: Surface Physics & Typography Formula */}
      <div className="border-hairline grid gap-2 border-b p-4">
        <div className="eyebrow-mono">{t("physicsTitle")}</div>

        <div className="grid gap-1.5 font-mono text-[11px]">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-muted shrink-0">{t("labelRadius")}</span>
            <span className="text-ink truncate text-right">
              {isZh ? item.radiusLabelZh : item.radiusLabelEn}
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-muted shrink-0">{t("labelBorder")}</span>
            <span className="text-ink truncate text-right">{item.borderSpec}</span>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-muted shrink-0">{t("labelShadow")}</span>
            <span className="text-ink truncate text-right">{item.shadowSpec}</span>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-muted shrink-0">{t("labelFonts")}</span>
            <span className="text-ink truncate text-right">
              {item.fonts.display} / {item.fonts.mono}
            </span>
          </div>
        </div>
      </div>

      {/* Region 5: References & Related Real Brand Catalog Entry */}
      {(item.references && item.references.length > 0) || relatedBrands.length > 0 ? (
        <div className="grid gap-2.5 p-4">
          {item.references && item.references.length > 0 ? (
            <div className="grid gap-1.5 pb-1">
              <div className="eyebrow-mono">{isZh ? "标杆参考站" : "REFERENCES"}</div>
              <div className="flex flex-wrap gap-1.5">
                {item.references.map((refName) => (
                  <Badge key={refName} className="font-mono text-[10.5px]">
                    {refName}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}

          {relatedBrands.length > 0 ? (
            <>
              <div className="flex items-center justify-between gap-2">
                <span className="eyebrow-mono">{t("relatedBrandsTitle")}</span>
                <Link
                  href="/catalog"
                  className="text-muted hover:text-accent-text font-mono text-[10.5px]"
                >
                  {t("viewAllBrands")} →
                </Link>
              </div>
              <div className="grid gap-1.5">
                {relatedBrands.map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/catalog/${brand.id}`}
                    className="group border-hairline bg-canvas hover:border-accent-border flex items-center justify-between gap-2.5 border px-2.5 py-2 transition-colors"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <BrandLogoMark item={brand} className="h-4 w-4 shrink-0" />
                      <span className="text-ink group-hover:text-accent-text truncate text-xs font-semibold">
                        {brand.name}
                      </span>
                    </div>
                    <div className="text-muted flex shrink-0 items-center gap-1.5 font-mono text-[10px]">
                      <span>{brand.defaultRadius}</span>
                      <ArrowUpRight className="text-subtle group-hover:text-accent-text h-3 w-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </aside>
  );
}
