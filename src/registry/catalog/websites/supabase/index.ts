import type { CatalogBrandSpec } from "@/core/design-md";

export const supabaseSpec: CatalogBrandSpec = {
  id: "supabase",
  slug: "supabase.com",
  name: "Supabase",
  kind: "website",
  platformLabel: "Web · Postgres Cloud",
  category: "DevTools",
  tags: ["devtools", "dark", "emerald", "code"],
  summaryZh: "炭绿冷灰深色基底（#121212）配翠绿终端高亮（#3ECF8E），数据库表结构与代码块高对比呈现。",
  summaryEn:
    "Deep carbon slate (#121212) paired with phosphor emerald (#3ECF8E) terminal highlights and schema panels.",
  fonts: {
    display: "Geist",
    body: "Geist",
    mono: "Geist Mono",
    tracking: "-0.024em",
    serif: false
  },
  radiusScale: ["4px", "6px", "8px", "9999px"],
  defaultRadius: "6px",
  spacingScale: [4, 8, 12, 16, 24, 32, 48, 64],
  archetype: "schema-console",
  ctaLabel: "Start project",
  light: {
    canvas: "#FCFCFC",
    surface: "#F4F5F6",
    elevated: "#EAECEF",
    border: "#DFE3E8",
    ink: "#171717",
    muted: "#5C6470",
    accent: "#16A34A",
    accentFg: "#FFFFFF"
  },
  dark: {
    canvas: "#121212",
    surface: "#1C1C1C",
    elevated: "#242424",
    border: "#2E2E2E",
    ink: "#EDEDED",
    muted: "#898989",
    accent: "#3ECF8E",
    accentFg: "#0F1713"
  },
  rules: [
    "Pair #3ECF8E fills with dark #0F1713 text to preserve >= 8:1 button legibility.",
    "Frame SQL and API snippets in #161616 containers with subtle emerald active tab underline.",
    "Keep dashboard density tight with 1px table grid dividers."
  ]
};
