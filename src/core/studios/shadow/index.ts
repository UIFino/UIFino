import type {
  ShadowElevationTier,
  ShadowStudioOutput,
  ShadowStudioParams,
  StudioCodeFormat
} from "./types";

export * from "./types";

function buildLayeredShadow(
  yBase: number,
  blurBase: number,
  spread: number,
  opacityRatio: number,
  rimRatio: number,
  multiplier: number
): string {
  const layers: string[] = [];
  if (rimRatio > 0) {
    layers.push(`inset 0 1px 0 0 rgba(255, 255, 255, ${(rimRatio * Math.min(1.4, multiplier)).toFixed(2)})`);
  }
  if (opacityRatio > 0 && (blurBase > 0 || yBase > 0)) {
    const y = Math.round(yBase * multiplier);
    const blur = Math.round(blurBase * multiplier);
    const keyAlpha = Math.max(0.04, Math.min(0.65, opacityRatio * 0.45 * multiplier)).toFixed(2);
    const midAlpha = Math.max(0.05, Math.min(0.75, opacityRatio * 0.72)).toFixed(2);
    const deepAlpha = Math.max(0.06, Math.min(0.88, opacityRatio * (0.85 + 0.15 * multiplier))).toFixed(2);

    layers.push(`0 ${Math.max(1, Math.round(y * 0.2))}px ${Math.max(2, Math.round(blur * 0.18))}px 0 rgba(0, 0, 0, ${keyAlpha})`);
    layers.push(`0 ${Math.max(2, Math.round(y * 0.55))}px ${Math.max(4, Math.round(blur * 0.52))}px ${Math.round(spread * 0.5)}px rgba(0, 0, 0, ${midAlpha})`);
    layers.push(`0 ${y}px ${blur}px ${spread}px rgba(0, 0, 0, ${deepAlpha})`);
  }
  return layers.length ? layers.join(", ") : "none";
}

export function computeShadowStudio(
  params: Partial<ShadowStudioParams> = {},
  format: StudioCodeFormat = "css"
): ShadowStudioOutput {
  const mode = params.mode === "light" ? "light" : "dark";
  const y = Number(params.yOffset ?? 12);
  const blur = Math.max(0, Number(params.blur ?? 28));
  const spread = Number(params.spread ?? -4);
  const op = Math.min(90, Math.max(0, Number(params.opacity ?? 40))) / 100;
  const rim = Math.min(40, Math.max(0, Number(params.rimLight ?? 10))) / 100;
  const borderAlpha = Math.min(50, Math.max(4, Number(params.borderAlpha ?? 16))) / 100;
  const radius = Math.max(0, Number(params.radius ?? 8));
  const backdropBlur = Math.min(24, Math.max(0, Number(params.backdropBlur ?? 0)));

  const cardShadow = buildLayeredShadow(y, blur, spread, op, rim, 0.45);
  const dropdownShadow = buildLayeredShadow(y, blur, spread, op, rim, 1);
  const modalShadow = buildLayeredShadow(y, blur, spread, op, rim, 1.75);

  const tiers: readonly ShadowElevationTier[] = [
    {
      id: "card",
      labelZh: "低 · 平铺卡片",
      labelEn: "Low · Card",
      boxShadow: cardShadow,
      zIndex: 10
    },
    {
      id: "dropdown",
      labelZh: "中 · 悬浮菜单",
      labelEn: "Mid · Popover",
      boxShadow: dropdownShadow,
      zIndex: 40
    },
    {
      id: "modal",
      labelZh: "高 · 模态弹窗",
      labelEn: "High · Modal",
      boxShadow: modalShadow,
      zIndex: 60
    }
  ];

  const surfaceBg =
    backdropBlur > 0
      ? mode === "light"
        ? "rgba(255, 255, 255, 0.78)"
        : "rgba(29, 29, 32, 0.76)"
      : mode === "light"
        ? "#FFFFFF"
        : "#1D1D20";
  const canvasBg = mode === "light" ? "#F2F3F6" : "#121215";
  const borderCol =
    mode === "light"
      ? `rgba(15, 23, 42, ${borderAlpha.toFixed(2)})`
      : `rgba(255, 255, 255, ${borderAlpha.toFixed(2)})`;
  const ink = mode === "light" ? "#111827" : "#ECECEE";
  const muted = mode === "light" ? "#64748B" : "#9CA3AF";

  const blurCss = backdropBlur > 0 ? `\n  backdrop-filter: blur(${backdropBlur}px);` : "";
  const cssCode = `:root {
  --surface-bg: ${surfaceBg};
  --surface-border: ${borderCol};
  --surface-radius: ${radius}px;
  --shadow-card: ${cardShadow};
  --shadow-dropdown: ${dropdownShadow};
  --shadow-modal: ${modalShadow};
}

.uifino-elevated-card {
  background: var(--surface-bg);
  border: 1px solid var(--surface-border);
  border-radius: var(--surface-radius);
  box-shadow: var(--shadow-dropdown);${blurCss}
}`;

  const twShadow =
    dropdownShadow === "none" ? "shadow-none" : `shadow-[${dropdownShadow.replace(/\s+/g, "_")}]`;
  const twBlur = backdropBlur > 0 ? ` backdrop-blur-[${backdropBlur}px]` : "";
  const twCode = `<div class="bg-[${surfaceBg.replace(/\s+/g, "")}] border border-[${borderCol.replace(/\s+/g, "")}] rounded-[${radius}px] ${twShadow}${twBlur} p-5">\n  <!-- Elevated surface -->\n</div>`;

  return {
    canvasBg,
    surfaceBg,
    borderCol,
    ink,
    muted,
    radius,
    backdropBlur,
    boxShadow: dropdownShadow,
    tiers,
    code: format === "tailwind" ? twCode : cssCode
  };
}
