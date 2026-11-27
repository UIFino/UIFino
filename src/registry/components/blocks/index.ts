import { authCategory } from "./auth/_category";
import { commandMenuCategory } from "./command-menu/_category";
import { dataTableCategory } from "./data-table/_category";
import { emptyStatesCategory } from "./empty-states/_category";
import { settingsBillingCategory } from "./settings-billing/_category";

export const BLOCK_CATEGORIES = [
  authCategory,
  commandMenuCategory,
  dataTableCategory,
  settingsBillingCategory,
  emptyStatesCategory
] as const;
