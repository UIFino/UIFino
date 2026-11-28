#!/usr/bin/env node
// UIFino Zero-Conflict Components Category Barrel Synchronizer
// Scans src/registry/components/{sections,blocks,motion}/<category>/<slug>/meta.ts
// and updates each <category>/_category.ts items list & totalCount deterministically.

import fs from "node:fs";
import path from "node:path";

const dryRun = process.argv.includes("--dry-run");
const compRoot = path.resolve("src", "registry", "components");
let totalCategories = 0;
let totalItems = 0;

for (const group of ["sections", "blocks", "motion"]) {
  const groupDir = path.join(compRoot, group);
  if (!fs.existsSync(groupDir)) continue;

  for (const catEntry of fs.readdirSync(groupDir, { withFileTypes: true })) {
    if (!catEntry.isDirectory()) continue;
    const catDir = path.join(groupDir, catEntry.name);
    const catMetaPath = path.join(catDir, "_category.ts");
    if (!fs.existsSync(catMetaPath)) continue;

    const itemDirs = fs
      .readdirSync(catDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort((a, b) => a.localeCompare(b));

    const discovered = [];
    for (const slug of itemDirs) {
      const metaPath = path.join(catDir, slug, "meta.ts");
      if (!fs.existsSync(metaPath)) continue;
      const mSrc = fs.readFileSync(metaPath, "utf8");
      const exp = mSrc.match(/export\s+const\s+([A-Za-z0-9_]+)\s*:\s*ComponentAssetMeta\b/);
      if (exp) {
        discovered.push({ slug, exportName: exp[1] });
      }
    }

    if (discovered.length === 0) continue;
    totalCategories += 1;
    totalItems += discovered.length;

    const origCatSrc = fs.readFileSync(catMetaPath, "utf8");
    // Preserve existing category metadata properties while updating imports, totalCount, and items array
    const catConstMatch = origCatSrc.match(/export\s+const\s+([A-Za-z0-9_]+)\s*:\s*RegisteredComponentCategory\s*=\s*\{([\s\S]*?)\n\};/);
    if (!catConstMatch) continue;

    const catConstName = catConstMatch[1];
    let body = catConstMatch[2];
    body = body
      .replace(/totalCount\s*:\s*\d+/, `totalCount: ${discovered.length}`)
      .replace(/items\s*:\s*\[[\s\S]*?\]/, `items: [${discovered.map((d) => d.exportName).join(", ")}]`);

    const importLines = [
      `import type { RegisteredComponentCategory } from "../../_taxonomy";`,
      ...discovered.map((d) => `import { ${d.exportName} } from "./${d.slug}/meta";`)
    ].join("\n");

    const nextSrc = `${importLines}\n\nexport const ${catConstName}: RegisteredComponentCategory = {${body}\n};\n`;
    if (!dryRun) {
      fs.writeFileSync(catMetaPath, nextSrc, "utf8");
    }
  }
}

console.log(
  `${dryRun ? "[dry-run]" : "[sync]"} Scanned ${totalCategories} component categories (${totalItems} total components).`
);
