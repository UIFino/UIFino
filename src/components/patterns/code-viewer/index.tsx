"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Badge } from "@/components/primitives/badge";
import { useClipboard } from "@/hooks/use-clipboard";
import { cn } from "@/lib/cn";
import { type SupportedCodeLang } from "@/lib/shiki";

export interface CodeViewerProps {
  readonly code: string;
  readonly lang?: SupportedCodeLang;
  readonly title?: string;
  readonly copyLabel?: string;
  readonly maxHeightClassName?: string;
  readonly headerRight?: React.ReactNode;
  readonly className?: string;
}

export function CodeViewer({
  code,
  lang = "tsx",
  title,
  copyLabel = "Copy",
  maxHeightClassName,
  headerRight,
  className
}: CodeViewerProps) {
  const { copy, copiedKey } = useClipboard();
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    import("@/lib/shiki")
      .then(({ highlightCode }) => highlightCode(code, lang))
      .then((html) => {
        if (active) setHighlightedHtml(html);
      })
      .catch(() => {
        if (active) setHighlightedHtml(null);
      });
    return () => {
      active = false;
    };
  }, [code, lang]);

  const isCopied = copiedKey === code;

  return (
    <div className={cn("min-w-0 border border-hairline bg-code", className)}>
      {title || headerRight ? (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline px-3.5 py-2 font-mono text-xs">
          <span className="truncate text-muted">{title}</span>
          <div className="flex items-center gap-2">
            {headerRight}
            <button
              type="button"
              onClick={() => void copy(code, `Copied ${title ?? "code"}`, code)}
              className="cursor-pointer"
            >
              <Badge className="h-6 text-ink hover:border-accent-border">
                {isCopied ? <Check className="h-3 w-3 text-accent-text" /> : <Copy className="h-3 w-3" />}
                <span>{isCopied ? "Copied" : copyLabel}</span>
              </Badge>
            </button>
          </div>
        </div>
      ) : null}

      <div className={cn("overflow-y-auto", maxHeightClassName)}>
        {highlightedHtml ? (
          <div
            className="shiki-code-wrap"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          <pre className="m-0 overflow-x-auto bg-code px-[18px] py-4 font-mono text-[12.5px] leading-[1.55] text-body">
            {code}
          </pre>
        )}
      </div>
    </div>
  );
}
