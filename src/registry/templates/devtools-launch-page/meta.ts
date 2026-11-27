import type { StarterTemplateSpec } from "../_taxonomy";

export const devtoolsLaunchPage: StarterTemplateSpec = {
  id: "devtools-launch-page",
  kind: "page",
  scene: "landing",
  category: "Landing",
  name: "DevTools Landing",
  nameZh: "产品落地首页",
  stack: "Single Page · TSX",
  skinId: "linear",
  skinLabel: "Linear DESIGN.md",
  accent: "#5E6AD2",
  canvas: "#08090A",
  surface: "#121316",
  border: "#23252A",
  pagesCount: 1,
  routes: ["Hero", "Bento", "Reviews", "CTA"],
  descEn: "Single-page product launch landing composition with telemetry hero and bento grid.",
  descZh: "组装首屏实时指标、便当格核心卖点与底部行动号召的单页产品落地首页。"
};
