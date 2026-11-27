import { dashboardPagesCategory } from "./dashboard-pages/_category";
import { docsChangelogCategory } from "./docs-changelog/_category";
import { landingPagesCategory } from "./landing-pages/_category";

export const PAGE_CATEGORIES = [
  landingPagesCategory,
  dashboardPagesCategory,
  docsChangelogCategory
] as const;
