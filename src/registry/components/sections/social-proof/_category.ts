import type { RegisteredComponentCategory } from "../../_taxonomy";
import { quotesArchitecturalWallMeta } from "./quotes-architectural-wall/meta";

export const socialProofCategory: RegisteredComponentCategory = {
  id: "social-proof",
  assetType: "section",
  name: "Testimonials & Logos",
  nameZh: "口碑证言与客户墙",
  totalCount: 19,
  miniKind: "quotes",
  descEn: "Monochrome engineering logo strips and compact verified developer quote grids.",
  descZh: "单色克制品牌标志带与真实工程师引用卡片网格。",
  items: [quotesArchitecturalWallMeta]
};
