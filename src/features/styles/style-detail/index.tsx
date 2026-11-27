"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CodeViewer } from "@/components/patterns/code-viewer";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { DualSwatch } from "@/components/primitives/dual-swatch";
import { SegmentedControl } from "@/components/primitives/segmented";
import { compileStyleDesignMd, type UiStyleSpec } from "@/core/styles";
import type { ThemeMode } from "@/core/tokens";
import { useClipboard } from "@/hooks/use-clipboard";
import { useDownload } from "@/hooks/use-download";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import {
  EXPRESSIVE_STYLE_ITEMS,
  MINIMAL_STYLE_ITEMS,
  STYLE_GROUP_LABELS,
  STYLE_SCENARIO_LABELS,
  STYLE_TONE_LABELS
} from "@/registry/styles";
import { useWorkbenchPresetStore } from "@/stores/workbench-preset.store";
import { LiveStyleCanonicalStage } from "../specimens/canonical-stage";
import { StylePalettePanel } from "./palette-panel";

type StyleDetailTab = "live" | "palette" | "md";

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

  const displayName = isZh ? item.nameZh : item.name;
  const cliCmd = `npx uifino@latest add style/${item.slug}`;
  const rawMd = compileStyleDesignMd(item);

  const handleApplyToWorkbench = () => {
    applyBrandSkin(item.id, item.defaultRadius);
    setStageMode(mode);
    router.push(`/components/hero/hero-telemetry-counter?skin=${item.id}`);
  };

  const dosList = isZh ? item.dosZh : item.dosEn;
  const dontsList = isZh ? item.dontsZh : item.dontsEn;

  return (
    <div className="band-full">
      <div className="shell-full grid grid-cols-1 lg:grid-cols-[248px_minmax(0,1fr)]">
        {/* Left Contextual Styles Rail */}
        <aside className="order-2 border-t border-hairline bg-canvas px-2.5 py-4 lg:sticky lg:top-[var(--header-h)] lg:order-1 lg:h-[calc(100dvh-var(--header-h))] lg:overflow-y-auto lg:border-t-0 lg:border-r">
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

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <DualSwatch swatch={item.swatch} size="md" />
              <h1 className="m-0 text-[clamp(24px,2.6vw,32px)] font-semibold tracking-[-0.02em]">
                {displayName}
              </h1>
              <Badge>
                {isZh
                  ? STYLE_TONE_LABELS[item.primaryTone].zh
                  : STYLE_TONE_LABELS[item.primaryTone].en}
              </Badge>
              <Badge>{item.defaultRadius}px</Badge>
            </div>

            <p className="mt-3 max-w-[820px] text-[15px] leading-[1.6] text-body">
              {isZh ? item.summaryZh : item.summaryEn}
            </p>

            <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
              {item.scenarios.map((sc) => (
                <Link key={sc} href={`/styles?scenario=${sc}`}>
                  <Badge className="hover:border-accent-border hover:text-ink">
                    {isZh ? STYLE_SCENARIO_LABELS[sc].zh : STYLE_SCENARIO_LABELS[sc].en}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>

          {/* CLI & Actions Split */}
          <div className="grid grid-cols-1 items-start gap-5 border-b border-hairline px-7 py-6 md:grid-cols-2">
            <div>
              <h2 className="heading-section mb-3">{t("usageTitle")}</h2>
              <div className="border border-hairline bg-surface p-[18px]">
                <div className="flex items-center justify-between gap-2.5 border border-hairline bg-code px-3.5 py-[11px] font-mono text-[13.5px]">
                  <span className="truncate">{cliCmd}</span>
                  <button
                    type="button"
                    onClick={() => void copy(cliCmd, "Copied CLI command")}
                    className="shrink-0 cursor-pointer"
                  >
                    <Badge className="text-ink hover:border-accent-border">Copy</Badge>
                  </button>
                </div>
                <div className="mt-2.5 text-[13px] text-muted">{t("usageHint")}</div>
              </div>
            </div>

            <div className="grid gap-2 md:pt-8">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="hairline"
                  size="lg"
                  onClick={() => void copy(rawMd, `Copied ${item.name} DESIGN.md`)}
                >
                  {t("copyMd")}
                </Button>
                <Button
                  variant="hairline"
                  size="lg"
                  onClick={() => downloadText(`${item.slug}-DESIGN.md`, rawMd)}
                >
                  {t("downloadMd")}
                </Button>
              </div>

              <Button
                variant="lime"
                size="lg"
                onClick={handleApplyToWorkbench}
                className="h-11 w-full"
              >
                {t("applyWorkbench", { name: displayName })}
              </Button>
            </div>
          </div>

          {/* Interactive Specimen & Token Breakdown */}
          <div className="grid gap-5 px-7 py-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
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
                <SegmentedControl
                  options={[
                    { value: "dark" as ThemeMode, label: "Dark" },
                    { value: "light" as ThemeMode, label: "Light" }
                  ]}
                  value={mode}
                  onChange={setMode}
                />
              ) : null}
            </div>

            {tab === "md" ? (
              <CodeViewer
                code={rawMd}
                lang="markdown"
                title={`styles/${item.slug}/DESIGN.md`}
                copyLabel={t("copyMd")}
              />
            ) : tab === "palette" ? (
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <StylePalettePanel modeLabel="DARK" palette={item.dark} />
                <StylePalettePanel modeLabel="LIGHT" palette={item.light} />
              </div>
            ) : (
              <LiveStyleCanonicalStage style={item} mode={mode} isZh={isZh} />
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
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
