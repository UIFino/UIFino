import type { BrandSkinContract } from "@/core/tokens";

export type CatalogPlatformKind = "website" | "app";
export type CatalogDomainCategory =
  | "AI & LLM"
  | "DevTools"
  | "Productivity"
  | "Fintech"
  | "Content & Community"
  | "Consumer & Travel";

export interface CatalogBrandSpec extends BrandSkinContract {
  readonly slug: string;
  readonly kind: CatalogPlatformKind;
  readonly platformLabel: string;
  readonly category: CatalogDomainCategory;
  readonly installs: string;
  readonly bookmarks: string;
  readonly tags: readonly string[];
  readonly summaryZh: string;
  readonly summaryEn: string;
  readonly radiusScale: readonly string[];
  readonly defaultRadius: string;
  readonly spacingScale: readonly number[];
  readonly archetype: string;
  readonly ctaLabel: string;
  readonly rules: readonly string[];
}
