import type { McpQueryFilter, McpQueryResult, McpRegistrySnapshot } from "./types";

const STYLE_TAG_MAP: Record<string, readonly string[]> = {
  "dark-minimal": ["dark", "minimal", "hairline", "saas"],
  "warm-editorial": ["warm", "editorial", "serif", "ai"],
  "monochrome-devtools": ["devtools", "monochrome", "cli", "code", "sharp"],
  "fintech-clean": ["fintech", "clean", "pricing", "light"]
};

export function queryMcpSandbox(
  snapshot: McpRegistrySnapshot,
  filter: McpQueryFilter = {}
): McpQueryResult {
  const query = filter.query ?? "";
  const style = filter.style ?? "all";
  const layout = filter.layout ?? "all";
  const assetType = filter.assetType ?? "all";

  const terms = query
    .toLowerCase()
    .split(/[\s,;/]+/)
    .filter(Boolean);
  const styleTokens = STYLE_TAG_MAP[style] ?? [];

  const matchedBrands = snapshot.brands.filter((b) => {
    const hay = [b.name, b.category, b.kind, ...b.tags, b.summaryEn, b.summaryZh]
      .join(" ")
      .toLowerCase();
    const styleOk =
      !styleTokens.length || styleTokens.some((st) => b.tags.includes(st) || hay.includes(st));
    const queryOk = !terms.length || terms.every((t) => hay.includes(t));
    return styleOk && queryOk;
  });

  const matchedAssets = snapshot.assets.filter((a) => {
    const typeOk = assetType === "all" || a.assetType === assetType;
    const layoutOk = layout === "all" || a.layout === layout;
    const hay = [a.name, a.subcat, a.assetType, a.layout, ...a.tags, a.descEn, a.descZh]
      .join(" ")
      .toLowerCase();
    const styleOk =
      !styleTokens.length || styleTokens.some((st) => a.tags.includes(st) || hay.includes(st));
    const queryOk = !terms.length || terms.some((t) => hay.includes(t));
    return typeOk && layoutOk && (styleOk || queryOk) && (!terms.length || queryOk);
  });

  const brandsFinal = matchedBrands.length ? matchedBrands.slice(0, 4) : snapshot.brands.slice(0, 2);
  const assetsFinal = matchedAssets.length ? matchedAssets.slice(0, 6) : snapshot.assets.slice(0, 4);

  const recommendedTool =
    style === "warm-editorial"
      ? (snapshot.bgPresets[4] ?? snapshot.bgPresets[0])
      : style === "fintech-clean"
        ? (snapshot.bgPresets[3] ?? snapshot.bgPresets[0])
        : snapshot.bgPresets[0];
  const recommendedShadow = snapshot.shadowPresets[1] ?? snapshot.shadowPresets[0];

  const payload = {
    protocol: "uifino-mcp/1.0",
    scope: ["catalog", "sections", "blocks", "pages", "motion", "tools"],
    matched_design_md: brandsFinal.map((b) => ({
      slug: b.slug,
      platform: b.kind,
      cli: `npx uifino@latest add design/${b.id}`,
      accent: b.dark.accent,
      defaultRadius: b.defaultRadius
    })),
    matched_components: assetsFinal.map((a) => ({
      id: `${a.categoryId}/${a.id}`,
      type: a.assetType,
      layout: a.layout,
      cli: `npx uifino@latest add ${a.assetType}/${a.id}`
    })),
    surface_preset: {
      background: recommendedTool?.id ?? "linear-grid",
      elevation: recommendedShadow?.id ?? "linear-panel"
    }
  };

  return {
    brands: brandsFinal,
    assets: assetsFinal,
    toolPreset: recommendedTool,
    shadowPreset: recommendedShadow,
    jsonPayload: JSON.stringify(payload, null, 2)
  };
}
