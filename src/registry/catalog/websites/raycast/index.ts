import type { CatalogBrandSpec } from "@/core/design-md";

export const raycastSpec: CatalogBrandSpec = {
  id: "raycast",
  slug: "raycast.com",
  name: "Raycast",
  kind: "website",
  platformLabel: "Web · Launcher",
  category: "DevTools",
  tags: ["dark", "devtools", "cmdk", "crimson"],
  summaryZh: "深石墨玻璃层叠面板、顶部 1px 高光描边与高饱和珊瑚红（#FF6363）快捷键视觉锚点。",
  summaryEn:
    "Graphite dark surfaces, 1px top inner rim highlights, crisp keycap badges, and coral-red (#FF6363) energy.",
  fonts: {
    display: "Geist",
    body: "Geist",
    mono: "Geist Mono",
    tracking: "-0.028em",
    serif: false
  },
  radiusScale: ["4px", "8px", "10px", "14px", "9999px"],
  defaultRadius: "10px",
  spacingScale: [4, 8, 12, 16, 20, 32, 48, 72],
  archetype: "cmdk-launcher",
  ctaLabel: "Download",
  light: {
    canvas: "#F8F8F9",
    surface: "#FFFFFF",
    elevated: "#EFEFF2",
    border: "#E1E1E6",
    ink: "#121215",
    muted: "#65656F",
    accent: "#E5484D",
    accentFg: "#FFFFFF"
  },
  dark: {
    canvas: "#0C0D0F",
    surface: "#15161A",
    elevated: "#1E2026",
    border: "#2A2C34",
    ink: "#F5F6F8",
    muted: "#8E929E",
    accent: "#FF6363",
    accentFg: "#111113"
  },
  rules: [
    "Add inset 0 1px 0 rgba(255,255,255,0.08) top highlight to floating command palettes.",
    "Render keyboard shortcuts inside 20px square keycaps with monospace legends.",
    "Keep list row height compact (36px–40px) for rapid keyboard scanning."
  ]
};
