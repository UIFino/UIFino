"use client";

import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { DualSwatch } from "@/components/primitives/dual-swatch";
import { SearchInput } from "@/components/primitives/input";
import { SegmentedControl } from "@/components/primitives/segmented";
import { compileStyleCssVariables, compileStyleDesignMd, type UiStyleSpec } from "@/core/styles";
import type { RadiusStop, ThemeMode } from "@/core/tokens";
import { useClipboard } from "@/hooks/use-clipboard";
import { useDownload } from "@/hooks/use-download";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import {
  EXPRESSIVE_STYLE_ITEMS,
  MINIMAL_STYLE_ITEMS,
  STYLE_GROUP_LABELS,
  STYLE_ITEMS,
  STYLE_SCENARIO_FILTERS,
  STYLE_SCENARIO_LABELS,
  type StyleScenarioFilter
} from "@/registry/styles";
import { useWorkbenchPresetStore } from "@/stores/workbench-preset.store";
import { LiveStyleCanonicalStage, type StyleStageTemplate } from "../specimens/canonical-stage";
import { StylePalettePanel } from "./palette-panel";
import { StyleRightInspector } from "./right-inspector";
import { StyleGuardrailsTab } from "./tab-guardrails";

type StyleDetailTab = "live" | "palette" | "guardrails";

const RADIUS_STOPS: readonly RadiusStop[] = [0, 4, 8, 16];
const VALID_TEMPLATES: readonly StyleStageTemplate[] = [
  "dashboard",
  "landing",
  "cards",
  "typography"
];

export function StyleDetailView({ item }: { readonly item: UiStyleSpec }) {
  const t = useTranslations("styles");
  const locale = useLocale();
  const isZh = locale === "zh";
  const router = useRouter();
  const { copy } = useClipboard();
  const { downloadText } = useDownload();

  const applyBrandSkin = useWorkbenchPresetStore((s) => s.applyBrandSkin);
  const setStageMode = useWorkbenchPresetStore((s) => s.setStageMode);

  const [tabParam, setTabParam] = useQueryState("tab", parseAsString);
  const [tplParam, setTplParam] = useQueryState("tpl", parseAsString);
  const [modeParam, setModeParam] = useQueryState("mode", parseAsString);
  const [radiusParam, setRadiusParam] = useQueryState("r", parseAsString);

  // Left style rail search, scenario filter & collapsible directory state
  const [railSearch, setRailSearch] = useState("");
  const [railScenario, setRailScenario] = useState<StyleScenarioFilter>("all");
  const [openGroups, setOpenGroups] = useState<{ minimal: boolean; expressive: boolean }>({
    minimal: true,
    expressive: true
  });

  const hasCustomShowcase = Boolean(item.Showcase);
  const tab: StyleDetailTab =
    tabParam === "palette" || tabParam === "guardrails" ? tabParam : "live";
  const hasValidGenericTpl = VALID_TEMPLATES.includes(tplParam as StyleStageTemplate);
  const activeStageChoice: "showcase" | StyleStageTemplate =
    hasCustomShowcase && !hasValidGenericTpl
      ? "showcase"
      : hasValidGenericTpl
        ? (tplParam as StyleStageTemplate)
        : "dashboard";
  const template: StyleStageTemplate = hasValidGenericTpl
    ? (tplParam as StyleStageTemplate)
    : "dashboard";
  const preferGeneric = hasCustomShowcase && activeStageChoice !== "showcase";
  const mode: ThemeMode =
    modeParam === "dark" || modeParam === "light" ? modeParam : item.primaryTone;
  const parsedR = radiusParam !== null ? Number(radiusParam) : NaN;
  const liveRadius: RadiusStop = RADIUS_STOPS.includes(parsedR as RadiusStop)
    ? (parsedR as RadiusStop)
    : item.defaultRadius;

  const preservedQuery = new URLSearchParams();
  if (hasValidGenericTpl && tplParam) preservedQuery.set("tpl", tplParam);
  if (modeParam === "dark" || modeParam === "light") preservedQuery.set("mode", modeParam);
  if (radiusParam !== null && RADIUS_STOPS.includes(parsedR as RadiusStop)) {
    preservedQuery.set("r", radiusParam);
  }
  if (tab !== "live") preservedQuery.set("tab", tab);
  const preservedQs = preservedQuery.toString();
  const buildStyleHref = (slug: string) =>
    preservedQs ? `/styles/${slug}?${preservedQs}` : `/styles/${slug}`;

  const q = railSearch.trim().toLowerCase();
  const matchesRail = (s: UiStyleSpec) => {
    const scenOk = railScenario === "all" || s.scenarios.includes(railScenario);
    const qOk =
      !q ||
      `${s.name} ${s.nameZh} ${s.slug} ${s.defaultRadius}px ${s.tags.join(" ")}`
        .toLowerCase()
        .includes(q);
    return scenOk && qOk;
  };

  const filteredMinimal = MINIMAL_STYLE_ITEMS.filter(matchesRail);
  const filteredExpressive = EXPRESSIVE_STYLE_ITEMS.filter(matchesRail);

  const currentIdx = Math.max(
    0,
    STYLE_ITEMS.findIndex((s) => s.slug === item.slug)
  );
  const prevStyle = STYLE_ITEMS[(currentIdx - 1 + STYLE_ITEMS.length) % STYLE_ITEMS.length] ?? item;
  const nextStyle = STYLE_ITEMS[(currentIdx + 1) % STYLE_ITEMS.length] ?? item;

  const rawMd = compileStyleDesignMd(item);
  const rawCss = compileStyleCssVariables(item, liveRadius);

  const handleApplyToWorkbench = () => {
    applyBrandSkin(item.id, liveRadius);
    setStageMode(mode);
    router.push(`/components/hero/hero-telemetry-counter?skin=${item.id}`);
  };

  const viewTabs: readonly { readonly id: StyleDetailTab; readonly label: string }[] = [
    { id: "live", label: t("tabLive") },
    { id: "palette", label: t("tabPalette") },
    { id: "guardrails", label: t("tabGuardrails") }
  ];

  return (
    <div className="band-full">
      <div className="shell-wrap grid grid-cols-1 lg:grid-cols-[208px_minmax(0,1fr)]">
        {/* Left Sticky Styles Tree Rail (208px aligned 1:1 with Catalog) */}
        <aside className="border-hairline bg-canvas order-2 border-t pb-3 lg:sticky lg:top-[var(--header-h)] lg:order-1 lg:h-[calc(100dvh-var(--header-h))] lg:overflow-y-auto lg:border-t-0 lg:border-r">
          <div className="border-hairline flex min-h-[44px] items-center border-b px-3">
            <Link
              href="/styles"
              className="group border-hairline bg-surface text-ink hover:border-strong flex h-7 w-full items-center justify-between border px-2.5 text-xs font-medium transition-colors hover:bg-gray-100"
            >
              <span className="flex items-center gap-1.5">
                <ArrowLeft className="text-muted group-hover:text-ink h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>{t("allStyles")}</span>
              </span>
              <span className="text-subtle group-hover:text-muted font-mono text-[10.5px]">
                {STYLE_ITEMS.length}
              </span>
            </Link>
          </div>

          <div className="my-3 grid gap-1.5 px-3">
            <SearchInput
              value={railSearch}
              onChange={(e) => setRailSearch(e.target.value)}
              placeholder={isZh ? "搜流派 / 标签…" : "Filter styles…"}
              wrapperClassName="h-7 px-2"
              className="text-[11.5px]"
            />

            <select
              aria-label={isZh ? "按适用场景筛选" : "Filter by scenario"}
              value={railScenario}
              onChange={(e) => setRailScenario(e.target.value as StyleScenarioFilter)}
              className="border-hairline bg-surface text-ink h-7 w-full cursor-pointer border px-2 text-[11px]"
            >
              {STYLE_SCENARIO_FILTERS.map((sc) => (
                <option key={sc} value={sc}>
                  {isZh ? STYLE_SCENARIO_LABELS[sc].zh : STYLE_SCENARIO_LABELS[sc].en}
                </option>
              ))}
            </select>
          </div>

          {filteredMinimal.length === 0 && filteredExpressive.length === 0 ? (
            <div className="text-muted px-3 py-4 text-center text-[11.5px]">
              <div>{isZh ? "没有匹配流派" : "No matches"}</div>
              <button
                type="button"
                onClick={() => {
                  setRailSearch("");
                  setRailScenario("all");
                }}
                className="text-accent-text mt-1.5 cursor-pointer font-mono text-[11px] hover:underline"
              >
                {isZh ? "重置筛选" : "Reset"}
              </button>
            </div>
          ) : null}

          {[
            { id: "minimal" as const, items: filteredMinimal },
            { id: "expressive" as const, items: filteredExpressive }
          ].map((group) => {
            if (group.items.length === 0) return null;
            const expanded = Boolean(q || railScenario !== "all" || openGroups[group.id]);
            const groupLabel = isZh
              ? STYLE_GROUP_LABELS[group.id].zh
              : STYLE_GROUP_LABELS[group.id].en;

            return (
              <div key={group.id} className="mb-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setOpenGroups((prev) => ({ ...prev, [group.id]: !prev[group.id] }))
                  }
                  aria-expanded={expanded}
                  className="hover:bg-surface-hover flex w-full cursor-pointer items-center justify-between px-3 py-1.5 text-left text-[12.5px] transition-colors"
                >
                  <span
                    className={cn(
                      "flex items-center gap-1.5",
                      expanded ? "text-ink font-semibold" : "text-muted font-medium"
                    )}
                  >
                    {expanded ? (
                      <ChevronDown className="text-muted h-3.5 w-3.5 shrink-0" />
                    ) : (
                      <ChevronRight className="text-subtle h-3.5 w-3.5 shrink-0" />
                    )}
                    <span>{groupLabel}</span>
                  </span>
                  <span className="text-subtle font-mono text-[11px]">{group.items.length}</span>
                </button>

                {expanded ? (
                  <div className="border-hairline ml-[19px] border-l py-0.5">
                    {group.items.map((s) => {
                      const active = s.slug === item.slug;
                      return (
                        <Link
                          key={s.slug}
                          href={buildStyleHref(s.slug)}
                          className={cn(
                            "flex items-center gap-2 border-r-2 py-1.5 pr-3 pl-3.5 text-[12.5px] transition-colors",
                            active
                              ? "border-r-accent-text bg-elevated text-ink font-semibold"
                              : "text-muted hover:bg-surface-hover hover:text-ink border-r-transparent"
                          )}
                        >
                          <DualSwatch swatch={s.swatch} />
                          <span className="truncate">{isZh ? s.nameZh : s.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </aside>

        {/* Center + Right Golden Workbench */}
        <div className="order-1 min-w-0 lg:order-2">
          {/* Top 44px Sticky Control Strip */}
          <div className="border-hairline bg-canvas sticky top-[var(--header-h)] z-20 flex min-h-[44px] flex-wrap items-center justify-between gap-2 border-b px-4">
            <div className="flex flex-wrap items-center gap-1">
              {viewTabs.map((vt) => {
                const active = tab === vt.id;
                return (
                  <button
                    key={vt.id}
                    type="button"
                    onClick={() => void setTabParam(vt.id === "live" ? null : vt.id)}
                    className={cn(
                      "relative inline-flex h-[43px] cursor-pointer items-center px-2.5 text-xs transition-colors",
                      active
                        ? "text-ink after:bg-accent-text font-semibold after:absolute after:inset-x-2 after:bottom-0 after:h-[2px]"
                        : "text-muted hover:text-ink"
                    )}
                  >
                    {vt.label}
                  </button>
                );
              })}

              {tab === "live" ? (
                <div className="border-hairline ml-2 border-l pl-3">
                  <SegmentedControl
                    options={[
                      ...(hasCustomShowcase
                        ? [
                            {
                              value: "showcase" as const,
                              label: isZh ? "专属样板" : "Signature"
                            }
                          ]
                        : []),
                      { value: "dashboard" as const, label: t("tplDashboard") },
                      { value: "landing" as const, label: t("tplLanding") },
                      { value: "cards" as const, label: t("tplCards") },
                      { value: "typography" as const, label: t("tplType") }
                    ]}
                    value={activeStageChoice}
                    onChange={(nextChoice) =>
                      void setTplParam(
                        nextChoice === "showcase"
                          ? null
                          : !hasCustomShowcase && nextChoice === "dashboard"
                            ? null
                            : nextChoice
                      )
                    }
                    itemClassName="h-[28px] px-2 text-[11.5px]"
                  />
                </div>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {tab === "live" ? (
                <>
                  <SegmentedControl
                    ariaLabel={isZh ? "圆角档位" : "Radius"}
                    options={RADIUS_STOPS.map((r) => ({
                      value: r,
                      label: `${r}px`
                    }))}
                    value={liveRadius}
                    onChange={(nextR) => void setRadiusParam(String(nextR))}
                    itemClassName="h-[28px] px-2 text-[11px]"
                  />

                  <SegmentedControl
                    ariaLabel={isZh ? "明暗主题" : "Theme Mode"}
                    options={[
                      { value: "dark" as ThemeMode, label: "Dark" },
                      { value: "light" as ThemeMode, label: "Light" }
                    ]}
                    value={mode}
                    onChange={(nextMode) => void setModeParam(nextMode)}
                    itemClassName="h-[28px] px-2 text-[11.5px]"
                  />
                </>
              ) : null}

              {/* Previous / Next Style Switcher */}
              <div className="border-hairline bg-code inline-flex items-stretch border">
                <Link
                  href={buildStyleHref(prevStyle.slug)}
                  title={isZh ? `上一套：${prevStyle.nameZh}` : `Previous: ${prevStyle.name}`}
                  aria-label={`Previous: ${prevStyle.name}`}
                  className="border-hairline text-muted hover:bg-surface-hover hover:text-ink inline-flex h-[30px] w-[30px] items-center justify-center border-r transition-colors"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href={buildStyleHref(nextStyle.slug)}
                  title={isZh ? `下一套：${nextStyle.nameZh}` : `Next: ${nextStyle.name}`}
                  aria-label={`Next: ${nextStyle.name}`}
                  className="text-muted hover:bg-surface-hover hover:text-ink inline-flex h-[30px] w-[30px] items-center justify-center transition-colors"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Main 100% Full-Bleed Center Stage + 340px Sticky Inspector */}
          <div className="grid grid-cols-1 items-start xl:grid-cols-[minmax(0,1fr)_340px]">
            <div
              className={cn(
                "min-w-0",
                tab === "live"
                  ? "xl:max-h-[calc(100dvh-var(--header-h)-44px)] xl:overflow-y-auto"
                  : "p-5"
              )}
            >
              {tab === "live" ? (
                <LiveStyleCanonicalStage
                  style={item}
                  mode={mode}
                  isZh={isZh}
                  template={template}
                  radiusOverride={liveRadius}
                  fullBleed
                  preferGeneric={preferGeneric}
                />
              ) : tab === "palette" ? (
                <div className="grid gap-4">
                  <StylePalettePanel modeLabel="DARK" palette={item.dark} isZh={isZh} />
                  <StylePalettePanel modeLabel="LIGHT" palette={item.light} isZh={isZh} />
                </div>
              ) : (
                <StyleGuardrailsTab item={item} rawCss={rawCss} rawMd={rawMd} isZh={isZh} />
              )}
            </div>

            <StyleRightInspector
              item={item}
              isZh={isZh}
              stageMode={mode}
              liveRadius={liveRadius}
              onCopyMd={() => void copy(rawMd, `Copied ${item.name} DESIGN.md`)}
              onCopyCss={() => void copy(rawCss, `Copied ${item.name} CSS tokens`)}
              onDownloadMd={() => downloadText(`${item.slug}-DESIGN.md`, rawMd)}
              onApplySkin={handleApplyToWorkbench}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
