import type { UiStyleSpec } from "@/core/styles";

export const neoBrutalismStyle: UiStyleSpec = {
  id: "neo-brutalism",
  slug: "neo-brutalism",
  name: "Brutalist",
  nameZh: "新粗野",
  group: "expressive",
  primaryTone: "light",
  scenarios: ["landing"],
  swatch: ["#FFFDF5", "#FF5C00"],
  summaryEn:
    "Unapologetic 2px solid ink borders, 4px zero-blur hard offset shadows, warm poster cream canvas, and high-energy orange CTAs.",
  summaryZh:
    "鲜明的 2px 纯黑实线描边、4px 零模糊硬偏移投影、暖米黄海报底色与高饱和亮橙按钮，第一眼极具冲击力与辨识度。",
  defaultRadius: 4,
  radiusLabelEn: "4px Poster Cut",
  radiusLabelZh: "4px 硬朗海报方角",
  borderSpec: "2px solid #111111",
  shadowSpec: "4px 4px 0px #111111",
  surfaceEffect: "brutalist-offset",
  fonts: {
    display: "Inter",
    body: "Inter",
    mono: "JetBrains Mono",
    tracking: "-0.03em",
    serif: false
  },
  light: {
    canvas: "#FFFDF5",
    surface: "#FFFFFF",
    elevated: "#FFF3C4",
    border: "#111111",
    ink: "#111111",
    muted: "#4A4843",
    accent: "#FF5C00",
    accentFg: "#FFFFFF"
  },
  dark: {
    canvas: "#121210",
    surface: "#1B1B18",
    elevated: "#262520",
    border: "#F5F2E8",
    ink: "#FFFDF5",
    muted: "#B5B0A4",
    accent: "#FF6B1A",
    accentFg: "#111111"
  },
  dosEn: [
    "Use crisp 2px solid borders and zero-blur offset shadows (4px 4px 0px) that shift 2px on active press.",
    "Pair bold black ink with one punchy poster accent and generous cream whitespace."
  ],
  dosZh: [
    "统一使用 2px 实心描边与零模糊硬阴影，按下时产生 2px 位移反馈。",
    "用暖白留白控制视觉节奏，高饱和主色集中用于关键行动点。"
  ],
  dontsEn: [
    "Avoid soft Gaussian blur shadows or delicate low-contrast hairlines.",
    "Avoid applying hard offset shadows to every tiny table row in complex admin screens."
  ],
  dontsZh: [
    "禁止混用柔和模糊阴影或若隐若现的浅灰细线。",
    "避免在密集长表格的每一行都叠加硬阴影造成视觉疲劳。"
  ],
  tags: ["neo-brutalism", "gumroad-like", "hard-shadow", "bold", "creative"]
};
