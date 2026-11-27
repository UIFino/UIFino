"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { SegmentedControl } from "@/components/primitives/segmented";
import type { ThemeMode } from "@/core/tokens";
import { Link } from "@/i18n/navigation";
import { BrandPortrait, CATALOG_ITEMS } from "@/registry/catalog";

type PlatformFilter = "all" | "website" | "app";

export function HomeCatalogShowcase() {
  const t = useTranslations("home");
  const [kind, setKind] = useState<PlatformFilter>("all");
  const [previewMode, setPreviewMode] = useState<ThemeMode>("dark");

  const featured = CATALOG_ITEMS.filter((item) =>
    kind === "all" ? true : item.kind === kind
  ).slice(0, 4);

  return (
    <div className="band-full">
      <section className="shell-wrap">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-6 py-[18px]">
          <div className="flex flex-wrap items-center gap-3.5">
            <h2 className="heading-section">{t("homeCatalogTitle")}</h2>
            <SegmentedControl
              options={[
                { value: "all", label: "All" },
                { value: "website", label: "Websites" },
                { value: "app", label: "Mobile Apps" }
              ]}
              value={kind}
              onChange={setKind}
            />
          </div>

          <div className="flex items-center gap-2.5">
            <SegmentedControl
              options={[
                { value: "dark", label: "Dark" },
                { value: "light", label: "Light" }
              ]}
              value={previewMode}
              onChange={setPreviewMode}
            />
            <Link href="/catalog">
              <Button variant="hairline">{t("homeCatalogAll")}</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-[22px] gap-y-7 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <Link
              key={item.id}
              href={`/catalog/${item.id}`}
              className="group flex min-w-0 flex-col gap-2.5"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-hairline bg-surface transition-colors duration-160 group-hover:border-accent-border">
                <BrandPortrait item={item} mode={previewMode} />
                <Badge variant="pillOverlay" className="absolute top-2.5 left-2.5">
                  DESIGN.md
                </Badge>
              </div>
              <div className="flex items-center justify-between gap-2 px-0.5">
                <span className="truncate text-sm font-semibold text-ink">{item.name}</span>
                <span className="font-mono-ui shrink-0 text-[11.5px] text-subtle">
                  {item.platformLabel}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
