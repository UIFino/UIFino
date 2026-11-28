#!/usr/bin/env node
/**
 * UIFino Multi-Level Catalog Progress Updater
 *
 * Updates the specific category doc under `docs/资产扩充/01-设计图鉴/<分类>.md`,
 * then automatically rolls up totals into `01-设计图鉴/_总览.md` and `docs/资产扩充/README.md`.
 *
 * Usage:
 *   1. Mark single brand status (auto-locates which category doc owns <id>):
 *      node .agents/skills/uifino-catalog-harvester/scripts/update-progress.mjs --id vercel --status 已完成
 *      node .agents/skills/uifino-catalog-harvester/scripts/update-progress.mjs --id airbnb --status 受阻跳过 --note "Cloudflare Turnstile 拦截"
 *
 *   2. Reconcile all category docs against validated websites on disk:
 *      node .agents/skills/uifino-catalog-harvester/scripts/update-progress.mjs --reconcile
 */

import fs from "node:fs";
import path from "node:path";

const VALID_STATUSES = new Set(["已完成", "进行中", "待采集", "受阻跳过"]);

const CATEGORY_FILES = [
  { file: "人工智能.md", title: "**人工智能**（`AI & LLM`）" },
  { file: "开发工具.md", title: "**开发工具**（`DevTools`）" },
  { file: "效率办公.md", title: "**效率办公**（`Productivity`）" },
  { file: "金融支付.md", title: "**金融支付**（`Fintech`）" },
  { file: "内容社区.md", title: "**内容社区**（`Content & Community`）" },
  { file: "生活出行.md", title: "**生活出行**（`Consumer & Travel`）" }
];

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
if (!args.reconcile) {
  if (!args.id || !args.status || !VALID_STATUSES.has(args.status)) {
    console.error(
      "Usage:\n  node update-progress.mjs --id <id> --status <已完成|进行中|待采集|受阻跳过> [--note <原因>]\n  node update-progress.mjs --reconcile"
    );
    process.exit(1);
  }
}

const rootExpansionDir = path.resolve("docs", "资产扩充");
const catalogTrackDir = path.join(rootExpansionDir, "01-设计图鉴");
const today = new Date().toISOString().slice(0, 10);

let matchedTarget = false;
const categoryRollups = [];

for (const cat of CATEGORY_FILES) {
  const filePath = path.join(catalogTrackDir, cat.file);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing category tracker doc: ${filePath}`);
    process.exit(1);
  }

  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  let fileTouched = false;

  const updatedLines = lines.map((line) => {
    const m = line.match(
      /^\|\s*`([a-z0-9-]+)`\s*\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|$/
    );
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
        fileTouched = true;
      }
    } else if (rowId === args.id) {
      matchedTarget = true;
      fileTouched = true;
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
      } else {
        pagesCol = "-";
      }

      if (args.note) {
        noteCol = args.note;
      }
    }

    return `| \`${rowId}\` | ${nameCol} | ${urlCol} | ${toneCol} | ${statusCol} | ${pagesCol} | ${dateCol} | ${noteCol} |`;
  });

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

  const finalCatContent = updatedLines
    .map((line) => {
      if (line.startsWith("- **分类进度**：")) {
        return `- **分类进度**：已完成 \`${done}\` / \`${total}\` ｜ 进行中 \`${inProgress}\` ｜ 待采集 \`${pending}\` ｜ 受阻跳过 \`${blocked}\``;
      }
      if (fileTouched && line.startsWith("- **最近更新**：")) {
        return `- **最近更新**：${today}`;
      }
      return line;
    })
    .join("\n");

  fs.writeFileSync(filePath, finalCatContent, "utf8");
  categoryRollups.push({ ...cat, total, done, inProgress, pending, blocked });
}

if (!args.reconcile && !matchedTarget) {
  console.error(`[FAIL] Brand id "${args.id}" was not found in any category doc under docs/资产扩充/01-设计图鉴/`);
  process.exit(1);
}

// Roll up totals to `01-设计图鉴/_总览.md`
const grand = categoryRollups.reduce(
  (acc, c) => ({
    total: acc.total + c.total,
    done: acc.done + c.done,
    inProgress: acc.inProgress + c.inProgress,
    pending: acc.pending + c.pending,
    blocked: acc.blocked + c.blocked
  }),
  { total: 0, done: 0, inProgress: 0, pending: 0, blocked: 0 }
);

const overviewRows = categoryRollups
  .map(
    (c) =>
      `| ${c.title} | [${c.file}](./${c.file}) | ${c.done} | ${c.inProgress} | ${c.pending} | ${c.blocked} | ${c.total} |`
  )
  .join("\n");

const overviewContent = `# 01 设计图鉴（Web 网站）扩充总览

- **当前总进度**：已完成 \`${grand.done}\` / \`${grand.total}\` ｜ 进行中 \`${grand.inProgress}\` ｜ 待采集 \`${grand.pending}\` ｜ 受阻跳过 \`${grand.blocked}\`
- **最近更新**：${today}
- **上级大盘**：[全站资产批量扩充总览](../README.md)
- **配套执行 Skill**：[uifino-catalog-harvester](../../../.agents/skills/uifino-catalog-harvester/SKILL.md)

## 分行业进度索引（一行业一文档）

| 行业分类 | 追踪文档 | 已完成 | 进行中 | 待采集 | 受阻跳过 | 合计 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${overviewRows}
`;

fs.writeFileSync(path.join(catalogTrackDir, "_总览.md"), overviewContent, "utf8");

// Roll up catalog line in `docs/资产扩充/README.md`
const rootReadmePath = path.join(rootExpansionDir, "README.md");
if (fs.existsSync(rootReadmePath)) {
  const readmeSrc = fs.readFileSync(rootReadmePath, "utf8");
  const updatedReadme = readmeSrc
    .replace(
      /^(\|\s*\*\*01 设计图鉴\*\*\s*\|[^|]+\|[^|]+\|\s*)([^|]+?)(\s*\|[^|]+\|)$/m,
      `$1已完成 \`${grand.done}\` / \`${grand.total}\`（待采集 \`${grand.pending}\`）$3`
    )
    .replace(/^- \*\*最近更新\*\*：.*$/m, `- **最近更新**：${today}`);
  fs.writeFileSync(rootReadmePath, updatedReadme, "utf8");
}

console.log(
  `[progress] Rolled up 01-设计图鉴 (6 category docs -> _总览.md -> README.md): 已完成 ${grand.done}/${grand.total} | 进行中 ${grand.inProgress} | 待采集 ${grand.pending} | 受阻跳过 ${grand.blocked}`
);
