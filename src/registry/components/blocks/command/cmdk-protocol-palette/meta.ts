import type { ComponentAssetMeta } from "@/core/codegen";

export const cmdkProtocolPaletteMeta: ComponentAssetMeta = {
  id: "cmdk-protocol-palette",
  name: "Global Command Palette",
  nameZh: "全局命令面板",
  subcat: "Search",
  layout: "auth-card",
  archetype: "cmdk-palette",
  tags: ["cmdk", "command", "search", "keyboard", "devtools"],
  descEn: "⌘K instant search dialog with group tabs, arrow-key navigation, and shortcut hints.",
  descZh: "支持 ⌘K 唤起、分组标签筛选与上下方向键跳转的快捷命令框。",
  contract: [
    "Auto-focus search input on open and cycle items with ArrowUp / ArrowDown.",
    "Display explicit ESC and Enter keyboard hints."
  ]
};
