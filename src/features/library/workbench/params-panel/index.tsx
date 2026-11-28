"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { ViewportSize } from "@/components/patterns/viewport-frame";
import { DualSwatch } from "@/components/primitives/dual-swatch";
import { SegmentedControl } from "@/components/primitives/segmented";
import type { DensityMode, RadiusStop, ResolvedWorkbenchTokens } from "@/core/tokens";
import { cn } from "@/lib/cn";
import { CATALOG_ITEMS } from "@/registry/catalog";
import { STYLE_ITEMS } from "@/registry/styles";

export interface WorkbenchParamsPanelProps {
  readonly tokens: ResolvedWorkbenchTokens;
  readonly radius: RadiusStop;
  readonly density: DensityMode;
  readonly skin: string;
  readonly viewport: ViewportSize;
  readonly onRadiusChange: (r: RadiusStop) => void;
  readonly onDensityChange: (d: DensityMode) => void;
  readonly onSkinChange: (skinId: string) => void;
  readonly onReset: () => void;
}

const VIEWPORT_ZH: Record<ViewportSize, string> = {
  desktop: "电脑",
  tablet: "平板",
  mobile: "手机"
};

const DENSITY_ZH: Record<DensityMode, string> = {
  compact: "紧凑",
  default: "标准",
  spacious: "舒展"
};

export function WorkbenchParamsPanel({
  tokens,
  radius,
  density,
  skin,
  viewport,
  onRadiusChange,
  onDensityChange,
  onSkinChange,
  onReset
}: WorkbenchParamsPanelProps) {
  const t = useTranslations("library");
  const locale = useLocale();
  const isZh = locale === "zh";

  const [expandBrands, setExpandBrands] = useState(false);

  const brandChoices = [
    { id: "default", name: "uifino", swatch: ["#111318", "#9EFF00"] as const },
    ...CATALOG_ITEMS.map((b) => ({
      id: b.id,
      name: b.name,
      swatch: [b.dark.canvas, b.dark.accent] as const
    }))
  ];

  // Show all brands smoothly when expanded, or ensure selected brand stays visible when collapsed
  const visibleBrands = expandBrands
    ? brandChoices
    : brandChoices.filter((b, idx) => idx < 6 || b.id === skin);

  const tocItems = isZh
    ? ([
        ["#wb-overview", "概览与操作"],
        ["#wb-stage", `实时预览舞台 (${VIEWPORT_ZH[viewport]})`],
        ["#wb-install", "安装与依赖"],
        ["#wb-rules", "布局与动效护栏"],
        ["#wb-props", "Props 参数表"]
      ] as const)
    : ([
        ["#wb-overview", "Overview & Stack"],
        ["#wb-stage", `Live Stage (${viewport})`],
        ["#wb-install", "Install & Deps"],
        ["#wb-rules", "Layout & Motion Rules"],
        ["#wb-props", "Props API Table"]
      ] as const);

  return (
    <aside className="border-hairline bg-canvas order-2 grid content-start gap-[22px] border-t px-4 py-[18px] lg:sticky lg:top-[var(--header-h)] lg:order-3 lg:h-[calc(100dvh-var(--header-h))] lg:overflow-y-auto lg:border-t-0 lg:border-l">
      <div className="border-hairline grid gap-3.5 border-b pb-[18px]">
        <div className="flex items-center justify-between">
          <span className="eyebrow-mono text-accent-text">{t("wbParamsTitle")}</span>
          <button
            type="button"
            onClick={onReset}
            className="font-mono-ui text-subtle hover:text-ink cursor-pointer text-[11px] underline"
          >
            {t("wbReset")}
          </button>
        </div>

        {/* Active Skin & Accent Indicator */}
        <div className="border-hairline bg-surface flex items-center justify-between border px-2.5 py-1.5 text-xs">
          <span className="text-muted">{isZh ? "当前皮肤" : "Active Skin"}</span>
          <span className="text-ink inline-flex items-center gap-1.5 font-mono text-[11.5px] font-semibold">
            <span
              className="border-hairline inline-block h-2.5 w-2.5 border"
              style={{ backgroundColor: tokens.accent }}
              title={tokens.accent}
            />
            <span>{tokens.skinName}</span>
            <span className="text-subtle text-[10.5px]">{tokens.accent}</span>
          </span>
        </div>

        <div>
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="text-muted">{t("wbRadius")}</span>
            <span className="font-mono-ui text-ink">{tokens.card}</span>
          </div>
          <SegmentedControl
            options={([0, 4, 8, 12, 16] as const).map((r) => ({ value: r, label: String(r) }))}
            value={radius}
            onChange={onRadiusChange}
            className="grid w-full grid-cols-5"
            itemClassName="justify-center px-0"
          />
        </div>

        <div>
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="text-muted">{t("wbDensity")}</span>
            <span className="font-mono-ui text-ink">
              {isZh ? DENSITY_ZH[tokens.density] : tokens.density} · {tokens.padCard}
            </span>
          </div>
          <SegmentedControl
            options={[
              { value: "compact" as DensityMode, label: isZh ? "紧凑" : "Compact" },
              { value: "default" as DensityMode, label: isZh ? "标准" : "Default" },
              { value: "spacious" as DensityMode, label: isZh ? "舒展" : "Spacious" }
            ]}
            value={density}
            onChange={onDensityChange}
            className="grid w-full grid-cols-3"
            itemClassName="justify-center px-0 text-[11.5px]"
          />
        </div>

        {/* All Brand Catalog Skins (Expandable) */}
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-muted">
              {t("wbBrandSkin")} ({CATALOG_ITEMS.length})
            </span>
            <button
              type="button"
              onClick={() => setExpandBrands((v) => !v)}
              className="text-accent-text cursor-pointer font-mono text-[10.5px] hover:underline"
            >
              {expandBrands
                ? isZh
                  ? "收起"
                  : "Less"
                : isZh
                  ? `全部 ${brandChoices.length} ▾`
                  : `All ${brandChoices.length} ▾`}
            </button>
          </div>
          <div className="grid max-h-[164px] grid-cols-2 gap-[5px] overflow-y-auto pr-0.5">
            {visibleBrands.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => onSkinChange(b.id)}
                className={cn(
                  "flex h-7 cursor-pointer items-center gap-1.5 border px-2 text-[11.5px] font-medium transition-colors",
                  skin === b.id
                    ? "border-accent-border bg-accent-soft text-accent-text"
                    : "border-hairline bg-surface text-ink hover:bg-gray-100"
                )}
              >
                <DualSwatch swatch={b.swatch} />
                <span className="truncate">{b.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* All 10 UI Style Presets */}
        <div>
          <div className="text-muted mb-1.5 text-xs">
            {isZh ? `风格流派 (${STYLE_ITEMS.length})` : `UI Styles (${STYLE_ITEMS.length})`}
          </div>
          <div className="grid grid-cols-2 gap-[5px]">
            {STYLE_ITEMS.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => onSkinChange(st.id)}
                className={cn(
                  "flex h-7 cursor-pointer items-center gap-1.5 border px-2 text-[11.5px] font-medium transition-colors",
                  skin === st.id
                    ? "border-accent-border bg-accent-soft text-accent-text"
                    : "border-hairline bg-surface text-ink hover:bg-gray-100"
                )}
              >
                <DualSwatch swatch={st.swatch} />
                <span className="truncate">{isZh ? st.nameZh : st.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="eyebrow-mono mb-2.5">{t("wbTocTitle")}</div>
        <nav className="grid gap-0.5">
          {tocItems.map(([href, label], idx) => (
            <a
              key={href}
              href={href}
              className={cn(
                "block border-l py-[5px] pl-3 text-[12.5px] transition-colors",
                idx === 0
                  ? "border-l-accent-text text-ink"
                  : "border-l-hairline text-muted hover:border-l-accent-text hover:text-ink"
              )}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
