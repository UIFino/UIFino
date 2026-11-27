"use client";

import { ExternalLink, RotateCcw, Sparkles, Copy } from "lucide-react";
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
  readonly onStageTabChange: (tab: WorkbenchStageTab) => void;
  readonly onStageVariantChange: (v: WorkbenchStageVariant) => void;
  readonly onBgPatternChange: (p: CanvasPattern) => void;
  readonly onViewportChange: (vp: ViewportSize) => void;
  readonly onStageModeChange: (mode: ThemeMode) => void;
  readonly onReplay: () => void;
  readonly onCopyAiPrompt: () => void;
  readonly onCopySource: () => void;
}

export function WorkbenchToolbar({
  category,
  item,
  stageTab,
  stageVariant,
  bgPattern,
  viewport,
  stageMode,
  canvasPreviewHref,
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

  return (
    <section id="wb-overview" className="grid min-w-0 gap-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <nav className="font-mono-ui flex flex-wrap items-center gap-1.5 text-xs text-muted">
          <Link href="/components" className="hover:text-ink">
            {tCommon("navComponents")}
          </Link>
          <span>/</span>
          <Link href={`/components/${category.id}`} className="hover:text-ink">
            {isZh ? category.nameZh : category.name}
          </Link>
          <span>/</span>
          <span className="text-ink">{item.id}</span>
        </nav>
        <Badge variant="accent">{category.assetType.toUpperCase()}</Badge>
      </div>

      {/* Header Row with Primary Copy AI Prompt & Copy Source Actions */}
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-start">
        <div className="min-w-0">
          <h1 className="heading-page">{isZh && item.nameZh ? item.nameZh : item.name}</h1>
          <p className="mt-1.5 max-w-[700px] text-sm text-muted">
            {isZh ? item.descZh : item.descEn}
          </p>
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

      {/* Stage Mode, Variant, Canvas Grid & Responsive Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border border-hairline bg-surface px-3 py-2.5">
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
                ariaLabel="Component State Variant"
                options={[
                  { value: "default" as WorkbenchStageVariant, label: isZh ? "默认态" : "Default" },
                  { value: "compact" as WorkbenchStageVariant, label: isZh ? "紧凑态" : "Compact" },
                  { value: "state" as WorkbenchStageVariant, label: isZh ? "加载/空态" : "State" }
                ]}
                value={stageVariant}
                onChange={onStageVariantChange}
              />
              <SegmentedControl
                ariaLabel="Stage Background"
                options={[
                  { value: "solid" as CanvasPattern, label: isZh ? "纯色" : "Solid" },
                  { value: "dots" as CanvasPattern, label: isZh ? "点阵" : "Dots" }
                ]}
                value={bgPattern}
                onChange={onBgPatternChange}
              />
            </>
          ) : (
            <Badge className="h-[30px] px-2.5 text-muted">React · Tailwind</Badge>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <SegmentedControl
            ariaLabel="Viewport Size"
            options={[
              { value: "desktop" as ViewportSize, label: "Desktop" },
              { value: "tablet" as ViewportSize, label: "Tablet" },
              { value: "mobile" as ViewportSize, label: "Mobile" }
            ]}
            value={viewport}
            onChange={onViewportChange}
          />
          <SegmentedControl
            options={[
              { value: "dark" as ThemeMode, label: "Dark" },
              { value: "light" as ThemeMode, label: "Light" }
            ]}
            value={stageMode}
            onChange={onStageModeChange}
          />
          <Button
            variant="hairline"
            size="sm"
            onClick={onReplay}
            className="font-mono text-[11.5px]"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Replay</span>
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
        </div>
      </div>
    </section>
  );
}
