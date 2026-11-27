import type { ComponentAssetMeta } from "@/core/codegen";

export const page3ColReferenceMeta: ComponentAssetMeta = {
  id: "page-3col-reference",
  name: "Three-Column API Reference Page",
  subcat: "Documentation",
  layout: "full-page",
  archetype: "page-shell",
  tags: ["page", "docs", "minimal", "code"],
  descEn: "Sticky sidebar navigation, prose + runnable code column, and synchronized On This Page outline.",
  descZh: "左目录树、中区说明配可执行代码卡、右侧本页锚点联动的技术规范整页。",
  contract: ["Constrain central prose measure to 68ch while allowing code blocks full column width."]
};
