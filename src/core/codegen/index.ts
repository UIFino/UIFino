import { compileComponentDesignMd } from "@/core/design-md";
import {
  type ResolvedWorkbenchTokens,
  resolveWorkbenchTokens,
  serializeTokensCss
} from "@/core/tokens";
import { renderReactSource } from "./adapters/react";
import type { ComponentAssetMeta, ComponentCategoryMeta } from "./types";
import { getComponentVirtualFiles } from "./virtual-fs";

export * from "./types";
export * from "./virtual-fs";

export function generateComponentSource(
  item: ComponentAssetMeta,
  category: ComponentCategoryMeta,
  tokens?: ResolvedWorkbenchTokens,
  activeFile = ""
): string {
  const tk = tokens ?? resolveWorkbenchTokens();
  const files = getComponentVirtualFiles(item);
  const targetFile =
    activeFile && files.includes(activeFile) ? activeFile : (files[0] ?? "Stage.tsx");

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

  return renderReactSource(ctx);
}
