import type { CatalogBrandSpec } from "@/core/design-md";
import { linearScrapedData } from "./scraped";

export const linearSpec: CatalogBrandSpec = {
  id: "linear",
  slug: "linear.app",
  siteUrl: "https://linear.app",
  name: "Linear",
  kind: "website",
  platformLabel: "Web · SaaS",
  category: "Productivity",
  tags: ["dark", "minimal", "saas", "hairline", "indigo"],
  shortTagsZh: ["桌面网站", "效率办公", "深色主调", "1px 细框"],
  shortTagsEn: ["Website", "Productivity", "Dark-First", "1px Hairline"],
  goodForZh: ["开发者官网", "软件定价页", "更新日志", "极简登录页"],
  goodForEn: ["Developer Landing", "SaaS Pricing", "Release Changelog", "Minimal Login"],
  notForZh: ["促销大卖场电商", "高饱和节日活动页", "多图密集资讯门户"],
  notForEn: ["Flash-Sale E-Commerce", "Festive Campaign Pages", "Image-Heavy News Portals"],
  summaryZh:
    "深曜石纯黑底板（#08090A）配 8% 透明度白细线、Inter Variable 510 字重紧凑大标题与高反差银白/靛紫胶囊按钮，现代工程软件官网标杆。",
  summaryEn:
    "Near-black obsidian canvas (#08090A), 8%-white 1px hairlines, tight 510-weight Inter Variable headlines, and restrained silver/indigo pill actions.",
  openFontAlt: "Inter + JetBrains Mono",
  fonts: {
    display: "Inter Variable",
    body: "Inter Variable",
    mono: "Berkeley Mono",
    tracking: "-0.022em",
    serif: false
  },
  radiusScale: ["0px", "6px", "8px", "9999px"],
  defaultRadius: "8px",
  spacingScale: [4, 8, 12, 16, 24, 32, 48, 64],
  archetype: "kanban-saas",
  ctaLabel: "Sign up",
  light: {
    canvas: "#FFFFFF",
    surface: "#F6F7F9",
    elevated: "#ECEEF2",
    border: "#E2E5EC",
    ink: "#08090A",
    muted: "#5E636E",
    accent: "#5E6AD2",
    accentFg: "#FFFFFF"
  },
  dark: {
    canvas: "#08090A",
    surface: "#0F1011",
    elevated: "#1A1C20",
    border: "#23252A",
    ink: "#F7F8F8",
    muted: "#8A8F98",
    accent: "#5E6AD2",
    accentFg: "#FFFFFF"
  },
  rules: [
    "Keep >= 92% of viewport area in obsidian neutrals (#08090A / #0F1011); use #E5E5E6 silver-white pills or #5E6AD2 indigo strictly on primary actions.",
    "Set H1 (64px) and H2 (48px) in Inter Variable at medium-bold 510 weight with 1.00 line-height and -0.022em tight tracking.",
    "Separate dark panels and pricing columns using 1px rgba(255, 255, 255, 0.08) hairlines rather than colored borders.",
    "Render code diffs, shortcuts, and timestamps in monospace (JetBrains Mono fallback) at 12px with tabular-nums."
  ],
  rulesZh: [
    "保持 92% 以上画面为深曜石中性黑灰（#08090A / #0F1011），仅在主按钮与开关拨片上使用 #E5E5E6 银白或 #5E6AD2 靛紫。",
    "大标题（64px / 48px）采用 Inter Variable 510 中粗字重，行高紧收至 1.00，字距收紧至 -0.022em。",
    "面板与四档定价列统一用 1px rgba(255,255,255,0.08) 微透明细线分割，克制使用阴影。",
    "代码差异、快捷键与发布日期统一使用 12px 等宽字体（开源平替 JetBrains Mono）并开启等宽数字对齐。"
  ],
  antiAiRulesEn: [
    "NEVER apply purple-to-cyan rainbow text gradients on H1 or H2 headlines.",
    "NEVER wrap pricing tiers in glowing neon-purple outer box-shadows.",
    "NEVER mix bubbly 24px+ rounded feature cards with crisp 8px workspace frames.",
    "NEVER clutter the hero with floating 3D cartoon mascots or stock illustrations; showcase the real product UI."
  ],
  antiAiRulesZh: [
    "严禁给主标题或副标题套用蓝紫粉多色彩虹渐变文字。",
    "严禁给卡片或定价列添加发散霓虹紫色外发光阴影。",
    "严禁混用 24px 以上臃肿大圆角气泡框，应用演示框保持 8px 克制圆角。",
    "严禁堆砌 3D 卡通插画或空洞装饰图形，首屏直接展示真实高密度软件界面。"
  ],
  scraped: linearScrapedData
};
