import type { BackgroundPreset } from "@/core/studios/background";

export const BG_PRESETS: readonly BackgroundPreset[] = [
  {
    id: "linear-grid",
    name: "Fine Grid",
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
    id: "dot-matrix",
    name: "Dot Matrix",
    engine: "dots",
    canvas: "#161618",
    accent: "#ceff00",
    secondary: "#52525b",
    cellSize: 22,
    opacity: 42,
    spread: 65,
    noise: 0
  },
  {
    id: "borealis-lime",
    name: "Aurora Glow",
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
    id: "claude-grain",
    name: "Film Grain",
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
    id: "frost-glass",
    name: "Frosted Mist",
    engine: "aurora",
    canvas: "#0B1020",
    accent: "#38bdf8",
    secondary: "#818cf8",
    cellSize: 48,
    opacity: 32,
    spread: 76,
    noise: 8
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
  }
];
