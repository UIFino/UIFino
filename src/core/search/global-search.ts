import type { CatalogBrandSpec } from "@/core/design-md";
import type {
  CmdkFilterGroup,
  FlattenedComponentEntry,
  SearchableItem,
  StyleSummaryEntry,
  TemplateSummaryEntry
} from "./types";

export function buildGlobalSearchItems(
  brands: readonly CatalogBrandSpec[],
  assets: readonly FlattenedComponentEntry[],
  templates: readonly TemplateSummaryEntry[],
  styles: readonly StyleSummaryEntry[] = []
): readonly SearchableItem[] {
  const entries: SearchableItem[] = [];

  for (const b of brands) {
    entries.push({
      id: `catalog-${b.id}`,
      group: "catalog",
      badge: b.kind === "app" ? "APP" : "WEB",
      label: `${b.name} DESIGN.md`,
      keywords: `${b.summaryZh} ${b.tags.join(" ")}`,
      meta: b.category,
      href: `/catalog/${b.id}`
    });
  }

  for (const s of styles) {
    entries.push({
      id: `style-${s.slug}`,
      group: "styles",
      badge: "STYLE",
      label: `${s.nameZh} · ${s.name}`,
      keywords: `${s.slug} ${s.defaultRadius}px`,
      meta: `${s.defaultRadius}px`,
      href: `/styles/${s.slug}`
    });
  }

  for (const a of assets) {
    entries.push({
      id: `asset-${a.categoryId}-${a.id}`,
      group: a.assetType,
      badge: a.assetType.toUpperCase(),
      label: a.nameZh ? `${a.nameZh} · ${a.name}` : a.name,
      keywords: `${a.categoryNameZh} ${a.tags.join(" ")}`,
      meta: a.categoryName,
      href: `/components/${a.categoryId}/${a.id}`
    });
  }

  for (const tpl of templates) {
    entries.push({
      id: `tpl-${tpl.id}`,
      group: "templates",
      badge: "TEMPLATE",
      label: `${tpl.nameZh} · ${tpl.name}`,
      keywords: tpl.id,
      meta: tpl.stack,
      href: `/templates/${tpl.id}`
    });
  }

  entries.push(
    {
      id: "tool-bg",
      group: "tools",
      badge: "TOOL",
      label: "背景纹理 · Background Studio",
      keywords: "grid dots aurora grain frost",
      meta: "Grid · Aurora · Grain",
      href: "/tools/background"
    },
    {
      id: "tool-shadow",
      group: "tools",
      badge: "TOOL",
      label: "多层阴影 · Shadow Studio",
      keywords: "elevation rim offset radius",
      meta: "Elevation & Radius",
      href: "/tools/shadow"
    },
    {
      id: "tool-colors",
      group: "tools",
      badge: "TOOL",
      label: "配色对比 · Colors & Contrast",
      keywords: "shades wcag contrast palette",
      meta: "50–950 & WCAG",
      href: "/tools/colors"
    },
    {
      id: "tool-typography",
      group: "tools",
      badge: "TOOL",
      label: "字号排版 · Typography Studio",
      keywords: "font size modular scale fluid clamp pairing",
      meta: "Fluid Type & Pairings",
      href: "/tools/typography"
    },
    {
      id: "tool-motion",
      group: "tools",
      badge: "TOOL",
      label: "交互动效 · Motion Studio",
      keywords: "spring linear bezier easing drawer modal hover",
      meta: "Spring & Easing",
      href: "/tools/motion"
    },
    {
      id: "tool-mcp",
      group: "tools",
      badge: "AI",
      label: "接入到AI · MCP, Registry & Skill",
      keywords: "claude cursor windsurf codex cline shadcn skill prompts",
      meta: "MCP · /r · Skill · Sandbox",
      href: "/mcp"
    }
  );

  return entries;
}

export function filterGlobalSearchItems(
  items: readonly SearchableItem[],
  filter: CmdkFilterGroup = "all",
  query = "",
  limit = 20
): readonly SearchableItem[] {
  const q = query.trim().toLowerCase();
  return items
    .filter((item) => {
      const groupMatch = filter === "all" || item.group === filter;
      const textMatch =
        !q ||
        `${item.label} ${item.meta} ${item.badge} ${item.keywords ?? ""}`
          .toLowerCase()
          .includes(q);
      return groupMatch && textMatch;
    })
    .slice(0, limit);
}
