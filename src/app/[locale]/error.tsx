"use client";

import { Button } from "@/components/primitives/button";

export default function LocaleError({
  error,
  reset
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  return (
    <div className="band-full min-h-[60dvh] flex items-center">
      <div className="shell-wrap px-6 py-20 text-center">
        <div className="font-mono-ui text-xs text-accent-text">RUNTIME DIAGNOSTIC</div>
        <h2 className="mt-3 text-xl font-semibold text-ink">
          {error.message || "Unexpected rendering failure"}
        </h2>
        <div className="mt-6 flex justify-center">
          <Button variant="contrast" onClick={reset}>
            Retry
          </Button>
        </div>
      </div>
    </div>
  );
}
