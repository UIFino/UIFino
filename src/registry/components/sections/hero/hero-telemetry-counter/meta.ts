import type { ComponentAssetMeta } from "@/core/codegen";

export const heroTelemetryCounterMeta: ComponentAssetMeta = {
  id: "hero-telemetry-counter",
  name: "Telemetry Counter Hero",
  nameZh: "数据计数遥测首屏",
  subcat: "Stats & Live Data",
  layout: "split-hero",
  archetype: "telemetry-hero",
  tags: ["hero", "counter", "stats", "dark", "saas"],
  descEn: "Centered architectural headline anchored by a 4-column tabular metric counter bar.",
  descZh: "紧凑标题搭配四栏等宽数字跳动指标条，消除数字变化时的宽度抖动。",
  contract: [
    "Apply font-variant-numeric: tabular-nums on all animated metrics.",
    "Collapse 4-column counter grid to 2x2 below 640px without horizontal scroll.",
    "Skip count-up animation immediately when prefers-reduced-motion: reduce matches."
  ],
  contractZh: [
    "全部动态计数指标强制启用等宽数字（tabular-nums），消除刷新抖动。",
    "640px 以下自动折行成 2×2 四宫格指标卡，不产生横向溢出滚动条。",
    "检测到 prefers-reduced-motion: reduce 系统偏好时跳过递增动画直接定格。"
  ]
};
