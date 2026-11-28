import type { ComponentAssetMeta } from "@/core/codegen";

export const pricingUsageLedgerMeta: ComponentAssetMeta = {
  id: "pricing-usage-ledger",
  name: "Seat & Token Usage Ledger",
  nameZh: "席位与按量计费表",
  subcat: "Usage Based",
  layout: "3-tier-divided",
  archetype: "pricing-tiers",
  tags: ["pricing", "devtools", "fintech", "calculator"],
  descEn: "Developer infrastructure pricing combining base seat tier with transparent per-million token ledger.",
  descZh: "基础设施按量计费表，左侧基础席位包，右侧清晰列出百万调用单价。",
  contract: ["Keep unit rates right-aligned in monospace columns."],
  contractZh: ["单价金额在等宽数字列中统一右对齐，便于纵览比较。"]
};
