"use client";

import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface RangeSliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  readonly label: string;
  readonly valueDisplay: string;
  readonly value: number;
  readonly onChange: (nextValue: number) => void;
}

export function RangeSlider({
  label,
  valueDisplay,
  value,
  onChange,
  className,
  ...props
}: RangeSliderProps) {
  return (
    <label className={cn("grid gap-1.5 text-[12.5px]", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-muted">{label}</span>
        <span className="font-mono-ui text-ink">{valueDisplay}</span>
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        {...props}
      />
    </label>
  );
}
