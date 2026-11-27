"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { CodeViewer } from "@/components/patterns/code-viewer";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { SearchInput } from "@/components/primitives/input";
import { NativeSelect } from "@/components/primitives/select";
import { queryMcpSandbox } from "@/core/search";
import { useClipboard } from "@/hooks/use-clipboard";
import { Link } from "@/i18n/navigation";
import { getMcpRegistrySnapshot } from "@/registry";

export function McpQuerySandbox() {
  const t = useTranslations("mcp");
  const { copy } = useClipboard();

  const [style, setStyle] = useQueryState("style", parseAsString.withDefault("dark-minimal"));
  const [layout, setLayout] = useState("all");
  const [query, setQuery] = useState("");

  const snapshot = useMemo(() => getMcpRegistrySnapshot(), []);
  const sim = useMemo(
    () => queryMcpSandbox(snapshot, { query, style, layout, assetType: "all" }),
    [snapshot, query, style, layout]
  );

  return (
    <div id="sandbox" className="band-full">
      <section className="shell-wrap grid gap-[18px] px-7 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="heading-section">{t("sandboxTitle")}</h2>
          <Button
            variant="hairline"
            onClick={() => void copy(sim.jsonPayload, "Copied MCP JSON payload")}
          >
            Copy MCP Response JSON
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-2.5 border border-hairline bg-surface p-3.5 md:grid-cols-3">
          <NativeSelect
            label="STYLE DIRECTION"
            value={style}
            onChange={(e) => void setStyle(e.target.value)}
          >
            <option value="all">All Styles</option>
            <option value="dark-minimal">Dark Minimal Hairline</option>
            <option value="warm-editorial">Warm Editorial Serif</option>
            <option value="monochrome-devtools">Monochrome DevTools</option>
            <option value="fintech-clean">Fintech Clean Ledger</option>
          </NativeSelect>

          <NativeSelect
            label="LAYOUT STRUCTURE"
            value={layout}
            onChange={(e) => setLayout(e.target.value)}
          >
            <option value="all">All Layouts</option>
            <option value="split-hero">Split Hero / Banner</option>
            <option value="bento-grid">Bento &amp; Feature Grid</option>
            <option value="3-tier-divided">3-Tier Divided Pricing</option>
            <option value="auth-card">Auth &amp; Form Card</option>
            <option value="data-table">Data Table &amp; Logs</option>
            <option value="full-page">Full Page Composition</option>
          </NativeSelect>

          <div className="grid gap-1.5 text-[11.5px]">
            <span className="eyebrow-mono">TAGS / KEYWORDS</span>
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. dark, counter, passkey, cli…"
              wrapperClassName="h-[34px]"
              className="font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-[18px] lg:grid-cols-2">
          <div className="grid min-w-0 gap-3.5">
            <div className="border border-hairline bg-surface p-4">
              <div className="eyebrow-mono mb-2.5">
                MATCHED DESIGN.MD PROTOCOLS ({sim.brands.length})
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
                MATCHED COMPONENTS &amp; MOTION ({sim.assets.length})
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
            code={sim.jsonPayload}
            lang="json"
            title="MCP Tool Response · 14ms"
            copyLabel="Copy JSON"
            maxHeightClassName="max-h-[380px]"
          />
        </div>
      </section>
    </div>
  );
}
