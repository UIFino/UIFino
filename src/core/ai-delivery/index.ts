import {
  generateComponentSource,
  getComponentDependencies,
  getComponentVirtualFiles
} from "@/core/codegen";
import { compileBrandDesignMd, compileBrandTokensCss } from "@/core/design-md";
import { compileStyleCssVariables, compileStyleDesignMd } from "@/core/styles";
import { resolveWorkbenchTokens } from "@/core/tokens";
import { CATALOG_ITEMS, findCatalogBrandById } from "@/registry/catalog";
import { COMPONENT_CATEGORIES, getAllComponentsFlat } from "@/registry/components";
import { findUiStyleBySlug, STYLE_ITEMS } from "@/registry/styles";
import { findTemplateById, getTemplateDetailBundle, TEMPLATE_ITEMS } from "@/registry/templates";

export type AiRuleFormatId = "claude-skill" | "cursor-mdc" | "agents-md" | "design-md";

export interface AiGuardrailPack {
  readonly id: AiRuleFormatId;
  readonly label: string;
  readonly filename: string;
  readonly targetPath: string;
  readonly lang: "markdown";
  readonly descZh: string;
  readonly descEn: string;
  readonly content: string;
}

export function getAiGuardrailPacks(): readonly AiGuardrailPack[] {
  return [
    {
      id: "claude-skill",
      label: "Claude / Codex Skill",
      filename: "SKILL.md",
      targetPath: ".claude/skills/uifino-design/SKILL.md",
      lang: "markdown",
      descZh: "Claude Code 与 Codex CLI 通用常驻技能，写界面前自动读取规范与防丑禁令",
      descEn: "Portable Skill for Claude Code & Codex CLI enforcing DESIGN.md & contrast checks",
      content: `---
name: uifino-design-guardrails
description: Enforce high-craft UI engineering using UIFino DESIGN.md tokens, component specs, and anti-AI-slop rules before writing any frontend code.
---

# UIFino Frontend Design Guardrails

## 1. Mandatory Pre-Flight Order
1. Check project root for \`DESIGN.md\`. If missing, query UIFino MCP (\`search_catalog\` or \`match_ui_style\`) or run \`npx uifino@latest add style/hairline-grid\`.
2. Reuse existing semantic CSS variables (\`--bg-canvas\`, \`--bg-surface\`, \`--border-hairline\`, \`--accent-text\`). NEVER hardcode isolated hex colors inside components.

## 2. Anti-AI-Slop Prohibitions (Hard Bans)
- NEVER apply purple/cyan rainbow text gradients on headings.
- NEVER stack glowing neon outer shadows or inflated \`24px+\` rounded cards everywhere.
- NEVER dump fake placeholder metrics ("10,000+ happy users", "999 stars").
- NEVER ship \`<div>\`-only interactive controls; keep keyboard focus rings (\`:focus-visible\`) and ARIA roles.

## 3. Pre-Delivery Self-Checklist
- [ ] Text contrast >= 4.5:1 (AA) for body copy and buttons in both Dark and Light modes.
- [ ] Numeric metrics, prices, and timestamps use \`font-variant-numeric: tabular-nums\`.
- [ ] Every async view handles Empty State, Loading Skeleton, Error State, and long-text \`truncate\` / \`min-w-0\`.
- [ ] Reduced-motion safe: include \`motion-reduce:transition-none\` for custom animations.
`
    },
    {
      id: "cursor-mdc",
      label: "Cursor Rules (.mdc)",
      filename: "uifino-design.mdc",
      targetPath: ".cursor/rules/uifino-design.mdc",
      lang: "markdown",
      descZh: "Cursor 自动注入的前端编码规则，命中 tsx/css 文件时自动生效",
      descEn: "Always-on Cursor .mdc rule applied whenever editing UI components or styles",
      content: `---
description: UIFino design tokens, structural hairline discipline, and anti-slop guardrails
globs: ["src/**/*.tsx", "src/**/*.css", "app/**/*.tsx"]
alwaysApply: true
---

# UIFino UI Engineering Rule

- **Read Spec First**: Before generating any page or component, read \`./DESIGN.md\` or call the \`uifino\` MCP server (\`search_catalog\`, \`match_ui_style\`, \`get_component_code\`).
- **90% Neutral Discipline**: Keep >= 90% of canvas in neutral canvas/surface tokens; reserve accent color strictly for primary actions and active indicators.
- **No Isolated Colors**: Bind Tailwind classes or CSS to theme tokens (\`var(--ui-canvas)\`, \`var(--ui-surface)\`, \`var(--ui-border)\`).
- **Tabular Metrics**: Add \`tabular-nums\` to prices, KPIs, latency numbers, and table counters.
- **Edge States Required**: Always implement empty, loading, error, and narrow-screen responsive stacking.
`
    },
    {
      id: "agents-md",
      label: "AGENTS.md Snippet",
      filename: "AGENTS.md",
      targetPath: "AGENTS.md",
      lang: "markdown",
      descZh: "贴入仓库根目录 AGENTS.md 或 CLAUDE.md，让全团队所有 AI 工具共享统一规范",
      descEn: "Drop-in section for AGENTS.md / CLAUDE.md shared across the repository",
      content: `## UI & Design System Rules (UIFino)

- **Source of Truth**: Always read \`DESIGN.md\` at repo root before creating new UI routes or components.
- **Registry & MCP**: Use \`npx shadcn@latest add <site>/r/<item>.json\` or UIFino MCP tools instead of writing generic boilerplate from scratch.
- **Typography & Contrast**: Enforce >= 4.5:1 contrast for body copy, negative tracking on large headings, and \`tabular-nums\` on numbers.
- **Forbidden Patterns**: No rainbow headline gradients, no decorative neon box-shadows, no unstyled overflow on narrow screens.
`
    },
    {
      id: "design-md",
      label: "Starter DESIGN.md",
      filename: "DESIGN.md",
      targetPath: "DESIGN.md",
      lang: "markdown",
      descZh: "项目根目录即用型 DESIGN.md 模板（基于 Linear 克制细线架构）",
      descEn: "Starter root DESIGN.md protocol ready for immediate AI consumption",
      content: compileBrandDesignMd(findCatalogBrandById("linear") ?? CATALOG_ITEMS[0]!)
    }
  ];
}

export interface ShadcnRegistryIndexItem {
  readonly name: string;
  readonly type: "registry:style" | "registry:block" | "registry:component";
  readonly title: string;
  readonly description: string;
  readonly registryDependencies?: readonly string[];
  readonly files: readonly {
    readonly path: string;
    readonly type: string;
  }[];
}

export function buildShadcnRegistryIndex() {
  const styles: ShadcnRegistryIndexItem[] = STYLE_ITEMS.map((s) => ({
    name: `style-${s.slug}`,
    type: "registry:style",
    title: `${s.name} (${s.nameZh})`,
    description: s.summaryEn,
    files: [
      { path: `styles/${s.slug}.css`, type: "registry:file" },
      { path: `DESIGN.md`, type: "registry:file" }
    ]
  }));

  const components: ShadcnRegistryIndexItem[] = getAllComponentsFlat().map((c) => ({
    name: c.id,
    type: c.assetType === "section" ? "registry:block" : "registry:component",
    title: c.name,
    description: c.descEn,
    files: getComponentVirtualFiles(c)
      .filter((fname) => fname !== "tokens.css" && fname !== "DESIGN.md")
      .map((fname) => ({
        path: `components/uifino/${fname}`,
        type: "registry:component"
      }))
  }));

  const templates: ShadcnRegistryIndexItem[] = TEMPLATE_ITEMS.map((t) => ({
    name: `tpl-${t.id}`,
    type: "registry:block",
    title: t.name,
    description: t.descEn,
    files: [
      { path: `styles/${t.id}-tokens.css`, type: "registry:file" },
      { path: `DESIGN.md`, type: "registry:file" }
    ]
  }));

  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "uifino",
    homepage: "https://uifino.dev",
    items: [...styles, ...components, ...templates]
  };
}

export function buildShadcnRegistryItem(name: string) {
  const clean = name.replace(/\.json$/i, "").trim();

  // 1. Style item: style-<slug> or direct <slug>
  const styleSlug = clean.startsWith("style-") ? clean.slice(6) : clean;
  const matchedStyle = findUiStyleBySlug(styleSlug);
  if (matchedStyle) {
    return {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: `style-${matchedStyle.slug}`,
      type: "registry:style",
      title: matchedStyle.name,
      description: matchedStyle.summaryEn,
      cssVars: {
        light: {
          background: matchedStyle.light.canvas,
          foreground: matchedStyle.light.ink,
          card: matchedStyle.light.surface,
          border: matchedStyle.light.border,
          primary: matchedStyle.light.accent,
          "primary-foreground": matchedStyle.light.accentFg
        },
        dark: {
          background: matchedStyle.dark.canvas,
          foreground: matchedStyle.dark.ink,
          card: matchedStyle.dark.surface,
          border: matchedStyle.dark.border,
          primary: matchedStyle.dark.accent,
          "primary-foreground": matchedStyle.dark.accentFg
        }
      },
      files: [
        {
          path: `styles/${matchedStyle.slug}.css`,
          type: "registry:file",
          target: `src/styles/${matchedStyle.slug}.css`,
          content: compileStyleCssVariables(matchedStyle)
        },
        {
          path: "DESIGN.md",
          type: "registry:file",
          target: "DESIGN.md",
          content: compileStyleDesignMd(matchedStyle)
        }
      ]
    };
  }

  // 2. Brand catalog item: design-<id>
  const brandId = clean.startsWith("design-") ? clean.slice(7) : clean;
  const matchedBrand = findCatalogBrandById(brandId);
  if (matchedBrand) {
    return {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: `design-${matchedBrand.id}`,
      type: "registry:style",
      title: `${matchedBrand.name} DESIGN.md`,
      description: matchedBrand.summaryEn,
      files: [
        {
          path: "DESIGN.md",
          type: "registry:file",
          target: "DESIGN.md",
          content: compileBrandDesignMd(matchedBrand)
        },
        {
          path: `styles/${matchedBrand.id}-tokens.css`,
          type: "registry:file",
          target: `src/styles/${matchedBrand.id}-tokens.css`,
          content: compileBrandTokensCss(matchedBrand)
        }
      ]
    };
  }

  // 3. Component item
  const compFlat = getAllComponentsFlat().find((c) => c.id === clean);
  if (compFlat) {
    const cat = COMPONENT_CATEGORIES.find((c) => c.id === compFlat.categoryId)!;
    const tokens = resolveWorkbenchTokens({ radius: 8, density: "default", mode: "dark" });
    const vFiles = getComponentVirtualFiles(compFlat);

    return {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: compFlat.id,
      type: compFlat.assetType === "section" ? "registry:block" : "registry:component",
      title: compFlat.name,
      description: compFlat.descEn,
      dependencies: [...getComponentDependencies(compFlat)],
      files: vFiles
        .filter((fname) => fname !== "DESIGN.md")
        .map((fname) => {
          const content = generateComponentSource(compFlat, cat, tokens, fname);
          if (fname === "tokens.css") {
            return {
              path: "styles/uifino-tokens.css",
              type: "registry:file",
              target: "src/styles/uifino-tokens.css",
              content
            };
          }
          return {
            path: `components/uifino/${fname}`,
            type: "registry:component",
            content
          };
        })
    };
  }

  // 4. Template item: tpl-<id> or <id>
  const tplId = clean.startsWith("tpl-") ? clean.slice(4) : clean;
  const matchedTpl = findTemplateById(tplId);
  if (matchedTpl) {
    const bundle = getTemplateDetailBundle(matchedTpl);
    return {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: `tpl-${matchedTpl.id}`,
      type: "registry:block",
      title: matchedTpl.name,
      description: matchedTpl.descEn,
      files: [
        {
          path: `styles/${matchedTpl.id}-tokens.css`,
          type: "registry:file",
          target: `src/styles/${matchedTpl.id}-tokens.css`,
          content: bundle.cssVariables
        },
        {
          path: "DESIGN.md",
          type: "registry:file",
          target: "DESIGN.md",
          content: bundle.aiPrompt
        }
      ]
    };
  }

  return null;
}

export function compileOneShotAiRecipe(params: {
  readonly prompt: string;
  readonly brandId: string;
  readonly styleSlug: string;
  readonly componentIds: readonly string[];
}): string {
  const brand = findCatalogBrandById(params.brandId) ?? CATALOG_ITEMS[0]!;
  const style = findUiStyleBySlug(params.styleSlug) ?? STYLE_ITEMS[0]!;
  const cssVars = compileStyleCssVariables(style);
  const dos = style.dosEn.map((r) => `- DO: ${r}`).join("\n");
  const donts = style.dontsEn.map((r) => `- DON'T: ${r}`).join("\n");

  return `# UIFino One-Shot Build Prompt

## Goal
${params.prompt.trim() || "Build a crisp, production-grade web interface following the spec below."}

## Visual Reference & Style Contract
- **Benchmark Product**: ${brand.name} (${brand.siteUrl ?? brand.slug})
- **UI Style Genre**: ${style.name} (${style.nameZh}) — radius \`${style.defaultRadius}px\`, border \`${style.borderSpec}\`
- **Recommended Blocks**: ${params.componentIds.join(", ") || "hero-telemetry-counter, bento-protocol-grid"}

## Mandatory CSS Tokens (Paste into globals.css)
\`\`\`css
${cssVars.trim()}
\`\`\`

## Design Guardrails (Must Follow)
${dos}
${donts}
- Enforce >= 4.5:1 AA contrast for body copy and \`tabular-nums\` on numbers.
- Handle Empty State, Loading Skeleton, Error State, and narrow mobile stacking without horizontal overflow.
`;
}
