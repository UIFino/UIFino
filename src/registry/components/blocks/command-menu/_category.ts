import type { RegisteredComponentCategory } from "../../_taxonomy";
import { cmdkProtocolPaletteMeta } from "./cmdk-protocol-palette/meta";

export const commandMenuCategory: RegisteredComponentCategory = {
  id: "command-menu",
  assetType: "block",
  name: "Command & Search",
  nameZh: "命令面板与检索 (⌘K)",
  totalCount: 14,
  miniKind: "cmdk",
  descEn: "Keyboard-first ⌘K command palettes, multi-facet filter drawers, and keycap footer bars.",
  descZh: "键盘优先的 ⌘K 全局命令框、多维筛选抽屉与快捷键底栏模块。",
  items: [cmdkProtocolPaletteMeta]
};
