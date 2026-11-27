import type { RegisteredComponentCategory } from "../../_taxonomy";
import { motionSpringCounterMeta } from "./motion-spring-counter/meta";

export const countersCategory: RegisteredComponentCategory = {
  id: "counters",
  assetType: "motion",
  name: "Counters",
  nameZh: "数字滚动",
  totalCount: 10,
  miniKind: "motion",
  descEn: "Tabular spring number counters, live KPI tickers, and progress readouts.",
  descZh: "等宽数字滚动条、实时指标跳动牌与百分比读数动效。",
  items: [motionSpringCounterMeta]
};
