"use client";

import { useEffect, useState } from "react";
import { parseAsString, useQueryState } from "nuqs";
import type { ViewportSize } from "@/components/patterns/viewport-frame";
import {
  type ComponentAssetMeta,
  type ComponentCategoryMeta,
  generateComponentSource,
  getComponentVirtualFiles
} from "@/core/codegen";
import { resolveWorkbenchTokens } from "@/core/tokens";
import { useClipboard } from "@/hooks/use-clipboard";
import { ALL_WORKBENCH_SKINS } from "@/registry/skins";
import { useWorkbenchPresetStore } from "@/stores/workbench-preset.store";
import { WorkbenchParamsPanel } from "./params-panel";
import { WorkbenchStagePanel } from "./stage-panel";
import { type WorkbenchStageTab, WorkbenchToolbar } from "./toolbar";
import { WorkbenchTreeSidebar } from "./tree-sidebar";

export interface ComponentWorkbenchViewProps {
  readonly category: ComponentCategoryMeta;
  readonly item: ComponentAssetMeta;
}

export function ComponentWorkbenchView({ category, item }: ComponentWorkbenchViewProps) {
  const { copy } = useClipboard();

  const radius = useWorkbenchPresetStore((s) => s.radius);
  const density = useWorkbenchPresetStore((s) => s.density);
  const skin = useWorkbenchPresetStore((s) => s.skin);
  const stageMode = useWorkbenchPresetStore((s) => s.stageMode);
  const setRadius = useWorkbenchPresetStore((s) => s.setRadius);
  const setDensity = useWorkbenchPresetStore((s) => s.setDensity);
  const setSkin = useWorkbenchPresetStore((s) => s.setSkin);
  const setStageMode = useWorkbenchPresetStore((s) => s.setStageMode);
  const resetPreset = useWorkbenchPresetStore((s) => s.resetPreset);

  const [tabRaw, setTabQuery] = useQueryState("tab", parseAsString.withDefault("preview"));
  const [vpRaw, setVpQuery] = useQueryState("vp", parseAsString.withDefault("desktop"));
  const [fileQuery, setFileQuery] = useQueryState("file", parseAsString.withDefault(""));
  const [skinQuery, setSkinQuery] = useQueryState("skin", parseAsString.withDefault(""));

  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    if (skinQuery && skinQuery !== skin) {
      setSkin(skinQuery);
    }
  }, [skinQuery, skin, setSkin]);

  const stageTab: WorkbenchStageTab = tabRaw === "code" ? "code" : "preview";
  const viewport: ViewportSize =
    vpRaw === "mobile" || vpRaw === "tablet" ? vpRaw : "desktop";

  const tokens = resolveWorkbenchTokens({
    radius,
    density,
    skinId: skin,
    mode: stageMode,
    brands: ALL_WORKBENCH_SKINS
  });

  const files = getComponentVirtualFiles(item);
  const activeFile = files.includes(fileQuery) ? fileQuery : (files[0] ?? "Stage.tsx");
  const codeOutput = generateComponentSource(item, category, tokens, activeFile);

  const canvasPreviewHref = `/preview/components/${category.id}/${item.id}?skin=${skin}&radius=${radius}&density=${density}&mode=${stageMode}`;

  const handleSelectFile = (nextFile: string) => {
    void setFileQuery(nextFile);
    void setTabQuery("code");
  };

  return (
    <div className="band-full">
      <div className="workbench-grid">
        <WorkbenchTreeSidebar
          category={category}
          item={item}
          files={files}
          activeFile={activeFile}
          stageTab={stageTab}
          onSelectFile={handleSelectFile}
        />

        <main className="order-1 min-w-0 px-6 pt-6 pb-12 lg:order-2">
          <div className="grid w-full content-start gap-6">
            <WorkbenchToolbar
              category={category}
              item={item}
              stageTab={stageTab}
              viewport={viewport}
              stageMode={stageMode}
              canvasPreviewHref={canvasPreviewHref}
              onStageTabChange={(next) => void setTabQuery(next)}
              onViewportChange={(next) => void setVpQuery(next)}
              onStageModeChange={setStageMode}
              onReplay={() => setReplayKey((k) => k + 1)}
            />

            <WorkbenchStagePanel
              item={item}
              category={category}
              tokens={tokens}
              stageTab={stageTab}
              viewport={viewport}
              files={files}
              activeFile={activeFile}
              codeOutput={codeOutput}
              replayKey={replayKey}
              onSelectFile={handleSelectFile}
            />
          </div>
        </main>

        <WorkbenchParamsPanel
          tokens={tokens}
          radius={radius}
          density={density}
          skin={skin}
          viewport={viewport}
          onRadiusChange={setRadius}
          onDensityChange={setDensity}
          onSkinChange={(nextSkin) => {
            setSkin(nextSkin);
            void setSkinQuery(nextSkin);
          }}
          onReset={() => {
            resetPreset();
            void setSkinQuery("");
          }}
          onCopyCode={() => void copy(codeOutput, `Copied ${activeFile}`)}
        />
      </div>
    </div>
  );
}
