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
  ]
};
