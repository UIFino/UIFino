import type { BackgroundEngineLayer } from "../types";
import { hexToRgba } from "./color";

export function buildGridLayer(
  canvas: string,
  accent: string,
  cellSize: number,
  opacityRatio: number,
  spread: number
): BackgroundEngineLayer {
  const strokeRgba = hexToRgba(accent, opacityRatio);
  const compactStroke = strokeRgba.replace(/\s+/g, "");
  return {
    bgImage: `radial-gradient(circle at 50% 35%, ${hexToRgba(accent, opacityRatio * 0.35)}, transparent ${spread}%), linear-gradient(to right, ${strokeRgba} 1px, transparent 1px), linear-gradient(to bottom, ${strokeRgba} 1px, transparent 1px)`,
    bgSize: `100% 100%, ${cellSize}px ${cellSize}px, ${cellSize}px ${cellSize}px`,
    twSnippet: `<div class="relative bg-[${canvas}] bg-[linear-gradient(to_right,${compactStroke}_1px,transparent_1px),linear-gradient(to_bottom,${compactStroke}_1px,transparent_1px)] bg-[size:${cellSize}px_${cellSize}px]">\n  <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_${Math.max(15, spread - 30)}%,${canvas}_100%)]" />\n</div>`
  };
}

export function buildDotsLayer(
  canvas: string,
  accent: string,
  cellSize: number,
  opacityRatio: number,
  spread: number
): BackgroundEngineLayer {
  const strokeRgba = hexToRgba(accent, opacityRatio);
  const compactStroke = strokeRgba.replace(/\s+/g, "");
  return {
    bgImage: `radial-gradient(circle at 50% 45%, ${hexToRgba(accent, opacityRatio * 0.22)}, transparent ${spread}%), radial-gradient(${strokeRgba} 1.25px, transparent 1.25px)`,
    bgSize: `100% 100%, ${cellSize}px ${cellSize}px`,
    twSnippet: `<div class="bg-[${canvas}] bg-[radial-gradient(${compactStroke}_1.25px,transparent_1.25px)] bg-[size:${cellSize}px_${cellSize}px]" />`
  };
}
