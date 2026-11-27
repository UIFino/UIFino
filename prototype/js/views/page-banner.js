// Unified Channel Page Banner — Strictly 3 vertical elements: Breadcrumb -> Bold Title -> Concise Description
function esc(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Renders the standardized architectural striped page banner across all channels.
 * Never places tabs, switcher buttons, or secondary cards inside the banner.
 *
 * @param {Object} opts
 * @param {Array<{label: string, go?: string}>} opts.breadcrumbs
 * @param {string} opts.title
 * @param {string} opts.description
 */
export function renderPageBanner({ breadcrumbs = [], title = "", description = "" } = {}) {
  const crumbHtml = breadcrumbs
    .map((item, idx) => {
      const isLast = idx === breadcrumbs.length - 1;
      if (!isLast && item.go) {
        return `<button type="button" data-go="${esc(item.go)}" class="page-banner-crumb-btn">${esc(item.label)}</button><span>/</span>`;
      }
      if (!isLast) {
        return `<span>${esc(item.label)}</span><span>/</span>`;
      }
      return `<span class="page-banner-crumb-current">${esc(item.label)}</span>`;
    })
    .join("");

  return `
    <div class="band-full">
      <section class="shell-wrap hero-stripes page-banner">
        <span class="crosshair-plus" style="left:-6px;bottom:-6px;" aria-hidden="true"></span>
        <span class="crosshair-plus" style="right:-6px;bottom:-6px;" aria-hidden="true"></span>
        <nav class="page-banner-crumb" aria-label="Breadcrumb">${crumbHtml}</nav>
        <h1 class="page-banner-title">${esc(title)}</h1>
        ${description ? `<p class="page-banner-desc">${esc(description)}</p>` : ""}
      </section>
    </div>`;
}
