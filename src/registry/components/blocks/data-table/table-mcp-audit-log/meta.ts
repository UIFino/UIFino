import type { ComponentAssetMeta } from "@/core/codegen";

export const tableMcpAuditLogMeta: ComponentAssetMeta = {
  id: "table-mcp-audit-log",
  name: "MCP Tool Call Inspector",
  subcat: "Log Streams",
  layout: "data-table",
  archetype: "data-table",
  tags: ["table", "logs", "mcp", "devtools"],
  descEn: "Structured request log table displaying timestamp, tool name, matched assets, and response time.",
  descZh: "按时间流展示工具调用名、命中规范资产与响应耗时的审计日志模块。",
  contract: ["Truncate long query payloads cleanly with single-line ellipsis."]
};
