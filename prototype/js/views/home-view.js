// View 1: Homepage — getdesign.md Split Striped Hero & Wireframe Bands + shadcn.io Lined Grids
import { CATALOG_ITEMS } from "../data/catalog-data.js";
import { ASSET_TYPES, COMPONENT_CATEGORIES } from "../data/components-data.js";
import { t } from "../i18n.js";
import { renderBrandPortrait, renderCategoryMiniStack } from "./preview-stage.js";

function renderWorkflowStage(step, lang) {
  if (step === 1) {
    return `
      <div style="display:grid;gap:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;font-family:var(--font-mono);font-size:11px;color:var(--text-muted);">
          <span>linear.app / DESIGN.md</span>
          <span style="color:var(--accent-text);">42 TOKENS</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;">
          ${[
            ["#08090A", "Canvas"],
            ["#121316", "Surface"],
            ["#23252A", "Hairline"],
            ["#F7F8F8", "Ink"],
            ["#5E6AD2", "Accent"]
          ]
            .map(
              ([hex, lbl]) => `
            <div style="border:1px solid var(--border-hairline);background:var(--bg-code);padding:6px;">
              <div style="height:24px;background:${hex};border:1px solid var(--border-strong);"></div>
              <div class="font-mono-ui" style="margin-top:5px;font-size:9.5px;">${hex}</div>
              <div style="font-size:9px;color:var(--text-subtle);">${lbl}</div>
            </div>`
            )
            .join("")}
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 10px;background:var(--bg-code);border:1px solid var(--border-hairline);font-family:var(--font-mono);font-size:11px;">
          <span>Geist / Geist Mono · radius 6px</span>
          <button type="button" data-go="catalog-detail:linear" style="background:none;border:0;padding:0;color:var(--accent-text);cursor:pointer;font-family:inherit;font-size:inherit;">${lang === "zh" ? "查看拆解 →" : "Open spec →"}</button>
        </div>
      </div>`;
  }
  if (step === 2) {
    return `
      <div style="display:grid;gap:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;font-family:var(--font-mono);font-size:11px;color:var(--text-muted);">
          <span>hero-telemetry-counter</span>
          <span style="color:var(--accent-text);">React · Vue · Svelte · Solid</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div style="padding:10px;background:var(--bg-code);border:1px solid var(--border-hairline);">
            <div class="eyebrow-mono">RADIUS</div>
            <div class="font-mono-ui" style="margin-top:4px;font-size:13px;">0px · 4px · <span style="color:var(--accent-text);font-weight:700;">[6px]</span> · 12px</div>
          </div>
          <div style="padding:10px;background:var(--bg-code);border:1px solid var(--border-hairline);">
            <div class="eyebrow-mono">DENSITY</div>
            <div class="font-mono-ui" style="margin-top:4px;font-size:13px;">Compact · <span style="color:var(--accent-text);font-weight:700;">[Default]</span> · Spacious</div>
          </div>
        </div>
        <button type="button" data-go="components-detail:hero/hero-telemetry-counter" class="btn-hairline" style="width:100%;justify-content:space-between;font-family:var(--font-mono);font-size:11.5px;">
          <span>${lang === "zh" ? "在三栏工作台中实时试调" : "Open in 3-Column Workbench"}</span>
          <span style="color:var(--accent-text);">→</span>
        </button>
      </div>`;
  }
  if (step === 3) {
    return `
      <pre class="code-scroll" style="border:1px solid var(--border-hairline);padding:12px;font-size:11.5px;">---
protocol: uifino/design-md@1.0
skin: "Linear (#08090A / #5E6AD2)"
assets: ["section/hero-telemetry-counter", "block/auth-passkey-card"]
guardrails:
  - "1px solid #23252A structural borders; zero arbitrary neon gradients"
  - "tabular-nums on all metrics; collapse 4-col strip below 640px"
---</pre>`;
  }
  return `
    <div style="display:grid;gap:8px;font-family:var(--font-mono);font-size:11.5px;">
      <div style="padding:9px 12px;background:var(--bg-code);border:1px solid var(--border-hairline);color:var(--text-body);">
        <span style="color:var(--accent-text);">Prompt ▸</span> Build a dark SaaS telemetry hero &amp; passkey login matching Linear DESIGN.md in Vue 3.
      </div>
      <div style="padding:9px 12px;background:var(--bg-code);border:1px solid var(--accent-border);color:var(--text-primary);display:flex;justify-content:space-between;align-items:center;">
        <span>✓ MCP matched linear.app + 2 tuned Vue SFCs (14ms)</span>
        <button type="button" data-go="mcp" style="background:none;border:0;color:var(--accent-text);cursor:pointer;font-family:inherit;">MCP →</button>
      </div>
    </div>`;
}

export function renderHomeView(state) {
  const lang = state.lang;
  const featuredCatalog = CATALOG_ITEMS.filter((x) =>
    state.homeCatalogKind === "all" ? true : x.kind === state.homeCatalogKind
  ).slice(0, 4);

  const filteredCats = COMPONENT_CATEGORIES.filter((c) =>
    state.homeAssetType === "all" ? true : c.assetType === state.homeAssetType
  ).slice(0, 8);

  return `
    <div>
      <!-- 1. Split Architectural Hero (getdesign.md layout & vertical hairline stripes) -->
      <div class="band-full">
        <section class="shell-wrap" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));">
          <div class="hero-stripes" style="padding:40px 28px 44px;border-right:1px solid var(--border-hairline);display:flex;flex-direction:column;justify-content:space-between;gap:24px;">
            <div>
              <span class="ribbon-tag">${t(lang, "heroRibbon")}</span>
              <h1 class="heading-hero" style="margin-top:18px;">${t(lang, "heroTitle")}</h1>
              <p style="margin:14px 0 0;max-width:540px;font-size:15px;color:var(--text-muted);line-height:1.6;">
                ${t(lang, "heroDesc")}
              </p>
              <div style="margin-top:22px;display:flex;flex-wrap:wrap;gap:10px;">
                <button type="button" data-go="catalog-index" class="btn-contrast">${t(lang, "heroPrimaryCta")} →</button>
                <button type="button" data-go="components-index" class="btn-hairline">${t(lang, "heroSecondaryCta")}</button>
              </div>
              <div style="margin-top:14px;display:flex;align-items:center;justify-content:space-between;gap:10px;max-width:460px;padding:9px 12px;background:var(--bg-code);border:1px solid var(--border-hairline);font-family:var(--font-mono);font-size:12.5px;">
                <span class="truncate-1"><span style="color:var(--accent-text);">$</span> npx uifino@latest add design/linear</span>
                <button type="button" data-copy="npx uifino@latest add design/linear" class="badge-sharp" style="cursor:pointer;color:var(--text-primary);">Copy</button>
              </div>
            </div>

            <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;padding-top:16px;border-top:1px solid var(--border-hairline);font-family:var(--font-mono);font-size:11.5px;color:var(--text-subtle);">
              <span>AGENTS:</span>
              <span style="color:var(--text-body);">Claude Code</span>
              <span>·</span>
              <span style="color:var(--text-body);">Cursor</span>
              <span>·</span>
              <span style="color:var(--text-body);">Codex</span>
              <span>·</span>
              <span style="color:var(--text-body);">Windsurf</span>
            </div>
          </div>

          <div style="padding:0 28px 36px;background:var(--bg-canvas);display:flex;flex-direction:column;justify-content:space-between;gap:18px;">
            <div>
              <span class="ribbon-tag">${t(lang, "workflowRibbon")}</span>
              <!-- 4-segment interactive rail (inspired by getdesign.md hero progress rail) -->
              <div style="margin-top:18px;display:grid;grid-template-columns:repeat(4,1fr);gap:6px;">
                ${[
                  [1, t(lang, "wf1")],
                  [2, t(lang, "wf2")],
                  [3, t(lang, "wf3")],
                  [4, t(lang, "wf4")]
                ]
                  .map(
                    ([num, label]) => `
                  <button type="button" data-wf-step="${num}" style="padding:0;border:0;background:transparent;text-align:left;cursor:pointer;">
                    <div style="height:3px;background:${state.heroStep === num ? "var(--accent-fill)" : "var(--gray-300)"};transition:background-color 150ms ease;"></div>
                    <div class="font-mono-ui truncate-1" style="margin-top:7px;font-size:11px;font-weight:${state.heroStep === num ? "700" : "500"};color:${state.heroStep === num ? "var(--text-primary)" : "var(--text-subtle)"};">${label}</div>
                  </button>`
                  )
                  .join("")}
              </div>

              <div style="margin-top:16px;padding:16px;background:var(--bg-surface);border:1px solid var(--border-hairline);">
                ${renderWorkflowStage(state.heroStep, lang)}
              </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--border-hairline);background:var(--bg-surface);">
              ${[
                ["12", lang === "zh" ? "标杆图鉴" : "Specs"],
                ["16", lang === "zh" ? "组件品类" : "Categories"],
                ["4", lang === "zh" ? "前端框架" : "Frameworks"],
                ["2", lang === "zh" ? "参数实验室" : "Studios"]
              ]
                .map(
                  ([n, l], i) => `
                <div style="padding:10px 12px;border-right:${i < 3 ? "1px solid var(--border-hairline)" : "0"};">
                  <div class="font-mono-ui" style="font-size:17px;font-weight:700;color:var(--accent-text);">${n}</div>
                  <div style="font-size:11px;color:var(--text-muted);">${l}</div>
                </div>`
                )
                .join("")}
            </div>
          </div>
        </section>
      </div>

      <div class="wireframe-spacer"><div class="wireframe-spacer-inner"></div></div>

      <!-- 2. Website & App Catalog Showcase -->
      <div class="band-full">
        <section class="shell-wrap">
          <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding:18px 24px;border-bottom:1px solid var(--border-hairline);">
            <div style="display:flex;flex-wrap:wrap;align-items:center;gap:14px;">
              <h2 class="heading-section">${t(lang, "homeCatalogTitle")}</h2>
              <div class="seg-group">
                <button type="button" data-home-cat-kind="all" class="seg-btn ${state.homeCatalogKind === "all" ? "is-active" : ""}">All</button>
                <button type="button" data-home-cat-kind="website" class="seg-btn ${state.homeCatalogKind === "website" ? "is-active" : ""}">Websites</button>
                <button type="button" data-home-cat-kind="app" class="seg-btn ${state.homeCatalogKind === "app" ? "is-active" : ""}">Mobile Apps</button>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;">
              <div class="seg-group">
                <button type="button" data-cat-preview-mode="dark" class="seg-btn ${state.catalogCardMode === "dark" ? "is-active" : ""}">Dark</button>
                <button type="button" data-cat-preview-mode="light" class="seg-btn ${state.catalogCardMode === "light" ? "is-active" : ""}">Light</button>
              </div>
              <button type="button" data-go="catalog-index" class="btn-hairline">${t(lang, "homeCatalogAll")}</button>
            </div>
          </div>

          <div style="padding:24px;" class="catalog-grid">
            ${featuredCatalog
              .map(
                (item) => `
              <button type="button" data-go="catalog-detail:${item.id}" class="catalog-card-btn" style="background:none;border:0;padding:0;text-align:left;cursor:pointer;display:flex;flex-direction:column;gap:10px;min-width:0;">
                <div class="catalog-portrait">
                  ${renderBrandPortrait(item, state.catalogCardMode)}
                  <span class="badge-pill-pass" style="position:absolute;top:10px;left:10px;">DESIGN.md</span>
                </div>
                <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding-inline:2px;">
                  <span class="truncate-1" style="font-size:14px;font-weight:600;color:var(--text-primary);">${item.name}</span>
                  <span class="font-mono-ui" style="font-size:11.5px;color:var(--text-subtle);flex-shrink:0;">${item.platformLabel}</span>
                </div>
              </button>`
              )
              .join("")}
          </div>
        </section>
      </div>

      <div class="wireframe-spacer"><div class="wireframe-spacer-inner"></div></div>

      <!-- 3. Progressive Components & Motion Categories (shadcn.io 4-column lined-grid) -->
      <div class="band-full">
        <section class="shell-wrap">
          <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding:18px 24px;border-bottom:1px solid var(--border-hairline);">
            <div style="display:flex;flex-wrap:wrap;align-items:center;gap:14px;">
              <h2 class="heading-section">${t(lang, "homeLibTitle")}</h2>
              <div class="seg-group" style="flex-wrap:wrap;">
                ${ASSET_TYPES.map(
                  (tp) => `
                  <button type="button" data-home-asset-type="${tp.id}" class="seg-btn ${state.homeAssetType === tp.id ? "is-active" : ""}">
                    ${lang === "zh" ? tp.labelZh : tp.labelEn}
                  </button>`
                ).join("")}
              </div>
            </div>
            <button type="button" data-go="components-index" class="btn-hairline">${t(lang, "homeLibAll")}</button>
          </div>

          <div class="lined-grid-4">
            ${filteredCats
              .map(
                (cat) => `
              <div class="lined-cell">
                <button type="button" data-go="components-cat:${cat.id}" class="cat-card-btn" style="background:transparent;">
                  <div style="width:100%;">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
                      <span class="truncate-1" style="font-size:14px;font-weight:600;color:var(--text-primary);">${lang === "zh" ? cat.nameZh : cat.name}</span>
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
          </div>
        </section>
      </div>

      <div class="wireframe-spacer"><div class="wireframe-spacer-inner"></div></div>

      <!-- 4. Tools & MCP 3-Column Strip (getdesign.md GO FURTHER divided strip) -->
      <div class="band-full">
        <section class="shell-wrap">
          <div style="padding:10px 24px;border-bottom:1px solid var(--border-hairline);" class="eyebrow-mono">
            TOOLS &amp; AI INTEGRATION
          </div>
          <div class="lined-grid-3">
            ${[
              {
                go: "tools:background",
                tag: "STUDIO 01",
                title: lang === "zh" ? "参数化背景生成器" : "Background Generator",
                desc: lang === "zh" ? "精密网格、点阵、极光渐变与颗粒噪点，一键导出 CSS / Tailwind。" : "Grid, dot matrix, aurora mesh & film grain with instant CSS or Tailwind export."
              },
              {
                go: "tools:shadow",
                tag: "STUDIO 02",
                title: lang === "zh" ? "阴影与表面令牌实验室" : "Shadow & Token Lab",
                desc: lang === "zh" ? "调节多层环境阴影、顶部 1px 内高光与圆角密度并预览真实控件。" : "Tune multi-layer elevation, 1px top rim highlights, and surface tokens live."
              },
              {
                go: "mcp",
                tag: "MCP SERVER",
                title: lang === "zh" ? "MCP 智能检索与复刻" : "MCP Agent Retrieval",
                desc: lang === "zh" ? "让 Claude Code 与 Cursor 自动拉取 DESIGN.md 协议及对应框架源码。" : "Equip Claude Code & Cursor to query DESIGN.md protocols and framework code."
              }
            ]
              .map(
                (card) => `
              <div class="lined-cell">
                <button type="button" data-go="${card.go}" style="width:100%;height:100%;padding:22px 24px;background:transparent;border:0;text-align:left;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;gap:16px;">
                  <div>
                    <div class="eyebrow-mono" style="color:var(--accent-text);">${card.tag}</div>
                    <div style="margin-top:6px;font-size:16px;font-weight:600;color:var(--text-primary);">${card.title}</div>
                    <p style="margin:6px 0 0;font-size:13px;color:var(--text-muted);line-height:1.55;">${card.desc}</p>
                  </div>
                  <div style="display:flex;align-items:center;justify-content:space-between;font-family:var(--font-mono);font-size:11.5px;color:var(--text-primary);">
                    <span>${lang === "zh" ? "立即进入" : "Open"}</span>
                    <span style="width:28px;height:28px;border:1px solid var(--border-hairline);background:var(--gray-100);display:inline-flex;align-items:center;justify-content:center;">→</span>
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
