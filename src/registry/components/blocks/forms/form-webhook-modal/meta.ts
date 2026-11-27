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
  ]
};
