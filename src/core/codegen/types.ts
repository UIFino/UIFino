import type { ResolvedWorkbenchTokens } from "@/core/tokens";

export type AssetType = "section" | "block" | "page" | "motion";
export type TargetFramework = "react" | "vue" | "svelte" | "solid";

export type ComponentArchetype =
  | "telemetry-hero"
  | "cli-hero"
  | "editorial-hero"
  | "bento-grid"
  | "pricing-tiers"
  | "auth-card"
  | "cmdk-palette"
  | "data-table"
  | "empty-state"
  | "page-shell"
  | "motion-lab";

export type CategoryMiniKind =
  | "hero"
  | "bento"
  | "pricing"
  | "quotes"
  | "auth"
  | "cmdk"
  | "table"
  | "page"
  | "motion";

export interface ComponentAssetMeta {
  readonly id: string;
  readonly name: string;
  readonly subcat: string;
  readonly layout: string;
  readonly archetype: ComponentArchetype;
  readonly tags: readonly string[];
  readonly descEn: string;
  readonly descZh: string;
  readonly contract: readonly string[];
}

export interface ComponentCategoryMeta {
  readonly id: string;
  readonly assetType: AssetType;
  readonly name: string;
  readonly nameZh: string;
  readonly totalCount: number;
  readonly miniKind: CategoryMiniKind;
  readonly descEn: string;
  readonly descZh: string;
}

export interface AdapterRenderContext {
  readonly item: ComponentAssetMeta;
  readonly category: ComponentCategoryMeta;
  readonly tokens: ResolvedWorkbenchTokens;
  readonly clsOuter: string;
  readonly clsCard: string;
  readonly clsBtn: string;
}
