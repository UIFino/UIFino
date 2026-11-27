import type { ComponentAssetMeta } from "@/core/codegen";

export const motionSpringCounterMeta: ComponentAssetMeta = {
  id: "motion-spring-counter",
  name: "Tabular Spring Counter",
  nameZh: "弹簧数字滚动",
  subcat: "Numeric",
  layout: "bento-grid",
  archetype: "motion-lab",
  tags: ["motion", "counter", "ticker", "numbers", "60fps"],
  descEn: "60fps tabular-nums spring counter that skips animation under prefers-reduced-motion.",
  descZh: "60 帧等宽数字滚动过渡，在开启减弱动态效果时自动瞬时归位。",
  contract: [
    "Enforce font-variant-numeric: tabular-nums to prevent horizontal jitter.",
    "Respect prefers-reduced-motion: reduce."
  ]
};
