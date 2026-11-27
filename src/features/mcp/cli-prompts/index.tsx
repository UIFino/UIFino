"use client";

import { useLocale } from "next-intl";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { useClipboard } from "@/hooks/use-clipboard";

const CLI_COMMANDS = [
  { cmd: "npx uifino@latest add design/linear", descZh: "拉取品牌 DESIGN.md 规范", descEn: "Pull brand DESIGN.md spec" },
  { cmd: "npx uifino@latest add style/hairline-grid", descZh: "拉取流派风格 DESIGN.md", descEn: "Pull UI style genre spec" },
  { cmd: "npx uifino@latest add section/hero-telemetry-counter", descZh: "安装局部组件源码", descEn: "Add component block (.tsx)" },
  { cmd: "npx uifino@latest create obsidian-saas-kit", descZh: "初始化整站工程模板", descEn: "Scaffold starter template" }
] as const;

const PROMPT_RECIPES = [
  {
    tag: "Catalog + Blocks",
    titleZh: "按标杆品牌复刻登录与定价页",
    titleEn: "Replicate Brand Spec on Auth & Pricing",
    prompt:
      "Use UIFino MCP to fetch Linear DESIGN.md and style/hairline-grid, then build a Passkey login card and 3-tier pricing section strictly following its 1px border and tabular-nums guardrails."
  },
  {
    tag: "Styles + Tokens",
    titleZh: "为现有后台一键切换清爽商务风格",
    titleEn: "Restyle Dashboard with Clean SaaS Tokens",
    prompt:
      "Fetch style/clean-saas and compute_surface_tokens (seed #4F46E5) from UIFino MCP. Refactor our dashboard KPI cards and audit table to 8px radius, #F8FAFC canvas, and AA-compliant slate contrast."
  }
] as const;

export function McpCliAndPromptsSection() {
  const locale = useLocale();
  const isZh = locale === "zh";
  const { copy } = useClipboard();

  return (
    <div className="band-full">
      <section className="shell-wrap grid grid-cols-1 gap-6 px-7 py-7 lg:grid-cols-2">
        {/* CLI Reference */}
        <div id="cli" className="border border-hairline bg-surface p-5">
          <div className="mb-3.5 flex items-center justify-between">
            <h2 className="heading-section m-0 text-base">
              {isZh ? "CLI 命令行速查" : "CLI Quick Reference"}
            </h2>
            <Badge>npx uifino@latest</Badge>
          </div>

          <div className="grid gap-2.5">
            {CLI_COMMANDS.map((item) => (
              <div
                key={item.cmd}
                className="flex items-center justify-between gap-3 border border-hairline bg-code px-3.5 py-2.5"
              >
                <div className="min-w-0">
                  <div className="truncate font-mono text-xs text-ink">$ {item.cmd}</div>
                  <div className="mt-0.5 text-[11.5px] text-muted">
                    {isZh ? item.descZh : item.descEn}
                  </div>
                </div>
                <Button
                  variant="hairline"
                  size="sm"
                  onClick={() => void copy(item.cmd, "Copied CLI command")}
                >
                  Copy
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Ready-to-Use AI Prompts */}
        <div id="prompts" className="border border-hairline bg-surface p-5">
          <div className="mb-3.5 flex items-center justify-between">
            <h2 className="heading-section m-0 text-base">
              {isZh ? "复刻提示词库" : "Agent Prompt Recipes"}
            </h2>
            <Badge variant="accent">Prompts</Badge>
          </div>

          <div className="grid gap-3">
            {PROMPT_RECIPES.map((pr) => (
              <div
                key={pr.tag}
                className="grid gap-2 border border-hairline bg-code p-3.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-ink">
                    {isZh ? pr.titleZh : pr.titleEn}
                  </span>
                  <Badge>{pr.tag}</Badge>
                </div>
                <p className="m-0 font-mono text-[11.5px] leading-[1.55] text-muted">
                  {pr.prompt}
                </p>
                <div className="flex justify-end">
                  <Button
                    variant="hairline"
                    size="sm"
                    onClick={() => void copy(pr.prompt, "Copied prompt recipe")}
                  >
                    {isZh ? "复制提示词" : "Copy Prompt"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
