"use client";

import { CodeViewer } from "@/components/patterns/code-viewer";
import { ViewportFrame, type ViewportSize } from "@/components/patterns/viewport-frame";
import { Badge } from "@/components/primitives/badge";
import {
  type ComponentAssetMeta,
  type ComponentCategoryMeta,
  resolveFileCodeLang
} from "@/core/codegen";
import type { ResolvedWorkbenchTokens } from "@/core/tokens";
import { useClipboard } from "@/hooks/use-clipboard";
import { cn } from "@/lib/cn";
import { AssetStage } from "@/registry/components";
import type { WorkbenchStageTab } from "../toolbar";

export interface WorkbenchStagePanelProps {
  readonly item: ComponentAssetMeta;
  readonly category: ComponentCategoryMeta;
  readonly tokens: ResolvedWorkbenchTokens;
  readonly stageTab: WorkbenchStageTab;
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
  viewport,
  files,
  activeFile,
  codeOutput,
  replayKey,
  onSelectFile
}: WorkbenchStagePanelProps) {
  const { copy } = useClipboard();
  const cliCmd = `npx uifino@latest add ${category.assetType}/${item.id} --radius ${tokens.radius}`;

  return (
    <>
      <section id="wb-stage" className="min-w-0">
        {stageTab === "preview" ? (
          <ViewportFrame viewport={viewport}>
            <AssetStage
              item={item}
              tokens={tokens}
              viewport={viewport}
              replayKey={replayKey}
            />
          </ViewportFrame>
        ) : (
          <CodeViewer
            code={codeOutput}
            lang={resolveFileCodeLang(activeFile)}
            title={activeFile}
            copyLabel={`Copy ${activeFile}`}
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

      <section id="wb-install" className="min-w-0 border border-hairline bg-surface p-[18px]">
        <div className="flex items-center justify-between gap-2.5">
          <h2 className="eyebrow-mono m-0 text-ink">INSTALLATION &amp; CLI</h2>
          <span className="font-mono-ui text-[11px] text-subtle">React · Tailwind</span>
        </div>
        <div className="mt-2.5 flex items-center justify-between gap-2.5 border border-hairline bg-code px-3 py-2.5 font-mono text-[12.5px]">
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
      </section>

      <section id="wb-tokens" className="min-w-0 border border-hairline bg-surface p-[18px]">
        <h2 className="eyebrow-mono m-0 text-ink">ACTIVE TOKEN CONTRACT</h2>
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

      <section id="wb-rules" className="min-w-0 border border-hairline bg-surface p-[18px]">
        <h2 className="eyebrow-mono m-0 text-ink">LAYOUT &amp; MOTION GUARDRAILS</h2>
        <ul className="mt-3 grid list-disc gap-1.5 pl-[18px] text-[13.5px] text-body">
          {item.contract.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
