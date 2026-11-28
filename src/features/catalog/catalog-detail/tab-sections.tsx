"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/primitives/badge";
import type { CatalogBrandSpec } from "@/core/design-md";
import { CatalogBlueprintSections } from "./blueprint-preview";

export function CatalogSectionsTab({
  item,
  isZh
}: {
  readonly item: CatalogBrandSpec;
  readonly isZh: boolean;
}) {
  const t = useTranslations("catalog");
  const slices = item.scraped?.sections ?? [];

  if (slices.length === 0) {
    return <CatalogBlueprintSections item={item} isZh={isZh} />;
  }

  return (
    <div className="grid gap-4">
      <div className="text-xs text-muted">{t("sectionsHint")}</div>

      <div className="grid gap-4">
        {slices.map((slice) => (
          <div key={slice.id} className="overflow-hidden border border-hairline bg-surface">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline px-4 py-2.5">
              <div className="flex items-center gap-2.5">
                <span className="font-mono-ui text-xs font-bold text-accent-text">
                  {slice.index}
                </span>
                <span className="text-[13.5px] font-semibold text-ink">
                  {isZh ? slice.nameZh : slice.nameEn}
                </span>
                <Badge>{slice.selector}</Badge>
              </div>
              <span className="font-mono-ui text-[11px] text-subtle">{slice.bbox}</span>
            </div>

            <div className="bg-code p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slice.img}
                alt={`${item.name} ${slice.nameEn}`}
                loading="lazy"
                className="mx-auto block h-auto w-full max-w-[1440px] border border-hairline"
              />
            </div>

            <div className="border-t border-hairline px-4 py-2 text-xs text-muted">
              {isZh ? slice.noteZh : slice.noteEn}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
