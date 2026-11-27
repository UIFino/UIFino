import type { ComponentAssetMeta } from "@/core/codegen";

export const motionHairlineSpotlightMeta: ComponentAssetMeta = {
  id: "motion-hairline-spotlight",
  name: "1px Hairline Pointer Spotlight",
  subcat: "Pointer Reactive",
  layout: "motion-stage",
  archetype: "motion-lab",
  tags: ["motion", "hover", "spotlight", "dark", "hairline"],
  descEn: "GPU-composited radial mask illuminating only the 1px card border near cursor coordinates.",
  descZh: "仅照亮光标附近 1px 边框线的克制聚光动效，避免大面积霓虹光斑污染正文。",
  contract: ["Update CSS --mx / --my coordinates via pointermove without triggering React re-renders."]
};
