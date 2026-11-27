import type { StarterTemplateSpec } from "../_taxonomy";

export const parchmentAgentDesk: StarterTemplateSpec = {
  id: "parchment-agent-desk",
  name: "Editorial AI Workspace",
  nameZh: "Editorial 人文 AI 工作台",
  category: "SaaS & AI",
  stack: "Next.js 15 · TypeScript",
  skinId: "claude",
  skinLabel: "Claude DESIGN.md",
  accent: "#D97757",
  canvas: "#191816",
  surface: "#23221F",
  border: "#36332E",
  pagesCount: 5,
  routes: ["Prompt Stage", "Artifact Split", "History", "Settings"],
  descEn:
    "Warm literary AI chat & split-screen artifact studio with serif display typography and zero cold glare.",
  descZh: "温暖米白与深咖双主题对话工作台，内置左侧会话树与右侧实时文档预览分栏。"
};
