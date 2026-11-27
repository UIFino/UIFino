"use client";

import { useEffect, useState } from "react";

export interface AnimatedCounterProps {
  readonly target: string;
  readonly replayKey?: number;
}

export function AnimatedCounter({ target, replayKey = 0 }: AnimatedCounterProps) {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      setDisplay(target);
      return;
    }

    const numericTarget = Number.parseFloat(target);
    if (Number.isNaN(numericTarget)) {
      setDisplay(target);
      return;
    }

    const decimals = target.includes(".") ? (target.split(".")[1]?.length ?? 0) : 0;
    const start = performance.now();
    const duration = 680;
    let rafId = 0;

    const frame = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numericTarget * eased;
      setDisplay(decimals > 0 ? current.toFixed(decimals) : String(Math.round(current)));
      if (progress < 1) {
        rafId = requestAnimationFrame(frame);
      }
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [target, replayKey]);

  return <span>{display}</span>;
}
