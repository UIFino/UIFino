import type { CatalogDomainCategory } from "@/core/design-md";

export type CatalogCategoryFilter = "All" | CatalogDomainCategory;

export const CATALOG_CATEGORIES: readonly CatalogCategoryFilter[] = [
  "All",
  "AI & LLM",
  "DevTools",
  "Productivity",
  "Fintech"
];
