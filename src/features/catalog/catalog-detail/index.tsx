"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/primitives/badge";
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
import { APP_CATALOG_ITEMS, WEBSITE_CATALOG_ITEMS } from "@/registry/catalog";
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
  const [blueprintMode, setBlueprintMode] = useState<ThemeMode>("dark");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [scrollTrigger, setScrollTrigger] = useState(0);

  useEffect(() => {
    setActivePageId(pageTabs[0]?.id ?? "home");
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

  const viewTabs: readonly { readonly id: CatalogDetailTab; readonly label: string }[] = [
    { id: "pages", label: t("tabPages") },
    { id: "sections", label: t("tabSections") },
    { id: "tokens", label: t("tabTokens") },
    { id: "guardrails", label: t("tabGuardrails") }
  ];

  return (
    <div className="band-full">
      <div className="shell-wrap grid grid-cols-1 lg:grid-cols-[196px_minmax(0,1fr)]">
        {/* Left Narrow Brand Switcher Rail */}
        <aside className="order-2 border-t border-hairline bg-canvas px-2.5 py-3 lg:sticky lg:top-[var(--header-h)] lg:order-1 lg:h-[calc(100dvh-var(--header-h))] lg:overflow-y-auto lg:border-t-0 lg:border-r">
          <Link
            href="/catalog"
            className="font-mono-ui mb-2 flex items-center px-2 py-1.5 text-[11px] text-muted hover:bg-surface-hover hover:text-ink"
          >
            ← {t("allCatalog")}
          </Link>

          <div className="eyebrow-mono px-2 py-1.5">
            {isZh ? "桌面网站" : "WEBSITES"}
          </div>
          {WEBSITE_CATALOG_ITEMS.map((w) => {
            const active = w.id === item.id;
            return (
              <Link
                key={w.id}
                href={`/catalog/${w.id}`}
                className={cn(
                  "flex items-center justify-between gap-2 px-2 py-1.5 text-[12px] transition-colors",
                  active
                    ? "bg-elevated font-semibold text-ink"
                    : "text-muted hover:bg-surface-hover hover:text-ink"
                )}
              >
                <span className="truncate">{w.name}</span>
                <span className="flex items-center gap-1.5">
                  {w.scraped ? (
                    <Badge variant="accent" className="h-4 px-1 text-[9px]">
                      LIVE
                    </Badge>
                  ) : null}
                  <span
                    className="inline-block h-2 w-2 shrink-0"
                    style={{ backgroundColor: w.dark.accent }}
                  />
                </span>
              </Link>
            );
          })}

          <div className="eyebrow-mono px-2 pt-3 pb-1.5">
            {isZh ? "移动应用" : "APPS"}
          </div>
          {APP_CATALOG_ITEMS.map((a) => {
            const active = a.id === item.id;
            return (
              <Link
                key={a.id}
                href={`/catalog/${a.id}`}
                className={cn(
                  "flex items-center justify-between gap-2 px-2 py-1.5 text-[12px] transition-colors",
                  active
                    ? "bg-elevated font-semibold text-ink"
                    : "text-muted hover:bg-surface-hover hover:text-ink"
                )}
              >
                <span className="truncate">{a.name}</span>
                <span
                  className="inline-block h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: a.dark.accent }}
                />
              </Link>
            );
          })}
        </aside>

        {/* Center + Right Workspace */}
        <div className="order-1 min-w-0 lg:order-2">
          {/* Top 44px Minimal Borderless Tab Bar (inspired by getdesign.md) */}
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

            {tab === "pages" ? (
              <div className="flex items-center gap-2">
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
                  options={[
                    { value: "desktop" as CaptureViewport, label: t("vpDesktop") },
                    { value: "mobile" as CaptureViewport, label: t("vpMobile") }
                  ]}
                  value={vp}
                  onChange={setVp}
                />
              </div>
            ) : null}
          </div>

          {/* 100% Edge-to-Edge Visual Stage + Concise Sticky Inspector */}
          <div className="grid grid-cols-1 items-start xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0">
              {tab === "pages" ? (
                <CatalogPagesTab
                  item={item}
                  isZh={isZh}
                  currentPage={currentScrapedPage}
                  activePageId={activePageId}
                  vp={vp}
                  blueprintMode={blueprintMode}
                  selectedIdx={selectedIdx}
                  hoveredIdx={hoveredIdx}
                  scrollTrigger={scrollTrigger}
                  onSelectFromImage={handleSelectSection}
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
              anatomy={activeAnatomy}
              activePagePath={activePagePath}
              showAnatomy={tab === "pages"}
              selectedIdx={selectedIdx}
              hoveredIdx={hoveredIdx}
              onSelectSection={handleSelectSection}
              onHoverChange={setHoveredIdx}
              onClearSelection={() => setSelectedIdx(null)}
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
