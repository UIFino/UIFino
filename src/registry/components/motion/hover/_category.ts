import type { RegisteredComponentCategory } from "../../_taxonomy";
import { motionMicroLiftHoverMeta } from "./motion-micro-lift-hover/meta";

export const hoverCategory: RegisteredComponentCategory = {
  id: "hover",
  assetType: "motion",
  name: "Hover",
  nameZh: "悬停动效",
  totalCount: 12,
  miniKind: "hover",
  descEn: "Tactile button presses, 2px card lifts, and magnetic pill highlights.",
  descZh: "按钮按压回弹、卡片微抬升与胶囊游标滑动高亮。",
  items: [motionMicroLiftHoverMeta]
};
