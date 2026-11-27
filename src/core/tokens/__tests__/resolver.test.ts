import { describe, expect, it } from "vitest";
import {
  type BrandSkinContract,
  resolveWorkbenchTokens,
  serializeTokensCss
} from "@/core/tokens";

const MOCK_BRAND: BrandSkinContract = {
  id: "linear",
  name: "Linear",
  fonts: {
    display: "Geist",
    body: "Geist",
    mono: "Geist Mono",
    tracking: "-0.03em",
    serif: false
  },
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
  }
};

describe("core/tokens", () => {
  it("resolves default uifino dark palette and falls back invalid radius to 8px", () => {
    const tk = resolveWorkbenchTokens({ radius: 99, density: "invalid" });
    expect(tk.radius).toBe(8);
    expect(tk.density).toBe("default");
    expect(tk.canvas).toBe("#161618");
    expect(tk.accent).toBe("#CEFF00");
    expect(tk.twCard).toBe("rounded-lg");
  });

  it("applies brand skin palette across light and dark modes and serializes CSS", () => {
    const tk = resolveWorkbenchTokens({
      radius: 4,
      density: "compact",
      skinId: "linear",
      mode: "dark",
      brands: [MOCK_BRAND]
    });
    expect(tk.skinName).toBe("Linear");
    expect(tk.accent).toBe("#5E6AD2");
    expect(tk.card).toBe("4px");
    expect(tk.padCard).toBe("12px");

    const css = serializeTokensCss(tk);
    expect(css).toContain("--ui-accent: #5E6AD2;");
    expect(css).toContain("--ui-radius-card: 4px;");
  });
});
