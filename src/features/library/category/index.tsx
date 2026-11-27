"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { FilterToolbar } from "@/components/patterns/filter-bar";
import { Badge } from "@/components/primitives/badge";
import { SegmentedControl } from "@/components/primitives/segmented";
import { resolveWorkbenchTokens } from "@/core/tokens";
import { Link } from "@/i18n/navigation";
import { AssetStage, type RegisteredComponentCategory } from "@/registry/components";
import { ALL_WORKBENCH_SKINS } from "@/registry/skins";
import { useWorkbenchPresetStore } from "@/stores/workbench-preset.store";

export function LibraryCategoryView({
  category
}: {
  readonly category: RegisteredComponentCategory;
}) {
  const locale = useLocale();
  const isZh = locale === "zh";
  const { resolvedTheme } = useTheme();
  const presetRadius = useWorkbenchPresetStore((s) => s.radius);
  const presetSkin = useWorkbenchPresetStore((s) => s.skin);

  const [subfilter, setSubfilter] = useState<string>("All");
  const [cols, setCols] = useState<2 | 3>(3);

  const subcats = ["All", ...Array.from(new Set(category.items.map((item) => item.subcat)))];
  const visibleItems = category.items.filter(
    (item) => subfilter === "All" || item.subcat === subfilter
  );

  const previewTokens = resolveWorkbenchTokens({
    radius: presetRadius,
    density: "compact",
    skinId: presetSkin,
    mode: resolvedTheme === "light" ? "light" : "dark",
    brands: ALL_WORKBENCH_SKINS
  });

  return (
    <div className="band-full">
      <section className="shell-wrap">
        <FilterToolbar
          left={
            <SegmentedControl
              options={subcats.map((sc) => ({ value: sc, label: sc }))}
              value={subfilter}
              onChange={setSubfilter}
            />
          }
          right={
            <>
              <span className="font-mono-ui text-xs text-muted">
                {visibleItems.length} shown · {category.totalCount} in registry
              </span>
              <SegmentedControl
                options={[
                  { value: 3 as const, label: "3-Col" },
                  { value: 2 as const, label: "2-Col" }
                ]}
                value={cols}
                onChange={setCols}
              />
            </>
          }
        />

        <div className={cols === 2 ? "lined-grid-2" : "lined-grid-3"}>
          {visibleItems.map((item) => (
            <div key={item.id} className="lined-cell">
              <Link
                href={`/components/${category.id}/${item.id}`}
                className="group flex w-full flex-col p-[18px] text-left"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden border border-hairline bg-code opacity-88 transition-all duration-180 group-hover:border-accent-border group-hover:opacity-100">
                  <div className="flex h-full w-full flex-col justify-center">
                    <AssetStage item={item} tokens={previewTokens} viewport="desktop" compact />
                  </div>
                </div>
                <div className="mt-3 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[14.5px] font-semibold text-ink">
                      {item.name}
                    </span>
                    <Badge>{item.subcat}</Badge>
                  </div>
                  <p className="mt-[5px] line-clamp-2 text-[12.5px] leading-[1.45] text-muted">
                    {isZh ? item.descZh : item.descEn}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
