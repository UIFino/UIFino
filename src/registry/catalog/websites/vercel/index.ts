import type { CatalogBrandSpec } from "@/core/design-md";

export const vercelSpec: CatalogBrandSpec = {
  id: "vercel",
  slug: "vercel.com",
  name: "Vercel",
  kind: "website",
  defaultTheme: "dark",
  platformLabel: "Web · Cloud Infra",
  category: "DevTools",
  tags: ["devtools", "monochrome", "grid", "sharp", "dark"],
  summaryZh: "纯粹黑白灰建筑网格，通栏 1px 结构线加等宽遥测数字，按钮采用极致反差黑白实心块。",
  summaryEn:
    "Architectural monochrome wireframe grid, Geist typography, 1px structural dividers, and high-contrast inverse CTAs.",
  fonts: {
    display: "Geist",
    body: "Geist",
    mono: "Geist Mono",
    tracking: "-0.035em",
    serif: false
  },
  radiusScale: ["0px", "4px", "6px", "9999px"],
  defaultRadius: "6px",
  spacingScale: [4, 8, 12, 16, 24, 40, 64, 96],
  archetype: "deploy-grid",
  ctaLabel: "Deploy now",
  light: {
    canvas: "#FFFFFF",
    surface: "#FAFAFA",
    elevated: "#F2F2F2",
    border: "#EAEAEA",
    ink: "#171717",
    muted: "#666666",
    accent: "#171717",
    accentFg: "#FFFFFF"
  },
  dark: {
    canvas: "#000000",
    surface: "#0A0A0A",
    elevated: "#141414",
    border: "#242424",
    ink: "#EDEDED",
    muted: "#888888",
    accent: "#EDEDED",
    accentFg: "#000000"
  },
  rules: [
    "Primary CTAs invert foreground/background (#EDEDED on #000000) without chromatic fill.",
    "Expose structural 1px grid lines edge-to-edge across sections; align metrics with tabular-nums.",
    "Use semantic color dots (emerald/amber/red) only for deployment status indicators."
  ]
};
