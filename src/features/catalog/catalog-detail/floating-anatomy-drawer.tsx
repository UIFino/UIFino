"use client";

import { useState } from "react";
import { Check, Copy, List } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/primitives/badge";
import type { CatalogBrandSpec, CatalogPageSectionAnatomy } from "@/core/design-md";
import { useClipboard } from "@/hooks/use-clipboard";
import { cn } from "@/lib/cn";

export interface FloatingAnatomyDrawerProps {
  readonly item: CatalogBrandSpec;
  readonly isZh: boolean;
  readonly anatomy: readonly CatalogPageSectionAnatomy[];
  readonly activePagePath: string;
  readonly selectedIdx: number | null;
  readonly scrollActiveIdx: number;
  readonly hoveredIdx: number | null;
  readonly onSelectSection: (idx: number) => void;
  readonly onHoverChange: (idx: number | null) => void;
  readonly onClearSelection: () => void;
}

export function FloatingAnatomyDrawer({
  item,
  isZh,
  anatomy,
  activePagePath,
  selectedIdx,
  scrollActiveIdx,
  hoveredIdx,
  onSelectSection,
  onHoverChange,
  onClearSelection
}: FloatingAnatomyDrawerProps) {
  const t = useTranslations("catalog");
  const { copy } = useClipboard();
  const [open, setOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (anatomy.length === 0) return null;

  const activeTickIdx = selectedIdx ?? scrollActiveIdx;

  const buildSectionPrompt = (sec: CatalogPageSectionAnatomy) => {
    const p = (item.defaultTheme ?? "dark") === "light" ? item.light : item.dark;
    const alt = item.openFontAlt ?? "Inter + JetBrains Mono";
    if (isZh) {
      return `请参考 ${item.name} (${activePagePath}) 的「${sec.index} ${sec.nameZh}」实现对应界面区块：
- 布局结构：${sec.layoutZh}
- 实测规格：${sec.noteZh}
- 配色与圆角：画布 ${p.canvas} · 表面 ${p.surface} · 边框 ${p.border} · 焦点 ${p.accent} · 默认圆角 ${item.defaultRadius}
- 字体栈：${alt}（主标题字距 ${item.fonts.tracking}）`;
    }
    return `Implement section "${sec.index} ${sec.nameEn}" referencing ${item.name} (${activePagePath}):
- Layout: ${sec.layoutEn}
- Spec: ${sec.noteEn}
- Tokens: canvas ${p.canvas}, surface ${p.surface}, border ${p.border}, accent ${p.accent}, radius ${item.defaultRadius}
- Fonts: ${alt} (tracking ${item.fonts.tracking})`;
  };

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        onHoverChange(null);
      }}
      className="pointer-events-auto absolute top-1/2 right-3 z-30 -translate-y-1/2"
    >
      {/* Collapsed Minimal Tick Rail */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("anatomyTitle")}
        className={cn(
          "flex w-[30px] cursor-pointer flex-col items-end gap-2 border border-hairline bg-surface/90 px-1.5 py-2.5 backdrop-blur-md shadow-md transition-opacity duration-150",
          open ? "pointer-events-none opacity-0" : "opacity-100"
        )}
      >
        <List className="mx-auto h-3.5 w-3.5 text-muted" />
        <div className="flex w-full flex-col items-end gap-1.5 py-0.5">
          {anatomy.map((sec, idx) => {
            const isLocked = selectedIdx === idx;
            const isCurrent = activeTickIdx === idx;
            return (
              <span
                key={sec.index}
                className={cn(
                  "block h-[2px] transition-all duration-150",
                  isLocked
                    ? "w-4 bg-[#FF4D4F]"
                    : isCurrent
                      ? "w-3.5 bg-accent-text"
                      : "w-2 bg-subtle/60"
                )}
              />
            );
          })}
        </div>
        <span className="mx-auto font-mono text-[9px] font-semibold text-muted">
          {String(anatomy.length).padStart(2, "0")}
        </span>
      </button>

      {/* Slide-Out Glass Drawer (right-to-left smooth transition on hover) */}
      <div
        className={cn(
          "absolute top-1/2 right-0 w-[304px] max-w-[calc(100vw-48px)] -translate-y-1/2 border border-hairline bg-surface/95 backdrop-blur-md shadow-xl transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          open
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none translate-x-4 opacity-0"
        )}
      >
        <div className="flex items-center justify-between border-b border-hairline px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <span className="eyebrow-mono text-ink">{t("anatomyTitle")}</span>
            <Badge>{activePagePath}</Badge>
          </div>

          {selectedIdx !== null ? (
            <button
              type="button"
              onClick={onClearSelection}
              className="cursor-pointer font-mono text-[11px] text-[#FF4D4F] hover:underline"
            >
              {isZh ? "取消框选" : "Clear"}
            </button>
          ) : null}
        </div>

        <div className="max-h-[440px] divide-y divide-hairline overflow-y-auto">
          {anatomy.map((sec, idx) => {
            const isSelected = selectedIdx === idx;
            const isCurrentScroll = selectedIdx === null && scrollActiveIdx === idx;
            const isHovered = hoveredIdx === idx && !isSelected;
            const copyId = `${activePagePath}-${sec.index}`;

            return (
              <div
                key={sec.index + sec.nameEn}
                onMouseEnter={() => onHoverChange(idx)}
                onMouseLeave={() => onHoverChange(null)}
                onClick={() => onSelectSection(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectSection(idx);
                  }
                }}
                className={cn(
                  "group cursor-pointer border-l-2 px-3.5 py-2.5 text-left transition-colors",
                  isSelected
                    ? "border-l-[#FF4D4F] bg-elevated"
                    : isCurrentScroll
                      ? "border-l-accent-text bg-surface-hover"
                      : isHovered
                        ? "border-l-[#FF4D4F]/60 bg-surface-hover"
                        : "border-l-transparent hover:bg-surface-hover"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-[12.5px] font-semibold text-ink">
                    <span
                      className={cn(
                        "font-mono mr-1.5 text-[11px]",
                        isSelected
                          ? "text-[#FF4D4F]"
                          : isCurrentScroll
                            ? "text-accent-text"
                            : "text-muted"
                      )}
                    >
                      {sec.index}
                    </span>
                    {isZh ? sec.nameZh : sec.nameEn}
                  </span>

                  <div className="flex shrink-0 items-center gap-1.5">
                    <Badge className="h-4 px-1.5 text-[9.5px]">
                      {isZh ? sec.layoutZh : sec.layoutEn}
                    </Badge>
                    <button
                      type="button"
                      title={isZh ? "复制此区块 AI 复刻指令" : "Copy section AI prompt"}
                      aria-label={isZh ? "复制区块复刻指令" : "Copy section prompt"}
                      onClick={(e) => {
                        e.stopPropagation();
                        void copy(
                          buildSectionPrompt(sec),
                          isZh ? `已复制 ${sec.index} 区块复刻指令` : `Copied ${sec.index} prompt`
                        );
                        setCopiedKey(copyId);
                        window.setTimeout(() => {
                          setCopiedKey((prev) => (prev === copyId ? null : prev));
                        }, 1400);
                      }}
                      className="inline-flex h-5 w-5 cursor-pointer items-center justify-center border border-hairline bg-canvas text-muted transition-colors hover:border-accent-border hover:text-ink"
                    >
                      {copiedKey === copyId ? (
                        <Check className="h-3 w-3 text-accent-text" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="mt-1 line-clamp-2 text-[11px] leading-[1.45] text-muted">
                  {isZh ? sec.noteZh : sec.noteEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
