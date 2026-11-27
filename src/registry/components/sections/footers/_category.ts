import type { RegisteredComponentCategory } from "../../_taxonomy";
import { footerArchitecturalColumnsMeta } from "./footer-architectural-columns/meta";

export const footersCategory: RegisteredComponentCategory = {
  id: "footers",
  assetType: "section",
  name: "Footers",
  nameZh: "页脚",
  totalCount: 12,
  miniKind: "footer",
  descEn: "Multi-column architectural footers, compact status footers, and docs sitemaps.",
  descZh: "多栏站点地图页脚、紧凑型应用底栏与文档底部导航。",
  items: [footerArchitecturalColumnsMeta]
};
