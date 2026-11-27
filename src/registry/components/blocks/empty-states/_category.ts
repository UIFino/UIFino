import type { RegisteredComponentCategory } from "../../_taxonomy";
import { emptyWireframeStateMeta } from "./empty-wireframe-state/meta";

export const emptyStatesCategory: RegisteredComponentCategory = {
  id: "empty-states",
  assetType: "block",
  name: "Empty & Error States",
  nameZh: "空状态与异常恢复",
  totalCount: 15,
  miniKind: "bento",
  descEn: "Blueprint zero-data states, search filter reset panels, and retryable diagnostic banners.",
  descZh: "无数据引导面板、筛选零结果重置卡与带诊断码的重试异常块。",
  items: [emptyWireframeStateMeta]
};
