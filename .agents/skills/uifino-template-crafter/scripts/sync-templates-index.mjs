#!/usr/bin/env node
// UIFino Zero-Conflict Templates Barrel Synchronizer
// Scans src/registry/templates/<slug>/meta.ts and regenerates src/registry/templates/index.ts.

import fs from "node:fs";
import path from "node:path";

const dryRun = process.argv.includes("--dry-run");
const tplRoot = path.resolve("src", "registry", "templates");

const PINNED_ORDER = [
  "obsidian-saas-kit",
  "parchment-agent-desk",
  "ledger-telemetry-admin",
  "monochrome-docs-hub",
  "swiss-studio-portfolio",
  "minimal-tech-weekly",
  "devtools-launch-page",
  "tiered-pricing-page",
  "passkey-auth-page",
  "observability-console-page",
  "release-changelog-page",
  "workspace-settings-page"
];

const dirs = fs
  .readdirSync(tplRoot, { withFileTypes: true })
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

const items = [];
for (const slug of dirs) {
  const metaPath = path.join(tplRoot, slug, "meta.ts");
  if (!fs.existsSync(metaPath)) continue;
  const src = fs.readFileSync(metaPath, "utf8");
  const m = src.match(/export\s+const\s+([A-Za-z0-9_]+)\s*:\s*StarterTemplateSpec\b/);
  if (m) items.push({ slug, exportName: m[1] });
}

const imports = items
  .slice()
  .sort((a, b) => a.slug.localeCompare(b.slug))
  .map((it) => `import { ${it.exportName} } from "./${it.slug}/meta";`)
  .join("\n");

const out = `${imports}
import type { StarterTemplateSpec } from "./_taxonomy";

export * from "./_taxonomy";
export * from "./details";
export * from "./specimen";
export * from "./live-sandbox";

export const TEMPLATE_ITEMS: readonly StarterTemplateSpec[] = [
${items.map((it) => `  ${it.exportName}`).join(",\n")}
];

export function findTemplateById(id: string): StarterTemplateSpec | undefined {
  return TEMPLATE_ITEMS.find((tpl) => tpl.id === id);
}
`;

const target = path.join(tplRoot, "index.ts");
if (dryRun) {
  console.log(`[dry-run] Discovered ${items.length} templates.`);
} else {
  fs.writeFileSync(target, out, "utf8");
  console.log(`[sync] Updated ${target} (${items.length} templates).`);
}
