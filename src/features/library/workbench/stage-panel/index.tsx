"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { CodeViewer } from "@/components/patterns/code-viewer";
import {
  type CanvasPattern,
  ViewportFrame,
  type ViewportSize
} from "@/components/patterns/viewport-frame";
import { Badge } from "@/components/primitives/badge";
import { SegmentedControl } from "@/components/primitives/segmented";
import {
  type ComponentAssetMeta,
  type ComponentCategoryMeta,
  getComponentDependencies,
  getComponentPropsSpec,
  resolveFileCodeLang
} from "@/core/codegen";
import type { ResolvedWorkbenchTokens } from "@/core/tokens";
import { useClipboard } from "@/hooks/use-clipboard";
import { cn } from "@/lib/cn";
import { AssetStage, BlockStateStage } from "@/registry/components";
import type { WorkbenchStageTab, WorkbenchStageVariant } from "../toolbar";

type PkgManager = "pnpm" | "npm" | "bun";
type CliFlavor = "shadcn" | "uifino";

export interface WorkbenchStagePanelProps {
  readonly item: ComponentAssetMeta;
  readonly category: ComponentCategoryMeta;
  readonly tokens: ResolvedWorkbenchTokens;
  readonly stageTab: WorkbenchStageTab;
  readonly stageVariant: WorkbenchStageVariant;
  readonly bgPattern: CanvasPattern;
  readonly viewport: ViewportSize;
  readonly files: readonly string[];
  readonly activeFile: string;
  readonly codeOutput: string;
  readonly replayKey: number;
  readonly onSelectFile: (file: string) => void;
}

export function WorkbenchStagePanel({
  item,
  category,
  tokens,
  stageTab,
  stageVariant,
  bgPattern,
  viewport,
  files,
  activeFile,
  codeOutput,
  replayKey,
  onSelectFile
}: WorkbenchStagePanelProps) {
  const locale = useLocale();
  const isZh = locale === "zh";
  const { copy } = useClipboard();
  const [pkg, setPkg] = useState<PkgManager>("pnpm");
  const [cliFlavor, setCliFlavor] = useState<CliFlavor>("shadcn");
  const [origin, setOrigin] = useState("https://uifino.dev");

  useEffect(() => {
    if (typeof window !== "undefined" && window.location?.origin) {
      setOrigin(window.location.origin);
    }
  }, []);

  const deps = getComponentDependencies(item);
  const propsSpec = getComponentPropsSpec(item);
  const contractRules = isZh && item.contractZh ? item.contractZh : item.contract;

  const installDepsCmd =
    deps.length > 0
      ? pkg === "pnpm"
        ? `pnpm add ${deps.join(" ")}`
        : pkg === "npm"
          ? `npm install ${deps.join(" ")}`
          : `bun add ${deps.join(" ")}`
      : null;

  const execPrefix = pkg === "pnpm" ? "pnpm dlx" : pkg === "bun" ? "bunx" : "npx";
  const cliCmd =
    cliFlavor === "shadcn"
      ? `${execPrefix} shadcn@latest add ${origin}/r/components/${category.id}/${item.id}.json`
      : `${execPrefix} uifino@latest add ${category.assetType}/${item.id} --radius ${tokens.radius}`;

  const copyBtnText = isZh ? "复制" : "Copy";

  return (
    <>
      <section id="wb-stage" className="min-w-0">
        {stageTab === "preview" ? (
          <ViewportFrame viewport={viewport} bgPattern={bgPattern}>
            {!item.DemoComponent && category.assetType === "block" && stageVariant === "state" ? (
              <BlockStateStage
                item={item}
                tokens={tokens}
                isMobile={viewport === "mobile"}
                isZh={isZh}
              />
            ) : (
              <AssetStage
                item={item}
                tokens={tokens}
                viewport={viewport}
                compact={stageVariant === "compact"}
                stateView={stageVariant === "state"}
                replayKey={replayKey}
              />
            )}
          </ViewportFrame>
        ) : (
          <CodeViewer
            code={codeOutput}
            lang={resolveFileCodeLang(activeFile)}
            title={activeFile}
            copyLabel={isZh ? `复制 ${activeFile}` : `Copy ${activeFile}`}
            collapsible
            headerRight={
              <div className="flex flex-wrap gap-1.5">
                {files.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => onSelectFile(f)}
                    className="cursor-pointer"
                  >
                    <Badge
                      className={cn(
                        "h-6",
                        activeFile === f && "border-accent-border text-accent-text"
                      )}
                    >
                      {f}
                    </Badge>
                  </button>
                ))}
              </div>
            }
          />
        )}
      </section>

      {/* Installation & Explicit External Dependency Section */}
      <section id="wb-install" className="border-hairline bg-surface min-w-0 border p-[18px]">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <h2 className="eyebrow-mono text-ink m-0">
              {isZh ? "安装与依赖" : "INSTALLATION & DEPENDENCIES"}
            </h2>
            <span className="font-mono-ui text-subtle text-[11px]">React · Tailwind</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <SegmentedControl
              ariaLabel={isZh ? "命令风格" : "CLI Format"}
              options={[
                { value: "shadcn" as CliFlavor, label: "shadcn" },
                { value: "uifino" as CliFlavor, label: "uifino" }
              ]}
              value={cliFlavor}
              onChange={setCliFlavor}
            />
            <SegmentedControl
              ariaLabel={isZh ? "包管理器" : "Package Manager"}
              options={[
                { value: "pnpm" as PkgManager, label: "pnpm" },
                { value: "npm" as PkgManager, label: "npm" },
                { value: "bun" as PkgManager, label: "bun" }
              ]}
              value={pkg}
              onChange={setPkg}
            />
          </div>
        </div>

        <div className="mt-3 grid gap-2">
          {installDepsCmd ? (
            <div className="border-hairline bg-code flex items-center justify-between gap-2.5 border px-3 py-2 font-mono text-[12px]">
              <span className="truncate">
                <span className="text-subtle"># {isZh ? "前置依赖" : "deps"}: </span>
                <span className="text-accent-text">$</span> {installDepsCmd}
              </span>
              <button
                type="button"
                onClick={() => void copy(installDepsCmd, "Copied dependency install command")}
                className="shrink-0 cursor-pointer"
              >
                <Badge className="text-ink hover:border-accent-border">{copyBtnText}</Badge>
              </button>
            </div>
          ) : (
            <div className="border-hairline bg-code text-muted border px-3 py-2 font-mono text-[12px]">
              {isZh
                ? "✓ 零外部第三方依赖包，可直接通过 CLI 装入或拷贝源码落地。"
                : "✓ Zero third-party package dependencies."}
            </div>
          )}

          <div className="border-hairline bg-code flex items-center justify-between gap-2.5 border px-3 py-2.5 font-mono text-[12.5px]">
            <span className="truncate">
              <span className="text-accent-text">$</span> {cliCmd}
            </span>
            <button
              type="button"
              onClick={() => void copy(cliCmd, "Copied component CLI")}
              className="shrink-0 cursor-pointer"
            >
              <Badge className="text-ink hover:border-accent-border">{copyBtnText}</Badge>
            </button>
          </div>
        </div>
      </section>

      {/* Guardrails */}
      <section id="wb-rules" className="border-hairline bg-surface min-w-0 border p-[18px]">
        <h2 className="eyebrow-mono text-ink m-0">
          {isZh ? "布局与动效护栏" : "LAYOUT & MOTION GUARDRAILS"}
        </h2>
        <ul className="text-body mt-3 grid list-disc gap-1.5 pl-[18px] text-[13.5px]">
          {contractRules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>

      {/* Standard 4-Column Props API Table */}
      <section id="wb-props" className="border-hairline bg-surface min-w-0 border p-[18px]">
        <h2 className="eyebrow-mono text-ink m-0">
          {isZh ? "PROPS 参数表" : "PROPS API REFERENCE"}
        </h2>
        <div className="border-hairline mt-3 overflow-x-auto border">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-hairline bg-code text-subtle border-b font-mono text-[11px]">
                <th className="px-3 py-2.5 font-medium">{isZh ? "属性名" : "Prop"}</th>
                <th className="px-3 py-2.5 font-medium">{isZh ? "类型" : "Type"}</th>
                <th className="px-3 py-2.5 font-medium">{isZh ? "默认值" : "Default"}</th>
                <th className="px-3 py-2.5 font-medium">{isZh ? "说明" : "Description"}</th>
              </tr>
            </thead>
            <tbody>
              {propsSpec.map((prop) => (
                <tr key={prop.name} className="border-hairline bg-canvas border-t">
                  <td className="text-accent-text px-3 py-2.5 font-mono font-semibold">
                    {prop.name}
                  </td>
                  <td className="text-ink px-3 py-2.5 font-mono text-[11.5px]">{prop.type}</td>
                  <td className="text-muted px-3 py-2.5 font-mono text-[11.5px]">
                    {prop.defaultValue}
                  </td>
                  <td className="text-body px-3 py-2.5">{isZh ? prop.descZh : prop.descEn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
