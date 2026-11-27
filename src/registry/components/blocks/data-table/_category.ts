import type { RegisteredComponentCategory } from "../../_taxonomy";
import { tableMcpAuditLogMeta } from "./table-mcp-audit-log/meta";
import { tableTelemetryDirectoryMeta } from "./table-telemetry-directory/meta";

export const dataTableCategory: RegisteredComponentCategory = {
  id: "data-table",
  assetType: "block",
  name: "Data Tables & Logs",
  nameZh: "数据表格与日志流",
  totalCount: 24,
  miniKind: "table",
  descEn: "High-density sortable registries, real-time MCP request logs, and token audit tables.",
  descZh: "高密度可排序目录表、实时请求日志检查器与用量审计表格模块。",
  items: [tableTelemetryDirectoryMeta, tableMcpAuditLogMeta]
};
