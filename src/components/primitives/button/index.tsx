import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors duration-150 cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        contrast:
          "border border-contrast-bg bg-contrast-bg text-contrast-fg font-semibold hover:bg-contrast-hover",
        lime: "border border-accent-fill bg-accent-fill text-accent-ink font-semibold hover:brightness-95",
        hairline:
          "border border-hairline bg-surface text-ink hover:bg-gray-100 hover:border-strong",
        ghost: "border border-transparent bg-transparent text-muted hover:bg-surface-hover hover:text-ink"
      },
      size: {
        xs: "h-7 px-2.5 text-[11.5px]",
        sm: "h-[30px] px-3 text-xs",
        md: "h-9 px-4 text-[13px]",
        lg: "h-[42px] px-4 text-[13px]",
        icon: "h-8 w-8 p-0"
      }
    },
    defaultVariants: {
      variant: "hairline",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
