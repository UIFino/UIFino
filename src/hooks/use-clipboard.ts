"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";

export function useClipboard() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copy = useCallback(async (text: string, toastLabel = "Copied to clipboard", key?: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }
      toast.success(toastLabel);
      if (key) {
        setCopiedKey(key);
        window.setTimeout(() => setCopiedKey((prev) => (prev === key ? null : prev)), 1800);
      }
    } catch {
      toast.error("Copy failed");
    }
  }, []);

  return { copy, copiedKey };
}
