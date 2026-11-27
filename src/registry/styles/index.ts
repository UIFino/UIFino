import type { UiStyleSpec } from "@/core/styles";
import { bentoModularStyle } from "./bento-modular";
import { cleanSaasStyle } from "./clean-saas";
import { editorialSerifStyle } from "./editorial-serif";
import { frostedGlassStyle } from "./frosted-glass";
import { hairlineGridStyle } from "./hairline-grid";
import { monochromeMinimalStyle } from "./monochrome-minimal";
import { neoBrutalismStyle } from "./neo-brutalism";
import { retroTerminalStyle } from "./retro-terminal";
import { softTactileStyle } from "./soft-tactile";
import { swissTypographicStyle } from "./swiss-typographic";

export * from "./_taxonomy";
export * from "./_fit";

export const MINIMAL_STYLE_ITEMS: readonly UiStyleSpec[] = [
  hairlineGridStyle,
  monochromeMinimalStyle,
  swissTypographicStyle,
  cleanSaasStyle,
  editorialSerifStyle
];

export const EXPRESSIVE_STYLE_ITEMS: readonly UiStyleSpec[] = [
  frostedGlassStyle,
  bentoModularStyle,
  neoBrutalismStyle,
  softTactileStyle,
  retroTerminalStyle
];

export const STYLE_ITEMS: readonly UiStyleSpec[] = [
  ...MINIMAL_STYLE_ITEMS,
  ...EXPRESSIVE_STYLE_ITEMS
];

export function findUiStyleBySlug(slug: string): UiStyleSpec | undefined {
  return STYLE_ITEMS.find((item) => item.slug === slug);
}
