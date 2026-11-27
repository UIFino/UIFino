import type { ComponentAssetMeta } from "@/core/codegen";

export const cmdkProtocolPaletteMeta: ComponentAssetMeta = {
  id: "cmdk-protocol-palette",
  name: "⌘K Protocol & Asset Launcher",
  subcat: "Command Palette",
  layout: "cmdk",
  archetype: "cmdk-palette",
  tags: ["cmdk", "search", "keyboard", "devtools", "dark"],
  descEn: "Grouped instant command menu with category pills, active row highlight, and keycap hints.",
  descZh: "带分类过滤标签、高亮选中行与等宽键帽提示的全局命令启动器。",
  contract: [
    "Support Up/Down arrow traversal, Enter selection, and Escape dismissal.",
    "Render empty-query state with actionable quick jumps."
  ]
};
