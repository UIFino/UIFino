import { codeToHtml } from "shiki";

export type SupportedCodeLang =
  | "tsx"
  | "vue"
  | "svelte"
  | "css"
  | "markdown"
  | "json"
  | "toml"
  | "bash";

export async function highlightCode(code: string, lang: SupportedCodeLang): Promise<string> {
  return codeToHtml(code, {
    lang,
    themes: {
      dark: "github-dark-default",
      light: "github-light-default"
    },
    defaultColor: false
  });
}
