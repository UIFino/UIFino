import type { ComponentAssetMeta } from "@/core/codegen";

export const tableTelemetryDirectoryMeta: ComponentAssetMeta = {
  id: "table-telemetry-directory",
  name: "Sortable Telemetry Data Table",
  subcat: "Sortable Tables",
  layout: "data-table",
  archetype: "data-table",
  tags: ["table", "data", "sort", "telemetry", "saas"],
  descEn: "5-column hairline data table with status indicators, right-aligned latency numerals, and filter bar.",
  descZh: "五列高密度工程表格，支持状态圆点、右对齐等宽延迟耗时与快速过滤。",
  contract: [
    "Wrap wide tables in overflow-x-auto inside a min-w-0 parent so 375px screens never break.",
    "Right-align numeric columns with tabular-nums."
  ]
};
