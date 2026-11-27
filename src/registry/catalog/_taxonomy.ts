import type { CatalogDomainCategory } from "@/core/design-md";

export type CatalogCategoryFilter = "All" | CatalogDomainCategory;

export const CATALOG_CATEGORIES: readonly CatalogCategoryFilter[] = [
  "All",
  "AI & LLM",
  "DevTools",
  "Productivity",
  "Fintech",
  "Content & Community",
  "Consumer & Travel"
];

export const CATALOG_CATEGORY_LABELS: Record<
  CatalogCategoryFilter,
  { readonly zh: string; readonly en: string }
> = {
  All: { zh: "全部", en: "All" },
  "AI & LLM": { zh: "人工智能", en: "AI" },
  DevTools: { zh: "开发工具", en: "DevTools" },
  Productivity: { zh: "效率办公", en: "Productivity" },
  Fintech: { zh: "金融支付", en: "Fintech" },
  "Content & Community": { zh: "内容社区", en: "Community" },
  "Consumer & Travel": { zh: "生活出行", en: "Travel" }
};
