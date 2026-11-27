"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { DualSwatch } from "@/components/primitives/dual-swatch";
import { SegmentedControl } from "@/components/primitives/segmented";
import { compileStyleDesignMd, type UiStyleSpec } from "@/core/styles";
import type { ThemeMode } from "@/core/tokens";
import { useClipboard } from "@/hooks/use-clipboard";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { STYLE_GROUP_LABELS, STYLE_SCENARIO_LABELS } from "@/registry/styles";
import { useWorkbenchPresetStore } from "@/stores/workbench-preset.store";
import { LiveStyleCanonicalStage } from "../specimens/canonical-stage";

export type PlaygroundModeSetting = "auto" | ThemeMode;

export interface StylesComparePlaygroundProps {
  readonly items: readonly UiStyleSpec[];
  readonly activeStyle: UiStyleSpec;
  readonly modeSetting: PlaygroundModeSetting;
  readonly isZh: boolean;
  readonly onSelectStyle: (slug: string) => void;
  readonly onModeSettingChange: (next: PlaygroundModeSetting) => void;
}

export function StylesComparePlayground({
  items,
  activeStyle,
  modeSetting,
  isZh,
  onSelectStyle,
  onModeSettingChange
}: StylesComparePlaygroundProps) {
  const t = useTranslations("styles");
  const router = useRouter();
  const { copy } = useClipboard();
  const applyBrandSkin = useWorkbenchPresetStore((s) => s.applyBrandSkin);
  const setStageMode = useWorkbenchPresetStore((s) => s.setStageMode);

  const effectiveMode: ThemeMode =
    modeSetting === "auto" ? activeStyle.primaryTone : modeSetting;
  const activePalette = effectiveMode === "light" ? activeStyle.light : activeStyle.dark;
  const displayName = isZh ? activeStyle.nameZh : activeStyle.name;

  const minimalItems = items.filter((i) => i.group === "minimal");
  const expressiveItems = items.filter((i) => i.group === "expressive");

  const handleOpenWorkbench = () => {
    applyBrandSkin(activeStyle.id, activeStyle.defaultRadius);
    setStageMode(effectiveMode);
    router.push(`/components/hero/hero-telemetry-counter?skin=${activeStyle.id}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[248px_minmax(0,1fr)]">
      {/* Left Style Switcher Rail */}
      <aside className="border-b border-hairline bg-canvas px-3 py-4 lg:border-r lg:border-b-0">
        {minimalItems.length > 0 ? (
          <div className="mb-3.5">
            <div className="eyebrow-mono px-2.5 py-1.5">
              {isZh ? STYLE_GROUP_LABELS.minimal.zh : STYLE_GROUP_LABELS.minimal.en}
            </div>
            <div className="grid gap-0.5">
              {minimalItems.map((s) => {
                const active = s.slug === activeStyle.slug;
                return (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => onSelectStyle(s.slug)}
                    className={cn(
                      "flex w-full cursor-pointer items-center justify-between gap-2 border-l-2 px-2.5 py-2 text-left text-[13px] transition-colors",
                      active
                        ? "border-l-accent-text bg-surface font-semibold text-ink"
                        : "border-l-transparent text-muted hover:bg-surface-hover hover:text-ink"
                    )}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <DualSwatch swatch={s.swatch} />
                      <span className="truncate">{isZh ? s.nameZh : s.name}</span>
                    </span>
                    <span className="font-mono-ui shrink-0 text-[10.5px] text-subtle">
                      {s.defaultRadius}px
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {expressiveItems.length > 0 ? (
          <div>
            <div className="eyebrow-mono px-2.5 py-1.5">
              {isZh ? STYLE_GROUP_LABELS.expressive.zh : STYLE_GROUP_LABELS.expressive.en}
            </div>
            <div className="grid gap-0.5">
              {expressiveItems.map((s) => {
                const active = s.slug === activeStyle.slug;
                return (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => onSelectStyle(s.slug)}
                    className={cn(
                      "flex w-full cursor-pointer items-center justify-between gap-2 border-l-2 px-2.5 py-2 text-left text-[13px] transition-colors",
                      active
                        ? "border-l-accent-text bg-surface font-semibold text-ink"
                        : "border-l-transparent text-muted hover:bg-surface-hover hover:text-ink"
                    )}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <DualSwatch swatch={s.swatch} />
                      <span className="truncate">{isZh ? s.nameZh : s.name}</span>
                    </span>
                    <span className="font-mono-ui shrink-0 text-[10.5px] text-subtle">
                      {s.defaultRadius}px
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </aside>

      {/* Right Canonical Comparison Stage */}
      <div className="grid min-w-0 content-start gap-5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <DualSwatch swatch={activeStyle.swatch} size="md" />
              <h2 className="m-0 text-xl font-semibold tracking-[-0.02em] text-ink">
                {displayName}
              </h2>
              <Badge>{activeStyle.defaultRadius}px</Badge>
              {activeStyle.scenarios.map((sc) => (
                <Badge key={sc} className="text-muted">
                  {isZh ? STYLE_SCENARIO_LABELS[sc].zh : STYLE_SCENARIO_LABELS[sc].en}
                </Badge>
              ))}
            </div>
            <p className="mt-1.5 max-w-[780px] text-[13.5px] leading-[1.55] text-muted">
              {isZh ? activeStyle.summaryZh : activeStyle.summaryEn}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <SegmentedControl
              options={[
                { value: "auto" as PlaygroundModeSetting, label: t("modeAuto") },
                { value: "dark" as PlaygroundModeSetting, label: "Dark" },
                { value: "light" as PlaygroundModeSetting, label: "Light" }
              ]}
              value={modeSetting}
              onChange={onModeSettingChange}
            />

            <Button
              variant="hairline"
              size="md"
              onClick={() =>
                void copy(compileStyleDesignMd(activeStyle), `Copied ${activeStyle.name} DESIGN.md`)
              }
            >
              {t("copyMd")}
            </Button>

            <Link href={`/styles/${activeStyle.slug}`}>
              <Button variant="hairline" size="md">
                {t("inspectDetail")}
              </Button>
            </Link>

            <Button variant="lime" size="md" onClick={handleOpenWorkbench}>
              {t("applyWorkbench", { name: displayName })}
            </Button>
          </div>
        </div>

        <LiveStyleCanonicalStage
          style={activeStyle}
          mode={effectiveMode}
          isZh={isZh}
        />

        {/* Bottom 4-Cell Live Token Readout */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="border border-hairline bg-surface p-3.5">
            <div className="eyebrow-mono">{t("labelRadius")}</div>
            <div className="font-mono-ui mt-1.5 text-[13px] font-semibold text-ink">
              {isZh ? activeStyle.radiusLabelZh : activeStyle.radiusLabelEn}
            </div>
          </div>

          <div className="border border-hairline bg-surface p-3.5">
            <div className="eyebrow-mono">{t("labelBorder")}</div>
            <div className="font-mono-ui mt-1.5 truncate text-[12.5px] text-ink">
              {activeStyle.borderSpec}
            </div>
          </div>

          <div className="border border-hairline bg-surface p-3.5">
            <div className="eyebrow-mono">{t("labelFonts")}</div>
            <div className="font-mono-ui mt-1.5 truncate text-[12.5px] text-ink">
              {activeStyle.fonts.display} + {activeStyle.fonts.mono}
            </div>
          </div>

          <div className="border border-hairline bg-surface p-3.5">
            <div className="eyebrow-mono">ACTIVE PALETTE ({effectiveMode.toUpperCase()})</div>
            <div className="mt-2 flex items-center gap-1.5">
              {[
                activePalette.canvas,
                activePalette.surface,
                activePalette.elevated,
                activePalette.border,
                activePalette.ink,
                activePalette.accent
              ].map((hex, i) => (
                <span
                  key={`${hex}-${i}`}
                  title={hex}
                  className="h-5 w-5 border border-hairline"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
