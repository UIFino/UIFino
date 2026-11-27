import type { RegisteredComponentCategory } from "../../_taxonomy";
import { authPasskeyCardMeta } from "./auth-passkey-card/meta";
import { authSsoSplitMeta } from "./auth-sso-split/meta";

export const authCategory: RegisteredComponentCategory = {
  id: "auth",
  assetType: "block",
  name: "Auth",
  nameZh: "登录注册",
  totalCount: 16,
  miniKind: "auth",
  descEn: "Passkey, OAuth provider, magic-link, and 6-digit OTP verification blocks.",
  descZh: "通行密钥、第三方登录、魔法链接与验证码输入模块。",
  items: [authPasskeyCardMeta, authSsoSplitMeta]
};
