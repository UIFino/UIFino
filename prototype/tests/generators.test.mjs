// Unit tests for core business logic (generators, token computation, framework codegen, tools & MCP retrieval)
import assert from "node:assert/strict";
import test from "node:test";

import {
  computeWorkbenchTokens,
  generateBackgroundOutput,
  generateDesignMd,
  generateFrameworkCode,
  generateShadowOutput,
  getComponentFileList,
  queryMcpAssets
} from "../js/core/generators.js";
import { CATALOG_ITEMS } from "../js/data/catalog-data.js";
import { COMPONENT_CATEGORIES, findAssetByPath } from "../js/data/components-data.js";

test("catalog contains both Website and Mobile App entries with complete Light/Dark tokens", () => {
  const websites = CATALOG_ITEMS.filter((x) => x.kind === "website");
  const apps = CATALOG_ITEMS.filter((x) => x.kind === "app");
  assert.ok(websites.length >= 6);
  assert.ok(apps.length >= 4);

  for (const entry of CATALOG_ITEMS) {
    assert.match(entry.light.canvas, /^#[0-9A-Fa-f]{6}$/);
    assert.match(entry.dark.canvas, /^#[0-9A-Fa-f]{6}$/);
    assert.match(entry.dark.accent, /^#[0-9A-Fa-f]{6}$/);
    const md = generateDesignMd(entry);
    assert.ok(md.includes(`slug: "${entry.slug}"`));
    assert.ok(md.includes("colors:\n  light:"));
    assert.ok(md.includes("  dark:"));
  }
});

test("components registry covers all 4 required asset classes: section, block, page, motion", () => {
  const types = new Set(COMPONENT_CATEGORIES.map((c) => c.assetType));
  assert.deepEqual([...types].sort(), ["block", "motion", "page", "section"]);
});

test("computeWorkbenchTokens resolves radius, density, and brand skin accurately", () => {
  const linearDark = computeWorkbenchTokens({ radius: 0, density: "compact", skinId: "linear", mode: "dark" });
  assert.equal(linearDark.card, "0px");
  assert.equal(linearDark.twCard, "rounded-none");
  assert.equal(linearDark.padCard, "12px");
  assert.equal(linearDark.accent, "#5E6AD2");

  const claudeLight = computeWorkbenchTokens({ radius: 12, density: "spacious", skinId: "claude", mode: "light" });
  assert.equal(claudeLight.card, "12px");
  assert.equal(claudeLight.twCard, "rounded-xl");
  assert.equal(claudeLight.canvas, "#FAF9F5");
  assert.equal(claudeLight.fontDisplay, "var(--font-serif)");
});

test("generateFrameworkCode outputs valid source across React, Vue, Svelte, Solid, tokens.css & DESIGN.md", () => {
  const { category, item } = findAssetByPath("hero/hero-telemetry-counter");
  const tokens = computeWorkbenchTokens({ radius: 4, density: "compact", skinId: "vercel", mode: "dark" });

  const reactCode = generateFrameworkCode(item, category, "react", tokens);
  assert.ok(reactCode.includes("export const UifinoAssetStage"));
  assert.ok(reactCode.includes("rounded-[4px]"));
  assert.ok(!reactCode.includes("undefined"));

  const vueFiles = getComponentFileList(item, "vue");
  assert.ok(vueFiles[0].endsWith(".vue"));
  const vueCode = generateFrameworkCode(item, category, "vue", tokens);
  assert.ok(vueCode.includes("<script setup lang=\"ts\">"));
  assert.ok(vueCode.includes("<template>"));
  assert.ok(!vueCode.includes("undefined"));

  const svelteCode = generateFrameworkCode(item, category, "svelte", tokens);
  assert.ok(svelteCode.includes("$props()"));
  assert.ok(!svelteCode.includes("undefined"));

  const solidCode = generateFrameworkCode(item, category, "solid", tokens);
  assert.ok(solidCode.includes("createSignal"));
  assert.ok(!solidCode.includes("undefined"));

  const cssTokens = generateFrameworkCode(item, category, "react", tokens, "tokens.css");
  assert.ok(cssTokens.includes("--ui-radius-card: 4px;"));

  const assetMd = generateFrameworkCode(item, category, "react", tokens, "DESIGN.md");
  assert.ok(assetMd.includes(`asset: "${item.id}"`));
});

test("generateBackgroundOutput and generateShadowOutput support both CSS and Tailwind formats", () => {
  for (const engine of ["grid", "dots", "aurora", "grain"]) {
    const cssOut = generateBackgroundOutput({ engine, cellSize: 28, opacity: 35 }, "css");
    const twOut = generateBackgroundOutput({ engine, cellSize: 28, opacity: 35 }, "tailwind");
    assert.ok(cssOut.code.includes(".uifino-surface-bg"));
    assert.ok(twOut.code.includes("<div class="));
  }

  const shCss = generateShadowOutput({ yOffset: 16, blur: 40, opacity: 50, rimLight: 12, radius: 10 }, "css");
  const shTw = generateShadowOutput({ yOffset: 16, blur: 40, opacity: 50, rimLight: 12, radius: 10 }, "tailwind");
  assert.ok(shCss.boxShadow.includes("inset 0 1px 0"));
  assert.ok(shTw.code.includes("rounded-[10px]"));
});

test("queryMcpAssets filters across catalog, components, and surface presets", () => {
  const res = queryMcpAssets({ query: "serif", style: "warm-editorial", layout: "all", assetType: "all" });
  assert.ok(res.brands.some((b) => b.id === "claude"));
  assert.ok(res.assets.some((a) => a.id.includes("editorial")));
  const parsed = JSON.parse(res.jsonPayload);
  assert.equal(parsed.protocol, "uifino-mcp/1.0");
  assert.ok(Array.isArray(parsed.matched_design_md));
});
