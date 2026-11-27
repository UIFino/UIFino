import type { ComponentAssetMeta } from "@/core/codegen";

export const footerArchitecturalColumnsMeta: ComponentAssetMeta = {
  id: "footer-architectural-columns",
  name: "4-Column Sitemap Footer",
  nameZh: "四栏站点页脚",
  subcat: "Multi-Column",
  layout: "bento-grid",
  archetype: "footer-grid",
  tags: ["footer", "sitemap", "navigation", "minimal"],
  descEn: "Architectural 4-column footer with brand wordmark, link groups, and legal bar.",
  descZh: "带品牌字标、多列目录索引与底部版权条的四栏网格页脚。",
  contract: [
    "Collapse 4 link columns into 2x2 grid on mobile screens.",
    "Maintain 4.5:1 contrast on secondary footer links."
  ]
};
