import { describe, expect, it } from "vitest";
import { computeBackgroundStudio } from "@/core/studios/background";
import { computeShadowStudio } from "@/core/studios/shadow";

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
});
