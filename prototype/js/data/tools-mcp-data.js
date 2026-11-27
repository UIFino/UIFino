// Parameterized Frontend Tools (Background Studio + Shadow & Token Lab) & MCP Integration Data

export const BG_PRESETS = [
  {
    id: "linear-grid",
    name: "Obsidian Grid",
    engine: "grid",
    canvas: "#101114",
    accent: "#5e6ad2",
    secondary: "#23252a",
    cellSize: 32,
    opacity: 34,
    spread: 68,
    noise: 0
  },
  {
    id: "vercel-hairline",
    name: "Monochrome Wire",
    engine: "grid",
    canvas: "#09090b",
    accent: "#ededed",
    secondary: "#27272a",
    cellSize: 48,
    opacity: 26,
    spread: 80,
    noise: 0
  },
  {
    id: "borealis-lime",
    name: "Chartreuse Aurora",
    engine: "aurora",
    canvas: "#141518",
    accent: "#ceff00",
    secondary: "#38bdf8",
    cellSize: 40,
    opacity: 24,
    spread: 62,
    noise: 14
  },
  {
    id: "stripe-mesh",
    name: "Blurple Glow",
    engine: "aurora",
    canvas: "#0a192f",
    accent: "#635bff",
    secondary: "#00d4ff",
    cellSize: 44,
    opacity: 38,
    spread: 72,
    noise: 10
  },
  {
    id: "claude-grain",
    name: "Warm Parchment Grain",
    engine: "grain",
    canvas: "#faf9f5",
    accent: "#c96442",
    secondary: "#e6e2d6",
    cellSize: 28,
    opacity: 18,
    spread: 58,
    noise: 35
  },
  {
    id: "dot-matrix",
    name: "Precision Dot Matrix",
    engine: "dots",
    canvas: "#161618",
    accent: "#ceff00",
    secondary: "#52525b",
    cellSize: 22,
    opacity: 42,
    spread: 65,
    noise: 0
  }
];

export const SHADOW_PRESETS = [
  {
    id: "hairline-flat",
    name: "00 · Hairline Flat",
    mode: "dark",
    yOffset: 0,
    blur: 0,
    spread: 0,
    opacity: 0,
    rimLight: 8,
    borderAlpha: 16,
    radius: 0,
    density: "default"
  },
  {
    id: "linear-panel",
    name: "01 · Subtle Panel",
    mode: "dark",
    yOffset: 6,
    blur: 18,
    spread: -2,
    opacity: 38,
    rimLight: 10,
    borderAlpha: 14,
    radius: 6,
    density: "compact"
  },
  {
    id: "raycast-float",
    name: "02 · Floating Command",
    mode: "dark",
    yOffset: 18,
    blur: 44,
    spread: -6,
    opacity: 58,
    rimLight: 14,
    borderAlpha: 18,
    radius: 10,
    density: "default"
  },
  {
    id: "stripe-clean",
    name: "03 · Crisp Light Card",
    mode: "light",
    yOffset: 12,
    blur: 32,
    spread: -4,
    opacity: 12,
    rimLight: 0,
    borderAlpha: 10,
    radius: 8,
    density: "spacious"
  }
];

export const MCP_CLIENTS = [
  {
    id: "claude-code",
    name: "Claude Code",
    file: "CLI Terminal",
    snippet: `claude mcp add --transport http uifino https://mcp.uifino.dev/mcp`
  },
  {
    id: "cursor",
    name: "Cursor",
    file: ".cursor/mcp.json",
    snippet: `{
  "mcpServers": {
    "uifino": {
      "url": "https://mcp.uifino.dev/mcp"
    }
  }
}`
  },
  {
    id: "windsurf",
    name: "Windsurf",
    file: "mcp_config.json",
    snippet: `{
  "mcpServers": {
    "uifino": {
      "serverUrl": "https://mcp.uifino.dev/mcp"
    }
  }
}`
  },
  {
    id: "codex",
    name: "Codex CLI",
    file: "~/.codex/config.toml",
    snippet: `[mcp_servers.uifino]
url = "https://mcp.uifino.dev/mcp"
enabled = true`
  }
];

export const MCP_CAPABILITIES = [
  {
    tool: "search_catalog",
    scope: "Catalog",
    params: "kind, style, tags, theme",
    descZh: "按端类型（Web/App）、视觉调性与配色明暗检索真实标杆并拉取 DESIGN.md 协议。",
    descEn: "Retrieve Website & Mobile App DESIGN.md specs filtered by platform, style, and palette tone."
  },
  {
    tool: "search_components",
    scope: "Components",
    params: "assetType, category, layout, tags",
    descZh: "在 Section、Block、Page 与 Motion 四类资产中按布局骨架和功能标签精准匹配。",
    descEn: "Search across Section, Block, Page, and Motion assets by layout structure and tags."
  },
  {
    tool: "get_component_code",
    scope: "Workbench",
    params: "id, framework, radius, density, skin",
    descZh: "输出对应框架（React/Vue/Svelte/Solid）及指定圆角、间距密度下的可直接运行代码。",
    descEn: "Fetch production source in React, Vue, Svelte, or Solid with custom radius and density tokens."
  },
  {
    tool: "generate_surface_tokens",
    scope: "Tools",
    params: "engine, colors, elevation, format",
    descZh: "生成参数化网格/噪点/极光背景与分层阴影的 CSS 变量或 Tailwind 工具类。",
    descEn: "Generate CSS or Tailwind code for grid/aurora/grain backgrounds and layered surface shadows."
  }
];
