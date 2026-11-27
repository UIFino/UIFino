import type { ResolvedWorkbenchTokens } from "@/core/tokens";
import { serializeDesignMdFrontmatter } from "./frontmatter";
import { buildDesignMdSections } from "./sections";
import type { CatalogBrandSpec } from "./types";

export function compileBrandDesignMd(spec: CatalogBrandSpec): string {
  return `${serializeDesignMdFrontmatter(spec)}\n\n${buildDesignMdSections(spec)}`;
}

export interface ComponentProtocolInput {
  readonly id: string;
  readonly name: string;
  readonly assetType: string;
  readonly categoryName: string;
  readonly descEn: string;
  readonly contract: readonly string[];
  readonly tokens: ResolvedWorkbenchTokens;
}

export function compileComponentDesignMd(input: ComponentProtocolInput): string {
  const rulesList = input.contract.map((c) => `- ${c}`).join("\n");
  return `---
asset: "${input.id}"
type: "${input.assetType}"
category: "${input.categoryName}"
radius: "${input.tokens.card}"
density: "${input.tokens.density}"
skin: "${input.tokens.skinName}"
---

# ${input.name}

${input.descEn}

## Layout & Motion Contract
${rulesList}`;
}
