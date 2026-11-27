// Pure Core Business Logic — Token Computation, DESIGN.md Export, Multi-Framework Code Gen, Tools & MCP Search
import { CATALOG_ITEMS } from "../data/catalog-data.js";
import { COMPONENT_CATEGORIES, getAllAssetsFlat } from "../data/components-data.js";
import { BG_PRESETS, SHADOW_PRESETS } from "../data/tools-mcp-data.js";

const RADIUS_MAP = {
  0: { card: "0px", ctrl: "0px", badge: "0px", twCard: "rounded-none", twCtrl: "rounded-none" },
  4: { card: "4px", ctrl: "4px", badge: "2px", twCard: "rounded-[4px]", twCtrl: "rounded-[4px]" },
  8: { card: "8px", ctrl: "6px", badge: "4px", twCard: "rounded-lg", twCtrl: "rounded-md" },
  12: { card: "12px", ctrl: "8px", badge: "6px", twCard: "rounded-xl", twCtrl: "rounded-lg" },
  16: { card: "16px", ctrl: "9999px", badge: "9999px", twCard: "rounded-2xl", twCtrl: "rounded-full" }
};

const DENSITY_MAP = {
  compact: {
    padStage: "20px",
    padCard: "12px",
    gap: "10px",
    btnH: "32px",
    twPadStage: "p-5",
    twPadCard: "p-3",
    twGap: "gap-2.5"
  },
  default: {
    padStage: "32px",
    padCard: "18px",
    gap: "16px",
    btnH: "36px",
    twPadStage: "p-8",
    twPadCard: "p-4",
    twGap: "gap-4"
  },
  spacious: {
    padStage: "48px",
    padCard: "26px",
    gap: "24px",
    btnH: "42px",
    twPadStage: "p-12",
    twPadCard: "p-6",
    twGap: "gap-6"
  }
};

/**
 * Computes concrete visual tokens & Tailwind classes for the 3-column workbench.
 */
export function computeWorkbenchTokens({ radius = 8, density = "default", skinId = "default", mode = "dark" } = {}) {
  const rKey = Object.prototype.hasOwnProperty.call(RADIUS_MAP, radius) ? Number(radius) : 8;
  const r = RADIUS_MAP[rKey];
  const d = DENSITY_MAP[density] || DENSITY_MAP.default;

  let palette;
  let fontDisplay = "var(--font-sans)";
  let skinName = "uifino Architectural";

  if (skinId && skinId !== "default") {
    const brand = CATALOG_ITEMS.find((b) => b.id === skinId);
    if (brand) {
      palette = mode === "light" ? brand.light : brand.dark;
      fontDisplay = brand.fonts.serif ? "var(--font-serif)" : "var(--font-sans)";
      skinName = brand.name;
    }
  }

  if (!palette) {
    palette =
      mode === "light"
        ? {
            canvas: "#F5F4F0",
            surface: "#FFFFFF",
            elevated: "#EAE8E1",
            border: "#D8D4CA",
            ink: "#1B1A17",
            muted: "#646058",
            accent: "#1B1A17",
            accentFg: "#FFFFFF"
          }
        : {
            canvas: "#161618",
            surface: "#1D1D20",
            elevated: "#26262A",
            border: "#29292E",
            ink: "#ECECEE",
            muted: "#A0A0A8",
            accent: "#CEFF00",
            accentFg: "#111113"
          };
  }

  return {
    radius: rKey,
    density: DENSITY_MAP[density] ? density : "default",
    mode: mode === "light" ? "light" : "dark",
    skinId: skinId || "default",
    skinName,
    fontDisplay,
    ...r,
    ...d,
    ...palette
  };
}

/**
 * Generates standardized DESIGN.md protocol specification for any Website or Mobile App catalog item.
 */
export function generateDesignMd(entry) {
  const item = entry || CATALOG_ITEMS[0];
  return `---
protocol: uifino/design-md@1.0
name: "${item.name} Design System"
slug: "${item.slug}"
platform: "${item.kind}"
category: "${item.category}"
typography:
  display: "${item.fonts.display}"
  body: "${item.fonts.body}"
  mono: "${item.fonts.mono}"
  headline_tracking: "${item.fonts.tracking}"
tokens:
  default_radius: "${item.defaultRadius}"
  radius_ladder: [${item.radiusScale.map((x) => `"${x}"`).join(", ")}]
  spacing_px: [${item.spacingScale.join(", ")}]
colors:
  light:
    canvas: "${item.light.canvas}"
    surface: "${item.light.surface}"
    elevated: "${item.light.elevated}"
    border: "${item.light.border}"
    ink: "${item.light.ink}"
    muted: "${item.light.muted}"
    accent: "${item.light.accent}"
    accent_foreground: "${item.light.accentFg}"
  dark:
    canvas: "${item.dark.canvas}"
    surface: "${item.dark.surface}"
    elevated: "${item.dark.elevated}"
    border: "${item.dark.border}"
    ink: "${item.dark.ink}"
    muted: "${item.dark.muted}"
    accent: "${item.dark.accent}"
    accent_foreground: "${item.dark.accentFg}"
---

# ${item.name} — DESIGN.md Protocol

## 1. Visual Direction
${item.summaryEn}

## 2. Surface & Color Rules
- **Light Canvas / Surface**: \`${item.light.canvas}\` / \`${item.light.surface}\` with \`1px solid ${item.light.border}\` dividers.
- **Dark Canvas / Surface**: \`${item.dark.canvas}\` / \`${item.dark.surface}\` with \`1px solid ${item.dark.border}\` dividers.
- **Single Chromatic Accent**: \`${item.dark.accent}\` (dark) / \`${item.light.accent}\` (light) — never pair with arbitrary secondary gradients.

## 3. Typography & Rhythm
- Display face \`${item.fonts.display}\` with \`${item.fonts.tracking}\` tracking; body copy in \`${item.fonts.body}\`; numeric data in \`${item.fonts.mono}\` (\`tabular-nums\`).
- Base spacing ladder: \`${item.spacingScale.join("px · ")}px\`. Default container radius: \`${item.defaultRadius}\`.

## 4. Implementation Guardrails for AI Agents
${item.rules.map((r, i) => `${i + 1}. ${r}`).join("\n")}
`;
}

export function getComponentFileList(item, framework = "react") {
  const ext = framework === "vue" ? "vue" : framework === "svelte" ? "svelte" : "tsx";
  const pascal = item.id
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
  return [`${pascal}.${ext}`, "tokens.css", "DESIGN.md"];
}

/**
 * Generates multi-framework source code reflecting live radius, density & brand skin tokens.
 */
export function generateFrameworkCode(item, category, framework = "react", tokens, activeFile = "") {
  const tk = tokens || computeWorkbenchTokens();
  const files = getComponentFileList(item, framework);
  const targetFile = activeFile && files.includes(activeFile) ? activeFile : files[0];

  if (targetFile === "tokens.css") {
    return `:root {\n  /* Skin: ${tk.skinName} (${tk.mode}) */\n  --ui-canvas: ${tk.canvas};\n  --ui-surface: ${tk.surface};\n  --ui-border: ${tk.border};\n  --ui-ink: ${tk.ink};\n  --ui-muted: ${tk.muted};\n  --ui-accent: ${tk.accent};\n  --ui-accent-fg: ${tk.accentFg};\n  --ui-radius-card: ${tk.card};\n  --ui-radius-ctrl: ${tk.ctrl};\n  --ui-pad-stage: ${tk.padStage};\n  --ui-pad-card: ${tk.padCard};\n  --ui-gap: ${tk.gap};\n}`;
  }

  if (targetFile === "DESIGN.md") {
    return `---\nasset: "${item.id}"\ntype: "${category.assetType}"\ncategory: "${category.name}"\nradius: "${tk.card}"\ndensity: "${tk.density}"\nskin: "${tk.skinName}"\n---\n\n# ${item.name}\n\n${item.descEn}\n\n## Layout & Motion Contract\n${item.contract.map((c) => `- ${c}`).join("\n")}`;
  }

  const clsOuter = `bg-[${tk.canvas}] text-[${tk.ink}] ${tk.twPadStage}`;
  const clsCard = `border border-[${tk.border}] bg-[${tk.surface}] ${tk.twCard} ${tk.twPadCard}`;
  const clsBtn = `inline-flex items-center px-4 font-medium bg-[${tk.accent}] text-[${tk.accentFg}] ${tk.twCtrl}`;

  if (framework === "vue") {
    return `<script setup lang="ts">
interface MetricItem {
  label: string;
  value: string;
}

const props = withDefaults(defineProps<{
  title?: string;
  metrics?: MetricItem[];
}>(), {
  title: "${item.name}",
  metrics: () => [
    { label: "Specs", value: "550+" },
    { label: "Latency", value: "14ms" },
    { label: "Match", value: "99.9%" }
  ]
});
</script>

<template>
  <section class="${clsOuter}">
    <div class="mx-auto max-w-5xl grid ${tk.twGap}">
      <header class="${clsCard}">
        <p class="font-mono text-xs uppercase text-[${tk.muted}]">${category.assetType} / ${item.subcat}</p>
        <h2 class="mt-2 text-2xl font-semibold tracking-tight">{{ props.title }}</h2>
        <button type="button" class="mt-4 h-9 ${clsBtn}">Run Protocol</button>
      </header>
      <div class="grid grid-cols-1 sm:grid-cols-3 ${tk.twGap}">
        <article v-for="m in props.metrics" :key="m.label" class="${clsCard} min-w-0">
          <div class="font-mono text-xl font-semibold tabular-nums">{{ m.value }}</div>
          <div class="mt-1 text-xs text-[${tk.muted}] truncate">{{ m.label }}</div>
        </article>
      </div>
    </div>
  </section>
</template>`;
  }

  if (framework === "svelte") {
    return `<script lang="ts">
  interface Props {
    title?: string;
  }
  let { title = "${item.name}" }: Props = $props();
  const metrics = [
    { label: "Specs", value: "550+" },
    { label: "Latency", value: "14ms" },
    { label: "Match", value: "99.9%" }
  ];
</script>

<section class="${clsOuter}">
  <div class="mx-auto max-w-5xl grid ${tk.twGap}">
    <header class="${clsCard}">
      <p class="font-mono text-xs uppercase text-[${tk.muted}]">${category.assetType} / ${item.subcat}</p>
      <h2 class="mt-2 text-2xl font-semibold tracking-tight">{title}</h2>
      <button type="button" class="mt-4 h-9 ${clsBtn}">Run Protocol</button>
    </header>
    <div class="grid grid-cols-1 sm:grid-cols-3 ${tk.twGap}">
      {#each metrics as m (m.label)}
        <article class="${clsCard} min-w-0">
          <div class="font-mono text-xl font-semibold tabular-nums">{m.value}</div>
          <div class="mt-1 text-xs text-[${tk.muted}] truncate">{m.label}</div>
        </article>
      {/each}
    </div>
  </div>
</section>`;
  }

  if (framework === "solid") {
    return `import { createSignal, For } from "solid-js";

export function UifinoAssetStage() {
  const [active, setActive] = createSignal(true);
  const metrics = [
    { label: "Specs", value: "550+" },
    { label: "Latency", value: "14ms" },
    { label: "Match", value: "99.9%" }
  ];

  return (
    <section class="${clsOuter}">
      <div class="mx-auto max-w-5xl grid ${tk.twGap}">
        <header class="${clsCard}">
          <p class="font-mono text-xs uppercase text-[${tk.muted}]">${category.assetType} / ${item.subcat}</p>
          <h2 class="mt-2 text-2xl font-semibold tracking-tight">${item.name}</h2>
          <button type="button" onClick={() => setActive(!active())} class="mt-4 h-9 ${clsBtn}">
            {active() ? "Synced" : "Sync Tokens"}
          </button>
        </header>
        <div class="grid grid-cols-1 sm:grid-cols-3 ${tk.twGap}">
          <For each={metrics}>
            {(m) => (
              <article class="${clsCard} min-w-0">
                <div class="font-mono text-xl font-semibold tabular-nums">{m.value}</div>
                <div class="mt-1 text-xs text-[${tk.muted}] truncate">{m.label}</div>
              </article>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}`;
  }

  // Default: React (.tsx, TypeScript strict)
  return `import type { FC } from "react";

export interface AssetStageProps {
  readonly title?: string;
}

const METRICS = [
  { label: "Specs", value: "550+" },
  { label: "Latency", value: "14ms" },
  { label: "Match", value: "99.9%" }
] as const;

export const UifinoAssetStage: FC<AssetStageProps> = ({ title = "${item.name}" }) => {
  return (
    <section className="${clsOuter}">
      <div className="mx-auto max-w-5xl grid ${tk.twGap}">
        <header className="${clsCard}">
          <p className="font-mono text-xs uppercase text-[${tk.muted}]">
            ${category.assetType} / ${item.subcat}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h2>
          <button type="button" className="mt-4 h-9 ${clsBtn}">
            Apply Protocol
          </button>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-3 ${tk.twGap}">
          {METRICS.map((m) => (
            <article key={m.label} className="${clsCard} min-w-0">
              <div className="font-mono text-xl font-semibold tabular-nums">{m.value}</div>
              <div className="mt-1 text-xs text-[${tk.muted}] truncate">{m.label}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};`;
}

function hexToRgba(hex, alpha) {
  const clean = String(hex || "#ceff00").replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean.padEnd(6, "0");
  const r = parseInt(full.slice(0, 2), 16) || 0;
  const g = parseInt(full.slice(2, 4), 16) || 0;
  const b = parseInt(full.slice(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${Number(alpha).toFixed(2)})`;
}

/**
 * Generates live preview style + CSS / Tailwind code for the Background Studio.
 */
export function generateBackgroundOutput(params = {}, format = "css") {
  const engine = params.engine || "grid";
  const canvas = params.canvas || "#161618";
  const accent = params.accent || "#ceff00";
  const secondary = params.secondary || "#38bdf8";
  const cellSize = Math.max(8, Number(params.cellSize) || 32);
  const opacity = Math.min(100, Math.max(2, Number(params.opacity) || 30)) / 100;
  const spread = Math.min(100, Math.max(20, Number(params.spread) || 68));
  const noise = Math.min(80, Math.max(0, Number(params.noise) || 0));

  const strokeRgba = hexToRgba(accent, opacity);
  const secRgba = hexToRgba(secondary, opacity * 0.75);

  let bgImage = "";
  let bgSize = "";
  let twSnippet = "";

  if (engine === "grid") {
    bgImage = `radial-gradient(circle at 50% 35%, ${hexToRgba(accent, opacity * 0.35)}, transparent ${spread}%), linear-gradient(to right, ${strokeRgba} 1px, transparent 1px), linear-gradient(to bottom, ${strokeRgba} 1px, transparent 1px)`;
    bgSize = `100% 100%, ${cellSize}px ${cellSize}px, ${cellSize}px ${cellSize}px`;
    twSnippet = `<div class="relative bg-[${canvas}] bg-[linear-gradient(to_right,${strokeRgba.replace(/\s+/g, "")}_1px,transparent_1px),linear-gradient(to_bottom,${strokeRgba.replace(/\s+/g, "")}_1px,transparent_1px)] bg-[size:${cellSize}px_${cellSize}px]">\n  <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_${Math.max(15, spread - 30)}%,${canvas}_100%)]" />\n</div>`;
  } else if (engine === "dots") {
    bgImage = `radial-gradient(circle at 50% 45%, ${hexToRgba(accent, opacity * 0.22)}, transparent ${spread}%), radial-gradient(${strokeRgba} 1.25px, transparent 1.25px)`;
    bgSize = `100% 100%, ${cellSize}px ${cellSize}px`;
    twSnippet = `<div class="bg-[${canvas}] bg-[radial-gradient(${strokeRgba.replace(/\s+/g, "")}_1.25px,transparent_1.25px)] bg-[size:${cellSize}px_${cellSize}px]" />`;
  } else if (engine === "grain") {
    const grainAlpha = Math.max(0.06, noise / 100).toFixed(2);
    bgImage = `radial-gradient(${spread * 7}px circle at 25% 20%, ${hexToRgba(accent, opacity)}, transparent 70%), radial-gradient(${spread * 6}px circle at 80% 75%, ${secRgba}, transparent 70%), repeating-radial-gradient(circle at 17% 32%, rgba(128,128,128,${grainAlpha}) 0, rgba(128,128,128,0) 2px)`;
    bgSize = `100% 100%, 100% 100%, ${Math.max(4, Math.round(cellSize / 5))}px ${Math.max(4, Math.round(cellSize / 5))}px`;
    twSnippet = `<div class="relative overflow-hidden bg-[${canvas}]">\n  <div class="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,${strokeRgba.replace(/\s+/g, "")},transparent_70%)]" />\n  <div class="absolute inset-0 opacity-[${grainAlpha}] mix-blend-overlay [background-image:repeating-radial-gradient(circle_at_17%_32%,#888_0,transparent_2px)]" />\n</div>`;
  } else {
    // aurora
    bgImage = `radial-gradient(${spread * 8}px ellipse at 22% 18%, ${strokeRgba}, transparent 65%), radial-gradient(${spread * 7}px ellipse at 78% 28%, ${secRgba}, transparent 68%), linear-gradient(180deg, transparent 0%, ${canvas} 96%)`;
    bgSize = "100% 100%";
    twSnippet = `<div class="bg-[${canvas}] [background-image:radial-gradient(${spread * 8}px_ellipse_at_22%_18%,${strokeRgba.replace(/\s+/g, "")},transparent_65%),radial-gradient(${spread * 7}px_ellipse_at_78%_28%,${secRgba.replace(/\s+/g, "")},transparent_68%)]" />`;
  }

  const inlineStyle = `background-color:${canvas};background-image:${bgImage};background-size:${bgSize};`;
  const cssCode = `.uifino-surface-bg {\n  background-color: ${canvas};\n  background-image:\n    ${bgImage.split(", linear-gradient").join(",\n    linear-gradient").split(", radial-gradient").join(",\n    radial-gradient")};\n  background-size: ${bgSize};\n}`;

  return {
    inlineStyle,
    code: format === "tailwind" ? twSnippet : cssCode
  };
}

/**
 * Generates multi-layer box-shadow & surface token CSS / Tailwind code for Shadow & Token Lab.
 */
export function generateShadowOutput(params = {}, format = "css") {
  const mode = params.mode === "light" ? "light" : "dark";
  const y = Number(params.yOffset ?? 12);
  const blur = Math.max(0, Number(params.blur ?? 28));
  const spread = Number(params.spread ?? -4);
  const op = Math.min(90, Math.max(0, Number(params.opacity ?? 40))) / 100;
  const rim = Math.min(40, Math.max(0, Number(params.rimLight ?? 10))) / 100;
  const borderAlpha = Math.min(50, Math.max(4, Number(params.borderAlpha ?? 16))) / 100;
  const radius = Math.max(0, Number(params.radius ?? 8));

  const layers = [];
  if (rim > 0) {
    layers.push(`inset 0 1px 0 0 rgba(255, 255, 255, ${rim.toFixed(2)})`);
  }
  if (op > 0 && (blur > 0 || y > 0)) {
    const keyAlpha = Math.max(0.04, op * 0.55).toFixed(2);
    layers.push(`0 ${Math.max(1, Math.round(y * 0.35))}px ${Math.max(2, Math.round(blur * 0.35))}px 0 rgba(0, 0, 0, ${keyAlpha})`);
    layers.push(`0 ${y}px ${blur}px ${spread}px rgba(0, 0, 0, ${op.toFixed(2)})`);
  }
  const boxShadow = layers.length ? layers.join(", ") : "none";

  const surfaceBg = mode === "light" ? "#FFFFFF" : "#1D1D20";
  const canvasBg = mode === "light" ? "#F2F3F6" : "#121215";
  const borderCol = mode === "light" ? `rgba(15, 23, 42, ${borderAlpha.toFixed(2)})` : `rgba(255, 255, 255, ${borderAlpha.toFixed(2)})`;
  const ink = mode === "light" ? "#111827" : "#ECECEE";
  const muted = mode === "light" ? "#64748B" : "#9CA3AF";

  const cssCode = `:root {\n  --surface-bg: ${surfaceBg};\n  --surface-border: ${borderCol};\n  --surface-radius: ${radius}px;\n  --surface-shadow: ${boxShadow};\n}\n\n.uifino-elevated-card {\n  background: var(--surface-bg);\n  border: 1px solid var(--surface-border);\n  border-radius: var(--surface-radius);\n  box-shadow: var(--surface-shadow);\n}`;

  const twShadow = boxShadow === "none" ? "shadow-none" : `shadow-[${boxShadow.replace(/\s+/g, "_")}]`;
  const twCode = `<div class="bg-[${surfaceBg}] border border-[${borderCol.replace(/\s+/g, "")}] rounded-[${radius}px] ${twShadow} p-5">\n  <!-- Card content -->\n</div>`;

  return {
    canvasBg,
    surfaceBg,
    borderCol,
    ink,
    muted,
    radius,
    boxShadow,
    code: format === "tailwind" ? twCode : cssCode
  };
}

/**
 * Multi-facet MCP retrieval across Catalog DESIGN.md specs, 4-class Components, and Tools.
 */
export function queryMcpAssets({ query = "", style = "all", layout = "all", assetType = "all" } = {}) {
  const terms = String(query || "")
    .toLowerCase()
    .split(/[\s,;/]+/)
    .filter(Boolean);

  const styleMap = {
    "dark-minimal": ["dark", "minimal", "hairline", "saas"],
    "warm-editorial": ["warm", "editorial", "serif", "ai"],
    "monochrome-devtools": ["devtools", "monochrome", "cli", "code", "sharp"],
    "fintech-clean": ["fintech", "clean", "pricing", "light"]
  };
  const styleTokens = styleMap[style] || [];

  const matchedBrands = CATALOG_ITEMS.filter((b) => {
    const hay = [b.name, b.category, b.kind, ...b.tags, b.summaryEn, b.summaryZh].join(" ").toLowerCase();
    const styleOk = !styleTokens.length || styleTokens.some((st) => b.tags.includes(st) || hay.includes(st));
    const queryOk = !terms.length || terms.every((t) => hay.includes(t));
    return styleOk && queryOk;
  });

  const allAssets = getAllAssetsFlat();
  const matchedAssets = allAssets.filter((a) => {
    const typeOk = assetType === "all" || a.assetType === assetType;
    const layoutOk = layout === "all" || a.layout === layout;
    const hay = [a.name, a.subcat, a.assetType, a.layout, ...a.tags, a.descEn, a.descZh].join(" ").toLowerCase();
    const styleOk = !styleTokens.length || styleTokens.some((st) => a.tags.includes(st) || hay.includes(st));
    const queryOk = !terms.length || terms.some((t) => hay.includes(t));
    return typeOk && layoutOk && (styleOk || queryOk) && (!terms.length || queryOk);
  });

  const brandsFinal = matchedBrands.length ? matchedBrands.slice(0, 4) : CATALOG_ITEMS.slice(0, 2);
  const assetsFinal = matchedAssets.length ? matchedAssets.slice(0, 6) : allAssets.slice(0, 4);
  const recommendedTool = style === "warm-editorial" ? BG_PRESETS[4] : style === "fintech-clean" ? BG_PRESETS[3] : BG_PRESETS[0];
  const recommendedShadow = SHADOW_PRESETS[1];

  const payload = {
    protocol: "uifino-mcp/1.0",
    scope: ["catalog", "sections", "blocks", "pages", "motion", "tools"],
    matched_design_md: brandsFinal.map((b) => ({
      slug: b.slug,
      platform: b.kind,
      cli: `npx uifino@latest add design/${b.id}`,
      accent: b.dark.accent,
      defaultRadius: b.defaultRadius
    })),
    matched_components: assetsFinal.map((a) => ({
      id: `${a.categoryId}/${a.id}`,
      type: a.assetType,
      layout: a.layout,
      cli: `npx uifino@latest add ${a.assetType}/${a.id}`
    })),
    surface_preset: {
      background: recommendedTool.id,
      elevation: recommendedShadow.id
    }
  };

  return {
    brands: brandsFinal,
    assets: assetsFinal,
    toolPreset: recommendedTool,
    shadowPreset: recommendedShadow,
    jsonPayload: JSON.stringify(payload, null, 2)
  };
}
