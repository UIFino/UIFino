import type { RegisteredComponentCategory } from "../../_taxonomy";
import { heroEditorialSerifMeta } from "./hero-editorial-serif/meta";
import { heroSplitCliMeta } from "./hero-split-cli/meta";
import { heroTelemetryCounterMeta } from "./hero-telemetry-counter/meta";

export const heroCategory: RegisteredComponentCategory = {
  id: "hero",
  assetType: "section",
  name: "Hero",
  nameZh: "首屏",
  totalCount: 28,
  miniKind: "hero",
  descEn: "Above-the-fold sections with telemetry counters, split CLI stages, and editorial typography.",
  descZh: "包含实时遥测数字条、双栏终端命令台与衬线杂志排版的首屏区块。",
  items: [heroTelemetryCounterMeta, heroSplitCliMeta, heroEditorialSerifMeta]
};
