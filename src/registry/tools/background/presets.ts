import type { BackgroundPreset } from "@/core/studios/background";

export const BG_PRESETS: readonly BackgroundPreset[] = [
  {
    id: "linear-grid",
    name: "Obsidian Grid",
    engine: "grid",
    canvas: "#101114",
    accent: "#5e6ad2",
    secondary: "#23252a",
    cellSize: 32,
    opacity: 34,
    spread: 68,
    noise: 0
  },
  {
    id: "vercel-hairline",
    name: "Monochrome Wire",
    engine: "grid",
    canvas: "#09090b",
    accent: "#ededed",
    secondary: "#27272a",
    cellSize: 48,
    opacity: 26,
    spread: 80,
    noise: 0
  },
  {
    id: "borealis-lime",
    name: "Chartreuse Aurora",
    engine: "aurora",
    canvas: "#141518",
    accent: "#ceff00",
    secondary: "#38bdf8",
    cellSize: 40,
    opacity: 24,
    spread: 62,
    noise: 14
  },
  {
    id: "stripe-mesh",
    name: "Blurple Glow",
    engine: "aurora",
    canvas: "#0a192f",
    accent: "#635bff",
    secondary: "#00d4ff",
    cellSize: 44,
    opacity: 38,
    spread: 72,
    noise: 10
  },
  {
    id: "claude-grain",
    name: "Warm Parchment Grain",
    engine: "grain",
    canvas: "#faf9f5",
    accent: "#c96442",
    secondary: "#e6e2d6",
    cellSize: 28,
    opacity: 18,
    spread: 58,
    noise: 35
  },
  {
    id: "dot-matrix",
    name: "Precision Dot Matrix",
    engine: "dots",
    canvas: "#161618",
    accent: "#ceff00",
    secondary: "#52525b",
    cellSize: 22,
    opacity: 42,
    spread: 65,
    noise: 0
  }
];
