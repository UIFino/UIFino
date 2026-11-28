import type { ComponentAssetMeta } from "@/core/codegen";

export const reviewsWallMeta: ComponentAssetMeta = {
  id: "reviews-architectural-wall",
  name: "Architectural Review Wall",
  nameZh: "细线口碑墙",
  subcat: "Wall",
  layout: "bento-grid",
  archetype: "quotes-wall",
  tags: ["reviews", "testimonials", "quotes", "social-proof"],
  descEn: "1px grid-aligned customer quote cards with verified role attribution.",
  descZh: "沿 1px 细线对齐的真实客户评价卡片与角色署名矩阵。",
  contract: [
    "Clamp long customer quotes cleanly without breaking row border alignment.",
    "Keep avatar and attribution baseline consistent across cards."
  ],
  contractZh: [
    "较长客户评价使用多行截断，防止撑坏同行网格边框齐整度。",
    "每张卡片底部的头像与角色署名基线维持同一高度对齐。"
  ]
};
