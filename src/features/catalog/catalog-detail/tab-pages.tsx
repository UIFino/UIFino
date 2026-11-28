"use client";

import { useEffect, useRef, useState } from "react";
import type {
  CatalogBrandSpec,
  CatalogPageCapture,
  CatalogPageSectionAnatomy
} from "@/core/design-md";
import type { ThemeMode } from "@/core/tokens";
import { cn } from "@/lib/cn";
import { CatalogBlueprintPages } from "./blueprint-preview";
import { FloatingAnatomyDrawer } from "./floating-anatomy-drawer";

export type CaptureViewport = "desktop" | "mobile";

export interface CatalogPagesTabProps {
  readonly item: CatalogBrandSpec;
  readonly isZh: boolean;
  readonly currentPage: CatalogPageCapture | undefined;
  readonly activePageId: string;
  readonly activePagePath: string;
  readonly anatomy: readonly CatalogPageSectionAnatomy[];
  readonly vp: CaptureViewport;
  readonly blueprintMode: ThemeMode;
  readonly selectedIdx: number | null;
  readonly hoveredIdx: number | null;
  readonly scrollTrigger: number;
  readonly onSelectSection: (idx: number) => void;
  readonly onClearSelection: () => void;
  readonly onHoverChange: (idx: number | null) => void;
}

export function CatalogPagesTab({
  item,
  isZh,
  currentPage,
  activePageId,
  activePagePath,
  anatomy,
  vp,
  blueprintMode,
  selectedIdx,
  hoveredIdx,
  scrollTrigger,
  onSelectSection,
  onClearSelection,
  onHoverChange
}: CatalogPagesTabProps) {
  const scrollBoxRef = useRef<HTMLDivElement | null>(null);
  const imgBoxRef = useRef<HTMLDivElement | null>(null);
  const [scrollActiveIdx, setScrollActiveIdx] = useState(0);

  useEffect(() => {
    setScrollActiveIdx(0);
    if (scrollBoxRef.current) {
      scrollBoxRef.current.scrollTo({ top: 0 });
    }
  }, [activePageId, vp]);

  useEffect(() => {
    if (selectedIdx === null || !currentPage) return;
    const sec = currentPage.anatomy[selectedIdx];
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
  }, [selectedIdx, scrollTrigger, currentPage, vp]);

  const handleStageScroll = () => {
    if (!currentPage || !scrollBoxRef.current || !imgBoxRef.current) return;
    const box = scrollBoxRef.current;
    const imgH = imgBoxRef.current.clientHeight;
    if (imgH <= 0) return;
    const focusPct = ((box.scrollTop + box.clientHeight * 0.3) / imgH) * 100;
    const idx = currentPage.anatomy.findIndex((sec) => {
      const b = sec.bounds ? (vp === "mobile" ? sec.bounds.mobile : sec.bounds.desktop) : undefined;
      return b ? focusPct >= b.topPct && focusPct <= b.topPct + b.heightPct : false;
    });
    if (idx >= 0) {
      setScrollActiveIdx(idx);
    }
  };

  if (!currentPage) {
    return (
      <div className="relative">
        <div
          className={cn(
            "max-h-[calc(100dvh-var(--header-h)-44px)] overflow-y-auto",
            vp === "mobile" || item.kind === "app" ? "bg-code/50 px-4" : "p-0"
          )}
        >
          <CatalogBlueprintPages
            item={item}
            pageId={activePageId}
            vp={vp}
            mode={blueprintMode}
            selectedIdx={selectedIdx}
            hoveredIdx={hoveredIdx}
            onSelectSection={onSelectSection}
            onHoverChange={onHoverChange}
          />
        </div>

        <FloatingAnatomyDrawer
          item={item}
          isZh={isZh}
          anatomy={anatomy}
          activePagePath={activePagePath}
          selectedIdx={selectedIdx}
          scrollActiveIdx={scrollActiveIdx}
          hoveredIdx={hoveredIdx}
          onSelectSection={onSelectSection}
          onHoverChange={onHoverChange}
          onClearSelection={onClearSelection}
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
    <div className="relative">
      <div
        ref={scrollBoxRef}
        onScroll={handleStageScroll}
        className={cn(
          "relative max-h-[calc(100dvh-var(--header-h)-44px)] overflow-y-auto",
          vp === "mobile" ? "bg-code/50 px-4 py-5" : "p-0"
        )}
      >
        <div
          ref={imgBoxRef}
          className={cn(
            "relative mx-auto overflow-hidden",
            vp === "mobile" ? "max-w-[390px] border border-hairline" : "w-full"
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
                onMouseEnter={() => onHoverChange(idx)}
                onMouseLeave={() => onHoverChange(null)}
                onClick={() => onSelectSection(idx)}
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

      {/* Right-Edge Hover Slide-Out Section Directory */}
      <FloatingAnatomyDrawer
        item={item}
        isZh={isZh}
        anatomy={anatomy}
        activePagePath={activePagePath}
        selectedIdx={selectedIdx}
        scrollActiveIdx={scrollActiveIdx}
        hoveredIdx={hoveredIdx}
        onSelectSection={onSelectSection}
        onHoverChange={onHoverChange}
        onClearSelection={onClearSelection}
      />
    </div>
  );
}
