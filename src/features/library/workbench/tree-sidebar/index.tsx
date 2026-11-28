"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, FileCode2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { SearchInput } from "@/components/primitives/input";
import type { ComponentAssetMeta, ComponentCategoryMeta } from "@/core/codegen";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import {
  ASSET_TYPES,
  type AssetTypeFilter,
  COMPONENT_CATEGORIES
} from "@/registry/components";
import type { WorkbenchStageTab } from "../toolbar";

export interface WorkbenchTreeSidebarProps {
  readonly category: ComponentCategoryMeta;
  readonly item: ComponentAssetMeta;
  readonly files: readonly string[];
  readonly activeFile: string;
  readonly stageTab: WorkbenchStageTab;
  readonly onSelectFile: (file: string) => void;
}

export function WorkbenchTreeSidebar({
  category,
  item,
  files,
  activeFile,
  stageTab,
  onSelectFile
}: WorkbenchTreeSidebarProps) {
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
      cat.items.some((it) => it.name.toLowerCase().includes(q))
    );
  });

  const toggleCat = (catId: string) => {
    setExpandedCatIds((prev) => ({ ...prev, [catId]: !(prev[catId] ?? catId === category.id) }));
  };

  return (
    <aside className="order-3 border-t border-hairline bg-canvas py-3.5 lg:sticky lg:top-[var(--header-h)] lg:order-1 lg:h-[calc(100dvh-var(--header-h))] lg:overflow-y-auto lg:border-t-0 lg:border-r">
      <Link
        href={`/components/${category.id}`}
        className="font-mono-ui mb-2 flex items-center px-3 py-1.5 text-[11.5px] text-muted hover:bg-surface-hover hover:text-ink"
      >
        ← {t("wbBack")} ({isZh ? category.nameZh : category.name})
      </Link>

      <div className="grid gap-1.5 border-b border-hairline px-3 pb-2.5">
        <select
          aria-label="Asset Type"
          value={treeType}
          onChange={(e) => setTreeType(e.target.value as AssetTypeFilter)}
          className="h-[30px] border border-hairline bg-surface px-2 font-mono text-[11.5px] text-ink outline-none"
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
        />
      </div>

      {/* Active Asset Virtual Source Files */}
      <div className="border-b border-hairline py-2.5">
        <div className="eyebrow-mono px-3 pb-1.5">SOURCE FILES</div>
        {files.map((file) => {
          const active = stageTab === "code" && activeFile === file;
          return (
            <button
              key={file}
              type="button"
              onClick={() => onSelectFile(file)}
              className={cn(
                "font-mono-ui flex w-full cursor-pointer items-center gap-2 border-r-2 px-3 py-1.5 text-left text-[11.5px] transition-colors",
                active
                  ? "border-r-accent-text bg-elevated font-semibold text-ink"
                  : "border-r-transparent text-muted hover:bg-surface-hover hover:text-ink"
              )}
            >
              <FileCode2 className="h-3.5 w-3.5 shrink-0 text-subtle" />
              <span className="truncate">{file}</span>
            </button>
          );
        })}
      </div>

      {/* Collapsible shadcn-style Directory Tree */}
      <div className="grid gap-0.5 pt-2.5">
        {visibleCats.map((cat) => {
          const isOpen = Boolean(q) || (expandedCatIds[cat.id] ?? cat.id === category.id);
          const matchingItems = cat.items.filter(
            (it) =>
              !q ||
              it.name.toLowerCase().includes(q) ||
              cat.name.toLowerCase().includes(q) ||
              cat.nameZh.toLowerCase().includes(q)
          );

          return (
            <div key={cat.id}>
              <button
                type="button"
                onClick={() => toggleCat(cat.id)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between px-3 py-1.5 text-left text-[12.5px] transition-colors hover:bg-surface-hover"
              >
                <span
                  className={cn(
                    "flex min-w-0 items-center gap-1.5",
                    isOpen ? "font-semibold text-ink" : "font-medium text-muted"
                  )}
                >
                  {isOpen ? (
                    <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-subtle" />
                  )}
                  <span className="truncate">{isZh ? cat.nameZh : cat.name}</span>
                </span>
                <span className="font-mono text-[11px] text-subtle">{cat.items.length}</span>
              </button>

              {isOpen ? (
                <div className="ml-[19px] border-l border-hairline py-0.5">
                  {matchingItems.map((it) => {
                    const active = it.id === item.id;
                    return (
                      <Link
                        key={it.id}
                        href={`/components/${cat.id}/${it.id}`}
                        className={cn(
                          "flex w-full items-center border-r-2 py-1.5 pr-3 pl-3.5 text-[12.5px] transition-colors",
                          active
                            ? "border-r-accent-text bg-elevated font-semibold text-ink"
                            : "border-r-transparent text-muted hover:bg-surface-hover hover:text-ink"
                        )}
                      >
                        <span className="truncate">{it.name}</span>
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
