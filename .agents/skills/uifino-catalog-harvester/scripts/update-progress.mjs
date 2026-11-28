#!/usr/bin/env node
/**
 * UIFino Catalog Progress Tracker Updater (`docs/图鉴采集进度.md`)
 *
 * Usage:
 *   1. Mark single brand status:
 *      node .agents/skills/uifino-catalog-harvester/scripts/update-progress.mjs --id vercel --status 已完成
 *      node .agents/skills/uifino-catalog-harvester/scripts/update-progress.mjs --id airbnb --status 受阻跳过 --note "Cloudflare Turnstile 拦截"
 *
 *   2. Reconcile entire table with all validated websites on disk:
 *      node .agents/skills/uifino-catalog-harvester/scripts/update-progress.mjs --reconcile
 */

import fs from "node:fs";
import path from "node:path";

const VALID_STATUSES = new Set(["已完成", "进行中", "待采集", "受阻跳过"]);

function parseArgs(argv) {
  const out = { reconcile: false };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--reconcile") out.reconcile = true;
    else if (a === "--id") out.id = argv[++i];
    else if (a === "--status") out.status = argv[++i];
    else if (a === "--note") out.note = argv[++i];
  }
  return out;
}

function readBrandScrapedSummary(brandId) {
  const scrapedPath = path.resolve("src", "registry", "catalog", "websites", brandId, "scraped.ts");
  if (!fs.existsSync(scrapedPath)) return null;
  const src = fs.readFileSync(scrapedPath, "utf8");
  const dateMatch = src.match(/capturedAt:\s*["']([^"']+)["']/);
  const pageMatches = [...src.matchAll(/\bdesktopImg:\s*["']([^"']+)["']/g)];
  return {
    capturedAt: dateMatch ? dateMatch[1] : new Date().toISOString().slice(0, 10),
    pageCount: pageMatches.length
  };
}

const args = parseArgs(process.argv);
const docPath = path.resolve("docs", "图鉴采集进度.md");

if (!fs.existsSync(docPath)) {
  console.error(`Missing tracker document: ${docPath}`);
  process.exit(1);
}

if (!args.reconcile) {
  if (!args.id || !args.status || !VALID_STATUSES.has(args.status)) {
    console.error(
      "Usage:\n  node update-progress.mjs --id <id> --status <已完成|进行中|待采集|受阻跳过> [--note <原因>]\n  node update-progress.mjs --reconcile"
    );
    process.exit(1);
  }
}

const today = new Date().toISOString().slice(0, 10);
const lines = fs.readFileSync(docPath, "utf8").split("\n");
let matchedTarget = false;

const updatedLines = lines.map((line) => {
  // Match markdown table rows like: | `linear` | Linear | `https://linear.app` | `dark` | 已完成 | 4 页 | 2026-11-28 | ... |
  const m = line.match(/^\|\s*`([a-z0-9-]+)`\s*\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|$/);
  if (!m) return line;

  const rowId = m[1];
  const nameCol = m[2].trim();
  const urlCol = m[3].trim();
  const toneCol = m[4].trim();
  let statusCol = m[5].trim();
  let pagesCol = m[6].trim();
  let dateCol = m[7].trim();
  let noteCol = m[8].trim();

  if (args.reconcile) {
    const info = readBrandScrapedSummary(rowId);
    if (info && info.pageCount > 0) {
      statusCol = "已完成";
      pagesCol = `${info.pageCount} 页`;
      dateCol = info.capturedAt;
      noteCol = noteCol.replace(/（替换现有占位蓝图）/g, "").trim();
    }
  } else if (rowId === args.id) {
    matchedTarget = true;
    statusCol = args.status;
    dateCol = args.status === "待采集" ? "-" : today;

    if (args.status === "已完成") {
      const info = readBrandScrapedSummary(rowId);
      if (!info || info.pageCount === 0) {
        console.error(
          `[FAIL] Cannot mark "${rowId}" as 已完成: scraped.ts not found or has 0 pages.`
        );
        process.exit(1);
      }
      pagesCol = `${info.pageCount} 页`;
      dateCol = info.capturedAt || today;
      noteCol = noteCol.replace(/（替换现有占位蓝图）/g, "").trim();
    } else if (args.status === "受阻跳过" || args.status === "进行中") {
      pagesCol = "-";
    } else {
      pagesCol = "-";
    }

    if (args.note) {
      noteCol = args.note;
    }
  }

  return `| \`${rowId}\` | ${nameCol} | ${urlCol} | ${toneCol} | ${statusCol} | ${pagesCol} | ${dateCol} | ${noteCol} |`;
});

if (!args.reconcile && !matchedTarget) {
  console.error(`[FAIL] Brand id "${args.id}" was not found in docs/图鉴采集进度.md`);
  process.exit(1);
}

// Recompute summary counts across all table rows
let total = 0;
let done = 0;
let inProgress = 0;
let pending = 0;
let blocked = 0;

for (const line of updatedLines) {
  const m = line.match(/^\|\s*`([a-z0-9-]+)`\s*\|[^|]+\|[^|]+\|[^|]+\|\s*([^|]+?)\s*\|/);
  if (!m) continue;
  total += 1;
  const st = m[2];
  if (st === "已完成") done += 1;
  else if (st === "进行中") inProgress += 1;
  else if (st === "受阻跳过") blocked += 1;
  else pending += 1;
}

const finalContent = updatedLines
  .map((line) => {
    if (line.startsWith("- **当前总进度**：")) {
      return `- **当前总进度**：已完成 \`${done}\` / \`${total}\` ｜ 进行中 \`${inProgress}\` ｜ 待采集 \`${pending}\` ｜ 受阻跳过 \`${blocked}\``;
    }
    if (line.startsWith("- **最近更新**：")) {
      return `- **最近更新**：${today}`;
    }
    return line;
  })
  .join("\n");

fs.writeFileSync(docPath, finalContent, "utf8");
console.log(
  `[progress] Updated docs/图鉴采集进度.md -> 已完成 ${done}/${total} | 进行中 ${inProgress} | 待采集 ${pending} | 受阻跳过 ${blocked}`
);
