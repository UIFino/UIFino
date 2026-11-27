import type { BackgroundEngineLayer } from "../types";
import { hexToRgba } from "./color";

export function buildAuroraLayer(
  canvas: string,
  accent: string,
  secondary: string,
  opacityRatio: number,
  spread: number
): BackgroundEngineLayer {
  const strokeRgba = hexToRgba(accent, opacityRatio);
  const secRgba = hexToRgba(secondary, opacityRatio * 0.75);
  return {
    bgImage: `radial-gradient(${spread * 8}px ellipse at 22% 18%, ${strokeRgba}, transparent 65%), radial-gradient(${spread * 7}px ellipse at 78% 28%, ${secRgba}, transparent 68%), linear-gradient(180deg, transparent 0%, ${canvas} 96%)`,
    bgSize: "100% 100%",
    twSnippet: `<div class="bg-[${canvas}] [background-image:radial-gradient(${spread * 8}px_ellipse_at_22%_18%,${strokeRgba.replace(/\s+/g, "")},transparent_65%),radial-gradient(${spread * 7}px_ellipse_at_78%_28%,${secRgba.replace(/\s+/g, "")},transparent_68%)]" />`
  };
}

export function buildGrainLayer(
  canvas: string,
  accent: string,
  secondary: string,
  cellSize: number,
  opacityRatio: number,
  spread: number,
  noise: number
): BackgroundEngineLayer {
  const strokeRgba = hexToRgba(accent, opacityRatio);
  const secRgba = hexToRgba(secondary, opacityRatio * 0.75);
  const grainAlpha = Math.max(0.06, noise / 100).toFixed(2);
  const grainPitch = Math.max(4, Math.round(cellSize / 5));

  return {
    bgImage: `radial-gradient(${spread * 7}px circle at 25% 20%, ${strokeRgba}, transparent 70%), radial-gradient(${spread * 6}px circle at 80% 75%, ${secRgba}, transparent 70%), repeating-radial-gradient(circle at 17% 32%, rgba(128,128,128,${grainAlpha}) 0, rgba(128,128,128,0) 2px)`,
    bgSize: `100% 100%, 100% 100%, ${grainPitch}px ${grainPitch}px`,
    twSnippet: `<div class="relative overflow-hidden bg-[${canvas}]">\n  <div class="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,${strokeRgba.replace(/\s+/g, "")},transparent_70%)]" />\n  <div class="absolute inset-0 opacity-[${grainAlpha}] mix-blend-overlay [background-image:repeating-radial-gradient(circle_at_17%_32%,#888_0,transparent_2px)]" />\n</div>`
  };
}
