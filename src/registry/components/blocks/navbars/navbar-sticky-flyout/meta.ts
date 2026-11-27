import type { ComponentAssetMeta } from "@/core/codegen";

export const navbarStickyFlyoutMeta: ComponentAssetMeta = {
  id: "navbar-sticky-flyout",
  name: "Sticky Global Navbar",
  nameZh: "吸顶全局导航",
  subcat: "Header",
  layout: "split-hero",
  archetype: "navbar-bar",
  tags: ["navbar", "header", "flyout", "navigation"],
  descEn: "Sticky 1px architectural header with full-width hover drawer and command trigger.",
  descZh: "带通栏抽屉菜单与快捷键搜索入口的 1px 细线吸顶导航栏。",
  contract: [
    "Keep single bottom accent underline across route and hover states.",
    "Close open flyout immediately on Escape or route change."
  ]
};
