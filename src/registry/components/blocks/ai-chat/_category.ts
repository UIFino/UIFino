import type { RegisteredComponentCategory } from "../../_taxonomy";
import { aiChatAgentThreadMeta } from "./ai-chat-agent-thread/meta";

export const aiChatCategory: RegisteredComponentCategory = {
  id: "ai-chat",
  assetType: "block",
  name: "AI Chat",
  nameZh: "智能对话",
  totalCount: 20,
  miniKind: "chat",
  descEn: "Prompt composers, streaming agent threads, and tool-call inspection cards.",
  descZh: "提示词输入框、流式回答消息流与工具调用状态卡片。",
  items: [aiChatAgentThreadMeta]
};
