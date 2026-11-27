export interface ContrastAuditResult {
  readonly ratio: number;
  readonly formatted: string;
  readonly grade: "AAA" | "AA" | "LOW";
  readonly passesAA: boolean;
}

function parseHexChannels(hex: string): readonly [number, number, number] | null {
  const clean = hex.trim().replace(/^#/, "");
  if (clean.length === 3) {
    const r = Number.parseInt(clean[0]! + clean[0]!, 16);
    const g = Number.parseInt(clean[1]! + clean[1]!, 16);
    const b = Number.parseInt(clean[2]! + clean[2]!, 16);
    return Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b) ? null : [r, g, b];
  }
  if (clean.length === 6) {
    const r = Number.parseInt(clean.slice(0, 2), 16);
    const g = Number.parseInt(clean.slice(2, 4), 16);
    const b = Number.parseInt(clean.slice(4, 6), 16);
    return Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b) ? null : [r, g, b];
  }
  return null;
}

function toLinearChannel(val8Bit: number): number {
  const s = val8Bit / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

/**
 * Computes relative luminance (WCAG 2.1) for a hex color string.
 */
export function hexToRelativeLuminance(hex: string): number {
  const rgb = parseHexChannels(hex);
  if (!rgb) return 0;
  return (
    0.2126 * toLinearChannel(rgb[0]) +
    0.7152 * toLinearChannel(rgb[1]) +
    0.0722 * toLinearChannel(rgb[2])
  );
}

/**
 * Evaluates foreground/background contrast ratio and WCAG AA/AAA grade.
 */
export function computeContrastRatio(fgHex: string, bgHex: string): ContrastAuditResult {
  const l1 = hexToRelativeLuminance(fgHex);
  const l2 = hexToRelativeLuminance(bgHex);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  const rounded = Math.round(ratio * 10) / 10;
  const grade: ContrastAuditResult["grade"] =
    rounded >= 7 ? "AAA" : rounded >= 4.5 ? "AA" : "LOW";

  return {
    ratio: rounded,
    formatted: `${rounded.toFixed(1)}:1`,
    grade,
    passesAA: rounded >= 4.5
  };
}
