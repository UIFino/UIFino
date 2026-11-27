import type { UiStyleSpec } from "@/core/styles";

export const hairlineGridStyle: UiStyleSpec = {
  id: "hairline-grid",
  slug: "hairline-grid",
  name: "Hairline",
  nameZh: "细线网格",
  group: "minimal",
  primaryTone: "dark",
  scenarios: ["landing", "dashboard", "docs"],
  swatch: ["#0A0B0E", "#D4FF33"],
  summaryEn:
    "Architectural 1px structural dividers, 0px sharp corners, zero drop shadows, and high-visibility signal lime telemetry accents.",
  summaryZh:
    "以 1px 建筑感贯穿细线划分版面，配合 0px 利落直角、零投影平面与荧光绿高亮信号色，适合精密工程与开发者平台。",
  defaultRadius: 0,
  radiusLabelEn: "0px Architectural Sharp",
  radiusLabelZh: "0px 建筑直角",
  borderSpec: "1px solid #1E222A",
  shadowSpec: "none (1px structural grid only)",
  surfaceEffect: "hairline",
  fonts: {
    display: "Inter",
    body: "Inter",
    mono: "JetBrains Mono",
    tracking: "-0.025em",
    serif: false
  },
  dark: {
    canvas: "#0A0B0E",
    surface: "#101217",
    elevated: "#161920",
    border: "#1F242D",
    ink: "#F3F5F8",
    muted: "#8B93A1",
    accent: "#D4FF33",
    accentFg: "#0A0B0E"
  },
  light: {
    canvas: "#F7F8FA",
    surface: "#FFFFFF",
    elevated: "#F0F2F5",
    border: "#DCE0E8",
    ink: "#0D0F14",
    muted: "#5A6270",
    accent: "#3F6212",
    accentFg: "#FFFFFF"
  },
  dosEn: [
    "Collapse adjacent card borders into shared 1px structural grid lines.",
    "Reserve the signal accent strictly for active indicators and primary CTAs.",
    "Enable tabular-nums on every metric, badge, and timestamp."
  ],
  dosZh: [
    "相邻模块共用 1px 贯穿分割线，保持网格对齐。",
    "高饱和信号色只用于主按钮与当前激活态。",
    "所有统计数字与时间戳开启等宽数字对齐（tabular-nums）。"
  ],
  dontsEn: [
    "Avoid rounded pill cards or blurred ambient drop shadows.",
    "Avoid stacking multiple decorative gradients behind data tables."
  ],
  dontsZh: [
    "禁止混用大圆角胶囊卡片或大范围模糊投影。",
    "禁止在数据密集区叠加多层彩色背景渐变。"
  ],
  tags: ["hairline", "grid", "architectural", "0px", "devtools"]
};
