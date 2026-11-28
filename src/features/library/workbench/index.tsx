"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import type { CanvasPattern, ViewportSize } from "@/components/patterns/viewport-frame";
import {
  compileComponentAiPrompt,
  type ComponentAssetMeta,
  type ComponentCategoryMeta,
  generateComponentSource,
  getComponentDependencies,
  getComponentVirtualFiles,
  toPascalCase
} from "@/core/codegen";
import { resolveWorkbenchTokens, serializeTokensCss } from "@/core/tokens";
import { useClipboard } from "@/hooks/use-clipboard";
import { getAllComponentsFlat } from "@/registry/components";
import { ALL_WORKBENCH_SKINS } from "@/registry/skins";
import { useWorkbenchPresetStore } from "@/stores/workbench-preset.store";
import { WorkbenchParamsPanel } from "./params-panel";
import { WorkbenchStagePanel } from "./stage-panel";
import { WorkbenchToolbar, type WorkbenchStageTab, type WorkbenchStageVariant } from "./toolbar";
import { WorkbenchTreeSidebar } from "./tree-sidebar";

export interface ComponentWorkbenchViewProps {
  readonly category: ComponentCategoryMeta;
  readonly item: ComponentAssetMeta;
}

export function ComponentWorkbenchView({ category, item }: ComponentWorkbenchViewProps) {
  const locale = useLocale();
  const isZh = locale === "zh";
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

  const [stageVariant, setStageVariant] = useState<WorkbenchStageVariant>("default");
  const [bgPattern, setBgPattern] = useState<CanvasPattern>("solid");
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    if (skinQuery && skinQuery !== skin) {
      setSkin(skinQuery);
    }
  }, [skinQuery, skin, setSkin]);

  useEffect(() => {
    if (category.assetType !== "block" && stageVariant === "state") {
      setStageVariant("default");
    }
  }, [category.assetType, stageVariant]);

  const stageTab: WorkbenchStageTab = tabRaw === "code" ? "code" : "preview";
  const viewport: ViewportSize = vpRaw === "mobile" || vpRaw === "tablet" ? vpRaw : "desktop";

  const tokens = resolveWorkbenchTokens({
    radius,
    density,
    skinId: skin,
    mode: stageMode,
    brands: ALL_WORKBENCH_SKINS
  });

  const allComponents = getAllComponentsFlat();
  const currentIdx = Math.max(
    0,
    allComponents.findIndex((c) => c.id === item.id && c.categoryId === category.id)
  );
  const prevComp = allComponents[(currentIdx - 1 + allComponents.length) % allComponents.length];
  const nextComp = allComponents[(currentIdx + 1) % allComponents.length];

  const skinSuffix = skin !== "linear" ? `?skin=${encodeURIComponent(skin)}` : "";
  const prevComponentHref = prevComp
    ? `/components/${prevComp.categoryId}/${prevComp.id}${skinSuffix}`
    : `/components/${category.id}/${item.id}`;
  const nextComponentHref = nextComp
    ? `/components/${nextComp.categoryId}/${nextComp.id}${skinSuffix}`
    : `/components/${category.id}/${item.id}`;
  const prevComponentTitle = prevComp
    ? isZh
      ? `上一个：${prevComp.nameZh ?? prevComp.name}`
      : `Previous: ${prevComp.name}`
    : item.name;
  const nextComponentTitle = nextComp
    ? isZh
      ? `下一个：${nextComp.nameZh ?? nextComp.name}`
      : `Next: ${nextComp.name}`
    : item.name;

  const files = getComponentVirtualFiles(item);
  const pascalName = toPascalCase(item.id);
  const activeFile = files.includes(fileQuery) ? fileQuery : (files[0] ?? `${pascalName}.tsx`);
  const codeOutput = generateComponentSource(item, category, tokens, activeFile);

  const handleCopyAiPrompt = () => {
    const componentCode = generateComponentSource(item, category, tokens, `${pascalName}.tsx`);
    const demoCode = generateComponentSource(item, category, tokens, `${pascalName}Demo.tsx`);
    const cssTokens = serializeTokensCss(tokens);
    const dependencies = getComponentDependencies(item);
    const promptText = compileComponentAiPrompt({
      item,
      category,
      tokens,
      pascalName,
      componentCode,
      demoCode,
      cssTokens,
      dependencies,
      isZh
    });
    void copy(promptText, isZh ? "已复制 6 合 1 AI 施工指令" : "Copied 6-in-1 AI Prompt");
  };

  const canvasPreviewHref = `/preview/components/${category.id}/${item.id}?skin=${skin}&radius=${radius}&density=${density}&mode=${stageMode}`;

  const handleSelectFile = (nextFile: string) => {
    void setFileQuery(nextFile);
    void setTabQuery("code");
  };

  return (
    <div className="band-full">
      <div className="workbench-grid shell-wrap">
        <WorkbenchTreeSidebar category={category} item={item} />

        <main className="order-1 min-w-0 px-6 pt-6 pb-12 lg:order-2">
          <div className="grid w-full content-start gap-6">
            <WorkbenchToolbar
              category={category}
              item={item}
              stageTab={stageTab}
              stageVariant={stageVariant}
              bgPattern={bgPattern}
              viewport={viewport}
              stageMode={stageMode}
              canvasPreviewHref={canvasPreviewHref}
              prevComponentHref={prevComponentHref}
              nextComponentHref={nextComponentHref}
              prevComponentTitle={prevComponentTitle}
              nextComponentTitle={nextComponentTitle}
              onStageTabChange={(next) => void setTabQuery(next)}
              onStageVariantChange={setStageVariant}
              onBgPatternChange={setBgPattern}
              onViewportChange={(next) => void setVpQuery(next)}
              onStageModeChange={setStageMode}
              onReplay={() => setReplayKey((k) => k + 1)}
              onCopyAiPrompt={handleCopyAiPrompt}
              onCopySource={() => void copy(codeOutput, `Copied ${activeFile}`)}
            />

            <WorkbenchStagePanel
              item={item}
              category={category}
              tokens={tokens}
              stageTab={stageTab}
              stageVariant={stageVariant}
              bgPattern={bgPattern}
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
        />
      </div>
    </div>
  );
}
