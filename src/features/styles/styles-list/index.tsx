"use client";

import { useLocale, useTranslations } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { FilterToolbar } from "@/components/patterns/filter-bar";
import { EmptyState } from "@/components/patterns/state-views";
import { Badge } from "@/components/primitives/badge";
import { DualSwatch } from "@/components/primitives/dual-swatch";
import { SearchInput } from "@/components/primitives/input";
import { SegmentedControl } from "@/components/primitives/segmented";
import type { ThemeMode } from "@/core/tokens";
import { Link } from "@/i18n/navigation";
import {
  STYLE_GROUP_LABELS,
  STYLE_ITEMS,
  STYLE_SCENARIO_FILTERS,
  STYLE_SCENARIO_LABELS,
  STYLE_TONE_FILTERS,
  STYLE_TONE_LABELS,
  type StyleScenarioFilter,
  type StyleToneFilter
} from "@/registry/styles";
import { StyleMiniPreview } from "../specimens/mini-card-preview";
import {
  type PlaygroundModeSetting,
  StylesComparePlayground
} from "./compare-playground";

type StylesViewMode = "grid" | "compare";

export function StylesListView() {
  const t = useTranslations("styles");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isZh = locale === "zh";

  const [viewRaw, setView] = useQueryState("view", parseAsString.withDefault("grid"));
  const [toneRaw, setTone] = useQueryState("tone", parseAsString.withDefault("all"));
  const [scenarioRaw, setScenario] = useQueryState(
    "scenario",
    parseAsString.withDefault("all")
  );
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));
  const [styleRaw, setStyleSlug] = useQueryState(
    "style",
    parseAsString.withDefault("hairline-grid")
  );
  const [modeRaw, setMode] = useQueryState("mode", parseAsString.withDefault("auto"));

  const view: StylesViewMode = viewRaw === "compare" ? "compare" : "grid";
  const tone: StyleToneFilter = STYLE_TONE_FILTERS.includes(toneRaw as StyleToneFilter)
    ? (toneRaw as StyleToneFilter)
    : "all";
  const scenario: StyleScenarioFilter = STYLE_SCENARIO_FILTERS.includes(
    scenarioRaw as StyleScenarioFilter
  )
    ? (scenarioRaw as StyleScenarioFilter)
    : "all";
  const modeSetting: PlaygroundModeSetting =
    modeRaw === "dark" || modeRaw === "light" ? modeRaw : "auto";

  const q = search.trim().toLowerCase();
  const filtered = STYLE_ITEMS.filter((item) => {
    const toneOk = tone === "all" || item.primaryTone === tone;
    const scenarioOk =
      scenario === "all" || item.scenarios.includes(scenario);
    const qOk =
      !q ||
      [
        item.name,
        item.nameZh,
        item.slug,
        `${item.defaultRadius}px`,
        item.summaryEn,
        item.summaryZh,
        ...item.tags
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    return toneOk && scenarioOk && qOk;
  });

  const handleReset = () => {
    void setTone("all");
    void setScenario("all");
    void setSearch("");
  };

  const activeStyle =
    filtered.find((s) => s.slug === styleRaw) ??
    filtered[0] ??
    STYLE_ITEMS[0]!;

  return (
    <div className="band-full">
      <div className="shell-wrap">
        <FilterToolbar
          left={
            <>
              <SegmentedControl
                options={[
                  { value: "grid" as StylesViewMode, label: t("viewGallery") },
                  { value: "compare" as StylesViewMode, label: t("viewCompare") }
                ]}
                value={view}
                onChange={(v) => void setView(v)}
              />

              <SegmentedControl
                options={STYLE_TONE_FILTERS.map((tf) => ({
                  value: tf,
                  label: isZh ? STYLE_TONE_LABELS[tf].zh : STYLE_TONE_LABELS[tf].en
                }))}
                value={tone}
                onChange={(v) => void setTone(v)}
              />

              <SegmentedControl
                options={STYLE_SCENARIO_FILTERS.map((sf) => ({
                  value: sf,
                  label: isZh
                    ? STYLE_SCENARIO_LABELS[sf].zh
                    : STYLE_SCENARIO_LABELS[sf].en
                }))}
                value={scenario}
                onChange={(v) => void setScenario(v)}
              />

              <SearchInput
                value={search}
                onChange={(e) => void setSearch(e.target.value)}
                placeholder={t("searchPlaceholder")}
                wrapperClassName="w-[200px]"
              />
            </>
          }
          right={
            <>
              <span className="font-mono-ui text-xs text-muted">
                {filtered.length} {t("countUnit")}
              </span>
              {view === "grid" ? (
                <SegmentedControl
                  options={[
                    { value: "auto" as PlaygroundModeSetting, label: t("modeAuto") },
                    { value: "dark" as PlaygroundModeSetting, label: "Dark" },
                    { value: "light" as PlaygroundModeSetting, label: "Light" }
                  ]}
                  value={modeSetting}
                  onChange={(v) => void setMode(v)}
                />
              ) : null}
            </>
          }
        />

        {filtered.length === 0 ? (
          <EmptyState
            title={tCommon("emptyResult")}
            actionLabel={tCommon("resetFilter")}
            onReset={handleReset}
          />
        ) : view === "compare" ? (
          <StylesComparePlayground
            items={filtered}
            activeStyle={activeStyle}
            modeSetting={modeSetting}
            isZh={isZh}
            onSelectStyle={(slug) => void setStyleSlug(slug)}
            onModeSettingChange={(next) => void setMode(next)}
          />
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 px-6 py-7 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => {
              const cardMode: ThemeMode =
                modeSetting === "auto" ? item.primaryTone : modeSetting;
              return (
                <Link
                  key={item.slug}
                  href={`/styles/${item.slug}`}
                  className="group flex min-w-0 flex-col gap-3"
                >
                  <div className="relative overflow-hidden border border-hairline bg-surface transition-colors duration-160 group-hover:border-accent-border">
                    <StyleMiniPreview style={item} mode={cardMode} />
                  </div>

                  <div className="px-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex min-w-0 items-center gap-2">
                        <DualSwatch swatch={item.swatch} />
                        <span className="truncate text-[15px] font-semibold text-ink">
                          {isZh ? item.nameZh : item.name}
                        </span>
                      </span>
                      <span className="font-mono-ui shrink-0 text-[11.5px] text-subtle">
                        {isZh
                          ? STYLE_GROUP_LABELS[item.group].zh
                          : STYLE_GROUP_LABELS[item.group].en}
                      </span>
                    </div>

                    <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-[1.48] text-muted">
                      {isZh ? item.summaryZh : item.summaryEn}
                    </p>

                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {item.scenarios.map((sc) => (
                        <Badge key={sc} className="text-[10.5px] text-muted">
                          {isZh
                            ? STYLE_SCENARIO_LABELS[sc].zh
                            : STYLE_SCENARIO_LABELS[sc].en}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
