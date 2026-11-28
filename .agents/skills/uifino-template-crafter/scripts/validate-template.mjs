#!/usr/bin/env node
/**
 * UIFino Self-Contained Template Cartridge Validator
 *
 * Usage:
 *   node .agents/skills/uifino-template-crafter/scripts/validate-template.mjs <template-slug>
 */

import fs from "node:fs";
import path from "node:path";

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node validate-template.mjs <template-slug>");
  process.exit(1);
}

const tplDir = path.resolve("src", "registry", "templates", slug);
const metaFile = path.join(tplDir, "meta.ts");
const sandboxFile = path.join(tplDir, "sandbox.tsx");
const thumbFile = path.join(tplDir, "thumbnail.tsx");

const errors = [];

for (const [f, label] of [
  [metaFile, "meta.ts"],
  [sandboxFile, "sandbox.tsx"],
  [thumbFile, "thumbnail.tsx"]
]) {
  if (!fs.existsSync(f)) errors.push(`Missing required file ${label}`);
}

if (fs.existsSync(sandboxFile)) {
  const sSrc = fs.readFileSync(sandboxFile, "utf8");
  const lines = sSrc.split("\n").length;
  if (lines < 140) {
    errors.push(`sandbox.tsx is too thin (${lines} lines < 140); implement full realistic page sections`);
  }
  if (!sSrc.includes("activePath") || !sSrc.includes("mode")) {
    errors.push(`sandbox.tsx must accept and respond to both "activePath" and "mode" props`);
  }
  if (/lorem ipsum/i.test(sSrc)) {
    errors.push(`sandbox.tsx contains forbidden lorem ipsum placeholder text`);
  }
}

if (fs.existsSync(metaFile)) {
  const mSrc = fs.readFileSync(metaFile, "utf8");
  for (const field of [
    "SandboxComponent:",
    "ThumbnailComponent:",
    "detailOverride:",
    "routePages:",
    "includedBlocks:",
    "directoryTree:"
  ]) {
    if (!mSrc.includes(field)) {
      errors.push(`meta.ts missing required self-contained field "${field.replace(":", "")}"`);
    }
  }

  // Verify all includedBlocks hrefs point to real component directories
  const hrefMatches = [...mSrc.matchAll(/href\s*:\s*["']\/components\/([^/"']+)\/([^/"']+)["']/g)];
  const compRoot = path.resolve("src", "registry", "components");
  for (const hm of hrefMatches) {
    const [, catId, compId] = hm;
    const existsInAnyGroup = ["sections", "blocks", "motion"].some((g) =>
      fs.existsSync(path.join(compRoot, g, catId, compId, "meta.ts"))
    );
    if (!existsInAnyGroup) {
      errors.push(`includedBlocks href "/components/${catId}/${compId}" does not match any registered component`);
    }
  }
}

if (errors.length > 0) {
  for (const e of errors) console.error(`[FAIL] template/${slug}: ${e}`);
  process.exit(1);
}

console.log(`[PASS] template/${slug} passed self-contained cartridge & block-link gates!`);
