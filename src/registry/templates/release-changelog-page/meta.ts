import type { StarterTemplateSpec } from "../_taxonomy";

export const releaseChangelogPage: StarterTemplateSpec = {
  id: "release-changelog-page",
  kind: "page",
  scene: "changelog",
  category: "Changelog",
  name: "Release Changelog",
  nameZh: "版本更新日志页",
  stack: "Single Page · TSX",
  skinId: "linear",
  skinLabel: "Linear DESIGN.md",
  accent: "#5E6AD2",
  canvas: "#08090A",
  surface: "#121316",
  border: "#23252A",
  pagesCount: 1,
  routes: ["Sticky Date Rail", "Version Badges", "Diff Highlights"],
  descEn: "Timeline changelog page with sticky version date rail, tag filters, and code diffs.",
  descZh: "左侧固定日期轴、右侧版本号徽章与代码变更说明的产品更新日志单页。"
};
