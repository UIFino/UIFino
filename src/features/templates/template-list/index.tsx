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
import { findCatalogBrandById } from "@/registry/catalog";
import {
  PAGE_SCENES,
  STARTER_SCENES,
  TEMPLATE_ITEMS,
  TEMPLATE_KIND_LABELS,
  TEMPLATE_SCENE_LABELS,
  type TemplateKindFilter,
  type TemplateScene,
  type TemplateSceneFilter,
  TemplateSpecimen
} from "@/registry/templates";
import { useWorkbenchPresetStore } from "@/stores/workbench-preset.store";

const ALL_SCENES: readonly TemplateScene[] = [...STARTER_SCENES, ...PAGE_SCENES];

export function TemplatesListView() {
  const t = useTranslations("templates");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isZh = locale === "zh";
  const router = useRouter();
  const { copy } = useClipboard();
  const applyBrandSkin = useWorkbenchPresetStore((s) => s.applyBrandSkin);

  const [kindRaw, setKind] = useQueryState("kind", parseAsString.withDefault("all"));
  const [sceneRaw, setScene] = useQueryState("scene", parseAsString.withDefault("all"));
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));

  const kind: TemplateKindFilter = kindRaw === "starter" || kindRaw === "page" ? kindRaw : "all";
  const scene: TemplateSceneFilter = ALL_SCENES.includes(sceneRaw as TemplateScene)
    ? (sceneRaw as TemplateScene)
    : "all";

  const sceneOptions: readonly TemplateSceneFilter[] =
    kind === "starter"
      ? ["all", ...STARTER_SCENES]
      : kind === "page"
        ? ["all", ...PAGE_SCENES]
        : ["all", "saas", "ai-studio", "admin", "docs", "landing", "pricing"];

  const q = search.trim().toLowerCase();
  const filtered = TEMPLATE_ITEMS.filter((item) => {
    const kindOk = kind === "all" || item.kind === kind;
    const sceneOk = scene === "all" || item.scene === scene;
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
    return kindOk && sceneOk && qOk;
  });

  const handleOpenInWorkbench = (skinId: string) => {
    applyBrandSkin(skinId);
    router.push(`/components/hero/hero-telemetry-counter?skin=${skinId}`);
  };

  return (
    <div className="band-full">
      <section className="shell-wrap">
        <FilterToolbar
          left={
            <>
              <SegmentedControl
                options={(["all", "starter", "page"] as const).map((k) => ({
                  value: k,
                  label: isZh ? TEMPLATE_KIND_LABELS[k].zh : TEMPLATE_KIND_LABELS[k].en
                }))}
                value={kind}
                onChange={(nextKind) => {
                  void setKind(nextKind);
                  void setScene("all");
                }}
              />
              <SegmentedControl
                options={sceneOptions.map((s) => ({
                  value: s,
                  label: isZh ? TEMPLATE_SCENE_LABELS[s].zh : TEMPLATE_SCENE_LABELS[s].en
                }))}
                value={sceneOptions.includes(scene) ? scene : "all"}
                onChange={(v) => void setScene(v)}
              />
              <SearchInput
                value={search}
                onChange={(e) => void setSearch(e.target.value)}
                placeholder={t("searchPlaceholder")}
                wrapperClassName="w-[200px]"
              />
            </>
          }
          right={
            <span className="font-mono-ui text-muted text-xs">
              {t("kitsCount", { count: filtered.length })}
            </span>
          }
        />

        {filtered.length === 0 ? (
          <EmptyState
            title={tCommon("emptyResult")}
            actionLabel={tCommon("resetFilter")}
            onReset={() => {
              void setKind("all");
              void setScene("all");
              void setSearch("");
            }}
          />
        ) : (
          <div className="lined-grid-3">
            {filtered.map((tpl) => {
              const cliCmd = `npx uifino@latest create ${tpl.id}`;
              const skinHref = findCatalogBrandById(tpl.skinId)
                ? `/catalog/${tpl.skinId}`
                : `/styles/${tpl.skinId}`;
              return (
                <div
                  key={tpl.id}
                  className="lined-cell flex flex-col justify-between gap-4 p-[22px]"
                >
                  <div>
                    <Link href={`/templates/${tpl.id}`} className="block">
                      <TemplateSpecimen template={tpl} />
                    </Link>
                    <div className="mt-4 flex items-center justify-between gap-2.5">
                      <Link
                        href={`/templates/${tpl.id}`}
                        className="text-ink hover:text-accent-text text-base font-semibold"
                      >
                        {isZh ? tpl.nameZh : tpl.name}
                      </Link>
                      <Badge>{tpl.stack}</Badge>
                    </div>
                    <p className="text-muted mt-1.5 text-[13px] leading-[1.55]">
                      {isZh ? tpl.descZh : tpl.descEn}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-[5px]">
                      {tpl.routes.map((r) => (
                        <Badge key={r}>{r}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="border-hairline flex flex-wrap items-center justify-between gap-2.5 border-t pt-3">
                    <Link
                      href={skinHref}
                      className="font-mono-ui text-muted hover:text-ink text-xs"
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
