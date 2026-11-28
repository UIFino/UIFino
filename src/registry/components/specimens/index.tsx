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
import { BlockStateStage } from "./block-state-specimens";
import {
  AiChatThreadSpecimen,
  CtaBannerSpecimen,
  FaqAccordionSpecimen,
  FooterGridSpecimen,
  FormDialogSpecimen,
  HoverCardSpecimen,
  NavbarBarSpecimen,
  QuotesWallSpecimen,
  SidebarNavSpecimen,
  SpotlightCardSpecimen,
  StatsKpiSpecimen
} from "./extended-specimens";
import {
  SplitCliOrEditorialHeroSpecimen,
  TelemetryHeroSpecimen
} from "./hero-specimens";
import { MotionLabSpecimen } from "./page-motion-specimens";

export { BlockStateStage, CategoryMiniStack };

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
    case "quotes-wall":
      return <QuotesWallSpecimen {...shared} />;
    case "faq-accordion":
      return <FaqAccordionSpecimen {...shared} />;
    case "cta-banner":
      return <CtaBannerSpecimen {...shared} />;
    case "footer-grid":
      return <FooterGridSpecimen {...shared} />;
    case "navbar-bar":
      return <NavbarBarSpecimen {...shared} />;
    case "sidebar-nav":
      return <SidebarNavSpecimen {...shared} />;
    case "ai-chat-thread":
      return <AiChatThreadSpecimen {...shared} />;
    case "auth-card":
      return <AuthCardSpecimen {...shared} />;
    case "data-table":
      return <DataTableSpecimen {...shared} />;
    case "stats-kpi":
      return <StatsKpiSpecimen {...shared} />;
    case "form-dialog":
      return <FormDialogSpecimen {...shared} />;
    case "cmdk-palette":
      return <CmdkPaletteSpecimen {...shared} />;
    case "empty-state":
      return <EmptyStateSpecimen {...shared} />;
    case "spotlight-card":
      return <SpotlightCardSpecimen {...shared} />;
    case "hover-card":
      return <HoverCardSpecimen {...shared} />;
    case "motion-lab":
      return <MotionLabSpecimen {...shared} />;
    default:
      return <BentoGridSpecimen {...shared} />;
  }
}
