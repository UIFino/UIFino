import type { ComponentAssetMeta } from "@/core/codegen";

export const heroEditorialSerifMeta: ComponentAssetMeta = {
  id: "hero-editorial-serif",
  name: "Editorial Serif Manifesto",
  nameZh: "人文衬线首屏",
  subcat: "Editorial",
  layout: "split-hero",
  archetype: "editorial-hero",
  tags: ["hero", "warm", "editorial", "serif", "ai"],
  descEn: "Warm literary display serif headline paired with restrained action strip and artifact card.",
  descZh: "人文衬线大标题配克制留白与文档预览卡，适合 AI 工作台与知识产品。",
  contract: [
    "Tighten display serif tracking to -0.02em with 1.04 line-height above 36px.",
    "Maintain body contrast >= 7:1 on warm parchment backgrounds."
  ],
  contractZh: [
    "36px 以上衬线大标题收紧字距至 -0.02em 并采用 1.04 紧凑行高。",
    "暖纸浅底上的长段正文文本对比度维持在 7:1 以上。"
  ]
};
