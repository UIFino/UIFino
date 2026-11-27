import type { CatalogBrandSpec } from "@/core/design-md";

export const lumaAppSpec: CatalogBrandSpec = {
  id: "luma-app",
  slug: "lu.ma.ios",
  name: "Luma",
  kind: "app",
  platformLabel: "iOS & Web · Events",
  category: "Content & Community",
  tags: ["mobile", "clean", "cards", "minimal"],
  summaryZh: "毛玻璃半透顶栏、柔和方形活动海报框与清爽日程时间轴，兼顾社交温度与工具克制。",
  summaryEn:
    "Translucent frosted chrome, square cover framing, clean timeline dots, and crisp RSVP actions.",
  fonts: {
    display: "Geist",
    body: "Geist",
    mono: "Geist Mono",
    tracking: "-0.022em",
    serif: false
  },
  radiusScale: ["6px", "12px", "16px", "24px", "9999px"],
  defaultRadius: "16px",
  spacingScale: [4, 8, 12, 16, 24, 32, 48],
  archetype: "mobile-timeline",
  ctaLabel: "One-Tap RSVP",
  light: {
    canvas: "#F7F8FA",
    surface: "#FFFFFF",
    elevated: "#EEF0F4",
    border: "#E2E5EC",
    ink: "#131517",
    muted: "#687078",
    accent: "#EC4899",
    accentFg: "#FFFFFF"
  },
  dark: {
    canvas: "#101214",
    surface: "#191C20",
    elevated: "#22262B",
    border: "#2D3239",
    ink: "#F4F5F7",
    muted: "#9098A2",
    accent: "#F472B6",
    accentFg: "#14080E"
  },
  rules: [
    "Pair 1:1 event artwork thumbnails with 2-column date badge + title hierarchy.",
    "Keep sticky bottom RSVP bar translucent with 1px top border."
  ]
};
