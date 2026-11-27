// Channel 3: Multi-Page Starter Templates Directory View
import { TEMPLATE_CATEGORIES, TEMPLATE_ITEMS } from "../data/nav-templates-data.js";
import { t } from "../i18n.js";
import { renderPageBanner } from "./page-banner.js";

function esc(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderTemplatePreviewFrame(tpl) {
  return `
    <div style="position:relative;height:184px;border:1px solid var(--border-hairline);background:${tpl.canvas};padding:14px 16px 0;overflow:hidden;">
      <!-- Back Secondary Route Sheet -->
      <div style="position:absolute;right:16px;top:16px;width:54%;bottom:0;background:${tpl.surface};border:1px solid ${tpl.border};border-bottom:0;opacity:0.75;padding:9px 11px;">
        <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:9px;color:#8a8f98;">
          <span>/${esc(tpl.routes[1]?.toLowerCase().replace(/\s+/g, "-") || "pricing")}</span>
          <span style="color:${tpl.accent};">SYNCED</span>
        </div>
        <div style="margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:6px;">
          <div style="height:42px;border:1px solid ${tpl.border};background:${tpl.canvas};"></div>
          <div style="height:42px;border:1px solid ${tpl.border};background:${tpl.canvas};"></div>
        </div>
      </div>

      <!-- Front Primary Page Sheet -->
      <div style="position:relative;z-index:2;width:68%;height:100%;background:${tpl.surface};border:1px solid ${tpl.border};border-bottom:0;padding:11px 13px;box-shadow:0 12px 32px rgba(0,0,0,0.45);display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:8px;border-bottom:1px solid ${tpl.border};">
            <span style="display:inline-flex;align-items:center;gap:5px;font-size:10px;font-weight:700;color:#f4f4f6;">
              <span style="width:7px;height:7px;background:${tpl.accent};display:inline-block;"></span>
              ${esc(tpl.name.split(" ")[0])}
            </span>
            <span style="padding:1px 6px;background:${tpl.accent};color:#111113;font-family:var(--font-mono);font-size:8.5px;font-weight:700;">Deploy</span>
          </div>
          <div style="margin-top:10px;font-size:13px;font-weight:600;line-height:1.2;color:#f4f4f6;">
            Multi-route starter wired with ${esc(tpl.skinLabel)}.
          </div>
          <div style="margin-top:7px;height:5px;width:72%;background:${tpl.border};"></div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;padding-bottom:10px;">
          ${tpl.routes
            .slice(0, 3)
            .map(
              (r) =>
                `<div style="padding:4px 5px;border:1px solid ${tpl.border};background:${tpl.canvas};font-family:var(--font-mono);font-size:8.5px;color:#a0a0a8;" class="truncate-1">${esc(r)}</div>`
            )
            .join("")}
        </div>
      </div>
    </div>`;
}

export function renderTemplatesIndexView(state) {
  const lang = state.lang;
  const isZh = lang === "zh";
  const q = (state.templateSearch || "").trim().toLowerCase();

  const filtered = TEMPLATE_ITEMS.filter((item) => {
    const catOk = state.templateCategory === "All" || item.category === state.templateCategory;
    const qOk =
      !q ||
      [item.name, item.nameZh, item.category, item.stack, item.skinLabel, ...item.routes, item.descEn, item.descZh]
        .join(" ")
        .toLowerCase()
        .includes(q);
    return catOk && qOk;
  });

  return `
    <div>
      ${renderPageBanner({
        breadcrumbs: [{ label: "Home", go: "home" }, { label: t(lang, "navTemplates") }],
        title: isZh ? "开箱即用的多页整站工程模板" : "Production-ready multi-page starter templates.",
        description: isZh
          ? "预置多页面路由、明暗主题变量与配套 DESIGN.md 规范，克隆后即可直接接入业务代码。"
          : "Pre-wired with multi-page routing, Light/Dark tokens, and matching DESIGN.md protocols."
      })}

      <div class="band-full">
        <section class="shell-wrap">
          <!-- Unified Content Toolbar: Category Tabs + Search + Count -->
          <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding:12px 20px;border-bottom:1px solid var(--border-hairline);background:var(--bg-surface);">
            <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;">
              <div class="seg-group">
                ${TEMPLATE_CATEGORIES.map(
                  (cat) => `
                  <button type="button" data-tpl-cat="${esc(cat)}" class="seg-btn ${state.templateCategory === cat ? "is-active" : ""}">
                    ${esc(cat)}
                  </button>`
                ).join("")}
              </div>

              <div style="display:flex;align-items:center;gap:6px;height:30px;padding:0 10px;border:1px solid var(--border-hairline);background:var(--bg-code);width:220px;">
                <span style="font-size:12px;color:var(--text-subtle);">⌕</span>
                <input id="template-search-input" type="search" value="${esc(state.templateSearch)}" placeholder="${isZh ? "搜索模板、技术栈或路由…" : "Search templates or stack…"}" style="width:100%;border:0;background:transparent;outline:none;font-size:12px;" />
              </div>
            </div>

            <span class="font-mono-ui" style="font-size:12px;color:var(--text-muted);">
              ${filtered.length} ${isZh ? "套整站模板" : "starter kits"} · ${isZh ? "持续扩充中" : "More coming soon"}
            </span>
          </div>

          ${
            filtered.length === 0
              ? `<div style="padding:64px 24px;text-align:center;">
                  <div style="font-size:15px;font-weight:600;">${t(lang, "emptyResult")}</div>
                  <button type="button" data-reset-templates="1" class="btn-hairline" style="margin-top:14px;">${t(lang, "resetFilter")}</button>
                </div>`
              : `<div class="lined-grid-2">
                  ${filtered
                    .map(
                      (tpl) => `
                    <div class="lined-cell" style="padding:22px;display:flex;flex-direction:column;justify-content:space-between;gap:16px;">
                      <div>
                        ${renderTemplatePreviewFrame(tpl)}
                        <div style="margin-top:16px;display:flex;align-items:center;justify-content:space-between;gap:10px;">
                          <div style="font-size:16px;font-weight:600;color:var(--text-primary);">
                            ${esc(isZh ? tpl.nameZh : tpl.name)}
                          </div>
                          <span class="badge-sharp">${esc(tpl.stack)}</span>
                        </div>
                        <p style="margin:6px 0 0;font-size:13px;color:var(--text-muted);line-height:1.55;">
                          ${esc(isZh ? tpl.descZh : tpl.descEn)}
                        </p>
                        <div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:5px;">
                          ${tpl.routes.map((r) => `<span class="badge-sharp">${esc(r)}</span>`).join("")}
                        </div>
                      </div>

                      <div style="padding-top:12px;border-top:1px solid var(--border-hairline);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;">
                        <button type="button" data-go="catalog-detail:${esc(tpl.skinId)}" class="font-mono-ui" style="background:none;border:0;padding:0;font-size:12px;color:var(--text-muted);cursor:pointer;">
                          Skin: <span style="color:var(--accent-text);">${esc(tpl.skinLabel)}</span> →
                        </button>
                        <div style="display:flex;gap:8px;">
                          <button type="button" data-copy="npx uifino@latest create ${esc(tpl.id)}" class="btn-hairline" style="height:30px;padding:0 11px;font-family:var(--font-mono);font-size:11.5px;">
                            Copy CLI
                          </button>
                          <button type="button" data-apply-brand-workbench="${esc(tpl.skinId)}" class="btn-contrast" style="height:30px;padding:0 12px;font-size:12px;">
                            ${isZh ? "工作台预览 →" : "Open Shell →"}
                          </button>
                        </div>
                      </div>
                    </div>`
                    )
                    .join("")}
                </div>`
          }
        </section>
      </div>
    </div>`;
}
