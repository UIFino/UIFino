import type { StarterTemplateSpec } from "../_taxonomy";

export const parchmentAgentDesk: StarterTemplateSpec = {
  id: "parchment-agent-desk",
  kind: "starter",
  scene: "ai-studio",
  category: "AI Studio",
  name: "Editorial Studio",
  nameZh: "人文工作台",
  stack: "Next.js 15 · 5 Pages",
  skinId: "claude",
  skinLabel: "Claude DESIGN.md",
  accent: "#C96442",
  canvas: "#FAF9F5",
  surface: "#FFFFFF",
  border: "#E6E2D8",
  pagesCount: 5,
  routes: ["Chat", "Artifacts", "Prompts", "Billing", "Settings"],
  descEn: "Warm parchment multi-page AI agent workspace with artifact split-pane and prompt library.",
  descZh: "暖纸衬线调性的多页面智能对话工作台，内置对话流、产物分栏与提示词管理。"
};
