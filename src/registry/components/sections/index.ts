import type { RegisteredComponentCategory } from "../_taxonomy";
import { bentoCategory } from "./bento/_category";
import { ctaCategory } from "./cta/_category";
import { faqCategory } from "./faq/_category";
import { footersCategory } from "./footers/_category";
import { heroCategory } from "./hero/_category";
import { pricingCategory } from "./pricing/_category";
import { reviewsCategory } from "./reviews/_category";

export const SECTION_CATEGORIES: readonly RegisteredComponentCategory[] = [
  heroCategory,
  bentoCategory,
  pricingCategory,
  reviewsCategory,
  faqCategory,
  ctaCategory,
  footersCategory
];
