import { compileComponentDesignMd } from "@/core/design-md";
import {
  type ResolvedWorkbenchTokens,
  resolveWorkbenchTokens,
  serializeTokensCss
} from "@/core/tokens";
import {
  renderReactDemoSource,
  renderReactSource
} from "./adapters/react";
import type { ComponentAssetMeta, ComponentCategoryMeta } from "./types";
import { getComponentVirtualFiles, toPascalCase } from "./virtual-fs";

export * from "./types";
export * from "./virtual-fs";
export * from "./prompt";
export { getComponentDependencies, getComponentPropsSpec } from "./adapters/react";

export function generateComponentSource(
  item: ComponentAssetMeta,
  category: ComponentCategoryMeta,
  tokens?: ResolvedWorkbenchTokens,
  activeFile = ""
): string {
  const tk = tokens ?? resolveWorkbenchTokens();
  const files = getComponentVirtualFiles(item);
  const pascal = toPascalCase(item.id);
  const targetFile =
    activeFile && files.includes(activeFile) ? activeFile : (files[0] ?? `${pascal}.tsx`);

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
    clsOuter: `bg-[var(--ui-canvas,${tk.canvas})] text-[var(--ui-ink,${tk.ink})] ${tk.twPadStage}`,
    clsCard: `border border-[var(--ui-border,${tk.border})] bg-[var(--ui-surface,${tk.surface})] ${tk.twCard} ${tk.twPadCard}`,
    clsBtn: `inline-flex items-center px-4 font-medium bg-[var(--ui-accent,${tk.accent})] text-[var(--ui-accent-fg,${tk.accentFg})] ${tk.twCtrl}`
  };

  if (targetFile === `${pascal}Demo.tsx`) {
    return renderReactDemoSource(ctx);
  }

  return renderReactSource(ctx);
}
