export type TemplateCategory = "SaaS & AI" | "Docs" | "Dashboard";
export type TemplateCategoryFilter = "All" | TemplateCategory;

export const TEMPLATE_CATEGORIES: readonly TemplateCategoryFilter[] = [
  "All",
  "SaaS & AI",
  "Docs",
  "Dashboard"
];

export interface StarterTemplateSpec {
  readonly id: string;
  readonly name: string;
  readonly nameZh: string;
  readonly category: TemplateCategory;
  readonly stack: string;
  readonly skinId: string;
  readonly skinLabel: string;
  readonly accent: string;
  readonly canvas: string;
  readonly surface: string;
  readonly border: string;
  readonly pagesCount: number;
  readonly routes: readonly string[];
  readonly descEn: string;
  readonly descZh: string;
}
