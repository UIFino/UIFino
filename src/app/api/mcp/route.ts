import { NextResponse } from "next/server";
import {
  compileComponentAiPrompt,
  generateComponentSource,
  getComponentDependencies,
  getComponentPropsSpec,
  toPascalCase
} from "@/core/codegen";
import { compileBrandDesignMd, compileBrandTokensCss } from "@/core/design-md";
import { computeBackgroundStudio } from "@/core/studios/background";
import {
  computeWcagContrast,
  generateColorShadeScale,
  serializeColorScaleCode
} from "@/core/studios/colors";
import { MOTION_STUDIO_PRESETS, serializeMotionCode } from "@/core/studios/motion";
import { computeShadowStudio } from "@/core/studios/shadow";
import {
  computeTypeScale,
  EASING_PRESETS,
  serializeTypographyCode
} from "@/core/studios/typography";
import { compileStyleCssVariables, compileStyleDesignMd } from "@/core/styles";
import { type RadiusStop, resolveWorkbenchTokens } from "@/core/tokens";
import { CATALOG_ITEMS, findCatalogBrandById } from "@/registry/catalog";
import {
  COMPONENT_CATEGORIES,
  findComponentAsset,
  getAllComponentsFlat
} from "@/registry/components";
import { ALL_WORKBENCH_SKINS } from "@/registry/skins";
import { findUiStyleBySlug, STYLE_ITEMS } from "@/registry/styles";
import { findTemplateById, getTemplateDetailBundle, TEMPLATE_ITEMS } from "@/registry/templates";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id"
} as const;

const MCP_TOOLS = [
  {
    name: "search_catalog",
    description:
      "Search Website & Mobile App DESIGN.md specs across 6 industry domains, or fetch a specific brand DESIGN.md and CSS variables.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Optional exact brand id (e.g. linear, vercel, stripe)"
        },
        kind: { type: "string", enum: ["all", "website", "app"], default: "all" },
        category: { type: "string", description: "Industry domain filter" },
        query: { type: "string", description: "Keyword search across tags and summary" },
        includeSpec: { type: "boolean", default: false }
      }
    }
  },
  {
    name: "match_ui_style",
    description:
      "Match one of 10 UI style genres by tone, scenario, or slug and compile its DESIGN.md protocol and CSS variables.",
    inputSchema: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          description: "Optional exact style slug (e.g. hairline-grid, neo-brutalism)"
        },
        tone: { type: "string", enum: ["all", "dark", "light"], default: "all" },
        scenario: {
          type: "string",
          enum: ["all", "landing", "dashboard", "ai-workspace", "docs"],
          default: "all"
        },
        radius: { type: "number", enum: [0, 4, 8, 12, 16] }
      }
    }
  },
  {
    name: "get_component_code",
    description:
      "Generate React + Tailwind component source, Demo.tsx, tokens.css, dependencies, and 6-in-1 AI build prompt tuned to active skin and radius.",
    inputSchema: {
      type: "object",
      properties: {
        category: { type: "string", default: "hero" },
        id: { type: "string", default: "hero-telemetry-counter" },
        skin: { type: "string", default: "linear" },
        radius: { type: "number", enum: [0, 4, 8, 12, 16], default: 8 },
        density: { type: "string", enum: ["compact", "default", "spacious"], default: "default" },
        mode: { type: "string", enum: ["dark", "light"], default: "dark" }
      }
    }
  },
  {
    name: "scaffold_template",
    description:
      "Retrieve multi-page Next.js starter kits or single-page templates with routes, included component blocks, directory tree, and CSS tokens.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Optional template id (e.g. obsidian-saas-kit)" },
        kind: { type: "string", enum: ["all", "starter", "page"], default: "all" },
        scene: {
          type: "string",
          description: "Scene filter (saas, ai-studio, admin, docs, landing, pricing, auth)"
        }
      }
    }
  },
  {
    name: "compute_surface_tokens",
    description:
      "Compute CSS variables or Tailwind snippets for background patterns, elevation shadows, 11-stop color scales with WCAG contrast, or modular type scales.",
    inputSchema: {
      type: "object",
      properties: {
        studio: {
          type: "string",
          enum: ["colors", "typography", "background", "shadow", "motion"],
          default: "colors"
        },
        seedHex: { type: "string", default: "#5E6AD2" },
        fgHex: { type: "string", default: "#F3F5F8" },
        bgHex: { type: "string", default: "#0A0B0E" },
        basePx: { type: "number", default: 16 },
        ratio: { type: "number", default: 1.2 },
        format: { type: "string", enum: ["css", "tailwind"], default: "css" }
      }
    }
  }
] as const;

type ToolArgs = Record<string, unknown>;

function asString(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function asNumber(v: unknown, fallback: number): number {
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}

function clampRadius(v: unknown): RadiusStop | undefined {
  const n = asNumber(v, -1);
  if (n === 0 || n === 4 || n === 8 || n === 12 || n === 16) return n;
  return undefined;
}

function executeTool(name: string, args: ToolArgs): unknown {
  switch (name) {
    case "search_catalog": {
      const id = asString(args.id).trim();
      if (id) {
        const brand = findCatalogBrandById(id);
        if (!brand) {
          return {
            error: `Unknown catalog id "${id}". Available: ${CATALOG_ITEMS.map((b) => b.id).join(", ")}`
          };
        }
        return {
          brand: {
            id: brand.id,
            name: brand.name,
            kind: brand.kind,
            category: brand.category,
            siteUrl: brand.siteUrl ?? `https://${brand.slug}`,
            defaultRadius: brand.defaultRadius,
            fonts: brand.fonts,
            openFontAlt: brand.openFontAlt
          },
          tokensCss: compileBrandTokensCss(brand),
          designMd: compileBrandDesignMd(brand)
        };
      }

      const kind = asString(args.kind, "all");
      const category = asString(args.category, "all").toLowerCase();
      const q = asString(args.query).trim().toLowerCase();
      const includeSpec = args.includeSpec === true;

      const matched = CATALOG_ITEMS.filter((b) => {
        const kindOk = kind === "all" || b.kind === kind;
        const catOk =
          category === "all" || !category || b.category.toLowerCase().includes(category);
        const qOk =
          !q ||
          [b.id, b.name, b.category, ...b.tags, b.summaryEn, b.summaryZh]
            .join(" ")
            .toLowerCase()
            .includes(q);
        return kindOk && catOk && qOk;
      });

      return {
        total: matched.length,
        items: matched.map((b) => ({
          id: b.id,
          name: b.name,
          kind: b.kind,
          category: b.category,
          defaultRadius: b.defaultRadius,
          accent: b.dark.accent,
          cli: `npx uifino@latest add design/${b.id}`,
          summary: b.summaryEn,
          ...(includeSpec ? { designMd: compileBrandDesignMd(b) } : {})
        }))
      };
    }

    case "match_ui_style": {
      const slug = asString(args.slug).trim();
      const radiusOverride = clampRadius(args.radius);
      if (slug) {
        const style = findUiStyleBySlug(slug);
        if (!style) {
          return {
            error: `Unknown style slug "${slug}". Available: ${STYLE_ITEMS.map((s) => s.slug).join(", ")}`
          };
        }
        return {
          style: {
            slug: style.slug,
            name: style.name,
            nameZh: style.nameZh,
            group: style.group,
            primaryTone: style.primaryTone,
            defaultRadius: radiusOverride ?? style.defaultRadius,
            scenarios: style.scenarios,
            dosEn: style.dosEn,
            dontsEn: style.dontsEn
          },
          cssVariables: compileStyleCssVariables(style, radiusOverride),
          designMd: compileStyleDesignMd(style)
        };
      }

      const tone = asString(args.tone, "all");
      const scenario = asString(args.scenario, "all");
      const matched = STYLE_ITEMS.filter((s) => {
        const toneOk = tone === "all" || s.primaryTone === tone;
        const scenOk =
          scenario === "all" || s.scenarios.includes(scenario as (typeof s.scenarios)[number]);
        return toneOk && scenOk;
      });

      const primary = matched[0] ?? STYLE_ITEMS[0]!;
      return {
        total: matched.length,
        items: matched.map((s) => ({
          slug: s.slug,
          name: s.name,
          nameZh: s.nameZh,
          primaryTone: s.primaryTone,
          defaultRadius: s.defaultRadius,
          scenarios: s.scenarios,
          cli: `npx uifino@latest add style/${s.slug}`
        })),
        primaryCssVariables: compileStyleCssVariables(primary, radiusOverride)
      };
    }

    case "get_component_code": {
      const allFlat = getAllComponentsFlat();
      const requestedId = asString(args.id, "hero-telemetry-counter");
      const requestedCat = asString(args.category);

      let resolved = requestedCat ? findComponentAsset(requestedCat, requestedId) : undefined;
      if (!resolved) {
        const byId = allFlat.find((a) => a.id === requestedId) ?? allFlat[0];
        if (byId) {
          resolved = findComponentAsset(byId.categoryId, byId.id);
        }
      }
      if (!resolved) {
        return {
          error: "Component not found",
          availableCategories: COMPONENT_CATEGORIES.map((c) => c.id)
        };
      }

      const radius = clampRadius(args.radius) ?? 8;
      const densityRaw = asString(args.density, "default");
      const density =
        densityRaw === "compact" || densityRaw === "spacious" ? densityRaw : "default";
      const mode = asString(args.mode, "dark") === "light" ? "light" : "dark";
      const skinId = asString(args.skin, "linear");
      const tokens = resolveWorkbenchTokens({
        radius,
        density,
        mode,
        skinId,
        brands: ALL_WORKBENCH_SKINS
      });
      const pascalName = toPascalCase(resolved.item.id);
      const componentCode = generateComponentSource(resolved.item, resolved.category, tokens);
      const demoCode = generateComponentSource(
        resolved.item,
        resolved.category,
        tokens,
        `${pascalName}Demo.tsx`
      );
      const cssTokens = generateComponentSource(
        resolved.item,
        resolved.category,
        tokens,
        "tokens.css"
      );
      const dependencies = getComponentDependencies(resolved.item);
      const aiPrompt = compileComponentAiPrompt({
        item: resolved.item,
        category: resolved.category,
        tokens,
        pascalName,
        componentCode,
        demoCode,
        cssTokens,
        dependencies
      });

      return {
        component: {
          id: resolved.item.id,
          name: resolved.item.name,
          category: resolved.category.id,
          assetType: resolved.category.assetType,
          dependencies,
          props: getComponentPropsSpec(resolved.item)
        },
        skin: tokens.skinName,
        radius: tokens.radius,
        componentCode,
        demoCode,
        tokensCss: cssTokens,
        aiPrompt
      };
    }

    case "scaffold_template": {
      const id = asString(args.id).trim();
      if (id) {
        const tpl = findTemplateById(id);
        if (!tpl) {
          return {
            error: `Unknown template "${id}". Available: ${TEMPLATE_ITEMS.map((t) => t.id).join(", ")}`
          };
        }
        const detail = getTemplateDetailBundle(tpl);
        return {
          template: tpl,
          routePages: detail.routePages,
          includedBlocks: detail.includedBlocks,
          directoryTree: detail.directoryTree,
          cssVariables: detail.cssVariables,
          aiPrompt: detail.aiPrompt
        };
      }

      const kind = asString(args.kind, "all");
      const scene = asString(args.scene, "all");
      const matched = TEMPLATE_ITEMS.filter((t) => {
        const kindOk = kind === "all" || t.kind === kind;
        const sceneOk = scene === "all" || !scene || t.scene === scene;
        return kindOk && sceneOk;
      });

      return {
        total: matched.length,
        items: matched.map((t) => ({
          id: t.id,
          name: t.name,
          nameZh: t.nameZh,
          kind: t.kind,
          scene: t.scene,
          routes: t.routes,
          skinId: t.skinId,
          cli: `npx uifino@latest create ${t.id}`
        }))
      };
    }

    case "compute_surface_tokens": {
      const studio = asString(args.studio, "colors");
      const format = asString(args.format, "css") === "tailwind" ? "tailwind" : "css";

      if (studio === "typography") {
        const basePx = asNumber(args.basePx, 16);
        const ratio = asNumber(args.ratio, 1.2);
        const steps = computeTypeScale(basePx, ratio);
        const easing = EASING_PRESETS[0]!;
        return {
          studio: "typography",
          steps,
          easing,
          code: serializeTypographyCode(steps, easing, format)
        };
      }

      if (studio === "background") {
        const output = computeBackgroundStudio(
          {
            engine: "grid",
            canvas: asString(args.bgHex, "#161618"),
            accent: asString(args.seedHex, "#CEFF00")
          },
          format
        );
        return { studio: "background", ...output };
      }

      if (studio === "shadow") {
        const output = computeShadowStudio({ mode: "dark" }, format);
        return { studio: "shadow", ...output };
      }

      if (studio === "motion") {
        const preset = MOTION_STUDIO_PRESETS[0]!;
        return {
          studio: "motion",
          preset,
          code: serializeMotionCode(preset, "spring", format)
        };
      }

      const seedHex = asString(args.seedHex, "#5E6AD2");
      const fgHex = asString(args.fgHex, "#F3F5F8");
      const bgHex = asString(args.bgHex, "#0A0B0E");
      const shades = generateColorShadeScale(seedHex);
      const contrast = computeWcagContrast(fgHex, bgHex);
      return {
        studio: "colors",
        seedHex,
        shades,
        contrast,
        code: serializeColorScaleCode("brand", shades, format)
      };
    }

    default:
      return null;
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
  return NextResponse.json(
    {
      name: "uifino-mcp",
      version: "1.0.0",
      protocolVersion: "2025-03-26",
      transport: "streamable-http",
      endpoint: "/api/mcp",
      counts: {
        catalog: CATALOG_ITEMS.length,
        styles: STYLE_ITEMS.length,
        componentCategories: COMPONENT_CATEGORIES.length,
        templates: TEMPLATE_ITEMS.length
      },
      tools: MCP_TOOLS
    },
    { headers: CORS_HEADERS }
  );
}

interface JsonRpcRequest {
  readonly jsonrpc?: string;
  readonly id?: string | number | null;
  readonly method?: string;
  readonly params?: Record<string, unknown>;
}

export async function POST(request: Request) {
  let body: JsonRpcRequest;
  try {
    body = (await request.json()) as JsonRpcRequest;
  } catch {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id: null,
        error: { code: -32700, message: "Parse error: invalid JSON body" }
      },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const id = body.id ?? null;
  const method = body.method ?? "";
  const params = body.params ?? {};

  if (method === "notifications/initialized") {
    return new NextResponse(null, { status: 202, headers: CORS_HEADERS });
  }

  if (method === "ping") {
    return NextResponse.json({ jsonrpc: "2.0", id, result: {} }, { headers: CORS_HEADERS });
  }

  if (method === "initialize") {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2025-03-26",
          capabilities: {
            tools: { listChanged: false }
          },
          serverInfo: {
            name: "uifino-mcp",
            version: "1.0.0"
          }
        }
      },
      { headers: CORS_HEADERS }
    );
  }

  if (method === "tools/list") {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id,
        result: { tools: MCP_TOOLS }
      },
      { headers: CORS_HEADERS }
    );
  }

  if (method === "tools/call") {
    const toolName = asString(params.name);
    const toolArgs =
      typeof params.arguments === "object" && params.arguments !== null
        ? (params.arguments as ToolArgs)
        : {};
    const payload = executeTool(toolName, toolArgs);

    if (payload === null) {
      return NextResponse.json(
        {
          jsonrpc: "2.0",
          id,
          error: { code: -32602, message: `Unknown MCP tool: "${toolName}"` }
        },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id,
        result: {
          content: [
            {
              type: "text",
              text: JSON.stringify(payload, null, 2)
            }
          ],
          structuredContent: payload
        }
      },
      { headers: CORS_HEADERS }
    );
  }

  return NextResponse.json(
    {
      jsonrpc: "2.0",
      id,
      error: { code: -32601, message: `Method not found: "${method}"` }
    },
    { status: 400, headers: CORS_HEADERS }
  );
}
