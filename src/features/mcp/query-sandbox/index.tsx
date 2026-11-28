"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CodeViewer } from "@/components/patterns/code-viewer";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { SearchInput } from "@/components/primitives/input";
import { SegmentedControl } from "@/components/primitives/segmented";
import { NativeSelect } from "@/components/primitives/select";
import { compileOneShotAiRecipe } from "@/core/ai-delivery";
import { queryMcpSandbox } from "@/core/search";
import { useClipboard } from "@/hooks/use-clipboard";
import { Link } from "@/i18n/navigation";
import { getMcpRegistrySnapshot } from "@/registry";
import { CATALOG_ITEMS } from "@/registry/catalog";
import { STYLE_ITEMS } from "@/registry/styles";
import { TEMPLATE_ITEMS } from "@/registry/templates";

type SandboxMode = "demand" | "rpc";
type McpToolName =
  | "search_catalog"
  | "match_ui_style"
  | "get_component_code"
  | "scaffold_template"
  | "compute_surface_tokens";

export function McpQuerySandbox() {
  const t = useTranslations("mcp");
  const locale = useLocale();
  const isZh = locale === "zh";
  const { copy } = useClipboard();

  const [mode, setMode] = useState<SandboxMode>("demand");

  // Ring 4: Natural language demand -> live /api/mcp + One-Shot prompt
  const [demandQuery, setDemandQuery] = useState(
    isZh
      ? "做一个深色开发者 SaaS 官网，含等宽数字首屏、三档定价表与 Passkey 登录"
      : "Build a dark developer SaaS landing page with telemetry hero, 3-tier pricing & passkey auth"
  );
  const [demandStyle, setDemandStyle] = useState("dark-minimal");
  const [demandLayout, setDemandLayout] = useState("all");

  // Direct Tool Runner
  const [toolName, setToolName] = useState<McpToolName>("search_catalog");
  const [catalogId, setCatalogId] = useState("linear");
  const [styleSlug, setStyleSlug] = useState("hairline-grid");
  const [componentId, setComponentId] = useState("hero-telemetry-counter");
  const [componentRadius, setComponentRadius] = useState("8");
  const [templateId, setTemplateId] = useState("obsidian-saas-kit");
  const [tokenStudio, setTokenStudio] = useState("colors");
  const [seedHex, setSeedHex] = useState("#5E6AD2");

  const [isCalling, setIsCalling] = useState(false);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [rpcOutput, setRpcOutput] = useState<string>("");

  const snapshot = useMemo(() => getMcpRegistrySnapshot(), []);
  const sim = useMemo(
    () =>
      queryMcpSandbox(snapshot, {
        query: demandQuery,
        style: demandStyle,
        layout: demandLayout,
        assetType: "all"
      }),
    [snapshot, demandQuery, demandStyle, demandLayout]
  );

  const matchedBrand = sim.brands[0] ?? CATALOG_ITEMS[0]!;
  const matchedStyleSlug =
    demandStyle === "warm-editorial"
      ? "editorial-serif"
      : demandStyle === "monochrome-devtools"
        ? "monochrome-minimal"
        : demandStyle === "fintech-clean"
          ? "clean-saas"
          : "hairline-grid";

  const oneShotPrompt = useMemo(
    () =>
      compileOneShotAiRecipe({
        prompt: demandQuery,
        brandId: matchedBrand.id,
        styleSlug: matchedStyleSlug,
        componentIds: sim.assets.map((a) => `${a.categoryId}/${a.id}`)
      }),
    [demandQuery, matchedBrand.id, matchedStyleSlug, sim.assets]
  );

  const rpcRequestBody = useMemo(() => {
    let args: Record<string, unknown> = {};
    if (mode === "demand") {
      args = { id: matchedBrand.id, includeSpec: true };
    } else if (toolName === "search_catalog") {
      args = { id: catalogId, includeSpec: true };
    } else if (toolName === "match_ui_style") {
      args = { slug: styleSlug, radius: Number(componentRadius) };
    } else if (toolName === "get_component_code") {
      args = { id: componentId, skin: catalogId, radius: Number(componentRadius), mode: "dark" };
    } else if (toolName === "scaffold_template") {
      args = { id: templateId };
    } else {
      args = { studio: tokenStudio, seedHex, format: "css" };
    }

    return {
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: {
        name: mode === "demand" ? "search_catalog" : toolName,
        arguments: args
      }
    };
  }, [
    mode,
    matchedBrand.id,
    toolName,
    catalogId,
    styleSlug,
    componentId,
    componentRadius,
    templateId,
    tokenStudio,
    seedHex
  ]);

  const handleRunRpc = async () => {
    setIsCalling(true);
    const t0 = performance.now();
    try {
      const res = await fetch("/api/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rpcRequestBody)
      });
      const json = (await res.json()) as unknown;
      setLatencyMs(Math.max(1, Math.round(performance.now() - t0)));
      setRpcOutput(JSON.stringify(json, null, 2));
    } catch (err) {
      setRpcOutput(
        JSON.stringify(
          { error: err instanceof Error ? err.message : "Failed to call /api/mcp" },
          null,
          2
        )
      );
    } finally {
      setIsCalling(false);
    }
  };

  const activeJsonCode = rpcOutput || sim.jsonPayload;

  return (
    <div id="sandbox" className="band-full">
      <section className="shell-wrap grid gap-[18px] px-7 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="eyebrow-mono text-accent-text">
              {isZh
                ? "第 4 环 · 真机透明检索沙盒与单次施工指令"
                : "RING 04 · LIVE TRANSPARENT SANDBOX & ONE-SHOT PROMPT"}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <h2 className="heading-section m-0">{t("sandboxTitle")}</h2>
              <SegmentedControl
                options={[
                  { value: "demand" as SandboxMode, label: isZh ? "需求直译与施工单" : "Demand → Prompt" },
                  { value: "rpc" as SandboxMode, label: isZh ? "单工具 RPC 调试" : "Tool RPC Runner" }
                ]}
                value={mode}
                onChange={(v) => {
                  setMode(v);
                  setRpcOutput("");
                }}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="lime" disabled={isCalling} onClick={() => void handleRunRpc()}>
              {isCalling
                ? isZh
                  ? "请求 /api/mcp 中..."
                  : "Calling /api/mcp..."
                : isZh
                  ? "真实调用 POST /api/mcp ▶"
                  : "Run Live POST /api/mcp ▶"}
            </Button>
            <Button
              variant="contrast"
              onClick={() => void copy(oneShotPrompt, "Copied One-Shot AI Prompt")}
            >
              {isZh ? "复制单次完整施工指令" : "Copy One-Shot Prompt"}
            </Button>
          </div>
        </div>

        {mode === "demand" ? (
          <>
            <div className="grid grid-cols-1 gap-2.5 border border-hairline bg-surface p-3.5 md:grid-cols-[1.5fr_0.75fr_0.75fr]">
              <div className="grid gap-1.5 text-[11.5px]">
                <span className="eyebrow-mono">
                  {isZh ? "输入自然语言页面需求" : "NATURAL LANGUAGE REQUIREMENT"}
                </span>
                <SearchInput
                  value={demandQuery}
                  onChange={(e) => setDemandQuery(e.target.value)}
                  placeholder={isZh ? "例如：深色 SaaS 定价与 Passkey 登录..." : "e.g. dark pricing & passkey..."}
                  wrapperClassName="h-[34px]"
                />
              </div>

              <NativeSelect
                label={isZh ? "视觉倾向" : "STYLE"}
                value={demandStyle}
                onChange={(e) => setDemandStyle(e.target.value)}
              >
                <option value="all">All Styles</option>
                <option value="dark-minimal">Dark Minimal Hairline</option>
                <option value="warm-editorial">Warm Editorial Serif</option>
                <option value="monochrome-devtools">Monochrome DevTools</option>
                <option value="fintech-clean">Fintech Clean Ledger</option>
              </NativeSelect>

              <NativeSelect
                label={isZh ? "页面骨架" : "LAYOUT"}
                value={demandLayout}
                onChange={(e) => setDemandLayout(e.target.value)}
              >
                <option value="all">All Layouts</option>
                <option value="split-hero">Split Hero / Banner</option>
                <option value="bento-grid">Bento &amp; Feature Grid</option>
                <option value="3-tier-divided">3-Tier Divided Pricing</option>
                <option value="auth-card">Auth &amp; Form Card</option>
                <option value="data-table">Data Table &amp; Logs</option>
              </NativeSelect>
            </div>

            <div className="grid grid-cols-1 items-start gap-[18px] lg:grid-cols-2">
              <div className="grid min-w-0 gap-3.5">
                <div className="border border-hairline bg-surface p-4">
                  <div className="eyebrow-mono mb-2.5">
                    MATCHED DESIGN.MD &amp; STYLE ({sim.brands.length})
                  </div>
                  <div className="grid gap-2">
                    {sim.brands.map((b) => (
                      <Link
                        key={b.id}
                        href={`/catalog/${b.id}`}
                        className="flex items-center justify-between border border-hairline bg-surface px-3 py-2.5 text-[12.5px] transition-colors hover:border-strong hover:bg-gray-100"
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <span
                            className="inline-block h-2.5 w-2.5 shrink-0"
                            style={{ backgroundColor: b.dark.accent }}
                          />
                          <span className="truncate font-semibold">{b.name} DESIGN.md</span>
                          <Badge>{b.platformLabel}</Badge>
                        </span>
                        <span className="font-mono-ui shrink-0 text-[11px] text-accent-text">
                          Inspect →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="border border-hairline bg-surface p-4">
                  <div className="eyebrow-mono mb-2.5">
                    MATCHED COMPONENTS ({sim.assets.length})
                  </div>
                  <div className="grid gap-2">
                    {sim.assets.map((a) => (
                      <Link
                        key={`${a.categoryId}-${a.id}`}
                        href={`/components/${a.categoryId}/${a.id}`}
                        className="flex items-center justify-between border border-hairline bg-surface px-3 py-2.5 text-[12.5px] transition-colors hover:border-strong hover:bg-gray-100"
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <Badge>{a.assetType.toUpperCase()}</Badge>
                          <span className="truncate font-semibold">{a.name}</span>
                        </span>
                        <span className="font-mono-ui shrink-0 text-[11px] text-accent-text">
                          Workbench →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <CodeViewer
                code={rpcOutput || oneShotPrompt}
                lang={rpcOutput ? "json" : "markdown"}
                title={
                  rpcOutput
                    ? `Live POST /api/mcp Response · ${latencyMs ?? 8}ms`
                    : isZh
                      ? "免配置单次完整施工指令（点击上方按钮可实测真实 /api/mcp）"
                      : "One-Shot Build Prompt (click Run Live POST /api/mcp to inspect RPC)"
                }
                copyLabel={rpcOutput ? "Copy JSON" : "Copy Prompt"}
                maxHeightClassName="max-h-[420px]"
              />
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 items-start gap-[18px] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-4 border border-hairline bg-surface p-5">
              <div className="flex items-center justify-between">
                <span className="eyebrow-mono text-accent-text">JSON-RPC 2.0 REQUEST BUILDER</span>
                <Badge variant="accent">POST /api/mcp</Badge>
              </div>

              <NativeSelect
                label={isZh ? "选择 MCP 工具" : "MCP TOOL"}
                value={toolName}
                onChange={(e) => {
                  setToolName(e.target.value as McpToolName);
                  setRpcOutput("");
                }}
              >
                <option value="search_catalog">search_catalog — 检索品牌 DESIGN.md</option>
                <option value="match_ui_style">match_ui_style — 匹配设计流派 CSS</option>
                <option value="get_component_code">get_component_code — 生成组件源码与施工指令</option>
                <option value="scaffold_template">scaffold_template — 拉取整站或单页模板</option>
                <option value="compute_surface_tokens">compute_surface_tokens — 实时调用五大工作室引擎</option>
              </NativeSelect>

              {toolName === "search_catalog" ? (
                <NativeSelect
                  label={isZh ? "目标产品图鉴" : "CATALOG BRAND"}
                  value={catalogId}
                  onChange={(e) => setCatalogId(e.target.value)}
                >
                  {CATALOG_ITEMS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.category})
                    </option>
                  ))}
                </NativeSelect>
              ) : null}

              {toolName === "match_ui_style" ? (
                <div className="grid grid-cols-2 gap-3">
                  <NativeSelect
                    label={isZh ? "设计流派" : "STYLE SLUG"}
                    value={styleSlug}
                    onChange={(e) => setStyleSlug(e.target.value)}
                  >
                    {STYLE_ITEMS.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {isZh ? s.nameZh : s.name}
                      </option>
                    ))}
                  </NativeSelect>
                  <NativeSelect
                    label={isZh ? "圆角覆盖" : "RADIUS"}
                    value={componentRadius}
                    onChange={(e) => setComponentRadius(e.target.value)}
                  >
                    <option value="0">0px (Sharp)</option>
                    <option value="4">4px</option>
                    <option value="8">8px</option>
                    <option value="12">12px</option>
                    <option value="16">16px</option>
                  </NativeSelect>
                </div>
              ) : null}

              {toolName === "get_component_code" ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <NativeSelect
                    label={isZh ? "组件 ID" : "COMPONENT"}
                    value={componentId}
                    onChange={(e) => setComponentId(e.target.value)}
                  >
                    <option value="hero-telemetry-counter">hero-telemetry-counter</option>
                    <option value="pricing-3tier-divided">pricing-3tier-divided</option>
                    <option value="auth-passkey-card">auth-passkey-card</option>
                    <option value="bento-protocol-grid">bento-protocol-grid</option>
                    <option value="motion-smooth-accordion">motion-smooth-accordion</option>
                  </NativeSelect>
                  <NativeSelect
                    label={isZh ? "套用皮肤" : "SKIN"}
                    value={catalogId}
                    onChange={(e) => setCatalogId(e.target.value)}
                  >
                    {CATALOG_ITEMS.slice(0, 6).map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </NativeSelect>
                  <NativeSelect
                    label={isZh ? "圆角" : "RADIUS"}
                    value={componentRadius}
                    onChange={(e) => setComponentRadius(e.target.value)}
                  >
                    <option value="0">0px</option>
                    <option value="4">4px</option>
                    <option value="8">8px</option>
                    <option value="12">12px</option>
                  </NativeSelect>
                </div>
              ) : null}

              {toolName === "scaffold_template" ? (
                <NativeSelect
                  label={isZh ? "模板工程" : "TEMPLATE"}
                  value={templateId}
                  onChange={(e) => setTemplateId(e.target.value)}
                >
                  {TEMPLATE_ITEMS.map((tpl) => (
                    <option key={tpl.id} value={tpl.id}>
                      {isZh ? tpl.nameZh : tpl.name} ({tpl.kind})
                    </option>
                  ))}
                </NativeSelect>
              ) : null}

              {toolName === "compute_surface_tokens" ? (
                <div className="grid grid-cols-2 gap-3">
                  <NativeSelect
                    label={isZh ? "计算工作室" : "STUDIO"}
                    value={tokenStudio}
                    onChange={(e) => setTokenStudio(e.target.value)}
                  >
                    <option value="colors">colors (OKLCH + WCAG)</option>
                    <option value="typography">typography (Fluid + Easing)</option>
                    <option value="background">background (Grid / Aurora)</option>
                    <option value="shadow">shadow (3-Tier Elevation)</option>
                    <option value="motion">motion (CSS linear() Spring)</option>
                  </NativeSelect>
                  <div className="grid gap-1.5 text-[11.5px]">
                    <span className="eyebrow-mono">SEED HEX</span>
                    <input
                      type="text"
                      value={seedHex}
                      onChange={(e) => setSeedHex(e.target.value)}
                      className="h-[34px] border border-hairline bg-code px-2.5 font-mono text-xs text-ink"
                    />
                  </div>
                </div>
              ) : null}

              <div className="border-t border-hairline pt-3">
                <div className="eyebrow-mono mb-2">REQUEST PAYLOAD PREVIEW</div>
                <pre className="m-0 overflow-x-auto border border-hairline bg-code p-3 font-mono text-[11.5px] leading-[1.5] text-muted">
                  {JSON.stringify(rpcRequestBody, null, 2)}
                </pre>
              </div>
            </div>

            <CodeViewer
              code={activeJsonCode}
              lang="json"
              title={
                rpcOutput
                  ? `POST /api/mcp · ${latencyMs ?? 8}ms`
                  : "Click 'Run Live POST /api/mcp' to execute"
              }
              copyLabel="Copy JSON"
              maxHeightClassName="max-h-[460px]"
            />
          </div>
        )}
      </section>
    </div>
  );
}
