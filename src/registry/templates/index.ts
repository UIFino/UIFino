import { ledgerTelemetryAdmin } from "./ledger-telemetry-admin/meta";
import { monochromeDocsHub } from "./monochrome-docs-hub/meta";
import { obsidianSaasKit } from "./obsidian-saas-kit/meta";
import { parchmentAgentDesk } from "./parchment-agent-desk/meta";
import type { StarterTemplateSpec } from "./_taxonomy";

export * from "./_taxonomy";
export * from "./specimen";

export const TEMPLATE_ITEMS: readonly StarterTemplateSpec[] = [
  obsidianSaasKit,
  parchmentAgentDesk,
  monochromeDocsHub,
  ledgerTelemetryAdmin
];

export function findTemplateById(id: string): StarterTemplateSpec | undefined {
  return TEMPLATE_ITEMS.find((tpl) => tpl.id === id);
}
