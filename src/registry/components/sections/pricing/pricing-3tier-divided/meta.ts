import type { ComponentAssetMeta } from "@/core/codegen";

export const pricing3TierDividedMeta: ComponentAssetMeta = {
  id: "pricing-3tier-divided",
  name: "Three-Tier Hairline Pricing",
  nameZh: "三列细分定价矩阵",
  subcat: "Tier Cards",
  layout: "3-tier-divided",
  archetype: "pricing-tiers",
  tags: ["pricing", "fintech", "saas", "clean", "toggle"],
  descEn: "Flush 3-column pricing band with monthly/annual billing toggle and highlighted Pro column.",
  descZh: "通栏三列 1px 分割定价矩阵，支持月付/年付切换与推荐档顶部丝带标记。",
  contract: [
    "Render currency amounts in tabular numerals so toggling annual discount never shifts layout.",
    "Highlight featured tier via top accent border and contrast button rather than scale(1.05) overflow."
  ],
  contractZh: [
    "所有金额数字使用等宽字体对齐，切换月付/年付折扣时不跳位。",
    "推荐方案通过顶部主题描边与实心按钮凸显，禁止强行 scale 放大破坏行高对称。"
  ]
};
