import { describe, expect, it } from "vitest";
import {
  buildGlobalSearchItems,
  filterGlobalSearchItems,
  type McpRegistrySnapshot,
  queryMcpSandbox
} from "@/core/search";

const MOCK_SNAPSHOT: McpRegistrySnapshot = {
  brands: [
    {
      id: "linear",
      slug: "linear.app",
      name: "Linear",
      kind: "website",
      platformLabel: "Web · SaaS",
      category: "Productivity",
      tags: ["dark", "minimal", "hairline", "saas"],
      summaryZh: "深色极简",
      summaryEn: "Dark minimal hairline SaaS",
      fonts: { display: "Geist", body: "Geist", mono: "Geist Mono", tracking: "-0.03em", serif: false },
      radiusScale: ["0px", "6px"],
      defaultRadius: "6px",
      spacingScale: [4, 8, 16],
      archetype: "kanban-saas",
      ctaLabel: "Start",
      light: {
        canvas: "#fff",
        surface: "#f6f7f9",
        elevated: "#eee",
        border: "#ddd",
        ink: "#000",
        muted: "#666",
        accent: "#5E6AD2",
        accentFg: "#fff"
      },
      dark: {
        canvas: "#08090A",
        surface: "#121316",
        elevated: "#1A1C20",
        border: "#23252A",
        ink: "#F7F8F8",
        muted: "#8A8F98",
        accent: "#5E6AD2",
        accentFg: "#fff"
      },
      rules: ["1px borders"]
    }
  ],
  assets: [
    {
      id: "hero-telemetry-counter",
      name: "Telemetry Counter Hero",
      subcat: "Stats",
      layout: "split-hero",
      archetype: "telemetry-hero",
      tags: ["hero", "dark", "counter"],
      descEn: "Telemetry counter hero",
      descZh: "遥测计数器首屏",
      contract: ["tabular-nums"],
      categoryId: "hero",
      categoryName: "Hero Sections",
      categoryNameZh: "首屏区块",
      assetType: "section"
    }
  ],
  bgPresets: [
    {
      id: "linear-grid",
      name: "Obsidian Grid",
      engine: "grid",
      canvas: "#101114",
      accent: "#5e6ad2",
      secondary: "#23252a",
      cellSize: 32,
      opacity: 34,
      spread: 68,
      noise: 0
    }
  ],
  shadowPresets: [
    {
      id: "linear-panel",
      name: "Subtle Panel",
      mode: "dark",
      yOffset: 6,
      blur: 18,
      spread: -2,
      opacity: 38,
      rimLight: 10,
      borderAlpha: 14,
      radius: 6,
      density: "compact"
    }
  ]
};

describe("core/search", () => {
  it("builds and filters global cmdk search items including styles", () => {
    const items = buildGlobalSearchItems(
      MOCK_SNAPSHOT.brands,
      MOCK_SNAPSHOT.assets,
      [{ id: "obsidian-saas", name: "Obsidian SaaS", nameZh: "黑曜石官网", stack: "Next.js 15" }],
      [{ slug: "frosted-glass", name: "Glass", nameZh: "毛玻璃", defaultRadius: 16 }]
    );
    const filtered = filterGlobalSearchItems(items, "catalog", "linear");
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.href).toBe("/catalog/linear");

    const styleFiltered = filterGlobalSearchItems(items, "styles", "毛玻璃");
    expect(styleFiltered).toHaveLength(1);
    expect(styleFiltered[0]?.href).toBe("/styles/frosted-glass");
  });

  it("queries MCP sandbox and emits structured protocol JSON", () => {
    const res = queryMcpSandbox(MOCK_SNAPSHOT, { style: "dark-minimal", query: "counter" });
    expect(res.brands[0]?.id).toBe("linear");
    expect(res.assets[0]?.id).toBe("hero-telemetry-counter");
    expect(JSON.parse(res.jsonPayload).protocol).toBe("uifino-mcp/1.0");
  });
});
