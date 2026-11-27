import type { RegisteredComponentCategory } from "../../_taxonomy";
import { motionSegmentedRailMeta } from "./motion-segmented-rail/meta";

export const staggerRevealCategory: RegisteredComponentCategory = {
  id: "stagger-reveal",
  assetType: "motion",
  name: "Stagger & Step Progress",
  nameZh: "序列入场与分步进度",
  totalCount: 12,
  miniKind: "motion",
  descEn: "Segmented progress rails, 40ms list stagger reveals, and crisp tab underline glides.",
  descZh: "分段自动轮播进度条、40ms 列表依次浮现与平滑下划线切换动效。",
  items: [motionSegmentedRailMeta]
};
