import type { StarterTemplateSpec } from "../_taxonomy";

export const ledgerTelemetryAdmin: StarterTemplateSpec = {
  id: "ledger-telemetry-admin",
  kind: "starter",
  scene: "admin",
  category: "Admin",
  name: "Ledger Admin",
  nameZh: "金融监控台",
  stack: "Next.js 15 · 6 Pages",
  skinId: "stripe",
  skinLabel: "Stripe DESIGN.md",
  accent: "#635BFF",
  canvas: "#0A2540",
  surface: "#112F4E",
  border: "#1E3F63",
  pagesCount: 6,
  routes: ["Overview", "Invoices", "Usage", "Webhooks", "API Keys"],
  descEn: "Fintech billing & telemetry backoffice starter with tabular KPI strips and audit logs.",
  descZh: "面向账单与接口用量的多页面数据监控后台，内置对账表格、回调配置与密钥权限。"
};
