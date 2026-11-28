"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { CodeViewer } from "@/components/patterns/code-viewer";
import { FilterToolbar } from "@/components/patterns/filter-bar";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { SegmentedControl } from "@/components/primitives/segmented";
import { useClipboard } from "@/hooks/use-clipboard";
import { MCP_CAPABILITIES, MCP_CLIENTS } from "@/registry/mcp";

type EndpointTarget = "local" | "cloud";

const CLOUD_ENDPOINT = "https://mcp.uifino.dev/mcp";

export function McpClientSetup() {
  const locale = useLocale();
  const isZh = locale === "zh";
  const { copy } = useClipboard();

  const [clientId, setClientId] = useQueryState("client", parseAsString.withDefault("claude-code"));
  const [target, setTarget] = useState<EndpointTarget>("local");
  const [localOrigin, setLocalOrigin] = useState("http://localhost:3000");

  useEffect(() => {
    if (typeof window !== "undefined" && window.location?.origin) {
      setLocalOrigin(window.location.origin);
    }
  }, []);

  const activeClient =
    MCP_CLIENTS.find((c) => c.id === clientId) ?? (MCP_CLIENTS[0] as (typeof MCP_CLIENTS)[0]);

  const activeUrl = target === "local" ? `${localOrigin}/api/mcp` : CLOUD_ENDPOINT;
  const resolvedSnippet = activeClient.snippet.replaceAll(CLOUD_ENDPOINT, activeUrl);

  return (
    <div className="band-full">
      <section className="shell-wrap">
        <FilterToolbar
          left={
            <>
              <SegmentedControl
                options={MCP_CLIENTS.map((cl) => ({ value: cl.id, label: cl.name }))}
                value={activeClient.id}
                onChange={(v) => void setClientId(v)}
              />
              <span className="font-mono-ui text-xs text-subtle">{activeClient.file}</span>
            </>
          }
          right={
            <>
              <SegmentedControl
                options={[
                  { value: "local" as EndpointTarget, label: isZh ? "本机 /api/mcp" : "Local /api/mcp" },
                  { value: "cloud" as EndpointTarget, label: isZh ? "云端地址" : "Cloud URL" }
                ]}
                value={target}
                onChange={setTarget}
              />
              <span className="font-mono-ui text-xs text-muted">
                {MCP_CAPABILITIES.length} MCP tools
              </span>
              <Button
                variant="contrast"
                size="sm"
                onClick={() =>
                  void copy(resolvedSnippet, `Copied ${activeClient.name} MCP config`)
                }
              >
                Copy {activeClient.name} Config
              </Button>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-5 px-7 py-6 lg:grid-cols-2">
          <div className="flex min-w-0 flex-col justify-between border border-hairline bg-surface">
            <CodeViewer
              code={resolvedSnippet}
              lang={activeClient.lang}
              title={`${activeClient.name.toUpperCase()} SETUP · ${activeClient.file}`}
              copyLabel="Copy Snippet"
              className="border-0"
            />
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-hairline bg-code px-4 py-2.5 font-mono text-[11px] text-muted">
              <span>
                {isZh ? "当前接入端点" : "Endpoint"}:{" "}
                <span className="text-accent-text">{activeUrl}</span>
              </span>
              <a
                href="/api/mcp"
                target="_blank"
                rel="noreferrer"
                className="text-ink hover:text-accent-text hover:underline"
              >
                GET /api/mcp ↗
              </a>
            </div>
          </div>

          <div className="min-w-0 border border-hairline bg-surface">
            <div className="eyebrow-mono border-b border-hairline px-4 py-3">
              EXPOSED MCP TOOLS ({MCP_CAPABILITIES.length})
            </div>
            <div>
              {MCP_CAPABILITIES.map((cap, idx) => (
                <div
                  key={cap.tool}
                  className={
                    idx < MCP_CAPABILITIES.length - 1
                      ? "border-b border-hairline px-4 py-3"
                      : "px-4 py-3"
                  }
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-ui text-[13px] font-semibold text-accent-text">
                      {cap.tool}()
                    </span>
                    <Badge>{cap.scope}</Badge>
                  </div>
                  <div className="mt-1 text-[12.5px] text-muted">
                    {isZh ? cap.descZh : cap.descEn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
