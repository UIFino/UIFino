import type { ComponentAssetMeta } from "@/core/codegen";

export const motionStaggerRevealMeta: ComponentAssetMeta = {
  id: "motion-stagger-reveal",
  name: "Staggered Grid Reveal",
  nameZh: "序列网格入场",
  subcat: "Entrance",
  layout: "bento-grid",
  archetype: "motion-lab",
  tags: ["motion", "reveal", "stagger", "entrance"],
  descEn: "40ms staggered opacity + translateY entrance choreography on compositor properties only.",
  descZh: "仅驱动透明度与位移合成属性的 40ms 阶梯式序列入场动画。",
  contract: [
    "Animate transform and opacity only; never animate height or margin.",
    "Cap total stagger sequence under 360ms so content feels immediate."
  ]
};
