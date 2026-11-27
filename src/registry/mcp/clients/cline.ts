import type { McpClientConfig } from "./types";

export const clineClient: McpClientConfig = {
  id: "cline",
  name: "Cline",
  badge: "JSON",
  file: "cline_mcp_settings.json",
  lang: "json",
  snippet: `{
  "mcpServers": {
    "uifino": {
      "url": "https://mcp.uifino.dev/mcp",
      "disabled": false
    }
  }
}`,
  descZh: "写入 cline_mcp_settings.json 供 VS Code Cline 直接调用",
  descEn: "Add to cline_mcp_settings.json for VS Code Cline agent workflows"
};
