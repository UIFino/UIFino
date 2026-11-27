import type {
  ShadowStudioOutput,
  ShadowStudioParams,
  StudioCodeFormat
} from "./types";

export * from "./types";

export function computeShadowStudio(
  params: Partial<ShadowStudioParams> = {},
  format: StudioCodeFormat = "css"
): ShadowStudioOutput {
  const mode = params.mode === "light" ? "light" : "dark";
  const y = Number(params.yOffset ?? 12);
  const blur = Math.max(0, Number(params.blur ?? 28));
  const spread = Number(params.spread ?? -4);
  const op = Math.min(90, Math.max(0, Number(params.opacity ?? 40))) / 100;
  const rim = Math.min(40, Math.max(0, Number(params.rimLight ?? 10))) / 100;
  const borderAlpha = Math.min(50, Math.max(4, Number(params.borderAlpha ?? 16))) / 100;
  const radius = Math.max(0, Number(params.radius ?? 8));

  const layers: string[] = [];
  if (rim > 0) {
    layers.push(`inset 0 1px 0 0 rgba(255, 255, 255, ${rim.toFixed(2)})`);
  }
  if (op > 0 && (blur > 0 || y > 0)) {
    const keyAlpha = Math.max(0.04, op * 0.55).toFixed(2);
    layers.push(
      `0 ${Math.max(1, Math.round(y * 0.35))}px ${Math.max(2, Math.round(blur * 0.35))}px 0 rgba(0, 0, 0, ${keyAlpha})`
    );
    layers.push(`0 ${y}px ${blur}px ${spread}px rgba(0, 0, 0, ${op.toFixed(2)})`);
  }
  const boxShadow = layers.length ? layers.join(", ") : "none";

  const surfaceBg = mode === "light" ? "#FFFFFF" : "#1D1D20";
  const canvasBg = mode === "light" ? "#F2F3F6" : "#121215";
  const borderCol =
    mode === "light"
      ? `rgba(15, 23, 42, ${borderAlpha.toFixed(2)})`
      : `rgba(255, 255, 255, ${borderAlpha.toFixed(2)})`;
  const ink = mode === "light" ? "#111827" : "#ECECEE";
  const muted = mode === "light" ? "#64748B" : "#9CA3AF";

  const cssCode = `:root {\n  --surface-bg: ${surfaceBg};\n  --surface-border: ${borderCol};\n  --surface-radius: ${radius}px;\n  --surface-shadow: ${boxShadow};\n}\n\n.uifino-elevated-card {\n  background: var(--surface-bg);\n  border: 1px solid var(--surface-border);\n  border-radius: var(--surface-radius);\n  box-shadow: var(--surface-shadow);\n}`;

  const twShadow =
    boxShadow === "none" ? "shadow-none" : `shadow-[${boxShadow.replace(/\s+/g, "_")}]`;
  const twCode = `<div class="bg-[${surfaceBg}] border border-[${borderCol.replace(/\s+/g, "")}] rounded-[${radius}px] ${twShadow} p-5">\n  <!-- Card content -->\n</div>`;

  return {
    canvasBg,
    surfaceBg,
    borderCol,
    ink,
    muted,
    radius,
    boxShadow,
    code: format === "tailwind" ? twCode : cssCode
  };
}
