import type { StarterTemplateSpec } from "../_taxonomy";

export const minimalTechWeekly: StarterTemplateSpec = {
  id: "minimal-tech-weekly",
  kind: "starter",
  scene: "blog",
  category: "Blog",
  name: "Tech Weekly",
  nameZh: "极客周刊站",
  stack: "Next.js 15 · RSS",
  skinId: "editorial-serif",
  skinLabel: "Editorial Style",
  accent: "#C96442",
  canvas: "#FAF7F2",
  surface: "#FFFDF9",
  border: "#E6DFD3",
  pagesCount: 4,
  routes: ["Issues", "Article", "Archive", "Subscribe"],
  descEn: "Calm editorial blog & weekly newsletter starter tuned for long-form technical reading.",
  descZh: "专为长文阅读与技术周刊打磨的暖纸出版级站点，内置期刊归档与邮件订阅。"
};
