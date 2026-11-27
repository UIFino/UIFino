import type { ComponentAssetMeta } from "@/core/codegen";

export const emptyWireframeStateMeta: ComponentAssetMeta = {
  id: "empty-wireframe-state",
  name: "Architectural Zero-Data Panel",
  subcat: "Empty States",
  layout: "auth-card",
  archetype: "empty-state",
  tags: ["empty", "error", "minimal", "clean"],
  descEn: "Dashed hairline empty container with clear primary creation action and CLI import shortcut.",
  descZh: "细虚线结构框空状态模块，仅保留核心创建动作与命令行导入入口。",
  contract: ["Provide a direct recovery action (Clear filter / Create item) without decorative filler."]
};
