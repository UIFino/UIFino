import type { StudioCodeFormat } from "@/core/studios/background";

export interface TypeScaleStep {
  readonly token: string;
  readonly power: number;
  readonly px: number;
  readonly rem: string;
  readonly clampCss: string;
  readonly lineHeight: string;
  readonly tracking: string;
  readonly sampleEn: string;
  readonly sampleZh: string;
}

export interface FluidSpaceStep {
  readonly token: string;
  readonly minPx: number;
  readonly maxPx: number;
  readonly clampCss: string;
}

export interface FontPairingPreset {
  readonly id: string;
  readonly name: string;
  readonly nameZh: string;
  readonly display: string;
  readonly body: string;
  readonly mono: string;
  readonly license: string;
  readonly toneZh: string;
  readonly toneEn: string;
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

export const FONT_PAIRINGS: readonly FontPairingPreset[] = [
  {
    id: "geist-system",
    name: "Geist + Geist Mono",
    nameZh: "现代工程无衬线（Geist）",
    display: '"Geist", "PingFang SC", sans-serif',
    body: '"Geist", "PingFang SC", sans-serif',
    mono: '"Geist Mono", monospace',
    license: "SIL OFL 1.1",
    toneZh: "冷峻锐利，适合开发者工具与 SaaS 控制台",
    toneEn: "Crisp architectural feel for developer tools and SaaS"
  },
  {
    id: "editorial-serif",
    name: "Cormorant + Inter + JetBrains Mono",
    nameZh: "杂志社论衬线混排（Cormorant）",
    display: '"Cormorant Garamond", Georgia, serif',
    body: '"Geist", "PingFang SC", sans-serif',
    mono: '"Geist Mono", monospace',
    license: "SIL OFL 1.1",
    toneZh: "人文温润与精密正文混排，适合 AI 产品与内容出版",
    toneEn: "Warm editorial serif paired with legible body sans"
  },
  {
    id: "swiss-tabular",
    name: "Inter Tight + Noto Sans + Mono",
    nameZh: "瑞士高密排版（等宽对齐）",
    display: '"Geist", "Microsoft YaHei", sans-serif',
    body: '"Geist", "PingFang SC", sans-serif',
    mono: '"Geist Mono", monospace',
    license: "Apache / OFL",
    toneZh: "大字收紧字距、小字高可读，适合金融账单与技术文档",
    toneEn: "Tight display tracking for fintech ledgers and docs"
  }
];

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
  { token: "xs", power: -2, lineHeight: "1.50", tracking: "0.01em", sampleEn: "12px · Metadata & timestamps", sampleZh: "辅助说明与等宽时间戳" },
  { token: "sm", power: -1, lineHeight: "1.55", tracking: "0em", sampleEn: "Secondary controls & table cells", sampleZh: "表格单元与次要按钮文案" },
  { token: "base", power: 0, lineHeight: "1.62", tracking: "-0.005em", sampleEn: "Primary interface body copy engineered for sustained reading.", sampleZh: "标准正文段落字号，兼顾中文阅读行高与信息密度。" },
  { token: "lg", power: 1, lineHeight: "1.45", tracking: "-0.012em", sampleEn: "Card titles & lead paragraphs", sampleZh: "业务卡片主标题与导语" },
  { token: "xl", power: 2, lineHeight: "1.30", tracking: "-0.018em", sampleEn: "Section headings & modal titles", sampleZh: "页面分区主标题与弹窗标题" },
  { token: "2xl", power: 3, lineHeight: "1.18", tracking: "-0.025em", sampleEn: "Channel banner headline", sampleZh: "频道横幅醒目主标题" },
  { token: "3xl", power: 4, lineHeight: "1.08", tracking: "-0.032em", sampleEn: "Display hero statement", sampleZh: "首屏视觉大标题排版" }
] as const;

function buildClamp(minPx: number, maxPx: number, minVw = 375, maxVw = 1440): string {
  const minRem = (minPx / 16).toFixed(3).replace(/\.?0+$/, "");
  const maxRem = (maxPx / 16).toFixed(3).replace(/\.?0+$/, "");
  if (Math.abs(maxPx - minPx) < 0.2) {
    return `${maxRem}rem`;
  }
  const slope = ((maxPx - minPx) / (maxVw - minVw)) * 100;
  const interceptPx = minPx - ((maxPx - minPx) * minVw) / (maxVw - minVw);
  const interceptRem = (interceptPx / 16).toFixed(3).replace(/\.?0+$/, "");
  const sign = interceptPx >= 0 ? "+" : "-";
  const absIntercept = Math.abs(Number(interceptRem));
  return `clamp(${minRem}rem, ${slope.toFixed(2)}vw ${sign} ${absIntercept}rem, ${maxRem}rem)`;
}

export function computeTypeScale(
  basePx = 16,
  ratio = 1.2,
  mobileBasePx?: number,
  mobileRatio?: number
): readonly TypeScaleStep[] {
  const clampedMaxBase = Math.max(12, Math.min(22, basePx));
  const clampedMaxRatio = Math.max(1.06, Math.min(1.5, ratio));
  const clampedMinBase = Math.max(12, Math.min(20, mobileBasePx ?? Math.max(14, clampedMaxBase - 1)));
  const clampedMinRatio = Math.max(1.05, Math.min(1.35, mobileRatio ?? Math.max(1.12, clampedMaxRatio - 0.08)));

  return SCALE_DEFS.map((step) => {
    const rawMax = clampedMaxBase * Math.pow(clampedMaxRatio, step.power);
    const rawMin = clampedMinBase * Math.pow(clampedMinRatio, step.power);
    const px = Math.round(rawMax * 10) / 10;
    const minPx = Math.round(Math.min(rawMin, rawMax) * 10) / 10;
    const rem = `${(px / 16).toFixed(3).replace(/\.?0+$/, "")}rem`;
    return {
      token: step.token,
      power: step.power,
      px,
      rem,
      clampCss: buildClamp(minPx, px),
      lineHeight: step.lineHeight,
      tracking: step.tracking,
      sampleEn: step.sampleEn,
      sampleZh: step.sampleZh
    };
  });
}

export function computeFluidSpaceScale(baseSpace = 16): readonly FluidSpaceStep[] {
  const defs = [
    { token: "space-xs", mult: 0.5 },
    { token: "space-sm", mult: 0.75 },
    { token: "space-md", mult: 1 },
    { token: "space-lg", mult: 1.5 },
    { token: "space-xl", mult: 2.25 },
    { token: "space-2xl", mult: 3.5 }
  ] as const;

  return defs.map((d) => {
    const maxPx = Math.round(baseSpace * d.mult);
    const minPx = Math.max(4, Math.round(maxPx * 0.72));
    return {
      token: d.token,
      minPx,
      maxPx,
      clampCss: buildClamp(minPx, maxPx)
    };
  });
}

export function serializeTypographyCode(
  steps: readonly TypeScaleStep[],
  easing: EasingCurvePreset,
  format: StudioCodeFormat,
  fluid = false,
  pairing?: FontPairingPreset
): string {
  const fontBlock = pairing
    ? `\n  --font-display: ${pairing.display};\n  --font-body: ${pairing.body};\n  --font-mono: ${pairing.mono};`
    : "";

  if (format === "tailwind") {
    const sizes = steps
      .map(
        (s) =>
          `  "text-${s.token}": ["${fluid ? s.clampCss : s.rem}", { lineHeight: "${s.lineHeight}", letterSpacing: "${s.tracking}" }]`
      )
      .join(",\n");
    return `// Typography Tokens (${fluid ? "Utopia Fluid clamp()" : "Fixed Modular Scale"})\nexport const typography = {\n${sizes},\n  "ease-${easing.id}": "${easing.bezier}"\n};`;
  }

  const vars = steps
    .map(
      (s) =>
        `  --text-${s.token}: ${fluid ? s.clampCss : s.rem}; /* ${s.px}px · lh ${s.lineHeight} · tracking ${s.tracking} */`
    )
    .join("\n");

  const spaceVars = fluid
    ? `\n\n  /* Fluid Spacing */\n${computeFluidSpaceScale()
        .map((sp) => `  --${sp.token}: ${sp.clampCss}; /* ${sp.minPx}px -> ${sp.maxPx}px */`)
        .join("\n")}`
    : "";

  return `:root {\n${vars}${fontBlock}${spaceVars}\n  --ease-${easing.id}: ${easing.bezier};\n  --duration-${easing.id}: ${easing.durationMs}ms;\n}`;
}
