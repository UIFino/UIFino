import { buildAuroraLayer, buildGrainLayer } from "./engines/atmospheric";
import { buildDotsLayer, buildGridLayer } from "./engines/patterns";
import type {
  BackgroundStudioOutput,
  BackgroundStudioParams,
  StudioCodeFormat
} from "./types";

export * from "./types";
export { hexToRgba } from "./engines/color";

export function computeBackgroundStudio(
  params: Partial<BackgroundStudioParams> = {},
  format: StudioCodeFormat = "css"
): BackgroundStudioOutput {
  const engine = params.engine ?? "grid";
  const canvas = params.canvas || "#161618";
  const accent = params.accent || "#ceff00";
  const secondary = params.secondary || "#38bdf8";
  const cellSize = Math.max(8, Number(params.cellSize) || 32);
  const opacityRatio = Math.min(100, Math.max(2, Number(params.opacity) || 30)) / 100;
  const spread = Math.min(100, Math.max(20, Number(params.spread) || 68));
  const noise = Math.min(80, Math.max(0, Number(params.noise) || 0));
  const maskFade = params.maskFade ?? true;
  const maskRadius = Math.min(95, Math.max(35, Number(params.maskRadius) || 72));

  const layer =
    engine === "grid"
      ? buildGridLayer(canvas, accent, cellSize, opacityRatio, spread)
      : engine === "dots"
        ? buildDotsLayer(canvas, accent, cellSize, opacityRatio, spread)
        : engine === "grain"
          ? buildGrainLayer(canvas, accent, secondary, cellSize, opacityRatio, spread, noise)
          : buildAuroraLayer(canvas, accent, secondary, opacityRatio, spread);

  const maskImage = maskFade
    ? `radial-gradient(ellipse ${maskRadius}% ${maskRadius}% at 50% 45%, #000 42%, transparent 100%)`
    : undefined;

  const maskStyleLine = maskImage
    ? `mask-image:${maskImage};-webkit-mask-image:${maskImage};`
    : "";
  const inlineStyle = `background-color:${canvas};background-image:${layer.bgImage};background-size:${layer.bgSize};${maskStyleLine}`;

  const formattedBgImage = layer.bgImage
    .split(", linear-gradient")
    .join(",\n    linear-gradient")
    .split(", radial-gradient")
    .join(",\n    radial-gradient");

  const cssMaskBlock = maskImage
    ? `\n  -webkit-mask-image: ${maskImage};\n  mask-image: ${maskImage};`
    : "";
  const cssCode = `.uifino-surface-bg {\n  background-color: ${canvas};\n  background-image:\n    ${formattedBgImage};\n  background-size: ${layer.bgSize};${cssMaskBlock}\n}`;

  const twMaskNote = maskImage
    ? `\n  {/* Radial Edge Fade Mask */}\n  <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_${maskRadius}%_${maskRadius}%_at_50%_45%,#000_42%,transparent_100%)]" />`
    : "";

  return {
    canvas,
    backgroundImage: layer.bgImage,
    backgroundSize: layer.bgSize,
    maskImage,
    inlineStyle,
    code: format === "tailwind" ? `${layer.twSnippet}${twMaskNote}` : cssCode
  };
}
