import type { RegisteredComponentCategory } from "../../_taxonomy";
import { emptyWireframeStateMeta } from "./empty-wireframe-state/meta";

export const emptyCategory: RegisteredComponentCategory = {
  id: "empty",
  assetType: "block",
  name: "Empty",
  nameZh: "空状态",
  totalCount: 11,
  miniKind: "empty",
  descEn: "Zero-result filter panels, first-run onboarding cards, and error recovery views.",
  descZh: "无匹配结果提示、首次使用引导卡与异常恢复状态视图。",
  items: [emptyWireframeStateMeta]
};
