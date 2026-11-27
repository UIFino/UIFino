import type { RegisteredComponentCategory } from "../../_taxonomy";
import { motionHairlineSpotlightMeta } from "./motion-hairline-spotlight/meta";

export const pointerSurfacesCategory: RegisteredComponentCategory = {
  id: "pointer-surfaces",
  assetType: "motion",
  name: "Spotlight & Surface Sheen",
  nameZh: "光标聚光与边框微光",
  totalCount: 18,
  miniKind: "motion",
  descEn: "Pointer-tracking radial hairline borders, subtle top-edge sheen, and stacked card fan physics.",
  descZh: "跟随光标的 1px 径向高光细边框、顶部边缘微光与叠层卡片展开动效。",
  items: [motionHairlineSpotlightMeta]
};
