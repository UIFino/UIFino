import type { DensityMode, ThemeMode } from "@/core/tokens";
import type { StudioCodeFormat } from "@/core/studios/background";

export interface ShadowStudioParams {
  readonly mode: ThemeMode;
  readonly yOffset: number;
  readonly blur: number;
  readonly spread: number;
  readonly opacity: number;
  readonly rimLight: number;
  readonly borderAlpha: number;
  readonly radius: number;
  readonly density: DensityMode;
}

export interface ShadowPreset extends ShadowStudioParams {
  readonly id: string;
  readonly name: string;
}

export interface ShadowStudioOutput {
  readonly canvasBg: string;
  readonly surfaceBg: string;
  readonly borderCol: string;
  readonly ink: string;
  readonly muted: string;
  readonly radius: number;
  readonly boxShadow: string;
  readonly code: string;
}

export type { StudioCodeFormat };
