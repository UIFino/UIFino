#!/usr/bin/env node
/**
 * UIFino Deterministic Website Design Harvester
 *
 * Usage:
 *   node .agents/skills/uifino-catalog-harvester/scripts/harvest-site.mjs --id vercel --url https://vercel.com [--proxy http://127.0.0.1:7897]
 *
 * Outputs:
 *   public/catalog/<id>/cover.jpg
 *   public/catalog/<id>/pages/<pageId>-desktop.jpg
 *   public/catalog/<id>/pages/<pageId>-mobile.jpg
 *   public/catalog/<id>/sections/01-header.jpg ...
 *   public/catalog/<id>/raw-probe.json
 */

import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--id") out.id = argv[++i];
    else if (arg === "--url") out.url = argv[++i];
    else if (arg === "--proxy") out.proxy = argv[++i];
    else if (arg === "--pages") out.pages = argv[++i];
  }
  return out;
}

function resolveBrowserExecutable() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  const candidates = [
    // Windows: Edge preferred per workspace rules, then Chrome
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    // macOS
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    // Linux
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser"
  ];
  return candidates.find((p) => existsSync(p));
}

async function detectBotChallenge(page) {
  return page.evaluate(() => {
    const title = (document.title || "").toLowerCase();
    const bodyText = (document.body?.innerText || "").slice(0, 1200).toLowerCase();
    const hasTurnstile = Boolean(
      document.querySelector(
        'iframe[src*="challenges.cloudflare.com"], iframe[src*="hcaptcha.com"], iframe[src*="recaptcha"], #challenge-running, #cf-challenge-running'
      )
    );
    const challengeTitle =
      title.includes("just a moment") ||
      title.includes("attention required") ||
      title.includes("access denied") ||
      title.includes("security check");
    const challengeBody =
      bodyText.includes("verify you are human") ||
      bodyText.includes("checking if the site connection is secure") ||
      bodyText.includes("enable javascript and cookies to continue");

    if (hasTurnstile || challengeTitle || challengeBody) {
      return { blocked: true, reason: `Challenge detected (title="${document.title}")` };
    }
    return { blocked: false, reason: "" };
  });
}

async function dismissCookieOverlaysCss(page) {
  await page.addStyleTag({
    content: `
      #onetrust-consent-sdk,
      #CybotCookiebotDialog,
      [id*="cookie-banner" i],
      [class*="cookie-banner" i],
      [aria-label*="cookie" i][role="dialog"],
      #intercom-container,
      .crisp-client {
        display: none !important;
        visibility: hidden !important;
      }
    `
  }).catch(() => {});
}

async function triggerLazyAndReturnTop(page) {
  await page.evaluate(async () => {
    const maxScroll = Math.min(document.body.scrollHeight || 4000, 8000);
    for (let y = 0; y <= maxScroll; y += 720) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 130));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1400);
}

async function discoverSubpages(page, baseOrigin) {
  return page.evaluate((origin) => {
    const anchors = Array.from(document.querySelectorAll("a[href]"));
    const rules = [
      { id: "pricing", titleZh: "定价方案", titleEn: "Pricing", re: /^\/(pricing|plans)\/?$/i },
      { id: "changelog", titleZh: "更新日志", titleEn: "Changelog", re: /^\/(changelog|releases|updates|whats-new|now)\/?$/i },
      { id: "docs", titleZh: "技术文档", titleEn: "Docs", re: /^\/(docs|documentation|features|customers)\/?$/i },
      { id: "login", titleZh: "登录入口", titleEn: "Log in", re: /^\/(login|signin|sign-in)\/?$/i }
    ];
    const found = [{ id: "home", path: "/", titleZh: "产品首页", titleEn: "Home" }];

    for (const rule of rules) {
      for (const a of anchors) {
        try {
          const u = new URL(a.getAttribute("href") || "", origin);
          if (u.origin !== origin) continue;
          if (rule.re.test(u.pathname)) {
            found.push({
              id: rule.id,
              path: u.pathname,
              titleZh: rule.titleZh,
              titleEn: rule.titleEn
            });
            break;
          }
        } catch {
          // ignore malformed href
        }
      }
      if (found.length >= 4) break;
    }
    return found;
  }, baseOrigin);
}

async function extractDomDesignTelemetry(page) {
  return page.evaluate(() => {
    function rgbToHex(raw) {
      if (!raw || raw === "transparent" || raw === "rgba(0, 0, 0, 0)") return null;
      const m = raw.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,/\s]+([\d.]+))?\)/i);
      if (!m) return null;
      const alpha = m[4] !== undefined ? Number(m[4]) : 1;
      if (alpha < 0.04) return null;
      const toHex = (n) => Number(n).toString(16).padStart(2, "0").toUpperCase();
      return {
        hex: `#${toHex(m[1])}${toHex(m[2])}${toHex(m[3])}`,
        alpha: Number(alpha.toFixed(2)),
        raw
      };
    }

    function luminance(hex) {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
      return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    }

    const bodyBg =
      rgbToHex(getComputedStyle(document.body).backgroundColor) ||
      rgbToHex(getComputedStyle(document.documentElement).backgroundColor) || {
        hex: "#FFFFFF",
        alpha: 1,
        raw: "rgb(255,255,255)"
      };
    const defaultTheme = luminance(bodyBg.hex) < 0.35 ? "dark" : "light";

    // Area-weighted background, text, and border color buckets
    const bgBuckets = new Map();
    const textBuckets = new Map();
    const borderBuckets = new Map();

    const els = Array.from(document.querySelectorAll("body, header, main, section, div, article, footer, button, a, h1, h2, p")).slice(0, 600);
    let totalBgArea = 0;

    for (const el of els) {
      const rect = el.getBoundingClientRect();
      if (rect.width < 8 || rect.height < 8) continue;
      const area = Math.min(rect.width, 1440) * Math.min(rect.height, 2400);
      const cs = getComputedStyle(el);

      const bg = rgbToHex(cs.backgroundColor);
      if (bg && bg.alpha >= 0.4) {
        totalBgArea += area;
        bgBuckets.set(bg.hex, (bgBuckets.get(bg.hex) || 0) + area);
      }

      const fg = rgbToHex(cs.color);
      if (fg && (el.textContent || "").trim().length > 0) {
        textBuckets.set(fg.hex, (textBuckets.get(fg.hex) || 0) + 1);
      }

      if (parseFloat(cs.borderTopWidth) > 0) {
        const bd = rgbToHex(cs.borderTopColor);
        if (bd) {
          const key = bd.alpha < 0.9 ? `${bd.hex} (${Math.round(bd.alpha * 100)}%)` : bd.hex;
          borderBuckets.set(key, (borderBuckets.get(key) || 0) + 1);
        }
      }
    }

    const topBgs = [...bgBuckets.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([hex, area]) => ({
        hex,
        sharePct: totalBgArea > 0 ? `${Math.max(0.5, Number(((area / totalBgArea) * 100).toFixed(1)))}%` : "1%"
      }));

    const topTexts = [...textBuckets.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([hex, count]) => ({ hex, count }));

    const topBorders = [...borderBuckets.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([color, count]) => ({ color, count }));

    // Sample typography
    function sampleType(selector, level) {
      const el = document.querySelector(selector);
      if (!el) return null;
      const cs = getComputedStyle(el);
      const fam = (cs.fontFamily.split(",")[0] || "Inter").replace(/['"]/g, "").trim();
      return {
        level,
        detectedFamily: fam,
        size: cs.fontSize,
        weight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        tracking: cs.letterSpacing,
        color: rgbToHex(cs.color)?.hex || null,
        sampleText: (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60)
      };
    }

    const typography = [
      sampleType("h1", "H1 Hero"),
      sampleType("main h2, section h2, h2", "H2 Section"),
      sampleType("main h3, section h3, h3", "H3 Card Title"),
      sampleType("main p, section p, p", "Body Copy"),
      sampleType("code, pre, kbd, [class*='mono' i]", "Code & Meta")
    ].filter(Boolean);

    // Sample primary button & header geometry
    const headerEl = document.querySelector("header");
    const headerCs = headerEl ? getComputedStyle(headerEl) : null;
    const headerRect = headerEl ? headerEl.getBoundingClientRect() : null;

    const ctaCandidates = Array.from(document.querySelectorAll("header a, header button, main a, main button")).filter((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      const bg = rgbToHex(cs.backgroundColor);
      return r.width >= 64 && r.height >= 26 && r.height <= 64 && bg && bg.hex !== bodyBg.hex;
    });
    const primaryBtn = ctaCandidates[0] || null;
    const btnCs = primaryBtn ? getComputedStyle(primaryBtn) : null;
    const btnRect = primaryBtn ? primaryBtn.getBoundingClientRect() : null;

    // Max content container width
    const containerWidths = Array.from(document.querySelectorAll("main > *, section > div, .container"))
      .map((el) => Math.round(el.getBoundingClientRect().width))
      .filter((w) => w >= 900 && w <= 1380);
    const containerMaxWidth = containerWidths.length
      ? `${containerWidths.sort((a, b) => b - a)[0]}px`
      : "1200px";

    // Brand SVG logo candidate in header
    let logoSvg = null;
    const headerSvg = document.querySelector("header a svg, nav a svg");
    if (headerSvg && headerSvg.outerHTML.length < 5500) {
      logoSvg = headerSvg.outerHTML.replace(/\s+/g, " ").trim();
    }

    return {
      title: document.title,
      metaDescription: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
      defaultTheme,
      canvasHex: bodyBg.hex,
      containerMaxWidth,
      logoSvg,
      topBgs,
      topTexts,
      topBorders,
      typography,
      geometry: {
        header: headerCs && headerRect
          ? {
              height: `${Math.round(headerRect.height)}px`,
              background: headerCs.backgroundColor,
              backdropFilter: headerCs.backdropFilter,
              borderBottom: `${headerCs.borderBottomWidth} ${headerCs.borderBottomStyle} ${headerCs.borderBottomColor}`
            }
          : null,
        primaryButton: btnCs && btnRect
          ? {
              label: (primaryBtn.textContent || "").replace(/\s+/g, " ").trim().slice(0, 28),
              height: `${Math.round(btnRect.height)}px`,
              padding: `0 ${btnCs.paddingRight}`,
              radius: btnCs.borderRadius,
              background: rgbToHex(btnCs.backgroundColor)?.hex || btnCs.backgroundColor,
              color: rgbToHex(btnCs.color)?.hex || btnCs.color,
              border: `${btnCs.borderTopWidth} ${btnCs.borderTopStyle} ${btnCs.borderTopColor}`,
              shadow: btnCs.boxShadow,
              transition: btnCs.transition
            }
          : null
      }
    };
  });
}

async function extractContiguousBands(page) {
  return page.evaluate(() => {
    const totalH = Math.max(document.documentElement.scrollHeight, 1);
    const rawBlocks = [];
    const candidates = Array.from(
      document.querySelectorAll("header, main > section, main > div, body > section, article, footer")
    );

    for (const el of candidates) {
      const r = el.getBoundingClientRect();
      const top = Math.max(0, Math.round(r.top + window.scrollY));
      const height = Math.round(r.height);
      if (height < 52 || r.width < 280) continue;
      if (rawBlocks.some((b) => Math.abs(b.top - top) < 48)) continue;
      const heading = el.querySelector("h1, h2, h3");
      rawBlocks.push({
        tag: el.tagName.toLowerCase(),
        heading: heading ? (heading.textContent || "").replace(/\s+/g, " ").trim().slice(0, 64) : "",
        top,
        height
      });
    }

    rawBlocks.sort((a, b) => a.top - b.top);
    const merged = rawBlocks.slice(0, 8);
    if (merged.length === 0) {
      return [{ index: "01", tag: "main", heading: document.title, top: 0, height: totalH, topPct: 0, heightPct: 100 }];
    }

    // Normalize into contiguous 0% -> 100% bands WITHOUT stretching <header>/<nav> into hero top padding!
    return merged.map((blk, i) => {
      const prev = i > 0 ? merged[i - 1] : null;
      const isHeaderBar = i === 0 && (blk.tag === "header" || blk.tag === "nav") && blk.height <= 120;
      const prevWasHeaderBar =
        i === 1 && prev && (prev.tag === "header" || prev.tag === "nav") && prev.height <= 120;

      const startPx = i === 0 ? 0 : prevWasHeaderBar ? prev.top + prev.height : blk.top;
      const endPx = isHeaderBar
        ? blk.top + blk.height
        : i === merged.length - 1
          ? totalH
          : merged[i + 1].top;

      const topPct = Number(((startPx / totalH) * 100).toFixed(2));
      const endPct = i === merged.length - 1 && !isHeaderBar ? 100 : Number(((endPx / totalH) * 100).toFixed(2));
      const heightPct = Number(Math.max(0.4, endPct - topPct).toFixed(2));
      return {
        index: String(i + 1).padStart(2, "0"),
        tag: blk.tag,
        heading: blk.heading,
        top: startPx,
        height: Math.max(44, endPx - startPx),
        topPct,
        heightPct
      };
    });
  });
}

async function cropViewportSlice(page, topY, heightPx, outPath, hideHeader = false) {
  await page.evaluate(
    ({ y, hide }) => {
      const hdr = document.querySelector("header");
      if (hdr) hdr.style.visibility = hide ? "hidden" : "visible";
      window.scrollTo(0, Math.max(0, y - 12));
    },
    { y: topY, hide: hideHeader }
  );
  await page.waitForTimeout(260);
  const actualY = await page.evaluate(() => window.scrollY);
  const offsetInVp = Math.max(0, topY - actualY);
  const clipH = Math.min(Math.max(56, heightPx), 900 - offsetInVp);
  await page.screenshot({
    path: outPath,
    clip: { x: 0, y: offsetInVp, width: 1440, height: clipH },
    type: "jpeg",
    quality: 86
  });
  await page.evaluate(() => {
    const hdr = document.querySelector("header");
    if (hdr) hdr.style.visibility = "visible";
  });
}

async function main() {
  const args = parseArgs(process.argv);
  if (!args.id || !args.url) {
    console.error("Usage: node harvest-site.mjs --id <brand-id> --url <https://example.com> [--proxy <url>]");
    process.exit(1);
  }

  const baseUrl = args.url.replace(/\/+$/, "");
  const origin = new URL(baseUrl).origin;
  const proxyServer = args.proxy || process.env.HTTPS_PROXY || process.env.HTTP_PROXY || "";
  const executablePath = resolveBrowserExecutable();

  const launchOpts = {
    headless: true,
    ...(executablePath ? { executablePath } : {}),
    ...(proxyServer ? { proxy: { server: proxyServer } } : {})
  };

  console.log(`[harvest] Launching headless browser (${executablePath || "playwright default"})`);
  const browser = await chromium.launch(launchOpts);

  try {
    const outRoot = path.resolve("public", "catalog", args.id);
    const pagesDir = path.join(outRoot, "pages");
    const sectionsDir = path.join(outRoot, "sections");
    await fs.mkdir(pagesDir, { recursive: true });
    await fs.mkdir(sectionsDir, { recursive: true });

    const deskCtx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1
    });
    const mobCtx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true
    });

    // Probe homepage first to check bot challenges, telemetry, cover, and subpages
    const homePage = await deskCtx.newPage();
    await homePage.goto(`${baseUrl}/`, { waitUntil: "networkidle", timeout: 40000 }).catch(() =>
      homePage.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded", timeout: 35000 })
    );
    await homePage.waitForTimeout(2200);

    const challenge = await detectBotChallenge(homePage);
    if (challenge.blocked) {
      console.error(`[BLOCKED_BY_CHALLENGE] ${baseUrl} -> ${challenge.reason}`);
      process.exit(4);
    }

    await dismissCookieOverlaysCss(homePage);
    await homePage.waitForTimeout(300);

    // Hero cover screenshot (1440x900)
    await homePage.screenshot({
      path: path.join(outRoot, "cover.jpg"),
      clip: { x: 0, y: 0, width: 1440, height: 900 },
      type: "jpeg",
      quality: 88
    });

    const telemetry = await extractDomDesignTelemetry(homePage);
    const targetPages = await discoverSubpages(homePage, origin);
    await homePage.close();

    const pageCaptures = [];
    const sectionSlices = [];

    for (const pg of targetPages) {
      const fullUrl = `${origin}${pg.path}`;
      console.log(`[harvest] Capturing ${pg.id} -> ${fullUrl}`);

      const dPage = await deskCtx.newPage();
      await dPage.goto(fullUrl, { waitUntil: "networkidle", timeout: 40000 }).catch(() =>
        dPage.goto(fullUrl, { waitUntil: "domcontentloaded", timeout: 35000 })
      );
      await dPage.waitForTimeout(2200);

      const subChallenge = await detectBotChallenge(dPage);
      if (subChallenge.blocked) {
        console.warn(`[skip] Subpage ${fullUrl} gated by challenge; skipping subpage.`);
        await dPage.close();
        continue;
      }

      await dismissCookieOverlaysCss(dPage);
      await triggerLazyAndReturnTop(dPage);

      if (pg.id === "changelog") {
        await dPage.evaluate(() => {
          const articles = Array.from(document.querySelectorAll("article"));
          if (articles.length > 4) articles.slice(4).forEach((el) => el.remove());
        });
      }

      const desktopBands = await extractContiguousBands(dPage);
      await dPage.screenshot({
        path: path.join(pagesDir, `${pg.id}-desktop.jpg`),
        fullPage: true,
        type: "jpeg",
        quality: 84
      });

      if (pg.id === "home") {
        const sliceCandidates = desktopBands.slice(0, 6);
        for (let i = 0; i < sliceCandidates.length; i += 1) {
          const b = sliceCandidates[i];
          const code = String(i + 1).padStart(2, "0");
          const fileName = `${code}-${b.tag}.jpg`;
          await cropViewportSlice(
            dPage,
            b.top,
            Math.min(b.height, 840),
            path.join(sectionsDir, fileName),
            i > 0
          );
          sectionSlices.push({
            index: code,
            selector: `<${b.tag}>`,
            heading: b.heading,
            bbox: `1440 × ${Math.min(b.height, 840)}px (y: ${b.top}px)`,
            img: `/catalog/${args.id}/sections/${fileName}`
          });
        }
      }
      await dPage.close();

      // Mobile capture + mobile contiguous bands
      const mPage = await mobCtx.newPage();
      await mPage.goto(fullUrl, { waitUntil: "domcontentloaded", timeout: 35000 });
      await mPage.waitForTimeout(2000);
      await dismissCookieOverlaysCss(mPage);
      if (pg.id === "changelog") {
        await mPage.evaluate(() => {
          const articles = Array.from(document.querySelectorAll("article"));
          if (articles.length > 4) articles.slice(4).forEach((el) => el.remove());
        });
      }
      const mobileBands = await extractContiguousBands(mPage);
      await mPage.screenshot({
        path: path.join(pagesDir, `${pg.id}-mobile.jpg`),
        fullPage: true,
        type: "jpeg",
        quality: 82
      });
      await mPage.close();

      pageCaptures.push({
        id: pg.id,
        titleZh: pg.titleZh,
        titleEn: pg.titleEn,
        path: pg.path,
        url: fullUrl,
        desktopImg: `/catalog/${args.id}/pages/${pg.id}-desktop.jpg`,
        mobileImg: `/catalog/${args.id}/pages/${pg.id}-mobile.jpg`,
        desktopBands,
        mobileBands
      });
    }

    const probeReport = {
      id: args.id,
      baseUrl,
      capturedAt: new Date().toISOString().slice(0, 10),
      coverImg: `/catalog/${args.id}/cover.jpg`,
      telemetry,
      pages: pageCaptures,
      sections: sectionSlices
    };

    const probePath = path.join(outRoot, "raw-probe.json");
    await fs.writeFile(probePath, JSON.stringify(probeReport, null, 2), "utf8");
    console.log(`[done] Harvest complete! Raw probe written to ${probePath}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("[harvest:error]", err);
  process.exit(1);
});
