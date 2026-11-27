import type { AssetType, ComponentAssetMeta } from "@/core/codegen";
import type { CatalogBrandSpec } from "@/core/design-md";
import type { BackgroundPreset } from "@/core/studios/background";
import type { ShadowPreset } from "@/core/studios/shadow";

export type CmdkFilterGroup =
  | "all"
  | "catalog"
  | "styles"
  | "section"
  | "block"
  | "motion"
  | "templates"
  | "tools";

export interface FlattenedComponentEntry extends ComponentAssetMeta {
  readonly categoryId: string;
  readonly categoryName: string;
  readonly categoryNameZh: string;
  readonly assetType: AssetType;
}

export interface StyleSummaryEntry {
  readonly slug: string;
  readonly name: string;
  readonly nameZh: string;
  readonly defaultRadius: number;
}

export interface TemplateSummaryEntry {
  readonly id: string;
  readonly name: string;
  readonly nameZh: string;
  readonly stack: string;
}

export interface SearchableItem {
  readonly id: string;
  readonly group: Exclude<CmdkFilterGroup, "all">;
  readonly badge: string;
  readonly label: string;
  readonly keywords?: string;
  readonly meta: string;
  readonly href: string;
}

export interface McpQueryFilter {
  readonly query?: string;
  readonly style?: string;
  readonly layout?: string;
  readonly assetType?: "all" | AssetType;
}

export interface McpRegistrySnapshot {
  readonly brands: readonly CatalogBrandSpec[];
  readonly assets: readonly FlattenedComponentEntry[];
  readonly bgPresets: readonly BackgroundPreset[];
  readonly shadowPresets: readonly ShadowPreset[];
}

export interface McpQueryResult {
  readonly brands: readonly CatalogBrandSpec[];
  readonly assets: readonly FlattenedComponentEntry[];
  readonly toolPreset: BackgroundPreset | undefined;
  readonly shadowPreset: ShadowPreset | undefined;
  readonly jsonPayload: string;
}
