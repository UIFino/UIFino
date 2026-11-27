import type { StarterTemplateSpec } from "../_taxonomy";

export const swissStudioPortfolio: StarterTemplateSpec = {
  id: "swiss-studio-portfolio",
  kind: "starter",
  scene: "portfolio",
  category: "Portfolio",
  name: "Swiss Portfolio",
  nameZh: "瑞士个人主页",
  stack: "Next.js 15 · 4 Pages",
  skinId: "swiss-typographic",
  skinLabel: "Swiss Style",
  accent: "#FF3B1D",
  canvas: "#F5F4EF",
  surface: "#FFFFFF",
  border: "#D4D0C5",
  pagesCount: 4,
  routes: ["Index", "Selected Work", "Notes", "Contact"],
  descEn: "International Typographic Style personal portfolio with numbered project index and essays.",
  descZh: "瑞士国际主义排版风格的独立开发者与设计师个人主页，含编号作品索引与随笔。"
};
