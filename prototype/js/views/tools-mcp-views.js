// View 7 & View 8: Parameterized Frontend Tools (Background Generator + Shadow & Token Lab) & MCP AI Integration
import { generateBackgroundOutput, generateShadowOutput, queryMcpAssets } from "../core/generators.js";
import { BG_PRESETS, MCP_CAPABILITIES, MCP_CLIENTS, SHADOW_PRESETS } from "../data/tools-mcp-data.js";
import { t } from "../i18n.js";
import { renderPageBanner } from "./page-banner.js";

function esc(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderToolsView(state) {
  const lang = state.lang;
  const activeStudio = state.toolStudio || "background";

  const bgResult = generateBackgroundOutput(state.bgParams, state.toolCodeFormat);
  const shResult = generateShadowOutput(state.shadowParams, state.toolCodeFormat);

  return `
    <div>
      ${renderPageBanner({
        breadcrumbs: [{ label: "Home", go: "home" }, { label: t(lang, "navTools") }],
        title: lang === "zh" ? "参数化背景与表面令牌工具" : "Parameterized surface & token studios.",
        description:
          lang === "zh"
            ? "可视化微调网格、点阵、极光与颗粒背景及多层内高光阴影，实时导出 CSS 或 Tailwind 代码。"
            : "Fine-tune grid, aurora, and grain backgrounds alongside layered rim-lit shadows with live CSS & Tailwind output."
      })}

      <div class="band-full">
        <section class="shell-wrap">
          <!-- Unified Content Toolbar (Switcher moved OUT of banner into toolbar!) -->
          <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding:12px 20px;border-bottom:1px solid var(--border-hairline);background:var(--bg-surface);">
            <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;">
              <div class="seg-group">
                <button type="button" data-tool-studio="background" class="seg-btn ${activeStudio === "background" ? "is-active" : ""}">
                  01 · ${lang === "zh" ? "背景生成器" : "Background Studio"}
                </button>
                <button type="button" data-tool-studio="shadow" class="seg-btn ${activeStudio === "shadow" ? "is-active" : ""}">
                  02 · ${lang === "zh" ? "阴影与表面令牌" : "Shadow & Token Lab"}
                </button>
              </div>
            </div>

            <div style="display:flex;align-items:center;gap:10px;">
              <div class="seg-group">
                <button type="button" data-tool-fmt="css" class="seg-btn ${state.toolCodeFormat === "css" ? "is-active" : ""}">CSS</button>
                <button type="button" data-tool-fmt="tailwind" class="seg-btn ${state.toolCodeFormat === "tailwind" ? "is-active" : ""}">Tailwind</button>
              </div>
              <button type="button" data-copy-tool-code="${activeStudio === "shadow" ? "shadow" : "bg"}" class="btn-contrast" style="height:30px;padding:0 12px;font-size:12px;">
                Copy ${state.toolCodeFormat === "tailwind" ? "Tailwind" : "CSS"}
              </button>
            </div>
          </div>

          <div style="padding:24px 28px;">
          ${
            activeStudio === "background"
              ? `
            <!-- BACKGROUND GENERATOR WORKBENCH -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:20px;align-items:start;">
              <!-- Left: Live Canvas + Presets + Code Output -->
              <div style="display:grid;gap:16px;min-width:0;">
                <div style="border:1px solid var(--border-hairline);background:var(--bg-surface);">
                  <div style="padding:10px 14px;border-bottom:1px solid var(--border-hairline);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;">
                    <div class="seg-group">
                      ${[
                        ["grid", "Grid"],
                        ["dots", "Dot Matrix"],
                        ["aurora", "Aurora"],
                        ["grain", "Film Grain"]
                      ]
                        .map(
                          ([eng, lbl]) => `
                        <button type="button" data-bg-engine="${eng}" class="seg-btn ${state.bgParams.engine === eng ? "is-active" : ""}">${lbl}</button>`
                        )
                        .join("")}
                    </div>
                    <label style="display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--text-muted);cursor:pointer;">
                      <input id="bg-sample-toggle" type="checkbox" ${state.bgShowSample ? "checked" : ""} />
                      <span>${lang === "zh" ? "叠加示例内容" : "Sample hero overlay"}</span>
                    </label>
                  </div>

                  <div id="bg-live-stage" style="height:300px;${bgResult.inlineStyle}display:flex;align-items:center;justify-content:center;padding:24px;position:relative;overflow:hidden;">
                    ${
                      state.bgShowSample
                        ? `<div style="text-align:center;max-width:420px;padding:20px 24px;background:rgba(17,17,19,0.72);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,0.16);color:#f4f4f6;">
                            <div class="font-mono-ui" style="font-size:10px;letter-spacing:0.1em;color:#ceff00;">LIVE SURFACE</div>
                            <div style="margin-top:6px;font-size:22px;font-weight:700;letter-spacing:-0.025em;">Engineered background layer</div>
                            <div style="margin-top:12px;display:inline-flex;padding:6px 14px;background:#ffffff;color:#000000;font-size:12px;font-weight:600;">Copy Snippet</div>
                          </div>`
                        : ""
                    }
                  </div>
                </div>

                <!-- Presets -->
                <div style="border:1px solid var(--border-hairline);background:var(--bg-surface);padding:14px;">
                  <div class="eyebrow-mono" style="margin-bottom:10px;">CURATED PRESETS</div>
                  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(145px,1fr));gap:8px;">
                    ${BG_PRESETS.map(
                      (pr) => `
                      <button type="button" data-bg-preset="${pr.id}" class="btn-hairline" style="justify-content:flex-start;gap:8px;height:34px;">
                        <span style="width:10px;height:10px;background:${pr.accent};border:1px solid var(--border-strong);flex-shrink:0;"></span>
                        <span class="truncate-1">${pr.name}</span>
                      </button>`
                    ).join("")}
                  </div>
                </div>

                <!-- CSS / Tailwind Output -->
                <div style="border:1px solid var(--border-hairline);background:var(--bg-code);min-width:0;">
                  <div style="padding:8px 14px;border-bottom:1px solid var(--border-hairline);display:flex;align-items:center;justify-content:space-between;">
                    <div class="seg-group">
                      <button type="button" data-tool-fmt="css" class="seg-btn ${state.toolCodeFormat === "css" ? "is-active" : ""}">CSS</button>
                      <button type="button" data-tool-fmt="tailwind" class="seg-btn ${state.toolCodeFormat === "tailwind" ? "is-active" : ""}">Tailwind</button>
                    </div>
                    <button type="button" data-copy-tool-code="bg" class="btn-contrast" style="height:28px;padding:0 12px;font-size:11.5px;">
                      Copy ${state.toolCodeFormat === "tailwind" ? "Tailwind" : "CSS"}
                    </button>
                  </div>
                  <pre class="code-scroll">${esc(bgResult.code)}</pre>
                </div>
              </div>

              <!-- Right: Parameter Sliders & Color Controls -->
              <div style="border:1px solid var(--border-hairline);background:var(--bg-surface);padding:20px;display:grid;gap:16px;">
                <div class="eyebrow-mono" style="color:var(--accent-text);">PARAMETERS</div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                  <label style="display:grid;gap:6px;font-size:12px;">
                    <span style="color:var(--text-muted);">Base Canvas</span>
                    <div style="display:flex;align-items:center;gap:8px;padding:4px 8px;border:1px solid var(--border-hairline);background:var(--bg-code);">
                      <input id="bg-canvas-inp" type="color" value="${state.bgParams.canvas}" style="width:24px;height:24px;border:0;padding:0;background:none;cursor:pointer;" />
                      <span class="font-mono-ui">${state.bgParams.canvas}</span>
                    </div>
                  </label>
                  <label style="display:grid;gap:6px;font-size:12px;">
                    <span style="color:var(--text-muted);">Primary Accent</span>
                    <div style="display:flex;align-items:center;gap:8px;padding:4px 8px;border:1px solid var(--border-hairline);background:var(--bg-code);">
                      <input id="bg-accent-inp" type="color" value="${state.bgParams.accent}" style="width:24px;height:24px;border:0;padding:0;background:none;cursor:pointer;" />
                      <span class="font-mono-ui">${state.bgParams.accent}</span>
                    </div>
                  </label>
                </div>

                <label style="display:grid;gap:6px;font-size:12.5px;">
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:var(--text-muted);">Pattern Pitch / Scale</span>
                    <span class="font-mono-ui">${state.bgParams.cellSize}px</span>
                  </div>
                  <input id="bg-cell-inp" type="range" min="12" max="80" step="2" value="${state.bgParams.cellSize}" />
                </label>

                <label style="display:grid;gap:6px;font-size:12.5px;">
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:var(--text-muted);">Stroke / Glow Intensity</span>
                    <span class="font-mono-ui">${state.bgParams.opacity}%</span>
                  </div>
                  <input id="bg-op-inp" type="range" min="4" max="75" step="1" value="${state.bgParams.opacity}" />
                </label>

                <label style="display:grid;gap:6px;font-size:12.5px;">
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:var(--text-muted);">Radial Mask Spread</span>
                    <span class="font-mono-ui">${state.bgParams.spread}%</span>
                  </div>
                  <input id="bg-spread-inp" type="range" min="25" max="95" step="1" value="${state.bgParams.spread}" />
                </label>

                <label style="display:grid;gap:6px;font-size:12.5px;">
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:var(--text-muted);">Grain Density</span>
                    <span class="font-mono-ui">${state.bgParams.noise}%</span>
                  </div>
                  <input id="bg-noise-inp" type="range" min="0" max="60" step="2" value="${state.bgParams.noise}" />
                </label>
              </div>
            </div>`
              : `
            <!-- SHADOW & SURFACE TOKEN LAB -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:20px;align-items:start;">
              <div style="display:grid;gap:16px;min-width:0;">
                <div style="border:1px solid var(--border-hairline);">
                  <div style="padding:10px 14px;border-bottom:1px solid var(--border-hairline);background:var(--bg-surface);display:flex;justify-content:space-between;align-items:center;">
                    <span class="eyebrow-mono">ELEVATION SPECIMEN</span>
                    <div class="seg-group">
                      <button type="button" data-sh-mode="dark" class="seg-btn ${state.shadowParams.mode === "dark" ? "is-active" : ""}">Dark Canvas</button>
                      <button type="button" data-sh-mode="light" class="seg-btn ${state.shadowParams.mode === "light" ? "is-active" : ""}">Light Canvas</button>
                    </div>
                  </div>

                  <div id="shadow-live-stage" style="height:300px;background:${shResult.canvasBg};display:flex;align-items:center;justify-content:center;padding:28px;">
                    <div style="width:100%;max-width:380px;background:${shResult.surfaceBg};color:${shResult.ink};border:1px solid ${shResult.borderCol};border-radius:${shResult.radius}px;box-shadow:${shResult.boxShadow};padding:22px;display:grid;gap:12px;">
                      <div style="display:flex;justify-content:space-between;align-items:center;">
                        <span style="font-size:14.5px;font-weight:600;">Production API Key</span>
                        <span class="font-mono-ui" style="font-size:11px;color:${shResult.muted};">${shResult.radius}px radius</span>
                      </div>
                      <div style="padding:8px 10px;border:1px solid ${shResult.borderCol};border-radius:${Math.max(0, shResult.radius - 2)}px;font-family:var(--font-mono);font-size:12px;color:${shResult.muted};">
                        uif_live_98a7c4e10b2d...
                      </div>
                      <div style="display:flex;justify-content:flex-end;gap:8px;">
                        <span style="padding:6px 12px;border:1px solid ${shResult.borderCol};border-radius:${Math.max(0, shResult.radius - 2)}px;font-size:12px;">Rotate</span>
                        <span style="padding:6px 12px;background:${shResult.ink};color:${shResult.surfaceBg};border-radius:${Math.max(0, shResult.radius - 2)}px;font-size:12px;font-weight:600;">Save Token</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Presets -->
                <div style="border:1px solid var(--border-hairline);background:var(--bg-surface);padding:14px;">
                  <div class="eyebrow-mono" style="margin-bottom:10px;">ELEVATION PRESETS</div>
                  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px;">
                    ${SHADOW_PRESETS.map(
                      (sp) => `
                      <button type="button" data-sh-preset="${sp.id}" class="btn-hairline" style="justify-content:flex-start;height:34px;">
                        <span class="truncate-1">${sp.name}</span>
                      </button>`
                    ).join("")}
                  </div>
                </div>

                <!-- Code Output -->
                <div style="border:1px solid var(--border-hairline);background:var(--bg-code);min-width:0;">
                  <div style="padding:8px 14px;border-bottom:1px solid var(--border-hairline);display:flex;align-items:center;justify-content:space-between;">
                    <div class="seg-group">
                      <button type="button" data-tool-fmt="css" class="seg-btn ${state.toolCodeFormat === "css" ? "is-active" : ""}">CSS Tokens</button>
                      <button type="button" data-tool-fmt="tailwind" class="seg-btn ${state.toolCodeFormat === "tailwind" ? "is-active" : ""}">Tailwind</button>
                    </div>
                    <button type="button" data-copy-tool-code="shadow" class="btn-contrast" style="height:28px;padding:0 12px;font-size:11.5px;">
                      Copy ${state.toolCodeFormat === "tailwind" ? "Tailwind" : "CSS"}
                    </button>
                  </div>
                  <pre class="code-scroll">${esc(shResult.code)}</pre>
                </div>
              </div>

              <!-- Right: Shadow & Rim Sliders -->
              <div style="border:1px solid var(--border-hairline);background:var(--bg-surface);padding:20px;display:grid;gap:16px;">
                <div class="eyebrow-mono" style="color:var(--accent-text);">SHADOW &amp; SURFACE TOKENS</div>

                <label style="display:grid;gap:6px;font-size:12.5px;">
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:var(--text-muted);">Vertical Offset (Y)</span>
                    <span class="font-mono-ui">${state.shadowParams.yOffset}px</span>
                  </div>
                  <input id="sh-y-inp" type="range" min="0" max="40" value="${state.shadowParams.yOffset}" />
                </label>

                <label style="display:grid;gap:6px;font-size:12.5px;">
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:var(--text-muted);">Ambient Blur</span>
                    <span class="font-mono-ui">${state.shadowParams.blur}px</span>
                  </div>
                  <input id="sh-blur-inp" type="range" min="0" max="80" value="${state.shadowParams.blur}" />
                </label>

                <label style="display:grid;gap:6px;font-size:12.5px;">
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:var(--text-muted);">Shadow Opacity</span>
                    <span class="font-mono-ui">${state.shadowParams.opacity}%</span>
                  </div>
                  <input id="sh-op-inp" type="range" min="0" max="85" value="${state.shadowParams.opacity}" />
                </label>

                <label style="display:grid;gap:6px;font-size:12.5px;">
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:var(--text-muted);">Top 1px Inner Rim Highlight</span>
                    <span class="font-mono-ui">${state.shadowParams.rimLight}%</span>
                  </div>
                  <input id="sh-rim-inp" type="range" min="0" max="30" value="${state.shadowParams.rimLight}" />
                </label>

                <label style="display:grid;gap:6px;font-size:12.5px;">
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:var(--text-muted);">Hairline Border Alpha</span>
                    <span class="font-mono-ui">${state.shadowParams.borderAlpha}%</span>
                  </div>
                  <input id="sh-border-inp" type="range" min="4" max="40" value="${state.shadowParams.borderAlpha}" />
                </label>

                <label style="display:grid;gap:6px;font-size:12.5px;">
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:var(--text-muted);">Surface Radius</span>
                    <span class="font-mono-ui">${state.shadowParams.radius}px</span>
                  </div>
                  <input id="sh-rad-inp" type="range" min="0" max="20" step="2" value="${state.shadowParams.radius}" />
                </label>
              </div>
            </div>`
          }
          </div>
        </section>
      </div>
    </div>`;
}

export function renderMcpView(state) {
  const lang = state.lang;
  const activeClient = MCP_CLIENTS.find((c) => c.id === state.mcpClient) || MCP_CLIENTS[0];
  const sim = queryMcpAssets({
    query: state.mcpQuery,
    style: state.mcpStyle,
    layout: state.mcpLayout,
    assetType: state.mcpAssetType
  });

  return `
    <div>
      ${renderPageBanner({
        breadcrumbs: [{ label: "Home", go: "home" }, { label: t(lang, "navMcp") }],
        title: lang === "zh" ? "将设计图鉴与组件库接入 AI 编程助手" : "Connect AI coding agents to real design protocols.",
        description:
          lang === "zh"
            ? "配置标准 MCP 服务后，可在 Claude Code、Cursor 与 Windsurf 中按提示词自动拉取 DESIGN.md 与组件代码。"
            : "Query Website/App DESIGN.md files, tuned component source, and surface tokens directly inside your editor."
      })}

      <!-- 1. Unified Client Toolbar + Config & Exposed MCP Tools -->
      <div class="band-full">
        <section class="shell-wrap">
          <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding:12px 20px;border-bottom:1px solid var(--border-hairline);background:var(--bg-surface);">
            <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;">
              <div class="seg-group">
                ${MCP_CLIENTS.map(
                  (cl) => `
                  <button type="button" data-mcp-client="${cl.id}" class="seg-btn ${activeClient.id === cl.id ? "is-active" : ""}">${cl.name}</button>`
                ).join("")}
              </div>
              <span class="font-mono-ui" style="font-size:12px;color:var(--text-subtle);">${activeClient.file}</span>
            </div>

            <div style="display:flex;align-items:center;gap:10px;">
              <span class="font-mono-ui" style="font-size:12px;color:var(--text-muted);">4 MCP tools</span>
              <button type="button" data-copy-mcp-client="${activeClient.id}" class="btn-contrast" style="height:30px;padding:0 12px;font-size:12px;">
                Copy ${activeClient.name} Config
              </button>
            </div>
          </div>

          <div style="padding:24px 28px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:20px;">
          <div style="border:1px solid var(--border-hairline);background:var(--bg-surface);display:flex;flex-direction:column;justify-content:space-between;min-width:0;">
            <div>
              <div style="padding:10px 14px;border-bottom:1px solid var(--border-hairline);display:flex;align-items:center;justify-content:space-between;gap:8px;">
                <span class="eyebrow-mono">${activeClient.name.toUpperCase()} SETUP</span>
                <span class="font-mono-ui" style="font-size:11px;color:var(--text-subtle);">${activeClient.file}</span>
              </div>
              <pre class="code-scroll">${esc(activeClient.snippet)}</pre>
            </div>
            <div style="padding:10px 14px;border-top:1px solid var(--border-hairline);display:flex;justify-content:flex-end;">
              <button type="button" data-copy-mcp-client="${activeClient.id}" class="btn-hairline" style="height:30px;padding:0 12px;font-size:12px;">
                Copy Snippet
              </button>
            </div>
          </div>

          <div style="border:1px solid var(--border-hairline);background:var(--bg-surface);min-width:0;">
            <div style="padding:12px 16px;border-bottom:1px solid var(--border-hairline);" class="eyebrow-mono">
              EXPOSED MCP TOOLS (4)
            </div>
            <div>
              ${MCP_CAPABILITIES.map(
                (cap, idx) => `
                <div style="padding:12px 16px;border-bottom:${idx < MCP_CAPABILITIES.length - 1 ? "1px solid var(--border-hairline)" : "0"};">
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <span class="font-mono-ui" style="font-size:13px;font-weight:600;color:var(--accent-text);">${cap.tool}()</span>
                    <span class="badge-sharp">${cap.scope}</span>
                  </div>
                  <div style="margin-top:4px;font-size:12.5px;color:var(--text-muted);">${lang === "zh" ? cap.descZh : cap.descEn}</div>
                </div>`
              ).join("")}
            </div>
          </div>
          </div>
        </section>
      </div>

      <div class="wireframe-spacer"><div class="wireframe-spacer-inner"></div></div>

      <!-- 2. Interactive Retrieval & Replication Simulator -->
      <div class="band-full">
        <section class="shell-wrap" style="padding:24px 28px;display:grid;gap:18px;">
          <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;">
            <h2 class="heading-section">${lang === "zh" ? "智能检索与复刻链路沙盒" : "Live MCP Retrieval Sandbox"}</h2>
            <button type="button" data-copy-mcp-payload="1" class="btn-hairline">Copy MCP Response JSON</button>
          </div>

          <!-- Multi-facet Filter Controls (Style + Layout + Asset Type + Tags) -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;padding:14px;background:var(--bg-surface);border:1px solid var(--border-hairline);">
            <label style="display:grid;gap:5px;font-size:11.5px;">
              <span class="eyebrow-mono">STYLE DIRECTION</span>
              <select id="mcp-style-sel" style="height:34px;padding:0 8px;border:1px solid var(--border-hairline);background:var(--bg-code);font-size:12.5px;">
                <option value="all" ${state.mcpStyle === "all" ? "selected" : ""}>All Styles</option>
                <option value="dark-minimal" ${state.mcpStyle === "dark-minimal" ? "selected" : ""}>Dark Minimal Hairline</option>
                <option value="warm-editorial" ${state.mcpStyle === "warm-editorial" ? "selected" : ""}>Warm Editorial Serif</option>
                <option value="monochrome-devtools" ${state.mcpStyle === "monochrome-devtools" ? "selected" : ""}>Monochrome DevTools</option>
                <option value="fintech-clean" ${state.mcpStyle === "fintech-clean" ? "selected" : ""}>Fintech Clean Ledger</option>
              </select>
            </label>

            <label style="display:grid;gap:5px;font-size:11.5px;">
              <span class="eyebrow-mono">LAYOUT STRUCTURE</span>
              <select id="mcp-layout-sel" style="height:34px;padding:0 8px;border:1px solid var(--border-hairline);background:var(--bg-code);font-size:12.5px;">
                <option value="all" ${state.mcpLayout === "all" ? "selected" : ""}>All Layouts</option>
                <option value="split-hero" ${state.mcpLayout === "split-hero" ? "selected" : ""}>Split Hero / Banner</option>
                <option value="bento-grid" ${state.mcpLayout === "bento-grid" ? "selected" : ""}>Bento &amp; Feature Grid</option>
                <option value="3-tier-divided" ${state.mcpLayout === "3-tier-divided" ? "selected" : ""}>3-Tier Divided Pricing</option>
                <option value="auth-card" ${state.mcpLayout === "auth-card" ? "selected" : ""}>Auth &amp; Form Card</option>
                <option value="data-table" ${state.mcpLayout === "data-table" ? "selected" : ""}>Data Table &amp; Logs</option>
                <option value="full-page" ${state.mcpLayout === "full-page" ? "selected" : ""}>Full Page Composition</option>
              </select>
            </label>

            <label style="display:grid;gap:5px;font-size:11.5px;">
              <span class="eyebrow-mono">TAGS / KEYWORDS</span>
              <input id="mcp-query-inp" type="search" value="${esc(state.mcpQuery)}" placeholder="e.g. dark, counter, passkey, cli…" style="height:34px;padding:0 10px;border:1px solid var(--border-hairline);background:var(--bg-code);font-family:var(--font-mono);font-size:12px;outline:none;" />
            </label>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:18px;align-items:start;">
            <!-- Matched References & Assets (Click directly into Catalog or Workbench!) -->
            <div style="display:grid;gap:14px;min-width:0;">
              <div style="border:1px solid var(--border-hairline);background:var(--bg-surface);padding:16px;">
                <div class="eyebrow-mono" style="margin-bottom:10px;">MATCHED DESIGN.MD PROTOCOLS (${sim.brands.length})</div>
                <div style="display:grid;gap:8px;">
                  ${sim.brands
                    .map(
                      (b) => `
                    <button type="button" data-go="catalog-detail:${b.id}" class="btn-hairline" style="height:auto;padding:10px 12px;justify-content:space-between;">
                      <span style="display:flex;align-items:center;gap:8px;">
                        <span style="width:10px;height:10px;background:${b.dark.accent};"></span>
                        <span style="font-weight:600;">${b.name} DESIGN.md</span>
                        <span class="badge-sharp">${b.platformLabel}</span>
                      </span>
                      <span class="font-mono-ui" style="font-size:11px;color:var(--accent-text);">Inspect →</span>
                    </button>`
                    )
                    .join("")}
                </div>
              </div>

              <div style="border:1px solid var(--border-hairline);background:var(--bg-surface);padding:16px;">
                <div class="eyebrow-mono" style="margin-bottom:10px;">MATCHED COMPONENTS &amp; MOTION (${sim.assets.length})</div>
                <div style="display:grid;gap:8px;">
                  ${sim.assets
                    .map(
                      (a) => `
                    <button type="button" data-go="components-detail:${a.categoryId}/${a.id}" class="btn-hairline" style="height:auto;padding:10px 12px;justify-content:space-between;">
                      <span style="display:flex;align-items:center;gap:8px;min-width:0;">
                        <span class="badge-sharp">${a.assetType.toUpperCase()}</span>
                        <span class="truncate-1" style="font-weight:600;">${a.name}</span>
                      </span>
                      <span class="font-mono-ui" style="font-size:11px;color:var(--accent-text);flex-shrink:0;">Workbench →</span>
                    </button>`
                    )
                    .join("")}
                </div>
              </div>
            </div>

            <!-- Live Structured MCP Payload -->
            <div style="border:1px solid var(--border-hairline);background:var(--bg-code);min-width:0;">
              <div style="padding:10px 14px;border-bottom:1px solid var(--border-hairline);display:flex;justify-content:space-between;align-items:center;font-family:var(--font-mono);font-size:11.5px;">
                <span style="color:var(--accent-text);">MCP Tool Response</span>
                <span style="color:var(--text-subtle);">14ms</span>
              </div>
              <pre class="code-scroll" style="max-height:380px;">${esc(sim.jsonPayload)}</pre>
            </div>
          </div>
        </section>
      </div>
    </div>`;
}
