import type { CatalogBrandSpec } from "@/core/design-md";
import { arcSearchSpec } from "./apps/arc-search";
import { flightySpec } from "./apps/flighty";
import { lumaAppSpec } from "./apps/luma-app";
import { mercuryAppSpec } from "./apps/mercury-app";
import { claudeSpec } from "./websites/claude";
import { linearSpec } from "./websites/linear";
import { notionSpec } from "./websites/notion";
import { raycastSpec } from "./websites/raycast";
import { resendSpec } from "./websites/resend";
import { stripeSpec } from "./websites/stripe";
import { supabaseSpec } from "./websites/supabase";
import { vercelSpec } from "./websites/vercel";

export * from "./_taxonomy";
export * from "./portrait";

export const WEBSITE_CATALOG_ITEMS: readonly CatalogBrandSpec[] = [
  linearSpec,
  claudeSpec,
  vercelSpec,
  stripeSpec,
  raycastSpec,
  supabaseSpec,
  notionSpec,
  resendSpec
];

export const APP_CATALOG_ITEMS: readonly CatalogBrandSpec[] = [
  arcSearchSpec,
  flightySpec,
  lumaAppSpec,
  mercuryAppSpec
];

export const CATALOG_ITEMS: readonly CatalogBrandSpec[] = [
  ...WEBSITE_CATALOG_ITEMS,
  ...APP_CATALOG_ITEMS
];

export function findCatalogBrandById(id: string): CatalogBrandSpec | undefined {
  return CATALOG_ITEMS.find((item) => item.id === id);
}
