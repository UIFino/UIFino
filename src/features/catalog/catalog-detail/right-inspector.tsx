"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { SegmentedControl } from "@/components/primitives/segmented";
import type { CatalogBrandSpec } from "@/core/design-md";
import type { ThemeMode } from "@/core/tokens";
import { useClipboard } from "@/hooks/use-clipboard";
import { BrandLogoMark, CATALOG_CATEGORY_LABELS } from "@/registry/catalog";

export interface CatalogRightInspectorProps {
  readonly item: CatalogBrandSpec;
  readonly isZh: boolean;
  readonly onCopyMd: () => void;
  readonly onCopyCss: () => void;
  readonly onDownloadMd: () => void;
  readonly onApplySkin: () => void;
}

export function CatalogRightInspector({
  item,
  isZh,
  onCopyMd,
  onCopyCss,
  onDownloadMd,
  onApplySkin
}: CatalogRightInspectorProps) {
  const t = useTranslations("catalog");
  const { copy } = useClipboard();

  const [paletteMode, setPaletteMode] = useState<ThemeMode>(item.defaultTheme ?? "dark");

  useEffect(() => {
    setPaletteMode(item.defaultTheme ?? "dark");
  }, [item.id, item.defaultTheme]);

  const activePalette = paletteMode === "light" ? item.light : item.dark;
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
    [isZh ? "画布" : "Bg", activePalette.canvas],
    [isZh ? "卡片" : "Card", activePalette.surface],
    [isZh ? "浮层" : "Elev", activePalette.elevated],
    [isZh ? "描边" : "Line", activePalette.border],
    [isZh ? "主字" : "Ink", activePalette.ink],
    [isZh ? "次字" : "Muted", activePalette.muted],
    [isZh ? "焦点" : "Accent", activePalette.accent]
  ] as const;

  const openAlt = item.openFontAlt ?? "Inter + JetBrains Mono";
  const displayFontLine =
    item.fonts.body && item.fonts.body !== item.fonts.display
      ? `${item.fonts.display} / ${item.fonts.body}`
      : item.fonts.display;

  const openAltCss = `/* ${item.name} Free Open-Source Font Stack */\n--font-sans: "${openAlt.split("+")[0]?.trim() || "Inter"}", system-ui, sans-serif;\n--font-mono: "${openAlt.split("+")[1]?.trim() || "JetBrains Mono"}", ui-monospace, monospace;`;

  return (
    <aside className="border-t border-hairline bg-surface/40 xl:sticky xl:top-[calc(var(--header-h)+44px)] xl:h-[calc(100dvh-var(--header-h)-44px)] xl:overflow-y-auto xl:border-t-0 xl:border-l">
      {/* Region 1: Brand Title + Primary Delivery Actions */}
      <div className="grid gap-3 border-b border-hairline p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <BrandLogoMark item={item} className="h-[18px] w-[18px]" />
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

        <div className="grid gap-1.5 text-[11.5px]">
          <div className="flex items-baseline gap-2">
            <span className="font-mono shrink-0 font-semibold text-accent-text">
              {t("goodForLabel")}
            </span>
            <span className="text-ink">{goodFor.join(" · ")}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono shrink-0 font-semibold text-[#FF5C5C]">
              {t("notForLabel")}
            </span>
            <span className="text-muted">{notFor.join(" · ")}</span>
          </div>
        </div>
      </div>

      {/* Region 3: Color Ribbon (Anti-melt inset stroke + 2-char part label + Dark/Light toggle) */}
      <div className="grid gap-3 border-b border-hairline p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="eyebrow-mono">DESIGN TOKENS</span>
          <SegmentedControl
            options={[
              { value: "dark" as ThemeMode, label: isZh ? "深" : "Dark" },
              { value: "light" as ThemeMode, label: isZh ? "浅" : "Light" }
            ]}
            value={paletteMode}
            onChange={setPaletteMode}
            itemClassName="h-[24px] px-2 text-[11px]"
          />
        </div>

        <div className="grid grid-cols-7 border border-hairline bg-canvas">
          {swatches.map(([label, hex]) => (
            <button
              key={label}
              type="button"
              title={`${label}: ${hex}`}
              onClick={() => void copy(hex, `Copied ${label}: ${hex}`)}
              className="group flex cursor-pointer flex-col items-center pb-1.5 transition-opacity hover:opacity-90"
            >
              <span
                className={
                  paletteMode === "dark"
                    ? "block h-7 w-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
                    : "block h-7 w-full shadow-[inset_0_0_0_1px_rgba(15,23,42,0.10)]"
                }
                style={{ backgroundColor: hex }}
              />
              <span className="mt-1 text-[10px] font-medium text-ink">{label}</span>
              <span className="w-full truncate text-center font-mono text-[8.5px] text-muted group-hover:text-accent-text">
                {hex.replace("#", "")}
              </span>
            </button>
          ))}
        </div>

        <div className="font-mono text-[10px] text-subtle">
          {isZh
            ? `默认展示原站主调（${(item.defaultTheme ?? "dark") === "dark" ? "深色优先" : "浅色优先"}），点击色块复制 Hex`
            : `Showing native ${(item.defaultTheme ?? "dark")} theme · Click any swatch to copy`}
        </div>
      </div>

      {/* Region 4: Clean 3-Row Typography + Radius */}
      <div className="grid gap-2.5 p-4">
        <div className="eyebrow-mono">{isZh ? "字体排印与几何" : "TYPOGRAPHY & GEOMETRY"}</div>

        <div className="grid gap-2 font-mono text-[11.5px]">
          <div className="flex items-baseline justify-between gap-2">
            <span className="shrink-0 text-muted">{isZh ? "标题 / 正文" : "Display / Body"}</span>
            <span className="truncate text-right text-ink">
              {displayFontLine} · {item.fonts.tracking}
            </span>
          </div>

          <div className="flex items-baseline justify-between gap-2">
            <span className="shrink-0 text-muted">{isZh ? "数据 / 等宽" : "Monospace"}</span>
            <span className="truncate text-right text-ink">{item.fonts.mono}</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="shrink-0 text-muted">{isZh ? "开源平替" : "Open Alt"}</span>
            <button
              type="button"
              onClick={() => void copy(openAltCss, `Copied ${item.name} open-source font CSS`)}
              className="inline-flex min-w-0 cursor-pointer items-center gap-1 text-right text-accent-text hover:underline"
              title={isZh ? "点击复制开源平替 font-family CSS" : "Copy open-source font-family CSS"}
            >
              <span className="truncate">{openAlt}</span>
              <Copy className="h-3 w-3 shrink-0" />
            </button>
          </div>

          <div className="flex items-baseline justify-between gap-2 border-t border-hairline pt-2">
            <span className="shrink-0 text-muted">{isZh ? "默认圆角" : "Default Radius"}</span>
            <span className="text-ink">{item.defaultRadius}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
