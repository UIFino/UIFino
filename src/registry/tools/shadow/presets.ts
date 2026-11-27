import type { ShadowPreset } from "@/core/studios/shadow";

export const SHADOW_PRESETS: readonly ShadowPreset[] = [
  {
    id: "hairline-flat",
    name: "00 · Flat",
    mode: "dark",
    yOffset: 0,
    blur: 0,
    spread: 0,
    opacity: 0,
    rimLight: 8,
    borderAlpha: 16,
    radius: 0,
    density: "default"
  },
  {
    id: "linear-panel",
    name: "01 · Subtle",
    mode: "dark",
    yOffset: 6,
    blur: 18,
    spread: -2,
    opacity: 38,
    rimLight: 10,
    borderAlpha: 14,
    radius: 6,
    density: "compact"
  },
  {
    id: "raycast-float",
    name: "02 · Floating",
    mode: "dark",
    yOffset: 18,
    blur: 44,
    spread: -6,
    opacity: 58,
    rimLight: 14,
    borderAlpha: 18,
    radius: 10,
    density: "default"
  },
  {
    id: "rim-inner",
    name: "03 · Inner Rim",
    mode: "dark",
    yOffset: 2,
    blur: 8,
    spread: 0,
    opacity: 24,
    rimLight: 26,
    borderAlpha: 20,
    radius: 12,
    density: "default"
  },
  {
    id: "brutal-offset",
    name: "04 · Hard Offset",
    mode: "light",
    yOffset: 6,
    blur: 0,
    spread: 0,
    opacity: 85,
    rimLight: 0,
    borderAlpha: 40,
    radius: 4,
    density: "default"
  },
  {
    id: "stripe-clean",
    name: "05 · Clean Light",
    mode: "light",
    yOffset: 12,
    blur: 32,
    spread: -4,
    opacity: 12,
    rimLight: 0,
    borderAlpha: 10,
    radius: 8,
    density: "spacious"
  }
];
