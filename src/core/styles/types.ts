import type {
  BrandSkinContract,
  BrandTypography,
  RadiusStop,
  ThemeMode,
  ThemePalette
} from "@/core/tokens";

export type StyleGroup = "minimal" | "expressive";

export type StyleTone = "dark" | "light";

export type StyleScenario = "landing" | "dashboard" | "ai-workspace" | "docs";

export type StyleSurfaceEffect =
  | "hairline"
  | "flat-mono"
  | "swiss-rule"
  | "soft-shadow"
  | "warm-paper"
  | "frosted-glass"
  | "bento-ring"
  | "brutalist-offset"
  | "soft-tactile"
  | "retro-terminal";

export interface UiStyleSpec extends BrandSkinContract {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly nameZh: string;
  readonly group: StyleGroup;
  readonly primaryTone: StyleTone;
  readonly scenarios: readonly StyleScenario[];
  readonly swatch: readonly [string, string];
  readonly summaryEn: string;
  readonly summaryZh: string;
  readonly defaultRadius: RadiusStop;
  readonly radiusLabelEn: string;
  readonly radiusLabelZh: string;
  readonly borderSpec: string;
  readonly shadowSpec: string;
  readonly surfaceEffect: StyleSurfaceEffect;
  readonly fonts: BrandTypography;
  readonly light: ThemePalette;
  readonly dark: ThemePalette;
  readonly dosEn: readonly string[];
  readonly dosZh: readonly string[];
  readonly dontsEn: readonly string[];
  readonly dontsZh: readonly string[];
  readonly goodForEn?: readonly string[];
  readonly goodForZh?: readonly string[];
  readonly notForEn?: readonly string[];
  readonly notForZh?: readonly string[];
  readonly tags: readonly string[];
}

export interface ResolvedStylePlaygroundPhysics {
  readonly mode: ThemeMode;
  readonly palette: ThemePalette;
  readonly cardRadiusPx: number;
  readonly ctrlRadiusPx: number;
  readonly badgeRadiusPx: number;
  readonly borderWidthPx: number;
  readonly cardShadow: string;
  readonly buttonShadow: string;
  readonly inputInsetShadow: string;
  readonly backdropFilter: string;
  readonly surfaceAlphaBg: string;
  readonly elevatedAlphaBg: string;
  readonly fontDisplayCss: string;
  readonly fontBodyCss: string;
  readonly letterSpacing: string;
  readonly uppercaseLabels: boolean;
  readonly hasAmbientOrbs: boolean;
  readonly hasScanlines: boolean;
  readonly hasTopHeavyRule: boolean;
}
