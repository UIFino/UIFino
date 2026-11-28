import type { ComponentAssetMeta } from "@/core/codegen";

export const authSsoSplitMeta: ComponentAssetMeta = {
  id: "auth-sso-split",
  name: "Enterprise SAML Split Block",
  nameZh: "企业域名单点登录",
  subcat: "Enterprise SSO",
  layout: "auth-card",
  archetype: "auth-card",
  tags: ["auth", "sso", "saas", "fintech"],
  descEn: "Domain-aware enterprise login block switching automatically to SAML SSO when workspace domain matches.",
  descZh: "支持企业域名自动识别切换 SAML 单点登录的双态认证模块。",
  contract: ["Preserve entered email across SSO mode transitions."],
  contractZh: ["切换进入企业 SSO 单点模式时自动保留用户已输入的邮箱内容。"]
};
