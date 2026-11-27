import type { UiStyleSpec } from "@/core/styles";

export const bentoModularStyle: UiStyleSpec = {
  id: "bento-modular",
  slug: "bento-modular",
  name: "Bento",
  nameZh: "便当格",
  group: "expressive",
  primaryTone: "dark",
  scenarios: ["landing", "dashboard"],
  swatch: ["#0E1015", "#8B5CF6"],
  summaryEn:
    "Compartmentalized multi-span bento cells with concentric 16px/10px radii, subtle inner rim lighting, and punchy violet feature callouts.",
  summaryZh:
    "按大小跨度拼装的模块化分格卡片，外 16px 内 10px 同心圆角配微弱内发光描边，适合多卖点产品展示与概览面板。",
  defaultRadius: 16,
  radiusLabelEn: "16px Concentric Cell",
  radiusLabelZh: "16px 同心分格圆角",
  borderSpec: "1px solid #232734",
  shadowSpec: "inset 0 1px 0 rgba(255,255,255,0.05)",
  surfaceEffect: "bento-ring",
  fonts: {
    display: "Inter",
    body: "Inter",
    mono: "JetBrains Mono",
    tracking: "-0.025em",
    serif: false
  },
  dark: {
    canvas: "#0D0F14",
    surface: "#151821",
    elevated: "#1D212E",
    border: "#262B3B",
    ink: "#F4F5F8",
    muted: "#8E95A8",
    accent: "#8B5CF6",
    accentFg: "#FFFFFF"
  },
  light: {
    canvas: "#F3F4F8",
    surface: "#FFFFFF",
    elevated: "#EAECEF",
    border: "#DFE2EC",
    ink: "#11131A",
    muted: "#5E6578",
    accent: "#7C3AED",
    accentFg: "#FFFFFF"
  },
  dosEn: [
    "Keep outer card radius (16px) and inner control radius (10px) concentric with consistent 12px–16px gutters.",
    "Give each bento cell one clear focal metric or interactive visual."
  ],
  dosZh: [
    "外层卡片（16px）与内层控件（10px）保持同心圆角与统一间距。",
    "每个便当盒分格只聚焦一个核心指标或功能演示。"
  ],
  dontsEn: [
    "Avoid irregular random gaps between cells or cramming three topics into a single tile.",
    "Avoid mixing sharp 0px boxes next to 16px bento tiles."
  ],
  dontsZh: [
    "避免分格间距忽大忽小，或往单个格子里塞入多个主题。",
    "避免在 16px 圆角分格旁混放 0px 尖角模块。"
  ],
  tags: ["bento", "modular", "apple-grid", "cards", "showcase"]
};
