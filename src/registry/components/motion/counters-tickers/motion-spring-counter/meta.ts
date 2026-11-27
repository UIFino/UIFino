import type { ComponentAssetMeta } from "@/core/codegen";

export const motionSpringCounterMeta: ComponentAssetMeta = {
  id: "motion-spring-counter",
  name: "Cubic-Out Tabular Counter Strip",
  subcat: "Numeric Motion",
  layout: "motion-stage",
  archetype: "motion-lab",
  tags: ["motion", "counter", "stats", "tabular"],
  descEn: "60fps requestAnimationFrame counter with cubic-out easing, decimal precision, and reduced-motion bypass.",
  descZh: "60 帧平滑缓动数字增长组件，支持小数位精度锁定与减弱动态偏好自动降级。",
  contract: [
    "Duration capped at 750ms cubic-bezier(0.22, 1, 0.36, 1) so numbers settle briskly.",
    "Honor prefers-reduced-motion by rendering target value on frame 0."
  ]
};
