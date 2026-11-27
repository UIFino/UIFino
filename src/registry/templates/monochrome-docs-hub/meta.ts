import type { StarterTemplateSpec } from "../_taxonomy";

export const monochromeDocsHub: StarterTemplateSpec = {
  id: "monochrome-docs-hub",
  name: "Protocol Docs & SDK Hub",
  nameZh: "Protocol 三栏技术文档站",
  category: "Docs",
  stack: "Astro 5 · MDX",
  skinId: "vercel",
  skinLabel: "Vercel DESIGN.md",
  accent: "#EDEDED",
  canvas: "#050507",
  surface: "#0F1014",
  border: "#242424",
  pagesCount: 7,
  routes: ["Overview", "3-Col API Ref", "CLI Guides", "MCP Spec"],
  descEn:
    "Zero-clutter documentation portal with sticky file tree, multi-framework code tabs, and ⌘K search.",
  descZh: "左目录树、中区可执行代码示例、右侧本页锚点联动的工程文档与更新日志模板。"
};
