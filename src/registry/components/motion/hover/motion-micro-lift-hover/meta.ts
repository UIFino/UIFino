import type { ComponentAssetMeta } from "@/core/codegen";

export const motionMicroLiftHoverMeta: ComponentAssetMeta = {
  id: "motion-micro-lift-hover",
  name: "Micro-Lift Tactile Card",
  nameZh: "微抬升悬停卡",
  subcat: "Micro-Interaction",
  layout: "bento-grid",
  archetype: "hover-card",
  tags: ["motion", "hover", "micro-interaction", "card"],
  descEn: "160ms crisp 2px vertical lift and border highlight feedback on pointer hover.",
  descZh: "悬停时触发 160ms 的 2px 轻盈上浮与边框高亮微交互。",
  contract: [
    "Scope hover transforms under @media (hover: hover) to avoid sticky touch states.",
    "Keep hover transition between 140ms and 180ms."
  ]
};
