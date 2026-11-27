import { devtoolsLaunchPage } from "./devtools-launch-page/meta";
import { ledgerTelemetryAdmin } from "./ledger-telemetry-admin/meta";
import { minimalTechWeekly } from "./minimal-tech-weekly/meta";
import { monochromeDocsHub } from "./monochrome-docs-hub/meta";
import { observabilityConsolePage } from "./observability-console-page/meta";
import { obsidianSaasKit } from "./obsidian-saas-kit/meta";
import { parchmentAgentDesk } from "./parchment-agent-desk/meta";
import { passkeyAuthPage } from "./passkey-auth-page/meta";
import { releaseChangelogPage } from "./release-changelog-page/meta";
import { swissStudioPortfolio } from "./swiss-studio-portfolio/meta";
import { tieredPricingPage } from "./tiered-pricing-page/meta";
import { workspaceSettingsPage } from "./workspace-settings-page/meta";
import type { StarterTemplateSpec } from "./_taxonomy";

export * from "./_taxonomy";
export * from "./specimen";

export const TEMPLATE_ITEMS: readonly StarterTemplateSpec[] = [
  obsidianSaasKit,
  parchmentAgentDesk,
  ledgerTelemetryAdmin,
  monochromeDocsHub,
  swissStudioPortfolio,
  minimalTechWeekly,
  devtoolsLaunchPage,
  tieredPricingPage,
  passkeyAuthPage,
  observabilityConsolePage,
  releaseChangelogPage,
  workspaceSettingsPage
];

export function findTemplateById(id: string): StarterTemplateSpec | undefined {
  return TEMPLATE_ITEMS.find((tpl) => tpl.id === id);
}
