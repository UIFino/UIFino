// High-Craft Visual Previews — Brand 3:4 Portraits, App 9:19 Frames, Category Fan Stacks & Workbench Stage

export function renderBrandPortrait(item, mode = "dark") {
  const p = mode === "light" ? item.light : item.dark;
  const fontFam = item.fonts.serif ? "var(--font-serif)" : "var(--font-sans)";

  if (item.kind === "app") {
    // Studio framed 9:19 mobile screen inside 3:4 portrait card
    return `
      <div style="height:100%;width:100%;background:${mode === "light" ? "#E8EAEF" : "#111215"};display:flex;align-items:center;justify-content:center;padding:18px;">
        <div style="width:78%;height:94%;background:${p.canvas};color:${p.ink};border:2px solid ${p.border};border-radius:22px;padding:10px 12px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 16px 36px rgba(0,0,0,0.35);">
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;font-family:var(--font-mono);font-size:9px;color:${p.muted};">
              <span>09:41</span>
              <span style="width:34px;height:6px;border-radius:999px;background:${p.border};display:inline-block;"></span>
              <span>5G</span>
            </div>
            <div style="margin-top:12px;font-size:9px;font-family:var(--font-mono);text-transform:uppercase;color:${p.accent};">${item.platformLabel}</div>
            <div style="margin-top:3px;font-size:14px;font-weight:700;letter-spacing:-0.02em;line-height:1.15;">${item.name}</div>
          </div>

          <div style="display:grid;gap:7px;my:auto;">
            <div style="background:${p.surface};border:1px solid ${p.border};border-radius:12px;padding:9px;">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="font-size:9.5px;color:${p.muted};">LIVE STATUS</span>
                <span style="font-family:var(--font-mono);font-size:9.5px;color:${p.accent};font-weight:700;">ACTIVE</span>
              </div>
              <div style="margin-top:5px;font-family:var(--font-mono);font-size:16px;font-weight:700;">99.94%</div>
            </div>
            <div style="background:${p.surface};border:1px solid ${p.border};border-radius:12px;padding:8px;display:flex;justify-content:space-between;align-items:center;">
              <div style="height:6px;width:52%;border-radius:3px;background:${p.border};"></div>
              <span style="font-family:var(--font-mono);font-size:9px;color:${p.muted};">+18.2%</span>
            </div>
          </div>

          <div style="height:28px;border-radius:999px;background:${p.accent};color:${p.accentFg};display:flex;align-items:center;justify-content:center;font-size:10.5px;font-weight:600;">
            ${item.ctaLabel}
          </div>
        </div>
      </div>`;
  }

  // Website 3:4 architectural mini landing page
  return `
    <div style="height:100%;width:100%;background:${p.canvas};color:${p.ink};display:flex;flex-direction:column;justify-content:space-between;padding:14px;">
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:9px;border-bottom:1px solid ${p.border};">
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="width:8px;height:8px;background:${p.accent};display:inline-block;border-radius:2px;"></span>
            <span style="font-size:11px;font-weight:700;letter-spacing:-0.02em;">${item.name}</span>
          </div>
          <div style="display:flex;gap:6px;align-items:center;">
            <span style="width:20px;height:4px;background:${p.border};display:inline-block;"></span>
            <span style="padding:2px 6px;background:${p.accent};color:${p.accentFg};font-size:8.5px;font-weight:600;border-radius:${item.defaultRadius};">${item.ctaLabel}</span>
          </div>
        </div>

        <div style="padding:14px 2px 10px;">
          <div style="font-family:var(--font-mono);font-size:8.5px;text-transform:uppercase;color:${p.muted};letter-spacing:0.08em;">${item.category}</div>
          <div style="margin-top:5px;font-family:${fontFam};font-size:${item.fonts.serif ? "19px" : "16px"};font-weight:600;line-height:1.12;letter-spacing:${item.fonts.tracking};">
            Precision interface system built for shipping.
          </div>
          <div style="margin-top:8px;height:5px;width:78%;background:${p.border};border-radius:2px;"></div>
        </div>
      </div>

      <div style="display:grid;gap:7px;">
        <div style="background:${p.surface};border:1px solid ${p.border};border-radius:${item.defaultRadius};padding:9px;">
          <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:8.5px;color:${p.muted};">
            <span>DESIGN.md</span>
            <span style="color:${p.accent};">${item.defaultRadius}</span>
          </div>
          <div style="margin-top:7px;display:grid;grid-template-columns:repeat(3,1fr);gap:5px;">
            <div style="height:26px;background:${p.elevated};border:1px solid ${p.border};border-radius:3px;"></div>
            <div style="height:26px;background:${p.elevated};border:1px solid ${p.border};border-radius:3px;"></div>
            <div style="height:26px;background:${p.elevated};border:1px solid ${p.border};border-radius:3px;"></div>
          </div>
        </div>
        <div style="display:flex;gap:4px;">
          ${[p.canvas, p.surface, p.border, p.ink, p.accent]
            .map(
              (hex) =>
                `<span style="flex:1;height:6px;background:${hex};border:1px solid ${p.border};display:inline-block;"></span>`
            )
            .join("")}
        </div>
      </div>
    </div>`;
}

export function renderCategoryMiniStack(cat) {
  let frontInner = "";
  if (cat.miniKind === "hero") {
    frontInner = `
      <div style="text-align:center;padding-top:2px;">
        <span style="display:inline-block;padding:1px 6px;border:1px solid var(--border-strong);font-family:var(--font-mono);font-size:8px;color:var(--accent-text);">v2.4</span>
        <div style="margin-top:5px;font-size:11.5px;font-weight:600;line-height:1.15;color:var(--text-primary);">Production UI with real protocols</div>
        <div style="margin-top:8px;display:grid;grid-template-columns:repeat(3,1fr);gap:4px;">
          <div style="padding:3px;border:1px solid var(--border-hairline);font-family:var(--font-mono);font-size:8.5px;">550+</div>
          <div style="padding:3px;border:1px solid var(--border-hairline);font-family:var(--font-mono);font-size:8.5px;">14ms</div>
          <div style="padding:3px;border:1px solid var(--border-hairline);font-family:var(--font-mono);font-size:8.5px;">99.9%</div>
        </div>
      </div>`;
  } else if (cat.miniKind === "pricing") {
    frontInner = `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;height:100%;">
        ${["$0", "$29", "$99"]
          .map(
            (price, idx) => `
          <div style="border:1px solid ${idx === 1 ? "var(--accent-border)" : "var(--border-hairline)"};padding:6px;background:var(--bg-surface);">
            <div class="font-mono-ui" style="font-size:10px;font-weight:700;color:${idx === 1 ? "var(--accent-text)" : "var(--text-primary)"};">${price}</div>
            <div style="margin-top:6px;height:3px;width:85%;background:var(--gray-300);"></div>
            <div style="margin-top:4px;height:3px;width:60%;background:var(--gray-200);"></div>
          </div>`
          )
          .join("")}
      </div>`;
  } else if (cat.miniKind === "auth") {
    frontInner = `
      <div style="display:flex;flex-direction:column;gap:5px;">
        <div style="font-size:10px;font-weight:600;">Continue with Passkey</div>
        <div style="height:18px;border:1px solid var(--border-hairline);padding:0 6px;display:flex;align-items:center;font-family:var(--font-mono);font-size:8.5px;color:var(--text-subtle);">dev@company.com</div>
        <div style="height:18px;background:var(--contrast-bg);color:var(--contrast-fg);display:flex;align-items:center;justify-content:center;font-size:8.5px;font-weight:600;">Sign in →</div>
      </div>`;
  } else if (cat.miniKind === "cmdk") {
    frontInner = `
      <div>
        <div style="display:flex;justify-content:space-between;padding-bottom:5px;border-bottom:1px solid var(--border-hairline);font-family:var(--font-mono);font-size:8.5px;color:var(--text-subtle);">
          <span>Search protocol…</span><span>⌘K</span>
        </div>
        <div style="margin-top:6px;padding:4px 6px;background:var(--gray-100);display:flex;justify-content:space-between;font-size:9px;">
          <span>Linear DESIGN.md</span><span class="font-mono-ui" style="color:var(--accent-text);">↵</span>
        </div>
        <div style="margin-top:3px;padding:3px 6px;display:flex;justify-content:space-between;font-size:9px;color:var(--text-muted);">
          <span>Hero Telemetry</span><span class="font-mono-ui">tsx</span>
        </div>
      </div>`;
  } else if (cat.miniKind === "table") {
    frontInner = `
      <div style="font-family:var(--font-mono);font-size:8.5px;">
        <div style="display:flex;justify-content:space-between;padding-bottom:4px;border-bottom:1px solid var(--border-hairline);color:var(--text-subtle);">
          <span>ASSET</span><span>LATENCY</span>
        </div>
        ${[
          ["linear.app", "12ms"],
          ["hero-counter", "14ms"],
          ["auth-passkey", "09ms"]
        ]
          .map(
            ([a, b]) =>
              `<div style="display:flex;justify-content:space-between;padding-top:5px;"><span>${a}</span><span style="color:var(--accent-text);">${b}</span></div>`
          )
          .join("")}
      </div>`;
  } else if (cat.miniKind === "page") {
    frontInner = `
      <div style="display:grid;grid-template-columns:34px 1fr;gap:6px;height:100%;">
        <div style="border-right:1px solid var(--border-hairline);padding-right:4px;display:flex;flex-direction:column;gap:4px;">
          <div style="height:4px;background:var(--accent-text);width:80%;"></div>
          <div style="height:3px;background:var(--gray-300);width:100%;"></div>
          <div style="height:3px;background:var(--gray-300);width:70%;"></div>
        </div>
        <div style="display:flex;flex-direction:column;gap:5px;">
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;">
            <div style="height:18px;border:1px solid var(--border-hairline);background:var(--bg-surface);"></div>
            <div style="height:18px;border:1px solid var(--border-hairline);background:var(--bg-surface);"></div>
            <div style="height:18px;border:1px solid var(--border-hairline);background:var(--bg-surface);"></div>
          </div>
          <div style="flex:1;border:1px solid var(--border-hairline);background:var(--bg-surface);"></div>
        </div>
      </div>`;
  } else if (cat.miniKind === "motion") {
    frontInner = `
      <div style="display:flex;flex-direction:column;justify-content:space-between;height:82px;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;">
          <span class="font-mono-ui" style="font-size:16px;font-weight:700;color:var(--text-primary);">99.9<span style="color:var(--accent-text);">%</span></span>
          <span class="font-mono-ui" style="font-size:8.5px;color:var(--text-subtle);">60 FPS</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:3px;">
          <span style="height:3px;background:var(--accent-fill);"></span>
          <span style="height:3px;background:var(--accent-fill);"></span>
          <span style="height:3px;background:var(--accent-fill);"></span>
          <span style="height:3px;background:var(--gray-300);"></span>
          <span style="height:3px;background:var(--gray-300);"></span>
        </div>
      </div>`;
  } else {
    // bento / quotes
    frontInner = `
      <div style="display:grid;grid-template-columns:1.4fr 1fr;gap:5px;height:82px;">
        <div style="border:1px solid var(--border-hairline);background:var(--bg-surface);padding:6px;">
          <div class="font-mono-ui" style="font-size:8.5px;color:var(--accent-text);">01 · SYNC</div>
          <div style="margin-top:6px;height:4px;width:85%;background:var(--gray-300);"></div>
          <div style="margin-top:4px;height:4px;width:60%;background:var(--gray-200);"></div>
        </div>
        <div style="display:grid;gap:5px;">
          <div style="border:1px solid var(--border-hairline);background:var(--bg-surface);"></div>
          <div style="border:1px solid var(--border-hairline);background:var(--bg-surface);"></div>
        </div>
      </div>`;
  }

  return `
    <div class="mini-stack" aria-hidden="true">
      <div class="mini-sheet mini-sheet-1"></div>
      <div class="mini-sheet mini-sheet-2"></div>
      <div class="mini-sheet mini-sheet-3">${frontInner}</div>
    </div>`;
}

/**
 * Renders either a compact 16:10 Level 2 gallery thumbnail OR the full Level 3 interactive workbench stage.
 */
export function renderAssetStage(item, tokens, viewport = "desktop", compact = false) {
  const tk = tokens;
  const isMob = !compact && viewport === "mobile";
  const pad = compact ? "16px" : isMob ? "18px" : tk.padStage;
  const cardPad = compact ? "10px" : tk.padCard;
  const gap = compact ? "8px" : tk.gap;

  if (item.archetype === "telemetry-hero") {
    return `
      <div style="background:${tk.canvas};color:${tk.ink};padding:${pad};text-align:center;">
        <span style="display:inline-flex;align-items:center;gap:6px;padding:2px 9px;background:${tk.surface};border:1px solid ${tk.border};border-radius:${tk.badge};font-family:var(--font-mono);font-size:${compact ? "9px" : "11px"};color:${tk.muted};">
          <span style="width:6px;height:6px;border-radius:999px;background:${tk.accent};display:inline-block;"></span>
          DESIGN.MD VERIFIED
        </span>
        <h3 style="margin:${compact ? "8px" : "14px"} auto 0;max-width:560px;font-family:${tk.fontDisplay};font-size:${compact ? "16px" : isMob ? "24px" : "34px"};font-weight:700;line-height:1.08;letter-spacing:-0.03em;">
          Ship authentic interfaces without generic AI templates.
        </h3>
        ${compact ? "" : `<p style="margin:10px auto 0;max-width:480px;font-size:13.5px;color:${tk.muted};">Synchronized color tokens, radius ladders, and tabular telemetry ready for React, Vue, Svelte, and Solid.</p>`}
        <div style="margin-top:${compact ? "10px" : "18px"};display:flex;flex-wrap:wrap;justify-content:center;gap:8px;">
          <span style="display:inline-flex;align-items:center;height:${compact ? "26px" : tk.btnH};padding:0 14px;background:${tk.accent};color:${tk.accentFg};border-radius:${tk.ctrl};font-size:${compact ? "10.5px" : "12.5px"};font-weight:600;">Explore Catalog →</span>
          <span style="display:inline-flex;align-items:center;height:${compact ? "26px" : tk.btnH};padding:0 14px;background:${tk.surface};border:1px solid ${tk.border};color:${tk.ink};border-radius:${tk.ctrl};font-size:${compact ? "10.5px" : "12.5px"};">Copy CLI</span>
        </div>
        <div style="margin-top:${compact ? "12px" : "22px"};display:grid;grid-template-columns:repeat(${isMob ? 2 : 4},minmax(0,1fr));border:1px solid ${tk.border};background:${tk.surface};border-radius:${tk.card};overflow:hidden;">
          ${[
            ["550", "+", "Web Specs"],
            ["180", "+", "Mobile Apps"],
            ["99.9", "%", "Token Fidelity"],
            ["14", "ms", "MCP Lookup"]
          ]
            .map(
              ([num, suf, lbl], idx) => `
            <div style="padding:${cardPad};border-right:${idx < 3 ? `1px solid ${tk.border}` : "0"};">
              <div class="font-mono-ui" style="font-size:${compact ? "13px" : "21px"};font-weight:700;">
                <span class="js-anim-counter" data-target="${num}">${num}</span><span style="color:${tk.accent};">${suf}</span>
              </div>
              <div style="margin-top:2px;font-size:${compact ? "9px" : "11px"};color:${tk.muted};">${lbl}</div>
            </div>`
            )
            .join("")}
        </div>
      </div>`;
  }

  if (item.archetype === "cli-hero" || item.archetype === "editorial-hero") {
    const isSerif = item.archetype === "editorial-hero";
    return `
      <div style="background:${tk.canvas};color:${tk.ink};padding:${pad};display:grid;grid-template-columns:${isMob || compact ? "1fr" : "1.15fr 0.85fr"};gap:${gap};align-items:center;">
        <div>
          <div class="font-mono-ui" style="font-size:10px;text-transform:uppercase;letter-spacing:0.08em;color:${tk.accent};">${item.subcat}</div>
          <h3 style="margin:8px 0 0;font-family:${isSerif ? "var(--font-serif)" : tk.fontDisplay};font-size:${compact ? "17px" : isMob ? "25px" : "32px"};font-weight:600;line-height:1.08;letter-spacing:-0.025em;">
            ${isSerif ? "Software crafted with editorial calm." : "One protocol file. Zero visual drift."}
          </h3>
          <div style="margin-top:12px;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 12px;background:${tk.surface};border:1px solid ${tk.border};border-radius:${tk.ctrl};font-family:var(--font-mono);font-size:${compact ? "9.5px" : "12px"};">
            <span class="truncate-1"><span style="color:${tk.accent};">$</span> npx uifino@latest add ${item.id}</span>
            <span style="color:${tk.muted};font-size:10px;">COPY</span>
          </div>
        </div>
        ${
          compact
            ? ""
            : `<div style="background:${tk.surface};border:1px solid ${tk.border};border-radius:${tk.card};padding:${cardPad};font-family:var(--font-mono);font-size:11.5px;">
                <div style="display:flex;justify-content:space-between;padding-bottom:8px;border-bottom:1px solid ${tk.border};color:${tk.muted};">
                  <span>DESIGN.md</span><span style="color:${tk.accent};">radius: ${tk.card}</span>
                </div>
                <div style="margin-top:8px;line-height:1.6;color:${tk.muted};">
                  canvas: <span style="color:${tk.ink};">${tk.canvas}</span><br/>
                  accent: <span style="color:${tk.accent};">${tk.accent}</span><br/>
                  density: <span style="color:${tk.ink};">${tk.density}</span>
                </div>
              </div>`
        }
      </div>`;
  }

  if (item.archetype === "pricing-tiers") {
    return `
      <div style="background:${tk.canvas};color:${tk.ink};padding:${pad};">
        <div style="display:grid;grid-template-columns:repeat(${isMob ? 1 : 3},minmax(0,1fr));gap:${gap};">
          ${[
            { tier: "Starter", price: "$0", note: "Public DESIGN.md & core blocks", hot: false },
            { tier: "Pro", price: "$24", note: "Full MCP server + 4 frameworks", hot: true },
            { tier: "Team", price: "$79", note: "Private brand tokens & CI sync", hot: false }
          ]
            .map(
              (t) => `
            <div style="background:${tk.surface};border:1px solid ${t.hot ? tk.accent : tk.border};border-radius:${tk.card};padding:${cardPad};display:flex;flex-direction:column;justify-content:space-between;gap:10px;">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <span style="font-size:12px;font-weight:600;">${t.tier}</span>
                  ${t.hot ? `<span style="padding:1px 6px;background:${tk.accent};color:${tk.accentFg};border-radius:${tk.badge};font-family:var(--font-mono);font-size:9px;font-weight:700;">POPULAR</span>` : ""}
                </div>
                <div class="font-mono-ui" style="margin-top:6px;font-size:${compact ? "16px" : "24px"};font-weight:700;">${t.price}<span style="font-size:11px;font-weight:400;color:${tk.muted};">/mo</span></div>
                ${compact ? "" : `<p style="margin:6px 0 0;font-size:12px;color:${tk.muted};">${t.note}</p>`}
              </div>
              <span style="display:flex;align-items:center;justify-content:center;height:${compact ? "24px" : tk.btnH};border-radius:${tk.ctrl};background:${t.hot ? tk.accent : tk.elevated};color:${t.hot ? tk.accentFg : tk.ink};border:1px solid ${tk.border};font-size:11px;font-weight:600;">Select ${t.tier}</span>
            </div>`
            )
            .join("")}
        </div>
      </div>`;
  }

  if (item.archetype === "auth-card") {
    return `
      <div style="background:${tk.canvas};color:${tk.ink};padding:${pad};display:flex;justify-content:center;">
        <div style="width:100%;max-width:360px;background:${tk.surface};border:1px solid ${tk.border};border-radius:${tk.card};padding:${cardPad};display:grid;gap:${compact ? "7px" : "12px"};">
          <div>
            <div style="font-size:${compact ? "13px" : "16px"};font-weight:600;">Sign in to Workspace</div>
            ${compact ? "" : `<div style="margin-top:2px;font-size:12px;color:${tk.muted};">Authenticate with Passkey or work email</div>`}
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div style="height:${compact ? "24px" : "32px"};border:1px solid ${tk.border};border-radius:${tk.ctrl};display:flex;align-items:center;justify-content:center;font-size:11px;">GitHub</div>
            <div style="height:${compact ? "24px" : "32px"};border:1px solid ${tk.border};border-radius:${tk.ctrl};display:flex;align-items:center;justify-content:center;font-size:11px;">Passkey</div>
          </div>
          <div style="height:${compact ? "26px" : "34px"};padding:0 10px;background:${tk.canvas};border:1px solid ${tk.border};border-radius:${tk.ctrl};display:flex;align-items:center;font-family:var(--font-mono);font-size:11px;color:${tk.muted};">engineer@acme.dev</div>
          <div style="height:${compact ? "26px" : tk.btnH};background:${tk.accent};color:${tk.accentFg};border-radius:${tk.ctrl};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;">Continue →</div>
        </div>
      </div>`;
  }

  if (item.archetype === "cmdk-palette") {
    return `
      <div style="background:${tk.canvas};color:${tk.ink};padding:${pad};display:flex;justify-content:center;">
        <div style="width:100%;max-width:460px;background:${tk.surface};border:1px solid ${tk.border};border-radius:${tk.card};overflow:hidden;">
          <div style="padding:10px 14px;border-bottom:1px solid ${tk.border};display:flex;justify-content:space-between;align-items:center;font-size:12px;color:${tk.muted};">
            <span>Jump to DESIGN.md, block, or tool…</span>
            <span class="font-mono-ui" style="padding:1px 5px;border:1px solid ${tk.border};border-radius:${tk.badge};font-size:10px;">ESC</span>
          </div>
          <div style="padding:8px;display:grid;gap:4px;font-size:12px;">
            <div style="padding:7px 10px;background:${tk.elevated};border-radius:${tk.ctrl};display:flex;justify-content:space-between;align-items:center;">
              <span>Linear DESIGN.md Protocol</span>
              <span class="font-mono-ui" style="font-size:10.5px;color:${tk.accent};">Catalog ↵</span>
            </div>
            <div style="padding:7px 10px;display:flex;justify-content:space-between;align-items:center;color:${tk.muted};">
              <span>Telemetry Counter Hero</span>
              <span class="font-mono-ui" style="font-size:10.5px;">Section</span>
            </div>
            ${compact ? "" : `<div style="padding:7px 10px;display:flex;justify-content:space-between;align-items:center;color:${tk.muted};"><span>Chartreuse Aurora Studio</span><span class="font-mono-ui" style="font-size:10.5px;">Tool</span></div>`}
          </div>
        </div>
      </div>`;
  }

  if (item.archetype === "data-table") {
    return `
      <div style="background:${tk.canvas};color:${tk.ink};padding:${pad};">
        <div style="border:1px solid ${tk.border};background:${tk.surface};border-radius:${tk.card};overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;font-size:${compact ? "10.5px" : "12.5px"};">
            <thead>
              <tr style="border-bottom:1px solid ${tk.border};color:${tk.muted};font-family:var(--font-mono);font-size:10.5px;text-align:left;">
                <th style="padding:8px 12px;">RESOURCE</th>
                <th style="padding:8px 12px;">TYPE</th>
                <th style="padding:8px 12px;">STATUS</th>
                <th style="padding:8px 12px;text-align:right;">LATENCY</th>
              </tr>
            </thead>
            <tbody>
              ${[
                ["linear.app/design-md", "Catalog", "Verified", "11ms"],
                ["hero-telemetry-counter", "Section", "Synced", "14ms"],
                ["auth-passkey-card", "Block", "Synced", "09ms"]
              ]
                .map(
                  ([res, tp, st, lat]) => `
                <tr style="border-bottom:1px solid ${tk.border};">
                  <td class="font-mono-ui" style="padding:8px 12px;font-weight:500;">${res}</td>
                  <td style="padding:8px 12px;color:${tk.muted};">${tp}</td>
                  <td style="padding:8px 12px;"><span style="color:${tk.accent};">●</span> ${st}</td>
                  <td class="font-mono-ui" style="padding:8px 12px;text-align:right;">${lat}</td>
                </tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>`;
  }

  if (item.archetype === "page-shell") {
    return `
      <div style="background:${tk.canvas};color:${tk.ink};padding:${compact ? "12px" : "18px"};">
        <div style="border:1px solid ${tk.border};border-radius:${tk.card};overflow:hidden;background:${tk.surface};">
          <div style="padding:8px 12px;border-bottom:1px solid ${tk.border};display:flex;justify-content:space-between;align-items:center;font-size:11px;">
            <span style="font-weight:700;">acme.dev</span>
            <span style="padding:2px 8px;background:${tk.accent};color:${tk.accentFg};border-radius:${tk.ctrl};font-size:10px;font-weight:600;">Deploy</span>
          </div>
          <div style="display:grid;grid-template-columns:${isMob ? "1fr" : "140px 1fr"};">
            ${
              isMob
                ? ""
                : `<div style="border-right:1px solid ${tk.border};padding:10px;display:grid;gap:6px;align-content:start;font-size:11px;color:${tk.muted};">
                    <div style="color:${tk.ink};font-weight:600;">Overview</div>
                    <div>Protocols</div>
                    <div>Telemetry</div>
                    <div>API Tokens</div>
                  </div>`
            }
            <div style="padding:${cardPad};display:grid;gap:${gap};">
              <div style="display:grid;grid-template-columns:repeat(${isMob ? 1 : 3},1fr);gap:8px;">
                ${[
                  ["Requests", "1.42M"],
                  ["P99", "18ms"],
                  ["Errors", "0.01%"]
                ]
                  .map(
                    ([k, v]) => `
                  <div style="padding:8px 10px;background:${tk.canvas};border:1px solid ${tk.border};border-radius:${tk.ctrl};">
                    <div style="font-size:10px;color:${tk.muted};">${k}</div>
                    <div class="font-mono-ui" style="margin-top:2px;font-size:15px;font-weight:700;">${v}</div>
                  </div>`
                  )
                  .join("")}
              </div>
              <div style="padding:10px;background:${tk.canvas};border:1px solid ${tk.border};border-radius:${tk.ctrl};font-family:var(--font-mono);font-size:11px;color:${tk.muted};">
                ✓ All sections aligned to ${tk.skinName} token contract (${tk.card} radius)
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  if (item.archetype === "motion-lab") {
    return `
      <div style="background:${tk.canvas};color:${tk.ink};padding:${pad};display:grid;gap:${gap};">
        <div style="display:grid;grid-template-columns:repeat(${isMob ? 1 : 3},1fr);gap:${gap};">
          ${[
            ["99.98", "%", "Frame Stability"],
            ["14.2", "ms", "Spring Settle"],
            ["60", "fps", "Compositor Only"]
          ]
            .map(
              ([v, u, l]) => `
            <div class="js-spotlight-card" style="background:${tk.surface};border:1px solid ${tk.border};border-radius:${tk.card};padding:${cardPad};">
              <div class="font-mono-ui" style="font-size:${compact ? "16px" : "24px"};font-weight:700;">
                <span class="js-anim-counter" data-target="${v}">${v}</span><span style="color:${tk.accent};">${u}</span>
              </div>
              <div style="margin-top:4px;font-size:11.5px;color:${tk.muted};">${l}</div>
            </div>`
            )
            .join("")}
        </div>
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;">
          ${[0, 1, 2, 3, 4]
            .map(
              (idx) =>
                `<div style="height:4px;border-radius:${tk.badge};background:${idx < 3 ? tk.accent : tk.border};"></div>`
            )
            .join("")}
        </div>
      </div>`;
  }

  // Default: bento-grid
  return `
    <div style="background:${tk.canvas};color:${tk.ink};padding:${pad};">
      <div style="display:grid;grid-template-columns:${isMob ? "1fr" : "1.35fr 1fr"};gap:${gap};">
        <div style="background:${tk.surface};border:1px solid ${tk.border};border-radius:${tk.card};padding:${cardPad};display:flex;flex-direction:column;justify-content:space-between;min-width:0;">
          <div>
            <span class="font-mono-ui" style="font-size:10px;color:${tk.accent};">01 · PROTOCOL MATRIX</span>
            <div style="margin-top:6px;font-size:${compact ? "14px" : "18px"};font-weight:600;">Zero-drift design tokens</div>
          </div>
          <div style="margin-top:12px;padding:8px 10px;background:${tk.canvas};border:1px solid ${tk.border};border-radius:${tk.ctrl};font-family:var(--font-mono);font-size:11px;color:${tk.muted};" class="truncate-1">
            radius: ${tk.card} · density: ${tk.density}
          </div>
        </div>
        <div style="display:grid;gap:${gap};min-width:0;">
          <div style="background:${tk.surface};border:1px solid ${tk.border};border-radius:${tk.card};padding:${cardPad};">
            <span class="font-mono-ui" style="font-size:10px;color:${tk.muted};">02 · FRAMEWORKS</span>
            <div style="margin-top:4px;font-family:var(--font-mono);font-size:12px;font-weight:600;">React · Vue · Svelte · Solid</div>
          </div>
          <div style="background:${tk.surface};border:1px solid ${tk.border};border-radius:${tk.card};padding:${cardPad};">
            <span class="font-mono-ui" style="font-size:10px;color:${tk.muted};">03 · MCP READY</span>
            <div style="margin-top:4px;font-family:var(--font-mono);font-size:12px;color:${tk.accent};">14ms retrieval</div>
          </div>
        </div>
      </div>
    </div>`;
}
