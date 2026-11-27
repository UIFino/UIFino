import type { RegisteredComponentCategory } from "../../_taxonomy";
import { reviewsWallMeta } from "./reviews-architectural-wall/meta";

export const reviewsCategory: RegisteredComponentCategory = {
  id: "reviews",
  assetType: "section",
  name: "Reviews",
  nameZh: "客户评价",
  totalCount: 16,
  miniKind: "quotes",
  descEn: "Customer quote grids, case-study pull quotes, and Monochrome logo strips.",
  descZh: "客户评价卡片墙、案例引言条与单色品牌标志矩阵。",
  items: [reviewsWallMeta]
};
