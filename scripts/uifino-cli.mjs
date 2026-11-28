#!/usr/bin/env node
/**
 * UIFino Lightweight CLI
 * Usage:
 *   node scripts/uifino-cli.mjs init [--brand linear] [--url http://localhost:3000]
 *   node scripts/uifino-cli.mjs add <style/hairline-grid | design/linear | section/hero-telemetry-counter>
 */
import fs from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const command = args[0] || "help";

function getFlag(name, fallback) {
  const idx = args.indexOf(name);
  if (idx !== -1 && args[idx + 1]) return args[idx + 1];
  return fallback;
}

const baseUrl = getFlag("--url", process.env.UIFINO_URL || "http://localhost:3000").replace(
  /\/$/,
  ""
);

async function fetchRegistryItem(slug) {
  const res = await fetch(`${baseUrl}/r/${encodeURIComponent(slug)}.json`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${baseUrl}/r/${slug}.json (${res.status})`);
  }
  return res.json();
}

async function writeRegistryFiles(item) {
  const written = [];
  for (const file of item.files || []) {
    const targetPath = path.resolve(process.cwd(), file.target || file.path);
    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.writeFile(targetPath, file.content || "", "utf8");
    written.push(path.relative(process.cwd(), targetPath));
  }
  return written;
}

async function main() {
  if (command === "init") {
    const brand = getFlag("--brand", "linear");
    const item = await fetchRegistryItem(`design-${brand}`);
    const written = await writeRegistryFiles(item);

    const mcpConfigPath = path.resolve(process.cwd(), ".mcp.json");
    const mcpPayload = {
      mcpServers: {
        uifino: {
          url: `${baseUrl}/api/mcp`
        }
      }
    };
    await fs.writeFile(mcpConfigPath, JSON.stringify(mcpPayload, null, 2) + "\n", "utf8");
    written.push(".mcp.json");

    console.log(`[uifino] Initialized "${brand}" DESIGN.md + .mcp.json:`);
    for (const w of written) console.log(`  + ${w}`);
    return;
  }

  if (command === "add" && args[1]) {
    const rawTarget = args[1].replace(/^(style|design|section|block|motion|tpl)\//, (m, prefix) => {
      if (prefix === "style") return "style-";
      if (prefix === "design") return "design-";
      if (prefix === "tpl") return "tpl-";
      return "";
    });
    const item = await fetchRegistryItem(rawTarget);
    const written = await writeRegistryFiles(item);
    console.log(`[uifino] Installed "${item.name}":`);
    for (const w of written) console.log(`  + ${w}`);
    return;
  }

  console.log(`UIFino CLI (Registry & DESIGN.md Installer)
Commands:
  init [--brand linear] [--url http://localhost:3000]   Write DESIGN.md + .mcp.json
  add <style/slug | design/id | component-id>          Install registry item files`);
}

main().catch((err) => {
  console.error("[uifino] Error:", err.message);
  process.exit(1);
});
