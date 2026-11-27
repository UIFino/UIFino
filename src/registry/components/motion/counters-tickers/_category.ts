import type { RegisteredComponentCategory } from "../../_taxonomy";
import { motionSpringCounterMeta } from "./motion-spring-counter/meta";

export const countersTickersCategory: RegisteredComponentCategory = {
  id: "counters-tickers",
  assetType: "motion",
  name: "Counters & Tickers",
  nameZh: "数字滚动与状态跳动",
  totalCount: 15,
  miniKind: "motion",
  descEn: "Spring-interpolated tabular counters, live latency badges, and zero-jitter numeric transitions.",
  descZh: "带缓动曲线的等宽数字滚动、毫秒延迟跳动徽标与零抖动数值过渡。",
  items: [motionSpringCounterMeta]
};
