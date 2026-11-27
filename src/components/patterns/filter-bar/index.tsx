import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface FilterToolbarProps {
  readonly left: ReactNode;
  readonly right?: ReactNode;
  readonly className?: string;
}

export function FilterToolbar({ left, right, className }: FilterToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 border-b border-hairline bg-surface px-5 py-3",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2.5">{left}</div>
      {right ? <div className="flex flex-wrap items-center gap-2.5">{right}</div> : null}
    </div>
  );
}
