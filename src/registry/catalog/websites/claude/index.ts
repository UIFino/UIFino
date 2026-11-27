import type { CatalogBrandSpec } from "@/core/design-md";

export const claudeSpec: CatalogBrandSpec = {
  id: "claude",
  slug: "claude.ai",
  name: "Claude",
  kind: "website",
  platformLabel: "Web · AI Workspace",
  category: "AI & LLM",
  tags: ["ai", "warm", "editorial", "serif", "minimal"],
  summaryZh: "温暖羊皮纸米白底色（#FAF9F5）搭配人文衬线标题与赤陶暖橙强调色（#C96442），去除冰冷科技感。",
  summaryEn:
    "Warm parchment canvas (#FAF9F5), literary serif display headlines, and terracotta coral accents (#C96442).",
  fonts: {
    display: "Cormorant Garamond",
    body: "Geist",
    mono: "Geist Mono",
    tracking: "-0.02em",
    serif: true
  },
  radiusScale: ["4px", "8px", "12px", "16px", "9999px"],
  defaultRadius: "10px",
  spacingScale: [4, 8, 16, 24, 32, 48, 72, 96],
  archetype: "prompt-editorial",
  ctaLabel: "Ask Claude",
  light: {
    canvas: "#FAF9F5",
    surface: "#F0EEE6",
    elevated: "#E6E2D6",
    border: "#DFDACB",
    ink: "#141413",
    muted: "#6B6962",
    accent: "#C96442",
    accentFg: "#FFFFFF"
  },
  dark: {
    canvas: "#191816",
    surface: "#23221F",
    elevated: "#2C2A26",
    border: "#36332E",
    ink: "#FAF9F5",
    muted: "#A29E95",
    accent: "#D97757",
    accentFg: "#FFFFFF"
  },
  rules: [
    "Pair warm off-white or espresso neutrals with serif headlines; never use cold blue-tinted grays.",
    "Composer and document containers use comfortable 10px–12px corners and generous reading margins.",
    "Limit terracotta accent to submit controls, citations, and active artifacts."
  ]
};
