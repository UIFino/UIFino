// Views 4, 5, 6: Progressive Components & Motion Library
// Level 1: Category Overview -> Level 2: Single Category Gallery -> Level 3: Left-Tree + Center-Stage + Right-TOC/Tuner 3-Column Workbench
import { CATALOG_ITEMS } from "../data/catalog-data.js";
import { ASSET_TYPES, COMPONENT_CATEGORIES, findAssetByPath, findCategoryById } from "../data/components-data.js";
import { computeWorkbenchTokens, generateFrameworkCode, getComponentFileList } from "../core/generators.js";
import { t } from "../i18n.js";
import { renderAssetStage, renderCategoryMiniStack } from "./preview-stage.js";

function esc(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// =========================================================
// LEVEL 1: Category Overview (shadcn.io/blocks style, covering Section/Block/Page/Motion)
// =========================================================
export function renderComponentsIndexView(state) {
  const lang = state.lang;
  const q = state.libSearch.trim().toLowerCase();

  let list = COMPONENT_CATEGORIES.filter((c) => {
    const typeOk = state.libAssetType === "all" || c.assetType === state.libAssetType;
    const qOk =
      !q ||
      [c.name, c.nameZh, c.descEn, c.descZh, ...c.items.map((i) => i.name + " " + i.tags.join(" "))]
        .join(" ")
        .toLowerCase()
        .includes(q);
    return typeOk && qOk;
  });

  if (state.libSort === "az") {
    list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  } else if (state.libSort === "count") {
    list = [...list].sort((a, b) => b.totalCount - a.totalCount);
  }

  const totalAssets = list.reduce((sum, c) => sum + c.totalCount, 0);
  const gridCls = state.libCardSize === "large" ? "lined-grid-3" : state.libCardSize === "list" ? "lined-grid-2" : "lined-grid-4";

  return `
    <div>
      <!-- Level 1 Header -->
      <div class="band-full">
        <section class="shell-wrap hero-stripes" style="padding:0 28px 34px;">
          <span class="ribbon-tag">SECTIONS · BLOCKS · PAGES · MOTION</span>
          <nav class="font-mono-ui" style="margin-top:16px;font-size:12px;color:var(--text-muted);">
            <button type="button" data-go="home" style="background:none;border:0;padding:0;color:inherit;cursor:pointer;">Home</button>
            <span> / </span>
            <span style="color:var(--text-primary);">${t(lang, "navComponents")}</span>
          </nav>
          <h1 class="heading-page" style="margin-top:8px;">
            ${lang === "zh" ? "渐进式组件与动效资产总览" : "Progressive Sections, Blocks, Pages & Motion."}
          </h1>
        </section>
      </div>

      <!-- Level 1 Filter & Card Size Toolbar (shadcn.io/blocks authentic toolbar) -->
      <div class="band-full">
        <section class="shell-wrap">
          <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding:12px 20px;border-bottom:1px solid var(--border-hairline);background:var(--bg-surface);">
            <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;">
              <div class="seg-group" style="flex-wrap:wrap;">
                ${ASSET_TYPES.map(
                  (tp) => `
                  <button type="button" data-lib-type="${tp.id}" class="seg-btn ${state.libAssetType === tp.id ? "is-active" : ""}">
                    ${lang === "zh" ? tp.labelZh : tp.labelEn}
                  </button>`
                ).join("")}
              </div>

              <div style="display:flex;align-items:center;gap:6px;height:30px;padding:0 10px;border:1px solid var(--border-hairline);background:var(--bg-code);width:210px;">
                <span style="font-size:12px;color:var(--text-subtle);">⌕</span>
                <input id="lib-search-input" type="search" value="${esc(state.libSearch)}" placeholder="${lang === "zh" ? "搜索分类或组件…" : "Filter categories…"}" style="width:100%;border:0;background:transparent;outline:none;font-size:12px;" />
              </div>
            </div>

            <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;">
              <span class="font-mono-ui" style="font-size:12px;color:var(--text-muted);">
                ${list.length} categories · ${totalAssets} assets
              </span>

              <div class="seg-group">
                <button type="button" data-lib-sort="popular" class="seg-btn ${state.libSort === "popular" ? "is-active" : ""}">Popular</button>
                <button type="button" data-lib-sort="count" class="seg-btn ${state.libSort === "count" ? "is-active" : ""}">Count</button>
                <button type="button" data-lib-sort="az" class="seg-btn ${state.libSort === "az" ? "is-active" : ""}">A–Z</button>
              </div>

              <div class="seg-group">
                <button type="button" data-lib-size="small" class="seg-btn ${state.libCardSize === "small" ? "is-active" : ""}">4-Col</button>
                <button type="button" data-lib-size="large" class="seg-btn ${state.libCardSize === "large" ? "is-active" : ""}">3-Col</button>
                <button type="button" data-lib-size="list" class="seg-btn ${state.libCardSize === "list" ? "is-active" : ""}">List</button>
              </div>
            </div>
          </div>

          ${
            list.length === 0
              ? `<div style="padding:64px 24px;text-align:center;">
                  <div style="font-size:15px;font-weight:600;">${t(lang, "emptyResult")}</div>
                  <button type="button" data-reset-lib="1" class="btn-hairline" style="margin-top:14px;">${t(lang, "resetFilter")}</button>
                </div>`
              : `<div class="${gridCls}">
                  ${list
                    .map((cat) =>
                      state.libCardSize === "list"
                        ? `<div class="lined-cell">
                            <button type="button" data-go="components-cat:${cat.id}" style="width:100%;padding:18px 22px;background:transparent;border:0;text-align:left;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:16px;">
                              <div style="min-width:0;">
                                <div style="display:flex;align-items:center;gap:8px;">
                                  <span class="badge-sharp">${cat.assetType.toUpperCase()}</span>
                                  <span style="font-size:15px;font-weight:600;">${lang === "zh" ? cat.nameZh : cat.name}</span>
                                </div>
                                <div class="truncate-1" style="margin-top:5px;font-size:13px;color:var(--text-muted);">${lang === "zh" ? cat.descZh : cat.descEn}</div>
                              </div>
                              <span class="font-mono-ui" style="font-size:12px;color:var(--accent-text);flex-shrink:0;">${cat.totalCount} →</span>
                            </button>
                          </div>`
                        : `<div class="lined-cell">
                            <button type="button" data-go="components-cat:${cat.id}" class="cat-card-btn" style="background:transparent;">
                              <div style="width:100%;">
                                <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
                                  <span class="truncate-1" style="font-size:14.5px;font-weight:600;color:var(--text-primary);">${lang === "zh" ? cat.nameZh : cat.name}</span>
                                  <span class="badge-sharp">${cat.assetType.toUpperCase()}</span>
                                </div>
                                <div class="font-mono-ui" style="margin-top:3px;font-size:12px;color:var(--text-subtle);">${cat.totalCount} assets</div>
                              </div>
                              ${renderCategoryMiniStack(cat)}
                              <div class="cell-bottom-mask"></div>
                            </button>
                          </div>`
                    )
                    .join("")}
                </div>`
          }
        </section>
      </div>
    </div>`;
}

// =========================================================
// LEVEL 2: Single Category List (shadcn.io/hero-block clean 16:10 framed cards, NO sidebar)
// =========================================================
export function renderComponentsCategoryView(state) {
  const lang = state.lang;
  const cat = findCategoryById(state.param);
  const subcats = ["All", ...Array.from(new Set(cat.items.map((i) => i.subcat)))];
  const siblings = COMPONENT_CATEGORIES.filter((c) => c.assetType === cat.assetType);

  const items = cat.items.filter((i) => state.catSubfilter === "All" || i.subcat === state.catSubfilter);
  const previewTokens = computeWorkbenchTokens({
    radius: state.wbRadius,
    density: "compact",
    skinId: state.wbSkin,
    mode: state.theme
  });

  return `
    <div>
      <!-- Level 2 Header -->
      <div class="band-full">
        <section class="shell-wrap hero-stripes" style="padding:24px 28px 30px;">
          <nav class="font-mono-ui" style="font-size:12px;color:var(--text-muted);display:flex;flex-wrap:wrap;gap:6px;align-items:center;">
            <button type="button" data-go="home" style="background:none;border:0;padding:0;color:inherit;cursor:pointer;">Home</button>
            <span>/</span>
            <button type="button" data-go="components-index" style="background:none;border:0;padding:0;color:inherit;cursor:pointer;">${t(lang, "navComponents")}</button>
            <span>/</span>
            <span style="text-transform:uppercase;">${cat.assetType}</span>
            <span>/</span>
            <span style="color:var(--text-primary);">${lang === "zh" ? cat.nameZh : cat.name}</span>
          </nav>

          <div style="margin-top:12px;display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:14px;">
            <div>
              <h1 class="heading-page">${lang === "zh" ? cat.nameZh : cat.name}</h1>
              <p style="margin:8px 0 0;max-width:640px;font-size:14.5px;color:var(--text-muted);">
                ${lang === "zh" ? cat.descZh : cat.descEn}
              </p>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:6px;">
              ${siblings
                .map(
                  (s) => `
                <button type="button" data-go="components-cat:${s.id}" class="badge-sharp" style="height:26px;padding:0 9px;cursor:pointer;${s.id === cat.id ? "border-color:var(--accent-border);color:var(--accent-text);" : ""}">
                  ${lang === "zh" ? s.nameZh : s.name}
                </button>`
                )
                .join("")}
            </div>
          </div>
        </section>
      </div>

      <!-- Level 2 Subcategory Toolbar + Clean 3-Column 16:10 Cards -->
      <div class="band-full">
        <section class="shell-wrap">
          <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;padding:12px 20px;border-bottom:1px solid var(--border-hairline);background:var(--bg-surface);">
            <div class="seg-group" style="flex-wrap:wrap;">
              ${subcats
                .map(
                  (sc) => `
                <button type="button" data-cat-sub="${esc(sc)}" class="seg-btn ${state.catSubfilter === sc ? "is-active" : ""}">
                  ${sc}
                </button>`
                )
                .join("")}
            </div>

            <div style="display:flex;align-items:center;gap:10px;">
              <span class="font-mono-ui" style="font-size:12px;color:var(--text-muted);">${items.length} shown · ${cat.totalCount} in registry</span>
              <div class="seg-group">
                <button type="button" data-cat-cols="3" class="seg-btn ${state.catCols === 3 ? "is-active" : ""}">3-Col</button>
                <button type="button" data-cat-cols="2" class="seg-btn ${state.catCols === 2 ? "is-active" : ""}">2-Col</button>
              </div>
            </div>
          </div>

          <div class="${state.catCols === 2 ? "lined-grid-2" : "lined-grid-3"}">
            ${items
              .map(
                (item) => `
              <div class="lined-cell">
                <button type="button" data-go="components-detail:${cat.id}/${item.id}" class="asset-gallery-card" style="background:transparent;">
                  <div class="asset-thumb-frame">
                    <div style="height:100%;width:100%;display:flex;flex-direction:column;justify-content:center;">
                      ${renderAssetStage(item, previewTokens, "desktop", true)}
                    </div>
                  </div>
                  <div style="margin-top:12px;width:100%;">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
                      <span class="truncate-1" style="font-size:14.5px;font-weight:600;color:var(--text-primary);">${item.name}</span>
                      <span class="badge-sharp">${item.subcat}</span>
                    </div>
                    <p class="clamp-2" style="margin:5px 0 0;font-size:12.5px;color:var(--text-muted);line-height:1.45;">
                      ${lang === "zh" ? item.descZh : item.descEn}
                    </p>
                  </div>
                </button>
              </div>`
              )
              .join("")}
          </div>
        </section>
      </div>
    </div>`;
}

// =========================================================
// LEVEL 3: Three-Column Workbench (Left Asset/File Tree + Center Stage + Right Tuner & TOC)
// =========================================================
export function renderComponentWorkbenchView(state) {
  const lang = state.lang;
  const { category, item } = findAssetByPath(state.param);
  const tokens = computeWorkbenchTokens({
    radius: state.wbRadius,
    density: state.wbDensity,
    skinId: state.wbSkin,
    mode: state.wbStageMode
  });

  const files = getComponentFileList(item, state.wbFramework);
  const activeFile = files.includes(state.wbActiveFile) ? state.wbActiveFile : files[0];
  const codeOutput = generateFrameworkCode(item, category, state.wbFramework, tokens, activeFile);

  const maxW = state.wbViewport === "mobile" ? "390px" : state.wbViewport === "tablet" ? "768px" : "100%";
  const cliCmd = `npx uifino@latest add ${category.assetType}/${item.id} --framework ${state.wbFramework} --radius ${tokens.radius}`;

  const treeQ = state.wbTreeFilter.trim().toLowerCase();
  const visibleTreeCats = COMPONENT_CATEGORIES.filter((c) => {
    const typeOk = state.wbTreeType === "all" || c.assetType === state.wbTreeType;
    if (!typeOk) return false;
    if (!treeQ) return true;
    return c.name.toLowerCase().includes(treeQ) || c.items.some((i) => i.name.toLowerCase().includes(treeQ));
  });

  return `
    <div class="band-full">
      <div class="workbench-grid">
        <!-- 1. LEFT COLUMN: Asset & Source File Tree (240px) -->
        <aside class="wb-left-tree wb-sticky-col" style="padding:14px 10px;">
          <button type="button" data-go="components-cat:${category.id}" class="tree-row font-mono-ui" style="font-size:11.5px;margin-bottom:8px;">
            <span>← ${t(lang, "wbBack")} (${category.name})</span>
          </button>

          <!-- Asset Type Switcher & Tree Search -->
          <div style="padding:0 6px 10px;border-bottom:1px solid var(--border-hairline);display:grid;gap:6px;">
            <select id="wb-tree-type-select" aria-label="Asset Type" style="height:30px;padding:0 8px;border:1px solid var(--border-hairline);background:var(--bg-surface);font-family:var(--font-mono);font-size:11.5px;">
              ${ASSET_TYPES.map(
                (tp) =>
                  `<option value="${tp.id}" ${state.wbTreeType === tp.id ? "selected" : ""}>${lang === "zh" ? tp.labelZh : tp.labelEn}</option>`
              ).join("")}
            </select>
            <input id="wb-tree-filter-input" type="search" value="${esc(state.wbTreeFilter)}" placeholder="${t(lang, "wbFilterTree")}" style="height:30px;padding:0 8px;border:1px solid var(--border-hairline);background:var(--bg-code);font-size:12px;outline:none;" />
          </div>

          <!-- Active Asset Source Files -->
          <div style="padding:10px 0;border-bottom:1px solid var(--border-hairline);">
            <div class="eyebrow-mono" style="padding:0 10px 6px;">SOURCE FILES</div>
            ${files
              .map(
                (f) => `
              <button type="button" data-wb-file="${f}" class="tree-row font-mono-ui ${state.wbStageTab === "code" && activeFile === f ? "is-active" : ""}" style="font-size:11.5px;">
                <span class="truncate-1">📄 ${f}</span>
              </button>`
              )
              .join("")}
          </div>

          <!-- Registry Tree -->
          <div style="padding-top:10px;display:grid;gap:12px;">
            ${visibleTreeCats
              .map(
                (c) => `
              <div>
                <button type="button" data-go="components-cat:${c.id}" class="eyebrow-mono" style="width:100%;padding:2px 10px;background:none;border:0;display:flex;justify-content:space-between;cursor:pointer;color:${c.id === category.id ? "var(--accent-text)" : "var(--text-subtle)"};">
                  <span class="truncate-1">${lang === "zh" ? c.nameZh : c.name}</span>
                  <span>${c.items.length}</span>
                </button>
                <div style="margin-top:3px;">
                  ${c.items
                    .filter((it) => !treeQ || it.name.toLowerCase().includes(treeQ) || c.name.toLowerCase().includes(treeQ))
                    .map(
                      (it) => `
                    <button type="button" data-go="components-detail:${c.id}/${it.id}" class="tree-row ${it.id === item.id ? "is-active" : ""}">
                      <span class="truncate-1">${it.name}</span>
                    </button>`
                    )
                    .join("")}
                </div>
              </div>`
              )
              .join("")}
          </div>
        </aside>

        <!-- 2. CENTER COLUMN: Interactive Multi-Framework & Multi-Viewport Stage -->
        <main style="min-width:0;padding:24px 20px 48px;display:grid;grid-template-columns:minmax(0,1fr);gap:24px;align-content:start;">
          <!-- #wb-overview -->
          <section id="wb-overview" style="min-width:0;display:grid;grid-template-columns:minmax(0,1fr);gap:12px;">
            <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;">
              <nav class="font-mono-ui" style="font-size:12px;color:var(--text-muted);display:flex;flex-wrap:wrap;gap:6px;align-items:center;">
                <button type="button" data-go="components-index" style="background:none;border:0;padding:0;color:inherit;cursor:pointer;">Components</button>
                <span>/</span>
                <button type="button" data-go="components-cat:${category.id}" style="background:none;border:0;padding:0;color:inherit;cursor:pointer;">${category.name}</button>
                <span>/</span>
                <span style="color:var(--text-primary);">${item.id}</span>
              </nav>
              <span class="badge-sharp" style="color:var(--accent-text);border-color:var(--accent-border);">${category.assetType.toUpperCase()}</span>
            </div>

            <div style="display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:16px;">
              <div>
                <h1 class="heading-page">${item.name}</h1>
                <p style="margin:6px 0 0;max-width:660px;font-size:14px;color:var(--text-muted);">
                  ${lang === "zh" ? item.descZh : item.descEn}
                </p>
              </div>
            </div>

            <!-- Framework Bar + Stage Controls Bar -->
            <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-hairline);">
              <!-- Left: Preview/Code + Multi-Framework Switcher -->
              <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;">
                <div class="seg-group">
                  <button type="button" data-wb-tab="preview" class="seg-btn ${state.wbStageTab === "preview" ? "is-active" : ""}">Preview</button>
                  <button type="button" data-wb-tab="code" class="seg-btn ${state.wbStageTab === "code" ? "is-active" : ""}">Code</button>
                </div>

                <div class="seg-group" aria-label="Frontend Framework">
                  ${[
                    ["react", "React"],
                    ["vue", "Vue"],
                    ["svelte", "Svelte"],
                    ["solid", "Solid"]
                  ]
                    .map(
                      ([fw, lbl]) => `
                    <button type="button" data-wb-fw="${fw}" class="seg-btn ${state.wbFramework === fw ? "is-active" : ""}">${lbl}</button>`
                    )
                    .join("")}
                </div>
              </div>

              <!-- Right: Desktop/Tablet/Mobile Viewport + Stage Dark/Light + Replay -->
              <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;">
                <div class="seg-group" aria-label="Viewport Size">
                  <button type="button" data-wb-vp="desktop" class="seg-btn ${state.wbViewport === "desktop" ? "is-active" : ""}">Desktop</button>
                  <button type="button" data-wb-vp="tablet" class="seg-btn ${state.wbViewport === "tablet" ? "is-active" : ""}">Tablet</button>
                  <button type="button" data-wb-vp="mobile" class="seg-btn ${state.wbViewport === "mobile" ? "is-active" : ""}">Mobile</button>
                </div>

                <div class="seg-group">
                  <button type="button" data-wb-mode="dark" class="seg-btn ${state.wbStageMode === "dark" ? "is-active" : ""}">Dark</button>
                  <button type="button" data-wb-mode="light" class="seg-btn ${state.wbStageMode === "light" ? "is-active" : ""}">Light</button>
                </div>

                <button type="button" id="wb-replay-btn" class="btn-hairline" style="height:30px;padding:0 10px;font-family:var(--font-mono);font-size:11.5px;">↻ Replay</button>
              </div>
            </div>
          </section>

          <!-- #wb-stage -->
          <section id="wb-stage" style="min-width:0;">
            ${
              state.wbStageTab === "preview"
                ? `<div class="preview-canvas-well">
                    <div class="preview-viewport-box" style="max-width:${maxW};">
                      ${renderAssetStage(item, tokens, state.wbViewport, false)}
                    </div>
                  </div>`
                : `<div style="border:1px solid var(--border-hairline);background:var(--bg-code);">
                    <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;padding:8px 14px;border-bottom:1px solid var(--border-hairline);">
                      <div style="display:flex;gap:6px;">
                        ${files
                          .map(
                            (f) => `
                          <button type="button" data-wb-file="${f}" class="badge-sharp" style="height:24px;cursor:pointer;${activeFile === f ? "border-color:var(--accent-border);color:var(--accent-text);" : ""}">
                            ${f}
                          </button>`
                          )
                          .join("")}
                      </div>
                      <button type="button" data-copy-wb-code="1" class="badge-sharp" style="height:24px;cursor:pointer;color:var(--text-primary);">Copy ${activeFile}</button>
                    </div>
                    <pre class="code-scroll">${esc(codeOutput)}</pre>
                  </div>`
            }
          </section>

          <!-- #wb-install -->
          <section id="wb-install" style="min-width:0;border:1px solid var(--border-hairline);background:var(--bg-surface);padding:18px;">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
              <h2 class="eyebrow-mono" style="margin:0;color:var(--text-primary);">INSTALLATION &amp; CLI</h2>
              <span class="font-mono-ui" style="font-size:11px;color:var(--text-subtle);">Framework: ${state.wbFramework.toUpperCase()}</span>
            </div>
            <div style="margin-top:10px;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;background:var(--bg-code);border:1px solid var(--border-hairline);font-family:var(--font-mono);font-size:12.5px;">
              <span class="truncate-1"><span style="color:var(--accent-text);">$</span> ${cliCmd}</span>
              <button type="button" data-copy="${cliCmd}" class="badge-sharp" style="cursor:pointer;color:var(--text-primary);">Copy</button>
            </div>
          </section>

          <!-- #wb-tokens -->
          <section id="wb-tokens" style="min-width:0;border:1px solid var(--border-hairline);background:var(--bg-surface);padding:18px;">
            <h2 class="eyebrow-mono" style="margin:0;color:var(--text-primary);">ACTIVE TOKEN CONTRACT</h2>
            <div style="margin-top:12px;display:grid;grid-template-columns:repeat(auto-fit,minmax(135px,1fr));gap:10px;font-family:var(--font-mono);font-size:12px;">
              <div style="padding:10px;background:var(--bg-code);border:1px solid var(--border-hairline);">
                <div style="font-size:10.5px;color:var(--text-subtle);">SKIN</div>
                <div style="margin-top:3px;font-weight:600;">${tokens.skinName}</div>
              </div>
              <div style="padding:10px;background:var(--bg-code);border:1px solid var(--border-hairline);">
                <div style="font-size:10.5px;color:var(--text-subtle);">CARD RADIUS</div>
                <div style="margin-top:3px;font-weight:600;color:var(--accent-text);">${tokens.card} (${tokens.twCard})</div>
              </div>
              <div style="padding:10px;background:var(--bg-code);border:1px solid var(--border-hairline);">
                <div style="font-size:10.5px;color:var(--text-subtle);">DENSITY</div>
                <div style="margin-top:3px;font-weight:600;">${tokens.density} (${tokens.padCard})</div>
              </div>
              <div style="padding:10px;background:var(--bg-code);border:1px solid var(--border-hairline);">
                <div style="font-size:10.5px;color:var(--text-subtle);">ACCENT HEX</div>
                <div style="margin-top:3px;display:flex;align-items:center;gap:6px;font-weight:600;">
                  <span style="width:10px;height:10px;background:${tokens.accent};display:inline-block;"></span>${tokens.accent}
                </div>
              </div>
            </div>
          </section>

          <!-- #wb-rules -->
          <section id="wb-rules" style="min-width:0;border:1px solid var(--border-hairline);background:var(--bg-surface);padding:18px;">
            <h2 class="eyebrow-mono" style="margin:0;color:var(--text-primary);">LAYOUT &amp; MOTION GUARDRAILS</h2>
            <ul style="margin:12px 0 0;padding-left:18px;display:grid;gap:6px;font-size:13.5px;color:var(--text-body);">
              ${item.contract.map((rule) => `<li>${esc(rule)}</li>`).join("")}
            </ul>
          </section>
        </main>

        <!-- 3. RIGHT COLUMN: Live Radius/Density Tuner + On This Page Directory (264px) -->
        <aside class="wb-right-panel wb-sticky-col" style="padding:18px 16px;display:grid;gap:22px;align-content:start;">
          <!-- Live Parameter Micro-Tuner -->
          <div style="display:grid;gap:14px;padding-bottom:18px;border-bottom:1px solid var(--border-hairline);">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span class="eyebrow-mono" style="color:var(--accent-text);">${t(lang, "wbParamsTitle")}</span>
              <button type="button" data-wb-reset="1" class="font-mono-ui" style="background:none;border:0;padding:0;font-size:11px;color:var(--text-subtle);cursor:pointer;text-decoration:underline;">${t(lang, "wbReset")}</button>
            </div>

            <!-- Radius Selector -->
            <div>
              <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;">
                <span style="color:var(--text-muted);">${t(lang, "wbRadius")}</span>
                <span class="font-mono-ui" style="color:var(--text-primary);">${tokens.card}</span>
              </div>
              <div class="seg-group" style="width:100%;display:grid;grid-template-columns:repeat(5,1fr);">
                ${[0, 4, 8, 12, 16]
                  .map(
                    (r) => `
                  <button type="button" data-wb-radius="${r}" class="seg-btn ${state.wbRadius === r ? "is-active" : ""}" style="justify-content:center;padding:0;">${r}</button>`
                  )
                  .join("")}
              </div>
            </div>

            <!-- Density Selector -->
            <div>
              <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;">
                <span style="color:var(--text-muted);">${t(lang, "wbDensity")}</span>
                <span class="font-mono-ui" style="color:var(--text-primary);">${tokens.density}</span>
              </div>
              <div class="seg-group" style="width:100%;display:grid;grid-template-columns:repeat(3,1fr);">
                ${[
                  ["compact", "Compact"],
                  ["default", "Default"],
                  ["spacious", "Spacious"]
                ]
                  .map(
                    ([d, lbl]) => `
                  <button type="button" data-wb-density="${d}" class="seg-btn ${state.wbDensity === d ? "is-active" : ""}" style="justify-content:center;padding:0;font-size:11.5px;">${lbl}</button>`
                  )
                  .join("")}
              </div>
            </div>

            <!-- Brand Protocol Skin -->
            <div>
              <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px;">${t(lang, "wbBrandSkin")}</div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;">
                ${[
                  ["default", "uifino"],
                  ...CATALOG_ITEMS.slice(0, 5).map((b) => [b.id, b.name])
                ]
                  .map(
                    ([id, name]) => `
                  <button type="button" data-wb-skin="${id}" class="btn-hairline" style="height:28px;padding:0 8px;justify-content:flex-start;font-size:11.5px;${state.wbSkin === id ? "border-color:var(--accent-border);color:var(--accent-text);" : ""}">
                    <span class="truncate-1">${name}</span>
                  </button>`
                  )
                  .join("")}
              </div>
            </div>

            <button type="button" data-copy-wb-code="1" class="btn-contrast" style="width:100%;height:34px;font-size:12px;">
              ${t(lang, "wbCopyCode")} (${state.wbFramework})
            </button>
          </div>

          <!-- Right Directory: ON THIS PAGE TOC (shadcn.io authentic right column) -->
          <div>
            <div class="eyebrow-mono" style="margin-bottom:10px;">${t(lang, "wbTocTitle")}</div>
            <nav style="display:grid;gap:2px;">
              <a href="#wb-overview" data-toc-scroll="wb-overview" class="toc-link is-active">Overview &amp; Stack</a>
              <a href="#wb-stage" data-toc-scroll="wb-stage" class="toc-link">Live Stage (${state.wbViewport})</a>
              <a href="#wb-install" data-toc-scroll="wb-install" class="toc-link">Installation CLI</a>
              <a href="#wb-tokens" data-toc-scroll="wb-tokens" class="toc-link">Active Token Contract</a>
              <a href="#wb-rules" data-toc-scroll="wb-rules" class="toc-link">Layout &amp; Motion Rules</a>
            </nav>
          </div>
        </aside>
      </div>
    </div>`;
}
