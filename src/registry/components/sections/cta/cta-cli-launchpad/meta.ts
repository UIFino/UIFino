import type { ComponentAssetMeta } from "@/core/codegen";

export const ctaCliLaunchpadMeta: ComponentAssetMeta = {
  id: "cta-cli-launchpad",
  name: "CLI Conversion Banner",
  nameZh: "命令转化横幅",
  subcat: "Banner",
  layout: "split-hero",
  archetype: "cta-banner",
  tags: ["cta", "cli", "conversion", "dark"],
  descEn: "High-contrast conversion band pairing one-click CLI install with a primary CTA.",
  descZh: "结合一键复制安装命令与高对比主按钮的底部行动号召横幅。",
  contract: [
    "Keep primary action button and copyable CLI snippet on a single row above 640px.",
    "Stack full-width cleanly on mobile viewports."
  ],
  contractZh: [
    "640px 以上桌面宽度将命令行条与主转化按钮维持在单行内水平对齐。",
    "手机窄屏下命令框与按钮各自撑满一行垂直堆叠。"
  ]
};
