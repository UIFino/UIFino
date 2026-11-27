import type { ReactNode } from "react";

export type ViewportSize = "desktop" | "tablet" | "mobile";
export type CanvasPattern = "solid" | "dots";

export interface ViewportFrameProps {
  readonly viewport: ViewportSize;
  readonly bgPattern?: CanvasPattern;
  readonly children: ReactNode;
}

export function ViewportFrame({
  viewport,
  bgPattern = "solid",
  children
}: ViewportFrameProps) {
  const maxWidth =
    viewport === "mobile" ? "390px" : viewport === "tablet" ? "768px" : "100%";

  return (
    <div
      className="preview-canvas-well"
      style={
        bgPattern === "dots"
          ? {
              backgroundImage:
                "radial-gradient(color-mix(in srgb, var(--border-strong) 85%, transparent) 1px, transparent 1px)",
              backgroundSize: "16px 16px"
            }
          : undefined
      }
    >
      <div className="preview-viewport-box" style={{ maxWidth }}>
        {children}
      </div>
    </div>
  );
}
