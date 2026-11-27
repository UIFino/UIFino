import { describe, expect, it } from "vitest";
import {
  type ComponentAssetMeta,
  type ComponentCategoryMeta,
  generateFrameworkSource,
  getComponentVirtualFiles
} from "@/core/codegen";
import { resolveWorkbenchTokens } from "@/core/tokens";

const ITEM: ComponentAssetMeta = {
  id: "hero-telemetry-counter",
  name: "Telemetry Counter Hero",
  subcat: "Stats & Live Data",
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
  name: "Hero Sections",
  nameZh: "首屏区块",
  totalCount: 28,
  miniKind: "hero",
  descEn: "Above-the-fold sections.",
  descZh: "首屏区块。"
};

describe("core/codegen", () => {
  it("generates virtual file list and framework-specific code across React, Vue, Svelte, Solid", () => {
    expect(getComponentVirtualFiles(ITEM, "vue")[0]).toBe("HeroTelemetryCounter.vue");
    expect(getComponentVirtualFiles(ITEM, "svelte")[0]).toBe("HeroTelemetryCounter.svelte");
    expect(getComponentVirtualFiles(ITEM, "react")[0]).toBe("HeroTelemetryCounter.tsx");

    const tokens = resolveWorkbenchTokens({ radius: 0, density: "spacious" });
    const reactCode = generateFrameworkSource(ITEM, CATEGORY, "react", tokens);
    const vueCode = generateFrameworkSource(ITEM, CATEGORY, "vue", tokens);
    const svelteCode = generateFrameworkSource(ITEM, CATEGORY, "svelte", tokens);
    const solidCode = generateFrameworkSource(ITEM, CATEGORY, "solid", tokens);

    expect(reactCode).toContain("rounded-none");
    expect(vueCode).toContain("<script setup lang=\"ts\">");
    expect(svelteCode).toContain("$props()");
    expect(solidCode).toContain("createSignal");

    const mdOut = generateFrameworkSource(ITEM, CATEGORY, "react", tokens, "DESIGN.md");
    expect(mdOut).toContain('asset: "hero-telemetry-counter"');
  });
});
