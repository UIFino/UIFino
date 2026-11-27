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
  "AI & LLM": { zh: "AI 与大模型", en: "AI & LLM" },
  DevTools: { zh: "开发者工具", en: "Developer Tools" },
  Productivity: { zh: "效率与协作", en: "Productivity" },
  Fintech: { zh: "金融与账单", en: "Fintech & Billing" },
  "Content & Community": { zh: "内容与社区", en: "Content & Community" },
  "Consumer & Travel": { zh: "消费与出行", en: "Consumer & Travel" }
};
