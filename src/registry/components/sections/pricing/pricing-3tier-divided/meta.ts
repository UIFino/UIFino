import type { ComponentAssetMeta } from "@/core/codegen";

export const pricing3TierDividedMeta: ComponentAssetMeta = {
  id: "pricing-3tier-divided",
  name: "Three-Tier Hairline Pricing",
  subcat: "Tier Cards",
  layout: "3-tier-divided",
  archetype: "pricing-tiers",
  tags: ["pricing", "fintech", "saas", "clean", "toggle"],
  descEn: "Flush 3-column pricing band with monthly/annual billing toggle and highlighted Pro column.",
  descZh: "通栏三列 1px 分割定价矩阵，支持月付/年付切换与推荐档顶部丝带标记。",
  contract: [
    "Render currency amounts in tabular numerals so toggling annual discount never shifts layout.",
    "Highlight featured tier via top accent border and contrast button rather than scale(1.05) overflow."
  ]
};
