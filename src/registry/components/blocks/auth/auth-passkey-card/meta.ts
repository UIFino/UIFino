import type { ComponentAssetMeta } from "@/core/codegen";

export const authPasskeyCardMeta: ComponentAssetMeta = {
  id: "auth-passkey-card",
  name: "Minimal Passkey & OAuth Card",
  nameZh: "Passkey 与邮箱登录卡",
  subcat: "Sign In",
  layout: "auth-card",
  archetype: "auth-card",
  tags: ["auth", "login", "passkey", "minimal", "form"],
  descEn: "380px hairline authentication block featuring GitHub/Google OAuth, work email field, and validation states.",
  descZh: "380px 紧凑认证模块，集成 GitHub/Google 快捷登录、企业邮箱校验与错误提示态。",
  contract: [
    "Associate every input with an explicit <label> and inline error slot.",
    "Maintain 40px minimum button height for comfortable touch and keyboard access."
  ],
  contractZh: [
    "每个输入框都配明确的 label 标签以及紧邻的行内错误提示位。",
    "主次操作按钮保持至少 40px 点击高度，兼顾触屏与键盘可达性。"
  ]
};
