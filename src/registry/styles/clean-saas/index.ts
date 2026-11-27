import type { UiStyleSpec } from "@/core/styles";

export const cleanSaasStyle: UiStyleSpec = {
  id: "clean-saas",
  slug: "clean-saas",
  name: "Clean",
  nameZh: "清爽商务",
  group: "minimal",
  primaryTone: "light",
  scenarios: ["dashboard", "landing", "ai-workspace"],
  swatch: ["#F8FAFC", "#4F46E5"],
  summaryEn:
    "Cool slate canvas (#F8FAFC) with crisp white elevated cards, gentle multi-layer ambient shadows, 8px balanced corners, and indigo actions.",
  summaryZh:
    "冷灰蓝底板衬托纯白卡片，配合细腻双层微阴影、8px 均衡圆角与沉稳靛蓝主色，适合企业级 SaaS 与数据后台。",
  defaultRadius: 8,
  radiusLabelEn: "8px Balanced Card",
  radiusLabelZh: "8px 均衡商务圆角",
  borderSpec: "1px solid #E2E8F0",
  shadowSpec: "0 1px 2px rgba(15,23,42,0.05), 0 10px 24px -8px rgba(15,23,42,0.08)",
  surfaceEffect: "soft-shadow",
  fonts: {
    display: "Inter",
    body: "Inter",
    mono: "JetBrains Mono",
    tracking: "-0.02em",
    serif: false
  },
  light: {
    canvas: "#F8FAFC",
    surface: "#FFFFFF",
    elevated: "#F1F5F9",
    border: "#E2E8F0",
    ink: "#0F172A",
    muted: "#64748B",
    accent: "#4F46E5",
    accentFg: "#FFFFFF"
  },
  dark: {
    canvas: "#0B0F19",
    surface: "#111827",
    elevated: "#1E293B",
    border: "#263248",
    ink: "#F8FAFC",
    muted: "#94A3B8",
    accent: "#6366F1",
    accentFg: "#FFFFFF"
  },
  dosEn: [
    "Separate pure white content cards cleanly against a cool off-white slate canvas (#F8FAFC).",
    "Keep shadows low-opacity and downward-cast to convey calm elevation."
  ],
  dosZh: [
    "用微冷灰画布（#F8FAFC）托起纯白业务卡片，层次自然分明。",
    "投影保持低透明度向下轻柔扩散，克制表达悬浮感。"
  ],
  dontsEn: [
    "Avoid heavy dark borders around cards in light mode; let 1px #E2E8F0 + subtle shadow work together.",
    "Avoid mixing 0px sharp inputs inside 8px rounded cards."
  ],
  dontsZh: [
    "亮色模式下避免深黑粗边框，保持 1px 浅灰描边配轻阴影。",
    "避免在 8px 圆角卡片内部混入 0px 直角输入框。"
  ],
  tags: ["saas", "enterprise", "indigo", "clean", "dashboard"]
};
