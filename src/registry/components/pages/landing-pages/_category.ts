import type { RegisteredComponentCategory } from "../../_taxonomy";
import { pageDevtoolsLaunchMeta } from "./page-devtools-launch/meta";
import { pageEditorialAiMeta } from "./page-editorial-ai/meta";

export const landingPagesCategory: RegisteredComponentCategory = {
  id: "landing-pages",
  assetType: "page",
  name: "Product Landing Pages",
  nameZh: "完整产品落地页",
  totalCount: 12,
  miniKind: "page",
  descEn: "End-to-end single-page compositions combining navbar, split hero, bento proof, pricing, and footer.",
  descZh: "包含顶栏、分栏首屏、便当盒特性、三档定价与页脚的完整单页编排资产。",
  items: [pageDevtoolsLaunchMeta, pageEditorialAiMeta]
};
