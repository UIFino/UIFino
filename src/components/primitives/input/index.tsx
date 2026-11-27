import { forwardRef, type InputHTMLAttributes } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly wrapperClassName?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, wrapperClassName, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-[30px] items-center gap-1.5 border border-hairline bg-code px-2.5 focus-within:border-accent-border",
          wrapperClassName
        )}
      >
        <Search className="h-3.5 w-3.5 shrink-0 text-subtle" aria-hidden="true" />
        <input
          ref={ref}
          type="search"
          className={cn(
            "w-full border-0 bg-transparent text-xs text-ink outline-none focus-visible:outline-none placeholder:text-subtle",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";
