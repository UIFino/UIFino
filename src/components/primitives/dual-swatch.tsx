import { cn } from "@/lib/cn";

export interface DualSwatchProps {
  readonly swatch: readonly [string, string];
  readonly size?: "sm" | "md";
  readonly className?: string;
}

export function DualSwatch({ swatch, size = "sm", className }: DualSwatchProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-grid shrink-0 grid-cols-2 overflow-hidden border border-hairline",
        size === "md" ? "h-3 w-3" : "h-2.5 w-2.5",
        className
      )}
    >
      <span style={{ backgroundColor: swatch[0] }} />
      <span style={{ backgroundColor: swatch[1] }} />
    </span>
  );
}
