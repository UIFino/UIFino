import type { StarterTemplateSpec } from "../_taxonomy";

export const passkeyAuthPage: StarterTemplateSpec = {
  id: "passkey-auth-page",
  kind: "page",
  scene: "auth",
  category: "Auth",
  name: "Passkey Split Auth",
  nameZh: "双栏登录认证页",
  stack: "Single Page · TSX",
  skinId: "vercel",
  skinLabel: "Vercel DESIGN.md",
  accent: "#FFFFFF",
  canvas: "#000000",
  surface: "#0A0A0A",
  border: "#262626",
  pagesCount: 1,
  routes: ["Passkey", "GitHub SSO", "Magic Link", "Brand Quote"],
  descEn: "Split-screen authentication page pairing Passkey/SSO login with an architectural brand panel.",
  descZh: "左侧通行密钥与第三方快捷登录、右侧产品价值展示的双栏认证单页。"
};
