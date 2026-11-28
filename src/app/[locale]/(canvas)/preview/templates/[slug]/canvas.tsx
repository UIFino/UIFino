"use client";

import { useState } from "react";
import type { ThemeMode } from "@/core/tokens";
import {
  getTemplateDetailBundle,
  type StarterTemplateSpec,
  TemplateLiveSandbox
} from "@/registry/templates";

export function IsolatedTemplateCanvas({
  template,
  initialRoute,
  initialMode,
  isZh
}: {
  readonly template: StarterTemplateSpec;
  readonly initialRoute?: string;
  readonly initialMode?: ThemeMode;
  readonly isZh: boolean;
}) {
  const bundle = getTemplateDetailBundle(template);
  const validInitial =
    bundle.routePages.find((rp) => rp.path === initialRoute)?.path ??
    bundle.routePages[0]?.path ??
    "/";

  const [activePath, setActivePath] = useState(validInitial);
  const [mode, setMode] = useState<ThemeMode>(initialMode ?? "dark");

  return (
    <div className="min-h-dvh p-4 sm:p-6" style={{ backgroundColor: template.canvas }}>
      <div className="border-hairline mx-auto max-w-[1440px] border">
        {template.SandboxComponent ? (
          <div className="border-hairline bg-canvas flex flex-wrap items-center justify-between gap-3 border-b px-4 py-2 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              {bundle.routePages.map((rp) => {
                const active = rp.path === activePath;
                return (
                  <button
                    key={rp.path}
                    type="button"
                    onClick={() => setActivePath(rp.path)}
                    className={`cursor-pointer border px-2 py-0.5 font-mono text-[11px] transition-colors ${
                      active
                        ? "border-accent-border bg-accent-soft text-accent-text"
                        : "border-hairline bg-surface text-muted hover:text-ink"
                    }`}
                  >
                    {rp.path}
                  </button>
                );
              })}
            </div>
            <div className="border-hairline bg-code inline-flex border">
              {(["dark", "light"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`cursor-pointer px-2.5 py-0.5 text-[11px] font-medium ${
                    mode === m ? "text-ink bg-gray-100" : "text-muted hover:text-ink"
                  }`}
                >
                  {m === "dark" ? (isZh ? "深色" : "Dark") : isZh ? "浅色" : "Light"}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <TemplateLiveSandbox
          template={template}
          routes={bundle.routePages}
          activePath={activePath}
          mode={mode}
          viewport="desktop"
          isZh={isZh}
          onSelectRoute={setActivePath}
        />
      </div>
    </div>
  );
}
