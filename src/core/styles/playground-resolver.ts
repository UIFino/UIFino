import type { RadiusStop, ThemeMode } from "@/core/tokens";
import type { ResolvedStylePlaygroundPhysics, UiStyleSpec } from "./types";

export function resolveStylePlaygroundPhysics(
  style: UiStyleSpec,
  mode: ThemeMode,
  radiusOverride?: RadiusStop
): ResolvedStylePlaygroundPhysics {
  const palette = mode === "light" ? style.light : style.dark;
  const baseRadius = radiusOverride ?? style.defaultRadius;
  const ctrlRadiusPx = baseRadius === 0 ? 0 : Math.max(4, Math.round(baseRadius * 0.65));
  const badgeRadiusPx =
    style.surfaceEffect === "frosted-glass" || style.surfaceEffect === "bento-ring"
      ? 999
      : baseRadius === 0
        ? 0
        : Math.max(2, Math.round(baseRadius * 0.5));

  const isNeoBrutal = style.surfaceEffect === "brutalist-offset";
  const isSwiss = style.surfaceEffect === "swiss-rule";
  const isFrosted = style.surfaceEffect === "frosted-glass";
  const isSoftTactile = style.surfaceEffect === "soft-tactile";
  const isRetro = style.surfaceEffect === "retro-terminal";
  const isCleanSaas = style.surfaceEffect === "soft-shadow";
  const isBento = style.surfaceEffect === "bento-ring";

  const borderWidthPx = isNeoBrutal ? 2 : 1;

  let cardShadow = "none";
  let buttonShadow = "none";
  let inputInsetShadow = "none";

  if (isNeoBrutal) {
    const hardColor = mode === "light" ? "#111111" : palette.accent;
    cardShadow = `4px 4px 0px ${hardColor}`;
    buttonShadow = `3px 3px 0px ${hardColor}`;
  } else if (isCleanSaas) {
    cardShadow =
      mode === "light"
        ? "0 1px 2px rgba(15, 23, 42, 0.05), 0 10px 24px -8px rgba(15, 23, 42, 0.08)"
        : "0 10px 28px -10px rgba(0, 0, 0, 0.55)";
    buttonShadow = "0 1px 2px rgba(15, 23, 42, 0.12)";
  } else if (isFrosted) {
    cardShadow =
      mode === "dark"
        ? "inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 16px 36px -12px rgba(2, 6, 23, 0.65)"
        : "inset 0 1px 0 rgba(255, 255, 255, 0.85), 0 14px 32px -12px rgba(15, 23, 42, 0.12)";
  } else if (isSoftTactile) {
    cardShadow =
      mode === "light"
        ? "inset 0 1px 0 rgba(255, 255, 255, 0.92), 0 6px 14px -4px rgba(15, 23, 42, 0.09)"
        : "inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 8px 18px -4px rgba(0, 0, 0, 0.55)";
    buttonShadow =
      mode === "light"
        ? "inset 0 1px 0 rgba(255, 255, 255, 0.45), 0 2px 5px rgba(15, 23, 42, 0.16)"
        : "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 2px 6px rgba(0, 0, 0, 0.5)";
    inputInsetShadow =
      mode === "light"
        ? "inset 0 2px 4px rgba(15, 23, 42, 0.08)"
        : "inset 0 2px 5px rgba(0, 0, 0, 0.55)";
  } else if (isBento) {
    cardShadow =
      mode === "dark"
        ? "inset 0 1px 0 rgba(255, 255, 255, 0.05)"
        : "0 2px 8px -2px rgba(15, 23, 42, 0.06)";
  }

  const surfaceAlphaBg = isFrosted
    ? mode === "dark"
      ? "rgba(18, 25, 46, 0.58)"
      : "rgba(255, 255, 255, 0.64)"
    : palette.surface;

  const elevatedAlphaBg = isFrosted
    ? mode === "dark"
      ? "rgba(30, 41, 72, 0.66)"
      : "rgba(255, 255, 255, 0.82)"
    : palette.elevated;

  const fontDisplayCss = isRetro
    ? "var(--font-mono)"
    : style.fonts.serif
      ? "var(--font-serif)"
      : "var(--font-sans)";

  const fontBodyCss = isRetro ? "var(--font-mono)" : "var(--font-sans)";

  return {
    mode,
    palette,
    cardRadiusPx: baseRadius,
    ctrlRadiusPx,
    badgeRadiusPx,
    borderWidthPx,
    cardShadow,
    buttonShadow,
    inputInsetShadow,
    backdropFilter: isFrosted ? "blur(16px)" : "none",
    surfaceAlphaBg,
    elevatedAlphaBg,
    fontDisplayCss,
    fontBodyCss,
    letterSpacing: style.fonts.tracking,
    uppercaseLabels: isRetro || isSwiss,
    hasAmbientOrbs: isFrosted,
    hasScanlines: isRetro,
    hasTopHeavyRule: isSwiss
  };
}
