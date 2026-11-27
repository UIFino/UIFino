import { buildGlobalSearchItems, type McpRegistrySnapshot } from "@/core/search";
import { CATALOG_ITEMS } from "./catalog";
import { getAllComponentsFlat } from "./components";
import { STYLE_ITEMS } from "./styles";
import { TEMPLATE_ITEMS } from "./templates";
import { BG_PRESETS, SHADOW_PRESETS } from "./tools";

export function getMcpRegistrySnapshot(): McpRegistrySnapshot {
  return {
    brands: CATALOG_ITEMS,
    assets: getAllComponentsFlat(),
    bgPresets: BG_PRESETS,
    shadowPresets: SHADOW_PRESETS
  };
}

export function getAllSearchableItems() {
  return buildGlobalSearchItems(
    CATALOG_ITEMS,
    getAllComponentsFlat(),
    TEMPLATE_ITEMS,
    STYLE_ITEMS
  );
}
