import type { ComponentAssetMeta } from "@/core/codegen";

export const sidebarCollapsibleRailMeta: ComponentAssetMeta = {
  id: "sidebar-collapsible-rail",
  name: "Collapsible Workspace Sidebar",
  nameZh: "可折叠侧边栏",
  subcat: "Workspace",
  layout: "bento-grid",
  archetype: "sidebar-nav",
  tags: ["sidebar", "navigation", "workspace", "dashboard"],
  descEn: "Keyboard-toggleable (⌘B) multi-group workspace rail with active border indicator.",
  descZh: "支持 ⌘B 快捷键收起的分租工作台侧边目录栏。",
  contract: [
    "Preserve scroll position across route transitions.",
    "Truncate long workspace and item names cleanly with ellipsis."
  ]
};
