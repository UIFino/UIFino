"use client";

import { CheckCircle2, AlertTriangle } from "lucide-react";
import { computeContrastRatio } from "@/core/styles";
import type { ThemePalette } from "@/core/tokens";
import { useClipboard } from "@/hooks/use-clipboard";
import { cn } from "@/lib/cn";

export interface StylePalettePanelProps {
  readonly modeLabel: string;
  readonly palette: ThemePalette;
  readonly isZh?: boolean;
}

const TOKEN_ROLES: readonly {
  readonly key: keyof ThemePalette;
  readonly labelEn: string;
  readonly labelZh: string;
  readonly partEn: string;
  readonly partZh: string;
}[] = [
  { key: "canvas", labelEn: "Canvas", labelZh: "画布底色", partEn: "Page Body", partZh: "全局网页背景" },
  { key: "surface", labelEn: "Surface", labelZh: "卡片底色", partEn: "Card / Panel", partZh: "卡片与模块底" },
  { key: "elevated", labelEn: "Elevated", labelZh: "浮起控件", partEn: "Input / Pill", partZh: "输入框 / 标签" },
  { key: "border", labelEn: "Border", labelZh: "分割描边", partEn: "1px Hairline", partZh: "结构分割细线" },
  { key: "ink", labelEn: "Primary Ink", labelZh: "主标题与正文", partEn: "Headline & Ink", partZh: "大标题与主字" },
  { key: "muted", labelEn: "Muted Ink", labelZh: "次要说明字", partEn: "Meta / Caption", partZh: "辅助描述文案" },
  { key: "accent", labelEn: "Accent CTA", labelZh: "主转化按钮底", partEn: "Primary CTA", partZh: "主按钮底色" },
  { key: "accentFg", labelEn: "CTA Text", labelZh: "主按钮文字", partEn: "Button Label", partZh: "按钮上反白字" }
];

export function StylePalettePanel({
  modeLabel,
  palette,
  isZh = true
}: StylePalettePanelProps) {
  const { copy } = useClipboard();

  const contrastPairs = [
    {
      label: isZh ? "主字 vs 画布底" : "Ink vs Canvas",
      audit: computeContrastRatio(palette.ink, palette.canvas)
    },
    {
      label: isZh ? "辅字 vs 卡片底" : "Muted vs Surface",
      audit: computeContrastRatio(palette.muted, palette.surface)
    },
    {
      label: isZh ? "按钮字 vs 主按钮底" : "CTA Text vs CTA",
      audit: computeContrastRatio(palette.accentFg, palette.accent)
    }
  ];

  return (
    <div className="border border-hairline bg-surface p-[18px]">
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
        <span className="eyebrow-mono">{modeLabel} MODE TOKENS &amp; PART MAPPING</span>
        <span className="font-mono-ui text-[11px] text-subtle">
          {isZh ? "点击任意色卡复制十六进制色值" : "Click swatch to copy hex"}
        </span>
      </div>

      {/* 8 Color Swatches with Explicit Screen Part Mapping */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {TOKEN_ROLES.map((item) => {
          const hex = palette[item.key];
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => void copy(hex, `Copied ${hex}`)}
              className="flex cursor-pointer flex-col gap-2 border border-hairline bg-canvas p-2.5 text-left transition-colors hover:border-accent-border"
            >
              <span
                className="h-8 w-full border border-hairline"
                style={{ backgroundColor: hex }}
              />
              <div className="min-w-0">
                <div className="truncate text-[12px] font-semibold text-ink">
                  {isZh ? item.labelZh : item.labelEn}
                </div>
                <div className="truncate text-[11px] text-subtle">
                  {isZh ? item.partZh : item.partEn}
                </div>
                <div className="font-mono-ui mt-0.5 text-[11px] text-accent-text">{hex}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Realtime Colors-inspired Automatic WCAG Contrast Audit */}
      <div className="mt-4 grid grid-cols-1 gap-2 border-t border-hairline pt-3.5 sm:grid-cols-3">
        {contrastPairs.map((pair) => (
          <div
            key={pair.label}
            className="flex items-center justify-between gap-2 border border-hairline bg-code px-3 py-2 text-xs"
          >
            <span className="truncate text-muted">{pair.label}</span>
            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-1 font-mono text-[11px] font-semibold tabular-nums",
                pair.audit.passesAA ? "text-emerald-400" : "text-amber-400"
              )}
            >
              {pair.audit.passesAA ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                <AlertTriangle className="h-3.5 w-3.5" />
              )}
              <span>
                {pair.audit.formatted} {pair.audit.grade}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
