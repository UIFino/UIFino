import type { RegisteredComponentCategory } from "../../_taxonomy";
import { motionStaggerRevealMeta } from "./motion-stagger-reveal/meta";

export const revealCategory: RegisteredComponentCategory = {
  id: "reveal",
  assetType: "motion",
  name: "Reveal",
  nameZh: "入场动画",
  totalCount: 11,
  miniKind: "motion",
  descEn: "Staggered section entrances, text line reveals, and scroll-linked progress bars.",
  descZh: "阶梯序列入场、标题逐行浮现与滚动进度联动效果。",
  items: [motionStaggerRevealMeta]
};
