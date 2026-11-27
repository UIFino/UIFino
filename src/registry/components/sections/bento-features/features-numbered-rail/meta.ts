import type { ComponentAssetMeta } from "@/core/codegen";

export const featuresNumberedRailMeta: ComponentAssetMeta = {
  id: "features-numbered-rail",
  name: "01 / 02 / 03 Architectural Rail",
  subcat: "Workflow Steps",
  layout: "bento-grid",
  archetype: "bento-grid",
  tags: ["steps", "minimal", "monochrome", "workflow"],
  descEn: "Three-column divided workflow strip with monospace step indices and live mini artifacts.",
  descZh: "三栏等分结构线流程区块，使用等宽序号与迷你实景缩略卡替代空洞图标。",
  contract: [
    "Align top eyebrows and bottom action links across all 3 columns using flex-col justify-between."
  ]
};
