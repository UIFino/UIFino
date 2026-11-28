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
  ],
  contractZh: [
    "移动端下将四列页脚目录收折为规整的 2×2 双列网格。",
    "次要页脚链接文字对比度始终满足至少 4.5:1 可读标准。"
  ]
};
