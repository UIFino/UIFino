"use client";

import { useClipboard } from "@/hooks/use-clipboard";

export interface TokenSwatchGridProps {
  readonly swatches: readonly (readonly [name: string, hex: string])[];
}

export function TokenSwatchGrid({ swatches }: TokenSwatchGridProps) {
  const { copy } = useClipboard();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(125px,1fr))] gap-2.5">
      {swatches.map(([name, hex]) => (
        <button
          key={`${name}-${hex}`}
          type="button"
          onClick={() => void copy(hex, `Copied ${hex}`)}
          className="cursor-pointer border border-hairline bg-code p-2 text-left transition-colors hover:border-accent-border"
        >
          <div className="h-[34px] border border-strong" style={{ backgroundColor: hex }} />
          <div className="mt-1.5 truncate text-[11.5px] font-semibold text-ink">{name}</div>
          <div className="font-mono-ui text-[11px] text-muted">{hex}</div>
        </button>
      ))}
    </div>
  );
}
