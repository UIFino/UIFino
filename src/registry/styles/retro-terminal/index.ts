import type { UiStyleSpec } from "@/core/styles";

export const retroTerminalStyle: UiStyleSpec = {
  id: "retro-terminal",
  slug: "retro-terminal",
  name: "Terminal",
  nameZh: "复古终端",
  group: "expressive",
  primaryTone: "dark",
  scenarios: ["dashboard", "docs", "ai-workspace"],
  swatch: ["#050A06", "#22C55E"],
  summaryEn:
    "CRT phosphor black-green console (#050A06), 0px square frames, full-monospace typography, subtle scanlines, and bracketed CLI telemetry.",
  summaryZh:
    "暗黑荧光绿 CRT 终端质感，0px 硬直角线框、全等宽字体排版、细腻扫描线纹理与方括号命令式交互，极客气场拉满。",
  defaultRadius: 0,
  radiusLabelEn: "0px CRT Frame",
  radiusLabelZh: "0px 终端硬直角",
  borderSpec: "1px solid #1B4327",
  shadowSpec: "0 0 0 1px rgba(34,197,94,0.12)",
  surfaceEffect: "retro-terminal",
  fonts: {
    display: "JetBrains Mono",
    body: "JetBrains Mono",
    mono: "JetBrains Mono",
    tracking: "0em",
    serif: false
  },
  dark: {
    canvas: "#050A06",
    surface: "#09120B",
    elevated: "#0F1E13",
    border: "#1C4528",
    ink: "#D8FBE2",
    muted: "#6BA87D",
    accent: "#22C55E",
    accentFg: "#041208"
  },
  light: {
    canvas: "#EFF5F0",
    surface: "#F8FBF8",
    elevated: "#E3EEE5",
    border: "#B7D1BE",
    ink: "#0B2212",
    muted: "#466B51",
    accent: "#15803D",
    accentFg: "#FFFFFF"
  },
  dosEn: [
    "Set headings, controls, and metrics in crisp monospace with tabular alignment and [STATUS] tags.",
    "Keep scanline textures subtle (under 4% opacity) so code and logs stay razor-sharp."
  ],
  dosZh: [
    "标题、按钮与状态标签统一采用等宽字体与方括号命令风格。",
    "背景扫描线透明度控制在 4% 以内，确保长日志清晰易读。"
  ],
  dontsEn: [
    "Avoid heavy phosphor text-shadow bloom that blurs small characters.",
    "Avoid rounded badges or proportional serif fonts."
  ],
  dontsZh: [
    "禁止给小字加过重外发光导致边缘发虚。",
    "禁止混入圆角胶囊按钮或衬线字体。"
  ],
  tags: ["retro", "terminal", "crt", "monospace", "cli", "pixel"]
};
