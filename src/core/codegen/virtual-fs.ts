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
  item: Pick<ComponentAssetMeta, "id" | "filesSource">
): readonly string[] {
  const pascal = toPascalCase(item.id);
  const customFiles = item.filesSource ? Object.keys(item.filesSource) : [];
  const base = customFiles.length > 0 ? customFiles : [`${pascal}.tsx`, `${pascal}Demo.tsx`];
  const result = [...base];
  if (!result.includes("tokens.css")) {
    result.push("tokens.css");
  }
  if (!result.includes("DESIGN.md")) {
    result.push("DESIGN.md");
  }
  return result;
}

export function resolveFileCodeLang(filename: string): SupportedCodeLang {
  if (filename.endsWith(".css")) return "css";
  if (filename.endsWith(".md")) return "markdown";
  return "tsx";
}
