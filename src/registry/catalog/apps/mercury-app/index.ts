import type { CatalogBrandSpec } from "@/core/design-md";

export const mercuryAppSpec: CatalogBrandSpec = {
  id: "mercury-app",
  slug: "mercury.ios",
  name: "Mercury Banking",
  kind: "app",
  platformLabel: "iOS · Treasury",
  category: "Fintech",
  installs: "13.9K",
  bookmarks: "890",
  tags: ["mobile", "fintech", "minimal", "light"],
  summaryZh: "冷静银灰金融卡片、超大等宽账户余额与零噪音交易流水列表，机构级移动财务端质感。",
  summaryEn:
    "Calm alabaster banking cards, oversized tabular balance headers, and zero-noise ledger rows.",
  fonts: {
    display: "Geist",
    body: "Geist",
    mono: "Geist Mono",
    tracking: "-0.026em",
    serif: false
  },
  radiusScale: ["6px", "12px", "16px", "20px", "9999px"],
  defaultRadius: "16px",
  spacingScale: [4, 8, 12, 16, 24, 32, 44],
  archetype: "mobile-ledger",
  ctaLabel: "Move Funds",
  light: {
    canvas: "#F5F6F8",
    surface: "#FFFFFF",
    elevated: "#ECEEF3",
    border: "#DFE3EC",
    ink: "#11141C",
    muted: "#636B7B",
    accent: "#4F46E5",
    accentFg: "#FFFFFF"
  },
  dark: {
    canvas: "#0D1017",
    surface: "#161B26",
    elevated: "#1F2635",
    border: "#2B3447",
    ink: "#F5F7FA",
    muted: "#8F9BB3",
    accent: "#818CF8",
    accentFg: "#0D1017"
  },
  rules: [
    "Display account balances in lightweight 32px tabular figures with muted decimal cents.",
    "Separate ledger dates with subtle uppercase mono sticky headers."
  ]
};
