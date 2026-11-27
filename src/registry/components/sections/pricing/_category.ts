import type { RegisteredComponentCategory } from "../../_taxonomy";
import { pricing3TierDividedMeta } from "./pricing-3tier-divided/meta";
import { pricingUsageLedgerMeta } from "./pricing-usage-ledger/meta";

export const pricingCategory: RegisteredComponentCategory = {
  id: "pricing",
  assetType: "section",
  name: "Pricing & Tiers",
  nameZh: "定价与套餐对比",
  totalCount: 22,
  miniKind: "pricing",
  descEn: "Divided 3-tier SaaS pricing grids, annual billing switches, and seats/usage calculators.",
  descZh: "三档细线分割定价表、年付折扣切换器与按量计费阶梯区块。",
  items: [pricing3TierDividedMeta, pricingUsageLedgerMeta]
};
