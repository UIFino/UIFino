import type { RegisteredComponentCategory } from "../../_taxonomy";
import { page3ColReferenceMeta } from "./page-3col-reference/meta";

export const docsChangelogCategory: RegisteredComponentCategory = {
  id: "docs-changelog",
  assetType: "page",
  name: "Docs & Changelog Pages",
  nameZh: "文档与更新日志整页",
  totalCount: 10,
  miniKind: "page",
  descEn: "Three-column technical specification pages and date-anchored release timelines.",
  descZh: "左树中正文右大纲的三栏技术文档页与按版本锚点排列的更新日志页。",
  items: [page3ColReferenceMeta]
};
