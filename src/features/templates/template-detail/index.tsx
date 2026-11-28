"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Terminal
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { ViewportSize } from "@/components/patterns/viewport-frame";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { SearchInput } from "@/components/primitives/input";
import type { ThemeMode } from "@/core/tokens";
import { useClipboard } from "@/hooks/use-clipboard";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { findCatalogBrandById } from "@/registry/catalog";
import {
  getTemplateDetailBundle,
  PAGE_SCENES,
  STARTER_SCENES,
  type StarterTemplateSpec,
  TEMPLATE_ITEMS,
  TEMPLATE_SCENE_LABELS,
  type TemplateSceneFilter
} from "@/registry/templates";
import { useWorkbenchPresetStore } from "@/stores/workbench-preset.store";
import { TemplateBreakdownSections } from "./breakdown-sections";
import { TemplateSandboxCard } from "./sandbox-card";

const STARTER_ITEMS = TEMPLATE_ITEMS.filter((t) => t.kind === "starter");
const PAGE_ITEMS = TEMPLATE_ITEMS.filter((t) => t.kind === "page");
const SCENE_OPTIONS: readonly TemplateSceneFilter[] = ["all", ...STARTER_SCENES, ...PAGE_SCENES];

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

  // Left template rail search, scene filter & collapsible directory state
  const [railSearch, setRailSearch] = useState("");
  const [railScene, setRailScene] = useState<TemplateSceneFilter>("all");
  const [openGroups, setOpenGroups] = useState<{ starter: boolean; page: boolean }>({
    starter: true,
    page: true
  });

  const q = railSearch.trim().toLowerCase();
  const matchesRail = (item: StarterTemplateSpec) => {
    const sceneOk = railScene === "all" || item.scene === railScene;
    const qOk =
      !q ||
      `${item.name} ${item.nameZh} ${item.id} ${item.category} ${item.routes.join(" ")}`
        .toLowerCase()
        .includes(q);
    return sceneOk && qOk;
  };

  const filteredStarters = STARTER_ITEMS.filter(matchesRail);
  const filteredPages = PAGE_ITEMS.filter(matchesRail);

  const currentIdx = Math.max(
    0,
    TEMPLATE_ITEMS.findIndex((it) => it.id === template.id)
  );
  const prevTpl =
    TEMPLATE_ITEMS[(currentIdx - 1 + TEMPLATE_ITEMS.length) % TEMPLATE_ITEMS.length] ?? template;
  const nextTpl = TEMPLATE_ITEMS[(currentIdx + 1) % TEMPLATE_ITEMS.length] ?? template;

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
      <div className="shell-wrap grid grid-cols-1 lg:grid-cols-[208px_minmax(0,1fr)]">
        {/* Left Sticky Templates Tree Rail (Aligned 1:1 with Catalog & Styles) */}
        <aside className="border-hairline bg-canvas order-2 border-t pb-3 lg:sticky lg:top-[var(--header-h)] lg:order-1 lg:h-[calc(100dvh-var(--header-h))] lg:overflow-y-auto lg:border-t-0 lg:border-r">
          <div className="border-hairline flex min-h-[44px] items-center border-b px-3">
            <Link
              href="/templates"
              className="group border-hairline bg-surface text-ink hover:border-strong flex h-7 w-full items-center justify-between border px-2.5 text-xs font-medium transition-colors hover:bg-gray-100"
            >
              <span className="flex items-center gap-1.5">
                <ArrowLeft className="text-muted group-hover:text-ink h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>{t("allTemplates")}</span>
              </span>
              <span className="text-subtle group-hover:text-muted font-mono text-[10.5px]">
                {TEMPLATE_ITEMS.length}
              </span>
            </Link>
          </div>

          <div className="my-3 grid gap-1.5 px-3">
            <SearchInput
              value={railSearch}
              onChange={(e) => setRailSearch(e.target.value)}
              placeholder={isZh ? "搜模板 / 路由…" : "Filter kits…"}
              wrapperClassName="h-7 px-2"
              className="text-[11.5px]"
            />

            <select
              aria-label={isZh ? "按模板场景筛选" : "Filter by scene"}
              value={railScene}
              onChange={(e) => setRailScene(e.target.value as TemplateSceneFilter)}
              className="border-hairline bg-surface text-ink h-7 w-full cursor-pointer border px-2 text-[11px]"
            >
              {SCENE_OPTIONS.map((sc) => (
                <option key={sc} value={sc}>
                  {isZh ? TEMPLATE_SCENE_LABELS[sc].zh : TEMPLATE_SCENE_LABELS[sc].en}
                </option>
              ))}
            </select>
          </div>

          {filteredStarters.length === 0 && filteredPages.length === 0 ? (
            <div className="text-muted px-3 py-4 text-center text-[11.5px]">
              <div>{isZh ? "没有匹配模板" : "No matches"}</div>
              <button
                type="button"
                onClick={() => {
                  setRailSearch("");
                  setRailScene("all");
                }}
                className="text-accent-text mt-1.5 cursor-pointer font-mono text-[11px] hover:underline"
              >
                {isZh ? "重置筛选" : "Reset"}
              </button>
            </div>
          ) : null}

          {[
            {
              id: "starter" as const,
              label: isZh ? "整站工程" : "Starters",
              items: filteredStarters
            },
            {
              id: "page" as const,
              label: isZh ? "单页模板" : "Pages",
              items: filteredPages
            }
          ].map((group) => {
            if (group.items.length === 0) return null;
            const expanded = Boolean(q || railScene !== "all" || openGroups[group.id]);

            return (
              <div key={group.id} className="mb-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setOpenGroups((prev) => ({ ...prev, [group.id]: !prev[group.id] }))
                  }
                  aria-expanded={expanded}
                  className="hover:bg-surface-hover flex w-full cursor-pointer items-center justify-between px-3 py-1.5 text-left text-[12.5px] transition-colors"
                >
                  <span
                    className={cn(
                      "flex items-center gap-1.5",
                      expanded ? "text-ink font-semibold" : "text-muted font-medium"
                    )}
                  >
                    {expanded ? (
                      <ChevronDown className="text-muted h-3.5 w-3.5 shrink-0" />
                    ) : (
                      <ChevronRight className="text-subtle h-3.5 w-3.5 shrink-0" />
                    )}
                    <span>{group.label}</span>
                  </span>
                  <span className="text-subtle font-mono text-[11px]">{group.items.length}</span>
                </button>

                {expanded ? (
                  <div className="border-hairline ml-[19px] border-l py-0.5">
                    {group.items.map((item) => {
                      const active = item.id === template.id;
                      return (
                        <Link
                          key={item.id}
                          href={`/templates/${item.id}`}
                          className={cn(
                            "flex items-center gap-2 border-r-2 py-1.5 pr-3 pl-3.5 text-[12.5px] transition-colors",
                            active
                              ? "border-r-accent-text bg-elevated text-ink font-semibold"
                              : "text-muted hover:bg-surface-hover hover:text-ink border-r-transparent"
                          )}
                        >
                          <span
                            className="inline-block h-2 w-2 shrink-0 rounded-full"
                            style={{ backgroundColor: item.accent }}
                          />
                          <span className="truncate">{isZh ? item.nameZh : item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </aside>

        {/* Right Full-Width Main Workspace */}
        <div className="order-1 min-w-0 lg:order-2">
          {/* Top 44px Sticky Breadcrumb & Prev/Next Switcher Strip */}
          <div className="border-hairline bg-canvas sticky top-[var(--header-h)] z-20 flex min-h-[44px] flex-wrap items-center justify-between gap-2 border-b px-4">
            <nav className="font-mono-ui text-muted flex flex-wrap items-center gap-1.5 text-xs">
              <Link href="/templates" className="hover:text-ink">
                {tCommon("navTemplates")}
              </Link>
              <span>/</span>
              <span>{template.category}</span>
              <span>/</span>
              <span className="text-ink">{isZh ? template.nameZh : template.name}</span>
            </nav>

            <div className="flex items-center gap-2">
              <Badge variant="accent">
                {template.kind === "starter"
                  ? isZh
                    ? "整站工程"
                    : "Starter"
                  : isZh
                    ? "单页模板"
                    : "Page Kit"}
              </Badge>
              <Badge>{template.stack}</Badge>

              <div className="border-hairline bg-code inline-flex items-stretch border">
                <Link
                  href={`/templates/${prevTpl.id}`}
                  title={isZh ? `上一套：${prevTpl.nameZh}` : `Previous: ${prevTpl.name}`}
                  aria-label={`Previous: ${prevTpl.name}`}
                  className="border-hairline text-muted hover:bg-surface-hover hover:text-ink inline-flex h-[30px] w-[30px] items-center justify-center border-r transition-colors"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href={`/templates/${nextTpl.id}`}
                  title={isZh ? `下一套：${nextTpl.nameZh}` : `Next: ${nextTpl.name}`}
                  aria-label={`Next: ${nextTpl.name}`}
                  className="text-muted hover:bg-surface-hover hover:text-ink inline-flex h-[30px] w-[30px] items-center justify-center transition-colors"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="detail-center-frame">
            {/* Compact Header + 4 Primary Actions + Positive/Negative Fit Bar */}
            <div className="border-hairline border-b px-7 pt-6 pb-5">
              <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-start">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="text-ink m-0 text-[clamp(24px,2.6vw,32px)] font-semibold tracking-[-0.02em]">
                      {isZh ? template.nameZh : template.name}
                    </h1>
                    <Link
                      href={
                        findCatalogBrandById(template.skinId)
                          ? `/catalog/${template.skinId}`
                          : `/styles/${template.skinId}`
                      }
                      className="text-accent-text font-mono text-xs hover:underline"
                    >
                      {template.skinLabel} →
                    </Link>
                  </div>

                  <p className="text-body mt-2 max-w-[780px] text-[14.5px] leading-[1.6]">
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
                <div className="border-hairline bg-surface flex flex-wrap items-center gap-2 border px-3.5 py-2.5 text-xs">
                  <span className="font-mono-ui text-accent-text shrink-0 font-semibold">
                    ✓ {t("fitGood")}
                  </span>
                  <span className="text-ink">{goodFor.join(" · ")}</span>
                </div>
                <div className="border-hairline bg-surface flex flex-wrap items-center gap-2 border px-3.5 py-2.5 text-xs">
                  <span className="font-mono-ui text-subtle shrink-0 font-semibold">
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

              <div className="border-hairline bg-surface flex flex-wrap items-center justify-between gap-3 border p-4">
                <div className="text-muted text-xs">
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
