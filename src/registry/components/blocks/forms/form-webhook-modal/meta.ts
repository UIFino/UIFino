import type { ComponentAssetMeta } from "@/core/codegen";

export const formWebhookModalMeta: ComponentAssetMeta = {
  id: "form-webhook-modal",
  name: "Webhook Config Dialog",
  nameZh: "回调配置弹窗",
  subcat: "Modal Form",
  layout: "auth-card",
  archetype: "form-dialog",
  tags: ["form", "dialog", "modal", "settings", "input"],
  descEn: "Focused configuration modal with endpoint validation and confirm/cancel footer.",
  descZh: "带地址校验与确认取消底栏的轻量配置表单弹窗。",
  contract: [
    "Trap keyboard focus inside open modal and dismiss cleanly on Escape.",
    "Associate every input with an explicit label."
  ],
  contractZh: [
    "弹窗打开期间锁定键盘焦点在弹层内部，按下 Escape 键平稳关闭并归还焦点。",
    "所有表单输入域绑定明确的可点击标签。"
  ]
};
