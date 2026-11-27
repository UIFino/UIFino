import type { McpClientConfig } from "./types";

export const codexClient: McpClientConfig = {
  id: "codex",
  name: "Codex CLI",
  badge: "TOML",
  file: "~/.codex/config.toml",
  lang: "toml",
  snippet: `[mcp_servers.uifino]
url = "https://mcp.uifino.dev/mcp"
enabled = true`,
  descZh: "配置 ~/.codex/config.toml 启用规范与令牌查询",
  descEn: "Add uifino registry endpoint to config.toml"
};
