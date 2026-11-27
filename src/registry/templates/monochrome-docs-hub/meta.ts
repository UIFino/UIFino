import type { StarterTemplateSpec } from "../_taxonomy";

export const monochromeDocsHub: StarterTemplateSpec = {
  id: "monochrome-docs-hub",
  kind: "starter",
  scene: "docs",
  category: "Docs",
  name: "Protocol Docs",
  nameZh: "极简文档站",
  stack: "Next.js 15 · MDX",
  skinId: "vercel",
  skinLabel: "Vercel DESIGN.md",
  accent: "#EDEDED",
  canvas: "#000000",
  surface: "#0A0A0A",
  border: "#262626",
  pagesCount: 5,
  routes: ["Quickstart", "CLI", "SDK Reference", "Changelog", "Search"],
  descEn: "Pure monochrome developer documentation starter with 3-column API reference and ⌘K.",
  descZh: "纯黑白极客风多页技术文档工程，带三栏接口参考、MDX 代码高亮与全局搜索。"
};
