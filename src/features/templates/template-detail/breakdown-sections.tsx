"use client";

import { ArrowUpRight, Blocks, Layers } from "lucide-react";
import { CodeViewer } from "@/components/patterns/code-viewer";
import { Badge } from "@/components/primitives/badge";
import { useClipboard } from "@/hooks/use-clipboard";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import {
  type StarterTemplateSpec,
  type TemplateDetailBundle,
  TemplateRouteMiniThumb
} from "@/registry/templates";

export interface TemplateBreakdownSectionsProps {
  readonly template: StarterTemplateSpec;
  readonly bundle: TemplateDetailBundle;
  readonly activePath: string;
  readonly isZh: boolean;
  readonly onPickRouteCard: (path: string) => void;
}

export function TemplateBreakdownSections({
  template,
  bundle,
  activePath,
  isZh,
  onPickRouteCard
}: TemplateBreakdownSectionsProps) {
  const { copy } = useClipboard();
  const swatches = [
    { role: isZh ? "画布底色 Canvas" : "Canvas", hex: template.canvas },
    { role: isZh ? "表面卡片 Surface" : "Surface", hex: template.surface },
    { role: isZh ? "细线描边 Border" : "Border", hex: template.border },
    { role: isZh ? "品牌强调色 Accent" : "Accent", hex: template.accent }
  ];

  return (
    <div className="grid gap-6">
      {/* 1. All Pages Included Thumbnail Matrix */}
      <section className="border border-hairline bg-surface p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-accent-text" />
            <h2 className="eyebrow-mono m-0 text-ink">
              {isZh
                ? `01 — 包含页面矩阵 (${bundle.routePages.length} 屏 / 路由)`
                : `01 — ALL PAGES INCLUDED (${bundle.routePages.length})`}
            </h2>
          </div>
          <span className="font-mono-ui text-[11px] text-subtle">
            {isZh ? "点击任意子页同步切换上方沙盒" : "Click any route to preview above"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {bundle.routePages.map((rp) => {
            const active = rp.path === activePath;
            return (
              <button
                key={rp.path}
                type="button"
                onClick={() => onPickRouteCard(rp.path)}
                className={cn(
                  "flex cursor-pointer flex-col gap-2.5 border p-3 text-left transition-colors",
                  active
                    ? "border-accent-border bg-accent-soft/40"
                    : "border-hairline bg-canvas hover:border-accent-border"
                )}
              >
                <TemplateRouteMiniThumb template={template} route={rp} />
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-semibold text-ink">
                      {isZh ? rp.labelZh : rp.labelEn}
                    </span>
                    <span className="font-mono text-[11px] text-accent-text">{rp.path}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[11.5px] leading-[1.45] text-muted">
                    {isZh ? rp.summaryZh : rp.summaryEn}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Included Blocks Linking Directly to Component Library */}
      <section className="border border-hairline bg-surface p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Blocks className="h-4 w-4 text-accent-text" />
            <h2 className="eyebrow-mono m-0 text-ink">
              {isZh
                ? `02 — 组成积木拆解（点击单独拿走某一块）`
                : "02 — INCLUDED BLOCKS (CLICK TO EXTRACT)"}
            </h2>
          </div>
          <Link
            href="/components"
            className="font-mono-ui text-xs text-muted hover:text-accent-text"
          >
            {isZh ? "全部组件库 →" : "All Components →"}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {bundle.includedBlocks.map((block) => (
            <Link
              key={block.id}
              href={block.href}
              className="group flex items-center justify-between gap-3 border border-hairline bg-canvas p-3.5 transition-colors hover:border-accent-border"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Badge>{isZh ? block.roleZh : block.roleEn}</Badge>
                </div>
                <div className="mt-2 truncate text-xs font-semibold text-ink group-hover:text-accent-text">
                  {isZh ? block.nameZh : block.nameEn}
                </div>
                <div className="mt-0.5 truncate font-mono text-[11px] text-subtle">
                  {block.id}
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-subtle transition-colors group-hover:text-accent-text" />
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Global Tokens, Fonts & Project Tree */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="grid content-start gap-4 border border-hairline bg-surface p-5">
          <div className="eyebrow-mono">
            {isZh ? "03 — 全局令牌与字体授权" : "03 — GLOBAL TOKENS & TYPOGRAPHY"}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {swatches.map((s) => (
              <button
                key={s.role}
                type="button"
                onClick={() => void copy(s.hex, `Copied ${s.hex}`)}
                className="flex cursor-pointer items-center gap-2.5 border border-hairline bg-canvas p-2.5 text-left transition-colors hover:border-accent-border"
              >
                <span
                  className="h-7 w-7 shrink-0 border border-hairline"
                  style={{ backgroundColor: s.hex }}
                />
                <div className="min-w-0">
                  <div className="truncate text-[11.5px] font-medium text-ink">{s.role}</div>
                  <div className="font-mono text-[11px] text-accent-text">{s.hex}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="grid gap-2 border border-hairline bg-code p-3.5 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted">{isZh ? "字体配对" : "Font Stack"}</span>
              <span className="font-mono font-semibold text-ink">
                {bundle.fontDisplay} / {bundle.fontBody} / {bundle.fontMono}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-hairline pt-2">
              <span className="text-muted">{isZh ? "商用授权" : "License"}</span>
              <span className="text-emerald-400">
                {isZh ? bundle.licenseNoteZh : bundle.licenseNoteEn}
              </span>
            </div>
          </div>
        </div>

        <CodeViewer
          code={bundle.directoryTree}
          lang="bash"
          title={isZh ? "Next.js 工程目录树" : "Next.js App Router Tree"}
          copyLabel={isZh ? "复制目录" : "Copy Tree"}
        />
      </section>
    </div>
  );
}
