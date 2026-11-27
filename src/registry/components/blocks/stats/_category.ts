import type { RegisteredComponentCategory } from "../../_taxonomy";
import { statsKpiStripMeta } from "./stats-kpi-strip/meta";

export const statsCategory: RegisteredComponentCategory = {
  id: "stats",
  assetType: "block",
  name: "Stats",
  nameZh: "统计卡片",
  totalCount: 16,
  miniKind: "stats",
  descEn: "KPI metric strips, quota usage gauges, and real-time status cards.",
  descZh: "核心业务指标卡、配额用量条与实时运行状态面板。",
  items: [statsKpiStripMeta]
};
