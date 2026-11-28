import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva("inline-flex items-center gap-1 whitespace-nowrap font-mono leading-tight", {
  variants: {
    variant: {
      sharp: "h-5 bg-elevated/85 px-2 text-[10.5px] font-medium text-muted",
      accent: "h-5 bg-accent-soft px-2 text-[10.5px] font-semibold text-accent-text",
      ribbon:
        "bg-accent-fill px-2.5 py-[3px] text-[11px] font-bold uppercase tracking-[0.08em] text-accent-ink",
      pillOverlay:
        "rounded-full bg-[#101012]/78 px-2.5 py-0.5 text-[10.5px] font-semibold text-[#f4f4f6] backdrop-blur-xs"
    }
  },
  defaultVariants: {
    variant: "sharp"
  }
});

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
