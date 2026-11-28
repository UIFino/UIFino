import type { ComponentAssetMeta } from "@/core/codegen";

export const tableTelemetryDirectoryMeta: ComponentAssetMeta = {
  id: "table-telemetry-directory",
  name: "Telemetry Audit Table",
  nameZh: "遥测审计表格",
  subcat: "Audit Log",
  layout: "data-table",
  archetype: "data-table",
  tags: ["table", "logs", "audit", "dashboard", "devtools"],
  descEn: "Dense hairline data table with tabular latency columns and status indicators.",
  descZh: "配备等宽延迟列与状态圆点的高密度细线审计数据表格。",
  contract: [
    "Enable horizontal scroll wrapper on narrow screens without clipping columns.",
    "Right-align numeric latency and cost columns with tabular-nums."
  ],
  contractZh: [
    "窄屏容器外层包裹横向滚动区，避免列内容被强行裁切挤压。",
    "延迟与费用数值列统一右对齐并应用等宽数字。"
  ]
};
