import type { UiStyleSpec } from "@/core/styles";

export const monochromeMinimalStyle: UiStyleSpec = {
  id: "monochrome-minimal",
  slug: "monochrome-minimal",
  name: "Monochrome",
  nameZh: "极简黑白",
  group: "minimal",
  primaryTone: "dark",
  scenarios: ["landing", "docs", "ai-workspace"],
  swatch: ["#000000", "#FFFFFF"],
  summaryEn:
    "Pure zero-hue #000000 and #FFFFFF contrast ladder with crisp 4px corners, neutral ash hairlines, and inverted monochrome primary actions.",
  summaryZh:
    "零色相纯黑白灰阶对比，搭配 4px 微圆角与黑白反转主按钮，把视觉注意力全部留给代码、排版与核心操作。",
  defaultRadius: 4,
  radiusLabelEn: "4px Precision Micro-Radius",
  radiusLabelZh: "4px 克制微圆角",
  borderSpec: "1px solid #262626",
  shadowSpec: "none",
  surfaceEffect: "flat-mono",
  fonts: {
    display: "Inter",
    body: "Inter",
    mono: "JetBrains Mono",
    tracking: "-0.03em",
    serif: false
  },
  dark: {
    canvas: "#000000",
    surface: "#0A0A0A",
    elevated: "#141414",
    border: "#262626",
    ink: "#FAFAFA",
    muted: "#888888",
    accent: "#FFFFFF",
    accentFg: "#000000"
  },
  light: {
    canvas: "#FFFFFF",
    surface: "#FAFAFA",
    elevated: "#F2F2F2",
    border: "#E5E5E5",
    ink: "#0A0A0A",
    muted: "#666666",
    accent: "#0A0A0A",
    accentFg: "#FFFFFF"
  },
  dosEn: [
    "Establish hierarchy purely through font weight, spacing, and grayscale contrast.",
    "Use solid inverted foreground fills (#FFFFFF on dark, #0A0A0A on light) for primary buttons."
  ],
  dosZh: [
    "依靠字重、字号跨度与灰阶明暗拉开信息层级。",
    "主操作按钮直接使用黑白反转实心填充。"
  ],
  dontsEn: [
    "Avoid introducing brand rainbow colors outside semantic error/warning states.",
    "Avoid low-contrast gray text below 4.5:1 readability."
  ],
  dontsZh: [
    "除报错与告警外，避免引入多余彩色装饰。",
    "避免正文使用对比度低于 4.5:1 的浅灰字。"
  ],
  tags: ["monochrome", "black-white", "minimal", "vercel-like", "cli"]
};
