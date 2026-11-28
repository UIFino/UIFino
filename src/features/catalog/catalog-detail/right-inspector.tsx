"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import type { CatalogBrandSpec, CatalogPageSectionAnatomy } from "@/core/design-md";
import { useClipboard } from "@/hooks/use-clipboard";
import { cn } from "@/lib/cn";
import { CATALOG_CATEGORY_LABELS } from "@/registry/catalog";

export interface CatalogRightInspectorProps {
  readonly item: CatalogBrandSpec;
  readonly isZh: boolean;
  readonly anatomy: readonly CatalogPageSectionAnatomy[];
  readonly activePagePath: string;
  readonly showAnatomy: boolean;
  readonly selectedIdx: number | null;
  readonly hoveredIdx: number | null;
  readonly onSelectSection: (idx: number) => void;
  readonly onHoverChange: (idx: number | null) => void;
  readonly onClearSelection: () => void;
  readonly onCopyMd: () => void;
  readonly onCopyCss: () => void;
  readonly onDownloadMd: () => void;
  readonly onApplySkin: () => void;
}

export function CatalogRightInspector({
  item,
  isZh,
  anatomy,
  activePagePath,
  showAnatomy,
  selectedIdx,
  hoveredIdx,
  onSelectSection,
  onHoverChange,
  onClearSelection,
  onCopyMd,
  onCopyCss,
  onDownloadMd,
  onApplySkin
}: CatalogRightInspectorProps) {
  const t = useTranslations("catalog");
  const { copy } = useClipboard();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const siteHref =
    item.siteUrl ?? (item.kind === "website" ? `https://${item.slug}` : undefined);
  const catLabel = isZh
    ? CATALOG_CATEGORY_LABELS[item.category].zh
    : CATALOG_CATEGORY_LABELS[item.category].en;

  const goodFor = isZh
    ? (item.goodForZh ??
      (item.kind === "app"
        ? ["工具应用", "状态卡片"]
        : ["产品官网", "定价页", "登录页"]))
    : (item.goodForEn ??
      (item.kind === "app"
        ? ["Utility Apps", "Status Cards"]
        : ["Marketing", "Pricing", "Auth"]));

  const notFor = isZh
    ? (item.notForZh ?? ["大促电商", "密集资讯门户"])
    : (item.notForEn ?? ["Flash Sales", "Tabloid Portals"]);

  const swatches = [
    ["Canvas", item.dark.canvas],
    ["Surface", item.dark.surface],
    ["Elevated", item.dark.elevated],
    ["Border", item.dark.border],
    ["Ink", item.dark.ink],
    ["Muted", item.dark.muted],
    ["Accent", item.dark.accent]
  ] as const;

  return (
    <aside className="border-t border-hairline bg-surface/40 xl:sticky xl:top-[calc(var(--header-h)+44px)] xl:h-[calc(100dvh-var(--header-h)-44px)] xl:overflow-y-auto xl:border-t-0 xl:border-l">
      {/* Region 1: Brand Title + Primary Delivery Actions */}
      <div className="grid gap-3 border-b border-hairline p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="m-0 text-lg font-semibold tracking-tight text-ink">
                {item.name}
              </h1>
              <Badge>{catLabel}</Badge>
            </div>
            <div className="mt-1 font-mono text-[11px] text-muted">
              {item.kind === "app" ? (isZh ? "移动应用" : "App") : isZh ? "桌面网站" : "Website"} ·{" "}
              {item.slug}
            </div>
          </div>

          {siteHref ? (
            <a
              href={siteHref}
              target="_blank"
              rel="noreferrer"
              title={t("visitSite")}
              className="inline-flex h-7 w-7 items-center justify-center border border-hairline bg-canvas text-muted transition-colors hover:border-accent-border hover:text-ink"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>

        <Button variant="lime" size="md" className="w-full justify-between" onClick={onCopyMd}>
          <span>{t("copyMd")}</span>
          <span className="font-mono text-[11px] opacity-80">→</span>
        </Button>

        <div className="grid grid-cols-3 gap-1.5">
          <Button variant="hairline" size="xs" className="h-8" onClick={onCopyCss}>
            {t("copyCss")}
          </Button>
          <Button variant="hairline" size="xs" className="h-8" onClick={onDownloadMd}>
            {t("downloadMd")}
          </Button>
          <Button variant="contrast" size="xs" className="h-8" onClick={onApplySkin}>
            {t("applyInWorkbench")}
          </Button>
        </div>
      </div>

      {/* Region 2: Concise Overview + Fit Lines */}
      <div className="grid gap-2.5 border-b border-hairline p-4">
        <p className="m-0 text-[12.5px] leading-[1.55] text-body">
          {isZh ? item.summaryZh : item.summaryEn}
        </p>

        <div className="grid gap-1 text-[11.5px]">
          <div className="flex items-baseline gap-2">
            <span className="font-mono shrink-0 font-semibold text-accent-text">
              {t("goodForLabel")}
            </span>
            <span className="text-ink">{goodFor.join(" · ")}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono shrink-0 font-semibold text-subtle">
              {t("notForLabel")}
            </span>
            <span className="text-muted">{notFor.join(" · ")}</span>
          </div>
        </div>
      </div>

      {/* Region 3: Seamless Color Strip + Key Tokens */}
      <div className="grid gap-3 border-b border-hairline p-4">
        <div className="flex items-center justify-between">
          <span className="eyebrow-mono">DESIGN TOKENS</span>
          <span className="font-mono text-[10px] text-subtle">
            {isZh ? "点击色块复制" : "Click swatch"}
          </span>
        </div>

        <div className="grid grid-cols-7 border border-hairline bg-canvas">
          {swatches.map(([label, hex]) => (
            <button
              key={label}
              type="button"
              title={`${label}: ${hex}`}
              onClick={() => void copy(hex, `Copied ${label}: ${hex}`)}
              className="group flex cursor-pointer flex-col items-center gap-1 pb-1 transition-opacity hover:opacity-85"
            >
              <span className="block h-6 w-full" style={{ backgroundColor: hex }} />
              <span className="w-full truncate text-center font-mono text-[8.5px] text-muted group-hover:text-ink">
                {hex.replace("#", "")}
              </span>
            </button>
          ))}
        </div>

        <div className="grid gap-1.5 pt-0.5 font-mono text-[11px] text-muted">
          <div className="flex items-center justify-between gap-2">
            <span>{isZh ? "原站字体" : "Font"}</span>
            <span className="truncate text-ink">{item.fonts.display}</span>
          </div>
          {item.openFontAlt ? (
            <div className="flex items-center justify-between gap-2">
              <span>{isZh ? "开源平替" : "Open Alt"}</span>
              <span className="truncate text-accent-text">{item.openFontAlt}</span>
            </div>
          ) : null}
          <div className="flex items-center justify-between gap-2">
            <span>{isZh ? "默认圆角" : "Radius"}</span>
            <span className="text-ink">{item.defaultRadius}</span>
          </div>
        </div>
      </div>

      {/* Region 4: Section Anatomy Index */}
      {showAnatomy && anatomy.length > 0 ? (
        <div className="grid">
          <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
            <span className="eyebrow-mono text-ink">{t("anatomyTitle")}</span>
            <div className="flex items-center gap-2">
              {selectedIdx !== null ? (
                <button
                  type="button"
                  onClick={onClearSelection}
                  className="cursor-pointer font-mono text-[11px] text-[#FF4D4F] hover:underline"
                >
                  {isZh ? "取消框选" : "Clear"}
                </button>
              ) : null}
              <Badge>{activePagePath}</Badge>
            </div>
          </div>

          <div className="divide-y divide-hairline">
            {anatomy.map((sec, idx) => {
              const isSelected = selectedIdx === idx;
              const isHovered = hoveredIdx === idx && !isSelected;
              const copyId = `${activePagePath}-${sec.index}`;
              const copyPayload = isZh
                ? `${sec.index} ${sec.nameZh}（${sec.layoutZh}）：${sec.noteZh}`
                : `${sec.index} ${sec.nameEn} (${sec.layoutEn}): ${sec.noteEn}`;

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
                    "group cursor-pointer border-l-2 px-4 py-2.5 text-left transition-colors",
                    isSelected
                      ? "border-l-[#FF4D4F] bg-elevated"
                      : isHovered
                        ? "border-l-[#FF4D4F]/50 bg-surface-hover"
                        : "border-l-transparent hover:bg-surface-hover"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[12.5px] font-medium text-ink">
                      <span
                        className={cn(
                          "font-mono mr-2 text-[11px]",
                          isSelected ? "text-[#FF4D4F]" : "text-accent-text"
                        )}
                      >
                        {sec.index}
                      </span>
                      {isZh ? sec.nameZh : sec.nameEn}
                    </span>

                    <div className="flex shrink-0 items-center gap-1">
                      <span className="font-mono text-[10px] text-subtle">
                        {isZh ? sec.layoutZh : sec.layoutEn}
                      </span>
                      <button
                        type="button"
                        aria-label="Copy primitive"
                        onClick={(e) => {
                          e.stopPropagation();
                          void copy(copyPayload, `${sec.index} ${isZh ? sec.nameZh : sec.nameEn}`);
                          setCopiedKey(copyId);
                          window.setTimeout(() => {
                            setCopiedKey((prev) => (prev === copyId ? null : prev));
                          }, 1400);
                        }}
                        className="inline-flex h-5 w-5 cursor-pointer items-center justify-center text-muted opacity-0 transition-opacity group-hover:opacity-100 hover:text-ink"
                      >
                        {copiedKey === copyId ? (
                          <Check className="h-3 w-3 text-accent-text" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                  </div>

                  {isSelected ? (
                    <p className="mt-1.5 text-[11.5px] leading-[1.48] text-muted">
                      {isZh ? sec.noteZh : sec.noteEn}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </aside>
  );
}
