import type { ComponentAssetMeta } from "@/core/codegen";

export const heroSplitCliMeta: ComponentAssetMeta = {
  id: "hero-split-cli",
  name: "Split CLI & Proof Stage",
  nameZh: "左右分栏终端首屏",
  subcat: "Code & Terminal",
  layout: "split-hero",
  archetype: "cli-hero",
  tags: ["hero", "cli", "devtools", "monochrome", "code"],
  descEn: "Two-column micro-striped hero pairing value copy and npx bar with a live protocol diff card.",
  descZh: "左栏竖向细条纹配一键复制命令框，右栏展示实时参数预览面板。",
  contract: [
    "Keep left column max-width 540px so line length stays within 55–68 characters.",
    "Ensure CLI box truncates gracefully on 375px screens while keeping Copy button >= 36px."
  ],
  contractZh: [
    "左侧文案区限制最大宽度 540px，将单行长度控制在 55–68 字符最易读区间。",
    "375px 手机宽度下命令条自动截断省略，右侧复制按钮高度不低于 36px。"
  ]
};
