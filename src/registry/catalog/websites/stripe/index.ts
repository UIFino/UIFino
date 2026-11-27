import type { CatalogBrandSpec } from "@/core/design-md";

export const stripeSpec: CatalogBrandSpec = {
  id: "stripe",
  slug: "stripe.com",
  name: "Stripe",
  kind: "website",
  platformLabel: "Web · Payments",
  category: "Fintech",
  installs: "31.2K",
  bookmarks: "1,650",
  tags: ["fintech", "clean", "pricing", "light", "indigo"],
  summaryZh: "深海蓝黑正文（#0A2540）配清透灰白卡片与标志性电光蓝紫主按钮（#635BFF），数字账单层级极清晰。",
  summaryEn:
    "Slate-navy ink (#0A2540), crisp cool-gray surfaces (#F6F9FC), and signature blurple actions (#635BFF).",
  fonts: {
    display: "Geist",
    body: "Geist",
    mono: "Geist Mono",
    tracking: "-0.025em",
    serif: false
  },
  radiusScale: ["4px", "6px", "8px", "12px", "9999px"],
  defaultRadius: "8px",
  spacingScale: [4, 8, 12, 16, 24, 32, 56, 80],
  archetype: "fintech-ledger",
  ctaLabel: "Start now",
  light: {
    canvas: "#FFFFFF",
    surface: "#F6F9FC",
    elevated: "#EDF2F7",
    border: "#E3E8EE",
    ink: "#0A2540",
    muted: "#425466",
    accent: "#635BFF",
    accentFg: "#FFFFFF"
  },
  dark: {
    canvas: "#0A2540",
    surface: "#102E4D",
    elevated: "#17395E",
    border: "#21476E",
    ink: "#FFFFFF",
    muted: "#ADBDCC",
    accent: "#7A73FF",
    accentFg: "#FFFFFF"
  },
  rules: [
    "Never use pure #000000 text on light mode; anchor typography in deep navy #0A2540.",
    "Combine hairline borders with low-opacity multi-layer ambient shadows on interactive cards.",
    "Format currency, basis points, and latency strictly in tabular numerals."
  ]
};
