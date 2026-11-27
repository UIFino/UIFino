import type { CatalogBrandSpec } from "@/core/design-md";

export const notionSpec: CatalogBrandSpec = {
  id: "notion",
  slug: "notion.so",
  name: "Notion",
  kind: "website",
  platformLabel: "Web · Docs & Wiki",
  category: "Productivity",
  installs: "24.6K",
  bookmarks: "1,520",
  tags: ["light", "minimal", "productivity", "clean"],
  summaryZh: "暖调纯白画布、柔和灰阶树形侧栏与克制科技蓝动作色（#0075DE），文档阅读零视觉压迫。",
  summaryEn:
    "Warm neutral paper, quiet sidebar hierarchy, ink-black headlines, and crisp action blue (#0075DE).",
  fonts: {
    display: "Geist",
    body: "Geist",
    mono: "Geist Mono",
    tracking: "-0.025em",
    serif: false
  },
  radiusScale: ["4px", "6px", "8px", "12px"],
  defaultRadius: "6px",
  spacingScale: [4, 8, 12, 16, 24, 36, 56, 72],
  archetype: "doc-workspace",
  ctaLabel: "Get Notion free",
  light: {
    canvas: "#FFFFFF",
    surface: "#F7F7F5",
    elevated: "#EFEFED",
    border: "#E6E6E3",
    ink: "#191918",
    muted: "#6F6E69",
    accent: "#0075DE",
    accentFg: "#FFFFFF"
  },
  dark: {
    canvas: "#191919",
    surface: "#202020",
    elevated: "#2A2A2A",
    border: "#333333",
    ink: "#F1F1EF",
    muted: "#9B9A97",
    accent: "#2383E2",
    accentFg: "#FFFFFF"
  },
  rules: [
    "Use warm stone-tinted neutrals (#F7F7F5) for sidebars so the white document canvas pops without heavy borders.",
    "Keep hover states subtle (rgba(0,0,0,0.04) light / rgba(255,255,255,0.055) dark).",
    "Reserve #0075DE strictly for primary CTAs and selection states."
  ]
};
