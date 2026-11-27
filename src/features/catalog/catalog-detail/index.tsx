"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CodeViewer } from "@/components/patterns/code-viewer";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { SegmentedControl } from "@/components/primitives/segmented";
import { type CatalogBrandSpec, compileBrandDesignMd } from "@/core/design-md";
import type { ThemeMode } from "@/core/tokens";
import { useClipboard } from "@/hooks/use-clipboard";
import { useDownload } from "@/hooks/use-download";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { APP_CATALOG_ITEMS, WEBSITE_CATALOG_ITEMS } from "@/registry/catalog";
import { useWorkbenchPresetStore } from "@/stores/workbench-preset.store";
import { PaletteSpecPanel } from "./palette-spec-panel";

type DetailTab = "spec" | "compare" | "md";

export function CatalogDetailView({ item }: { readonly item: CatalogBrandSpec }) {
  const t = useTranslations("catalog");
  const locale = useLocale();
  const isZh = locale === "zh";
  const router = useRouter();
  const { copy } = useClipboard();
  const { downloadText } = useDownload();
  const applyBrandSkin = useWorkbenchPresetStore((s) => s.applyBrandSkin);

  const [tab, setTab] = useState<DetailTab>("spec");
  const [mode, setMode] = useState<ThemeMode>("dark");

  const cliCmd = `npx uifino@latest add design/${item.id}`;
  const rawMd = compileBrandDesignMd(item);

  const handleApplyToWorkbench = () => {
    applyBrandSkin(item.id);
    router.push(`/components/hero/hero-telemetry-counter?skin=${item.id}`);
  };

  return (
    <div className="band-full">
      <div className="shell-wrap grid grid-cols-1 lg:grid-cols-[232px_minmax(0,1fr)]">
        {/* Left Contextual Catalog Rail */}
        <aside className="order-2 border-t border-hairline bg-canvas px-2.5 py-4 lg:sticky lg:top-[var(--header-h)] lg:order-1 lg:h-[calc(100dvh-var(--header-h))] lg:overflow-y-auto lg:border-t-0 lg:border-r">
          <Link
            href="/catalog"
            className="font-mono-ui mb-2.5 flex items-center px-2.5 py-1.5 text-[11.5px] text-muted hover:bg-surface-hover hover:text-ink"
          >
            ← {t("allCatalog")}
          </Link>

          <div className="eyebrow-mono px-2.5 py-1.5">WEBSITES</div>
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
                <span
                  className="inline-block h-2 w-2 shrink-0"
                  style={{ backgroundColor: w.dark.accent }}
                />
              </Link>
            );
          })}

          <div className="eyebrow-mono px-2.5 pt-3.5 pb-1.5">MOBILE APPS</div>
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

        {/* Main Brand Spec Content */}
        <div className="order-1 min-w-0 lg:order-2">
          <div className="border-b border-hairline px-7 pt-7 pb-6">
            <nav className="font-mono-ui flex flex-wrap items-center gap-1.5 text-xs text-muted">
              <Link href="/catalog" className="hover:text-ink">
                Catalog
              </Link>
              <span>/</span>
              <span>{item.category}</span>
              <span>/</span>
              <span className="text-ink">{item.name} DESIGN.md</span>
            </nav>

            <div className="mt-2.5 flex flex-wrap items-center gap-3">
              <h1 className="font-mono-ui m-0 text-[clamp(24px,2.6vw,32px)] font-semibold tracking-[-0.02em]">
                {item.name} DESIGN.md
              </h1>
              <Badge>{item.platformLabel}</Badge>
            </div>

            <p className="mt-3 max-w-[820px] text-[15.5px] leading-[1.6] text-body">
              {isZh ? item.summaryZh : item.summaryEn}
            </p>
          </div>

          {/* Usage & Actions Split */}
          <div className="grid grid-cols-1 items-start gap-5 border-b border-hairline px-7 py-6 md:grid-cols-2">
            <div>
              <h2 className="heading-section mb-3">Usage</h2>
              <div className="border border-hairline bg-surface p-[18px]">
                <div className="flex items-center justify-between gap-2.5 border border-hairline bg-code px-3.5 py-[11px] font-mono text-[13.5px]">
                  <span className="truncate">{cliCmd}</span>
                  <button
                    type="button"
                    onClick={() => void copy(cliCmd, "Copied CLI command")}
                    className="shrink-0 cursor-pointer"
                  >
                    <Badge className="text-ink hover:border-accent-border">Copy</Badge>
                  </button>
                </div>
                <div className="mt-2.5 text-[13px] text-muted">{t("usageHint")}</div>
              </div>
            </div>

            <div className="grid gap-2 md:pt-8">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex h-11 items-center justify-between border border-hairline bg-surface px-3.5">
                  <span className="eyebrow-mono">INSTALLS</span>
                  <span className="font-mono-ui text-[14.5px] font-bold text-accent-text">
                    {item.installs}
                  </span>
                </div>
                <div className="flex h-11 items-center justify-between border border-hairline bg-surface px-3.5">
                  <span className="eyebrow-mono">SAVED</span>
                  <span className="font-mono-ui text-[14.5px] font-bold text-accent-text">
                    {item.bookmarks}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="hairline"
                  size="lg"
                  onClick={() => void copy(rawMd, `Copied ${item.name} DESIGN.md`)}
                >
                  Copy DESIGN.md
                </Button>
                <Button
                  variant="hairline"
                  size="lg"
                  onClick={() => downloadText(`${item.id}-DESIGN.md`, rawMd)}
                >
                  Download .md
                </Button>
              </div>

              <Button
                variant="lime"
                size="lg"
                onClick={handleApplyToWorkbench}
                className="h-11 w-full"
              >
                {t("applyInWorkbench", { name: item.name })}
              </Button>
            </div>
          </div>

          {/* Breakdown & Protocol Viewer */}
          <div className="grid gap-5 px-7 py-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="heading-section">Preview &amp; Token Breakdown</h2>
              <div className="flex flex-wrap gap-2">
                <SegmentedControl
                  options={[
                    { value: "spec" as DetailTab, label: "Live Preview" },
                    { value: "compare" as DetailTab, label: "Light vs Dark" },
                    { value: "md" as DetailTab, label: "DESIGN.md" }
                  ]}
                  value={tab}
                  onChange={setTab}
                />
                {tab === "spec" ? (
                  <SegmentedControl
                    options={[
                      { value: "dark" as ThemeMode, label: "Dark" },
                      { value: "light" as ThemeMode, label: "Light" }
                    ]}
                    value={mode}
                    onChange={setMode}
                  />
                ) : null}
              </div>
            </div>

            {tab === "md" ? (
              <CodeViewer
                code={rawMd}
                lang="markdown"
                title={`${item.slug}/DESIGN.md`}
                copyLabel="Copy Protocol"
              />
            ) : tab === "compare" ? (
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <PaletteSpecPanel item={item} modeLabel="DARK" palette={item.dark} />
                <PaletteSpecPanel item={item} modeLabel="LIGHT" palette={item.light} />
              </div>
            ) : (
              <PaletteSpecPanel
                item={item}
                modeLabel={mode === "light" ? "LIGHT" : "DARK"}
                palette={mode === "light" ? item.light : item.dark}
              />
            )}

            {/* 03 Typography + 04 Radius & Spacing */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="border border-hairline bg-surface p-[18px]">
                <div className="eyebrow-mono">03 — TYPOGRAPHY SYSTEM</div>
                <div className="mt-3.5 grid gap-3">
                  <div className="border-b border-hairline pb-3">
                    <div className="font-mono-ui text-[11px] text-subtle">
                      Display · {item.fonts.display} · tracking {item.fonts.tracking}
                    </div>
                    <div
                      className="mt-1 text-[26px] font-semibold"
                      style={{
                        fontFamily: item.fonts.serif ? "var(--font-serif)" : "var(--font-sans)",
                        letterSpacing: item.fonts.tracking
                      }}
                    >
                      Crafted interface hierarchy
                    </div>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-muted">Body Font</span>
                    <span className="font-mono-ui">{item.fonts.body} (15px / 1.55)</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-muted">Monospace</span>
                    <span className="font-mono-ui">{item.fonts.mono} (tabular-nums)</span>
                  </div>
                </div>
              </div>

              <div className="border border-hairline bg-surface p-[18px]">
                <div className="eyebrow-mono">04 — RADIUS &amp; SPACING LADDER</div>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {item.radiusScale.map((r) => (
                    <div
                      key={r}
                      className={cn(
                        "border bg-code px-2.5 py-2 font-mono text-[11px]",
                        r === item.defaultRadius ? "border-accent-border" : "border-hairline"
                      )}
                      style={{ borderRadius: r }}
                    >
                      {r}
                    </div>
                  ))}
                </div>
                <div className="mt-3.5 grid gap-[5px]">
                  {item.spacingScale.slice(0, 6).map((px) => (
                    <div
                      key={px}
                      className="flex items-center gap-2.5 font-mono text-[11px]"
                    >
                      <span className="w-9 text-muted">{px}px</span>
                      <span
                        className="h-2 max-w-[220px] bg-accent-fill opacity-80"
                        style={{ width: `${Math.min(100, px * 2.2)}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
