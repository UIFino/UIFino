import { Button } from "@/components/primitives/button";

export interface EmptyStateProps {
  readonly title: string;
  readonly actionLabel?: string;
  readonly onReset?: () => void;
}

export function EmptyState({ title, actionLabel, onReset }: EmptyStateProps) {
  return (
    <div className="px-6 py-16 text-center">
      <div className="text-[15px] font-semibold text-ink">{title}</div>
      {actionLabel && onReset ? (
        <Button variant="hairline" size="md" onClick={onReset} className="mt-3.5">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

export function LoadingGridSkeleton({ count = 4 }: { readonly count?: number }) {
  return (
    <div className="lined-grid-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="lined-cell h-[214px] p-5">
          <div className="h-4 w-2/3 animate-pulse bg-gray-100" />
          <div className="mt-3 h-3 w-1/3 animate-pulse bg-gray-100" />
          <div className="mt-6 h-24 w-full animate-pulse border border-hairline bg-surface" />
        </div>
      ))}
    </div>
  );
}
