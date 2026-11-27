import type { ComponentAssetMeta } from "@/core/codegen";

export const bentoProtocolGridMeta: ComponentAssetMeta = {
  id: "bento-protocol-grid",
  name: "Asymmetric Protocol Bento",
  subcat: "Bento Grids",
  layout: "bento-grid",
  archetype: "bento-grid",
  tags: ["bento", "features", "grid", "saas", "dark"],
  descEn: "Zero-gap hairline bento combining a wide token sync matrix with compact latency and CLI tiles.",
  descZh: "1px 零间距细线便当格，主卡展示令牌同步矩阵，副卡展示延迟与命令行指标。",
  contract: [
    "Set min-w-0 on every CSS grid child containing code snippets or tables.",
    "Stack into single-column cards below 768px while preserving 1px dividers."
  ]
};
