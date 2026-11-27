import type { BrandSkinContract } from "@/core/tokens";
import { CATALOG_ITEMS } from "./catalog";
import { STYLE_ITEMS } from "./styles";

export const ALL_WORKBENCH_SKINS: readonly BrandSkinContract[] = [
  ...CATALOG_ITEMS,
  ...STYLE_ITEMS
];
