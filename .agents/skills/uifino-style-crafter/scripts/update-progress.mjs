#!/usr/bin/env node
/**
 * UIFino 02-设计风格 Multi-Level Progress Updater
 *
 * Usage:
 *   node .agents/skills/uifino-style-crafter/scripts/update-progress.mjs --id hairline-grid --status 已完成
 *   node .agents/skills/uifino-style-crafter/scripts/update-progress.mjs --reconcile
 */

import fs from "node:fs";
import path from "node:path";

const VALID_STATUSES = new Set(["已完成", "进行中", "初稿待精修", "待生产"]);
const FILES = [
  { file: "现代克制.md", title: "**现代克制**（`minimal`）" },
  { file: "质感先锋.md", title: "**质感先锋**（`expressive`）" }
];

function parseArgs(argv) {
  const out = { reconcile: false };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--reconcile") out.reconcile = true;
    else if (a === "--id") out.id = argv[++i];
    else if (a === "--status") out.status = argv[++i];
  }
  return out;
}

function isStyleCrafted(slug) {
  const dir = path.resolve("src", "registry", "styles", slug);
  return (
    fs.existsSync(path.join(dir, "index.ts")) &&
    fs.existsSync(path.join(dir, "showcase.tsx")) &&
    fs.existsSync(path.join(dir, "thumbnail.tsx"))
  );
}

const args = parseArgs(process.argv);
if (!args.reconcile && (!args.id || !VALID_STATUSES.has(args.status))) {
  console.error("Usage: node update-progress.mjs --id <slug> --status <已完成|进行中|初稿待精修|待生产> | --reconcile");
  process.exit(1);
}

const rootDir = path.resolve("docs", "资产扩充");
const trackDir = path.join(rootDir, "02-设计风格");
const today = new Date().toISOString().slice(0, 10);

let matched = false;
const rollups = [];

for (const cat of FILES) {
  const fp = path.join(trackDir, cat.file);
  const lines = fs.readFileSync(fp, "utf8").split("\n");
  let touched = false;

  const updated = lines.map((line) => {
    const m = line.match(/^\|\s*`([a-z0-9-]+)`\s*\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|$/);
    if (!m) return line;
    const id = m[1];
    let st = m[5].trim();
    let dt = m[6].trim();

    if (args.reconcile) {
      if (isStyleCrafted(id) && st !== "已完成") {
        st = "已完成";
        dt = today;
        touched = true;
      }
    } else if (id === args.id) {
      matched = true;
      touched = true;
      if (args.status === "已完成" && !isStyleCrafted(id)) {
        console.error(`[FAIL] Cannot mark "${id}" as 已完成: showcase.tsx / thumbnail.tsx missing!`);
        process.exit(1);
      }
      st = args.status;
      dt = st === "已完成" || st === "进行中" ? today : "-";
    }

    return `| \`${id}\` | ${m[2].trim()} | ${m[3].trim()} | ${m[4].trim()} | ${st} | ${dt} | ${m[7].trim()} |`;
  });

  let total = 0, done = 0, wip = 0, draft = 0, todo = 0;
  for (const l of updated) {
    const m = l.match(/^\|\s*`([a-z0-9-]+)`\s*\|[^|]+\|[^|]+\|[^|]+\|\s*([^|]+?)\s*\|/);
    if (!m) continue;
    total += 1;
    if (m[2] === "已完成") done += 1;
    else if (m[2] === "进行中") wip += 1;
    else if (m[2] === "初稿待精修") draft += 1;
    else todo += 1;
  }

  const content = updated
    .map((l) => {
      if (l.startsWith("- **分类进度**：")) {
        return `- **分类进度**：已完成 \`${done}\` / \`${total}\` ｜ 进行中 \`${wip}\` ｜ 初稿待精修 \`${draft}\` ｜ 待生产 \`${todo}\``;
      }
      if (touched && l.startsWith("- **最近更新**：")) return `- **最近更新**：${today}`;
      return l;
    })
    .join("\n");

  fs.writeFileSync(fp, content, "utf8");
  rollups.push({ ...cat, total, done, wip, draft, todo });
}

if (!args.reconcile && !matched) {
  console.error(`[FAIL] Style "${args.id}" not found in docs/资产扩充/02-设计风格/`);
  process.exit(1);
}

const g = rollups.reduce(
  (a, c) => ({ total: a.total + c.total, done: a.done + c.done, wip: a.wip + c.wip, draft: a.draft + c.draft, todo: a.todo + c.todo }),
  { total: 0, done: 0, wip: 0, draft: 0, todo: 0 }
);

const rows = rollups
  .map((c) => `| ${c.title} | [${c.file}](./${c.file}) | ${c.done} | ${c.wip} | ${c.draft} | ${c.todo} | ${c.total} |`)
  .join("\n");

fs.writeFileSync(
  path.join(trackDir, "_总览.md"),
  `# 02 设计风格扩充总览

- **当前总进度**：已完成 \`${g.done}\` / \`${g.total}\` ｜ 进行中 \`${g.wip}\` ｜ 初稿待精修 \`${g.draft}\` ｜ 待生产 \`${g.todo}\`
- **最近更新**：${today}
- **上级大盘**：[全站资产批量扩充总览](../README.md)
- **配套执行 Skill**：[uifino-style-crafter](../../../.agents/skills/uifino-style-crafter/SKILL.md)

## 分族系进度索引（一族系一文档）

| 流派族系 | 追踪文档 | 已完成 | 进行中 | 初稿待精修 | 待生产 | 合计 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${rows}
`,
  "utf8"
);

const readmePath = path.join(rootDir, "README.md");
if (fs.existsSync(readmePath)) {
  const src = fs.readFileSync(readmePath, "utf8");
  fs.writeFileSync(
    readmePath,
    src
      .replace(
        /^(\|\s*\*\*02 设计风格\*\*\s*\|[^|]+\|[^|]+\|\s*)([^|]+?)(\s*\|[^|]+\|)$/m,
        `$1已完成 \`${g.done}\` / \`${g.total}\`（初稿待精修 \`${g.draft}\` · 待生产 \`${g.todo}\`）$3`
      )
      .replace(/^- \*\*最近更新\*\*：.*$/m, `- **最近更新**：${today}`),
    "utf8"
  );
}

console.log(`[progress] Rolled up 02-设计风格: 已完成 ${g.done}/${g.total} | 初稿待精修 ${g.draft} | 待生产 ${g.todo}`);
