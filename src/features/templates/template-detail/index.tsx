"use client";

import { useState } from "react";
import { ExternalLink, Sparkles, Terminal } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { ViewportSize } from "@/components/patterns/viewport-frame";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import type { ThemeMode } from "@/core/tokens";
import { useClipboard } from "@/hooks/use-clipboard";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { findCatalogBrandById } from "@/registry/catalog";
import {
  getTemplateDetailBundle,
  type StarterTemplateSpec,
  TEMPLATE_ITEMS
} from "@/registry/templates";
import { useWorkbenchPresetStore } from "@/stores/workbench-preset.store";
import { TemplateBreakdownSections } from "./breakdown-sections";
import { TemplateSandboxCard } from "./sandbox-card";

const STARTER_ITEMS = TEMPLATE_ITEMS.filter((t) => t.kind === "starter");
const PAGE_ITEMS = TEMPLATE_ITEMS.filter((t) => t.kind === "page");

export function TemplateDetailView({ template }: { readonly template: StarterTemplateSpec }) {
  const t = useTranslations("templates");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isZh = locale === "zh";
  const router = useRouter();
  const { copy } = useClipboard();
  const applyBrandSkin = useWorkbenchPresetStore((s) => s.applyBrandSkin);

  const bundle = getTemplateDetailBundle(template);
  const [activePath, setActivePath] = useState<string>(bundle.routePages[0]?.path ?? "/");
  const [viewport, setViewport] = useState<ViewportSize>("desktop");
  const [mode, setMode] = useState<ThemeMode>("dark");

  const cliSnippet = `npx uifino@latest create ${template.id}`;
  const isolatedHref = `/preview/templates/${template.id}?route=${encodeURIComponent(activePath)}&mode=${mode}`;

  const handlePickRouteCard = (path: string) => {
    setActivePath(path);
    const el = document.getElementById("tpl-sandbox");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goodFor = isZh ? bundle.goodForZh : bundle.goodForEn;
  const notFor = isZh ? bundle.notForZh : bundle.notForEn;

  return (
    <div className="band-full">
      <div className="shell-wrap grid grid-cols-1 lg:grid-cols-[248px_minmax(0,1fr)]">
        {/* Left Contextual Templates Rail */}
        <aside className="order-2 border-t border-hairline bg-canvas px-3.5 py-4 lg:sticky lg:top-[var(--header-h)] lg:order-1 lg:h-[calc(100dvh-var(--header-h))] lg:overflow-y-auto lg:border-t-0 lg:border-r">
          <Link
            href="/templates"
            className="font-mono-ui mb-2.5 flex items-center px-2.5 py-1.5 text-[11.5px] text-muted hover:bg-surface-hover hover:text-ink"
          >
            ← {t("allTemplates")}
          </Link>

          <div className="eyebrow-mono px-2.5 py-1.5">
            {isZh ? "整站工程" : "STARTER KITS"}
          </div>
          {STARTER_ITEMS.map((item) => {
            const active = item.id === template.id;
            return (
              <Link
                key={item.id}
                href={`/templates/${item.id}`}
                className={cn(
                  "flex items-center justify-between gap-2 border-l-2 px-2.5 py-1.5 text-[12.5px] transition-colors",
                  active
                    ? "border-l-accent-text bg-surface font-semibold text-ink"
                    : "border-l-transparent text-muted hover:bg-surface-hover hover:text-ink"
                )}
              >
                <span className="truncate">{isZh ? item.nameZh : item.name}</span>
                <span
                  className="inline-block h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: item.accent }}
                />
              </Link>
            );
          })}

          <div className="eyebrow-mono px-2.5 pt-4 pb-1.5">
            {isZh ? "单页模板" : "PAGE TEMPLATES"}
          </div>
          {PAGE_ITEMS.map((item) => {
            const active = item.id === template.id;
            return (
              <Link
                key={item.id}
                href={`/templates/${item.id}`}
                className={cn(
                  "flex items-center justify-between gap-2 border-l-2 px-2.5 py-1.5 text-[12.5px] transition-colors",
                  active
                    ? "border-l-accent-text bg-surface font-semibold text-ink"
                    : "border-l-transparent text-muted hover:bg-surface-hover hover:text-ink"
                )}
              >
                <span className="truncate">{isZh ? item.nameZh : item.name}</span>
                <span
                  className="inline-block h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: item.accent }}
                />
              </Link>
            );
          })}
        </aside>

        {/* Right Full-Width Main Workspace */}
        <div className="order-1 min-w-0 lg:order-2">
          <div className="detail-center-frame">
            {/* Compact Header + 4 Primary Actions + Positive/Negative Fit Bar */}
            <div className="border-b border-hairline px-7 pt-7 pb-6">
              <nav className="font-mono-ui flex flex-wrap items-center gap-1.5 text-xs text-muted">
                <Link href="/templates" className="hover:text-ink">
                  {tCommon("navTemplates")}
                </Link>
                <span>/</span>
                <span>{template.category}</span>
                <span>/</span>
                <span className="text-ink">{template.id}</span>
              </nav>

              <div className="mt-3 flex flex-col justify-between gap-4 xl:flex-row xl:items-start">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="m-0 text-[clamp(24px,2.6vw,32px)] font-semibold tracking-[-0.02em] text-ink">
                      {isZh ? template.nameZh : template.name}
                    </h1>
                    <Badge variant="accent">
                      {template.kind === "starter"
                        ? isZh
                          ? "整站工程"
                          : "Starter Kit"
                        : isZh
                          ? "单页模板"
                          : "Page Kit"}
                    </Badge>
                    <Badge>{template.stack}</Badge>
                    <Link
                      href={
                        findCatalogBrandById(template.skinId)
                          ? `/catalog/${template.skinId}`
                          : `/styles/${template.skinId}`
                      }
                      className="font-mono text-xs text-accent-text hover:underline"
                    >
                      {template.skinLabel} →
                    </Link>
                  </div>

                  <p className="mt-2.5 max-w-[780px] text-[14.5px] leading-[1.6] text-body">
                    {isZh ? template.descZh : template.descEn}
                  </p>
                </div>

                {/* 4 Action Buttons */}
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <Link href={isolatedHref} target="_blank" rel="noreferrer">
                    <Button variant="lime" size="md" className="gap-1.5">
                      <span>{t("openLiveSandbox")}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                  <Button
                    variant="contrast"
                    size="md"
                    onClick={() =>
                      void copy(
                        bundle.aiPrompt,
                        isZh ? "已复制整站 AI 复刻指令" : "Copied AI template prompt"
                      )
                    }
                    className="gap-1.5"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{t("copyAiPrompt")}</span>
                  </Button>
                  <Button
                    variant="hairline"
                    size="md"
                    onClick={() => void copy(bundle.cssVariables, "Copied template CSS variables")}
                  >
                    {t("copyCss")}
                  </Button>
                  <Button
                    variant="hairline"
                    size="md"
                    onClick={() => void copy(cliSnippet, "Copied CLI command")}
                    className="gap-1.5"
                  >
                    <Terminal className="h-3.5 w-3.5" />
                    <span>{t("copyCli")}</span>
                  </Button>
                </div>
              </div>

              {/* Fit Bar */}
              <div className="mt-5 grid grid-cols-1 gap-2.5 lg:grid-cols-2">
                <div className="flex flex-wrap items-center gap-2 border border-hairline bg-surface px-3.5 py-2.5 text-xs">
                  <span className="font-mono-ui shrink-0 font-semibold text-accent-text">
                    ✓ {t("fitGood")}
                  </span>
                  <span className="text-ink">{goodFor.join(" · ")}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 border border-hairline bg-surface px-3.5 py-2.5 text-xs">
                  <span className="font-mono-ui shrink-0 font-semibold text-subtle">
                    ✕ {t("fitAvoid")}
                  </span>
                  <span className="text-muted">{notFor.join(" · ")}</span>
                </div>
              </div>
            </div>

            {/* Sandbox + 3 Breakdown Modules */}
            <div className="grid gap-6 px-7 py-6">
              <TemplateSandboxCard
                template={template}
                routes={bundle.routePages}
                activePath={activePath}
                viewport={viewport}
                mode={mode}
                isZh={isZh}
                onSelectRoute={setActivePath}
                onViewportChange={setViewport}
                onModeChange={setMode}
              />

              <TemplateBreakdownSections
                template={template}
                bundle={bundle}
                activePath={activePath}
                isZh={isZh}
                onPickRouteCard={handlePickRouteCard}
              />

              <div className="flex flex-wrap items-center justify-between gap-3 border border-hairline bg-surface p-4">
                <div className="text-xs text-muted">
                  {isZh
                    ? `一键套用「${template.skinLabel}」到三栏组件工作台自由组合模块`
                    : `Apply ${template.skinLabel} across all components in the interactive workbench`}
                </div>
                <Button
                  variant="hairline"
                  size="md"
                  onClick={() => {
                    applyBrandSkin(template.skinId);
                    router.push(`/components/hero/hero-telemetry-counter?skin=${template.skinId}`);
                  }}
                >
                  {t("openWorkbench")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
