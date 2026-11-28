"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { SegmentedControl } from "@/components/primitives/segmented";
import { useClipboard } from "@/hooks/use-clipboard";

type CliFlavor = "uifino" | "shadcn";

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

  const [flavor, setFlavor] = useState<CliFlavor>("shadcn");
  const [origin, setOrigin] = useState("http://localhost:3000");

  useEffect(() => {
    if (typeof window !== "undefined" && window.location?.origin) {
      setOrigin(window.location.origin);
    }
  }, []);

  const cliList =
    flavor === "shadcn"
      ? [
          {
            cmd: `npx shadcn@latest add ${origin}/r/style-hairline-grid.json`,
            descZh: "直接用 shadcn CLI 写入细线网格 CSS 变量 + DESIGN.md",
            descEn: "Install Hairline Grid CSS vars + DESIGN.md via shadcn registry"
          },
          {
            cmd: `npx shadcn@latest add ${origin}/r/hero-telemetry-counter.json`,
            descZh: "安装纯组件与 Demo 分离代码 + tokens.css",
            descEn: "Add component + Demo.tsx + tokens.css into local components/"
          },
          {
            cmd: `npx shadcn@latest add ${origin}/r/design-linear.json`,
            descZh: "写入 Linear 标杆 DESIGN.md 与明暗令牌",
            descEn: "Install Linear DESIGN.md & dual-mode CSS variables"
          },
          {
            cmd: `npx shadcn@latest add ${origin}/r/tpl-obsidian-saas-kit.json`,
            descZh: "拉取整站工程令牌与路由结构指南",
            descEn: "Install Obsidian SaaS starter tokens & blueprint"
          }
        ]
      : [
          {
            cmd: `node scripts/uifino-cli.mjs init --brand linear --url ${origin}`,
            descZh: "一键写入项目 DESIGN.md 与 .mcp.json 接入配置",
            descEn: "Write root DESIGN.md + .mcp.json locally in one step"
          },
          {
            cmd: `node scripts/uifino-cli.mjs add style/hairline-grid --url ${origin}`,
            descZh: "拉取流派风格 CSS 变量与 DESIGN.md",
            descEn: "Install UI style genre CSS variables & DESIGN.md"
          },
          {
            cmd: `node scripts/uifino-cli.mjs add hero-telemetry-counter --url ${origin}`,
            descZh: "安装局部组件源码与演示文件",
            descEn: "Install component + Demo.tsx + tokens.css"
          },
          {
            cmd: `npx uifino@latest create obsidian-saas-kit`,
            descZh: "初始化整站工程模板",
            descEn: "Scaffold full Next.js starter template"
          }
        ];

  return (
    <div className="band-full">
      <section className="shell-wrap grid grid-cols-1 gap-6 px-7 py-7 lg:grid-cols-2">
        {/* Ring 02: CLI & shadcn Registry */}
        <div id="cli" className="border border-hairline bg-surface p-5">
          <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="eyebrow-mono text-accent-text">
                {isZh ? "第 2 环 · 注册表与命令行" : "RING 02 · SHADCN REGISTRY & CLI"}
              </div>
              <h2 className="heading-section mt-0.5 text-base">
                {isZh ? "兼容 shadcn 注册表与命令行" : "Registry & CLI Quick Reference"}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <SegmentedControl
                options={[
                  { value: "shadcn" as CliFlavor, label: "shadcn /r" },
                  { value: "uifino" as CliFlavor, label: "uifino CLI" }
                ]}
                value={flavor}
                onChange={setFlavor}
              />
              <a
                href="/r/registry.json"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-accent-text hover:underline"
              >
                /r/registry.json ↗
              </a>
            </div>
          </div>

          <div className="grid gap-2.5">
            {cliList.map((item) => (
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
            <div>
              <div className="eyebrow-mono text-accent-text">PROMPT RECIPES</div>
              <h2 className="heading-section mt-0.5 text-base">
                {isZh ? "复刻提示词库" : "Agent Prompt Recipes"}
              </h2>
            </div>
            <Badge variant="accent">Prompts</Badge>
          </div>

          <div className="grid gap-3">
            {PROMPT_RECIPES.map((pr) => (
              <div key={pr.tag} className="grid gap-2 border border-hairline bg-code p-3.5">
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
