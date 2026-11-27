import type { CatalogBrandSpec } from "@/core/design-md";

export const arcSearchSpec: CatalogBrandSpec = {
  id: "arc-search",
  slug: "arc-search.ios",
  name: "Arc Search",
  kind: "app",
  platformLabel: "iOS · AI Browser",
  category: "AI & LLM",
  installs: "14.2K",
  bookmarks: "920",
  tags: ["mobile", "ios", "ai", "thumb-nav", "clean"],
  summaryZh: "底部拇指优先搜索栏、大圆角叠层摘要卡片（20px）与清亮钴蓝焦点色，移动端单手操控标杆。",
  summaryEn:
    "Thumb-zone bottom omnibar, tactile 20px summary sheets, and electric cobalt accents (#2563EB).",
  fonts: {
    display: "Geist",
    body: "Geist",
    mono: "Geist Mono",
    tracking: "-0.02em",
    serif: false
  },
  radiusScale: ["8px", "14px", "20px", "28px", "9999px"],
  defaultRadius: "20px",
  spacingScale: [4, 8, 12, 16, 20, 28, 40],
  archetype: "mobile-ai-sheet",
  ctaLabel: "Browse for me",
  light: {
    canvas: "#F4F5F8",
    surface: "#FFFFFF",
    elevated: "#E9ECF2",
    border: "#DCE1EB",
    ink: "#0F172A",
    muted: "#64748B",
    accent: "#2563EB",
    accentFg: "#FFFFFF"
  },
  dark: {
    canvas: "#0B0F19",
    surface: "#141B2D",
    elevated: "#1E2942",
    border: "#293552",
    ink: "#F8FAFC",
    muted: "#94A3B8",
    accent: "#3B82F6",
    accentFg: "#FFFFFF"
  },
  rules: [
    "Anchor primary input bar in the bottom 72px thumb zone above safe-area-inset-bottom.",
    "Use 20px nested sheet corners concentric with modern iOS display bezels.",
    "Ensure touch targets >= 44x44pt across pills and sheet actions."
  ]
};
