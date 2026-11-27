import type { RegisteredComponentCategory } from "../../_taxonomy";
import { formWebhookModalMeta } from "./form-webhook-modal/meta";

export const formsCategory: RegisteredComponentCategory = {
  id: "forms",
  assetType: "block",
  name: "Forms",
  nameZh: "表单弹窗",
  totalCount: 19,
  miniKind: "form",
  descEn: "Settings forms, webhook dialogs, API key generators, and multi-step drawers.",
  descZh: "设置表单、配置对话框、密钥生成弹窗与分步抽屉表单。",
  items: [formWebhookModalMeta]
};
