import type { McpClientConfig } from "./types";

export const cursorClient: McpClientConfig = {
  id: "cursor",
  name: "Cursor",
  badge: "JSON",
  file: ".cursor/mcp.json",
  lang: "json",
  snippet: `{
  "mcpServers": {
    "uifino": {
      "url": "https://mcp.uifino.dev/mcp"
    }
  }
}`,
  descZh: "写入 .cursor/mcp.json 在编辑器内自动拉取源码",
  descEn: "Configure .cursor/mcp.json for instant UI retrieval"
};
