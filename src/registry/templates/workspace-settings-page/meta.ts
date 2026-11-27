import type { StarterTemplateSpec } from "../_taxonomy";

export const workspaceSettingsPage: StarterTemplateSpec = {
  id: "workspace-settings-page",
  kind: "page",
  scene: "settings",
  category: "Settings",
  name: "Workspace Settings",
  nameZh: "团队设置中心页",
  stack: "Single Page · TSX",
  skinId: "clean-saas",
  skinLabel: "Clean Style",
  accent: "#4F46E5",
  canvas: "#F8FAFC",
  surface: "#FFFFFF",
  border: "#E2E8F0",
  pagesCount: 1,
  routes: ["General", "Members", "API Keys", "Danger Zone"],
  descEn: "Structured workspace settings page with sub-navigation, API token scopes, and danger zone.",
  descZh: "带左侧二级菜单、成员权限、接口密钥生成与危险操作区的设置中心单页。"
};
