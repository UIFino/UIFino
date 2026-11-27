"use client";

import { useLocale, useTranslations } from "next-intl";
import { CodeViewer } from "@/components/patterns/code-viewer";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { Link, useRouter } from "@/i18n/navigation";
import { findCatalogBrandById } from "@/registry/catalog";
import { type StarterTemplateSpec, TemplatePreviewFrame } from "@/registry/templates";
import { useWorkbenchPresetStore } from "@/stores/workbench-preset.store";

export function TemplateDetailView({ template }: { readonly template: StarterTemplateSpec }) {
  const t = useTranslations("templates");
  const locale = useLocale();
  const isZh = locale === "zh";
  const router = useRouter();
  const applyBrandSkin = useWorkbenchPresetStore((s) => s.applyBrandSkin);

  const cliSnippet = `npx uifino@latest create ${template.id}\ncd ${template.id}\npnpm dev`;

  return (
    <div className="band-full">
      <div className="shell-wrap px-7 py-8">
        <nav className="font-mono-ui flex items-center gap-1.5 text-xs text-muted">
          <Link href="/templates" className="hover:text-ink">
            Templates
          </Link>
          <span>/</span>
          <span>{template.category}</span>
          <span>/</span>
          <span className="text-ink">{template.id}</span>
        </nav>

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-4">
            <TemplatePreviewFrame template={template} />
            <div className="border border-hairline bg-surface p-5">
              <div className="eyebrow-mono mb-3">{t("includedRoutes")}</div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {template.routes.map((route, i) => (
                  <div
                    key={route}
                    className="flex items-center justify-between border border-hairline bg-code px-3 py-2 font-mono text-xs"
                  >
                    <span className="truncate text-ink">{route}</span>
                    <span className="text-subtle">0{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-5 border border-hairline bg-surface p-6">
            <div className="grid gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent">{template.category}</Badge>
                <Badge>{template.stack}</Badge>
              </div>
              <h1 className="heading-page">{isZh ? template.nameZh : template.name}</h1>
              <p className="text-sm leading-[1.6] text-muted">
                {isZh ? template.descZh : template.descEn}
              </p>

              <CodeViewer code={cliSnippet} lang="bash" title="Quickstart CLI" />
            </div>

            <div className="grid gap-2.5 border-t border-hairline pt-4">
              <Link
                href={
                  findCatalogBrandById(template.skinId)
                    ? `/catalog/${template.skinId}`
                    : `/styles/${template.skinId}`
                }
                className="font-mono-ui text-xs text-muted hover:text-ink"
              >
                Protocol: <span className="text-accent-text">{template.skinLabel}</span> →
              </Link>
              <Button
                variant="lime"
                size="lg"
                onClick={() => {
                  applyBrandSkin(template.skinId);
                  router.push(`/components/hero/hero-telemetry-counter?skin=${template.skinId}`);
                }}
                className="w-full"
              >
                {t("openWorkbench")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
