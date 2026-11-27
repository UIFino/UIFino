// View 2 & View 3: Website & App Catalog Index + Brand DESIGN.md Detail (Light/Dark Compare & Protocol Viewer)
import { CATALOG_CATEGORIES, CATALOG_ITEMS } from "../data/catalog-data.js";
import { generateDesignMd } from "../core/generators.js";
import { t } from "../i18n.js";
import { renderPageBanner } from "./page-banner.js";
import { renderBrandPortrait } from "./preview-stage.js";

function esc(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderCatalogIndexView(state) {
  const lang = state.lang;
  const q = state.catalogSearch.trim().toLowerCase();

  const filtered = CATALOG_ITEMS.filter((item) => {
    const kindOk = state.catalogKind === "all" || item.kind === state.catalogKind;
    const catOk = state.catalogCategory === "All" || item.category === state.catalogCategory;
    const qOk =
      !q ||
      [item.name, item.slug, item.category, item.fonts.display, ...item.tags, item.summaryEn, item.summaryZh]
        .join(" ")
        .toLowerCase()
        .includes(q);
    return kindOk && catOk && qOk;
  });

  return `
    <div>
      ${renderPageBanner({
        breadcrumbs: [{ label: "Home", go: "home" }, { label: t(lang, "navCatalog") }],
        title: lang === "zh" ? "标杆网站与移动应用设计规范拆解" : "Design system specs from real websites & apps.",
        description:
          lang === "zh"
            ? "提取真实产品的明暗色彩阶梯、字族配对、圆角与间距体系，支持同屏对比并导出标准 DESIGN.md。"
            : "Exact Light/Dark color ladders, typography pairings, and radius scales ready to export as DESIGN.md."
      })}

      <!-- Unified Filter & Search Toolbar -->
      <div class="band-full">
        <div class="shell-wrap">
          <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding:12px 20px;border-bottom:1px solid var(--border-hairline);background:var(--bg-surface);">
            <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;">
              <div class="seg-group">
                <button type="button" data-cat-kind="all" class="seg-btn ${state.catalogKind === "all" ? "is-active" : ""}">All</button>
                <button type="button" data-cat-kind="website" class="seg-btn ${state.catalogKind === "website" ? "is-active" : ""}">Websites</button>
                <button type="button" data-cat-kind="app" class="seg-btn ${state.catalogKind === "app" ? "is-active" : ""}">Apps</button>
              </div>

              <div class="seg-group" style="flex-wrap:wrap;">
                ${CATALOG_CATEGORIES.map(
                  (cat) => `
                  <button type="button" data-cat-category="${cat}" class="seg-btn ${state.catalogCategory === cat ? "is-active" : ""}">
                    <span>${cat}</span>
                  </button>`
                ).join("")}
              </div>

              <div style="display:flex;align-items:center;gap:6px;height:30px;padding:0 10px;border:1px solid var(--border-hairline);background:var(--bg-code);width:210px;">
                <span style="color:var(--text-subtle);font-size:12px;">⌕</span>
                <input id="catalog-search-input" type="search" value="${esc(state.catalogSearch)}" placeholder="${lang === "zh" ? "搜索品牌、字体或风格…" : "Search brand or tag…"}" style="width:100%;border:0;background:transparent;outline:none;font-size:12px;" />
              </div>
            </div>

            <div style="display:flex;align-items:center;gap:10px;">
              <span class="font-mono-ui" style="font-size:12px;color:var(--text-muted);">${filtered.length} specs</span>
              <div class="seg-group">
                <button type="button" data-cat-preview-mode="dark" class="seg-btn ${state.catalogCardMode === "dark" ? "is-active" : ""}">Dark</button>
                <button type="button" data-cat-preview-mode="light" class="seg-btn ${state.catalogCardMode === "light" ? "is-active" : ""}">Light</button>
              </div>
            </div>
          </div>

          <!-- 4-Column 3:4 Portrait Grid -->
          ${
            filtered.length === 0
              ? `<div style="padding:64px 24px;text-align:center;">
                  <div style="font-size:15px;font-weight:600;">${t(lang, "emptyResult")}</div>
                  <button type="button" data-reset-catalog="1" class="btn-hairline" style="margin-top:14px;">${t(lang, "resetFilter")}</button>
                </div>`
              : `<div style="padding:28px 24px;" class="catalog-grid">
                  ${filtered
                    .map(
                      (item) => `
                    <button type="button" data-go="catalog-detail:${item.id}" class="catalog-card-btn" style="background:none;border:0;padding:0;text-align:left;cursor:pointer;display:flex;flex-direction:column;gap:10px;min-width:0;">
                      <div class="catalog-portrait">
                        ${renderBrandPortrait(item, state.catalogCardMode)}
                        <span class="badge-pill-pass" style="position:absolute;top:10px;left:10px;">${item.kind === "app" ? "APP SPEC" : "DESIGN.md"}</span>
                      </div>
                      <div style="padding-inline:2px;">
                        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
                          <span class="truncate-1" style="font-size:14.5px;font-weight:600;color:var(--text-primary);">${item.name}</span>
                          <span class="font-mono-ui" style="font-size:11.5px;color:var(--text-subtle);flex-shrink:0;">${item.category}</span>
                        </div>
                        <div class="clamp-2" style="margin-top:4px;font-size:12.5px;color:var(--text-muted);line-height:1.45;">
                          ${lang === "zh" ? item.summaryZh : item.summaryEn}
                        </div>
                      </div>
                    </button>`
                    )
                    .join("")}
                </div>`
          }
        </div>
      </div>
    </div>`;
}

function renderPaletteSpecPanel(item, modeLabel, p) {
  const swatches = [
    ["Canvas", p.canvas],
    ["Surface", p.surface],
    ["Elevated", p.elevated],
    ["Border", p.border],
    ["Primary Ink", p.ink],
    ["Muted Ink", p.muted],
    ["Accent", p.accent]
  ];

  return `
    <div style="border:1px solid var(--border-hairline);background:var(--bg-surface);min-width:0;">
      <div style="padding:12px 16px;border-bottom:1px solid var(--border-hairline);display:flex;justify-content:space-between;align-items:center;">
        <span class="eyebrow-mono" style="color:var(--text-primary);">${modeLabel} THEME SPEC</span>
        <span class="font-mono-ui" style="font-size:11.5px;color:var(--text-muted);">Click swatch to copy HEX</span>
      </div>

      <!-- 01 Color Palette -->
      <div style="padding:18px;border-bottom:1px solid var(--border-hairline);">
        <div class="eyebrow-mono">01 — COLOR PALETTE</div>
        <div style="margin-top:12px;display:grid;grid-template-columns:repeat(auto-fill,minmax(125px,1fr));gap:10px;">
          ${swatches
            .map(
              ([name, hex]) => `
            <button type="button" data-copy="${hex}" style="padding:8px;border:1px solid var(--border-hairline);background:var(--bg-code);text-align:left;cursor:pointer;">
              <div style="height:34px;background:${hex};border:1px solid var(--border-strong);"></div>
              <div style="margin-top:7px;font-size:11.5px;font-weight:600;color:var(--text-primary);">${name}</div>
              <div class="font-mono-ui" style="font-size:11px;color:var(--text-muted);">${hex}</div>
            </button>`
            )
            .join("")}
        </div>
      </div>

      <!-- 02 Live Surface Specimen in Authentic Brand Tokens -->
      <div style="padding:18px;background:${p.canvas};color:${p.ink};">
        <div class="font-mono-ui" style="font-size:10.5px;text-transform:uppercase;letter-spacing:0.08em;color:${p.muted};">02 — LIVE COMPONENT SURFACE (${modeLabel})</div>
        <div style="margin-top:12px;padding:18px;background:${p.surface};border:1px solid ${p.border};border-radius:${item.defaultRadius};display:grid;gap:14px;">
          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;">
            <div>
              <div style="font-family:${item.fonts.serif ? "var(--font-serif)" : "var(--font-sans)"};font-size:22px;font-weight:600;letter-spacing:${item.fonts.tracking};">
                ${item.name} Interface Specimen
              </div>
              <div style="margin-top:3px;font-size:13px;color:${p.muted};">
                ${item.fonts.display} · radius ${item.defaultRadius} · 1px border ${p.border}
              </div>
            </div>
            <div style="display:flex;gap:8px;">
              <span style="display:inline-flex;align-items:center;height:34px;padding:0 14px;background:${p.accent};color:${p.accentFg};border-radius:${item.defaultRadius};font-size:12.5px;font-weight:600;">${item.ctaLabel}</span>
              <span style="display:inline-flex;align-items:center;height:34px;padding:0 14px;background:${p.elevated};color:${p.ink};border:1px solid ${p.border};border-radius:${item.defaultRadius};font-size:12.5px;">Secondary</span>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;">
            ${[
              ["Latency P95", "12.4ms"],
              ["Token Coverage", "100%"],
              ["Contrast Ratio", "11.8:1"]
            ]
              .map(
                ([k, v]) => `
              <div style="padding:10px 12px;background:${p.canvas};border:1px solid ${p.border};border-radius:${item.defaultRadius};">
                <div style="font-size:11px;color:${p.muted};">${k}</div>
                <div class="font-mono-ui" style="margin-top:3px;font-size:17px;font-weight:700;">${v}</div>
              </div>`
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>`;
}

export function renderCatalogDetailView(state) {
  const lang = state.lang;
  const item = CATALOG_ITEMS.find((x) => x.id === state.param) || CATALOG_ITEMS[0];
  const cliCmd = `npx uifino@latest add design/${item.id}`;
  const rawMd = generateDesignMd(item);

  return `
    <div class="band-full">
      <div class="shell-wrap" style="display:grid;grid-template-columns:minmax(0,1fr);">
        <div style="display:grid;grid-template-columns:repeat(1,minmax(0,1fr));" class="catalog-detail-layout">
          <style>
            @media (min-width: 1024px) {
              .catalog-detail-layout { grid-template-columns: 232px minmax(0, 1fr) !important; }
            }
          </style>

          <!-- Left Contextual Catalog Rail (getdesign.md 248px sidebar feel) -->
          <aside class="wb-left-tree wb-sticky-col" style="padding:16px 10px;display:block;">
            <button type="button" data-go="catalog-index" class="tree-row font-mono-ui" style="font-size:11.5px;margin-bottom:10px;">
              <span>← ${lang === "zh" ? "全部图鉴" : "All Catalog"}</span>
            </button>

            <div class="eyebrow-mono" style="padding:6px 10px;">WEBSITES</div>
            ${CATALOG_ITEMS.filter((x) => x.kind === "website")
              .map(
                (w) => `
              <button type="button" data-go="catalog-detail:${w.id}" class="tree-row ${w.id === item.id ? "is-active" : ""}">
                <span class="truncate-1">${w.name}</span>
                <span style="width:8px;height:8px;background:${w.dark.accent};flex-shrink:0;"></span>
              </button>`
              )
              .join("")}

            <div class="eyebrow-mono" style="padding:14px 10px 6px;">MOBILE APPS</div>
            ${CATALOG_ITEMS.filter((x) => x.kind === "app")
              .map(
                (a) => `
              <button type="button" data-go="catalog-detail:${a.id}" class="tree-row ${a.id === item.id ? "is-active" : ""}">
                <span class="truncate-1">${a.name}</span>
                <span style="width:8px;height:8px;border-radius:999px;background:${a.dark.accent};flex-shrink:0;"></span>
              </button>`
              )
              .join("")}
          </aside>

          <!-- Main Brand Spec Content (exact getdesign.md/linear.app/design-md structure) -->
          <div style="min-width:0;">
            <!-- Intro Header -->
            <div style="padding:28px 28px 24px;border-bottom:1px solid var(--border-hairline);">
              <nav class="font-mono-ui" style="font-size:12px;color:var(--text-muted);display:flex;flex-wrap:wrap;gap:6px;align-items:center;">
                <button type="button" data-go="catalog-index" style="background:none;border:0;padding:0;color:inherit;cursor:pointer;">Catalog</button>
                <span>/</span>
                <span>${item.category}</span>
                <span>/</span>
                <span style="color:var(--text-primary);">${item.name} DESIGN.md</span>
              </nav>

              <div style="margin-top:10px;display:flex;flex-wrap:wrap;align-items:center;gap:12px;">
                <h1 class="font-mono-ui" style="margin:0;font-size:clamp(24px,2.6vw,32px);font-weight:600;letter-spacing:-0.02em;">
                  ${item.name} DESIGN.md
                </h1>
                <span class="badge-sharp">${item.platformLabel}</span>
              </div>

              <p style="margin:12px 0 0;max-width:820px;font-size:15.5px;color:var(--text-body);line-height:1.6;">
                ${lang === "zh" ? item.summaryZh : item.summaryEn}
              </p>
            </div>

            <!-- Usage & Actions Split (getdesign.md 56% / 44% grid) -->
            <div style="padding:24px 28px;border-bottom:1px solid var(--border-hairline);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:20px;align-items:start;">
              <div>
                <h2 class="heading-section" style="margin-bottom:12px;">Usage</h2>
                <div style="padding:18px;background:var(--bg-surface);border:1px solid var(--border-hairline);">
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:11px 14px;background:var(--bg-code);border:1px solid var(--border-hairline);font-family:var(--font-mono);font-size:13.5px;">
                    <span class="truncate-1">${cliCmd}</span>
                    <button type="button" data-copy="${cliCmd}" class="badge-sharp" style="cursor:pointer;color:var(--text-primary);">Copy</button>
                  </div>
                  <div style="margin-top:10px;font-size:13px;color:var(--text-muted);">
                    ${lang === "zh" ? "在项目根目录运行以生成 DESIGN.md，AI 助手写界面时会自动读取色彩、圆角与排版约束。" : "Drop DESIGN.md into your repository root so Claude Code and Cursor follow exact tokens."}
                  </div>
                </div>
              </div>

              <div style="display:grid;gap:8px;padding-top:32px;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                  <div style="height:44px;padding:0 14px;background:var(--bg-surface);border:1px solid var(--border-hairline);display:flex;align-items:center;justify-content:space-between;">
                    <span class="eyebrow-mono">INSTALLS</span>
                    <span class="font-mono-ui" style="font-size:14.5px;font-weight:700;color:var(--accent-text);">${item.installs}</span>
                  </div>
                  <div style="height:44px;padding:0 14px;background:var(--bg-surface);border:1px solid var(--border-hairline);display:flex;align-items:center;justify-content:space-between;">
                    <span class="eyebrow-mono">SAVED</span>
                    <span class="font-mono-ui" style="font-size:14.5px;font-weight:700;color:var(--accent-text);">${item.bookmarks}</span>
                  </div>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                  <button type="button" data-copy-design-md="${item.id}" class="btn-hairline" style="height:42px;">Copy DESIGN.md</button>
                  <button type="button" data-download-design-md="${item.id}" class="btn-hairline" style="height:42px;">Download .md</button>
                </div>

                <button type="button" data-apply-brand-workbench="${item.id}" class="btn-lime" style="height:44px;width:100%;">
                  ${lang === "zh" ? `在组件工作台中套用 ${item.name} 规范 →` : `Apply ${item.name} Skin in Component Workbench →`}
                </button>
              </div>
            </div>

            <!-- Breakdown & Protocol Viewer -->
            <div style="padding:24px 28px;display:grid;gap:20px;">
              <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;">
                <h2 class="heading-section">Preview &amp; Token Breakdown</h2>
                <div style="display:flex;flex-wrap:wrap;gap:8px;">
                  <div class="seg-group">
                    <button type="button" data-cdetail-tab="spec" class="seg-btn ${state.catalogDetailTab === "spec" ? "is-active" : ""}">Live Preview</button>
                    <button type="button" data-cdetail-tab="compare" class="seg-btn ${state.catalogDetailTab === "compare" ? "is-active" : ""}">Light vs Dark</button>
                    <button type="button" data-cdetail-tab="md" class="seg-btn ${state.catalogDetailTab === "md" ? "is-active" : ""}">DESIGN.md</button>
                  </div>

                  ${
                    state.catalogDetailTab === "spec"
                      ? `<div class="seg-group">
                          <button type="button" data-cdetail-mode="dark" class="seg-btn ${state.catalogDetailMode === "dark" ? "is-active" : ""}">Dark</button>
                          <button type="button" data-cdetail-mode="light" class="seg-btn ${state.catalogDetailMode === "light" ? "is-active" : ""}">Light</button>
                        </div>`
                      : ""
                  }
                </div>
              </div>

              ${
                state.catalogDetailTab === "md"
                  ? `<div style="border:1px solid var(--border-hairline);background:var(--bg-code);">
                      <div style="padding:10px 16px;border-bottom:1px solid var(--border-hairline);display:flex;justify-content:space-between;align-items:center;font-family:var(--font-mono);font-size:12px;">
                        <span>${item.slug}/DESIGN.md</span>
                        <button type="button" data-copy-design-md="${item.id}" class="badge-sharp" style="cursor:pointer;color:var(--text-primary);">Copy Protocol</button>
                      </div>
                      <pre class="code-scroll">${esc(rawMd)}</pre>
                    </div>`
                  : state.catalogDetailTab === "compare"
                    ? `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:16px;">
                        ${renderPaletteSpecPanel(item, "DARK", item.dark)}
                        ${renderPaletteSpecPanel(item, "LIGHT", item.light)}
                      </div>`
                    : renderPaletteSpecPanel(
                        item,
                        state.catalogDetailMode.toUpperCase(),
                        state.catalogDetailMode === "light" ? item.light : item.dark
                      )
              }

              <!-- Typography + Radius & Spacing Breakdown -->
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:16px;">
                <div style="border:1px solid var(--border-hairline);background:var(--bg-surface);padding:18px;">
                  <div class="eyebrow-mono">03 — TYPOGRAPHY SYSTEM</div>
                  <div style="margin-top:14px;display:grid;gap:12px;">
                    <div style="padding-bottom:12px;border-bottom:1px solid var(--border-hairline);">
                      <div class="font-mono-ui" style="font-size:11px;color:var(--text-subtle);">Display · ${item.fonts.display} · tracking ${item.fonts.tracking}</div>
                      <div style="margin-top:4px;font-family:${item.fonts.serif ? "var(--font-serif)" : "var(--font-sans)"};font-size:26px;font-weight:600;letter-spacing:${item.fonts.tracking};">
                        Crafted interface hierarchy
                      </div>
                    </div>
                    <div style="display:flex;justify-content:space-between;font-size:13px;">
                      <span style="color:var(--text-muted);">Body Font</span>
                      <span class="font-mono-ui">${item.fonts.body} (15px / 1.55)</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;font-size:13px;">
                      <span style="color:var(--text-muted);">Monospace</span>
                      <span class="font-mono-ui">${item.fonts.mono} (tabular-nums)</span>
                    </div>
                  </div>
                </div>

                <div style="border:1px solid var(--border-hairline);background:var(--bg-surface);padding:18px;">
                  <div class="eyebrow-mono">04 — RADIUS &amp; SPACING LADDER</div>
                  <div style="margin-top:14px;display:flex;flex-wrap:wrap;gap:8px;">
                    ${item.radiusScale
                      .map(
                        (r) => `
                      <div style="padding:8px 10px;border:1px solid ${r === item.defaultRadius ? "var(--accent-border)" : "var(--border-hairline)"};background:var(--bg-code);border-radius:${r};font-family:var(--font-mono);font-size:11px;">
                        ${r}
                      </div>`
                      )
                      .join("")}
                  </div>
                  <div style="margin-top:14px;display:grid;gap:5px;">
                    ${item.spacingScale
                      .slice(0, 6)
                      .map(
                        (px) => `
                      <div style="display:flex;align-items:center;gap:10px;font-family:var(--font-mono);font-size:11px;">
                        <span style="width:36px;color:var(--text-muted);">${px}px</span>
                        <span style="height:8px;width:${Math.min(100, px * 2.2)}%;max-width:220px;background:var(--accent-fill);opacity:0.8;"></span>
                      </div>`
                      )
                      .join("")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}
