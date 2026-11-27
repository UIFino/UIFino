import type { StarterTemplateSpec } from "../_taxonomy";

export const observabilityConsolePage: StarterTemplateSpec = {
  id: "observability-console-page",
  kind: "page",
  scene: "overview",
  category: "Overview",
  name: "Telemetry Overview",
  nameZh: "实时监控看板页",
  stack: "Single Page · TSX",
  skinId: "hairline-grid",
  skinLabel: "Hairline Style",
  accent: "#D4FF33",
  canvas: "#0A0B0E",
  surface: "#101217",
  border: "#1F242D",
  pagesCount: 1,
  routes: ["Sidebar", "KPI Strip", "Latency Feed", "Audit Table"],
  descEn: "Single-page observability dashboard combining sidebar rail, KPI cards, and audit table.",
  descZh: "整合可折叠侧栏、三栏核心指标与实时请求审计日志的单页监控看板。"
};
