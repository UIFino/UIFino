import { describe, expect, it } from "vitest";
import {
  type ComponentAssetMeta,
  type ComponentCategoryMeta,
  generateComponentSource,
  getComponentVirtualFiles
} from "@/core/codegen";
import { resolveWorkbenchTokens } from "@/core/tokens";

const ITEM: ComponentAssetMeta = {
  id: "hero-telemetry-counter",
  name: "Telemetry Counter Hero",
  nameZh: "遥测数字首屏",
  subcat: "Metrics",
  layout: "split-hero",
  archetype: "telemetry-hero",
  tags: ["hero", "counter"],
  descEn: "Centered architectural headline.",
  descZh: "紧凑标题搭配四栏数字。",
  contract: ["Apply tabular-nums on metrics."]
};

const CATEGORY: ComponentCategoryMeta = {
  id: "hero",
  assetType: "section",
  name: "Hero",
  nameZh: "首屏",
  totalCount: 28,
  miniKind: "hero",
  descEn: "Above-the-fold sections.",
  descZh: "首屏区块。"
};

describe("core/codegen", () => {
  it("generates clean React + Tailwind source, tokens.css, and DESIGN.md", () => {
    expect(getComponentVirtualFiles(ITEM)).toEqual([
      "HeroTelemetryCounter.tsx",
      "tokens.css",
      "DESIGN.md"
    ]);

    const tokens = resolveWorkbenchTokens({ radius: 0, density: "spacious" });
    const tsxCode = generateComponentSource(ITEM, CATEGORY, tokens);
    const cssCode = generateComponentSource(ITEM, CATEGORY, tokens, "tokens.css");
    const mdOut = generateComponentSource(ITEM, CATEGORY, tokens, "DESIGN.md");

    expect(tsxCode).toContain("rounded-none");
    expect(cssCode).toContain("--ui-radius-card: 0px;");
    expect(mdOut).toContain('asset: "hero-telemetry-counter"');
  });
});
