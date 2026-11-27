import type { UiStyleSpec } from "@/core/styles";

export const softTactileStyle: UiStyleSpec = {
  id: "soft-tactile",
  slug: "soft-tactile",
  name: "Tactile",
  nameZh: "微浮雕",
  group: "expressive",
  primaryTone: "light",
  scenarios: ["ai-workspace", "dashboard"],
  swatch: ["#EEF1F5", "#0EA5E9"],
  summaryEn:
    "Matte ceramic industrial surfaces (#EEF1F5) with crisp top-edge bevel highlights, recessed input wells, and ergonomic 12px keycap controls.",
  summaryZh:
    "哑光陶瓷工业质感，卡片与按钮带柔和顶边微高光，输入框采用内凹槽阴影，配合 12px 键帽级圆角带来真实按压触感。",
  defaultRadius: 12,
  radiusLabelEn: "12px Ergonomic Keycap",
  radiusLabelZh: "12px 键帽触感圆角",
  borderSpec: "1px solid #D8E0EA",
  shadowSpec: "inset 0 1px 0 rgba(255,255,255,0.92), 0 6px 14px -4px rgba(15,23,42,0.09)",
  surfaceEffect: "soft-tactile",
  fonts: {
    display: "Inter",
    body: "Inter",
    mono: "JetBrains Mono",
    tracking: "-0.02em",
    serif: false
  },
  light: {
    canvas: "#EEF1F5",
    surface: "#F7F9FC",
    elevated: "#FFFFFF",
    border: "#D5DDE8",
    ink: "#162030",
    muted: "#5C6B82",
    accent: "#0EA5E9",
    accentFg: "#FFFFFF"
  },
  dark: {
    canvas: "#12161D",
    surface: "#191F29",
    elevated: "#222A37",
    border: "#2D3748",
    ink: "#EDF2F7",
    muted: "#8FA0B8",
    accent: "#38BDF8",
    accentFg: "#081420"
  },
  dosEn: [
    "Combine a subtle 1px border with top-white inner bevels so controls never lose crisp boundaries.",
    "Differentiate raised clickable buttons from recessed text inputs using inset shadow direction."
  ],
  dosZh: [
    "微浮雕光影必须配合 1px 清晰边界线，保证控件轮廓分明。",
    "用外凸微高光表现可点击按钮，用内凹阴影表现可输入槽位。"
  ],
  dontsEn: [
    "Avoid borderless mushy 2020-style neumorphism that fails accessibility contrast.",
    "Avoid overly deep dramatic shadows that look plastic."
  ],
  dontsZh: [
    "禁止做成无边界、灰蒙蒙看不清轮廓的旧式拟态。",
    "避免过度夸张的厚重阴影导致廉价塑料感。"
  ],
  tags: ["tactile", "hardware", "bevel", "keycap", "industrial"]
};
