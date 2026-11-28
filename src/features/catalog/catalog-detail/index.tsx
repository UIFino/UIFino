"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, Monitor, Smartphone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { SearchInput } from "@/components/primitives/input";
import { SegmentedControl } from "@/components/primitives/segmented";
import {
  type CatalogBrandSpec,
  compileBrandDesignMd,
  compileBrandTokensCss
} from "@/core/design-md";
import type { ThemeMode } from "@/core/tokens";
import { useClipboard } from "@/hooks/use-clipboard";
import { useDownload } from "@/hooks/use-download";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import {
  APP_CATALOG_ITEMS,
  CATALOG_CATEGORIES,
  CATALOG_CATEGORY_LABELS,
  CATALOG_ITEMS,
  type CatalogCategoryFilter,
  WEBSITE_CATALOG_ITEMS
} from "@/registry/catalog";
import { useWorkbenchPresetStore } from "@/stores/workbench-preset.store";
import { getFallbackBlueprintPages } from "./blueprint-preview";
import { CatalogRightInspector } from "./right-inspector";
import { CatalogGuardrailsTab } from "./tab-guardrails";
import { type CaptureViewport, CatalogPagesTab } from "./tab-pages";
import { CatalogSectionsTab } from "./tab-sections";
import { CatalogTokensCssTab } from "./tab-tokens";

type CatalogDetailTab = "pages" | "sections" | "tokens" | "guardrails";

export function CatalogDetailView({ item }: { readonly item: CatalogBrandSpec }) {
  const t = useTranslations("catalog");
  const locale = useLocale();
  const isZh = locale === "zh";
  const router = useRouter();
  const { copy } = useClipboard();
  const { downloadText } = useDownload();
  const applyBrandSkin = useWorkbenchPresetStore((s) => s.applyBrandSkin);

  const scrapedPages = item.scraped?.pages ?? [];
  const fallbackPages = getFallbackBlueprintPages(item);
  const pageTabs = scrapedPages.length > 0 ? scrapedPages : fallbackPages;

  const [tab, setTab] = useState<CatalogDetailTab>("pages");
  const [activePageId, setActivePageId] = useState<string>(pageTabs[0]?.id ?? "home");
  const [vp, setVp] = useState<CaptureViewport>("desktop");
  const [blueprintMode, setBlueprintMode] = useState<ThemeMode>(item.defaultTheme ?? "dark");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [scrollTrigger, setScrollTrigger] = useState(0);

  // Left brand rail search, domain filter & collapsible directory state
  const [railSearch, setRailSearch] = useState("");
  const [railCategory, setRailCategory] = useState<CatalogCategoryFilter>("All");
  const [openGroups, setOpenGroups] = useState<{ website: boolean; app: boolean }>({
    website: true,
    app: true
  });

  useEffect(() => {
    setActivePageId(pageTabs[0]?.id ?? "home");
    setBlueprintMode(item.defaultTheme ?? "dark");
    setSelectedIdx(null);
    setHoveredIdx(null);
  }, [item.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setSelectedIdx(null);
    setHoveredIdx(null);
  }, [activePageId, vp]);

  const currentScrapedPage = scrapedPages.find((p) => p.id === activePageId) ?? scrapedPages[0];
  const currentFallbackPage = fallbackPages.find((p) => p.id === activePageId) ?? fallbackPages[0];
  const activeAnatomy = currentScrapedPage?.anatomy ?? currentFallbackPage?.anatomy ?? [];
  const activePagePath = currentScrapedPage?.path ?? currentFallbackPage?.path ?? "/";

  const rawMd = compileBrandDesignMd(item);
  const rawCss = compileBrandTokensCss(item);

  const handleApplyToWorkbench = () => {
    applyBrandSkin(item.id);
    router.push(`/components/hero/hero-telemetry-counter?skin=${item.id}`);
  };

  const handleSelectSection = (idx: number) => {
    if (selectedIdx === idx) {
      setSelectedIdx(null);
      return;
    }
    setSelectedIdx(idx);
    setScrollTrigger((n) => n + 1);
  };

  // Prev / Next cycling across CATALOG_ITEMS
  const currentIndex = CATALOG_ITEMS.findIndex((b) => b.id === item.id);
  const prevBrand =
    CATALOG_ITEMS[(currentIndex - 1 + CATALOG_ITEMS.length) % CATALOG_ITEMS.length]!;
  const nextBrand = CATALOG_ITEMS[(currentIndex + 1) % CATALOG_ITEMS.length]!;

  // Filtered left rail items
  const q = railSearch.trim().toLowerCase();
  const matchesRail = (b: CatalogBrandSpec) => {
    const catOk = railCategory === "All" || b.category === railCategory;
    const qOk =
      !q ||
      `${b.name} ${b.slug} ${b.category} ${b.tags.join(" ")}`.toLowerCase().includes(q);
    return catOk && qOk;
  };

  const filteredWeb = WEBSITE_CATALOG_ITEMS.filter(matchesRail);
  const filteredApps = APP_CATALOG_ITEMS.filter(matchesRail);

  const viewTabs: readonly { readonly id: CatalogDetailTab; readonly label: string }[] = [
    { id: "pages", label: t("tabPages") },
    { id: "sections", label: t("tabSections") },
    { id: "tokens", label: t("tabTokens") },
    { id: "guardrails", label: t("tabGuardrails") }
  ];

  return (
    <div className="band-full">
      <div className="shell-wrap grid grid-cols-1 lg:grid-cols-[208px_minmax(0,1fr)]">
        {/* Left Narrow Brand Switcher Rail (Collapsible shadcn-style Tree + Right Accent Indicator) */}
        <aside className="order-2 border-t border-hairline bg-canvas pb-3 lg:sticky lg:top-[var(--header-h)] lg:order-1 lg:h-[calc(100dvh-var(--header-h))] lg:overflow-y-auto lg:border-t-0 lg:border-r">
          <div className="flex min-h-[44px] items-center border-b border-hairline px-3">
            <Link
              href="/catalog"
              className="group flex h-7 w-full items-center justify-between border border-hairline bg-surface px-2.5 text-xs font-medium text-ink transition-colors hover:border-strong hover:bg-gray-100"
            >
              <span className="flex items-center gap-1.5">
                <ArrowLeft className="h-3.5 w-3.5 text-muted transition-transform group-hover:-translate-x-0.5 group-hover:text-ink" />
                <span>{t("allCatalog")}</span>
              </span>
              <span className="font-mono text-[10.5px] text-subtle group-hover:text-muted">
                {CATALOG_ITEMS.length}
              </span>
            </Link>
          </div>

          <div className="my-3 grid gap-1.5 px-3">
            <SearchInput
              value={railSearch}
              onChange={(e) => setRailSearch(e.target.value)}
              placeholder={isZh ? "搜品牌 / 标签…" : "Filter specs…"}
              wrapperClassName="h-7 px-2"
              className="text-[11.5px]"
            />

            <select
              aria-label={isZh ? "按行业领域筛选" : "Filter by domain"}
              value={railCategory}
              onChange={(e) => setRailCategory(e.target.value as CatalogCategoryFilter)}
              className="h-7 w-full cursor-pointer border border-hairline bg-surface px-2 text-[11px] text-ink"
            >
              {CATALOG_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {isZh ? CATALOG_CATEGORY_LABELS[c].zh : CATALOG_CATEGORY_LABELS[c].en}
                </option>
              ))}
            </select>
          </div>

          {filteredWeb.length === 0 && filteredApps.length === 0 ? (
            <div className="px-3 py-4 text-center text-[11.5px] text-muted">
              <div>{isZh ? "没有匹配图鉴" : "No matches"}</div>
              <button
                type="button"
                onClick={() => {
                  setRailSearch("");
                  setRailCategory("All");
                }}
                className="mt-1.5 cursor-pointer font-mono text-[11px] text-accent-text hover:underline"
              >
                {isZh ? "重置筛选" : "Reset"}
              </button>
            </div>
          ) : null}

          {filteredWeb.length > 0 ? (
            <div className="mb-1.5">
              <button
                type="button"
                onClick={() =>
                  setOpenGroups((prev) => ({ ...prev, website: !prev.website }))
                }
                aria-expanded={Boolean(q || railCategory !== "All" || openGroups.website)}
                className="flex w-full cursor-pointer items-center justify-between px-3 py-1.5 text-left text-[12.5px] transition-colors hover:bg-surface-hover"
              >
                <span
                  className={cn(
                    "flex items-center gap-1.5",
                    q || railCategory !== "All" || openGroups.website
                      ? "font-semibold text-ink"
                      : "font-medium text-muted"
                  )}
                >
                  {q || railCategory !== "All" || openGroups.website ? (
                    <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-subtle" />
                  )}
                  <span>{isZh ? "桌面网站" : "Websites"}</span>
                </span>
                <span className="font-mono text-[11px] text-subtle">{filteredWeb.length}</span>
              </button>

              {q || railCategory !== "All" || openGroups.website ? (
                <div className="ml-[19px] border-l border-hairline py-0.5">
                  {filteredWeb.map((w) => {
                    const active = w.id === item.id;
                    return (
                      <Link
                        key={w.id}
                        href={`/catalog/${w.id}`}
                        className={cn(
                          "flex items-center border-r-2 py-1.5 pr-3 pl-3.5 text-[12.5px] transition-colors",
                          active
                            ? "border-r-accent-text bg-elevated font-semibold text-ink"
                            : "border-r-transparent text-muted hover:bg-surface-hover hover:text-ink"
                        )}
                      >
                        <span className="truncate">{w.name}</span>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : null}

          {filteredApps.length > 0 ? (
            <div>
              <button
                type="button"
                onClick={() => setOpenGroups((prev) => ({ ...prev, app: !prev.app }))}
                aria-expanded={Boolean(q || railCategory !== "All" || openGroups.app)}
                className="flex w-full cursor-pointer items-center justify-between px-3 py-1.5 text-left text-[12.5px] transition-colors hover:bg-surface-hover"
              >
                <span
                  className={cn(
                    "flex items-center gap-1.5",
                    q || railCategory !== "All" || openGroups.app
                      ? "font-semibold text-ink"
                      : "font-medium text-muted"
                  )}
                >
                  {q || railCategory !== "All" || openGroups.app ? (
                    <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-subtle" />
                  )}
                  <span>{isZh ? "移动应用" : "Apps"}</span>
                </span>
                <span className="font-mono text-[11px] text-subtle">{filteredApps.length}</span>
              </button>

              {q || railCategory !== "All" || openGroups.app ? (
                <div className="ml-[19px] border-l border-hairline py-0.5">
                  {filteredApps.map((a) => {
                    const active = a.id === item.id;
                    return (
                      <Link
                        key={a.id}
                        href={`/catalog/${a.id}`}
                        className={cn(
                          "flex items-center border-r-2 py-1.5 pr-3 pl-3.5 text-[12.5px] transition-colors",
                          active
                            ? "border-r-accent-text bg-elevated font-semibold text-ink"
                            : "border-r-transparent text-muted hover:bg-surface-hover hover:text-ink"
                        )}
                      >
                        <span className="truncate">{a.name}</span>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : null}
        </aside>

        {/* Center + Right Workspace */}
        <div className="order-1 min-w-0 lg:order-2">
          {/* Top 44px Control Strip + Prev/Next Brand Switcher */}
          <div className="sticky top-[var(--header-h)] z-20 flex min-h-[44px] flex-wrap items-center justify-between gap-3 border-b border-hairline bg-canvas px-4">
            <div className="flex flex-wrap items-center gap-1">
              {viewTabs.map((vt) => {
                const active = tab === vt.id;
                return (
                  <button
                    key={vt.id}
                    type="button"
                    onClick={() => setTab(vt.id)}
                    className={cn(
                      "relative inline-flex h-[43px] cursor-pointer items-center px-2.5 text-xs transition-colors",
                      active
                        ? "font-semibold text-ink after:absolute after:inset-x-2 after:bottom-0 after:h-[2px] after:bg-accent-text"
                        : "text-muted hover:text-ink"
                    )}
                  >
                    {vt.label}
                  </button>
                );
              })}

              {tab === "pages" ? (
                <div className="ml-2 border-l border-hairline pl-3">
                  <SegmentedControl
                    options={pageTabs.map((pg) => ({
                      value: pg.id,
                      label: isZh ? pg.titleZh : pg.titleEn
                    }))}
                    value={activePageId}
                    onChange={setActivePageId}
                  />
                </div>
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              {tab === "pages" ? (
                <>
                  {scrapedPages.length === 0 ? (
                    <SegmentedControl
                      options={[
                        { value: "dark" as ThemeMode, label: "Dark" },
                        { value: "light" as ThemeMode, label: "Light" }
                      ]}
                      value={blueprintMode}
                      onChange={setBlueprintMode}
                    />
                  ) : null}

                  <SegmentedControl
                    ariaLabel={isZh ? "视口尺寸" : "Viewport"}
                    options={[
                      {
                        value: "desktop" as CaptureViewport,
                        label: (
                          <>
                            <Monitor className="h-3.5 w-3.5 shrink-0" />
                            <span>{t("vpDesktop")}</span>
                          </>
                        )
                      },
                      {
                        value: "mobile" as CaptureViewport,
                        label: (
                          <>
                            <Smartphone className="h-3.5 w-3.5 shrink-0" />
                            <span>{t("vpMobile")}</span>
                          </>
                        )
                      }
                    ]}
                    value={vp}
                    onChange={setVp}
                  />
                </>
              ) : null}

              {/* Previous / Next Brand Switcher */}
              <div className="inline-flex items-stretch border border-hairline bg-code">
                <Link
                  href={`/catalog/${prevBrand.id}`}
                  title={isZh ? `上一套：${prevBrand.name}` : `Previous: ${prevBrand.name}`}
                  aria-label={`Previous: ${prevBrand.name}`}
                  className="inline-flex h-[30px] w-[30px] items-center justify-center border-r border-hairline text-muted transition-colors hover:bg-surface-hover hover:text-ink"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href={`/catalog/${nextBrand.id}`}
                  title={isZh ? `下一套：${nextBrand.name}` : `Next: ${nextBrand.name}`}
                  aria-label={`Next: ${nextBrand.name}`}
                  className="inline-flex h-[30px] w-[30px] items-center justify-center text-muted transition-colors hover:bg-surface-hover hover:text-ink"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* 100% Edge-to-Edge Visual Stage (with Floating Right-Edge Directory) + Concise Sticky Inspector */}
          <div className="grid grid-cols-1 items-start xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0">
              {tab === "pages" ? (
                <CatalogPagesTab
                  item={item}
                  isZh={isZh}
                  currentPage={currentScrapedPage}
                  activePageId={activePageId}
                  activePagePath={activePagePath}
                  anatomy={activeAnatomy}
                  vp={vp}
                  blueprintMode={blueprintMode}
                  selectedIdx={selectedIdx}
                  hoveredIdx={hoveredIdx}
                  scrollTrigger={scrollTrigger}
                  onSelectSection={handleSelectSection}
                  onClearSelection={() => setSelectedIdx(null)}
                  onHoverChange={setHoveredIdx}
                />
              ) : (
                <div className="p-5">
                  {tab === "sections" ? (
                    <CatalogSectionsTab item={item} isZh={isZh} />
                  ) : tab === "tokens" ? (
                    <CatalogTokensCssTab item={item} rawCss={rawCss} isZh={isZh} />
                  ) : (
                    <CatalogGuardrailsTab item={item} rawMd={rawMd} isZh={isZh} />
                  )}
                </div>
              )}
            </div>

            <CatalogRightInspector
              item={item}
              isZh={isZh}
              onCopyMd={() => void copy(rawMd, `Copied ${item.name} DESIGN.md`)}
              onCopyCss={() => void copy(rawCss, `Copied ${item.name} CSS tokens`)}
              onDownloadMd={() => downloadText(`${item.id}-DESIGN.md`, rawMd)}
              onApplySkin={handleApplyToWorkbench}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
