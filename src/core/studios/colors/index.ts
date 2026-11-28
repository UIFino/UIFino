import type { StudioCodeFormat } from "@/core/studios/background";

export interface ShadeStop {
  readonly stop: number;
  readonly hex: string;
  readonly oklch?: string;
  readonly isAnchor?: boolean;
}

export interface ContrastAuditResult {
  readonly ratio: number;
  readonly ratioText: string;
  readonly aaNormal: boolean;
  readonly aaLarge: boolean;
  readonly aaaNormal: boolean;
}

export interface ColorPairAuditItem {
  readonly id: string;
  readonly roleZh: string;
  readonly roleEn: string;
  readonly fgHex: string;
  readonly bgHex: string;
  readonly audit: ContrastAuditResult;
}

export type NeutralTemperature = "cool" | "warm" | "pure";

const SHADE_STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

const TARGET_L: Record<(typeof SHADE_STOPS)[number], number> = {
  50: 0.975,
  100: 0.942,
  200: 0.878,
  300: 0.785,
  400: 0.682,
  500: 0.585,
  600: 0.495,
  700: 0.405,
  800: 0.325,
  900: 0.255,
  950: 0.178
};

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

function srgbToLinear(c: number): number {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function linearToSrgb(v: number): number {
  const c = Math.max(0, Math.min(1, v));
  const out = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  return Math.round(out * 255);
}

function rgbToOklch(r: number, g: number, b: number): readonly [number, number, number] {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bVal = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

  const C = Math.sqrt(a * a + bVal * bVal);
  let H = (Math.atan2(bVal, a) * 180) / Math.PI;
  if (H < 0) H += 360;
  return [L, C, H];
}

function oklchToRgb(L: number, C: number, H: number): readonly [number, number, number] {
  const rad = (H * Math.PI) / 180;
  const a = C * Math.cos(rad);
  const bVal = C * Math.sin(rad);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * bVal;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * bVal;
  const s_ = L - 0.0894841775 * a - 1.291485548 * bVal;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const lr = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  return [linearToSrgb(lr), linearToSrgb(lg), linearToSrgb(lb)];
}

function inGamut(L: number, C: number, H: number): boolean {
  const rad = (H * Math.PI) / 180;
  const a = C * Math.cos(rad);
  const bVal = C * Math.sin(rad);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * bVal;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * bVal;
  const s_ = L - 0.0894841775 * a - 1.291485548 * bVal;
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;
  const lr = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  return (
    lr >= -0.001 &&
    lr <= 1.001 &&
    lg >= -0.001 &&
    lg <= 1.001 &&
    lb >= -0.001 &&
    lb <= 1.001
  );
}

function clampChromaToGamut(L: number, C: number, H: number): number {
  if (inGamut(L, C, H)) return C;
  let lo = 0;
  let hi = C;
  for (let i = 0; i < 14; i++) {
    const mid = (lo + hi) / 2;
    if (inGamut(L, mid, H)) lo = mid;
    else hi = mid;
  }
  return lo;
}

/**
 * Generates an OKLCH-uniform 50-950 color ladder and smartly locks the input seed
 * onto its closest natural perceptual lightness stop (Tints.dev + OKLCH.com style).
 */
export function generateColorShadeScale(baseHex: string): readonly ShadeStop[] {
  const [r, g, b] = parseHexRgb(baseHex);
  const [seedL, seedC, seedH] = rgbToOklch(r, g, b);

  // Pick natural stop closest to seed perceptual lightness
  let anchorStop: (typeof SHADE_STOPS)[number] = 500;
  let bestDist = Infinity;
  for (const stop of SHADE_STOPS) {
    const d = Math.abs(TARGET_L[stop] - seedL);
    if (d < bestDist) {
      bestDist = d;
      anchorStop = stop;
    }
  }

  return SHADE_STOPS.map((stop) => {
    if (stop === anchorStop) {
      return {
        stop,
        hex: rgbToHex(r, g, b),
        oklch: `oklch(${seedL.toFixed(3)} ${seedC.toFixed(3)} ${Math.round(seedH)})`,
        isAnchor: true
      };
    }

    const L = TARGET_L[stop];
    // Taper chroma cleanly at very light / very dark ends so shades stay crisp, never muddy
    const chromaFactor =
      stop <= 100 ? 0.22 : stop === 200 ? 0.45 : stop === 950 ? 0.55 : stop >= 800 ? 0.78 : 1;
    const rawC = seedC * chromaFactor;
    const C = clampChromaToGamut(L, rawC, seedH);
    const [sr, sg, sb] = oklchToRgb(L, C, seedH);

    return {
      stop,
      hex: rgbToHex(sr, sg, sb),
      oklch: `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${Math.round(seedH)})`,
      isAnchor: false
    };
  });
}

export function generateNeutralScale(
  temperature: NeutralTemperature = "cool"
): readonly ShadeStop[] {
  const chroma = temperature === "pure" ? 0 : temperature === "cool" ? 0.009 : 0.011;
  const hue = temperature === "cool" ? 255 : temperature === "warm" ? 72 : 0;

  return SHADE_STOPS.map((stop) => {
    const L = TARGET_L[stop];
    const C = clampChromaToGamut(L, chroma, hue);
    const [r, g, b] = oklchToRgb(L, C, hue);
    return {
      stop,
      hex: rgbToHex(r, g, b),
      oklch: `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${hue})`
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

export function pickReadableForeground(bgHex: string): string {
  const darkAudit = computeWcagContrast("#0B0C0E", bgHex);
  const lightAudit = computeWcagContrast("#F8FAFC", bgHex);
  return lightAudit.ratio >= darkAudit.ratio ? "#F8FAFC" : "#0B0C0E";
}

export function computeUiColorAuditMatrix(
  primaryShades: readonly ShadeStop[],
  neutralShades: readonly ShadeStop[],
  mode: "dark" | "light"
): readonly ColorPairAuditItem[] {
  const byStop = (arr: readonly ShadeStop[], stop: number) =>
    arr.find((s) => s.stop === stop)?.hex ?? "#5E6AD2";

  const canvas = mode === "dark" ? byStop(neutralShades, 950) : "#FFFFFF";
  const surface = mode === "dark" ? byStop(neutralShades, 900) : byStop(neutralShades, 50);
  const ink = mode === "dark" ? byStop(neutralShades, 50) : byStop(neutralShades, 950);
  const muted = mode === "dark" ? byStop(neutralShades, 400) : byStop(neutralShades, 600);
  const border = mode === "dark" ? byStop(neutralShades, 800) : byStop(neutralShades, 200);
  const primary =
    primaryShades.find((s) => s.isAnchor)?.hex ?? byStop(primaryShades, mode === "dark" ? 500 : 600);
  const primaryFg = pickReadableForeground(primary);

  return [
    {
      id: "body-canvas",
      roleZh: "正文配画布底",
      roleEn: "Body on Canvas",
      fgHex: ink,
      bgHex: canvas,
      audit: computeWcagContrast(ink, canvas)
    },
    {
      id: "muted-surface",
      roleZh: "次级字配卡片底",
      roleEn: "Muted on Surface",
      fgHex: muted,
      bgHex: surface,
      audit: computeWcagContrast(muted, surface)
    },
    {
      id: "btn-accent",
      roleZh: "按钮字配主色",
      roleEn: "Text on Primary",
      fgHex: primaryFg,
      bgHex: primary,
      audit: computeWcagContrast(primaryFg, primary)
    },
    {
      id: "border-surface",
      roleZh: "1px 描边配底色",
      roleEn: "Border vs Canvas",
      fgHex: border,
      bgHex: canvas,
      audit: computeWcagContrast(border, canvas)
    }
  ];
}

export function serializeColorScaleCode(
  tokenName: string,
  shades: readonly ShadeStop[],
  format: StudioCodeFormat,
  neutralShades?: readonly ShadeStop[]
): string {
  const safeName = tokenName.trim().toLowerCase().replace(/[^a-z0-9-]/g, "") || "brand";
  if (format === "tailwind") {
    const entries = shades.map((s) => `  "${s.stop}": "${s.oklch ?? s.hex}"`).join(",\n");
    const neutralBlock = neutralShades
      ? `\n\nexport const neutral = {\n${neutralShades
          .map((s) => `  "${s.stop}": "${s.hex}"`)
          .join(",\n")}\n};`
      : "";
    return `// Tailwind v4 @theme OKLCH Color Ladder\nexport const ${safeName} = {\n${entries}\n};${neutralBlock}`;
  }

  const vars = shades
    .map((s) => `  --color-${safeName}-${s.stop}: ${s.oklch ?? s.hex}; /* ${s.hex} */`)
    .join("\n");
  const neutralVars = neutralShades
    ? `\n\n  /* Paired Neutral Ladder */\n${neutralShades
        .map((s) => `  --color-neutral-${s.stop}: ${s.hex};`)
        .join("\n")}`
    : "";

  return `:root {\n${vars}${neutralVars}\n}`;
}
