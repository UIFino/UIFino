import type { RegisteredComponentCategory } from "../../_taxonomy";
import { faqHairlineListMeta } from "./faq-hairline-list/meta";

export const faqCategory: RegisteredComponentCategory = {
  id: "faq",
  assetType: "section",
  name: "FAQ",
  nameZh: "常见问题",
  totalCount: 14,
  miniKind: "faq",
  descEn: "Two-column and stacked FAQ disclosure sections for pricing and product pages.",
  descZh: "适用于定价页与产品官网的单列及双栏折叠问答区块。",
  items: [faqHairlineListMeta]
};
