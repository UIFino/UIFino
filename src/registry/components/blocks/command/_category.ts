import type { RegisteredComponentCategory } from "../../_taxonomy";
import { cmdkProtocolPaletteMeta } from "./cmdk-protocol-palette/meta";

export const commandCategory: RegisteredComponentCategory = {
  id: "command",
  assetType: "block",
  name: "Command",
  nameZh: "命令搜索",
  totalCount: 12,
  miniKind: "cmdk",
  descEn: "⌘K command menus, instant filter popovers, and keyboard shortcut palettes.",
  descZh: "⌘K 全局命令面板、即时筛选浮层与键盘快捷操作框。",
  items: [cmdkProtocolPaletteMeta]
};
