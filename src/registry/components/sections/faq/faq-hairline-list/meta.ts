import type { ComponentAssetMeta } from "@/core/codegen";

export const faqHairlineListMeta: ComponentAssetMeta = {
  id: "faq-hairline-list",
  name: "Hairline FAQ List",
  nameZh: "细线折叠问答",
  subcat: "Collapsible",
  layout: "bento-grid",
  archetype: "faq-accordion",
  tags: ["faq", "questions", "accordion", "docs"],
  descEn: "Single-border collapsible FAQ section with keyboard-accessible disclosure triggers.",
  descZh: "共用 1px 分割线的可折叠常见问题列表，支持全键盘回车展开。",
  contract: [
    "Use native button triggers with aria-expanded state.",
    "Prevent layout jump when answers expand or collapse."
  ]
};
