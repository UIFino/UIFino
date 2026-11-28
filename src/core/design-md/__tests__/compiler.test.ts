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
  defaultTheme: "dark",
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
  antiAiRulesEn: ["Never use rainbow headline gradients."],
  scraped: {
    capturedAt: "2026-11-28",
    containerMaxWidth: "1200px",
    pages: [
      {
        id: "home",
        titleZh: "首页",
        titleEn: "Home",
        path: "/",
        url: "https://linear.app/",
        desktopImg: "/catalog/linear/pages/home-desktop.jpg",
        mobileImg: "/catalog/linear/pages/home-mobile.jpg",
        anatomy: [
          {
            index: "01",
            nameZh: "导航栏",
            nameEn: "Sticky Navbar",
            layoutZh: "单行",
            layoutEn: "Single Row",
            noteZh: "73px 吸顶模糊导航",
            noteEn: "73px sticky blur header",
            bounds: { desktop: { topPct: 0, heightPct: 2.5 }, mobile: { topPct: 0, heightPct: 3 } }
          }
        ]
      },
      {
        id: "pricing",
        titleZh: "定价",
        titleEn: "Pricing",
        path: "/pricing",
        url: "https://linear.app/pricing",
        desktopImg: "/catalog/linear/pages/pricing-desktop.jpg",
        mobileImg: "/catalog/linear/pages/pricing-mobile.jpg",
        anatomy: [
          {
            index: "01",
            nameZh: "四档定价",
            nameEn: "4-Tier Pricing",
            layoutZh: "四列",
            layoutEn: "4-Col",
            noteZh: "1px 竖线分割",
            noteEn: "1px vertical hairline columns"
          }
        ]
      }
    ],
    sections: [],
    measuredColors: [
      { roleZh: "画布底", roleEn: "Body Canvas", cssVar: "--brand-canvas", hex: "#08090A", share: "68%" }
    ],
    measuredTypography: [
      {
        level: "H1 Hero",
        detectedFamily: "Inter Variable",
        freeAlternative: "Inter",
        size: "64px",
        weight: "510",
        lineHeight: "1.00",
        tracking: "-0.022em",
        cssSnippet: "font-size: 64px;"
      }
    ],
    measuredGeometry: [
      {
        targetZh: "按钮",
        targetEn: "Pill CTA",
        radius: "9999px",
        border: "1px solid #E5E5E6",
        shadow: "none",
        cssSnippet: "border-radius: 9999px;"
      }
    ],
    hoverDiffs: [
      {
        targetZh: "主按钮",
        targetEn: "Primary CTA",
        restBg: "#E5E5E6",
        restBorder: "#E5E5E6",
        restColor: "#08090A",
        hoverBg: "#FFFFFF",
        hoverBorder: "#FFFFFF",
        hoverColor: "#08090A",
        transition: "160ms ease",
        cssSnippet: ""
      }
    ]
  }
};

describe("core/design-md", () => {
  it("compiles complete DESIGN.md with fit_for, avoid_for, anti-AI guardrails, and full scraped audit", () => {
    const md = compileBrandDesignMd(MOCK_BRAND);
    expect(md).toContain("protocol: uifino/design-md@2.0");
    expect(md).toContain('fit_for: ["Developer Landing", "Changelog"]');
    expect(md).toContain("- **DON'T**: Never use rainbow headline gradients.");
    expect(md).toContain("### Measured Color Area Share");
    expect(md).toContain("| Body Canvas | `--brand-canvas` | `#08090A` | 68% |");
    expect(md).toContain("### Measured Typography & Free Open-Source Alternatives");
    expect(md).toContain("| H1 Hero | Inter Variable | `Inter` |");
    expect(md).toContain("Container Max Width: `1200px`");
    expect(md).toContain("### Interactive Hover Transitions");
    expect(md).toContain("### Page: Pricing (`/pricing`)");
  });

  it("compiles paste-ready :root, .dark, and Tailwind v4 @theme CSS tokens", () => {
    const css = compileBrandTokensCss(MOCK_BRAND);
    expect(css).toContain("--brand-canvas: #FFFFFF;");
    expect(css).toContain("--brand-canvas: #08090A;");
    expect(css).toContain("@theme inline");
  });
});
