import type { ComponentAssetMeta } from "@/core/codegen";

export const motionSegmentedRailMeta: ComponentAssetMeta = {
  id: "motion-segmented-rail",
  name: "Segmented Workflow Progress Rail",
  subcat: "Progress & Tabs",
  layout: "motion-stage",
  archetype: "motion-lab",
  tags: ["motion", "progress", "tabs", "minimal"],
  descEn: "5-segment linear progress bar synced with step cards, inspired by getdesign.md hero rail.",
  descZh: "源自 getdesign.md 首屏的五段式细线进度条，与步骤内容卡片同步切换。",
  contract: ["Animate transform: scaleX() with transform-origin: left for compositor-only 60fps playback."]
};
