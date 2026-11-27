"use client";

import { ExternalLink, RotateCcw } from "lucide-react";
import { useLocale } from "next-intl";
import type { ViewportSize } from "@/components/patterns/viewport-frame";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { SegmentedControl } from "@/components/primitives/segmented";
import type { ComponentAssetMeta, ComponentCategoryMeta, TargetFramework } from "@/core/codegen";
import type { ThemeMode } from "@/core/tokens";
import { Link } from "@/i18n/navigation";

export type WorkbenchStageTab = "preview" | "code";

export interface WorkbenchToolbarProps {
  readonly category: ComponentCategoryMeta;
  readonly item: ComponentAssetMeta;
  readonly stageTab: WorkbenchStageTab;
  readonly framework: TargetFramework;
  readonly viewport: ViewportSize;
  readonly stageMode: ThemeMode;
  readonly canvasPreviewHref: string;
  readonly onStageTabChange: (tab: WorkbenchStageTab) => void;
  readonly onFrameworkChange: (fw: TargetFramework) => void;
  readonly onViewportChange: (vp: ViewportSize) => void;
  readonly onStageModeChange: (mode: ThemeMode) => void;
  readonly onReplay: () => void;
}

export function WorkbenchToolbar({
  category,
  item,
  stageTab,
  framework,
  viewport,
  stageMode,
  canvasPreviewHref,
  onStageTabChange,
  onFrameworkChange,
  onViewportChange,
  onStageModeChange,
  onReplay
}: WorkbenchToolbarProps) {
  const locale = useLocale();
  const isZh = locale === "zh";

  return (
    <section id="wb-overview" className="grid min-w-0 gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <nav className="font-mono-ui flex flex-wrap items-center gap-1.5 text-xs text-muted">
          <Link href="/components" className="hover:text-ink">
            Components
          </Link>
          <span>/</span>
          <Link href={`/components/${category.id}`} className="hover:text-ink">
            {category.name}
          </Link>
          <span>/</span>
          <span className="text-ink">{item.id}</span>
        </nav>
        <Badge variant="accent">{category.assetType.toUpperCase()}</Badge>
      </div>

      <div>
        <h1 className="heading-page">{item.name}</h1>
        <p className="mt-1.5 max-w-[660px] text-sm text-muted">
          {isZh ? item.descZh : item.descEn}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2.5 border border-hairline bg-surface px-3 py-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <SegmentedControl
            options={[
              { value: "preview" as WorkbenchStageTab, label: "Preview" },
              { value: "code" as WorkbenchStageTab, label: "Code" }
            ]}
            value={stageTab}
            onChange={onStageTabChange}
          />
          <SegmentedControl
            ariaLabel="Frontend Framework"
            options={[
              { value: "react" as TargetFramework, label: "React" },
              { value: "vue" as TargetFramework, label: "Vue" },
              { value: "svelte" as TargetFramework, label: "Svelte" },
              { value: "solid" as TargetFramework, label: "Solid" }
            ]}
            value={framework}
            onChange={onFrameworkChange}
          />
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
