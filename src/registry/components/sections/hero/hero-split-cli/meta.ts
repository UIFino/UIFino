import type { ComponentAssetMeta } from "@/core/codegen";

export const heroSplitCliMeta: ComponentAssetMeta = {
  id: "hero-split-cli",
  name: "Split CLI & Proof Stage",
  subcat: "Code & Terminal",
  layout: "split-hero",
  archetype: "cli-hero",
  tags: ["hero", "cli", "devtools", "monochrome", "code"],
  descEn: "Two-column micro-striped hero pairing value copy and npx bar with a live protocol diff card.",
  descZh: "左栏竖向细条纹配一键复制命令框，右栏展示实时令牌协议面板。",
  contract: [
    "Keep left column max-width 540px so line length stays within 55–68 characters.",
    "Ensure CLI box truncates gracefully on 375px screens while keeping Copy button >= 36px."
  ]
};
