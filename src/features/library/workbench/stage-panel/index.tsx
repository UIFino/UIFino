"use client";

import { useState } from "react";
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
import { AssetStage } from "@/registry/components";
import type { WorkbenchStageTab, WorkbenchStageVariant } from "../toolbar";

type PkgManager = "pnpm" | "npm" | "bun";

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

  const deps = getComponentDependencies(item);
  const propsSpec = getComponentPropsSpec(item);

  const installDepsCmd =
    deps.length > 0
      ? pkg === "pnpm"
        ? `pnpm add ${deps.join(" ")}`
        : pkg === "npm"
          ? `npm install ${deps.join(" ")}`
          : `bun add ${deps.join(" ")}`
      : null;

  const execPrefix =
    pkg === "pnpm" ? "pnpm dlx" : pkg === "bun" ? "bunx" : "npx";
  const cliCmd = `${execPrefix} uifino@latest add ${category.assetType}/${item.id} --radius ${tokens.radius}`;

  return (
    <>
      <section id="wb-stage" className="min-w-0">
        {stageTab === "preview" ? (
          <ViewportFrame viewport={viewport} bgPattern={bgPattern}>
            {stageVariant === "state" ? (
              <div
                className="grid gap-4 p-6 transition-colors"
                style={{
                  backgroundColor: tokens.canvas,
                  color: tokens.ink,
                  borderRadius: tokens.card
                }}
              >
                <div
                  className="grid gap-3 border p-5"
                  style={{
                    backgroundColor: tokens.surface,
                    borderColor: tokens.border,
                    borderRadius: tokens.card
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className="h-3 w-28 animate-pulse"
                      style={{ backgroundColor: tokens.border, borderRadius: tokens.ctrl }}
                    />
                    <span
                      className="px-2 py-0.5 font-mono text-[10.5px]"
                      style={{
                        backgroundColor: tokens.canvas,
                        color: tokens.accent,
                        border: `1px solid ${tokens.border}`,
                        borderRadius: tokens.ctrl
                      }}
                    >
                      {isZh ? "加载骨架 / 空态演示" : "LOADING & EMPTY STATE"}
                    </span>
                  </div>
                  <div
                    className="h-6 w-2/3 animate-pulse"
                    style={{ backgroundColor: tokens.border, borderRadius: tokens.ctrl }}
                  />
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {[1, 2, 3].map((slot) => (
                      <div
                        key={slot}
                        className="grid gap-2 border p-3.5"
                        style={{
                          backgroundColor: tokens.canvas,
                          borderColor: tokens.border,
                          borderRadius: tokens.card
                        }}
                      >
                        <div
                          className="h-5 w-16 animate-pulse"
                          style={{ backgroundColor: tokens.border, borderRadius: tokens.ctrl }}
                        />
                        <div
                          className="h-3 w-24 animate-pulse"
                          style={{ backgroundColor: tokens.surface, borderRadius: tokens.ctrl }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <AssetStage
                item={item}
                tokens={tokens}
                viewport={viewport}
                compact={stageVariant === "compact"}
                replayKey={replayKey}
              />
            )}
          </ViewportFrame>
        ) : (
          <CodeViewer
            code={codeOutput}
            lang={resolveFileCodeLang(activeFile)}
            title={activeFile}
            copyLabel={`Copy ${activeFile}`}
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
      <section id="wb-install" className="min-w-0 border border-hairline bg-surface p-[18px]">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <h2 className="eyebrow-mono m-0 text-ink">
              {isZh ? "安装与外部依赖" : "INSTALLATION & DEPENDENCIES"}
            </h2>
            <span className="font-mono-ui text-[11px] text-subtle">React · Tailwind</span>
          </div>
          <SegmentedControl
            options={[
              { value: "pnpm" as PkgManager, label: "pnpm" },
              { value: "npm" as PkgManager, label: "npm" },
              { value: "bun" as PkgManager, label: "bun" }
            ]}
            value={pkg}
            onChange={setPkg}
          />
        </div>

        <div className="mt-3 grid gap-2">
          {installDepsCmd ? (
            <div className="flex items-center justify-between gap-2.5 border border-hairline bg-code px-3 py-2 font-mono text-[12px]">
              <span className="truncate">
                <span className="text-subtle"># {isZh ? "所需依赖" : "deps"}: </span>
                <span className="text-accent-text">$</span> {installDepsCmd}
              </span>
              <button
                type="button"
                onClick={() => void copy(installDepsCmd, "Copied dependency install command")}
                className="shrink-0 cursor-pointer"
              >
                <Badge className="text-ink hover:border-accent-border">Copy</Badge>
              </button>
            </div>
          ) : (
            <div className="border border-hairline bg-code px-3 py-2 font-mono text-[12px] text-muted">
              {isZh
                ? "✓ 零外部第三方包依赖，可直接拷贝源码落地。"
                : "✓ Zero third-party package dependencies."}
            </div>
          )}

          <div className="flex items-center justify-between gap-2.5 border border-hairline bg-code px-3 py-2.5 font-mono text-[12.5px]">
            <span className="truncate">
              <span className="text-accent-text">$</span> {cliCmd}
            </span>
            <button
              type="button"
              onClick={() => void copy(cliCmd, "Copied component CLI")}
              className="shrink-0 cursor-pointer"
            >
              <Badge className="text-ink hover:border-accent-border">Copy</Badge>
            </button>
          </div>
        </div>
      </section>

      {/* Active Token Contract */}
      <section id="wb-tokens" className="min-w-0 border border-hairline bg-surface p-[18px]">
        <h2 className="eyebrow-mono m-0 text-ink">
          {isZh ? "当前实时令牌契约" : "ACTIVE TOKEN CONTRACT"}
        </h2>
        <div className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(135px,1fr))] gap-2.5 font-mono text-xs">
          <div className="border border-hairline bg-code p-2.5">
            <div className="text-[10.5px] text-subtle">SKIN</div>
            <div className="mt-[3px] font-semibold">{tokens.skinName}</div>
          </div>
          <div className="border border-hairline bg-code p-2.5">
            <div className="text-[10.5px] text-subtle">CARD RADIUS</div>
            <div className="mt-[3px] font-semibold text-accent-text">
              {tokens.card} ({tokens.twCard})
            </div>
          </div>
          <div className="border border-hairline bg-code p-2.5">
            <div className="text-[10.5px] text-subtle">DENSITY</div>
            <div className="mt-[3px] font-semibold">
              {tokens.density} ({tokens.padCard})
            </div>
          </div>
          <div className="border border-hairline bg-code p-2.5">
            <div className="text-[10.5px] text-subtle">ACCENT HEX</div>
            <div className="mt-[3px] flex items-center gap-1.5 font-semibold">
              <span
                className="inline-block h-2.5 w-2.5"
                style={{ backgroundColor: tokens.accent }}
              />
              {tokens.accent}
            </div>
          </div>
        </div>
      </section>

      {/* Guardrails */}
      <section id="wb-rules" className="min-w-0 border border-hairline bg-surface p-[18px]">
        <h2 className="eyebrow-mono m-0 text-ink">
          {isZh ? "布局与动效护栏" : "LAYOUT & MOTION GUARDRAILS"}
        </h2>
        <ul className="mt-3 grid list-disc gap-1.5 pl-[18px] text-[13.5px] text-body">
          {item.contract.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>

      {/* Standard 4-Column Props API Table */}
      <section id="wb-props" className="min-w-0 border border-hairline bg-surface p-[18px]">
        <h2 className="eyebrow-mono m-0 text-ink">
          {isZh ? "PROPS 组件参数表" : "PROPS API REFERENCE"}
        </h2>
        <div className="mt-3 overflow-x-auto border border-hairline">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-hairline bg-code font-mono text-[11px] text-subtle">
                <th className="px-3 py-2.5 font-medium">{isZh ? "属性名" : "Prop"}</th>
                <th className="px-3 py-2.5 font-medium">{isZh ? "类型" : "Type"}</th>
                <th className="px-3 py-2.5 font-medium">{isZh ? "默认值" : "Default"}</th>
                <th className="px-3 py-2.5 font-medium">{isZh ? "说明" : "Description"}</th>
              </tr>
            </thead>
            <tbody>
              {propsSpec.map((prop) => (
                <tr key={prop.name} className="border-t border-hairline bg-canvas">
                  <td className="px-3 py-2.5 font-mono font-semibold text-accent-text">
                    {prop.name}
                  </td>
                  <td className="px-3 py-2.5 font-mono text-[11.5px] text-ink">{prop.type}</td>
                  <td className="px-3 py-2.5 font-mono text-[11.5px] text-muted">
                    {prop.defaultValue}
                  </td>
                  <td className="px-3 py-2.5 text-body">
                    {isZh ? prop.descZh : prop.descEn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
