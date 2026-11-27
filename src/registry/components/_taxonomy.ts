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
  { id: "all", labelEn: "All", labelZh: "全部组件", badge: "ALL" },
  { id: "section", labelEn: "Sections", labelZh: "官网区块", badge: "SECTION" },
  { id: "block", labelEn: "Blocks", labelZh: "功能模块", badge: "BLOCK" },
  { id: "motion", labelEn: "Motion", labelZh: "交互动效", badge: "MOTION" }
];
