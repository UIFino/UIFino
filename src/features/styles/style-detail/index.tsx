"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { CodeViewer } from "@/components/patterns/code-viewer";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { DualSwatch } from "@/components/primitives/dual-swatch";
import { SegmentedControl } from "@/components/primitives/segmented";
import {
  compileStyleCssVariables,
  compileStyleDesignMd,
  type UiStyleSpec
} from "@/core/styles";
import type { RadiusStop, ThemeMode } from "@/core/tokens";
import { useClipboard } from "@/hooks/use-clipboard";
import { useDownload } from "@/hooks/use-download";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { findCatalogBrandById } from "@/registry/catalog";
import {
  EXPRESSIVE_STYLE_ITEMS,
  getStyleFitAndRefs,
  MINIMAL_STYLE_ITEMS,
  STYLE_GROUP_LABELS,
  STYLE_TONE_LABELS
} from "@/registry/styles";
import { useWorkbenchPresetStore } from "@/stores/workbench-preset.store";
import {
  LiveStyleCanonicalStage,
  type StyleStageTemplate
} from "../specimens/canonical-stage";
import { StylePalettePanel } from "./palette-panel";

type StyleDetailTab = "live" | "palette" | "md";

const RADIUS_STOPS: readonly RadiusStop[] = [0, 4, 8, 16];

export function StyleDetailView({ item }: { readonly item: UiStyleSpec }) {
  const t = useTranslations("styles");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isZh = locale === "zh";
  const router = useRouter();
  const { copy } = useClipboard();
  const { downloadText } = useDownload();

  const applyBrandSkin = useWorkbenchPresetStore((s) => s.applyBrandSkin);
  const setStageMode = useWorkbenchPresetStore((s) => s.setStageMode);

  const [tab, setTab] = useState<StyleDetailTab>("live");
  const [mode, setMode] = useState<ThemeMode>(item.primaryTone);
  const [template, setTemplate] = useState<StyleStageTemplate>("dashboard");
  const [liveRadius, setLiveRadius] = useState<RadiusStop>(item.defaultRadius);

  const displayName = isZh ? item.nameZh : item.name;
  const rawMd = compileStyleDesignMd(item);
  const rawCss = compileStyleCssVariables(item, liveRadius);
  const fit = getStyleFitAndRefs(item.slug);

  const relatedBrands = fit.relatedBrandIds
    .map((id) => findCatalogBrandById(id))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  const handleApplyToWorkbench = () => {
    applyBrandSkin(item.id, liveRadius);
    setStageMode(mode);
    router.push(`/components/hero/hero-telemetry-counter?skin=${item.id}`);
  };

  const goodForList = isZh
    ? (item.goodForZh ?? fit.goodForZh)
    : (item.goodForEn ?? fit.goodForEn);
  const notForList = isZh
    ? (item.notForZh ?? fit.notForZh)
    : (item.notForEn ?? fit.notForEn);

  const dosList = isZh ? item.dosZh : item.dosEn;
  const dontsList = isZh ? item.dontsZh : item.dontsEn;

  return (
    <div className="band-full">
      <div className="shell-wrap grid grid-cols-1 lg:grid-cols-[248px_minmax(0,1fr)]">
        {/* Left Contextual Styles Rail */}
        <aside className="order-2 border-t border-hairline bg-canvas px-3.5 py-4 lg:sticky lg:top-[var(--header-h)] lg:order-1 lg:h-[calc(100dvh-var(--header-h))] lg:overflow-y-auto lg:border-t-0 lg:border-r">
          <Link
            href="/styles"
            className="font-mono-ui mb-1 flex items-center px-2.5 py-1.5 text-[11.5px] text-muted hover:bg-surface-hover hover:text-ink"
          >
            ← {t("allStyles")}
          </Link>
          <Link
            href={`/styles?view=compare&style=${item.slug}`}
            className="font-mono-ui mb-3 flex items-center px-2.5 py-1.5 text-[11.5px] text-accent-text hover:bg-surface-hover"
          >
            {t("openPlayground")}
          </Link>

          <div className="eyebrow-mono px-2.5 py-1.5">
            {isZh ? STYLE_GROUP_LABELS.minimal.zh : STYLE_GROUP_LABELS.minimal.en}
          </div>
          {MINIMAL_STYLE_ITEMS.map((s) => {
            const active = s.slug === item.slug;
            return (
              <Link
                key={s.slug}
                href={`/styles/${s.slug}`}
                className={cn(
                  "flex items-center justify-between gap-2 border-l-2 px-2.5 py-1.5 text-[12.5px] transition-colors",
                  active
                    ? "border-l-accent-text bg-surface font-semibold text-ink"
                    : "border-l-transparent text-muted hover:bg-surface-hover hover:text-ink"
                )}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <DualSwatch swatch={s.swatch} />
                  <span className="truncate">{isZh ? s.nameZh : s.name}</span>
                </span>
                <span className="font-mono-ui shrink-0 text-[10.5px] text-subtle">
                  {s.defaultRadius}px
                </span>
              </Link>
            );
          })}

          <div className="eyebrow-mono px-2.5 pt-3.5 pb-1.5">
            {isZh ? STYLE_GROUP_LABELS.expressive.zh : STYLE_GROUP_LABELS.expressive.en}
          </div>
          {EXPRESSIVE_STYLE_ITEMS.map((s) => {
            const active = s.slug === item.slug;
            return (
              <Link
                key={s.slug}
                href={`/styles/${s.slug}`}
                className={cn(
                  "flex items-center justify-between gap-2 border-l-2 px-2.5 py-1.5 text-[12.5px] transition-colors",
                  active
                    ? "border-l-accent-text bg-surface font-semibold text-ink"
                    : "border-l-transparent text-muted hover:bg-surface-hover hover:text-ink"
                )}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <DualSwatch swatch={s.swatch} />
                  <span className="truncate">{isZh ? s.nameZh : s.name}</span>
                </span>
                <span className="font-mono-ui shrink-0 text-[10.5px] text-subtle">
                  {s.defaultRadius}px
                </span>
              </Link>
            );
          })}
        </aside>

        {/* Main Style Protocol Content */}
        <div className="order-1 min-w-0 lg:order-2">
          <div className="detail-center-frame">
            {/* Compact Header Aligned with /catalog/[slug] */}
            <div className="border-b border-hairline px-7 pt-7 pb-6">
              <nav className="font-mono-ui flex flex-wrap items-center gap-1.5 text-xs text-muted">
                <Link href="/styles" className="hover:text-ink">
                  {tCommon("navStyles")}
                </Link>
                <span>/</span>
                <span>
                  {isZh
                    ? STYLE_GROUP_LABELS[item.group].zh
                    : STYLE_GROUP_LABELS[item.group].en}
                </span>
                <span>/</span>
                <span className="text-ink">{displayName}</span>
              </nav>

              <div className="mt-3 flex flex-col justify-between gap-4 xl:flex-row xl:items-start">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <DualSwatch swatch={item.swatch} size="md" />
                    <h1 className="m-0 text-[clamp(24px,2.6vw,32px)] font-semibold tracking-[-0.02em] text-ink">
                      {displayName}
                    </h1>
                    <Badge>
                      {isZh
                        ? STYLE_TONE_LABELS[item.primaryTone].zh
                        : STYLE_TONE_LABELS[item.primaryTone].en}
                    </Badge>
                    <Badge>{liveRadius}px</Badge>
                  </div>
                  <p className="mt-2.5 max-w-[780px] text-[14.5px] leading-[1.6] text-body">
                    {isZh ? item.summaryZh : item.summaryEn}
                  </p>
                </div>

                {/* 4 Action Buttons */}
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <Button
                    variant="contrast"
                    size="md"
                    onClick={() => void copy(rawCss, `Copied ${item.name} CSS tokens`)}
                  >
                    {t("copyCss")}
                  </Button>
                  <Button
                    variant="hairline"
                    size="md"
                    onClick={() => void copy(rawMd, `Copied ${item.name} DESIGN.md`)}
                  >
                    {t("copyMd")}
                  </Button>
                  <Button
                    variant="hairline"
                    size="md"
                    onClick={() => downloadText(`${item.slug}-DESIGN.md`, rawMd)}
                  >
                    {t("downloadMd")}
                  </Button>
                  <Button variant="lime" size="md" onClick={handleApplyToWorkbench}>
                    {t("applySkinShort")}
                  </Button>
                </div>
              </div>

              {/* Positive / Negative Fit Bar */}
              <div className="mt-5 grid grid-cols-1 gap-2.5 lg:grid-cols-2">
                <div className="flex flex-wrap items-center gap-2 border border-hairline bg-surface px-3.5 py-2.5 text-xs">
                  <span className="font-mono-ui shrink-0 font-semibold text-accent-text">
                    ✓ {t("fitGood")}
                  </span>
                  <span className="text-ink">{goodForList.join(" · ")}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 border border-hairline bg-surface px-3.5 py-2.5 text-xs">
                  <span className="font-mono-ui shrink-0 font-semibold text-subtle">
                    ✕ {t("fitAvoid")}
                  </span>
                  <span className="text-muted">{notForList.join(" · ")}</span>
                </div>
              </div>
            </div>

            {/* Interactive Stage + Controls + Palettes + Contrast Audit */}
            <div className="grid gap-5 px-7 py-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4">
                <SegmentedControl
                  options={[
                    { value: "live" as StyleDetailTab, label: t("tabLive") },
                    { value: "palette" as StyleDetailTab, label: t("tabPalette") },
                    { value: "md" as StyleDetailTab, label: t("tabMd") }
                  ]}
                  value={tab}
                  onChange={setTab}
                />

                {tab === "live" ? (
                  <div className="flex flex-wrap items-center gap-2.5">
                    <SegmentedControl
                      options={[
                        { value: "dashboard" as StyleStageTemplate, label: t("tplDashboard") },
                        { value: "landing" as StyleStageTemplate, label: t("tplLanding") },
                        { value: "cards" as StyleStageTemplate, label: t("tplCards") },
                        { value: "typography" as StyleStageTemplate, label: t("tplType") }
                      ]}
                      value={template}
                      onChange={setTemplate}
                    />
                    <SegmentedControl
                      options={RADIUS_STOPS.map((r) => ({
                        value: r,
                        label: `${r}px`
                      }))}
                      value={liveRadius}
                      onChange={setLiveRadius}
                    />
                    <SegmentedControl
                      options={[
                        { value: "dark" as ThemeMode, label: "Dark" },
                        { value: "light" as ThemeMode, label: "Light" }
                      ]}
                      value={mode}
                      onChange={setMode}
                    />
                  </div>
                ) : null}
              </div>

              {tab === "md" ? (
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                  <CodeViewer
                    code={rawCss}
                    lang="css"
                    title={`styles/${item.slug}/tokens.css`}
                    copyLabel={t("copyCss")}
                  />
                  <CodeViewer
                    code={rawMd}
                    lang="markdown"
                    title={`styles/${item.slug}/DESIGN.md`}
                    copyLabel={t("copyMd")}
                  />
                </div>
              ) : tab === "palette" ? (
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                  <StylePalettePanel modeLabel="DARK" palette={item.dark} isZh={isZh} />
                  <StylePalettePanel modeLabel="LIGHT" palette={item.light} isZh={isZh} />
                </div>
              ) : (
                <div className="grid gap-4">
                  <LiveStyleCanonicalStage
                    style={item}
                    mode={mode}
                    isZh={isZh}
                    template={template}
                    radiusOverride={liveRadius}
                  />
                  <StylePalettePanel
                    modeLabel={mode.toUpperCase()}
                    palette={mode === "light" ? item.light : item.dark}
                    isZh={isZh}
                  />
                </div>
              )}

              {/* Physics + Guardrails */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="border border-hairline bg-surface p-[18px]">
                  <div className="eyebrow-mono">{t("physicsTitle")}</div>
                  <div className="mt-3.5 grid gap-3 text-[13px]">
                    <div className="flex items-center justify-between gap-3 border-b border-hairline pb-2.5">
                      <span className="text-muted">{t("labelRadius")}</span>
                      <span className="font-mono-ui font-semibold text-ink">
                        {isZh ? item.radiusLabelZh : item.radiusLabelEn}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 border-b border-hairline pb-2.5">
                      <span className="text-muted">{t("labelBorder")}</span>
                      <span className="font-mono-ui truncate text-ink">{item.borderSpec}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3 border-b border-hairline pb-2.5">
                      <span className="text-muted">{t("labelShadow")}</span>
                      <span className="font-mono-ui truncate text-ink">{item.shadowSpec}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted">{t("labelFonts")}</span>
                      <span className="font-mono-ui truncate text-ink">
                        {item.fonts.display} / {item.fonts.mono}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border border-hairline bg-surface p-[18px]">
                  <div className="eyebrow-mono">{t("guardrailsTitle")}</div>
                  <ul className="m-0 mt-3.5 grid list-none gap-2.5 p-0 text-[13px] leading-[1.5]">
                    {dosList.map((rule) => (
                      <li key={rule} className="flex items-start gap-2 text-ink">
                        <span className="font-mono-ui mt-0.5 shrink-0 text-[11px] font-bold text-accent-text">
                          [{t("doPrefix")}]
                        </span>
                        <span>{rule}</span>
                      </li>
                    ))}
                    {dontsList.map((rule) => (
                      <li key={rule} className="flex items-start gap-2 text-muted">
                        <span className="font-mono-ui mt-0.5 shrink-0 text-[11px] text-subtle">
                          [{t("dontPrefix")}]
                        </span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Related Real Products from Catalog */}
              {relatedBrands.length > 0 ? (
                <div className="border border-hairline bg-surface p-[18px]">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="eyebrow-mono">{t("relatedBrandsTitle")}</span>
                    <Link
                      href="/catalog"
                      className="font-mono-ui text-xs text-muted hover:text-accent-text"
                    >
                      {t("viewAllBrands")} →
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedBrands.map((brand) => (
                      <Link
                        key={brand.id}
                        href={`/catalog/${brand.id}`}
                        className="group flex items-center justify-between gap-3 border border-hairline bg-canvas p-3.5 transition-colors hover:border-accent-border"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <DualSwatch swatch={[brand.dark.canvas, brand.dark.accent]} size="md" />
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-ink group-hover:text-accent-text">
                              {brand.name}
                            </div>
                            <div className="truncate text-xs text-muted">
                              {brand.platformLabel} · {brand.defaultRadius}px
                            </div>
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-subtle transition-colors group-hover:text-accent-text" />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
