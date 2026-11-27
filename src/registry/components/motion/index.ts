import type { RegisteredComponentCategory } from "../_taxonomy";
import { accordionCategory } from "./accordion/_category";
import { countersCategory } from "./counters/_category";
import { hoverCategory } from "./hover/_category";
import { revealCategory } from "./reveal/_category";
import { spotlightCategory } from "./spotlight/_category";

export const MOTION_CATEGORIES: readonly RegisteredComponentCategory[] = [
  countersCategory,
  spotlightCategory,
  revealCategory,
  hoverCategory,
  accordionCategory
];
