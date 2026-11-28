#!/usr/bin/env node
/**
 * UIFino Zero-Conflict Styles Barrel Generator
 *
 * Scans src/registry/styles/* and regenerates src/registry/styles/index.ts.
 */

import fs from "node:fs";
import path from "node:path";

const dryRun = process.argv.includes("--dry-run");
const stylesRoot = path.resolve("src", "registry", "styles");

const PINNED_ORDER = [
  "hairline-grid",
  "monochrome-minimal",
  "swiss-typographic",
  "clean-saas",
  "editorial-serif",
  "frosted-glass",
  "bento-modular",
  "neo-brutalism",
  "soft-tactile",
  "retro-terminal"
];

const dirs = fs
  .readdirSync(stylesRoot, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
  .map((d) => d.name)
  .sort((a, b) => {
    const ia = PINNED_ORDER.indexOf(a);
    const ib = PINNED_ORDER.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.localeCompare(b);
  });

const minimal = [];
const expressive = [];
const imports = [];

for (const slug of dirs) {
  const entry = path.join(stylesRoot, slug, "index.ts");
  if (!fs.existsSync(entry)) continue;
  const src = fs.readFileSync(entry, "utf8");
  const expMatch = src.match(/export\s+const\s+([A-Za-z0-9_]+)\s*:\s*UiStyleSpec\b/);
  if (!expMatch) continue;
  const exportName = expMatch[1];
  const groupMatch = src.match(/group\s*:\s*["'](minimal|expressive)["']/);
  const group = groupMatch ? groupMatch[1] : "minimal";

  imports.push({ slug, exportName });
  if (group === "expressive") expressive.push(exportName);
  else minimal.push(exportName);
}

const importBlock = imports
  .slice()
  .sort((a, b) => a.slug.localeCompare(b.slug))
  .map((it) => `import { ${it.exportName} } from "./${it.slug}";`)
  .join("\n");

const out = `import type { UiStyleSpec } from "@/core/styles";
${importBlock}

export * from "./_taxonomy";
export * from "./_fit";

export const MINIMAL_STYLE_ITEMS: readonly UiStyleSpec[] = [
${minimal.map((n) => `  ${n}`).join(",\n")}
];

export const EXPRESSIVE_STYLE_ITEMS: readonly UiStyleSpec[] = [
${expressive.map((n) => `  ${n}`).join(",\n")}
];

export const STYLE_ITEMS: readonly UiStyleSpec[] = [
  ...MINIMAL_STYLE_ITEMS,
  ...EXPRESSIVE_STYLE_ITEMS
];

export function findUiStyleBySlug(slug: string): UiStyleSpec | undefined {
  return STYLE_ITEMS.find((item) => item.slug === slug);
}
`;

const target = path.join(stylesRoot, "index.ts");
if (dryRun) {
  console.log(`[dry-run] Discovered ${minimal.length} minimal + ${expressive.length} expressive styles.`);
} else {
  fs.writeFileSync(target, out, "utf8");
  console.log(`[sync] Updated ${target} (${minimal.length + expressive.length} styles).`);
}
