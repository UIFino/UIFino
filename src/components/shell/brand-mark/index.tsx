export type MatrixTone = "primary" | "muted" | "accent";

export interface MatrixCell {
  readonly row: 0 | 1 | 2;
  readonly col: 0 | 1 | 2;
  readonly tone: MatrixTone;
}

/** 3x3 pixel matrix forming a modular "U" with an accented top-right token block. */
export const BRAND_MATRIX_CELLS: readonly MatrixCell[] = [
  { row: 0, col: 0, tone: "primary" },
  { row: 0, col: 1, tone: "muted" },
  { row: 0, col: 2, tone: "accent" },
  { row: 1, col: 0, tone: "primary" },
  { row: 1, col: 1, tone: "muted" },
  { row: 1, col: 2, tone: "primary" },
  { row: 2, col: 0, tone: "primary" },
  { row: 2, col: 1, tone: "primary" },
  { row: 2, col: 2, tone: "primary" }
];

const CSS_TONE_MAP: Record<MatrixTone, string> = {
  primary: "var(--text-primary)",
  muted: "var(--gray-200)",
  accent: "var(--accent-text)"
};

/**
 * Crisp 3x3 pixel-grid brand mark aligned with the Silkscreen "uifino" wordmark.
 */
export function BrandMark({ className = "h-4 w-4 shrink-0" }: { readonly className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
    >
      {BRAND_MATRIX_CELLS.map((cell) => (
        <rect
          key={`${cell.row}-${cell.col}`}
          x={cell.col * 5}
          y={cell.row * 5}
          width={4}
          height={4}
          fill={CSS_TONE_MAP[cell.tone]}
        />
      ))}
    </svg>
  );
}
