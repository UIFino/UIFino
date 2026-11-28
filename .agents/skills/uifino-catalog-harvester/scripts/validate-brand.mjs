#!/usr/bin/env node
/**
 * UIFino Catalog Brand Quality Gate Validator
 *
 * Usage:
 *   node .agents/skills/uifino-catalog-harvester/scripts/validate-brand.mjs <brand-id> [--kind website|app]
 */

import fs from "node:fs";
import path from "node:path";

const brandId = process.argv[2];
const kindFlagIdx = process.argv.indexOf("--kind");
const kindDir =
  kindFlagIdx !== -1 && process.argv[kindFlagIdx + 1] === "app" ? "apps" : "websites";

if (!brandId) {
  console.error("Usage: node validate-brand.mjs <brand-id> [--kind website|app]");
  process.exit(1);
}

const repoRoot = process.cwd();
const brandDir = path.join(repoRoot, "src", "registry", "catalog", kindDir, brandId);
const indexFile = path.join(brandDir, "index.ts");
const scrapedFile = path.join(brandDir, "scraped.ts");
const publicRoot = path.join(repoRoot, "public");

const errors = [];
const warnings = [];

function checkAssetPath(webPath, label, minBytes = 4096) {
  if (!webPath || !webPath.startsWith("/")) {
    errors.push(`${label}: invalid asset path "${webPath}"`);
    return;
  }
  const diskPath = path.join(publicRoot, webPath.replace(/^\/+/, ""));
  if (!fs.existsSync(diskPath)) {
    errors.push(`${label}: file missing on disk -> ${diskPath}`);
    return;
  }
  const stat = fs.statSync(diskPath);
  if (stat.size < minBytes) {
    errors.push(`${label}: suspiciously small image (${stat.size} bytes < ${minBytes}) -> ${webPath}`);
  }
}

if (!fs.existsSync(indexFile)) {
  errors.push(`Missing brand spec file: ${indexFile}`);
}
if (kindDir === "websites" && !fs.existsSync(scrapedFile)) {
  errors.push(`Missing scraped telemetry file: ${scrapedFile}`);
}

if (fs.existsSync(indexFile)) {
  const indexSrc = fs.readFileSync(indexFile, "utf8");

  for (const requiredField of [
    "id:",
    "slug:",
    "name:",
    "kind:",
    "defaultTheme:",
    "coverImg:",
    "category:",
    "summaryZh:",
    "summaryEn:",
    "openFontAlt:",
    "goodForZh:",
    "notForZh:",
    "light:",
    "dark:",
    "rules:",
    "rulesZh:",
    "antiAiRulesEn:",
    "antiAiRulesZh:",
    "scraped:"
  ]) {
    if (!indexSrc.includes(requiredField)) {
      errors.push(`index.ts missing required field "${requiredField.replace(":", "")}"`);
    }
  }

  if (!indexSrc.includes("logoSvg:") && !indexSrc.includes("logoUrl:")) {
    errors.push(`index.ts must include either "logoSvg" or "logoUrl"`);
  }

  const coverMatch = indexSrc.match(/coverImg:\s*["']([^"']+)["']/);
  if (coverMatch) {
    checkAssetPath(coverMatch[1], "coverImg");
  }

  const hexMatches = indexSrc.match(/#[0-9A-Fa-f]{6}\b/g) || [];
  if (hexMatches.length < 16) {
    errors.push(`index.ts expected >= 16 #RRGGBB hex tokens across light & dark palettes (found ${hexMatches.length})`);
  }
}

if (fs.existsSync(scrapedFile)) {
  const scrapedSrc = fs.readFileSync(scrapedFile, "utf8");

  for (const sectionKey of [
    "capturedAt:",
    "containerMaxWidth:",
    "pages:",
    "sections:",
    "measuredColors:",
    "measuredTypography:",
    "measuredGeometry:",
    "hoverDiffs:"
  ]) {
    if (!scrapedSrc.includes(sectionKey)) {
      errors.push(`scraped.ts missing "${sectionKey.replace(":", "")}"`);
    }
  }

  // Check all referenced /catalog/... images exist and are non-empty
  const imgRefs = [...scrapedSrc.matchAll(/(?:desktopImg|mobileImg|img):\s*["']([^"']+)["']/g)];
  if (imgRefs.length < 4) {
    errors.push(`scraped.ts has too few image captures (${imgRefs.length})`);
  }
  for (const m of imgRefs) {
    checkAssetPath(m[1], `scraped image (${m[1]})`);
  }

  // Check desktop bounds coverage per page block
  const desktopBounds = [
    ...scrapedSrc.matchAll(/desktop:\s*\{\s*topPct:\s*([\d.]+),\s*heightPct:\s*([\d.]+)\s*\}/g)
  ].map((m) => ({ topPct: Number(m[1]), heightPct: Number(m[2]) }));

  if (desktopBounds.length === 0) {
    errors.push("scraped.ts contains zero desktop percentage bounds in anatomy");
  } else {
    for (const b of desktopBounds) {
      if (b.topPct < 0 || b.heightPct <= 0 || b.topPct + b.heightPct > 100.5) {
        errors.push(`Out-of-range desktop bound: topPct=${b.topPct}, heightPct=${b.heightPct}`);
      }
    }
  }

  // Ensure raw-probe.json wasn't left behind uncleaned if desired (warn only)
  const rawProbe = path.join(publicRoot, "catalog", brandId, "raw-probe.json");
  if (fs.existsSync(rawProbe)) {
    warnings.push(`Temporary raw-probe.json still exists at ${rawProbe} (remove before git commit)`);
  }
}

if (warnings.length > 0) {
  for (const w of warnings) console.warn(`[WARN] ${brandId}: ${w}`);
}

if (errors.length > 0) {
  for (const e of errors) console.error(`[FAIL] ${brandId}: ${e}`);
  process.exit(1);
}

console.log(`[PASS] ${brandId} passed all UIFino catalog quality gates!`);
