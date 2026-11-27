import { compileComponentDesignMd } from "@/core/design-md";
import { type ResolvedWorkbenchTokens, resolveWorkbenchTokens, serializeTokensCss } from "@/core/tokens";
import { renderReactSource } from "./adapters/react";
import { renderSolidSource } from "./adapters/solid";
import { renderSvelteSource } from "./adapters/svelte";
import { renderVueSource } from "./adapters/vue";
import type { ComponentAssetMeta, ComponentCategoryMeta, TargetFramework } from "./types";
import { getComponentVirtualFiles } from "./virtual-fs";

export * from "./types";
export * from "./virtual-fs";

export function normalizeFramework(raw?: string): TargetFramework {
  if (raw === "vue" || raw === "svelte" || raw === "solid" || raw === "react") {
    return raw;
  }
  return "react";
}

export function generateFrameworkSource(
  item: ComponentAssetMeta,
  category: ComponentCategoryMeta,
  framework: TargetFramework = "react",
  tokens?: ResolvedWorkbenchTokens,
  activeFile = ""
): string {
  const tk = tokens ?? resolveWorkbenchTokens();
  const files = getComponentVirtualFiles(item, framework);
  const targetFile = activeFile && files.includes(activeFile) ? activeFile : (files[0] ?? "Stage.tsx");

  if (targetFile === "tokens.css") {
    return serializeTokensCss(tk);
  }

  if (targetFile === "DESIGN.md") {
    return compileComponentDesignMd({
      id: item.id,
      name: item.name,
      assetType: category.assetType,
      categoryName: category.name,
      descEn: item.descEn,
      contract: item.contract,
      tokens: tk
    });
  }

  const ctx = {
    item,
    category,
    tokens: tk,
    clsOuter: `bg-[${tk.canvas}] text-[${tk.ink}] ${tk.twPadStage}`,
    clsCard: `border border-[${tk.border}] bg-[${tk.surface}] ${tk.twCard} ${tk.twPadCard}`,
    clsBtn: `inline-flex items-center px-4 font-medium bg-[${tk.accent}] text-[${tk.accentFg}] ${tk.twCtrl}`
  };

  if (framework === "vue") return renderVueSource(ctx);
  if (framework === "svelte") return renderSvelteSource(ctx);
  if (framework === "solid") return renderSolidSource(ctx);
  return renderReactSource(ctx);
}
