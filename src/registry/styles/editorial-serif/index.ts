import type { UiStyleSpec } from "@/core/styles";

export const editorialSerifStyle: UiStyleSpec = {
  id: "editorial-serif",
  slug: "editorial-serif",
  name: "Editorial",
  nameZh: "杂志衬线",
  group: "minimal",
  primaryTone: "light",
  scenarios: ["ai-workspace", "docs", "landing"],
  swatch: ["#FAF7F2", "#C96442"],
  summaryEn:
    "Warm parchment canvas (#FAF7F2), literary serif display headlines, organic sandstone borders, and calm terracotta accents built for long-form thinking.",
  summaryZh:
    "暖调羊皮纸底色搭配优雅衬线大标题、砂岩细边框与陶土红点缀，降低屏幕刺眼感，适合长文阅读与深度对话工作台。",
  defaultRadius: 8,
  radiusLabelEn: "8px Organic Soft",
  radiusLabelZh: "8px 温润纸感圆角",
  borderSpec: "1px solid #E6DFD3",
  shadowSpec: "0 2px 10px rgba(42, 34, 24, 0.04)",
  surfaceEffect: "warm-paper",
  fonts: {
    display: "Instrument Serif",
    body: "Inter",
    mono: "JetBrains Mono",
    tracking: "-0.015em",
    serif: true
  },
  light: {
    canvas: "#FAF7F2",
    surface: "#FFFDF9",
    elevated: "#F2ECE1",
    border: "#E6DFD3",
    ink: "#1F1D1A",
    muted: "#6E675C",
    accent: "#C96442",
    accentFg: "#FFFFFF"
  },
  dark: {
    canvas: "#171512",
    surface: "#201D19",
    elevated: "#2A2621",
    border: "#38332C",
    ink: "#F5F0E6",
    muted: "#A39B8E",
    accent: "#D97757",
    accentFg: "#FFFFFF"
  },
  dosEn: [
    "Use serif typography exclusively on display titles and pull quotes; keep body UI controls in clean sans-serif.",
    "Tint every neutral shade slightly warm so nothing feels cold blue-gray."
  ],
  dosZh: [
    "衬线体专用于标题与引言，正文和表单按钮维持清爽无衬线体。",
    "所有中性灰阶统一带一点暖纸色温，杜绝生硬冷蓝灰。"
  ],
  dontsEn: [
    "Avoid pure #FFFFFF backgrounds or neon cyber accents that break paper warmth.",
    "Avoid cramming dense multi-axis telemetry charts without breathing room."
  ],
  dontsZh: [
    "禁止大面积纯白刺眼背景或荧光霓虹色破坏温润纸感。",
    "避免零留白地堆砌高密度监控小图表。"
  ],
  tags: ["editorial", "serif", "warm", "parchment", "claude-like"]
};
