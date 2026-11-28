"use client";

import {
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  Monitor,
  RotateCcw,
  Smartphone,
  Sparkles,
  Tablet
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { CanvasPattern, ViewportSize } from "@/components/patterns/viewport-frame";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { SegmentedControl } from "@/components/primitives/segmented";
import type { ComponentAssetMeta, ComponentCategoryMeta } from "@/core/codegen";
import type { ThemeMode } from "@/core/tokens";
import { Link } from "@/i18n/navigation";

export type WorkbenchStageTab = "preview" | "code";
export type WorkbenchStageVariant = "default" | "compact" | "state";

export interface WorkbenchToolbarProps {
  readonly category: ComponentCategoryMeta;
  readonly item: ComponentAssetMeta;
  readonly stageTab: WorkbenchStageTab;
  readonly stageVariant: WorkbenchStageVariant;
  readonly bgPattern: CanvasPattern;
  readonly viewport: ViewportSize;
  readonly stageMode: ThemeMode;
  readonly canvasPreviewHref: string;
  readonly prevComponentHref: string;
  readonly nextComponentHref: string;
  readonly prevComponentTitle: string;
  readonly nextComponentTitle: string;
  readonly onStageTabChange: (tab: WorkbenchStageTab) => void;
  readonly onStageVariantChange: (v: WorkbenchStageVariant) => void;
  readonly onBgPatternChange: (p: CanvasPattern) => void;
  readonly onViewportChange: (vp: ViewportSize) => void;
  readonly onStageModeChange: (mode: ThemeMode) => void;
  readonly onReplay: () => void;
  readonly onCopyAiPrompt: () => void;
  readonly onCopySource: () => void;
}

const ASSET_TYPE_ZH: Record<ComponentCategoryMeta["assetType"], string> = {
  section: "官网区块",
  block: "功能模块",
  motion: "交互动效"
};

export function WorkbenchToolbar({
  category,
  item,
  stageTab,
  stageVariant,
  bgPattern,
  viewport,
  stageMode,
  canvasPreviewHref,
  prevComponentHref,
  nextComponentHref,
  prevComponentTitle,
  nextComponentTitle,
  onStageTabChange,
  onStageVariantChange,
  onBgPatternChange,
  onViewportChange,
  onStageModeChange,
  onReplay,
  onCopyAiPrompt,
  onCopySource
}: WorkbenchToolbarProps) {
  const locale = useLocale();
  const tCommon = useTranslations("common");
  const isZh = locale === "zh";

  const showStateVariant = category.assetType === "block";
  const variantOptions = showStateVariant
    ? [
        { value: "default" as WorkbenchStageVariant, label: isZh ? "默认态" : "Default" },
        { value: "compact" as WorkbenchStageVariant, label: isZh ? "紧凑态" : "Compact" },
        { value: "state" as WorkbenchStageVariant, label: isZh ? "加载/空态" : "State" }
      ]
    : [
        { value: "default" as WorkbenchStageVariant, label: isZh ? "默认态" : "Default" },
        { value: "compact" as WorkbenchStageVariant, label: isZh ? "紧凑态" : "Compact" }
      ];

  const displayName = isZh && item.nameZh ? item.nameZh : item.name;
  const displayDesc = isZh ? item.descZh : item.descEn;
  const assetBadgeLabel = isZh
    ? ASSET_TYPE_ZH[category.assetType]
    : category.assetType.toUpperCase();

  return (
    <section id="wb-overview" className="grid min-w-0 gap-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <nav className="text-muted flex flex-wrap items-center gap-1.5 text-xs">
          <Link href="/components" className="hover:text-ink">
            {tCommon("navComponents")}
          </Link>
          <span>/</span>
          <Link href={`/components/${category.id}`} className="hover:text-ink">
            {isZh ? category.nameZh : category.name}
          </Link>
          <span>/</span>
          <span className="text-ink">{displayName}</span>
        </nav>
        <Badge variant="accent">{assetBadgeLabel}</Badge>
      </div>

      {/* Header Row with Primary Copy AI Prompt & Copy Source Actions */}
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-start">
        <div className="min-w-0">
          <h1 className="heading-page">{displayName}</h1>
          <p className="text-muted mt-1.5 max-w-[700px] text-sm">{displayDesc}</p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Button variant="lime" size="md" onClick={onCopyAiPrompt} className="gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{isZh ? "复制 AI 施工指令" : "Copy AI Prompt"}</span>
          </Button>
          <Button variant="contrast" size="md" onClick={onCopySource} className="gap-1.5">
            <Copy className="h-3.5 w-3.5" />
            <span>{isZh ? "复制源码" : "Copy Source"}</span>
          </Button>
        </div>
      </div>

      {/* Stage Mode, Variant, Canvas Grid, Responsive Switcher & Component Cycler Bar */}
      <div className="border-hairline bg-surface flex flex-wrap items-center justify-between gap-2 border px-3 py-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <SegmentedControl
            options={[
              { value: "preview" as WorkbenchStageTab, label: isZh ? "实时预览" : "Preview" },
              { value: "code" as WorkbenchStageTab, label: isZh ? "组件源码" : "Code" }
            ]}
            value={stageTab}
            onChange={onStageTabChange}
          />
          {stageTab === "preview" ? (
            <>
              <SegmentedControl
                ariaLabel={isZh ? "组件状态变体" : "Component State Variant"}
                options={variantOptions}
                value={
                  showStateVariant
                    ? stageVariant
                    : stageVariant === "state"
                      ? "default"
                      : stageVariant
                }
                onChange={onStageVariantChange}
              />
              <SegmentedControl
                ariaLabel={isZh ? "画布背景" : "Stage Background"}
                options={[
                  { value: "solid" as CanvasPattern, label: isZh ? "纯色" : "Solid" },
                  { value: "dots" as CanvasPattern, label: isZh ? "点阵" : "Dots" }
                ]}
                value={bgPattern}
                onChange={onBgPatternChange}
              />
            </>
          ) : (
            <Badge className="text-muted h-[30px] px-2.5">React · Tailwind</Badge>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <SegmentedControl
            ariaLabel={isZh ? "设备视口" : "Viewport Size"}
            options={[
              {
                value: "desktop" as ViewportSize,
                label: (
                  <>
                    <Monitor className="h-3.5 w-3.5 shrink-0" />
                    <span>{isZh ? "电脑" : "Desktop"}</span>
                  </>
                )
              },
              {
                value: "tablet" as ViewportSize,
                label: (
                  <>
                    <Tablet className="h-3.5 w-3.5 shrink-0" />
                    <span>{isZh ? "平板" : "Tablet"}</span>
                  </>
                )
              },
              {
                value: "mobile" as ViewportSize,
                label: (
                  <>
                    <Smartphone className="h-3.5 w-3.5 shrink-0" />
                    <span>{isZh ? "手机" : "Mobile"}</span>
                  </>
                )
              }
            ]}
            value={viewport}
            onChange={onViewportChange}
          />

          <SegmentedControl
            ariaLabel={isZh ? "预览主题" : "Preview Theme"}
            options={[
              { value: "dark" as ThemeMode, label: isZh ? "深色" : "Dark" },
              { value: "light" as ThemeMode, label: isZh ? "浅色" : "Light" }
            ]}
            value={stageMode}
            onChange={onStageModeChange}
          />

          <Button variant="hairline" size="sm" onClick={onReplay} className="gap-1 text-xs">
            <RotateCcw className="h-3 w-3" />
            <span>{isZh ? "重播" : "Replay"}</span>
          </Button>

          <Link
            href={canvasPreviewHref}
            target="_blank"
            rel="noreferrer"
            title={isZh ? "新窗口独立预览" : "Open isolated preview canvas"}
          >
            <Button variant="hairline" size="sm" className="px-2">
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </Link>

          <div className="border-hairline bg-code inline-flex items-stretch border">
            <Link
              href={prevComponentHref}
              title={prevComponentTitle}
              aria-label={prevComponentTitle}
              className="border-hairline text-muted hover:bg-surface-hover hover:text-ink inline-flex h-[30px] w-[30px] items-center justify-center border-r transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </Link>
            <Link
              href={nextComponentHref}
              title={nextComponentTitle}
              aria-label={nextComponentTitle}
              className="text-muted hover:bg-surface-hover hover:text-ink inline-flex h-[30px] w-[30px] items-center justify-center transition-colors"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
