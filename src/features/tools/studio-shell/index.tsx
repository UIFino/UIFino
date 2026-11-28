"use client";

import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FilterToolbar } from "@/components/patterns/filter-bar";
import { Button } from "@/components/primitives/button";
import { SegmentedControl } from "@/components/primitives/segmented";
import type { StudioCodeFormat } from "@/core/studios/background";
import type { BrandSkinContract } from "@/core/tokens";
import { useClipboard } from "@/hooks/use-clipboard";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { ALL_WORKBENCH_SKINS } from "@/registry/skins";
import { useWorkbenchPresetStore } from "@/stores/workbench-preset.store";

export type ActiveToolStudio = "background" | "shadow" | "colors" | "typography" | "motion";

export interface StudioShellProps {
  readonly activeStudio: ActiveToolStudio;
  readonly format: StudioCodeFormat;
  readonly currentCode: string;
  readonly onFormatChange: (fmt: StudioCodeFormat) => void;
  readonly onLoadSkin?: (skin: BrandSkinContract) => void;
  readonly children: ReactNode;
}

export function StudioShell({
  activeStudio,
  format,
  currentCode,
  onFormatChange,
  onLoadSkin,
  children
}: StudioShellProps) {
  const t = useTranslations("tools");
  const locale = useLocale();
  const isZh = locale === "zh";
  const router = useRouter();
  const { copy } = useClipboard();

  const activeSkinId = useWorkbenchPresetStore((s) => s.skin);
  const applyBrandSkin = useWorkbenchPresetStore((s) => s.applyBrandSkin);

  const tabs: readonly { readonly id: ActiveToolStudio; readonly num: string; readonly label: string }[] = [
    { id: "background", num: "01", label: t("studioBg") },
    { id: "shadow", num: "02", label: t("studioShadow") },
    { id: "colors", num: "03", label: t("studioColors") },
    { id: "typography", num: "04", label: t("studioType") },
    { id: "motion", num: "05", label: t("studioMotion") }
  ];

  const featuredSkins = ALL_WORKBENCH_SKINS.slice(0, 12);

  return (
    <div className="band-full">
      <section className="shell-wrap">
        <FilterToolbar
          left={
            <div className="inline-flex flex-wrap items-stretch border border-hairline bg-code">
              {tabs.map((tab, idx) => (
                <Link
                  key={tab.id}
                  href={`/tools/${tab.id}`}
                  className={cn(
                    "inline-flex h-[30px] items-center px-3 text-xs transition-colors",
                    idx < tabs.length - 1 && "border-r border-hairline",
                    activeStudio === tab.id
                      ? "bg-gray-100 font-semibold text-ink"
                      : "text-muted hover:bg-surface-hover hover:text-ink"
                  )}
                >
                  {tab.num} · {tab.label}
                </Link>
              ))}
            </div>
          }
          right={
            <>
              {onLoadSkin ? (
                <select
                  aria-label={isZh ? "载入站内图鉴或风格参数" : "Load catalog or style preset"}
                  value=""
                  onChange={(e) => {
                    const skin = ALL_WORKBENCH_SKINS.find((s) => s.id === e.target.value);
                    if (skin) {
                      applyBrandSkin(skin.id);
                      onLoadSkin(skin);
                    }
                  }}
                  className="h-[30px] cursor-pointer border border-hairline bg-surface px-2.5 text-xs text-ink"
                >
                  <option value="" disabled>
                    {isZh ? "载入图鉴 / 风格…" : "Load Spec / Style…"}
                  </option>
                  {featuredSkins.map((skin) => (
                    <option key={skin.id} value={skin.id}>
                      {skin.name}
                    </option>
                  ))}
                </select>
              ) : null}

              <Button
                variant="hairline"
                size="sm"
                onClick={() =>
                  router.push(`/components/hero/hero-telemetry-counter?skin=${activeSkinId}`)
                }
              >
                {isZh ? "带入组件库 →" : "Open Workbench →"}
              </Button>

              <SegmentedControl
                options={[
                  { value: "css" as StudioCodeFormat, label: "CSS" },
                  { value: "tailwind" as StudioCodeFormat, label: "Tailwind" }
                ]}
                value={format}
                onChange={onFormatChange}
              />
              <Button
                variant="contrast"
                size="sm"
                onClick={() =>
                  void copy(
                    currentCode,
                    `Copied ${format === "tailwind" ? "Tailwind" : "CSS"} snippet`
                  )
                }
              >
                Copy {format === "tailwind" ? "Tailwind" : "CSS"}
              </Button>
            </>
          }
        />

        <div className="px-7 py-6">{children}</div>
      </section>
    </div>
  );
}
