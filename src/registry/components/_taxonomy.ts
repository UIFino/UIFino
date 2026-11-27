import type { AssetType, ComponentAssetMeta, ComponentCategoryMeta } from "@/core/codegen";

export type AssetTypeFilter = "all" | AssetType;

export interface AssetTypeOption {
  readonly id: AssetTypeFilter;
  readonly labelEn: string;
  readonly labelZh: string;
  readonly badge: string;
}

export interface RegisteredComponentCategory extends ComponentCategoryMeta {
  readonly items: readonly ComponentAssetMeta[];
}

export const ASSET_TYPES: readonly AssetTypeOption[] = [
  { id: "all", labelEn: "All Assets", labelZh: "全部资产", badge: "ALL" },
  { id: "section", labelEn: "Sections", labelZh: "Section 区块", badge: "SECTION" },
  { id: "block", labelEn: "Blocks", labelZh: "Block 模块", badge: "BLOCK" },
  { id: "page", labelEn: "Pages", labelZh: "Page 整页", badge: "PAGE" },
  { id: "motion", labelEn: "Motion", labelZh: "Motion 动效", badge: "MOTION" }
];
