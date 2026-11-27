import type { RegisteredComponentCategory } from "../../_taxonomy";
import { bentoProtocolGridMeta } from "./bento-protocol-grid/meta";

export const bentoCategory: RegisteredComponentCategory = {
  id: "bento",
  assetType: "section",
  name: "Bento",
  nameZh: "便当格",
  totalCount: 24,
  miniKind: "bento",
  descEn: "Modular multi-span feature cells and asymmetric bento showcase grids.",
  descZh: "按跨度自由拼装的特性展示分格与非对称产品卖点矩阵。",
  items: [bentoProtocolGridMeta]
};
