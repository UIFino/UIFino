import type { UiStyleSpec } from "@/core/styles";

export const swissTypographicStyle: UiStyleSpec = {
  id: "swiss-typographic",
  slug: "swiss-typographic",
  name: "Swiss",
  nameZh: "瑞士排版",
  group: "minimal",
  primaryTone: "light",
  scenarios: ["landing", "docs"],
  swatch: ["#F5F4EF", "#FF3B1D"],
  summaryEn:
    "International Typographic Style built on gallery off-white paper, bold 2px horizontal ink rules, tight grotesk numerals, and vermilion accents.",
  summaryZh:
    "源自瑞士国际主义平面设计：画廊米白底色、醒目的 2px 黑色横线分栏、紧凑大号无衬线数字与朱砂红点睛。",
  defaultRadius: 0,
  radiusLabelEn: "0px Editorial Grid",
  radiusLabelZh: "0px 印刷网格直角",
  borderSpec: "2px top rule #141414 + 1px #D8D5CC",
  shadowSpec: "none",
  surfaceEffect: "swiss-rule",
  fonts: {
    display: "Inter",
    body: "Inter",
    mono: "JetBrains Mono",
    tracking: "-0.04em",
    serif: false
  },
  light: {
    canvas: "#F5F4EF",
    surface: "#FFFFFF",
    elevated: "#ECEAE2",
    border: "#D4D0C5",
    ink: "#111111",
    muted: "#57554F",
    accent: "#FF3B1D",
    accentFg: "#FFFFFF"
  },
  dark: {
    canvas: "#111110",
    surface: "#191917",
    elevated: "#232320",
    border: "#33322E",
    ink: "#F5F4EF",
    muted: "#9C9990",
    accent: "#FF4D30",
    accentFg: "#FFFFFF"
  },
  dosEn: [
    "Anchor major sections with crisp 2px horizontal ink rules and numbered indices (01, 02, 03).",
    "Pair oversized display numerals with compact uppercase monospace captions."
  ],
  dosZh: [
    "用 2px 粗横线与 01 / 02 编号锚定核心分栏。",
    "超大号紧凑标题搭配小号大写等宽索引标签。"
  ],
  dontsEn: [
    "Avoid centered symmetric SaaS hero clichés when an asymmetric column grid fits better.",
    "Avoid soft pastel shadows or translucent glass overlays."
  ],
  dontsZh: [
    "避免套用千篇一律的全居中对称模板布局。",
    "禁止添加弥散彩色阴影或半透明磨砂遮罩。"
  ],
  tags: ["swiss", "typographic", "international-style", "vermilion", "grid"]
};
