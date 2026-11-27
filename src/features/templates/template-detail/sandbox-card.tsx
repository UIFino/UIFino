"use client";

import type { ViewportSize } from "@/components/patterns/viewport-frame";
import { ViewportFrame } from "@/components/patterns/viewport-frame";
import { SegmentedControl } from "@/components/primitives/segmented";
import type { ThemeMode } from "@/core/tokens";
import { cn } from "@/lib/cn";
import {
  type StarterTemplateSpec,
  TemplateLiveSandbox,
  type TemplateRoutePageSpec
} from "@/registry/templates";

export interface TemplateSandboxCardProps {
  readonly template: StarterTemplateSpec;
  readonly routes: readonly TemplateRoutePageSpec[];
  readonly activePath: string;
  readonly viewport: ViewportSize;
  readonly mode: ThemeMode;
  readonly isZh: boolean;
  readonly onSelectRoute: (path: string) => void;
  readonly onViewportChange: (vp: ViewportSize) => void;
  readonly onModeChange: (m: ThemeMode) => void;
}

export function TemplateSandboxCard({
  template,
  routes,
  activePath,
  viewport,
  mode,
  isZh,
  onSelectRoute,
  onViewportChange,
  onModeChange
}: TemplateSandboxCardProps) {
  return (
    <section id="tpl-sandbox" className="grid gap-3">
      {/* Persistent Sandbox Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border border-hairline bg-surface px-3.5 py-2.5">
        {/* Left: Subpage Route Switcher */}
        <div className="flex flex-wrap items-center gap-1.5">
          {routes.map((rp) => {
            const active = rp.path === activePath;
            return (
              <button
                key={rp.path}
                type="button"
                onClick={() => onSelectRoute(rp.path)}
                className={cn(
                  "inline-flex h-8 cursor-pointer items-center gap-1.5 border px-2.5 text-xs font-medium transition-colors",
                  active
                    ? "border-accent-border bg-accent-soft text-accent-text"
                    : "border-hairline bg-canvas text-muted hover:text-ink"
                )}
              >
                <span>{isZh ? rp.labelZh : rp.labelEn}</span>
                <span className="font-mono text-[10.5px] opacity-75">{rp.path}</span>
              </button>
            );
          })}
        </div>

        {/* Center + Right: Viewport Size & Dark/Light Switcher (kept persistent across route changes) */}
        <div className="flex flex-wrap items-center gap-2">
          <SegmentedControl
            ariaLabel="Template Sandbox Viewport"
            options={[
              { value: "desktop" as ViewportSize, label: "Desktop" },
              { value: "tablet" as ViewportSize, label: "Tablet" },
              { value: "mobile" as ViewportSize, label: "Mobile" }
            ]}
            value={viewport}
            onChange={onViewportChange}
          />
          <SegmentedControl
            options={[
              { value: "dark" as ThemeMode, label: "Dark" },
              { value: "light" as ThemeMode, label: "Light" }
            ]}
            value={mode}
            onChange={onModeChange}
          />
        </div>
      </div>

      {/* Live Multi-Route Sandbox Viewport */}
      <ViewportFrame viewport={viewport}>
        <TemplateLiveSandbox
          template={template}
          routes={routes}
          activePath={activePath}
          mode={mode}
          viewport={viewport}
          isZh={isZh}
          onSelectRoute={onSelectRoute}
        />
      </ViewportFrame>
    </section>
  );
}
