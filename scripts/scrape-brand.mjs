import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PROXY_SERVER = process.env.HTTPS_PROXY || "http://127.0.0.1:7897";

const TARGET = {
  id: "linear",
  baseUrl: "https://linear.app",
  pages: [
    { id: "home", path: "/", titleZh: "产品首页", titleEn: "Home" },
    { id: "pricing", path: "/pricing", titleZh: "定价方案", titleEn: "Pricing" },
    { id: "changelog", path: "/changelog", titleZh: "更新日志", titleEn: "Changelog" },
    { id: "login", path: "/login", titleZh: "登录入口", titleEn: "Log in" }
  ]
};

async function triggerLazyAndReturnTop(page) {
  await page.evaluate(async () => {
    const maxScroll = Math.min(document.body.scrollHeight, 7500);
    for (let y = 0; y <= maxScroll; y += 700) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 140));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1800);
}

async function cropElementViewportSlice(page, topY, heightPx, outPath, hideHeader = false) {
  await page.evaluate(
    ({ y, hide }) => {
      const hdr = document.querySelector("header");
      if (hdr) hdr.style.visibility = hide ? "hidden" : "visible";
      window.scrollTo(0, Math.max(0, y - 16));
    },
    { y: topY, hide: hideHeader }
  );
  await page.waitForTimeout(300);
  const actualY = await page.evaluate(() => window.scrollY);
  const offsetInVp = Math.max(0, topY - actualY);
  const clipH = Math.min(Math.max(56, heightPx), 900 - offsetInVp);
  await page.screenshot({
    path: outPath,
    clip: { x: 0, y: offsetInVp, width: 1440, height: clipH },
    type: "jpeg",
    quality: 88
  });
}

async function run() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    proxy: { server: PROXY_SERVER }
  });

  try {
    const outRoot = path.resolve("public", "catalog", TARGET.id);
    const pagesDir = path.join(outRoot, "pages");
    const sectionsDir = path.join(outRoot, "sections");
    await fs.mkdir(pagesDir, { recursive: true });
    await fs.mkdir(sectionsDir, { recursive: true });

    const deskCtx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      colorScheme: "dark"
    });
    const mobCtx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      colorScheme: "dark"
    });

    for (const pg of TARGET.pages) {
      const fullUrl = `${TARGET.baseUrl}${pg.path}`;
      console.log(`[capture] Desktop ${fullUrl}`);
      const dPage = await deskCtx.newPage();
      await dPage.goto(fullUrl, { waitUntil: "networkidle", timeout: 40000 }).catch(() =>
        dPage.goto(fullUrl, { waitUntil: "domcontentloaded", timeout: 35000 })
      );
      await dPage.waitForTimeout(2600);
      await triggerLazyAndReturnTop(dPage);

      if (pg.id === "changelog") {
        // Keep top 4 changelog entries so fullPage screenshot stays fast & crisp (~400KB)
        await dPage.evaluate(() => {
          const articles = Array.from(document.querySelectorAll("article"));
          if (articles.length > 4) {
            articles.slice(4).forEach((el) => el.remove());
          }
        });
      }

      await dPage.screenshot({
        path: path.join(pagesDir, `${pg.id}-desktop.jpg`),
        fullPage: true,
        type: "jpeg",
        quality: 84
      });

      if (pg.id === "home") {
        // Crop Header, Hero, 3-Column Pillars, Intake Showcase, Quotes, Footer
        const bands = await dPage.evaluate(() => {
          const totalH = Math.max(document.documentElement.scrollHeight, 1);
          const pct = (px) => Number(((px / totalH) * 100).toFixed(2));
          const hdr = document.querySelector("header");
          const ftr = document.querySelector("footer");
          const headings = Array.from(document.querySelectorAll("h1, h2")).map((h) => {
            const box = h.closest("section") || h.parentElement?.parentElement || h;
            const r = box.getBoundingClientRect();
            const top = Math.max(0, Math.round(r.top + window.scrollY));
            const height = Math.round(r.height);
            return {
              text: (h.textContent || "").replace(/\s+/g, " ").trim().slice(0, 56),
              top,
              height,
              topPct: pct(top),
              heightPct: pct(height),
              tag: box.tagName.toLowerCase()
            };
          });
          return {
            header: hdr
              ? { top: 0, height: Math.round(hdr.getBoundingClientRect().height) }
              : { top: 0, height: 73 },
            headings,
            footer: ftr
              ? {
                  top: Math.round(ftr.getBoundingClientRect().top + window.scrollY),
                  height: Math.round(ftr.getBoundingClientRect().height)
                }
              : null
          };
        });

        await cropElementViewportSlice(
          dPage,
          0,
          bands.header.height,
          path.join(sectionsDir, "01-header.jpg"),
          false
        );

        const uniqueBands = [];
        for (const b of bands.headings) {
          if (b.top < 60) continue;
          if (uniqueBands.some((u) => Math.abs(u.top - b.top) < 350)) continue;
          uniqueBands.push(b);
          if (uniqueBands.length >= 4) break;
        }

        let num = 2;
        for (const b of uniqueBands) {
          const code = String(num).padStart(2, "0");
          await cropElementViewportSlice(
            dPage,
            b.top,
            Math.min(Math.max(460, b.height), 820),
            path.join(sectionsDir, `${code}-section.jpg`),
            true
          );
          console.log(`[slice] ${code} y=${b.top} h=${b.height} "${b.text}"`);
          num += 1;
        }

        if (bands.footer) {
          await cropElementViewportSlice(
            dPage,
            bands.footer.top,
            bands.footer.height,
            path.join(sectionsDir, "06-footer.jpg"),
            true
          );
        }
      }

      if (pg.id === "pricing") {
        // Also crop the 4-tier pricing matrix card band!
        await cropElementViewportSlice(
          dPage,
          80,
          760,
          path.join(sectionsDir, "05-pricing-tiers.jpg"),
          true
        );
      }

      await dPage.close();

      console.log(`[capture] Mobile ${fullUrl}`);
      const mPage = await mobCtx.newPage();
      await mPage.goto(fullUrl, { waitUntil: "domcontentloaded", timeout: 35000 });
      await mPage.waitForTimeout(2200);
      if (pg.id === "changelog") {
        await mPage.evaluate(() => {
          const articles = Array.from(document.querySelectorAll("article"));
          if (articles.length > 4) {
            articles.slice(4).forEach((el) => el.remove());
          }
        });
      }
      await mPage.screenshot({
        path: path.join(pagesDir, `${pg.id}-mobile.jpg`),
        fullPage: true,
        type: "jpeg",
        quality: 82
      });
      await mPage.close();
    }

    console.log("[done] Refined captures & 6 section slices complete!");
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
