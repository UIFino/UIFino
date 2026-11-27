import type { StudioCodeFormat } from "@/core/studios/background";

export interface TypeScaleStep {
  readonly token: string;
  readonly power: number;
  readonly px: number;
  readonly rem: string;
  readonly lineHeight: string;
  readonly sampleEn: string;
  readonly sampleZh: string;
}

export interface EasingCurvePreset {
  readonly id: string;
  readonly name: string;
  readonly nameZh: string;
  readonly bezier: string;
  readonly durationMs: number;
  readonly usageZh: string;
  readonly usageEn: string;
}

export const EASING_PRESETS: readonly EasingCurvePreset[] = [
  {
    id: "out-quart",
    name: "Out Quart",
    nameZh: "迅捷减速",
    bezier: "cubic-bezier(0.25, 1, 0.5, 1)",
    durationMs: 180,
    usageZh: "抽屉展开、弹窗入场、下拉浮层",
    usageEn: "Drawers, modals, and flyout menus"
  },
  {
    id: "out-expo",
    name: "Out Expo",
    nameZh: "极速定格",
    bezier: "cubic-bezier(0.16, 1, 0.3, 1)",
    durationMs: 240,
    usageZh: "命令面板唤起、整页视图切换",
    usageEn: "Command palettes and stage transitions"
  },
  {
    id: "spring-snappy",
    name: "Snappy Micro",
    nameZh: "干脆微弹",
    bezier: "cubic-bezier(0.34, 1.4, 0.64, 1)",
    durationMs: 160,
    usageZh: "开关拨片、分段游标、徽章点亮",
    usageEn: "Segmented pills and toggle switches"
  },
  {
    id: "in-out-sine",
    name: "Calm Sine",
    nameZh: "平缓呼吸",
    bezier: "cubic-bezier(0.37, 0, 0.63, 1)",
    durationMs: 320,
    usageZh: "背景极光流动、骨架屏脉动",
    usageEn: "Ambient glow and skeleton shimmer"
  }
];

const SCALE_DEFS = [
  { token: "xs", power: -2, lineHeight: "1.45", sampleEn: "12px · Metadata & timestamps", sampleZh: "辅助说明与等宽时间戳" },
  { token: "sm", power: -1, lineHeight: "1.50", sampleEn: "Secondary controls & table cells", sampleZh: "表格单元与次要按钮文案" },
  { token: "base", power: 0, lineHeight: "1.60", sampleEn: "Primary interface body copy engineered for sustained reading.", sampleZh: "标准正文段落字号，兼顾信息密度与长时间阅读舒适度。" },
  { token: "lg", power: 1, lineHeight: "1.45", sampleEn: "Card titles & lead paragraphs", sampleZh: "业务卡片主标题与导语" },
  { token: "xl", power: 2, lineHeight: "1.30", sampleEn: "Section headings & modal titles", sampleZh: "页面分区主标题与弹窗标题" },
  { token: "2xl", power: 3, lineHeight: "1.20", sampleEn: "Channel banner headline", sampleZh: "频道横幅醒目主标题" },
  { token: "3xl", power: 4, lineHeight: "1.12", sampleEn: "Display hero statement", sampleZh: "首屏视觉大标题排版" }
] as const;

export function computeTypeScale(basePx = 16, ratio = 1.2): readonly TypeScaleStep[] {
  const clampedBase = Math.max(12, Math.min(22, basePx));
  const clampedRatio = Math.max(1.06, Math.min(1.5, ratio));

  return SCALE_DEFS.map((step) => {
    const rawPx = clampedBase * Math.pow(clampedRatio, step.power);
    const px = Math.round(rawPx * 10) / 10;
    const rem = `${(px / 16).toFixed(3).replace(/\.?0+$/, "")}rem`;
    return {
      token: step.token,
      power: step.power,
      px,
      rem,
      lineHeight: step.lineHeight,
      sampleEn: step.sampleEn,
      sampleZh: step.sampleZh
    };
  });
}

export function serializeTypographyCode(
  steps: readonly TypeScaleStep[],
  easing: EasingCurvePreset,
  format: StudioCodeFormat
): string {
  if (format === "tailwind") {
    const sizes = steps
      .map((s) => `  "text-${s.token}": ["${s.rem}", { lineHeight: "${s.lineHeight}" }]`)
      .join(",\n");
    return `// Typography & Easing Tokens\nexport const typography = {\n${sizes},\n  "ease-${easing.id}": "${easing.bezier}"\n};`;
  }
  const vars = steps.map((s) => `  --font-size-${s.token}: ${s.rem}; /* ${s.px}px */`).join("\n");
  return `:root {\n${vars}\n  --ease-${easing.id}: ${easing.bezier};\n  --duration-${easing.id}: ${easing.durationMs}ms;\n}`;
}
