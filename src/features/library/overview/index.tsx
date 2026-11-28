"use client";

import { useLocale, useTranslations } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { FilterToolbar } from "@/components/patterns/filter-bar";
import { EmptyState } from "@/components/patterns/state-views";
import { Badge } from "@/components/primitives/badge";
import { SearchInput } from "@/components/primitives/input";
import { SegmentedControl } from "@/components/primitives/segmented";
import { Link } from "@/i18n/navigation";
import {
  ASSET_TYPES,
  type AssetTypeFilter,
  CategoryMiniStack,
  COMPONENT_CATEGORIES
} from "@/registry/components";

type SortMode = "popular" | "count" | "az";
type CardSizeMode = "small" | "large" | "list";

export function LibraryOverviewView() {
  const t = useTranslations("library");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isZh = locale === "zh";

  const [typeRaw, setAssetType] = useQueryState("type", parseAsString.withDefault("all"));
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));
  const [sortRaw, setSort] = useQueryState("sort", parseAsString.withDefault("popular"));
  const [sizeRaw, setSize] = useQueryState("view", parseAsString.withDefault("small"));

  const assetType: AssetTypeFilter = ASSET_TYPES.some((tp) => tp.id === typeRaw)
    ? (typeRaw as AssetTypeFilter)
    : "all";
  const sort: SortMode = sortRaw === "count" || sortRaw === "az" ? sortRaw : "popular";
  const cardSize: CardSizeMode = sizeRaw === "large" || sizeRaw === "list" ? sizeRaw : "small";

  const q = search.trim().toLowerCase();
  let list = COMPONENT_CATEGORIES.filter((cat) => {
    const typeOk = assetType === "all" || cat.assetType === assetType;
    const qOk =
      !q ||
      [
        cat.name,
        cat.nameZh,
        cat.descEn,
        cat.descZh,
        ...cat.items.map((item) => `${item.name} ${item.tags.join(" ")}`)
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    return typeOk && qOk;
  });

  if (sort === "az") {
    list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "count") {
    list = [...list].sort((a, b) => b.totalCount - a.totalCount);
  }

  const totalAssets = list.reduce((sum, cat) => sum + cat.totalCount, 0);
  const gridCls =
    cardSize === "large" ? "lined-grid-3" : cardSize === "list" ? "lined-grid-2" : "lined-grid-4";

  return (
    <div className="band-full">
      <section className="shell-wrap">
        <FilterToolbar
          left={
            <>
              <SegmentedControl
                options={ASSET_TYPES.map((tp) => ({
                  value: tp.id,
                  label: isZh ? tp.labelZh : tp.labelEn
                }))}
                value={assetType}
                onChange={(v) => void setAssetType(v)}
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
              <span className="font-mono-ui text-muted text-xs">
                {isZh
                  ? `${list.length} 类 · 共 ${totalAssets} 项资产`
                  : `${list.length} categories · ${totalAssets} assets`}
              </span>
              <SegmentedControl
                options={[
                  { value: "popular" as SortMode, label: isZh ? "热门" : "Popular" },
                  { value: "count" as SortMode, label: isZh ? "数量" : "Count" },
                  { value: "az" as SortMode, label: "A–Z" }
                ]}
                value={sort}
                onChange={(v) => void setSort(v)}
              />
              <SegmentedControl
                options={[
                  { value: "small" as CardSizeMode, label: isZh ? "四列" : "4-Col" },
                  { value: "large" as CardSizeMode, label: isZh ? "三列" : "3-Col" },
                  { value: "list" as CardSizeMode, label: isZh ? "列表" : "List" }
                ]}
                value={cardSize}
                onChange={(v) => void setSize(v)}
              />
            </>
          }
        />

        {list.length === 0 ? (
          <EmptyState
            title={tCommon("emptyResult")}
            actionLabel={tCommon("resetFilter")}
            onReset={() => {
              void setAssetType("all");
              void setSearch("");
            }}
          />
        ) : (
          <div className={gridCls}>
            {list.map((cat) =>
              cardSize === "list" ? (
                <div key={cat.id} className="lined-cell">
                  <Link
                    href={`/components/${cat.id}`}
                    className="flex w-full items-center justify-between gap-4 px-[22px] py-[18px] text-left"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge>
                          {isZh
                            ? cat.assetType === "section"
                              ? "官网区块"
                              : cat.assetType === "block"
                                ? "功能模块"
                                : "交互动效"
                            : cat.assetType.toUpperCase()}
                        </Badge>
                        <span className="text-[15px] font-semibold">
                          {isZh ? cat.nameZh : cat.name}
                        </span>
                      </div>
                      <div className="text-muted mt-[5px] truncate text-[13px]">
                        {isZh ? cat.descZh : cat.descEn}
                      </div>
                    </div>
                    <span className="font-mono-ui text-accent-text shrink-0 text-xs">
                      {cat.totalCount} →
                    </span>
                  </Link>
                </div>
              ) : (
                <div key={cat.id} className="lined-cell">
                  <Link
                    href={`/components/${cat.id}`}
                    className="group/cat flex h-[214px] w-full flex-col justify-between overflow-hidden px-[18px] pt-[18px] text-left"
                  >
                    <div className="w-full">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-ink truncate text-[14.5px] font-semibold">
                          {isZh ? cat.nameZh : cat.name}
                        </span>
                        <Badge>
                          {isZh
                            ? cat.assetType === "section"
                              ? "官网区块"
                              : cat.assetType === "block"
                                ? "功能模块"
                                : "交互动效"
                            : cat.assetType.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="font-mono-ui text-subtle mt-[3px] text-xs">
                        {isZh ? `${cat.totalCount} 项资产` : `${cat.totalCount} assets`}
                      </div>
                    </div>
                    <CategoryMiniStack miniKind={cat.miniKind} />
                    <div className="cell-bottom-mask" />
                  </Link>
                </div>
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
}
