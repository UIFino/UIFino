import type { RegisteredComponentCategory } from "../../_taxonomy";
import { pageObservabilityConsoleMeta } from "./page-observability-console/meta";

export const dashboardPagesCategory: RegisteredComponentCategory = {
  id: "dashboard-pages",
  assetType: "page",
  name: "Workspace Dashboards",
  nameZh: "后台工作台整页",
  totalCount: 14,
  miniKind: "page",
  descEn: "Collapsible sidebar shells paired with KPI strips, usage charts, and audit tables.",
  descZh: "左侧折叠导航栏搭配顶部核心指标带、趋势条与审计列表的完整后台页。",
  items: [pageObservabilityConsoleMeta]
};
