import type { ComponentAssetMeta } from "@/core/codegen";

export const aiChatAgentThreadMeta: ComponentAssetMeta = {
  id: "ai-chat-agent-thread",
  name: "Agent Tool-Call Thread",
  nameZh: "智能体对话流",
  subcat: "Agent UI",
  layout: "auth-card",
  archetype: "ai-chat-thread",
  tags: ["ai", "chat", "agent", "streaming", "prompt"],
  descEn: "Streaming AI conversation view with collapsible tool-call badges and prompt composer.",
  descZh: "带工具调用状态折叠条与多行输入框的流式智能对话模块。",
  contract: [
    "Keep prompt input anchored without obscuring latest streamed tokens.",
    "Render code and tool outputs in monospace containers with horizontal scroll."
  ]
};
