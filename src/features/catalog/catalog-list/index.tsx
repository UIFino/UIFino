"use client";

import { useLocale, useTranslations } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { FilterToolbar } from "@/components/patterns/filter-bar";
import { EmptyState } from "@/components/patterns/state-views";
import { Badge } from "@/components/primitives/badge";
import { SearchInput } from "@/components/primitives/input";
import { SegmentedControl } from "@/components/primitives/segmented";
import type { ThemeMode } from "@/core/tokens";
import { Link } from "@/i18n/navigation";
import {
  BrandPortrait,
  CATALOG_CATEGORIES,
  CATALOG_CATEGORY_LABELS,
  CATALOG_ITEMS,
  type CatalogCategoryFilter
} from "@/registry/catalog";

type KindFilter = "all" | "website" | "app";

export function CatalogListView() {
  const t = useTranslations("catalog");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isZh = locale === "zh";

  const [kindRaw, setKind] = useQueryState("kind", parseAsString.withDefault("all"));
  const [catRaw, setCategory] = useQueryState("category", parseAsString.withDefault("All"));
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));
  const [modeRaw, setMode] = useQueryState("mode", parseAsString.withDefault("dark"));

  const kind: KindFilter =
    kindRaw === "website" || kindRaw === "app" ? kindRaw : "all";
  const category: CatalogCategoryFilter = CATALOG_CATEGORIES.includes(
    catRaw as CatalogCategoryFilter
  )
    ? (catRaw as CatalogCategoryFilter)
    : "All";
  const previewMode: ThemeMode = modeRaw === "light" ? "light" : "dark";

  const q = search.trim().toLowerCase();
  const filtered = CATALOG_ITEMS.filter((item) => {
    const kindOk = kind === "all" || item.kind === kind;
    const catOk = category === "All" || item.category === category;
    const qOk =
      !q ||
      [
        item.name,
        item.slug,
        item.category,
        CATALOG_CATEGORY_LABELS[item.category].zh,
        item.fonts.display,
        ...item.tags,
        item.summaryEn,
        item.summaryZh
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    return kindOk && catOk && qOk;
  });

  const handleReset = () => {
    void setKind("all");
    void setCategory("All");
    void setSearch("");
  };

  return (
    <div className="band-full">
      <div className="shell-wrap">
        <FilterToolbar
          left={
            <>
              <SegmentedControl
                options={[
                  { value: "all" as KindFilter, label: isZh ? "全部" : "All" },
                  { value: "website" as KindFilter, label: isZh ? "桌面网站" : "Websites" },
                  { value: "app" as KindFilter, label: isZh ? "移动应用" : "Apps" }
                ]}
                value={kind}
                onChange={(v) => void setKind(v)}
              />

              <SegmentedControl
                options={CATALOG_CATEGORIES.map((c) => ({
                  value: c,
                  label: isZh ? CATALOG_CATEGORY_LABELS[c].zh : CATALOG_CATEGORY_LABELS[c].en
                }))}
                value={category}
                onChange={(v) => void setCategory(v)}
              />

              <SearchInput
                value={search}
                onChange={(e) => void setSearch(e.target.value)}
                placeholder={t("searchPlaceholder")}
                wrapperClassName="w-[210px]"
              />
            </>
          }
          right={
            <>
              <span className="font-mono-ui text-xs text-muted">{filtered.length} specs</span>
              <SegmentedControl
                options={[
                  { value: "dark" as ThemeMode, label: "Dark" },
                  { value: "light" as ThemeMode, label: "Light" }
                ]}
                value={previewMode}
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
          <div className="grid grid-cols-1 gap-x-[22px] gap-y-7 px-6 py-7 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((item) => (
              <Link
                key={item.id}
                href={`/catalog/${item.id}`}
                className="group flex min-w-0 flex-col gap-2.5"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden border border-hairline bg-surface transition-colors duration-160 group-hover:border-accent-border">
                  <BrandPortrait item={item} mode={previewMode} />
                  <Badge variant="pillOverlay" className="absolute top-2.5 left-2.5">
                    {item.kind === "app" ? "APP SPEC" : "DESIGN.md"}
                  </Badge>
                </div>
                <div className="px-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[14.5px] font-semibold text-ink">
                      {item.name}
                    </span>
                    <span className="font-mono-ui shrink-0 text-[11.5px] text-subtle">
                      {isZh
                        ? CATALOG_CATEGORY_LABELS[item.category].zh
                        : CATALOG_CATEGORY_LABELS[item.category].en}
                    </span>
                  </div>
                  <div className="mt-1 line-clamp-2 text-[12.5px] leading-[1.45] text-muted">
                    {isZh ? item.summaryZh : item.summaryEn}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
