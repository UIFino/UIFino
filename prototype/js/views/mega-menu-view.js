// shadcn.io Style Top Navigation Hover Mega-Menu View Renderer
import { getMegaMenuPanels } from "../data/nav-templates-data.js";

function esc(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildStateAttrs(item) {
  const attrs = [`data-go="${esc(item.go)}"`];
  if (item.resetCatalog) attrs.push(`data-mega-reset-catalog="1"`);
  if (item.setState) {
    if (item.setState.catalogKind) attrs.push(`data-mega-cat-kind="${esc(item.setState.catalogKind)}"`);
    if (item.setState.catalogCategory) attrs.push(`data-mega-cat-domain="${esc(item.setState.catalogCategory)}"`);
    if (item.setState.templateCategory) attrs.push(`data-mega-tpl-cat="${esc(item.setState.templateCategory)}"`);
    if (item.setState.mcpClient) attrs.push(`data-mega-mcp-client="${esc(item.setState.mcpClient)}"`);
  }
  if (item.bgPreset) attrs.push(`data-mega-bg-preset="${esc(item.bgPreset)}"`);
  if (item.shPreset) attrs.push(`data-mega-sh-preset="${esc(item.shPreset)}"`);
  return attrs.join(" ");
}

/**
 * Renders the inner HTML and target width for the active hover mega-menu.
 */
export function renderMegaMenuPanel(menuKey, lang = "zh") {
  const panels = getMegaMenuPanels(lang);
  const panel = panels[menuKey];
  if (!panel) return { width: 560, html: "" };

  // 1. TOOLS: Dual Visual Studio Cards + Quick Preset Bar
  if (menuKey === "tools") {
    const html = `
      <div>
        <div style="padding:12px 14px 4px;" class="eyebrow-mono">${esc(panel.sectionLabel)}</div>
        <div style="padding:8px 12px 12px;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;">
          ${panel.studios
            .map(
              (st) => `
            <button type="button" data-go="${esc(st.go)}" class="mega-item-btn" style="padding:12px;border:1px solid var(--border-hairline);background:var(--bg-canvas);justify-content:space-between;gap:10px;">
              <div style="width:100%;height:76px;border:1px solid var(--border-hairline);${st.previewStyle}display:flex;align-items:center;justify-content:center;padding:10px;">
                ${
                  st.isShadowCard
                    ? `<div style="width:74%;height:44px;background:#1d1d20;border:1px solid rgba(255,255,255,0.16);border-radius:6px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.14),0 10px 24px rgba(0,0,0,0.55);display:flex;align-items:center;justify-content:space-between;padding:0 10px;font-family:var(--font-mono);font-size:9.5px;color:#ececee;"><span>Surface</span><span style="color:var(--accent-text);">6px</span></div>`
                    : `<span class="badge-sharp" style="background:rgba(17,17,19,0.82);color:#ececee;">CSS · Tailwind</span>`
                }
              </div>
              <div>
                <div class="eyebrow-mono" style="color:var(--accent-text);">${esc(st.badge)}</div>
                <div style="margin-top:3px;font-size:13.5px;font-weight:600;color:var(--text-primary);">${esc(st.title)}</div>
                <div class="clamp-2" style="margin-top:4px;font-size:12px;color:var(--text-muted);line-height:1.45;">${esc(st.desc)}</div>
              </div>
            </button>`
            )
            .join("")}
        </div>
        <div class="mega-footer-strip">
          <span class="eyebrow-mono">${lang === "zh" ? "快捷预设" : "QUICK PRESETS"}</span>
          <div style="display:flex;flex-wrap:wrap;gap:6px;">
            ${panel.quickPresets
              .map(
                (qp) => `
              <button type="button" ${buildStateAttrs(qp)} class="badge-sharp" style="cursor:pointer;color:var(--text-body);">
                ${esc(qp.label)} →
              </button>`
              )
              .join("")}
          </div>
        </div>
      </div>`;
    return { width: panel.width, html };
  }

  // 2. MCP: Compact Agent Connection Grid + One-Line CLI Copy Strip
  if (menuKey === "mcp") {
    const html = `
      <div>
        <div style="padding:12px 14px 4px;display:flex;align-items:center;justify-content:space-between;gap:8px;">
          <span class="eyebrow-mono">${esc(panel.sectionLabel)}</span>
          <button type="button" data-go="mcp" class="font-mono-ui" style="background:none;border:0;padding:0;font-size:11.5px;color:var(--accent-text);cursor:pointer;">
            ${lang === "zh" ? "打开检索沙盒 →" : "Open Sandbox →"}
          </button>
        </div>
        <div style="padding:6px 12px 12px;" class="mega-grid-2">
          ${panel.items
            .map(
              (it) => `
            <button type="button" ${buildStateAttrs(it)} class="mega-item-btn">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;">
                <span style="font-size:13px;font-weight:600;color:var(--text-primary);">${esc(it.title)}</span>
                <span class="badge-sharp">${esc(it.badge)}</span>
              </div>
              <div class="clamp-2" style="font-size:12px;color:var(--text-muted);line-height:1.42;">${esc(it.desc)}</div>
            </button>`
            )
            .join("")}
        </div>
        <div class="mega-footer-strip">
          <span class="font-mono-ui truncate-1" style="font-size:11px;color:var(--text-muted);">
            <span style="color:var(--accent-text);">$</span> ${esc(panel.cliInstall)}
          </span>
          <button type="button" data-copy="${esc(panel.cliInstall)}" class="badge-sharp" style="cursor:pointer;color:var(--text-primary);flex-shrink:0;">
            Copy CLI
          </button>
        </div>
      </div>`;
    return { width: panel.width, html };
  }

  // 3. CATALOG / COMPONENTS / TEMPLATES: Left Featured Callout Card + Right 2-Col Grid
  const feat = panel.featured;
  const featuredVisual = feat.swatches
    ? `<div style="display:flex;gap:5px;margin-top:4px;">
        ${feat.swatches
          .map(
            (hex) =>
              `<span style="flex:1;height:8px;background:${hex};border:1px solid var(--border-strong);display:inline-block;"></span>`
          )
          .join("")}
      </div>`
    : feat.pills
      ? `<div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px;">
          ${feat.pills.map((p) => `<span class="badge-sharp">${esc(p)}</span>`).join("")}
        </div>`
      : "";

  let footerStrip = "";
  if (panel.footerLinks) {
    footerStrip = `
      <div class="mega-footer-strip">
        <span class="eyebrow-mono">${lang === "zh" ? "热门规范直达" : "FEATURED SPECS"}</span>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${panel.footerLinks
            .map(
              (fl) => `
            <button type="button" data-go="${esc(fl.go)}" class="badge-sharp" style="cursor:pointer;color:var(--text-body);">
              ${esc(fl.label)}
            </button>`
            )
            .join("")}
        </div>
      </div>`;
  } else if (panel.tierFilters) {
    footerStrip = `
      <div class="mega-footer-strip">
        <span class="eyebrow-mono">${lang === "zh" ? "按粒度筛选" : "FILTER BY TIER"}</span>
        <div style="display:flex;flex-wrap:wrap;gap:5px;">
          ${panel.tierFilters
            .map(
              (tf) => `
            <button type="button" data-go="components-index" data-mega-lib-type="${esc(tf.type)}" class="badge-sharp" style="cursor:pointer;color:var(--text-body);">
              ${esc(tf.label)}
            </button>`
            )
            .join("")}
        </div>
      </div>`;
  }

  const html = `
    <div>
      <div class="mega-layout-featured">
        <button type="button" ${buildStateAttrs(feat)} class="mega-featured-card hero-stripes">
          <div style="display:grid;gap:8px;">
            <span class="badge-sharp" style="width:fit-content;border-color:var(--accent-border);color:var(--accent-text);">${esc(feat.badge)}</span>
            <div style="font-size:15.5px;font-weight:700;line-height:1.22;letter-spacing:-0.02em;color:var(--text-primary);">
              ${esc(feat.title)}
            </div>
            <p style="margin:0;font-size:12.5px;line-height:1.52;color:var(--text-muted);">
              ${esc(feat.desc)}
            </p>
            ${featuredVisual}
          </div>
          <div class="font-mono-ui" style="font-size:12px;font-weight:600;color:var(--accent-text);">
            ${esc(feat.cta)}
          </div>
        </button>

        <div class="mega-links-col">
          <div style="padding:2px 8px 0;" class="eyebrow-mono">${esc(panel.sectionLabel)}</div>
          <div class="mega-grid-2">
            ${panel.items
              .map(
                (it) => `
              <button type="button" ${buildStateAttrs(it)} class="mega-item-btn">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;">
                  <span style="display:inline-flex;align-items:center;gap:7px;min-width:0;">
                    ${it.dot ? `<span style="width:7px;height:7px;background:${it.dot};flex-shrink:0;display:inline-block;"></span>` : ""}
                    <span class="truncate-1" style="font-size:13px;font-weight:600;color:var(--text-primary);">${esc(it.title)}</span>
                  </span>
                  ${it.badge ? `<span class="badge-sharp">${esc(it.badge)}</span>` : ""}
                </div>
                <div class="clamp-2" style="font-size:12px;color:var(--text-muted);line-height:1.42;">
                  ${esc(it.desc)}
                </div>
              </button>`
              )
              .join("")}
          </div>
        </div>
      </div>
      ${footerStrip}
    </div>`;

  return { width: panel.width, html };
}
