import { CATALOG_ITEMS } from "./catalog";
import { getAllComponentsFlat } from "./components";
import { TEMPLATE_ITEMS } from "./templates";
import { BG_PRESETS, SHADOW_PRESETS } from "./tools";
import { buildGlobalSearchItems, type McpRegistrySnapshot } from "@/core/search";

export function getMcpRegistrySnapshot(): McpRegistrySnapshot {
  return {
    brands: CATALOG_ITEMS,
    assets: getAllComponentsFlat(),
    bgPresets: BG_PRESETS,
    shadowPresets: SHADOW_PRESETS
  };
}

export function getAllSearchableItems() {
  return buildGlobalSearchItems(CATALOG_ITEMS, getAllComponentsFlat(), TEMPLATE_ITEMS);
}
