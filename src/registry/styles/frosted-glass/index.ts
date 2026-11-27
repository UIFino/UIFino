import type { UiStyleSpec } from "@/core/styles";

export const frostedGlassStyle: UiStyleSpec = {
  id: "frosted-glass",
  slug: "frosted-glass",
  name: "Glass",
  nameZh: "毛玻璃",
  group: "expressive",
  primaryTone: "dark",
  scenarios: ["ai-workspace", "landing"],
  swatch: ["#0B1020", "#38BDF8"],
  summaryEn:
    "Translucent multi-layer glass surfaces with 16px spatial blur, 1px specular top rim highlights, and soft ambient aurora depth.",
  summaryZh:
    "半透明磨砂面板叠加 16px 背景模糊、1px 顶部高光细边与柔和极光底色，营造轻盈通透的空间悬浮层次。",
  defaultRadius: 16,
  radiusLabelEn: "16px Spatial Glass",
  radiusLabelZh: "16px 空间流光圆角",
  borderSpec: "1px solid rgba(255,255,255,0.14)",
  shadowSpec: "inset 0 1px 0 rgba(255,255,255,0.16), 0 16px 36px -12px rgba(2,6,23,0.65)",
  surfaceEffect: "frosted-glass",
  fonts: {
    display: "Inter",
    body: "Inter",
    mono: "JetBrains Mono",
    tracking: "-0.02em",
    serif: false
  },
  dark: {
    canvas: "#090E1A",
    surface: "#121A2E",
    elevated: "#1B2642",
    border: "#2B3B63",
    ink: "#F0F6FF",
    muted: "#94A7C6",
    accent: "#38BDF8",
    accentFg: "#061320"
  },
  light: {
    canvas: "#EEF4FF",
    surface: "#FFFFFF",
    elevated: "#E2ECFF",
    border: "#C7D8F8",
    ink: "#0F172A",
    muted: "#526585",
    accent: "#0284C7",
    accentFg: "#FFFFFF"
  },
  dosEn: [
    "Pair backdrop-filter blur(16px) with a subtle 1px inner top highlight to define glass edges.",
    "Ensure foreground text maintains >= 4.5:1 contrast even over ambient background glows."
  ],
  dosZh: [
    "背景模糊（blur 16px）配合 1px 顶部内高光，清晰勾勒玻璃边缘。",
    "控制底层流光饱和度，确保前景文字对比度始终大于 4.5:1。"
  ],
  dontsEn: [
    "Avoid nesting more than two blurred glass layers, which muddies legibility and GPU frame rates.",
    "Avoid opaque heavy dark borders that kill translucency."
  ],
  dontsZh: [
    "避免超过两层的毛玻璃嵌套叠加，防止文字发糊与掉帧。",
    "避免使用死黑不透明粗描边破坏通透感。"
  ],
  tags: ["glassmorphism", "frosted", "spatial", "blur", "aurora"]
};
