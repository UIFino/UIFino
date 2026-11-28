#!/usr/bin/env node
/**
 * UIFino 04-模板 Multi-Level Progress Updater
 *
 * Usage:
 *   node .agents/skills/uifino-template-crafter/scripts/update-progress.mjs --id obsidian-saas-kit --status 已完成
 *   node .agents/skills/uifino-template-crafter/scripts/update-progress.mjs --reconcile
 */

import fs from "node:fs";
import path from "node:path";

const VALID_STATUSES = new Set(["已完成", "进行中", "初稿待精修", "待生产"]);
const FILES = [
  { file: "整站工程.md", title: "**整站工程**（`starter` · 多路由完整站）", isStarter: true },
  { file: "单页模板.md", title: "**单页模板**（`page` · 高转化单页）", isStarter: false }
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

function isTemplateCrafted(slug) {
  const dir = path.resolve("src", "registry", "templates", slug);
  return (
    fs.existsSync(path.join(dir, "meta.ts")) &&
    fs.existsSync(path.join(dir, "sandbox.tsx")) &&
    fs.existsSync(path.join(dir, "thumbnail.tsx"))
  );
}

const args = parseArgs(process.argv);
if (!args.reconcile && (!args.id || !VALID_STATUSES.has(args.status))) {
  console.error("Usage: node update-progress.mjs --id <slug> --status <已完成|进行中|初稿待精修|待生产> | --reconcile");
  process.exit(1);
}

const rootDir = path.resolve("docs", "资产扩充");
const trackDir = path.join(rootDir, "04-模板");
const today = new Date().toISOString().slice(0, 10);

let matched = false;
const rollups = [];

for (const cat of FILES) {
  const fp = path.join(trackDir, cat.file);
  const lines = fs.readFileSync(fp, "utf8").split("\n");
  let touched = false;

  const updated = lines.map((line) => {
    if (!line.startsWith("| `")) return line;
    const cols = line
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim());
    const idMatch = cols[0]?.match(/^`([a-z0-9-]+)`$/);
    if (!idMatch) return line;
    const id = idMatch[1];

    // Starter table has 8 columns (status at index 5, date at 6); Page table has 7 columns (status at 4, date at 5)
    const stIdx = cat.isStarter ? 5 : 4;
    const dtIdx = cat.isStarter ? 6 : 5;

    if (args.reconcile) {
      if (isTemplateCrafted(id) && cols[stIdx] !== "已完成") {
        cols[stIdx] = "已完成";
        cols[dtIdx] = today;
        touched = true;
      }
    } else if (id === args.id) {
      matched = true;
      touched = true;
      if (args.status === "已完成" && !isTemplateCrafted(id)) {
        console.error(`[FAIL] Cannot mark "${id}" as 已完成: sandbox.tsx / thumbnail.tsx missing!`);
        process.exit(1);
      }
      cols[stIdx] = args.status;
      cols[dtIdx] = args.status === "已完成" || args.status === "进行中" ? today : "-";
    }

    return `| ${cols.join(" | ")} |`;
  });

  let total = 0, done = 0, wip = 0, draft = 0, todo = 0;
  const stIdx = cat.isStarter ? 5 : 4;
  for (const l of updated) {
    if (!l.startsWith("| `")) continue;
    const cols = l.split("|").slice(1, -1).map((c) => c.trim());
    if (!/^`[a-z0-9-]+`$/.test(cols[0] || "")) continue;
    total += 1;
    const st = cols[stIdx];
    if (st === "已完成") done += 1;
    else if (st === "进行中") wip += 1;
    else if (st === "初稿待精修") draft += 1;
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
  console.error(`[FAIL] Template "${args.id}" not found in docs/资产扩充/04-模板/`);
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
  `# 04 模板扩充总览

- **当前总进度**：已完成 \`${g.done}\` / \`${g.total}\` ｜ 进行中 \`${g.wip}\` ｜ 初稿待精修 \`${g.draft}\` ｜ 待生产 \`${g.todo}\`
- **最近更新**：${today}
- **上级大盘**：[全站资产批量扩充总览](../README.md)
- **配套执行 Skill**：[uifino-template-crafter](../../../.agents/skills/uifino-template-crafter/SKILL.md)

## 分形态进度索引（一形态一文档）

| 模板形态 | 追踪文档 | 已完成 | 进行中 | 初稿待精修 | 待生产 | 合计 |
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
        /^(\|\s*\*\*04 模板\*\*\s*\|[^|]+\|[^|]+\|\s*)([^|]+?)(\s*\|[^|]+\|)$/m,
        `$1已完成 \`${g.done}\` / \`${g.total}\`（初稿待精修 \`${g.draft}\` · 待生产 \`${g.todo}\`）$3`
      )
      .replace(/^- \*\*最近更新\*\*：.*$/m, `- **最近更新**：${today}`),
    "utf8"
  );
}

console.log(`[progress] Rolled up 04-模板: 已完成 ${g.done}/${g.total} | 初稿待精修 ${g.draft} | 待生产 ${g.todo}`);
