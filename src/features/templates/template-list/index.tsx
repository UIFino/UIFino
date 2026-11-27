"use client";

import { useLocale, useTranslations } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { FilterToolbar } from "@/components/patterns/filter-bar";
import { EmptyState } from "@/components/patterns/state-views";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { SearchInput } from "@/components/primitives/input";
import { SegmentedControl } from "@/components/primitives/segmented";
import { useClipboard } from "@/hooks/use-clipboard";
import { Link, useRouter } from "@/i18n/navigation";
import {
  TEMPLATE_CATEGORIES,
  TEMPLATE_ITEMS,
  type TemplateCategoryFilter,
  TemplatePreviewFrame
} from "@/registry/templates";
import { useWorkbenchPresetStore } from "@/stores/workbench-preset.store";

export function TemplatesListView() {
  const t = useTranslations("templates");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isZh = locale === "zh";
  const router = useRouter();
  const { copy } = useClipboard();
  const applyBrandSkin = useWorkbenchPresetStore((s) => s.applyBrandSkin);

  const [catRaw, setCategory] = useQueryState("category", parseAsString.withDefault("All"));
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));

  const category: TemplateCategoryFilter = TEMPLATE_CATEGORIES.includes(
    catRaw as TemplateCategoryFilter
  )
    ? (catRaw as TemplateCategoryFilter)
    : "All";

  const q = search.trim().toLowerCase();
  const filtered = TEMPLATE_ITEMS.filter((item) => {
    const catOk = category === "All" || item.category === category;
    const qOk =
      !q ||
      [
        item.name,
        item.nameZh,
        item.category,
        item.stack,
        item.skinLabel,
        ...item.routes,
        item.descEn,
        item.descZh
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    return catOk && qOk;
  });

  const handleOpenInWorkbench = (skinId: string) => {
    applyBrandSkin(skinId);
    router.push(`/components/landing-pages/page-devtools-launch?skin=${skinId}`);
  };

  return (
    <div className="band-full">
      <section className="shell-wrap">
        <FilterToolbar
          left={
            <>
              <SegmentedControl
                options={TEMPLATE_CATEGORIES.map((c) => ({ value: c, label: c }))}
                value={category}
                onChange={(v) => void setCategory(v)}
              />
              <SearchInput
                value={search}
                onChange={(e) => void setSearch(e.target.value)}
                placeholder={t("searchPlaceholder")}
                wrapperClassName="w-[220px]"
              />
            </>
          }
          right={
            <span className="font-mono-ui text-xs text-muted">
              {t("kitsCount", { count: filtered.length })}
            </span>
          }
        />

        {filtered.length === 0 ? (
          <EmptyState
            title={tCommon("emptyResult")}
            actionLabel={tCommon("resetFilter")}
            onReset={() => {
              void setCategory("All");
              void setSearch("");
            }}
          />
        ) : (
          <div className="lined-grid-2">
            {filtered.map((tpl) => {
              const cliCmd = `npx uifino@latest create ${tpl.id}`;
              return (
                <div
                  key={tpl.id}
                  className="lined-cell flex flex-col justify-between gap-4 p-[22px]"
                >
                  <div>
                    <Link href={`/templates/${tpl.id}`} className="block">
                      <TemplatePreviewFrame template={tpl} />
                    </Link>
                    <div className="mt-4 flex items-center justify-between gap-2.5">
                      <Link
                        href={`/templates/${tpl.id}`}
                        className="text-base font-semibold text-ink hover:text-accent-text"
                      >
                        {isZh ? tpl.nameZh : tpl.name}
                      </Link>
                      <Badge>{tpl.stack}</Badge>
                    </div>
                    <p className="mt-1.5 text-[13px] leading-[1.55] text-muted">
                      {isZh ? tpl.descZh : tpl.descEn}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-[5px]">
                      {tpl.routes.map((r) => (
                        <Badge key={r}>{r}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-hairline pt-3">
                    <Link
                      href={`/catalog/${tpl.skinId}`}
                      className="font-mono-ui text-xs text-muted hover:text-ink"
                    >
                      Skin: <span className="text-accent-text">{tpl.skinLabel}</span> →
                    </Link>
                    <div className="flex gap-2">
                      <Button
                        variant="hairline"
                        size="sm"
                        onClick={() => void copy(cliCmd, "Copied template CLI")}
                        className="font-mono text-[11.5px]"
                      >
                        Copy CLI
                      </Button>
                      <Button
                        variant="contrast"
                        size="sm"
                        onClick={() => handleOpenInWorkbench(tpl.skinId)}
                      >
                        {t("openWorkbench")}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
