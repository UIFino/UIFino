import type { McpClientConfig } from "./types";

export const windsurfClient: McpClientConfig = {
  id: "windsurf",
  name: "Windsurf",
  badge: "JSON",
  file: "mcp_config.json",
  lang: "json",
  snippet: `{
  "mcpServers": {
    "uifino": {
      "serverUrl": "https://mcp.uifino.dev/mcp"
    }
  }
}`,
  descZh: "标准 serverUrl 协议接入 Cascade 智能体工作流",
  descEn: "Connect Windsurf Cascade via mcp_config.json"
};
