import type { RegisteredComponentCategory } from "../../_taxonomy";
import { navbarStickyFlyoutMeta } from "./navbar-sticky-flyout/meta";

export const navbarsCategory: RegisteredComponentCategory = {
  id: "navbars",
  assetType: "block",
  name: "Navbars",
  nameZh: "导航栏",
  totalCount: 18,
  miniKind: "navbar",
  descEn: "Sticky marketing headers, full-width flyout drawers, and app top bars.",
  descZh: "吸顶官网顶栏、通栏下拉抽屉与应用工作台顶部导航。",
  items: [navbarStickyFlyoutMeta]
};
