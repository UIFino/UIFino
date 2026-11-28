"use client";

import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { SearchInput } from "@/components/primitives/input";
import type { ComponentAssetMeta, ComponentCategoryMeta } from "@/core/codegen";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { ASSET_TYPES, type AssetTypeFilter, COMPONENT_CATEGORIES } from "@/registry/components";

export interface WorkbenchTreeSidebarProps {
  readonly category: ComponentCategoryMeta;
  readonly item: ComponentAssetMeta;
}

export function WorkbenchTreeSidebar({ category, item }: WorkbenchTreeSidebarProps) {
  const t = useTranslations("library");
  const locale = useLocale();
  const isZh = locale === "zh";

  const [treeType, setTreeType] = useState<AssetTypeFilter>("all");
  const [treeFilter, setTreeFilter] = useState("");
  const [expandedCatIds, setExpandedCatIds] = useState<Record<string, boolean>>(() => ({
    [category.id]: true
  }));

  const q = treeFilter.trim().toLowerCase();
  const visibleCats = COMPONENT_CATEGORIES.filter((cat) => {
    const typeOk = treeType === "all" || cat.assetType === treeType;
    if (!typeOk) return false;
    if (!q) return true;
    return (
      cat.name.toLowerCase().includes(q) ||
      cat.nameZh.toLowerCase().includes(q) ||
      cat.items.some(
        (it) => it.name.toLowerCase().includes(q) || (it.nameZh?.toLowerCase().includes(q) ?? false)
      )
    );
  });

  const toggleCat = (catId: string) => {
    setExpandedCatIds((prev) => ({
      ...prev,
      [catId]: !(prev[catId] ?? catId === category.id)
    }));
  };

  return (
    <aside className="border-hairline bg-canvas order-3 border-t pb-3.5 lg:sticky lg:top-[var(--header-h)] lg:order-1 lg:h-[calc(100dvh-var(--header-h))] lg:overflow-y-auto lg:border-t-0 lg:border-r">
      <div className="border-hairline flex min-h-[44px] items-center border-b px-3">
        <Link
          href={`/components/${category.id}`}
          className="group border-hairline bg-surface text-ink hover:border-strong flex h-7 w-full items-center justify-between border px-2.5 text-xs font-medium transition-colors hover:bg-gray-100"
        >
          <span className="flex min-w-0 items-center gap-1.5">
            <ArrowLeft className="text-muted group-hover:text-ink h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-x-0.5" />
            <span className="truncate">
              {t("wbBack")} · {isZh ? category.nameZh : category.name}
            </span>
          </span>
        </Link>
      </div>

      <div className="border-hairline grid gap-1.5 border-b px-3 py-2.5">
        <select
          aria-label={isZh ? "组件分类筛选" : "Asset Type"}
          value={treeType}
          onChange={(e) => setTreeType(e.target.value as AssetTypeFilter)}
          className="border-hairline bg-surface text-ink h-[30px] border px-2 text-xs outline-none"
        >
          {ASSET_TYPES.map((tp) => (
            <option key={tp.id} value={tp.id}>
              {isZh ? tp.labelZh : tp.labelEn}
            </option>
          ))}
        </select>

        <SearchInput
          value={treeFilter}
          onChange={(e) => setTreeFilter(e.target.value)}
          placeholder={t("wbFilterTree")}
          wrapperClassName="h-7 px-2"
          className="text-[11.5px]"
        />
      </div>

      {/* Collapsible shadcn-style Directory Tree */}
      <div className="grid gap-0.5 pt-2.5">
        {visibleCats.map((cat) => {
          const isOpen = Boolean(q) || (expandedCatIds[cat.id] ?? cat.id === category.id);
          const matchingItems = cat.items.filter(
            (it) =>
              !q ||
              it.name.toLowerCase().includes(q) ||
              (it.nameZh?.toLowerCase().includes(q) ?? false) ||
              cat.name.toLowerCase().includes(q) ||
              cat.nameZh.toLowerCase().includes(q)
          );

          return (
            <div key={cat.id}>
              <button
                type="button"
                onClick={() => toggleCat(cat.id)}
                aria-expanded={isOpen}
                className="hover:bg-surface-hover flex w-full cursor-pointer items-center justify-between px-3 py-1.5 text-left text-[12.5px] transition-colors"
              >
                <span
                  className={cn(
                    "flex min-w-0 items-center gap-1.5",
                    isOpen ? "text-ink font-semibold" : "text-muted font-medium"
                  )}
                >
                  {isOpen ? (
                    <ChevronDown className="text-muted h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <ChevronRight className="text-subtle h-3.5 w-3.5 shrink-0" />
                  )}
                  <span className="truncate">{isZh ? cat.nameZh : cat.name}</span>
                </span>
                <span className="text-subtle font-mono text-[11px]">{cat.items.length}</span>
              </button>

              {isOpen ? (
                <div className="border-hairline ml-[19px] border-l py-0.5">
                  {matchingItems.map((it) => {
                    const active = it.id === item.id;
                    return (
                      <Link
                        key={it.id}
                        href={`/components/${cat.id}/${it.id}`}
                        className={cn(
                          "flex w-full items-center border-r-2 py-1.5 pr-3 pl-3.5 text-[12.5px] transition-colors",
                          active
                            ? "border-r-accent-text bg-elevated text-ink font-semibold"
                            : "text-muted hover:bg-surface-hover hover:text-ink border-r-transparent"
                        )}
                      >
                        <span className="truncate">{isZh && it.nameZh ? it.nameZh : it.name}</span>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
