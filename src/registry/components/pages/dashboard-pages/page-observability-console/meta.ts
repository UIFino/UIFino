import type { ComponentAssetMeta } from "@/core/codegen";

export const pageObservabilityConsoleMeta: ComponentAssetMeta = {
  id: "page-observability-console",
  name: "Telemetry & Usage Console Page",
  subcat: "Analytics Shell",
  layout: "full-page",
  archetype: "page-shell",
  tags: ["page", "dashboard", "telemetry", "saas", "dark"],
  descEn: "Full application shell featuring 220px navigation rail, 4-KPI header strip, and live request table.",
  descZh: "完整监控后台单页：左侧紧凑导航轨、顶部四格实时指标卡与底部请求明细表。",
  contract: ["Collapse left sidebar into a top drawer trigger below 1024px."]
};
