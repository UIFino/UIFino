"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { SegmentedControl } from "@/components/primitives/segmented";
import { Link } from "@/i18n/navigation";
import {
  ASSET_TYPES,
  type AssetTypeFilter,
  CategoryMiniStack,
  COMPONENT_CATEGORIES
} from "@/registry/components";

export function HomeCategoryGrid() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isZh = locale === "zh";
  const [assetType, setAssetType] = useState<AssetTypeFilter>("all");

  const filtered = COMPONENT_CATEGORIES.filter((cat) =>
    assetType === "all" ? true : cat.assetType === assetType
  ).slice(0, 8);

  return (
    <div className="band-full">
      <section className="shell-wrap">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-6 py-[18px]">
          <div className="flex flex-wrap items-center gap-3.5">
            <h2 className="heading-section">{t("homeLibTitle")}</h2>
            <SegmentedControl
              options={ASSET_TYPES.map((tp) => ({
                value: tp.id,
                label: isZh ? tp.labelZh : tp.labelEn
              }))}
              value={assetType}
              onChange={setAssetType}
            />
          </div>
          <Link href="/components">
            <Button variant="hairline">{t("homeLibAll")}</Button>
          </Link>
        </div>

        <div className="lined-grid-4">
          {filtered.map((cat) => (
            <div key={cat.id} className="lined-cell">
              <Link
                href={`/components/${cat.id}`}
                className="group/cat flex h-[214px] w-full flex-col justify-between overflow-hidden px-[18px] pt-[18px] text-left"
              >
                <div className="w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-ink">
                      {isZh ? cat.nameZh : cat.name}
                    </span>
                    <Badge>{cat.assetType.toUpperCase()}</Badge>
                  </div>
                  <div className="font-mono-ui mt-[3px] text-xs text-subtle">
                    {cat.totalCount} assets
                  </div>
                </div>
                <CategoryMiniStack miniKind={cat.miniKind} />
                <div className="cell-bottom-mask" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
