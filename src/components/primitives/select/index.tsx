import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface NativeSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  readonly label?: string;
}

export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ label, className, children, ...props }, ref) => {
    const selectEl = (
      <select
        ref={ref}
        className={cn(
          "h-[34px] border border-hairline bg-code px-2.5 text-[12.5px] text-ink outline-none focus:border-accent-border",
          className
        )}
        {...props}
      >
        {children}
      </select>
    );

    if (!label) return selectEl;

    return (
      <label className="grid gap-1.5 text-[11.5px]">
        <span className="eyebrow-mono">{label}</span>
        {selectEl}
      </label>
    );
  }
);
NativeSelect.displayName = "NativeSelect";
