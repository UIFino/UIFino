import type { RegisteredComponentCategory } from "../../_taxonomy";
import { ctaCliLaunchpadMeta } from "./cta-cli-launchpad/meta";

export const ctaFooterCategory: RegisteredComponentCategory = {
  id: "cta-footer",
  assetType: "section",
  name: "CTA & Footers",
  nameZh: "底部转化与页脚",
  totalCount: 18,
  miniKind: "hero",
  descEn: "Terminal install callout bands and structured 5-column documentation footers.",
  descZh: "命令行安装号召横幅与五栏工程目录页脚。",
  items: [ctaCliLaunchpadMeta]
};
