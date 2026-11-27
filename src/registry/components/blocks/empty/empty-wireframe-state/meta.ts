import type { ComponentAssetMeta } from "@/core/codegen";

export const emptyWireframeStateMeta: ComponentAssetMeta = {
  id: "empty-wireframe-state",
  name: "Zero-Result Recovery Panel",
  nameZh: "空结果引导面板",
  subcat: "Zero Data",
  layout: "auth-card",
  archetype: "empty-state",
  tags: ["empty", "zero-state", "error", "onboarding"],
  descEn: "Dashed architectural empty state with clear recovery CTA and filter reset action.",
  descZh: "虚线框空状态面板，提供新建引导与一键清空筛选条件操作。",
  contract: [
    "Always pair empty states with an actionable reset or creation button.",
    "Keep message concise without blaming the user."
  ]
};
