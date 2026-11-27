import type { CatalogBrandSpec } from "@/core/design-md";

export const linearSpec: CatalogBrandSpec = {
  id: "linear",
  slug: "linear.app",
  name: "Linear",
  kind: "website",
  platformLabel: "Web · SaaS",
  category: "Productivity",
  installs: "27.4K",
  bookmarks: "1,840",
  tags: ["dark", "minimal", "saas", "hairline", "indigo"],
  summaryZh: "深曜石画布（#08090A）配 1px 炭灰细线与单一克制的靛紫焦点色（#5E6AD2），高密度工程软件质感。",
  summaryEn:
    "Near-black obsidian canvas (#08090A), 1px charcoal hairlines, and a single restrained lavender-indigo accent (#5E6AD2).",
  fonts: { display: "Geist", body: "Geist", mono: "Geist Mono", tracking: "-0.03em", serif: false },
  radiusScale: ["0px", "4px", "6px", "8px", "9999px"],
  defaultRadius: "6px",
  spacingScale: [4, 8, 12, 16, 24, 32, 48, 64],
  archetype: "kanban-saas",
  ctaLabel: "Start building",
  light: {
    canvas: "#FFFFFF",
    surface: "#F6F7F9",
    elevated: "#ECEEF2",
    border: "#E2E5EC",
    ink: "#08090A",
    muted: "#5E636E",
    accent: "#5E6AD2",
    accentFg: "#FFFFFF"
  },
  dark: {
    canvas: "#08090A",
    surface: "#121316",
    elevated: "#1A1C20",
    border: "#23252A",
    ink: "#F7F8F8",
    muted: "#8A8F98",
    accent: "#5E6AD2",
    accentFg: "#FFFFFF"
  },
  rules: [
    "Keep 92% of surface area neutral; reserve #5E6AD2 strictly for primary action and focus rings.",
    "Separate panels with 1px solid borders (#23252A dark / #E2E5EC light) rather than heavy drop shadows.",
    "Set display headings at 500–600 weight with -0.03em letter-spacing and tight 1.08 line-height."
  ]
};
