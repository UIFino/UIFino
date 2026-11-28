"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { CodeViewer } from "@/components/patterns/code-viewer";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { SegmentedControl } from "@/components/primitives/segmented";
import { type AiRuleFormatId, getAiGuardrailPacks } from "@/core/ai-delivery";
import { useClipboard } from "@/hooks/use-clipboard";
import { useDownload } from "@/hooks/use-download";

export function McpSkillGuardrailsSection() {
  const locale = useLocale();
  const isZh = locale === "zh";
  const { copy } = useClipboard();
  const { downloadText } = useDownload();

  const packs = getAiGuardrailPacks();
  const [activeId, setActiveId] = useState<AiRuleFormatId>("claude-skill");
  const activePack = packs.find((p) => p.id === activeId) ?? packs[0]!;

  const installCmd =
    activeId === "claude-skill"
      ? "npx skills add uifino/skills --skill uifino-design-guardrails"
      : activeId === "cursor-mdc"
        ? "npx uifino@latest add skill/cursor-rules"
        : "npx uifino@latest init --brand linear";

  return (
    <div id="skill" className="band-full">
      <section className="shell-wrap grid gap-4 px-7 py-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="eyebrow-mono text-accent-text">
              {isZh ? "第 3 环 · AI 前端防丑护栏包" : "RING 03 · ANTI-AI-SLOP SKILL & RULES"}
            </div>
            <h2 className="heading-section mt-1">
              {isZh ? "Skill / Rules 常驻规范包" : "Installable Skill & Cursor Rules"}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <SegmentedControl
              options={packs.map((p) => ({ value: p.id, label: p.label }))}
              value={activeId}
              onChange={setActiveId}
            />
            <Button
              variant="hairline"
              size="sm"
              onClick={() => downloadText(activePack.filename, activePack.content)}
            >
              {isZh ? `下载 ${activePack.filename}` : `Download ${activePack.filename}`}
            </Button>
            <Button
              variant="contrast"
              size="sm"
              onClick={() => void copy(activePack.content, `Copied ${activePack.filename}`)}
            >
              {isZh ? "复制规则全文" : "Copy Rules"}
            </Button>
          </div>
        </div>

        <div className="border-hairline bg-surface flex flex-wrap items-center justify-between gap-3 border px-4 py-2.5">
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <Badge variant="accent">{activePack.targetPath}</Badge>
            <span className="text-muted">{isZh ? activePack.descZh : activePack.descEn}</span>
          </div>
          <button
            type="button"
            onClick={() => void copy(installCmd, "Copied install command")}
            className="text-accent-text cursor-pointer font-mono text-xs hover:underline"
          >
            $ {installCmd} ❐
          </button>
        </div>

        <CodeViewer
          code={activePack.content}
          lang={activePack.lang}
          title={activePack.targetPath}
          copyLabel={isZh ? "复制" : "Copy"}
          maxHeightClassName="max-h-[360px]"
        />
      </section>
    </div>
  );
}
