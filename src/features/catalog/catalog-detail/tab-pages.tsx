"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/primitives/badge";
import { SegmentedControl } from "@/components/primitives/segmented";
import type { CatalogBrandSpec } from "@/core/design-md";
import type { ThemeMode } from "@/core/tokens";
import { cn } from "@/lib/cn";
import { PaletteSpecPanel } from "./palette-spec-panel";

type CaptureViewport = "desktop" | "mobile";

export function CatalogPagesTab({
  item,
  isZh
}: {
  readonly item: CatalogBrandSpec;
  readonly isZh: boolean;
}) {
  const t = useTranslations("catalog");
  const pages = item.scraped?.pages ?? [];

  const [activePageId, setActivePageId] = useState<string>(pages[0]?.id ?? "home");
  const [vp, setVp] = useState<CaptureViewport>("desktop");
  const [fallbackMode, setFallbackMode] = useState<ThemeMode>("dark");

  if (pages.length === 0) {
    return (
      <div className="grid gap-4">
        <div className="flex items-center justify-end">
          <SegmentedControl
            options={[
              { value: "dark" as ThemeMode, label: "Dark" },
              { value: "light" as ThemeMode, label: "Light" }
            ]}
            value={fallbackMode}
            onChange={setFallbackMode}
          />
        </div>
        <PaletteSpecPanel
          item={item}
          modeLabel={fallbackMode === "light" ? "LIGHT" : "DARK"}
          palette={fallbackMode === "light" ? item.light : item.dark}
        />
      </div>
    );
  }

  const currentPage = pages.find((p) => p.id === activePageId) ?? pages[0]!;
  const imgSrc = vp === "mobile" ? currentPage.mobileImg : currentPage.desktopImg;

  return (
    <div className="grid gap-4">
      {/* Subpage & Viewport Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border border-hairline bg-surface px-3.5 py-2.5">
        <div className="flex flex-wrap items-center gap-1.5">
          {pages.map((pg) => {
            const active = pg.id === currentPage.id;
            return (
              <button
                key={pg.id}
                type="button"
                onClick={() => setActivePageId(pg.id)}
                className={cn(
                  "inline-flex h-8 cursor-pointer items-center gap-1.5 border px-3 text-xs font-medium transition-colors",
                  active
                    ? "border-accent-border bg-accent-soft text-accent-text"
                    : "border-hairline bg-canvas text-muted hover:text-ink"
                )}
              >
                <span>{isZh ? pg.titleZh : pg.titleEn}</span>
                <span className="font-mono text-[10.5px] opacity-75">{pg.path}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={currentPage.url}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-muted hover:text-accent-text"
          >
            {currentPage.url} ↗
          </a>
          <SegmentedControl
            options={[
              { value: "desktop" as CaptureViewport, label: t("vpDesktop") },
              { value: "mobile" as CaptureViewport, label: t("vpMobile") }
            ]}
            value={vp}
            onChange={setVp}
          />
        </div>
      </div>

      {/* Left Real Full-Page Screenshot | Right Top-to-Bottom Section Anatomy */}
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="max-h-[760px] overflow-y-auto border border-hairline bg-code p-3">
          <div className={cn("mx-auto", vp === "mobile" ? "max-w-[390px]" : "w-full")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgSrc}
              alt={`${item.name} ${currentPage.path} (${vp})`}
              loading="lazy"
              className="block h-auto w-full border border-hairline"
            />
          </div>
        </div>

        <div className="border border-hairline bg-surface">
          <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
            <span className="eyebrow-mono text-ink">{t("anatomyTitle")}</span>
            <Badge>{currentPage.path}</Badge>
          </div>

          <div className="divide-y divide-hairline">
            {currentPage.anatomy.map((sec) => (
              <div key={sec.index + sec.nameEn} className="px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] font-semibold text-ink">
                    <span className="font-mono-ui mr-2 text-accent-text">{sec.index}</span>
                    {isZh ? sec.nameZh : sec.nameEn}
                  </span>
                  <Badge>{isZh ? sec.layoutZh : sec.layoutEn}</Badge>
                </div>
                <p className="mt-1 text-xs leading-[1.5] text-muted">
                  {isZh ? sec.noteZh : sec.noteEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
