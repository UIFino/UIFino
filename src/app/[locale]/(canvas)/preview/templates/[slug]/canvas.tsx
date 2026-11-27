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
  const mode = initialMode ?? "dark";

  return (
    <div className="min-h-dvh p-4 sm:p-6" style={{ backgroundColor: template.canvas }}>
      <div className="mx-auto max-w-[1440px] border border-hairline">
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
