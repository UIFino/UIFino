import type { ComponentAssetMeta } from "@/core/codegen";

export const ctaCliLaunchpadMeta: ComponentAssetMeta = {
  id: "cta-cli-launchpad",
  name: "CLI Launchpad Banner",
  subcat: "Install Banners",
  layout: "split-hero",
  archetype: "cli-hero",
  tags: ["cta", "cli", "devtools", "dark"],
  descEn: "Full-width striped closing banner with instant npx command copy and secondary docs action.",
  descZh: "页面收尾竖纹转化带，内置一键复制安装命令与文档入口。",
  contract: ["Provide immediate visual Copy -> Copied confirmation with aria-live polite."]
};
