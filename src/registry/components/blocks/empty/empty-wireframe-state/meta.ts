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
  ],
  contractZh: [
    "空状态面板必须配有明确的重置筛选或新建引导动作按钮，不可只有一句干文案。",
    "提示语保持客观清晰，不使用指责或迷惑用户的措辞。"
  ]
};
