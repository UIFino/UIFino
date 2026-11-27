import type { McpClientConfig } from "./types";

export const claudeCodeClient: McpClientConfig = {
  id: "claude-code",
  name: "Claude Code",
  badge: "CLI",
  file: "CLI Terminal",
  lang: "bash",
  snippet: "claude mcp add --transport http uifino https://mcp.uifino.dev/mcp",
  descZh: "终端一行命令接入，支持检索 DESIGN.md 与组件",
  descEn: "One-line HTTP MCP setup for Claude Code CLI"
};
