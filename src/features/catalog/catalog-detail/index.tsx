"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/primitives/badge";
import { SegmentedControl } from "@/components/primitives/segmented";
import {
  type CatalogBrandSpec,
  compileBrandDesignMd,
  compileBrandTokensCss
} from "@/core/design-md";
import { useClipboard } from "@/hooks/use-clipboard";
import { useDownload } from "@/hooks/use-download";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { APP_CATALOG_ITEMS, WEBSITE_CATALOG_ITEMS } from "@/registry/catalog";
import { useWorkbenchPresetStore } from "@/stores/workbench-preset.store";
import { CatalogDetailHeader } from "./detail-header";
import { CatalogGuardrailsTab } from "./tab-guardrails";
import { CatalogPagesTab } from "./tab-pages";
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

  const [tab, setTab] = useState<CatalogDetailTab>("pages");

  const rawMd = compileBrandDesignMd(item);
  const rawCss = compileBrandTokensCss(item);

  const handleApplyToWorkbench = () => {
    applyBrandSkin(item.id);
    router.push(`/components/hero/hero-telemetry-counter?skin=${item.id}`);
  };

  return (
    <div className="band-full">
      <div className="shell-wrap grid grid-cols-1 lg:grid-cols-[248px_minmax(0,1fr)]">
        {/* Left Contextual Catalog Rail */}
        <aside className="order-2 border-t border-hairline bg-canvas px-3.5 py-4 lg:sticky lg:top-[var(--header-h)] lg:order-1 lg:h-[calc(100dvh-var(--header-h))] lg:overflow-y-auto lg:border-t-0 lg:border-r">
          <Link
            href="/catalog"
            className="font-mono-ui mb-2.5 flex items-center px-2.5 py-1.5 text-[11.5px] text-muted hover:bg-surface-hover hover:text-ink"
          >
            ← {t("allCatalog")}
          </Link>

          <div className="eyebrow-mono px-2.5 py-1.5">
            {isZh ? "桌面网站" : "WEBSITES"}
          </div>
          {WEBSITE_CATALOG_ITEMS.map((w) => {
            const active = w.id === item.id;
            return (
              <Link
                key={w.id}
                href={`/catalog/${w.id}`}
                className={cn(
                  "flex items-center justify-between gap-2 border-l-2 px-2.5 py-1.5 text-[12.5px] transition-colors",
                  active
                    ? "border-l-accent-text bg-surface font-semibold text-ink"
                    : "border-l-transparent text-muted hover:bg-surface-hover hover:text-ink"
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

          <div className="eyebrow-mono px-2.5 pt-3.5 pb-1.5">
            {isZh ? "移动应用" : "MOBILE APPS"}
          </div>
          {APP_CATALOG_ITEMS.map((a) => {
            const active = a.id === item.id;
            return (
              <Link
                key={a.id}
                href={`/catalog/${a.id}`}
                className={cn(
                  "flex items-center justify-between gap-2 border-l-2 px-2.5 py-1.5 text-[12.5px] transition-colors",
                  active
                    ? "border-l-accent-text bg-surface font-semibold text-ink"
                    : "border-l-transparent text-muted hover:bg-surface-hover hover:text-ink"
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

        {/* Main Brand Spec Content — Centered Readable Blueprint Frame inside Full-Bleed Workspace */}
        <div className="order-1 min-w-0 lg:order-2">
          <div className="detail-center-frame">
            <CatalogDetailHeader
              item={item}
              isZh={isZh}
              onCopyCss={() => void copy(rawCss, `Copied ${item.name} CSS tokens`)}
              onCopyMd={() => void copy(rawMd, `Copied ${item.name} DESIGN.md`)}
              onDownloadMd={() => downloadText(`${item.id}-DESIGN.md`, rawMd)}
              onApplySkin={handleApplyToWorkbench}
            />

            {/* 4 Primary Tabs */}
            <div className="grid gap-5 px-7 py-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4">
                <SegmentedControl
                  options={[
                    { value: "pages" as CatalogDetailTab, label: t("tabPages") },
                    { value: "sections" as CatalogDetailTab, label: t("tabSections") },
                    { value: "tokens" as CatalogDetailTab, label: t("tabTokens") },
                    { value: "guardrails" as CatalogDetailTab, label: t("tabGuardrails") }
                  ]}
                  value={tab}
                  onChange={setTab}
                />

                {item.scraped ? (
                  <span className="font-mono-ui text-xs text-muted">
                    Captured {item.scraped.capturedAt} · {item.scraped.pages.length} pages ·{" "}
                    {item.scraped.sections.length} slices
                  </span>
                ) : null}
              </div>

              {tab === "pages" ? (
                <CatalogPagesTab item={item} isZh={isZh} />
              ) : tab === "sections" ? (
                <CatalogSectionsTab item={item} isZh={isZh} />
              ) : tab === "tokens" ? (
                <CatalogTokensCssTab item={item} rawCss={rawCss} isZh={isZh} />
              ) : (
                <CatalogGuardrailsTab item={item} rawMd={rawMd} isZh={isZh} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
