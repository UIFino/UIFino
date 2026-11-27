import type { RegisteredComponentCategory } from "../../_taxonomy";
import { tableTelemetryDirectoryMeta } from "./table-telemetry-directory/meta";

export const tablesCategory: RegisteredComponentCategory = {
  id: "tables",
  assetType: "block",
  name: "Tables",
  nameZh: "数据表格",
  totalCount: 22,
  miniKind: "table",
  descEn: "Sortable data grids, API audit logs, and inline-filterable resource directories.",
  descZh: "可排序数据网格、接口审计日志表与带行内筛选的资源目录。",
  items: [tableTelemetryDirectoryMeta]
};
