import type { SupportedCodeLang } from "@/lib/shiki";
import type { ComponentAssetMeta, TargetFramework } from "./types";

export function toPascalCase(kebabId: string): string {
  return kebabId
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export function getComponentVirtualFiles(
  item: Pick<ComponentAssetMeta, "id">,
  framework: TargetFramework = "react"
): readonly string[] {
  const ext = framework === "vue" ? "vue" : framework === "svelte" ? "svelte" : "tsx";
  const pascal = toPascalCase(item.id);
  return [`${pascal}.${ext}`, "tokens.css", "DESIGN.md"];
}

export function resolveFileCodeLang(filename: string, framework: TargetFramework): SupportedCodeLang {
  if (filename.endsWith(".css")) return "css";
  if (filename.endsWith(".md")) return "markdown";
  if (framework === "vue") return "vue";
  if (framework === "svelte") return "svelte";
  return "tsx";
}
