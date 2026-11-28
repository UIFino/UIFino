import type { ComponentAssetMeta } from "@/core/codegen";

export const bentoProtocolGridMeta: ComponentAssetMeta = {
  id: "bento-protocol-grid",
  name: "Protocol Bento Grid",
  nameZh: "特性便当网格",
  subcat: "Asymmetric",
  layout: "bento-grid",
  archetype: "bento-grid",
  tags: ["bento", "features", "grid", "dark", "saas"],
  descEn: "Asymmetric 2-column bento cells with concentric radii and live token badges.",
  descZh: "非对称双列便当盒分格，采用内外同心圆角与紧凑特性卡片布局。",
  contract: [
    "Keep outer card radius and inner code preview radius concentric.",
    "Collapse asymmetric columns cleanly to single column below 768px."
  ],
  contractZh: [
    "保持外层卡片圆角与内嵌预览框圆角呈同心关系（外圆角 ≥ 内圆角 + 内边距）。",
    "768px 以下断点平滑收拢为单列垂直排列，避免内容横向挤压。"
  ]
};
