"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface SegmentedOption<T extends string | number> {
  readonly value: T;
  readonly label: ReactNode;
}

export interface SegmentedControlProps<T extends string | number> {
  readonly options: readonly SegmentedOption<T>[];
  readonly value: T;
  readonly onChange: (next: T) => void;
  readonly className?: string;
  readonly itemClassName?: string;
  readonly ariaLabel?: string;
}

export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  className,
  itemClassName,
  ariaLabel
}: SegmentedControlProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex max-w-full flex-wrap items-center gap-0.5 bg-elevated/70 p-0.5",
        className
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "inline-flex h-7 cursor-pointer items-center gap-1.5 whitespace-nowrap px-2.5 text-xs transition-colors duration-130",
              active
                ? "bg-surface font-semibold text-ink shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
                : "bg-transparent font-medium text-muted hover:bg-surface-hover hover:text-ink",
              itemClassName
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
