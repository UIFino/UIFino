import type { RegisteredComponentCategory } from "../_taxonomy";
import { aiChatCategory } from "./ai-chat/_category";
import { authCategory } from "./auth/_category";
import { commandCategory } from "./command/_category";
import { emptyCategory } from "./empty/_category";
import { formsCategory } from "./forms/_category";
import { navbarsCategory } from "./navbars/_category";
import { sidebarsCategory } from "./sidebars/_category";
import { statsCategory } from "./stats/_category";
import { tablesCategory } from "./tables/_category";

export const BLOCK_CATEGORIES: readonly RegisteredComponentCategory[] = [
  navbarsCategory,
  sidebarsCategory,
  aiChatCategory,
  authCategory,
  tablesCategory,
  statsCategory,
  formsCategory,
  commandCategory,
  emptyCategory
];
