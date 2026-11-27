import { describe, expect, it } from "vitest";
import { type CatalogBrandSpec, compileBrandDesignMd } from "@/core/design-md";

const LINEAR_SPEC: CatalogBrandSpec = {
  id: "linear",
  slug: "linear.app",
  name: "Linear",
  kind: "website",
  platformLabel: "Web · SaaS",
  category: "Productivity",
  installs: "27.4K",
  bookmarks: "1,840",
  tags: ["dark", "minimal"],
  summaryZh: "深曜石画布配 1px 细线。",
  summaryEn: "Near-black obsidian canvas (#08090A) and 1px hairlines.",
  fonts: { display: "Geist", body: "Geist", mono: "Geist Mono", tracking: "-0.03em", serif: false },
  radiusScale: ["0px", "4px", "6px", "8px"],
  defaultRadius: "6px",
  spacingScale: [4, 8, 12, 16],
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
  rules: ["Keep 92% of surface area neutral."]
};

describe("core/design-md", () => {
  it("compiles YAML frontmatter and structured markdown sections", () => {
    const md = compileBrandDesignMd(LINEAR_SPEC);
    expect(md).toContain("protocol: uifino/design-md@1.0");
    expect(md).toContain('slug: "linear.app"');
    expect(md).toContain("# Linear — DESIGN.md Protocol");
    expect(md).toContain("1. Keep 92% of surface area neutral.");
  });
});
