import type { ComponentAssetMeta } from "@/core/codegen";

export const authPasskeyCardMeta: ComponentAssetMeta = {
  id: "auth-passkey-card",
  name: "Minimal Passkey & OAuth Card",
  subcat: "Sign In",
  layout: "auth-card",
  archetype: "auth-card",
  tags: ["auth", "login", "passkey", "minimal", "form"],
  descEn: "380px hairline authentication block featuring GitHub/Google OAuth, work email field, and validation states.",
  descZh: "380px 紧凑认证模块，集成 GitHub/Google 快捷登录、企业邮箱校验与错误提示态。",
  contract: [
    "Associate every input with an explicit <label> and inline error slot.",
    "Maintain 40px minimum button height for comfortable touch and keyboard access."
  ]
};
