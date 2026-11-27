import { describe, expect, it } from "vitest";
import { computeBackgroundStudio } from "@/core/studios/background";
import { computeWcagContrast, generateColorShadeScale } from "@/core/studios/colors";
import { computeShadowStudio } from "@/core/studios/shadow";
import { computeTypeScale } from "@/core/studios/typography";

describe("core/studios", () => {
  it("computes background CSS and Tailwind snippets across engines", () => {
    const gridCss = computeBackgroundStudio({ engine: "grid", cellSize: 40 }, "css");
    expect(gridCss.code).toContain(".uifino-surface-bg");
    expect(gridCss.backgroundSize).toContain("40px 40px");

    const auroraTw = computeBackgroundStudio({ engine: "aurora", accent: "#ceff00" }, "tailwind");
    expect(auroraTw.code).toContain("[background-image:radial-gradient");
  });

  it("computes multi-layer rim-lit shadows and flat zero-opacity fallback", () => {
    const flat = computeShadowStudio({ opacity: 0, rimLight: 0 }, "tailwind");
    expect(flat.boxShadow).toBe("none");
    expect(flat.code).toContain("shadow-none");

    const elevated = computeShadowStudio({ yOffset: 16, blur: 36, opacity: 45, rimLight: 12 }, "css");
    expect(elevated.boxShadow).toContain("inset 0 1px 0 0");
    expect(elevated.code).toContain("--surface-shadow:");
  });

  it("generates 11-stop shade ladders and WCAG 2.1 contrast ratios", () => {
    const shades = generateColorShadeScale("#5E6AD2");
    expect(shades).toHaveLength(11);
    expect(shades.find((s) => s.stop === 500)?.hex).toBe("#5E6AD2");

    const audit = computeWcagContrast("#FFFFFF", "#0A0B0E");
    expect(audit.ratio).toBeGreaterThan(15);
    expect(audit.aaNormal).toBe(true);
    expect(audit.aaaNormal).toBe(true);
  });

  it("computes modular typography scales cleanly", () => {
    const scale = computeTypeScale(16, 1.25);
    const base = scale.find((s) => s.token === "base");
    const xl = scale.find((s) => s.token === "xl");
    expect(base?.px).toBe(16);
    expect(xl?.px).toBe(25);
  });
});
