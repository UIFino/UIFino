"use client";

import { useCallback } from "react";
import { toast } from "sonner";

export function useDownload() {
  const downloadText = useCallback((filename: string, content: string, mime = "text/markdown;charset=utf-8") => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${filename}`);
  }, []);

  return { downloadText };
}
