import type { RegisteredComponentCategory } from "../../_taxonomy";
import { ctaCliLaunchpadMeta } from "./cta-cli-launchpad/meta";

export const ctaCategory: RegisteredComponentCategory = {
  id: "cta",
  assetType: "section",
  name: "CTA",
  nameZh: "行动号召",
  totalCount: 15,
  miniKind: "cta",
  descEn: "Bottom conversion bands, waitlist strips, and quickstart CLI launchpads.",
  descZh: "页面收尾转化横幅、试用注册引导条与命令行快速接入栏。",
  items: [ctaCliLaunchpadMeta]
};
