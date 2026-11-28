import type { ComponentType } from "react";
import type { ResolvedWorkbenchTokens } from "@/core/tokens";

export type AssetType = "section" | "block" | "motion";

export type ComponentArchetype =
  | "telemetry-hero"
  | "cli-hero"
  | "editorial-hero"
  | "bento-grid"
  | "pricing-tiers"
  | "quotes-wall"
  | "faq-accordion"
  | "cta-banner"
  | "footer-grid"
  | "navbar-bar"
  | "sidebar-nav"
  | "ai-chat-thread"
  | "auth-card"
  | "data-table"
  | "stats-kpi"
  | "form-dialog"
  | "cmdk-palette"
  | "empty-state"
  | "motion-lab"
  | "spotlight-card"
  | "hover-card";

export type CategoryMiniKind =
  | "hero"
  | "bento"
  | "pricing"
  | "quotes"
  | "faq"
  | "cta"
  | "footer"
  | "navbar"
  | "sidebar"
  | "chat"
  | "auth"
  | "table"
  | "stats"
  | "form"
  | "cmdk"
  | "empty"
  | "motion"
  | "spotlight"
  | "hover"
  | "accordion";

export interface ComponentAssetMeta {
  readonly id: string;
  readonly name: string;
  readonly nameZh?: string;
  readonly subcat: string;
  readonly layout: string;
  readonly archetype: ComponentArchetype;
  readonly tags: readonly string[];
  readonly descEn: string;
  readonly descZh: string;
  readonly contract: readonly string[];
  readonly contractZh?: readonly string[];
  readonly DemoComponent?: ComponentType<{
    readonly tokens: ResolvedWorkbenchTokens;
    readonly viewport: "desktop" | "tablet" | "mobile";
    readonly compact?: boolean;
    readonly stateView?: boolean;
    readonly replayKey?: number;
  }>;
  readonly filesSource?: Readonly<Record<string, string>>;
  readonly dependencies?: readonly string[];
  readonly propsSpec?: readonly ComponentPropRow[];
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

export interface ComponentPropRow {
  readonly name: string;
  readonly type: string;
  readonly defaultValue: string;
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
