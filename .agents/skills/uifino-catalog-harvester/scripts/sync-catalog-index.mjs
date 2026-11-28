#!/usr/bin/env node
/**
 * UIFino Zero-Conflict Catalog Barrel Generator
 *
 * Scans src/registry/catalog/websites/* and src/registry/catalog/apps/*
 * and regenerates src/registry/catalog/index.ts deterministically so parallel
 * fleet workers never collide on the barrel file.
 *
 * Usage:
 *   node .agents/skills/uifino-catalog-harvester/scripts/sync-catalog-index.mjs [--dry-run]
 */

import fs from "node:fs";
import path from "node:path";

const dryRun = process.argv.includes("--dry-run");
const catalogDir = path.resolve("src", "registry", "catalog");

const PINNED_WEBSITE_ORDER = [
  "linear",
  "claude",
  "vercel",
  "stripe",
  "raycast",
  "supabase",
  "notion",
  "resend"
];

const PINNED_APP_ORDER = ["arc-search", "flighty", "luma-app", "mercury-app"];

function discoverSpecs(subDir, pinnedOrder) {
  const fullDir = path.join(catalogDir, subDir);
  if (!fs.existsSync(fullDir)) return [];

  const dirs = fs
    .readdirSync(fullDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  dirs.sort((a, b) => {
    const ia = pinnedOrder.indexOf(a);
    const ib = pinnedOrder.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.localeCompare(b);
  });

  const items = [];
  for (const slug of dirs) {
    const entryPath = path.join(fullDir, slug, "index.ts");
    if (!fs.existsSync(entryPath)) continue;
    const src = fs.readFileSync(entryPath, "utf8");
    const match = src.match(/export\s+const\s+([A-Za-z0-9_]+)\s*:\s*CatalogBrandSpec\b/);
    if (!match) {
      console.warn(`[skip] No exported CatalogBrandSpec found in ${entryPath}`);
      continue;
    }
    items.push({ slug, exportName: match[1], importPath: `./${subDir}/${slug}` });
  }
  return items;
}

const websites = discoverSpecs("websites", PINNED_WEBSITE_ORDER);
const apps = discoverSpecs("apps", PINNED_APP_ORDER);

const allImports = [...apps, ...websites]
  .sort((a, b) => a.importPath.localeCompare(b.importPath))
  .map((it) => `import { ${it.exportName} } from "${it.importPath}";`)
  .join("\n");

const webList = websites.map((w) => `  ${w.exportName}`).join(",\n");
const appList = apps.map((a) => `  ${a.exportName}`).join(",\n");

const content = `import type { CatalogBrandSpec } from "@/core/design-md";
${allImports}

export * from "./_taxonomy";
export * from "./portrait";

export const WEBSITE_CATALOG_ITEMS: readonly CatalogBrandSpec[] = [
${webList}
];

export const APP_CATALOG_ITEMS: readonly CatalogBrandSpec[] = [
${appList}
];

export const CATALOG_ITEMS: readonly CatalogBrandSpec[] = [
  ...WEBSITE_CATALOG_ITEMS,
  ...APP_CATALOG_ITEMS
];

export function findCatalogBrandById(id: string): CatalogBrandSpec | undefined {
  return CATALOG_ITEMS.find((item) => item.id === id);
}
`;

const targetFile = path.join(catalogDir, "index.ts");
if (dryRun) {
  console.log(`[dry-run] Discovered ${websites.length} websites and ${apps.length} apps.`);
  console.log(content);
} else {
  fs.writeFileSync(targetFile, content, "utf8");
  console.log(`[sync] Updated ${targetFile} (${websites.length} websites, ${apps.length} apps).`);
}
