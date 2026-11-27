"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/primitives/badge";
import { SegmentedControl } from "@/components/primitives/segmented";
import type { CatalogBrandSpec } from "@/core/design-md";
import type { ThemeMode } from "@/core/tokens";
import { useClipboard } from "@/hooks/use-clipboard";
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
  const { copy } = useClipboard();
  const pages = item.scraped?.pages ?? [];

  const [activePageId, setActivePageId] = useState<string>(pages[0]?.id ?? "home");
  const [vp, setVp] = useState<CaptureViewport>("desktop");
  const [fallbackMode, setFallbackMode] = useState<ThemeMode>("dark");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const scrollBoxRef = useRef<HTMLDivElement | null>(null);
  const imgBoxRef = useRef<HTMLDivElement | null>(null);
  const rightItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setSelectedIdx(null);
    setHoveredIdx(null);
    if (scrollBoxRef.current) {
      scrollBoxRef.current.scrollTo({ top: 0 });
    }
  }, [activePageId, vp]);

  const currentPage = pages.find((p) => p.id === activePageId) ?? pages[0];

  const scrollImageToSection = useCallback(
    (idx: number) => {
      if (!currentPage) return;
      const sec = currentPage.anatomy[idx];
      const bounds = sec?.bounds ? (vp === "mobile" ? sec.bounds.mobile : sec.bounds.desktop) : undefined;
      const box = scrollBoxRef.current;
      const imgWrap = imgBoxRef.current;
      if (!bounds || !box || !imgWrap) return;

      const imgH = imgWrap.clientHeight;
      const boxH = box.clientHeight;
      if (imgH <= 0) return;

      const secTopPx = (bounds.topPct / 100) * imgH;
      const secHeightPx = (bounds.heightPct / 100) * imgH;
      const comfortOffset = Math.max(20, (boxH - Math.min(secHeightPx, boxH * 0.65)) * 0.3);
      const targetTop = bounds.topPct < 2 ? 0 : Math.max(0, secTopPx - comfortOffset);
      box.scrollTo({ top: targetTop, behavior: "smooth" });
    },
    [currentPage, vp]
  );

  const handleSelectFromRight = (idx: number) => {
    if (selectedIdx === idx) {
      setSelectedIdx(null);
      return;
    }
    setSelectedIdx(idx);
    scrollImageToSection(idx);
  };

  const handleSelectFromImage = (idx: number) => {
    if (selectedIdx === idx) {
      setSelectedIdx(null);
      return;
    }
    setSelectedIdx(idx);
    rightItemRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  if (pages.length === 0 || !currentPage) {
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

  const imgSrc = vp === "mobile" ? currentPage.mobileImg : currentPage.desktopImg;
  const activeSec = selectedIdx !== null ? currentPage.anatomy[selectedIdx] : undefined;
  const activeBounds = activeSec?.bounds
    ? vp === "mobile"
      ? activeSec.bounds.mobile
      : activeSec.bounds.desktop
    : undefined;

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

      {/* Left Real Full-Page Screenshot with Interactive Red Bounds | Right Clickable Section Anatomy */}
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div
          ref={scrollBoxRef}
          className="relative max-h-[840px] overflow-y-auto border border-hairline bg-code p-4"
        >
          <div
            ref={imgBoxRef}
            className={cn(
              "relative mx-auto overflow-hidden border border-hairline",
              vp === "mobile" ? "max-w-[390px]" : "w-full"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgSrc}
              alt={`${item.name} ${currentPage.path} (${vp})`}
              className="block h-auto w-full select-none"
            />

            {/* Spotlight Dimming Curtain Above & Below Selected Section */}
            {activeBounds ? (
              <>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-black/50 transition-all duration-200"
                  style={{ height: `${activeBounds.topPct}%` }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-black/50 transition-all duration-200"
                  style={{
                    top: `${Math.min(100, activeBounds.topPct + activeBounds.heightPct)}%`
                  }}
                />
              </>
            ) : null}

            {/* Interactive Transparent Section Hotspots on Image */}
            {currentPage.anatomy.map((sec, idx) => {
              const b = sec.bounds ? (vp === "mobile" ? sec.bounds.mobile : sec.bounds.desktop) : undefined;
              if (!b) return null;
              const isHovered = hoveredIdx === idx && selectedIdx !== idx;
              return (
                <button
                  key={`${currentPage.id}-hotspot-${sec.index}`}
                  type="button"
                  aria-label={`${sec.index} ${isZh ? sec.nameZh : sec.nameEn}`}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx((prev) => (prev === idx ? null : prev))}
                  onClick={() => handleSelectFromImage(idx)}
                  className={cn(
                    "absolute inset-x-0 z-10 cursor-pointer border-0 bg-transparent transition-colors",
                    isHovered && "border border-dashed border-[#FF4D4F]/75 bg-[#FF4D4F]/[0.06]"
                  )}
                  style={{
                    top: `${b.topPct}%`,
                    height: `${b.heightPct}%`
                  }}
                />
              );
            })}

            {/* Crisp 2px Red Calibration Frame & Label Badge */}
            {activeSec && activeBounds ? (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 z-20 border-2 border-[#FF4D4F] shadow-[0_0_0_1px_rgba(255,77,79,0.28)] transition-all duration-200"
                style={{
                  top: `${activeBounds.topPct}%`,
                  height: `${activeBounds.heightPct}%`
                }}
              >
                <span className="font-mono-ui absolute top-1.5 left-1.5 inline-flex items-center gap-1.5 bg-[#FF4D4F] px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
                  <span>{activeSec.index}</span>
                  <span>{isZh ? activeSec.nameZh : activeSec.nameEn}</span>
                </span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Right Interactive Section Anatomy List */}
        <div className="border border-hairline bg-surface">
          <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
            <span className="eyebrow-mono text-ink">{t("anatomyTitle")}</span>
            <div className="flex items-center gap-2">
              {selectedIdx !== null ? (
                <button
                  type="button"
                  onClick={() => setSelectedIdx(null)}
                  className="font-mono-ui cursor-pointer text-[11px] text-[#FF4D4F] hover:underline"
                >
                  {isZh ? "清除框选" : "Clear"}
                </button>
              ) : null}
              <Badge>{currentPage.path}</Badge>
            </div>
          </div>

          <div className="divide-y divide-hairline">
            {currentPage.anatomy.map((sec, idx) => {
              const isSelected = selectedIdx === idx;
              const isHovered = hoveredIdx === idx && !isSelected;
              const copyId = `${currentPage.id}-${sec.index}`;
              const copyPayload = isZh
                ? `${sec.index} ${sec.nameZh}（${sec.layoutZh}）：${sec.noteZh}`
                : `${sec.index} ${sec.nameEn} (${sec.layoutEn}): ${sec.noteEn}`;

              return (
                <div
                  key={sec.index + sec.nameEn}
                  ref={(el) => {
                    rightItemRefs.current[idx] = el;
                  }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx((prev) => (prev === idx ? null : prev))}
                  onClick={() => handleSelectFromRight(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelectFromRight(idx);
                    }
                  }}
                  className={cn(
                    "group cursor-pointer border-l-2 px-4 py-3 text-left transition-colors",
                    isSelected
                      ? "border-l-[#FF4D4F] bg-elevated"
                      : isHovered
                        ? "border-l-[#FF4D4F]/50 bg-surface-hover"
                        : "border-l-transparent hover:bg-surface-hover"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[13px] font-semibold text-ink">
                      <span
                        className={cn(
                          "font-mono-ui mr-2",
                          isSelected ? "text-[#FF4D4F]" : "text-accent-text"
                        )}
                      >
                        {sec.index}
                      </span>
                      {isZh ? sec.nameZh : sec.nameEn}
                    </span>

                    <div className="flex shrink-0 items-center gap-1.5">
                      <Badge>{isZh ? sec.layoutZh : sec.layoutEn}</Badge>
                      <button
                        type="button"
                        aria-label={isZh ? "复制当前区块描述" : "Copy section note"}
                        title={isZh ? "复制当前区块原语" : "Copy primitive"}
                        onClick={(e) => {
                          e.stopPropagation();
                          void copy(copyPayload, `${sec.index} ${isZh ? sec.nameZh : sec.nameEn}`);
                          setCopiedKey(copyId);
                          window.setTimeout(() => {
                            setCopiedKey((prev) => (prev === copyId ? null : prev));
                          }, 1400);
                        }}
                        className="inline-flex h-6 w-6 cursor-pointer items-center justify-center border border-hairline bg-canvas text-muted transition-colors hover:border-accent-border hover:text-ink"
                      >
                        {copiedKey === copyId ? (
                          <Check className="h-3 w-3 text-accent-text" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="mt-1.5 text-xs leading-[1.52] text-muted">
                    {isZh ? sec.noteZh : sec.noteEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
