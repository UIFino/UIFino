import type { ComponentAssetMeta } from "@/core/codegen";

export const settingsApiScopesMeta: ComponentAssetMeta = {
  id: "settings-api-scopes",
  name: "Scoped MCP Token Manager",
  subcat: "API Keys",
  layout: "data-table",
  archetype: "data-table",
  tags: ["settings", "api", "security", "saas"],
  descEn: "Token management panel with masked secret keys, scope badges, last-used timestamps, and revoke action.",
  descZh: "支持密钥掩码展示、权限标签、最近调用时间与一键吊销的令牌面板。",
  contract: ["Never expose raw secret tokens after initial creation modal closes."]
};
