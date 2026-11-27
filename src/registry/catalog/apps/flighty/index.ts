import type { CatalogBrandSpec } from "@/core/design-md";

export const flightySpec: CatalogBrandSpec = {
  id: "flighty",
  slug: "flighty.ios",
  name: "Flighty",
  kind: "app",
  platformLabel: "iOS · Aviation",
  category: "Productivity",
  installs: "18.7K",
  bookmarks: "1,310",
  tags: ["mobile", "ios", "dark", "telemetry", "emerald"],
  summaryZh: "驾驶舱仪表级暗黑卡片、等宽航班倒计时牌与高辨识状态绿（#22C55E），高密度实时信息排版典范。",
  summaryEn:
    "Cockpit-grade dark instrument cards, tabular boarding countdowns, and semantic live status pills.",
  fonts: {
    display: "Geist",
    body: "Geist",
    mono: "Geist Mono",
    tracking: "-0.025em",
    serif: false
  },
  radiusScale: ["8px", "12px", "16px", "22px", "9999px"],
  defaultRadius: "16px",
  spacingScale: [4, 8, 12, 16, 20, 24, 32],
  archetype: "mobile-telemetry",
  ctaLabel: "Track Flight",
  light: {
    canvas: "#F2F4F7",
    surface: "#FFFFFF",
    elevated: "#E6E9EF",
    border: "#D5DAE2",
    ink: "#0B0E14",
    muted: "#5B6472",
    accent: "#16A34A",
    accentFg: "#FFFFFF"
  },
  dark: {
    canvas: "#090B0E",
    surface: "#13171F",
    elevated: "#1C222E",
    border: "#262E3D",
    ink: "#FFFFFF",
    muted: "#8C96A8",
    accent: "#22C55E",
    accentFg: "#07130B"
  },
  rules: [
    "Render gate numbers, departure times, and delays in bold Geist Mono with tabular-nums.",
    "Reserve emerald/amber/red exclusively for flight punctuality state—never decorative chrome.",
    "Group dense telemetry into clear horizontal split cards with 16px outer radius."
  ]
};
