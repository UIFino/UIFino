import type { ComponentAssetMeta } from "@/core/codegen";

export const motionSmoothAccordionMeta: ComponentAssetMeta = {
  id: "motion-smooth-accordion",
  name: "Grid-Row Smooth Accordion",
  nameZh: "平滑折叠面板",
  subcat: "Disclosure",
  layout: "bento-grid",
  archetype: "faq-accordion",
  tags: ["motion", "accordion", "collapse", "disclosure"],
  descEn: "Zero-JS-measurement smooth height transition powered by CSS grid-template-rows 0fr to 1fr.",
  descZh: "基于 CSS grid-template-rows 0fr 至 1fr 实现的零测量平滑展开收起。",
  contract: [
    "Use CSS grid 0fr/1fr transition instead of reading offsetHeight in JS.",
    "Preserve full keyboard Tab and Enter accessibility."
  ]
};
