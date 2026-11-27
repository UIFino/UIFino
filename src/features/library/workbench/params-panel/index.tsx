"use client";

import { useTranslations } from "next-intl";
import type { ViewportSize } from "@/components/patterns/viewport-frame";
import { Button } from "@/components/primitives/button";
import { SegmentedControl } from "@/components/primitives/segmented";
import type { TargetFramework } from "@/core/codegen";
import type { DensityMode, RadiusStop, ResolvedWorkbenchTokens } from "@/core/tokens";
import { cn } from "@/lib/cn";
import { CATALOG_ITEMS } from "@/registry/catalog";

export interface WorkbenchParamsPanelProps {
  readonly tokens: ResolvedWorkbenchTokens;
  readonly radius: RadiusStop;
  readonly density: DensityMode;
  readonly skin: string;
  readonly framework: TargetFramework;
  readonly viewport: ViewportSize;
  readonly onRadiusChange: (r: RadiusStop) => void;
  readonly onDensityChange: (d: DensityMode) => void;
  readonly onSkinChange: (skinId: string) => void;
  readonly onReset: () => void;
  readonly onCopyCode: () => void;
}

export function WorkbenchParamsPanel({
  tokens,
  radius,
  density,
  skin,
  framework,
  viewport,
  onRadiusChange,
  onDensityChange,
  onSkinChange,
  onReset,
  onCopyCode
}: WorkbenchParamsPanelProps) {
  const t = useTranslations("library");

  const skinChoices = [
    ["default", "uifino"],
    ...CATALOG_ITEMS.slice(0, 5).map((b) => [b.id, b.name] as const)
  ] as const;

  const tocItems = [
    ["#wb-overview", "Overview & Stack"],
    ["#wb-stage", `Live Stage (${viewport})`],
    ["#wb-install", "Installation CLI"],
    ["#wb-tokens", "Active Token Contract"],
    ["#wb-rules", "Layout & Motion Rules"]
  ] as const;

  return (
    <aside className="order-2 grid content-start gap-[22px] border-t border-hairline bg-canvas px-4 py-[18px] lg:sticky lg:top-[var(--header-h)] lg:order-3 lg:h-[calc(100dvh-var(--header-h))] lg:overflow-y-auto lg:border-t-0 lg:border-l">
      <div className="grid gap-3.5 border-b border-hairline pb-[18px]">
        <div className="flex items-center justify-between">
          <span className="eyebrow-mono text-accent-text">{t("wbParamsTitle")}</span>
          <button
            type="button"
            onClick={onReset}
            className="font-mono-ui cursor-pointer text-[11px] text-subtle underline hover:text-ink"
          >
            {t("wbReset")}
          </button>
        </div>

        <div>
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="text-muted">{t("wbRadius")}</span>
            <span className="font-mono-ui text-ink">{tokens.card}</span>
          </div>
          <SegmentedControl
            options={([0, 4, 8, 12, 16] as const).map((r) => ({ value: r, label: String(r) }))}
            value={radius}
            onChange={onRadiusChange}
            className="grid w-full grid-cols-5"
            itemClassName="justify-center px-0"
          />
        </div>

        <div>
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="text-muted">{t("wbDensity")}</span>
            <span className="font-mono-ui text-ink">{tokens.density}</span>
          </div>
          <SegmentedControl
            options={[
              { value: "compact" as DensityMode, label: "Compact" },
              { value: "default" as DensityMode, label: "Default" },
              { value: "spacious" as DensityMode, label: "Spacious" }
            ]}
            value={density}
            onChange={onDensityChange}
            className="grid w-full grid-cols-3"
            itemClassName="justify-center px-0 text-[11.5px]"
          />
        </div>

        <div>
          <div className="mb-1.5 text-xs text-muted">{t("wbBrandSkin")}</div>
          <div className="grid grid-cols-2 gap-[5px]">
            {skinChoices.map(([id, name]) => (
              <button
                key={id}
                type="button"
                onClick={() => onSkinChange(id)}
                className={cn(
                  "flex h-7 cursor-pointer items-center justify-start border px-2 text-[11.5px] font-medium transition-colors",
                  skin === id
                    ? "border-accent-border bg-accent-soft text-accent-text"
                    : "border-hairline bg-surface text-ink hover:bg-gray-100"
                )}
              >
                <span className="truncate">{name}</span>
              </button>
            ))}
          </div>
        </div>

        <Button
          variant="contrast"
          size="md"
          onClick={onCopyCode}
          className="h-[34px] w-full text-xs"
        >
          {t("wbCopyCode")} ({framework})
        </Button>
      </div>

      <div>
        <div className="eyebrow-mono mb-2.5">{t("wbTocTitle")}</div>
        <nav className="grid gap-0.5">
          {tocItems.map(([href, label], idx) => (
            <a
              key={href}
              href={href}
              className={cn(
                "block border-l py-[5px] pl-3 text-[12.5px] transition-colors",
                idx === 0
                  ? "border-l-accent-text text-ink"
                  : "border-l-hairline text-muted hover:border-l-accent-text hover:text-ink"
              )}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
