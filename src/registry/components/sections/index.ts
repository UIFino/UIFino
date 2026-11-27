import { bentoFeaturesCategory } from "./bento-features/_category";
import { ctaFooterCategory } from "./cta-footer/_category";
import { heroCategory } from "./hero/_category";
import { pricingCategory } from "./pricing/_category";
import { socialProofCategory } from "./social-proof/_category";

export const SECTION_CATEGORIES = [
  heroCategory,
  bentoFeaturesCategory,
  pricingCategory,
  socialProofCategory,
  ctaFooterCategory
] as const;
