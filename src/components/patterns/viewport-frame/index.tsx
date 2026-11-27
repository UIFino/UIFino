import type { ReactNode } from "react";

export type ViewportSize = "desktop" | "tablet" | "mobile";

export interface ViewportFrameProps {
  readonly viewport: ViewportSize;
  readonly children: ReactNode;
}

export function ViewportFrame({ viewport, children }: ViewportFrameProps) {
  const maxWidth =
    viewport === "mobile" ? "390px" : viewport === "tablet" ? "768px" : "100%";

  return (
    <div className="preview-canvas-well">
      <div className="preview-viewport-box" style={{ maxWidth }}>
        {children}
      </div>
    </div>
  );
}
