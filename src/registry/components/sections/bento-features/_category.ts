import type { RegisteredComponentCategory } from "../../_taxonomy";
import { bentoProtocolGridMeta } from "./bento-protocol-grid/meta";
import { featuresNumberedRailMeta } from "./features-numbered-rail/meta";

export const bentoFeaturesCategory: RegisteredComponentCategory = {
  id: "bento-features",
  assetType: "section",
  name: "Bento & Features",
  nameZh: "特性与便当格 (Bento)",
  totalCount: 34,
  miniKind: "bento",
  descEn: "Asymmetric 12-column bento grids, numbered 01/02/03 architectural workflows, and code proof cards.",
  descZh: "非对称 12 列便当盒网格、01/02/03 编号流程条与代码能力展示区块。",
  items: [bentoProtocolGridMeta, featuresNumberedRailMeta]
};
