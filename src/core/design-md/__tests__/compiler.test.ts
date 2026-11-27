import { describe, expect, it } from "vitest";
import {
  type CatalogBrandSpec,
  compileBrandDesignMd,
  compileBrandTokensCss
} from "@/core/design-md";

const MOCK_BRAND: CatalogBrandSpec = {
  id: "linear",
  slug: "linear.app",
  siteUrl: "https://linear.app",
  name: "Linear",
  kind: "website",
  platformLabel: "Web · SaaS",
  category: "Productivity",
  tags: ["dark", "minimal"],
  goodForEn: ["Developer Landing", "Changelog"],
  notForEn: ["Flash-Sale Store"],
  summaryZh: "深色极简工程软件规范",
  summaryEn: "Near-black obsidian canvas with 1px charcoal hairlines.",
  fonts: { display: "Inter", body: "Inter", mono: "JetBrains Mono", tracking: "-0.03em", serif: false },
  radiusScale: ["0px", "6px", "8px"],
  defaultRadius: "6px",
  spacingScale: [4, 8, 12, 16, 24],
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
  rules: ["Keep 92% of surface neutral."],
  antiAiRulesEn: ["Never use rainbow headline gradients."]
};

describe("core/design-md", () => {
  it("compiles complete DESIGN.md with fit_for, avoid_for, and anti-AI guardrails", () => {
    const md = compileBrandDesignMd(MOCK_BRAND);
    expect(md).toContain("protocol: uifino/design-md@2.0");
    expect(md).toContain('fit_for: ["Developer Landing", "Changelog"]');
    expect(md).toContain("- **DON'T**: Never use rainbow headline gradients.");
  });

  it("compiles paste-ready :root, .dark, and Tailwind v4 @theme CSS tokens", () => {
    const css = compileBrandTokensCss(MOCK_BRAND);
    expect(css).toContain("--brand-canvas: #FFFFFF;");
    expect(css).toContain("--brand-canvas: #08090A;");
    expect(css).toContain("@theme inline");
  });
});
