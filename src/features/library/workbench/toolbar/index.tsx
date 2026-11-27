"use client";

import { ExternalLink, RotateCcw } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { ViewportSize } from "@/components/patterns/viewport-frame";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { SegmentedControl } from "@/components/primitives/segmented";
import type { ComponentAssetMeta, ComponentCategoryMeta } from "@/core/codegen";
import type { ThemeMode } from "@/core/tokens";
import { Link } from "@/i18n/navigation";

export type WorkbenchStageTab = "preview" | "code";

export interface WorkbenchToolbarProps {
  readonly category: ComponentCategoryMeta;
  readonly item: ComponentAssetMeta;
  readonly stageTab: WorkbenchStageTab;
  readonly viewport: ViewportSize;
  readonly stageMode: ThemeMode;
  readonly canvasPreviewHref: string;
  readonly onStageTabChange: (tab: WorkbenchStageTab) => void;
  readonly onViewportChange: (vp: ViewportSize) => void;
  readonly onStageModeChange: (mode: ThemeMode) => void;
  readonly onReplay: () => void;
}

export function WorkbenchToolbar({
  category,
  item,
  stageTab,
  viewport,
  stageMode,
  canvasPreviewHref,
  onStageTabChange,
  onViewportChange,
  onStageModeChange,
  onReplay
}: WorkbenchToolbarProps) {
  const locale = useLocale();
  const tCommon = useTranslations("common");
  const isZh = locale === "zh";

  return (
    <section id="wb-overview" className="grid min-w-0 gap-3">
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

      <div>
        <h1 className="heading-page">{isZh && item.nameZh ? item.nameZh : item.name}</h1>
        <p className="mt-1.5 max-w-[660px] text-sm text-muted">
          {isZh ? item.descZh : item.descEn}
        </p>
      </div>

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
          <Badge className="h-[30px] px-2.5 text-muted">React · Tailwind</Badge>
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
            title="Open isolated preview canvas"
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
