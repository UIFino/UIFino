import {
  claudeCodeClient,
  clineClient,
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
  codexClient,
  clineClient
];

export const MCP_CAPABILITIES: readonly McpCapabilitySpec[] = [
  {
    tool: "search_catalog",
    scope: "Catalog",
    params: "kind, category, tags",
    descZh: "按桌面网站或移动应用及 6 大行业领域检索标杆产品的 DESIGN.md 协议。",
    descEn: "Retrieve Website & Mobile App DESIGN.md specs across 6 industry domains."
  },
  {
    tool: "match_ui_style",
    scope: "Styles",
    params: "tone, scenario, radius",
    descZh: "在 10 套界面流派中按明暗基调与业务场景匹配最契合的通用风格协议。",
    descEn: "Match one of 10 UI style genres by tone, scenario, and surface physics."
  },
  {
    tool: "get_component_code",
    scope: "Components",
    params: "category, id, radius, skin",
    descZh: "拉取注入指定圆角与皮肤令牌后的 React + Tailwind 组件源码与护栏。",
    descEn: "Fetch clean React + Tailwind component code tuned to your active skin and radius."
  },
  {
    tool: "scaffold_template",
    scope: "Templates",
    params: "kind, scene, id",
    descZh: "按整站工程或单页成品一键拉取页面路由结构与配套样式令牌。",
    descEn: "Scaffold multi-page starters or single-page compositions with pre-wired tokens."
  },
  {
    tool: "compute_surface_tokens",
    scope: "Tokens",
    params: "studio, seedHex, format",
    descZh: "实时计算网格极光背景、多层阴影、11 级无障碍色阶与模块化字号变量。",
    descEn: "Generate CSS variables or Tailwind config for backgrounds, shadows, shades, and type."
  }
];
