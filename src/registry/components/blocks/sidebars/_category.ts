import type { RegisteredComponentCategory } from "../../_taxonomy";
import { sidebarCollapsibleRailMeta } from "./sidebar-collapsible-rail/meta";

export const sidebarsCategory: RegisteredComponentCategory = {
  id: "sidebars",
  assetType: "block",
  name: "Sidebars",
  nameZh: "侧边栏",
  totalCount: 15,
  miniKind: "sidebar",
  descEn: "Collapsible workspace rails, docs tree navigators, and dual-tier app sidebars.",
  descZh: "可折叠后台侧栏、文档树目录与双层应用导航栏。",
  items: [sidebarCollapsibleRailMeta]
};
