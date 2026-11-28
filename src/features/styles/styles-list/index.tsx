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

type StylePreviewModeSetting = "auto" | ThemeMode;

export function StylesListView() {
  const t = useTranslations("styles");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isZh = locale === "zh";

  const [toneRaw, setTone] = useQueryState("tone", parseAsString.withDefault("all"));
  const [scenarioRaw, setScenario] = useQueryState("scenario", parseAsString.withDefault("all"));
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));
  const [modeRaw, setMode] = useQueryState("mode", parseAsString.withDefault("auto"));

  const tone: StyleToneFilter = STYLE_TONE_FILTERS.includes(toneRaw as StyleToneFilter)
    ? (toneRaw as StyleToneFilter)
    : "all";
  const scenario: StyleScenarioFilter = STYLE_SCENARIO_FILTERS.includes(
    scenarioRaw as StyleScenarioFilter
  )
    ? (scenarioRaw as StyleScenarioFilter)
    : "all";
  const modeSetting: StylePreviewModeSetting =
    modeRaw === "dark" || modeRaw === "light" ? modeRaw : "auto";

  const q = search.trim().toLowerCase();
  const filtered = STYLE_ITEMS.filter((item) => {
    const toneOk = tone === "all" || item.primaryTone === tone;
    const scenarioOk = scenario === "all" || item.scenarios.includes(scenario);
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

  return (
    <div className="band-full">
      <div className="shell-wrap">
        <FilterToolbar
          left={
            <>
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
                  label: isZh ? STYLE_SCENARIO_LABELS[sf].zh : STYLE_SCENARIO_LABELS[sf].en
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
              <span className="font-mono-ui text-muted text-xs">
                {filtered.length} {t("countUnit")}
              </span>
              <SegmentedControl
                options={[
                  { value: "auto" as StylePreviewModeSetting, label: t("modeAuto") },
                  { value: "dark" as StylePreviewModeSetting, label: "Dark" },
                  { value: "light" as StylePreviewModeSetting, label: "Light" }
                ]}
                value={modeSetting}
                onChange={(v) => void setMode(v)}
              />
            </>
          }
        />

        {filtered.length === 0 ? (
          <EmptyState
            title={tCommon("emptyResult")}
            actionLabel={tCommon("resetFilter")}
            onReset={handleReset}
          />
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 px-6 py-7 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {filtered.map((item) => {
              const cardMode: ThemeMode = modeSetting === "auto" ? item.primaryTone : modeSetting;
              return (
                <Link
                  key={item.slug}
                  href={`/styles/${item.slug}`}
                  className="group flex min-w-0 flex-col gap-3"
                >
                  <div className="border-hairline bg-surface group-hover:border-accent-border relative overflow-hidden border transition-colors duration-160">
                    <StyleMiniPreview style={item} mode={cardMode} isZh={isZh} />
                  </div>

                  <div className="px-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex min-w-0 items-center gap-2">
                        <DualSwatch swatch={item.swatch} />
                        <span className="text-ink truncate text-[15px] font-semibold">
                          {isZh ? item.nameZh : item.name}
                        </span>
                      </span>
                      <span className="font-mono-ui text-subtle shrink-0 text-[11.5px]">
                        {isZh
                          ? STYLE_GROUP_LABELS[item.group].zh
                          : STYLE_GROUP_LABELS[item.group].en}
                      </span>
                    </div>

                    <p className="text-muted mt-1.5 line-clamp-2 text-[12.5px] leading-[1.48]">
                      {isZh ? item.summaryZh : item.summaryEn}
                    </p>

                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {item.scenarios.map((sc) => (
                        <Badge key={sc} className="text-muted text-[10.5px]">
                          {isZh ? STYLE_SCENARIO_LABELS[sc].zh : STYLE_SCENARIO_LABELS[sc].en}
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
