import type { ViewportSize } from "@/components/patterns/viewport-frame";
import type { ComponentAssetMeta } from "@/core/codegen";
import type { ResolvedWorkbenchTokens } from "@/core/tokens";
import {
  AuthCardSpecimen,
  BentoGridSpecimen,
  CmdkPaletteSpecimen,
  DataTableSpecimen,
  EmptyStateSpecimen,
  PricingTiersSpecimen
} from "./block-specimens";
import { CategoryMiniStack } from "./category-mini-stack";
import {
  SplitCliOrEditorialHeroSpecimen,
  TelemetryHeroSpecimen
} from "./hero-specimens";
import { MotionLabSpecimen, PageShellSpecimen } from "./page-motion-specimens";

export { CategoryMiniStack };

export interface AssetStageProps {
  readonly item: ComponentAssetMeta;
  readonly tokens: ResolvedWorkbenchTokens;
  readonly viewport?: ViewportSize;
  readonly compact?: boolean;
  readonly replayKey?: number;
}

export function AssetStage({
  item,
  tokens,
  viewport = "desktop",
  compact = false,
  replayKey = 0
}: AssetStageProps) {
  const isMobile = !compact && viewport === "mobile";
  const shared = { item, tokens, isMobile, compact, replayKey };

  switch (item.archetype) {
    case "telemetry-hero":
      return <TelemetryHeroSpecimen {...shared} />;
    case "cli-hero":
    case "editorial-hero":
      return <SplitCliOrEditorialHeroSpecimen {...shared} />;
    case "pricing-tiers":
      return <PricingTiersSpecimen {...shared} />;
    case "auth-card":
      return <AuthCardSpecimen {...shared} />;
    case "cmdk-palette":
      return <CmdkPaletteSpecimen {...shared} />;
    case "data-table":
      return <DataTableSpecimen {...shared} />;
    case "empty-state":
      return <EmptyStateSpecimen {...shared} />;
    case "page-shell":
      return <PageShellSpecimen {...shared} />;
    case "motion-lab":
      return <MotionLabSpecimen {...shared} />;
    default:
      return <BentoGridSpecimen {...shared} />;
  }
}
