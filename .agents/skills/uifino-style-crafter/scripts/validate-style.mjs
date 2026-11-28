#!/usr/bin/env node
/**
 * UIFino Bespoke Style Cartridge Validator
 *
 * Usage:
 *   node .agents/skills/uifino-style-crafter/scripts/validate-style.mjs <style-slug>
 */

import fs from "node:fs";
import path from "node:path";

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node validate-style.mjs <style-slug>");
  process.exit(1);
}

const styleDir = path.resolve("src", "registry", "styles", slug);
const indexFile = path.join(styleDir, "index.ts");
const showcaseFile = path.join(styleDir, "showcase.tsx");
const thumbnailFile = path.join(styleDir, "thumbnail.tsx");

const errors = [];

function relLum(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const toLin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
}

function contrast(h1, h2) {
  const l1 = relLum(h1);
  const l2 = relLum(h2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function extractPalette(src, blockName) {
  const re = new RegExp(`${blockName}\\s*:\\s*\\{([\\s\\S]*?)\\}`, "m");
  const m = src.match(re);
  if (!m) return null;
  const body = m[1];
  const out = {};
  for (const key of ["canvas", "surface", "elevated", "border", "ink", "muted", "accent", "accentFg"]) {
    const km = body.match(new RegExp(`${key}\\s*:\\s*["'](#[0-9A-Fa-f]{6})["']`));
    if (!km) return null;
    out[key] = km[1];
  }
  return out;
}

if (!fs.existsSync(indexFile)) errors.push(`Missing ${indexFile}`);
if (!fs.existsSync(showcaseFile)) errors.push(`Missing bespoke ${showcaseFile} (required for crafted styles)`);
if (!fs.existsSync(thumbnailFile)) errors.push(`Missing bespoke ${thumbnailFile} (required for crafted styles)`);

if (fs.existsSync(showcaseFile)) {
  const scSrc = fs.readFileSync(showcaseFile, "utf8");
  const lineCount = scSrc.split("\n").length;
  if (lineCount < 120) {
    errors.push(`showcase.tsx is too thin (${lineCount} lines < 120); craft a rich, complete bespoke stage`);
  }
  if (!scSrc.includes("physics")) {
    errors.push(`showcase.tsx must bind to the passed "physics" prop so Dark/Light & Radius switches work live`);
  }
  if (/lorem ipsum/i.test(scSrc) || /DESIGN\.MD VERIFIED/i.test(scSrc)) {
    errors.push(`showcase.tsx contains forbidden placeholder/self-praise text`);
  }
}

if (fs.existsSync(indexFile)) {
  const idxSrc = fs.readFileSync(indexFile, "utf8");
  for (const req of ["Showcase:", "Thumbnail:", "goodForZh:", "notForZh:", "dosZh:", "dontsZh:"]) {
    if (!idxSrc.includes(req)) {
      errors.push(`index.ts missing required crafted field "${req.replace(":", "")}"`);
    }
  }

  for (const mode of ["dark", "light"]) {
    const pal = extractPalette(idxSrc, mode);
    if (!pal) {
      errors.push(`index.ts missing complete 8-hex "${mode}" palette`);
      continue;
    }
    const inkRatio = contrast(pal.ink, pal.canvas);
    const mutedRatio = contrast(pal.muted, pal.surface);
    if (inkRatio < 4.5) {
      errors.push(`${mode} palette fails WCAG AA body contrast: ink (${pal.ink}) vs canvas (${pal.canvas}) = ${inkRatio.toFixed(2)}:1 (< 4.5)`);
    }
    if (mutedRatio < 3.0) {
      errors.push(`${mode} palette muted contrast too low: muted (${pal.muted}) vs surface (${pal.surface}) = ${mutedRatio.toFixed(2)}:1 (< 3.0)`);
    }
  }
}

if (errors.length > 0) {
  for (const e of errors) console.error(`[FAIL] style/${slug}: ${e}`);
  process.exit(1);
}

console.log(`[PASS] style/${slug} passed bespoke cartridge & WCAG contrast gates!`);
