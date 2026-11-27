import type { RegisteredComponentCategory } from "../../_taxonomy";
import { motionSmoothAccordionMeta } from "./motion-smooth-accordion/meta";

export const accordionCategory: RegisteredComponentCategory = {
  id: "accordion",
  assetType: "motion",
  name: "Accordion",
  nameZh: "折叠展开",
  totalCount: 8,
  miniKind: "accordion",
  descEn: "Smooth 0fr-to-1fr disclosure panels, collapsible code drawers, and tree expanders.",
  descZh: "平滑高度过渡的折叠面板、代码收起抽屉与树节点展开动效。",
  items: [motionSmoothAccordionMeta]
};
