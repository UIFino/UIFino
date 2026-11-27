import type { CatalogBrandSpec } from "@/core/design-md";
import type {
  CmdkFilterGroup,
  FlattenedComponentEntry,
  SearchableItem,
  TemplateSummaryEntry
} from "./types";

export function buildGlobalSearchItems(
  brands: readonly CatalogBrandSpec[],
  assets: readonly FlattenedComponentEntry[],
  templates: readonly TemplateSummaryEntry[]
): readonly SearchableItem[] {
  const entries: SearchableItem[] = [];

  for (const b of brands) {
    entries.push({
      id: `catalog-${b.id}`,
      group: "catalog",
      badge: b.kind === "app" ? "APP" : "WEB",
      label: `${b.name} DESIGN.md`,
      meta: b.category,
      href: `/catalog/${b.id}`
    });
  }

  for (const a of assets) {
    entries.push({
      id: `asset-${a.categoryId}-${a.id}`,
      group: a.assetType,
      badge: a.assetType.toUpperCase(),
      label: a.name,
      meta: a.categoryName,
      href: `/components/${a.categoryId}/${a.id}`
    });
  }

  for (const tpl of templates) {
    entries.push({
      id: `tpl-${tpl.id}`,
      group: "templates",
      badge: "TEMPLATE",
      label: tpl.name,
      meta: tpl.stack,
      href: `/templates/${tpl.id}`
    });
  }

  entries.push(
    {
      id: "tool-bg",
      group: "tools",
      badge: "TOOL",
      label: "Parameterized Background Studio",
      meta: "Grid · Aurora · Grain",
      href: "/tools/background"
    },
    {
      id: "tool-shadow",
      group: "tools",
      badge: "TOOL",
      label: "Shadow & Surface Token Lab",
      meta: "Elevation & Rim Light",
      href: "/tools/shadow"
    },
    {
      id: "tool-mcp",
      group: "tools",
      badge: "MCP",
      label: "MCP Agent Integration Sandbox",
      meta: "Claude Code & Cursor",
      href: "/mcp"
    }
  );

  return entries;
}

export function filterGlobalSearchItems(
  items: readonly SearchableItem[],
  filter: CmdkFilterGroup = "all",
  query = "",
  limit = 18
): readonly SearchableItem[] {
  const q = query.trim().toLowerCase();
  return items
    .filter((item) => {
      const groupMatch = filter === "all" || item.group === filter;
      const textMatch =
        !q || `${item.label} ${item.meta} ${item.badge}`.toLowerCase().includes(q);
      return groupMatch && textMatch;
    })
    .slice(0, limit);
}
