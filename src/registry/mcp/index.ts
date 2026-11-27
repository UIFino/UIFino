import {
  claudeCodeClient,
  codexClient,
  cursorClient,
  type McpClientConfig,
  windsurfClient
} from "./clients";

export * from "./clients";

export interface McpCapabilitySpec {
  readonly tool: string;
  readonly scope: string;
  readonly params: string;
  readonly descZh: string;
  readonly descEn: string;
}

export const MCP_CLIENTS: readonly McpClientConfig[] = [
  claudeCodeClient,
  cursorClient,
  windsurfClient,
  codexClient
];

export const MCP_CAPABILITIES: readonly McpCapabilitySpec[] = [
  {
    tool: "search_catalog",
    scope: "Catalog",
    params: "kind, style, tags, theme",
    descZh: "按端类型（Web/App）、视觉调性与配色明暗检索真实标杆并拉取 DESIGN.md 协议。",
    descEn:
      "Retrieve Website & Mobile App DESIGN.md specs filtered by platform, style, and palette tone."
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
    descEn:
      "Fetch production source in React, Vue, Svelte, or Solid with custom radius and density tokens."
  },
  {
    tool: "generate_surface_tokens",
    scope: "Tools",
    params: "engine, colors, elevation, format",
    descZh: "生成参数化网格/噪点/极光背景与分层阴影的 CSS 变量或 Tailwind 工具类。",
    descEn:
      "Generate CSS or Tailwind code for grid/aurora/grain backgrounds and layered surface shadows."
  }
];
