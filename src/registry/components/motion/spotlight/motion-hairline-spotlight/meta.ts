import type { ComponentAssetMeta } from "@/core/codegen";

export const motionHairlineSpotlightMeta: ComponentAssetMeta = {
  id: "motion-hairline-spotlight",
  name: "Radial Border Spotlight",
  nameZh: "光标聚光描边",
  subcat: "Pointer",
  layout: "bento-grid",
  archetype: "spotlight-card",
  tags: ["motion", "spotlight", "cursor", "glow", "dark"],
  descEn: "Pointer-tracking radial border illumination rendered purely via CSS custom properties.",
  descZh: "跟随鼠标位置的径向聚光细边框，基于 CSS 变量实现零重排渲染。",
  contract: [
    "Update pointer coordinates via CSS variables without triggering React re-renders.",
    "Disable pointer listeners on coarse touch devices."
  ]
};
