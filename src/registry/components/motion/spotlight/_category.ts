import type { RegisteredComponentCategory } from "../../_taxonomy";
import { motionHairlineSpotlightMeta } from "./motion-hairline-spotlight/meta";

export const spotlightCategory: RegisteredComponentCategory = {
  id: "spotlight",
  assetType: "motion",
  name: "Spotlight",
  nameZh: "聚光卡片",
  totalCount: 9,
  miniKind: "spotlight",
  descEn: "Cursor-following radial border lights and subtle surface sheen cards.",
  descZh: "跟随光标移动的径向边框聚光与微光扫过表面卡片。",
  items: [motionHairlineSpotlightMeta]
};
