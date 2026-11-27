// Main Application Controller — Hash Router, Global Search (⌘K), Customizer, Live Sliders & Event Delegation
import {
  computeWorkbenchTokens,
  generateBackgroundOutput,
  generateDesignMd,
  generateFrameworkCode,
  generateShadowOutput,
  getComponentFileList,
  queryMcpAssets
} from "./core/generators.js";
import { CATALOG_ITEMS } from "./data/catalog-data.js";
import { findAssetByPath, getAllAssetsFlat } from "./data/components-data.js";
import { BG_PRESETS, MCP_CLIENTS, SHADOW_PRESETS } from "./data/tools-mcp-data.js";
import { t } from "./i18n.js";
import { renderCatalogDetailView, renderCatalogIndexView } from "./views/catalog-views.js";
import { renderHomeView } from "./views/home-view.js";
import {
  renderComponentWorkbenchView,
  renderComponentsCategoryView,
  renderComponentsIndexView
} from "./views/library-views.js";
import { renderMcpView, renderToolsView } from "./views/tools-mcp-views.js";

const state = {
  view: "home",
  param: "",
  lang: "zh",
  theme: "dark",
  starred: false,
  starCount: 12800,

  // Home state
  heroStep: 1,
  homeCatalogKind: "all",
  homeAssetType: "all",

  // Catalog state
  catalogKind: "all",
  catalogCategory: "All",
  catalogSearch: "",
  catalogCardMode: "dark",
  catalogDetailTab: "spec",
  catalogDetailMode: "dark",

  // Components Library Level 1 & Level 2 state
  libAssetType: "all",
  libSearch: "",
  libSort: "popular",
  libCardSize: "small",
  catSubfilter: "All",
  catCols: 3,

  // Level 3 Workbench state
  wbFramework: "react",
  wbStageTab: "preview",
  wbViewport: "desktop",
  wbStageMode: "dark",
  wbRadius: 4,
  wbDensity: "default",
  wbSkin: "linear",
  wbActiveFile: "",
  wbTreeType: "all",
  wbTreeFilter: "",

  // Tools Studio state
  toolStudio: "background",
  toolCodeFormat: "css",
  bgShowSample: true,
  bgParams: { ...BG_PRESETS[0] },
  shadowParams: { ...SHADOW_PRESETS[1] },

  // MCP Console state
  mcpClient: "claude-code",
  mcpStyle: "dark-minimal",
  mcpLayout: "all",
  mcpAssetType: "all",
  mcpQuery: "",

  // Global Search Modal
  cmdkFilter: "all",
  cmdkQuery: ""
};

function showToast(msg) {
  const stack = document.getElementById("toast-stack");
  if (!stack) return;
  const item = document.createElement("div");
  item.className = "toast-item";
  item.innerHTML = `<span style="width:7px;height:7px;background:var(--accent-fill);display:inline-block;"></span><span></span>`;
  item.lastElementChild.textContent = msg;
  stack.appendChild(item);
  setTimeout(() => item.remove(), 2200);
}

function copyText(text, label = "Copied to clipboard") {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(
      () => showToast(label),
      () => fallbackCopy(text, label)
    );
  } else {
    fallbackCopy(text, label);
  }
}

function fallbackCopy(text, label) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    showToast(label);
  } catch {
    // ignore
  }
  ta.remove();
}

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast(`Downloaded ${filename}`);
}

function parseRouteTarget(raw) {
  const clean = String(raw || "home").replace(/^#/, "");
  const idx = clean.indexOf(":");
  if (idx === -1) {
    return { view: clean || "home", param: "" };
  }
  return { view: clean.slice(0, idx), param: clean.slice(idx + 1) };
}

function navigate(target, pushHash = true) {
  const { view, param } = parseRouteTarget(target);
  state.view = view;
  state.param = param;
  if (view === "tools" && param) {
    state.toolStudio = param === "shadow" ? "shadow" : "background";
  }
  if (view === "components-cat") {
    state.catSubfilter = "All";
  }
  if (view === "components-detail") {
    state.wbActiveFile = "";
  }
  if (pushHash) {
    const nextHash = "#" + (param ? `${view}:${param}` : view);
    if (window.location.hash !== nextHash) {
      history.pushState(null, "", nextHash);
    }
  }
  renderApp();
  window.scrollTo({ top: 0, behavior: "instant" });
}

function syncHeaderChrome() {
  const lang = state.lang;
  const setTxt = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.textContent = t(lang, key);
  };
  setTxt("i18n-announce-tag", "announceTag");
  setTxt("i18n-announce-text", "announceText");
  setTxt("i18n-announce-action", "announceAction");
  setTxt("i18n-nav-catalog", "navCatalog");
  setTxt("i18n-nav-components", "navComponents");
  setTxt("i18n-nav-tools", "navTools");
  setTxt("i18n-nav-mcp", "navMcp");
  setTxt("i18n-customize-label", "customizeBtn");

  const langBtn = document.getElementById("lang-toggle-btn");
  if (langBtn) langBtn.textContent = lang === "zh" ? "中文" : "EN";

  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) themeBtn.textContent = state.theme === "dark" ? "◐ Dark" : "◑ Light";

  const activeChannel = state.view.startsWith("catalog")
    ? "catalog"
    : state.view.startsWith("components")
      ? "components"
      : state.view === "tools"
        ? "tools"
        : state.view === "mcp"
          ? "mcp"
          : "";

  document.querySelectorAll("[data-nav-channel]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.getAttribute("data-nav-channel") === activeChannel);
  });
}

function runCounters() {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }
  document.querySelectorAll(".js-anim-counter").forEach((el) => {
    const raw = el.getAttribute("data-target") || "0";
    const target = parseFloat(raw);
    const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
    const start = performance.now();
    const duration = 680;

    function frame(now) {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = decimals > 0 ? val.toFixed(decimals) : String(Math.round(val));
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  });
}

function bindLiveInputs(focusRestoreId, cursorPos) {
  if (focusRestoreId) {
    const targetEl = document.getElementById(focusRestoreId);
    if (targetEl && typeof targetEl.focus === "function") {
      targetEl.focus();
      if (typeof cursorPos === "number" && typeof targetEl.setSelectionRange === "function") {
        try {
          targetEl.setSelectionRange(cursorPos, cursorPos);
        } catch {
          // type="search" in some browsers
        }
      }
    }
  }

  const bindSearch = (id, key) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", (e) => {
      state[key] = e.target.value;
      const pos = e.target.selectionStart ?? e.target.value.length;
      renderApp(id, pos);
    });
  };

  bindSearch("catalog-search-input", "catalogSearch");
  bindSearch("lib-search-input", "libSearch");
  bindSearch("wb-tree-filter-input", "wbTreeFilter");
  bindSearch("mcp-query-inp", "mcpQuery");

  const treeTypeSel = document.getElementById("wb-tree-type-select");
  if (treeTypeSel) {
    treeTypeSel.addEventListener("change", (e) => {
      state.wbTreeType = e.target.value;
      renderApp();
    });
  }

  const replayBtn = document.getElementById("wb-replay-btn");
  if (replayBtn) {
    replayBtn.addEventListener("click", runCounters);
  }

  // Tools Studio Live Sliders (smooth in-place DOM update during drag, full sync on change)
  const bgSample = document.getElementById("bg-sample-toggle");
  if (bgSample) {
    bgSample.addEventListener("change", (e) => {
      state.bgShowSample = e.target.checked;
      renderApp();
    });
  }

  const updateBgLive = () => {
    const root = document.getElementById("app-root");
    if (!root) return;
    const res = generateBackgroundOutput(state.bgParams, state.toolCodeFormat);
    const stageBox = root.querySelector("[style*='height:300px']");
    if (stageBox) {
      stageBox.style.cssText = `height:300px;${res.inlineStyle}display:flex;align-items:center;justify-content:center;padding:24px;position:relative;overflow:hidden;`;
    }
    const pre = root.querySelector(".code-scroll");
    if (pre) pre.textContent = res.code;
  };

  const bindRange = (id, targetObj, prop, unit, onLive) => {
    const inp = document.getElementById(id);
    if (!inp) return;
    inp.addEventListener("input", (e) => {
      const val = e.target.type === "color" ? e.target.value : Number(e.target.value);
      targetObj[prop] = val;
      const readout = inp.previousElementSibling?.querySelector(".font-mono-ui") || inp.nextElementSibling;
      if (readout) readout.textContent = e.target.type === "color" ? val : `${val}${unit}`;
      onLive();
    });
  };

  bindRange("bg-canvas-inp", state.bgParams, "canvas", "", updateBgLive);
  bindRange("bg-accent-inp", state.bgParams, "accent", "", updateBgLive);
  bindRange("bg-cell-inp", state.bgParams, "cellSize", "px", updateBgLive);
  bindRange("bg-op-inp", state.bgParams, "opacity", "%", updateBgLive);
  bindRange("bg-spread-inp", state.bgParams, "spread", "%", updateBgLive);
  bindRange("bg-noise-inp", state.bgParams, "noise", "%", updateBgLive);

  const updateShadowLive = () => {
    const root = document.getElementById("app-root");
    if (!root) return;
    const res = generateShadowOutput(state.shadowParams, state.toolCodeFormat);
    const stageOuter = root.querySelector("[style*='height:300px']");
    if (stageOuter) {
      stageOuter.style.background = res.canvasBg;
      const specimen = stageOuter.firstElementChild;
      if (specimen) {
        specimen.style.background = res.surfaceBg;
        specimen.style.color = res.ink;
        specimen.style.borderColor = res.borderCol;
        specimen.style.borderRadius = `${res.radius}px`;
        specimen.style.boxShadow = res.boxShadow;
      }
    }
    const pre = root.querySelector(".code-scroll");
    if (pre) pre.textContent = res.code;
  };

  bindRange("sh-y-inp", state.shadowParams, "yOffset", "px", updateShadowLive);
  bindRange("sh-blur-inp", state.shadowParams, "blur", "px", updateShadowLive);
  bindRange("sh-op-inp", state.shadowParams, "opacity", "%", updateShadowLive);
  bindRange("sh-rim-inp", state.shadowParams, "rimLight", "%", updateShadowLive);
  bindRange("sh-border-inp", state.shadowParams, "borderAlpha", "%", updateShadowLive);
  bindRange("sh-rad-inp", state.shadowParams, "radius", "px", updateShadowLive);

  const mcpStyleSel = document.getElementById("mcp-style-sel");
  if (mcpStyleSel) mcpStyleSel.addEventListener("change", (e) => { state.mcpStyle = e.target.value; renderApp(); });
  const mcpLayoutSel = document.getElementById("mcp-layout-sel");
  if (mcpLayoutSel) mcpLayoutSel.addEventListener("change", (e) => { state.mcpLayout = e.target.value; renderApp(); });
}

export function renderApp(focusRestoreId = "", cursorPos = 0) {
  syncHeaderChrome();
  const root = document.getElementById("app-root");
  if (!root) return;

  if (state.view === "catalog-index") root.innerHTML = renderCatalogIndexView(state);
  else if (state.view === "catalog-detail") root.innerHTML = renderCatalogDetailView(state);
  else if (state.view === "components-index") root.innerHTML = renderComponentsIndexView(state);
  else if (state.view === "components-cat") root.innerHTML = renderComponentsCategoryView(state);
  else if (state.view === "components-detail") root.innerHTML = renderComponentWorkbenchView(state);
  else if (state.view === "tools") root.innerHTML = renderToolsView(state);
  else if (state.view === "mcp") root.innerHTML = renderMcpView(state);
  else root.innerHTML = renderHomeView(state);

  bindLiveInputs(focusRestoreId, cursorPos);
  if (state.view === "components-detail" && state.wbStageTab === "preview" && !focusRestoreId) {
    runCounters();
  }
}

// =========================================================
// Global Search Modal (⌘K) with shadcn.io Category Tabs
// =========================================================
function buildSearchItems() {
  const entries = [];
  for (const b of CATALOG_ITEMS) {
    entries.push({
      group: "catalog",
      badge: b.kind === "app" ? "APP" : "WEB",
      label: `${b.name} DESIGN.md`,
      meta: b.category,
      go: `catalog-detail:${b.id}`
    });
  }
  for (const a of getAllAssetsFlat()) {
    entries.push({
      group: a.assetType,
      badge: a.assetType.toUpperCase(),
      label: a.name,
      meta: a.categoryName,
      go: `components-detail:${a.categoryId}/${a.id}`
    });
  }
  entries.push(
    { group: "tools", badge: "TOOL", label: "Parameterized Background Studio", meta: "Grid · Aurora · Grain", go: "tools:background" },
    { group: "tools", badge: "TOOL", label: "Shadow & Surface Token Lab", meta: "Elevation & Rim Light", go: "tools:shadow" },
    { group: "tools", badge: "MCP", label: "MCP Agent Integration Sandbox", meta: "Claude Code & Cursor", go: "mcp" }
  );
  return entries;
}

function renderCmdkResults() {
  const listEl = document.getElementById("cmdk-results");
  if (!listEl) return;
  const q = state.cmdkQuery.trim().toLowerCase();
  const all = buildSearchItems().filter((x) => {
    const fOk = state.cmdkFilter === "all" || x.group === state.cmdkFilter;
    const qOk = !q || `${x.label} ${x.meta} ${x.badge}`.toLowerCase().includes(q);
    return fOk && qOk;
  });

  document.querySelectorAll("[data-cmdk-filter]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.getAttribute("data-cmdk-filter") === state.cmdkFilter);
  });

  if (!all.length) {
    listEl.innerHTML = `<div style="padding:28px;text-align:center;font-size:13px;color:var(--text-muted);">${t(state.lang, "emptyResult")}</div>`;
    return;
  }

  listEl.innerHTML = all
    .slice(0, 18)
    .map(
      (item) => `
      <button type="button" data-go="${item.go}" class="tree-row" style="padding:8px 12px;">
        <span style="display:flex;align-items:center;gap:8px;min-width:0;">
          <span class="badge-sharp">${item.badge}</span>
          <span class="truncate-1" style="color:var(--text-primary);font-weight:500;">${item.label}</span>
        </span>
        <span class="font-mono-ui" style="font-size:11px;color:var(--text-subtle);flex-shrink:0;">${item.meta} ↵</span>
      </button>`
    )
    .join("");
}

function openCmdk() {
  const modal = document.getElementById("cmdk-modal");
  if (!modal) return;
  modal.hidden = false;
  state.cmdkQuery = "";
  const inp = document.getElementById("cmdk-input");
  if (inp) {
    inp.value = "";
    inp.placeholder = t(state.lang, "searchPlaceholder");
    setTimeout(() => inp.focus(), 20);
  }
  renderCmdkResults();
}

function closeCmdk() {
  const modal = document.getElementById("cmdk-modal");
  if (modal) modal.hidden = true;
}

function toggleCustomizer(forceClose = false) {
  const pop = document.getElementById("customizer-popover");
  if (!pop) return;
  if (forceClose) {
    pop.hidden = true;
    return;
  }
  pop.hidden = !pop.hidden;
  if (!pop.hidden) renderCustomizerPopover();
}

function renderCustomizerPopover() {
  const pop = document.getElementById("customizer-popover");
  if (!pop) return;
  pop.innerHTML = `
    <div style="display:grid;gap:14px;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span class="eyebrow-mono" style="color:var(--accent-text);">GLOBAL WORKBENCH PRESET</span>
        <button type="button" data-close-customizer="1" class="font-mono-ui" style="background:none;border:0;color:var(--text-muted);cursor:pointer;">✕</button>
      </div>

      <div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px;">Default Radius</div>
        <div class="seg-group" style="width:100%;display:grid;grid-template-columns:repeat(5,1fr);">
          ${[0, 4, 8, 12, 16]
            .map(
              (r) =>
                `<button type="button" data-wb-radius="${r}" class="seg-btn ${state.wbRadius === r ? "is-active" : ""}" style="justify-content:center;padding:0;">${r}px</button>`
            )
            .join("")}
        </div>
      </div>

      <div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px;">Default Density</div>
        <div class="seg-group" style="width:100%;display:grid;grid-template-columns:repeat(3,1fr);">
          ${["compact", "default", "spacious"]
            .map(
              (d) =>
                `<button type="button" data-wb-density="${d}" class="seg-btn ${state.wbDensity === d ? "is-active" : ""}" style="justify-content:center;padding:0;text-transform:capitalize;">${d}</button>`
            )
            .join("")}
        </div>
      </div>

      <div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px;">Brand Skin</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;">
          ${[["default", "uifino"], ...CATALOG_ITEMS.slice(0, 5).map((b) => [b.id, b.name])]
            .map(
              ([id, label]) => `
            <button type="button" data-wb-skin="${id}" class="btn-hairline" style="height:28px;font-size:11.5px;${state.wbSkin === id ? "border-color:var(--accent-border);color:var(--accent-text);" : ""}">${label}</button>`
            )
            .join("")}
        </div>
      </div>
    </div>`;
}

// =========================================================
// Bootstrap & Delegated Events
// =========================================================
function init() {
  if (window.location.hash && window.location.hash.length > 1) {
    const { view, param } = parseRouteTarget(window.location.hash);
    state.view = view;
    state.param = param;
  }

  window.addEventListener("popstate", () => {
    const { view, param } = parseRouteTarget(window.location.hash || "#home");
    state.view = view;
    state.param = param;
    renderApp();
  });

  document.getElementById("dismiss-announce-btn")?.addEventListener("click", () => {
    const bar = document.getElementById("announce-bar");
    if (bar) bar.style.display = "none";
  });

  document.getElementById("theme-toggle-btn")?.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", state.theme);
    renderApp();
  });

  document.getElementById("lang-toggle-btn")?.addEventListener("click", () => {
    state.lang = state.lang === "zh" ? "en" : "zh";
    renderApp();
  });

  document.getElementById("github-star-btn")?.addEventListener("click", () => {
    state.starred = !state.starred;
    state.starCount += state.starred ? 100 : -100;
    const lbl = document.getElementById("gh-star-num");
    if (lbl) lbl.textContent = `${(state.starCount / 1000).toFixed(1)}k`;
    showToast(state.starred ? "Starred uifino repository" : "Removed star");
  });

  document.getElementById("cmdk-open-btn")?.addEventListener("click", openCmdk);
  document.getElementById("cmdk-close-btn")?.addEventListener("click", closeCmdk);
  document.getElementById("cmdk-modal")?.addEventListener("click", (e) => {
    if (e.target.id === "cmdk-modal") closeCmdk();
  });
  document.getElementById("cmdk-input")?.addEventListener("input", (e) => {
    state.cmdkQuery = e.target.value;
    renderCmdkResults();
  });

  document.getElementById("customize-open-btn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleCustomizer(false);
  });

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openCmdk();
    } else if (e.key === "Escape") {
      closeCmdk();
      toggleCustomizer(true);
    }
  });

  document.body.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;

    if (!target.closest("#customizer-popover") && !target.closest("#customize-open-btn")) {
      toggleCustomizer(true);
    }

    if (target.closest("[data-close-customizer]")) {
      toggleCustomizer(true);
      return;
    }

    const cmdkFilter = target.closest("[data-cmdk-filter]");
    if (cmdkFilter) {
      state.cmdkFilter = cmdkFilter.getAttribute("data-cmdk-filter") || "all";
      renderCmdkResults();
      return;
    }

    const goBtn = target.closest("[data-go]");
    if (goBtn) {
      closeCmdk();
      navigate(goBtn.getAttribute("data-go"));
      return;
    }

    const copyBtn = target.closest("[data-copy]");
    if (copyBtn) {
      copyText(copyBtn.getAttribute("data-copy") || "", "Copied to clipboard");
      return;
    }

    const copyMdBtn = target.closest("[data-copy-design-md]");
    if (copyMdBtn) {
      const id = copyMdBtn.getAttribute("data-copy-design-md");
      const entry = CATALOG_ITEMS.find((x) => x.id === id) || CATALOG_ITEMS[0];
      copyText(generateDesignMd(entry), `Copied ${entry.name} DESIGN.md`);
      return;
    }

    const dlMdBtn = target.closest("[data-download-design-md]");
    if (dlMdBtn) {
      const id = dlMdBtn.getAttribute("data-download-design-md");
      const entry = CATALOG_ITEMS.find((x) => x.id === id) || CATALOG_ITEMS[0];
      downloadTextFile(`${entry.id}-DESIGN.md`, generateDesignMd(entry));
      return;
    }

    const applyBrandBtn = target.closest("[data-apply-brand-workbench]");
    if (applyBrandBtn) {
      const brandId = applyBrandBtn.getAttribute("data-apply-brand-workbench") || "linear";
      const brand = CATALOG_ITEMS.find((x) => x.id === brandId);
      state.wbSkin = brandId;
      if (brand) {
        const parsedR = parseInt(brand.defaultRadius, 10);
        if ([0, 4, 8, 12, 16].includes(parsedR)) state.wbRadius = parsedR;
        else if (parsedR <= 6) state.wbRadius = 4;
        else state.wbRadius = 8;
      }
      navigate("components-detail:hero/hero-telemetry-counter");
      showToast(`Applied ${brand ? brand.name : brandId} protocol in Workbench`);
      return;
    }

    // Home switches
    const wfBtn = target.closest("[data-wf-step]");
    if (wfBtn) { state.heroStep = Number(wfBtn.getAttribute("data-wf-step")); renderApp(); return; }
    const hck = target.closest("[data-home-cat-kind]");
    if (hck) { state.homeCatalogKind = hck.getAttribute("data-home-cat-kind"); renderApp(); return; }
    const hat = target.closest("[data-home-asset-type]");
    if (hat) { state.homeAssetType = hat.getAttribute("data-home-asset-type"); renderApp(); return; }

    // Catalog switches
    const cpm = target.closest("[data-cat-preview-mode]");
    if (cpm) { state.catalogCardMode = cpm.getAttribute("data-cat-preview-mode"); renderApp(); return; }
    const ck = target.closest("[data-cat-kind]");
    if (ck) { state.catalogKind = ck.getAttribute("data-cat-kind"); renderApp(); return; }
    const cc = target.closest("[data-cat-category]");
    if (cc) { state.catalogCategory = cc.getAttribute("data-cat-category"); renderApp(); return; }
    if (target.closest("[data-reset-catalog]")) {
      state.catalogKind = "all"; state.catalogCategory = "All"; state.catalogSearch = ""; renderApp(); return;
    }
    const cdt = target.closest("[data-cdetail-tab]");
    if (cdt) { state.catalogDetailTab = cdt.getAttribute("data-cdetail-tab"); renderApp(); return; }
    const cdm = target.closest("[data-cdetail-mode]");
    if (cdm) { state.catalogDetailMode = cdm.getAttribute("data-cdetail-mode"); renderApp(); return; }

    // Components Level 1 & Level 2 switches
    const lt = target.closest("[data-lib-type]");
    if (lt) { state.libAssetType = lt.getAttribute("data-lib-type"); renderApp(); return; }
    const ls = target.closest("[data-lib-sort]");
    if (ls) { state.libSort = ls.getAttribute("data-lib-sort"); renderApp(); return; }
    const lsz = target.closest("[data-lib-size]");
    if (lsz) { state.libCardSize = lsz.getAttribute("data-lib-size"); renderApp(); return; }
    if (target.closest("[data-reset-lib]")) {
      state.libAssetType = "all"; state.libSearch = ""; renderApp(); return;
    }
    const csb = target.closest("[data-cat-sub]");
    if (csb) { state.catSubfilter = csb.getAttribute("data-cat-sub"); renderApp(); return; }
    const ccol = target.closest("[data-cat-cols]");
    if (ccol) { state.catCols = Number(ccol.getAttribute("data-cat-cols")); renderApp(); return; }

    // Level 3 Workbench switches
    const wbTab = target.closest("[data-wb-tab]");
    if (wbTab) { state.wbStageTab = wbTab.getAttribute("data-wb-tab"); renderApp(); return; }
    const wbFw = target.closest("[data-wb-fw]");
    if (wbFw) { state.wbFramework = wbFw.getAttribute("data-wb-fw"); state.wbActiveFile = ""; renderApp(); return; }
    const wbVp = target.closest("[data-wb-vp]");
    if (wbVp) { state.wbViewport = wbVp.getAttribute("data-wb-vp"); renderApp(); return; }
    const wbMd = target.closest("[data-wb-mode]");
    if (wbMd) { state.wbStageMode = wbMd.getAttribute("data-wb-mode"); renderApp(); return; }
    const wbRad = target.closest("[data-wb-radius]");
    if (wbRad) {
      state.wbRadius = Number(wbRad.getAttribute("data-wb-radius"));
      renderApp();
      const pop = document.getElementById("customizer-popover");
      if (pop && !pop.hidden) renderCustomizerPopover();
      return;
    }
    const wbDen = target.closest("[data-wb-density]");
    if (wbDen) {
      state.wbDensity = wbDen.getAttribute("data-wb-density");
      renderApp();
      const pop = document.getElementById("customizer-popover");
      if (pop && !pop.hidden) renderCustomizerPopover();
      return;
    }
    const wbSk = target.closest("[data-wb-skin]");
    if (wbSk) {
      state.wbSkin = wbSk.getAttribute("data-wb-skin");
      renderApp();
      const pop = document.getElementById("customizer-popover");
      if (pop && !pop.hidden) renderCustomizerPopover();
      return;
    }
    const wbFile = target.closest("[data-wb-file]");
    if (wbFile) {
      state.wbActiveFile = wbFile.getAttribute("data-wb-file");
      state.wbStageTab = "code";
      renderApp();
      return;
    }
    if (target.closest("[data-wb-reset]")) {
      state.wbRadius = 8; state.wbDensity = "default"; state.wbSkin = "default"; renderApp(); return;
    }
    if (target.closest("[data-copy-wb-code]")) {
      const { category, item } = findAssetByPath(state.param);
      const tk = computeWorkbenchTokens({
        radius: state.wbRadius,
        density: state.wbDensity,
        skinId: state.wbSkin,
        mode: state.wbStageMode
      });
      const files = getComponentFileList(item, state.wbFramework);
      const file = files.includes(state.wbActiveFile) ? state.wbActiveFile : files[0];
      copyText(generateFrameworkCode(item, category, state.wbFramework, tk, file), `Copied ${file}`);
      return;
    }

    const tocLink = target.closest("[data-toc-scroll]");
    if (tocLink) {
      e.preventDefault();
      const secId = tocLink.getAttribute("data-toc-scroll");
      document.querySelectorAll(".toc-link").forEach((a) => a.classList.remove("is-active"));
      tocLink.classList.add("is-active");
      document.getElementById(secId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // Tools switches
    const ts = target.closest("[data-tool-studio]");
    if (ts) { navigate(`tools:${ts.getAttribute("data-tool-studio")}`); return; }
    const bge = target.closest("[data-bg-engine]");
    if (bge) { state.bgParams.engine = bge.getAttribute("data-bg-engine"); renderApp(); return; }
    const bgp = target.closest("[data-bg-preset]");
    if (bgp) {
      const p = BG_PRESETS.find((x) => x.id === bgp.getAttribute("data-bg-preset"));
      if (p) { state.bgParams = { ...p }; renderApp(); }
      return;
    }
    const shp = target.closest("[data-sh-preset]");
    if (shp) {
      const p = SHADOW_PRESETS.find((x) => x.id === shp.getAttribute("data-sh-preset"));
      if (p) { state.shadowParams = { ...p }; renderApp(); }
      return;
    }
    const shm = target.closest("[data-sh-mode]");
    if (shm) { state.shadowParams.mode = shm.getAttribute("data-sh-mode"); renderApp(); return; }
    const tfmt = target.closest("[data-tool-fmt]");
    if (tfmt) { state.toolCodeFormat = tfmt.getAttribute("data-tool-fmt"); renderApp(); return; }
    const ctc = target.closest("[data-copy-tool-code]");
    if (ctc) {
      const kind = ctc.getAttribute("data-copy-tool-code");
      const out = kind === "shadow"
        ? generateShadowOutput(state.shadowParams, state.toolCodeFormat).code
        : generateBackgroundOutput(state.bgParams, state.toolCodeFormat).code;
      copyText(out, `Copied ${state.toolCodeFormat.toUpperCase()} snippet`);
      return;
    }

    // MCP switches
    const mcpCl = target.closest("[data-mcp-client]");
    if (mcpCl) { state.mcpClient = mcpCl.getAttribute("data-mcp-client"); renderApp(); return; }
    const copyMcpCl = target.closest("[data-copy-mcp-client]");
    if (copyMcpCl) {
      const cl = MCP_CLIENTS.find((x) => x.id === copyMcpCl.getAttribute("data-copy-mcp-client")) || MCP_CLIENTS[0];
      copyText(cl.snippet, `Copied ${cl.name} MCP config`);
      return;
    }
    if (target.closest("[data-copy-mcp-payload]")) {
      const sim = queryMcpAssets({
        query: state.mcpQuery,
        style: state.mcpStyle,
        layout: state.mcpLayout,
        assetType: state.mcpAssetType
      });
      copyText(sim.jsonPayload, "Copied MCP JSON response");
    }
  });

  renderApp();
}

init();
