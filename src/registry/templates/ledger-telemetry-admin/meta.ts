import type { StarterTemplateSpec } from "../_taxonomy";

export const ledgerTelemetryAdmin: StarterTemplateSpec = {
  id: "ledger-telemetry-admin",
  name: "Fintech & Telemetry Console",
  nameZh: "Ledger 账单与遥测监控后台",
  category: "Dashboard",
  stack: "React 19 · Vite",
  skinId: "stripe",
  skinLabel: "Stripe DESIGN.md",
  accent: "#635BFF",
  canvas: "#0A2540",
  surface: "#102E4D",
  border: "#21476E",
  pagesCount: 6,
  routes: ["KPI Console", "Usage Ledger", "API Scopes", "Webhooks"],
  descEn:
    "Collapsible 220px rail paired with tabular billing ledgers, latency strips, and scoped API key tables.",
  descZh: "紧凑侧栏搭配等宽账单流水、毫秒延迟指标条与带权限范围的密钥管理后台。"
};
