export type ThemeMode = "dark" | "light";
export type RadiusStop = 0 | 4 | 8 | 12 | 16;
export type DensityMode = "compact" | "default" | "spacious";

export interface ThemePalette {
  readonly canvas: string;
  readonly surface: string;
  readonly elevated: string;
  readonly border: string;
  readonly ink: string;
  readonly muted: string;
  readonly accent: string;
  readonly accentFg: string;
}

export interface BrandTypography {
  readonly display: string;
  readonly body: string;
  readonly mono: string;
  readonly tracking: string;
  readonly serif: boolean;
}

export interface BrandSkinContract {
  readonly id: string;
  readonly name: string;
  readonly fonts: BrandTypography;
  readonly light: ThemePalette;
  readonly dark: ThemePalette;
}

export interface RadiusScaleEntry {
  readonly card: string;
  readonly ctrl: string;
  readonly badge: string;
  readonly twCard: string;
  readonly twCtrl: string;
}

export interface DensityScaleEntry {
  readonly padStage: string;
  readonly padCard: string;
  readonly gap: string;
  readonly btnH: string;
  readonly twPadStage: string;
  readonly twPadCard: string;
  readonly twGap: string;
}

export interface WorkbenchTokenInput {
  readonly radius?: number;
  readonly density?: string;
  readonly skinId?: string;
  readonly mode?: string;
  readonly brands?: readonly BrandSkinContract[];
}

export interface ResolvedWorkbenchTokens
  extends RadiusScaleEntry,
    DensityScaleEntry,
    ThemePalette {
  readonly radius: RadiusStop;
  readonly density: DensityMode;
  readonly mode: ThemeMode;
  readonly skinId: string;
  readonly skinName: string;
  readonly fontDisplay: string;
}
