import type { ComponentAssetMeta } from "@/core/codegen";

export const bentoProtocolGridMeta: ComponentAssetMeta = {
  id: "bento-protocol-grid",
  name: "Protocol Bento Grid",
  nameZh: "协议便当格",
  subcat: "Asymmetric",
  layout: "bento-grid",
  archetype: "bento-grid",
  tags: ["bento", "features", "grid", "dark", "saas"],
  descEn: "Asymmetric 2-column bento cells with concentric radii and live token badges.",
  descZh: "非对称双列便当盒分格，采用内外同心圆角与紧凑特性卡片布局。",
  contract: [
    "Keep outer card radius and inner code preview radius concentric.",
    "Collapse asymmetric columns cleanly to single column below 768px."
  ]
};
