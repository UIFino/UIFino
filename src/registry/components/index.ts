import type { FlattenedComponentEntry } from "@/core/search";
import { BLOCK_CATEGORIES } from "./blocks";
import { MOTION_CATEGORIES } from "./motion";
import { PAGE_CATEGORIES } from "./pages";
import { SECTION_CATEGORIES } from "./sections";
import type { RegisteredComponentCategory } from "./_taxonomy";

export * from "./_taxonomy";
export * from "./specimens";

export const COMPONENT_CATEGORIES: readonly RegisteredComponentCategory[] = [
  ...SECTION_CATEGORIES,
  ...BLOCK_CATEGORIES,
  ...PAGE_CATEGORIES,
  ...MOTION_CATEGORIES
];

export function findComponentCategoryById(
  categoryId: string
): RegisteredComponentCategory | undefined {
  return COMPONENT_CATEGORIES.find((cat) => cat.id === categoryId);
}

export function findComponentAsset(categoryId: string, assetId: string) {
  const category = findComponentCategoryById(categoryId);
  if (!category) return undefined;
  const item = category.items.find((entry) => entry.id === assetId);
  if (!item) return undefined;
  return { category, item };
}

export function getAllComponentsFlat(): readonly FlattenedComponentEntry[] {
  const flat: FlattenedComponentEntry[] = [];
  for (const cat of COMPONENT_CATEGORIES) {
    for (const item of cat.items) {
      flat.push({
        ...item,
        categoryId: cat.id,
        categoryName: cat.name,
        categoryNameZh: cat.nameZh,
        assetType: cat.assetType
      });
    }
  }
  return flat;
}
