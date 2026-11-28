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
  ],
  contractZh: [
    "通过 CSS 自定义变量实时更新鼠标坐标，避免引发 React 状态频繁重渲染。",
    "在粗精度触摸设备上自动关闭指针追踪监听以节省电量。"
  ]
};
