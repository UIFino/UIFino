import type { SupportedCodeLang } from "@/lib/shiki";

export interface McpClientConfig {
  readonly id: string;
  readonly name: string;
  readonly badge: string;
  readonly file: string;
  readonly lang: SupportedCodeLang;
  readonly snippet: string;
  readonly descZh: string;
  readonly descEn: string;
}
