import {
  DEFAULT_UIFINO_PALETTE,
  DENSITY_SCALE_MAP,
  RADIUS_SCALE_MAP,
  RADIUS_STOP_VALUES
} from "./scales";
import type {
  DensityMode,
  RadiusStop,
  ResolvedWorkbenchTokens,
  ThemeMode,
  ThemePalette,
  WorkbenchTokenInput
} from "./types";

export function normalizeRadiusStop(raw?: number): RadiusStop {
  const num = Number(raw);
  if (RADIUS_STOP_VALUES.includes(num as RadiusStop)) {
    return num as RadiusStop;
  }
  return 8;
}

export function normalizeDensityMode(raw?: string): DensityMode {
  if (raw === "compact" || raw === "default" || raw === "spacious") {
    return raw;
  }
  return "default";
}

export function normalizeThemeMode(raw?: string): ThemeMode {
  return raw === "light" ? "light" : "dark";
}

export function resolveWorkbenchTokens(input: WorkbenchTokenInput = {}): ResolvedWorkbenchTokens {
  const radius = normalizeRadiusStop(input.radius);
  const density = normalizeDensityMode(input.density);
  const mode = normalizeThemeMode(input.mode);
  const skinId = input.skinId && input.skinId.trim() ? input.skinId : "default";

  const radiusTokens = RADIUS_SCALE_MAP[radius];
  const densityTokens = DENSITY_SCALE_MAP[density];

  let palette: ThemePalette = DEFAULT_UIFINO_PALETTE[mode];
  let fontDisplay = "var(--font-sans)";
  let skinName = "uifino Architectural";

  if (skinId !== "default" && input.brands?.length) {
    const matchedBrand = input.brands.find((brand) => brand.id === skinId);
    if (matchedBrand) {
      palette = mode === "light" ? matchedBrand.light : matchedBrand.dark;
      fontDisplay = matchedBrand.fonts.serif ? "var(--font-serif)" : "var(--font-sans)";
      skinName = matchedBrand.name;
    }
  }

  return {
    radius,
    density,
    mode,
    skinId,
    skinName,
    fontDisplay,
    ...radiusTokens,
    ...densityTokens,
    ...palette
  };
}
