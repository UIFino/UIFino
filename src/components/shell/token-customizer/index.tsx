"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/primitives/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
} from "@/components/primitives/popover";
import { SegmentedControl } from "@/components/primitives/segmented";
import type { DensityMode, RadiusStop } from "@/core/tokens";
import { cn } from "@/lib/cn";
import { CATALOG_ITEMS } from "@/registry/catalog";
import { useWorkbenchPresetStore } from "@/stores/workbench-preset.store";

const RADIUS_OPTIONS = [
  { value: 0 as RadiusStop, label: "0px" },
  { value: 4 as RadiusStop, label: "4px" },
  { value: 8 as RadiusStop, label: "8px" },
  { value: 12 as RadiusStop, label: "12px" },
  { value: 16 as RadiusStop, label: "16px" }
] as const;

const DENSITY_OPTIONS = [
  { value: "compact" as DensityMode, label: "Compact" },
  { value: "default" as DensityMode, label: "Default" },
  { value: "spacious" as DensityMode, label: "Spacious" }
] as const;

export function TokenCustomizerPopover({ onOpenTrigger }: { readonly onOpenTrigger?: () => void }) {
  const t = useTranslations("common");
  const radius = useWorkbenchPresetStore((s) => s.radius);
  const density = useWorkbenchPresetStore((s) => s.density);
  const skin = useWorkbenchPresetStore((s) => s.skin);
  const setRadius = useWorkbenchPresetStore((s) => s.setRadius);
  const setDensity = useWorkbenchPresetStore((s) => s.setDensity);
  const setSkin = useWorkbenchPresetStore((s) => s.setSkin);

  const skinChoices = [
    ["default", "uifino"],
    ...CATALOG_ITEMS.slice(0, 5).map((b) => [b.id, b.name] as const)
  ] as const;

  return (
    <Popover onOpenChange={(open) => open && onOpenTrigger?.()}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 px-2.5 text-muted hover:text-ink">
          <SlidersHorizontal className="h-3.5 w-3.5 text-accent-text" />
          <span className="hidden sm:inline">{t("customizeBtn")}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-3.5">
          <div className="flex items-center justify-between">
            <span className="eyebrow-mono text-accent-text">{t("presetHeading")}</span>
            <PopoverClose className="cursor-pointer p-0.5 text-muted hover:text-ink">
              <X className="h-3.5 w-3.5" />
            </PopoverClose>
          </div>

          <div>
            <div className="mb-1.5 text-xs text-muted">{t("defaultRadius")}</div>
            <SegmentedControl
              options={RADIUS_OPTIONS}
              value={radius}
              onChange={setRadius}
              className="grid w-full grid-cols-5"
              itemClassName="justify-center px-0"
            />
          </div>

          <div>
            <div className="mb-1.5 text-xs text-muted">{t("defaultDensity")}</div>
            <SegmentedControl
              options={DENSITY_OPTIONS}
              value={density}
              onChange={setDensity}
              className="grid w-full grid-cols-3"
              itemClassName="justify-center px-0"
            />
          </div>

          <div>
            <div className="mb-1.5 text-xs text-muted">{t("brandSkin")}</div>
            <div className="grid grid-cols-3 gap-1.5">
              {skinChoices.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSkin(id)}
                  className={cn(
                    "flex h-7 cursor-pointer items-center justify-center px-2 text-[11.5px] font-medium transition-colors",
                    skin === id
                      ? "bg-accent-soft font-semibold text-accent-text"
                      : "bg-elevated/70 text-ink hover:bg-gray-100"
                  )}
                >
                  <span className="truncate">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
