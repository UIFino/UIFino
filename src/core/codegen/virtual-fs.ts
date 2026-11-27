import type { SupportedCodeLang } from "@/lib/shiki";
import type { ComponentAssetMeta } from "./types";

export function toPascalCase(kebabId: string): string {
  return kebabId
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export function getComponentVirtualFiles(
  item: Pick<ComponentAssetMeta, "id">
): readonly string[] {
  const pascal = toPascalCase(item.id);
  return [`${pascal}.tsx`, `${pascal}Demo.tsx`, "tokens.css", "DESIGN.md"];
}

export function resolveFileCodeLang(filename: string): SupportedCodeLang {
  if (filename.endsWith(".css")) return "css";
  if (filename.endsWith(".md")) return "markdown";
  return "tsx";
}
