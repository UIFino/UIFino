export type BackgroundEngineType = "grid" | "dots" | "aurora" | "grain";
export type StudioCodeFormat = "css" | "tailwind";

export interface BackgroundStudioParams {
  readonly engine: BackgroundEngineType;
  readonly canvas: string;
  readonly accent: string;
  readonly secondary: string;
  readonly cellSize: number;
  readonly opacity: number;
  readonly spread: number;
  readonly noise: number;
  readonly maskFade?: boolean;
  readonly maskRadius?: number;
}

export interface BackgroundPreset extends BackgroundStudioParams {
  readonly id: string;
  readonly name: string;
}

export interface BackgroundEngineLayer {
  readonly bgImage: string;
  readonly bgSize: string;
  readonly twSnippet: string;
}

export interface BackgroundStudioOutput {
  readonly canvas: string;
  readonly backgroundImage: string;
  readonly backgroundSize: string;
  readonly maskImage?: string;
  readonly inlineStyle: string;
  readonly code: string;
}
