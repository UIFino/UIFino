#!/usr/bin/env node
/**
 * UIFino Self-Contained Component Cartridge Validator
 *
 * Usage:
 *   node .agents/skills/uifino-component-crafter/scripts/validate-component.mjs <component-slug>
 */

import fs from "node:fs";
import path from "node:path";

const targetSlug = process.argv[2];
if (!targetSlug) {
  console.error("Usage: node validate-component.mjs <component-slug>");
  process.exit(1);
}

const compRoot = path.resolve("src", "registry", "components");
let foundDir = null;
let foundGroup = null;

for (const group of ["sections", "blocks", "motion"]) {
  const gDir = path.join(compRoot, group);
  if (!fs.existsSync(gDir)) continue;
  for (const cat of fs.readdirSync(gDir, { withFileTypes: true })) {
    if (!cat.isDirectory()) continue;
    const candidate = path.join(gDir, cat.name, targetSlug);
    if (fs.existsSync(candidate)) {
      foundDir = candidate;
      foundGroup = group;
      break;
    }
  }
}

if (!foundDir) {
  console.error(`[FAIL] Component folder for "${targetSlug}" not found under src/registry/components/`);
  process.exit(1);
}

const errors = [];
const compFile = path.join(foundDir, "component.tsx");
const demoFile = path.join(foundDir, "demo.tsx");
const sourceFile = path.join(foundDir, "source.ts");
const metaFile = path.join(foundDir, "meta.ts");

for (const [f, name] of [
  [compFile, "component.tsx"],
  [demoFile, "demo.tsx"],
  [sourceFile, "source.ts"],
  [metaFile, "meta.ts"]
]) {
  if (!fs.existsSync(f)) errors.push(`Missing required file ${name}`);
}

if (fs.existsSync(compFile)) {
  const cSrc = fs.readFileSync(compFile, "utf8");
  if (/DESIGN\.MD VERIFIED/i.test(cSrc) || /lorem ipsum/i.test(cSrc)) {
    errors.push(`component.tsx contains forbidden self-praise or lorem ipsum text`);
  }
}

if (fs.existsSync(demoFile)) {
  const dSrc = fs.readFileSync(demoFile, "utf8");
  if (!dSrc.includes("tokens")) {
    errors.push(`demo.tsx must accept and apply "tokens" for live skin/radius/density switching`);
  }
  if (foundGroup === "blocks" && !dSrc.includes("stateView")) {
    errors.push(`block component demo.tsx must handle "stateView" for authentic loading/empty state preview`);
  }
}

if (fs.existsSync(metaFile)) {
  const mSrc = fs.readFileSync(metaFile, "utf8");
  for (const field of [
    "nameZh:",
    "contract:",
    "contractZh:",
    "DemoComponent:",
    "filesSource:",
    "propsSpec:"
  ]) {
    if (!mSrc.includes(field)) {
      errors.push(`meta.ts missing required self-contained field "${field.replace(":", "")}"`);
    }
  }
}

if (errors.length > 0) {
  for (const e of errors) console.error(`[FAIL] component/${targetSlug}: ${e}`);
  process.exit(1);
}

console.log(`[PASS] component/${targetSlug} passed self-contained cartridge gates!`);
