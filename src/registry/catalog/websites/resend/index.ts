import type { CatalogBrandSpec } from "@/core/design-md";

export const resendSpec: CatalogBrandSpec = {
  id: "resend",
  slug: "resend.com",
  name: "Resend",
  kind: "website",
  defaultTheme: "dark",
  platformLabel: "Web · Email API",
  category: "DevTools",
  tags: ["dark", "devtools", "minimal", "code"],
  summaryZh: "纯黑舞台配银灰字阶、高反差白胶囊主动作与多语言 SDK 代码卡片，极简开发者体验。",
  summaryEn:
    "Deep pitch canvas, silver-gray typographic hierarchy, and crisp multi-SDK code tabs.",
  fonts: {
    display: "Geist",
    body: "Geist",
    mono: "Geist Mono",
    tracking: "-0.03em",
    serif: false
  },
  radiusScale: ["4px", "8px", "12px", "9999px"],
  defaultRadius: "8px",
  spacingScale: [4, 8, 12, 16, 24, 32, 56, 80],
  archetype: "sdk-minimal",
  ctaLabel: "Get API Key",
  light: {
    canvas: "#FFFFFF",
    surface: "#F8F9FA",
    elevated: "#F1F3F5",
    border: "#E6E8EB",
    ink: "#11181C",
    muted: "#687076",
    accent: "#11181C",
    accentFg: "#FFFFFF"
  },
  dark: {
    canvas: "#050507",
    surface: "#0F1014",
    elevated: "#181920",
    border: "#252730",
    ink: "#F8F9FA",
    muted: "#8E939D",
    accent: "#FFFFFF",
    accentFg: "#050507"
  },
  rules: [
    "Anchor hero around a real copyable TypeScript/cURL code window rather than abstract illustrations.",
    "Use subtle top-edge radial sheen on dark cards while keeping body borders 1px solid #252730."
  ]
};
