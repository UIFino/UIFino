import type { BrandSkinContract } from "@/core/tokens";

export type CatalogPlatformKind = "website" | "app";
export type CatalogDomainCategory =
  | "AI & LLM"
  | "DevTools"
  | "Productivity"
  | "Fintech"
  | "Content & Community"
  | "Consumer & Travel";

export interface CatalogPercentBounds {
  readonly topPct: number;
  readonly heightPct: number;
}

export interface CatalogPageSectionAnatomy {
  readonly index: string;
  readonly nameZh: string;
  readonly nameEn: string;
  readonly layoutZh: string;
  readonly layoutEn: string;
  readonly noteZh: string;
  readonly noteEn: string;
  readonly bounds?: {
    readonly desktop: CatalogPercentBounds;
    readonly mobile: CatalogPercentBounds;
  };
}

export interface CatalogPageCapture {
  readonly id: string;
  readonly titleZh: string;
  readonly titleEn: string;
  readonly path: string;
  readonly url: string;
  readonly desktopImg: string;
  readonly mobileImg: string;
  readonly anatomy: readonly CatalogPageSectionAnatomy[];
}

export interface CatalogSectionSlice {
  readonly id: string;
  readonly index: string;
  readonly nameZh: string;
  readonly nameEn: string;
  readonly selector: string;
  readonly bbox: string;
  readonly img: string;
  readonly noteZh: string;
  readonly noteEn: string;
}

export interface CatalogMeasuredColor {
  readonly roleZh: string;
  readonly roleEn: string;
  readonly cssVar: string;
  readonly hex: string;
  readonly share: string;
}

export interface CatalogMeasuredType {
  readonly level: string;
  readonly detectedFamily: string;
  readonly freeAlternative: string;
  readonly size: string;
  readonly weight: string;
  readonly lineHeight: string;
  readonly tracking: string;
  readonly cssSnippet: string;
}

export interface CatalogMeasuredGeometry {
  readonly targetZh: string;
  readonly targetEn: string;
  readonly radius: string;
  readonly border: string;
  readonly shadow: string;
  readonly extra?: string;
  readonly cssSnippet: string;
}

export interface CatalogHoverDiff {
  readonly targetZh: string;
  readonly targetEn: string;
  readonly restBg: string;
  readonly restBorder: string;
  readonly restColor: string;
  readonly hoverBg: string;
  readonly hoverBorder: string;
  readonly hoverColor: string;
  readonly transition: string;
  readonly cssSnippet: string;
}

export interface CatalogScrapedData {
  readonly capturedAt: string;
  readonly containerMaxWidth: string;
  readonly pages: readonly CatalogPageCapture[];
  readonly sections: readonly CatalogSectionSlice[];
  readonly measuredColors: readonly CatalogMeasuredColor[];
  readonly measuredTypography: readonly CatalogMeasuredType[];
  readonly measuredGeometry: readonly CatalogMeasuredGeometry[];
  readonly hoverDiffs: readonly CatalogHoverDiff[];
}

export interface CatalogBrandSpec extends BrandSkinContract {
  readonly slug: string;
  readonly siteUrl?: string;
  readonly kind: CatalogPlatformKind;
  readonly platformLabel: string;
  readonly category: CatalogDomainCategory;
  readonly tags: readonly string[];
  readonly shortTagsZh?: readonly string[];
  readonly shortTagsEn?: readonly string[];
  readonly goodForZh?: readonly string[];
  readonly goodForEn?: readonly string[];
  readonly notForZh?: readonly string[];
  readonly notForEn?: readonly string[];
  readonly summaryZh: string;
  readonly summaryEn: string;
  readonly openFontAlt?: string;
  readonly radiusScale: readonly string[];
  readonly defaultRadius: string;
  readonly spacingScale: readonly number[];
  readonly archetype: string;
  readonly ctaLabel: string;
  readonly rules: readonly string[];
  readonly rulesZh?: readonly string[];
  readonly antiAiRulesEn?: readonly string[];
  readonly antiAiRulesZh?: readonly string[];
  readonly scraped?: CatalogScrapedData;
}
