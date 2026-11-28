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
  ],
  contractZh: [
    "只对 transform 与 opacity 合成属性加动画，严禁直接过渡 height 或 margin。",
    "整组交错入场的总耗时封顶在 360ms 内，确保首屏呼之欲出。"
  ]
};
