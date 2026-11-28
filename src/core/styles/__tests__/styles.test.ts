import { describe, expect, it } from "vitest";
import { compileStyleDesignMd, resolveStylePlaygroundPhysics, type UiStyleSpec } from "../index";

const MOCK_BRUTAL_STYLE: UiStyleSpec = {
  id: "neo-brutalism",
  slug: "neo-brutalism",
  name: "Neo-Brutalism",
  nameZh: "新粗野高反差",
  group: "expressive",
  primaryTone: "light",
  scenarios: ["landing"],
  swatch: ["#FFFDF5", "#FF5C00"],
  summaryEn: "Bold 2px ink borders and hard zero-blur offset shadows.",
  summaryZh: "2px 纯黑粗描边与零模糊硬偏移阴影。",
  defaultRadius: 4,
  radiusLabelEn: "4px Crisp Box",
  radiusLabelZh: "4px 硬朗方角",
  borderSpec: "2px solid #111111",
  shadowSpec: "4px 4px 0px #111111",
  surfaceEffect: "brutalist-offset",
  fonts: {
    display: "Inter",
    body: "Inter",
    mono: "JetBrains Mono",
    tracking: "-0.03em",
    serif: false
  },
  light: {
    canvas: "#FFFDF5",
    surface: "#FFFFFF",
    elevated: "#FFF4CC",
    border: "#111111",
    ink: "#111111",
    muted: "#4A4A4A",
    accent: "#FF5C00",
    accentFg: "#FFFFFF"
  },
  dark: {
    canvas: "#121212",
    surface: "#1C1C1C",
    elevated: "#262626",
    border: "#F5F5F5",
    ink: "#FFFFFF",
    muted: "#A3A3A3",
    accent: "#FF6B1A",
    accentFg: "#111111"
  },
  dosEn: ["Use 2px solid ink borders and crisp 4px offset shadows."],
  dosZh: ["使用 2px 实心描边与 4px 零模糊硬偏移阴影。"],
  dontsEn: ["Avoid soft multi-layer Gaussian shadows."],
  dontsZh: ["禁止使用柔和多层高斯模糊阴影。"],
  tags: ["brutalism", "offset-shadow", "high-contrast"]
};

describe("core/styles engine", () => {
  it("compiles a complete DESIGN.md protocol for a UI style genre", () => {
    const md = compileStyleDesignMd(MOCK_BRUTAL_STYLE);
    expect(md).toContain('kind: "ui-style"');
    expect(md).toContain('slug: "neo-brutalism"');
    expect(md).toContain("# Neo-Brutalism (新粗野高反差) — UI Style Protocol");
    expect(md).toContain("`#FFFDF5`");
    expect(md).toContain("- **DO**: Use 2px solid ink borders");
  });

  it("resolves distinct 2px border and hard offset shadow physics for Neo-Brutalism", () => {
    const lightPhysics = resolveStylePlaygroundPhysics(MOCK_BRUTAL_STYLE, "light");
    expect(lightPhysics.borderWidthPx).toBe(2);
    expect(lightPhysics.cardShadow).toBe("4px 4px 0px #111111");
    expect(lightPhysics.palette.canvas).toBe("#FFFDF5");
  });

  it("supports self-contained Showcase, Thumbnail, and references slot fields cleanly", () => {
    const slottedStyle: UiStyleSpec = {
      ...MOCK_BRUTAL_STYLE,
      references: ["gumroad.com", "figma.com/brutal"],
      Showcase: ({ physics, isZh }) => (isZh ? physics.palette.canvas : physics.palette.accent),
      Thumbnail: ({ physics }) => physics.palette.surface
    };

    expect(slottedStyle.references).toEqual(["gumroad.com", "figma.com/brutal"]);
    expect(slottedStyle.Showcase).toBeDefined();
    expect(slottedStyle.Thumbnail).toBeDefined();
  });
});
