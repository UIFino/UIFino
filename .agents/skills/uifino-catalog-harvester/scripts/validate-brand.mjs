#!/usr/bin/env node
/**
 * UIFino Catalog Brand Quality Gate Validator (with Pixel-Level Bounds Verification)
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

/** Read real bitmap dimensions (width, height) from JPEG, PNG, or WebP without external deps */
function readImageDimensions(diskPath) {
  const buf = fs.readFileSync(diskPath);

  // PNG
  if (buf.length >= 24 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // JPEG
  if (buf.length >= 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) {
        i += 1;
        continue;
      }
      const marker = buf[i + 1];
      if (
        marker === 0xc0 ||
        marker === 0xc1 ||
        marker === 0xc2 ||
        marker === 0xc3 ||
        marker === 0xc9 ||
        marker === 0xca
      ) {
        return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      if (marker === 0xd9 || marker === 0xda) break;
      const segLen = buf.readUInt16BE(i + 2);
      if (segLen < 2) break;
      i += 2 + segLen;
    }
  }

  // WebP (VP8 / VP8L / VP8X)
  if (
    buf.length >= 30 &&
    buf.toString("ascii", 0, 4) === "RIFF" &&
    buf.toString("ascii", 8, 12) === "WEBP"
  ) {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") {
      const w = 1 + buf.readUIntLE(24, 3);
      const h = 1 + buf.readUIntLE(27, 3);
      return { width: w, height: h };
    }
    if (chunk === "VP8 " && buf.length >= 30) {
      return {
        width: buf.readUInt16LE(26) & 0x3fff,
        height: buf.readUInt16LE(28) & 0x3fff
      };
    }
    if (chunk === "VP8L" && buf.length >= 25) {
      const b0 = buf[21];
      const b1 = buf[22];
      const b2 = buf[23];
      const b3 = buf[24];
      return {
        width: 1 + (((b1 & 0x3f) << 8) | b0),
        height: 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6))
      };
    }
  }

  return null;
}

function checkAssetPath(webPath, label, minBytes = 4096) {
  if (!webPath || !webPath.startsWith("/")) {
    errors.push(`${label}: invalid asset path "${webPath}"`);
    return null;
  }
  const diskPath = path.join(publicRoot, webPath.replace(/^\/+/, ""));
  if (!fs.existsSync(diskPath)) {
    errors.push(`${label}: file missing on disk -> ${diskPath}`);
    return null;
  }
  const stat = fs.statSync(diskPath);
  if (stat.size < minBytes) {
    errors.push(`${label}: suspiciously small image (${stat.size} bytes < ${minBytes}) -> ${webPath}`);
  }
  return diskPath;
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
    errors.push(
      `index.ts expected >= 16 #RRGGBB hex tokens across light & dark palettes (found ${hexMatches.length})`
    );
  }
}

if (fs.existsSync(scrapedFile)) {
  // Dynamically evaluate the pure data object in scraped.ts by stripping the TS type import/annotation
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

  const jsExpr = scrapedSrc
    .replace(/^import\s+type[^\n]+\n/gm, "")
    .replace(/export\s+const\s+\w+\s*(?::\s*\w+)?\s*=\s*/, "return ");
  let data = null;
  try {
    data = new Function(jsExpr)();
  } catch (err) {
    errors.push(`Failed to parse scraped.ts data object: ${err.message}`);
  }

  if (data) {
    // Find measured header slice height if present (e.g. 01-header.jpg -> 73px)
    let measuredHeaderPx = null;
    for (const sec of data.sections || []) {
      const disk = checkAssetPath(sec.img, `section slice ${sec.id}`);
      if (disk && sec.selector === "<header>") {
        const dim = readImageDimensions(disk);
        if (dim) measuredHeaderPx = dim.height;
      }
    }

    for (const pg of data.pages || []) {
      const deskDisk = checkAssetPath(pg.desktopImg, `page[${pg.id}].desktopImg`);
      const mobDisk = checkAssetPath(pg.mobileImg, `page[${pg.id}].mobileImg`);
      const deskDim = deskDisk ? readImageDimensions(deskDisk) : null;
      const mobDim = mobDisk ? readImageDimensions(mobDisk) : null;

      if (!deskDim || !mobDim) {
        errors.push(`page[${pg.id}]: unable to read image dimensions`);
        continue;
      }

      // Mobile captures use deviceScaleFactor=2 at 390px CSS viewport (bitmap width ~780px)
      const deskDpr = deskDim.width > 2000 ? 2 : 1;
      const mobDpr = mobDim.width > 550 ? 2 : 1;
      const deskCssH = deskDim.height / deskDpr;
      const mobCssH = mobDim.height / mobDpr;

      const anatomy = pg.anatomy || [];
      if (anatomy.length === 0) {
        errors.push(`page[${pg.id}]: anatomy array is empty`);
        continue;
      }

      let prevDeskEnd = 0;
      for (let i = 0; i < anatomy.length; i += 1) {
        const item = anatomy[i];
        const db = item.bounds?.desktop;
        const mb = item.bounds?.mobile;
        if (!db || !mb) {
          errors.push(`page[${pg.id}]#${item.index}: missing desktop or mobile bounds`);
          continue;
        }

        if (db.topPct < 0 || db.heightPct <= 0 || db.topPct + db.heightPct > 100.5) {
          errors.push(
            `page[${pg.id}]#${item.index}: out-of-range desktop bounds (${db.topPct}% + ${db.heightPct}%)`
          );
        }

        // Check gaps/overlaps on multi-section pages
        if (anatomy.length > 1) {
          const gap = db.topPct - prevDeskEnd;
          if (gap > 5.0) {
            errors.push(
              `page[${pg.id}]#${item.index}: dead-zone gap of ${gap.toFixed(2)}% before section (prev ended at ${prevDeskEnd}%, current starts at ${db.topPct}%)`
            );
          }
          if (gap < -0.5) {
            errors.push(
              `page[${pg.id}]#${item.index}: overlaps previous section by ${Math.abs(gap).toFixed(2)}%`
            );
          }
          prevDeskEnd = Number((db.topPct + db.heightPct).toFixed(2));
        }

        const renderedDeskPx = Math.round((db.heightPct / 100) * deskCssH);
        const renderedMobPx = Math.round((mb.heightPct / 100) * mobCssH);

        // Gate A: Navbar / Sticky Header physical height sanity check (must be 44px..115px CSS, never swallowing Hero padding!)
        const isNavbar =
          /导航栏|顶栏|navbar|sticky.*bar|sticky.*header/i.test(`${item.nameZh} ${item.nameEn}`) &&
          !/标题|订阅|hero/i.test(item.nameZh);
        if (isNavbar) {
          if (renderedDeskPx < 40 || renderedDeskPx > 115) {
            errors.push(
              `page[${pg.id}]#${item.index} "${item.nameZh}": desktop red-box height converts to ${renderedDeskPx}px on ${deskCssH}px page (expected navbar 40px–115px; likely swallowed hero top margin!)`
            );
          }
          if (renderedMobPx < 38 || renderedMobPx > 110) {
            errors.push(
              `page[${pg.id}]#${item.index} "${item.nameZh}": mobile red-box height converts to ${renderedMobPx}px on ${mobCssH}px page (expected mobile navbar 38px–110px)`
            );
          }
          if (measuredHeaderPx !== null && Math.abs(renderedDeskPx - measuredHeaderPx) > 18) {
            errors.push(
              `page[${pg.id}]#${item.index} "${item.nameZh}": desktop red-box is ${renderedDeskPx}px, which disagrees with measured <header> slice (${measuredHeaderPx}px)`
            );
          }
        }

        // Gate B: Cross-check explicit "高度 XXpx" / "XXpx height" stated in noteZh/noteEn against rendered red-box px
        const statedHeightMatch =
          `${item.noteZh} ${item.noteEn}`.match(/高度\s*(\d{2,4})px/i) ||
          `${item.noteZh} ${item.noteEn}`.match(/\b(\d{2,4})px\s+height\b/i);
        if (statedHeightMatch) {
          const statedPx = Number(statedHeightMatch[1]);
          if (Math.abs(renderedDeskPx - statedPx) > Math.max(20, statedPx * 0.25)) {
            errors.push(
              `page[${pg.id}]#${item.index} "${item.nameZh}": note states ${statedPx}px height, but bounds.desktop.heightPct (${db.heightPct}%) renders as ${renderedDeskPx}px on ${deskCssH}px image`
            );
          }
        }
      }

      if (anatomy.length > 1 && prevDeskEnd < 95) {
        errors.push(
          `page[${pg.id}]: anatomy stops at ${prevDeskEnd}% instead of covering down to 100% footer`
        );
      }
    }
  }

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

console.log(`[PASS] ${brandId} passed all UIFino catalog quality & pixel-bounds gates!`);
