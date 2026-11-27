import type { RegisteredComponentCategory } from "../../_taxonomy";
import { settingsApiScopesMeta } from "./settings-api-scopes/meta";

export const settingsBillingCategory: RegisteredComponentCategory = {
  id: "settings-billing",
  assetType: "block",
  name: "Settings & API Keys",
  nameZh: "设置面板与密钥管理",
  totalCount: 20,
  miniKind: "auth",
  descEn: "Scoped API token generators, webhook configuration cards, and notification matrices.",
  descZh: "带权限范围的 API 密钥管理卡、Webhook 配置与通知开关矩阵。",
  items: [settingsApiScopesMeta]
};
