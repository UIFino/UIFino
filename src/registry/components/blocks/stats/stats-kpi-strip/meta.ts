import type { ComponentAssetMeta } from "@/core/codegen";

export const statsKpiStripMeta: ComponentAssetMeta = {
  id: "stats-kpi-strip",
  name: "3-Column KPI Metric Cards",
  nameZh: "三栏核心指标卡",
  subcat: "KPI",
  layout: "bento-grid",
  archetype: "stats-kpi",
  tags: ["stats", "kpi", "metrics", "dashboard", "fintech"],
  descEn: "Compact 3-column KPI cards with delta badges and tabular monospace figures.",
  descZh: "带涨跌幅标签与等宽数字排版的三栏核心业务指标卡片。",
  contract: [
    "Format all currency and latency numbers with tabular-nums.",
    "Pair color delta indicators with explicit + or - signs."
  ]
};
