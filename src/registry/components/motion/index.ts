import { countersTickersCategory } from "./counters-tickers/_category";
import { pointerSurfacesCategory } from "./pointer-surfaces/_category";
import { staggerRevealCategory } from "./stagger-reveal/_category";

export const MOTION_CATEGORIES = [
  countersTickersCategory,
  pointerSurfacesCategory,
  staggerRevealCategory
] as const;
