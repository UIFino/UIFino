import type { StarterTemplateSpec } from "../_taxonomy";

export const tieredPricingPage: StarterTemplateSpec = {
  id: "tiered-pricing-page",
  kind: "page",
  scene: "pricing",
  category: "Pricing",
  name: "Tiered Pricing",
  nameZh: "三档定价方案页",
  stack: "Single Page · TSX",
  skinId: "stripe",
  skinLabel: "Stripe DESIGN.md",
  accent: "#635BFF",
  canvas: "#0A2540",
  surface: "#112F4E",
  border: "#1E3F63",
  pagesCount: 1,
  routes: ["Billing Switch", "3-Tier Cards", "Comparison", "FAQ"],
  descEn: "Complete SaaS pricing page featuring annual toggle, 3-tier comparison matrix, and FAQ.",
  descZh: "集成年付切换、三档套餐卡、功能对比矩阵与常见问答的单页定价方案模板。"
};
