import type { StudioCodeFormat } from "@/core/studios/background";

export interface ShadeStop {
  readonly stop: number;
  readonly hex: string;
}

export interface ContrastAuditResult {
  readonly ratio: number;
  readonly ratioText: string;
  readonly aaNormal: boolean;
  readonly aaLarge: boolean;
  readonly aaaNormal: boolean;
}

const SHADE_STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

function parseHexRgb(hex: string): readonly [number, number, number] {
  const clean = hex.replace("#", "").trim();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((ch) => ch + ch)
          .join("")
      : clean.padEnd(6, "0").slice(0, 6);
  const num = Number.parseInt(full, 16);
  if (Number.isNaN(num)) return [94, 106, 210];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return `#${[clamp(r), clamp(g), clamp(b)]
    .map((n) => n.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;
}

function mixChannel(a: number, b: number, weight: number): number {
  return a + (b - a) * weight;
}

export function generateColorShadeScale(baseHex: string): readonly ShadeStop[] {
  const [r, g, b] = parseHexRgb(baseHex);
  return SHADE_STOPS.map((stop) => {
    if (stop === 500) {
      return { stop, hex: rgbToHex(r, g, b) };
    }
    if (stop < 500) {
      const whiteFactor = (500 - stop) / 530;
      return {
        stop,
        hex: rgbToHex(
          mixChannel(r, 255, whiteFactor),
          mixChannel(g, 255, whiteFactor),
          mixChannel(b, 255, whiteFactor)
        )
      };
    }
    const darkFactor = (stop - 500) / 510;
    return {
      stop,
      hex: rgbToHex(
        mixChannel(r, 8, darkFactor),
        mixChannel(g, 10, darkFactor),
        mixChannel(b, 14, darkFactor)
      )
    };
  });
}

function channelLuminance(v: number): number {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

export function computeWcagContrast(fgHex: string, bgHex: string): ContrastAuditResult {
  const [fr, fg, fb] = parseHexRgb(fgHex);
  const [br, bg, bb] = parseHexRgb(bgHex);
  const l1 =
    0.2126 * channelLuminance(fr) +
    0.7152 * channelLuminance(fg) +
    0.0722 * channelLuminance(fb);
  const l2 =
    0.2126 * channelLuminance(br) +
    0.7152 * channelLuminance(bg) +
    0.0722 * channelLuminance(bb);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));

  return {
    ratio,
    ratioText: `${ratio.toFixed(2)}:1`,
    aaNormal: ratio >= 4.5,
    aaLarge: ratio >= 3.0,
    aaaNormal: ratio >= 7.0
  };
}

export function serializeColorScaleCode(
  tokenName: string,
  shades: readonly ShadeStop[],
  format: StudioCodeFormat
): string {
  const safeName = tokenName.trim().toLowerCase().replace(/[^a-z0-9-]/g, "") || "brand";
  if (format === "tailwind") {
    const entries = shades.map((s) => `  "${s.stop}": "${s.hex}"`).join(",\n");
    return `// tailwind.config / @theme color scale\nexport const ${safeName} = {\n${entries}\n};`;
  }
  const vars = shades.map((s) => `  --color-${safeName}-${s.stop}: ${s.hex};`).join("\n");
  return `:root {\n${vars}\n}`;
}
