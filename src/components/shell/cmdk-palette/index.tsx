"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/primitives/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/primitives/dialog";
import { type CmdkFilterGroup, filterGlobalSearchItems } from "@/core/search";
import { useCommandKShortcut } from "@/hooks/use-hotkeys";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { getAllSearchableItems } from "@/registry";
import { useShellUiStore } from "@/stores/shell-ui.store";

const FILTER_TABS: readonly { readonly id: CmdkFilterGroup; readonly label: string }[] = [
  { id: "all", label: "All" },
  { id: "catalog", label: "Catalog" },
  { id: "section", label: "Sections" },
  { id: "block", label: "Blocks" },
  { id: "page", label: "Pages" },
  { id: "motion", label: "Motion" },
  { id: "templates", label: "Templates" },
  { id: "tools", label: "Tools & MCP" }
];

export function CmdkPalette() {
  const t = useTranslations("common");
  const router = useRouter();
  const open = useShellUiStore((s) => s.cmdkOpen);
  const setOpen = useShellUiStore((s) => s.setCmdkOpen);
  const toggleCmdk = useShellUiStore((s) => s.toggleCmdk);

  const [filter, setFilter] = useState<CmdkFilterGroup>("all");
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useCommandKShortcut(toggleCmdk);

  const allItems = useMemo(() => getAllSearchableItems(), []);
  const visibleItems = useMemo(
    () => filterGlobalSearchItems(allItems, filter, query),
    [allItems, filter, query]
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      const timer = window.setTimeout(() => inputRef.current?.focus(), 20);
      return () => window.clearTimeout(timer);
    }
  }, [open]);

  const handleSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle className="sr-only">Global Search</DialogTitle>
        <div className="flex items-center gap-2.5 border-b border-hairline px-3.5 py-3">
          <Search className="h-4 w-4 shrink-0 text-subtle" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            placeholder={t("searchPlaceholder")}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((idx) =>
                  visibleItems.length ? (idx + 1) % visibleItems.length : 0
                );
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((idx) =>
                  visibleItems.length
                    ? (idx - 1 + visibleItems.length) % visibleItems.length
                    : 0
                );
              } else if (e.key === "Enter" && visibleItems[activeIndex]) {
                e.preventDefault();
                handleSelect(visibleItems[activeIndex].href);
              }
            }}
            className="w-full border-0 bg-transparent text-sm text-ink outline-none focus-visible:outline-none placeholder:text-subtle"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          >
            <Badge>ESC</Badge>
          </button>
        </div>

        <div className="flex flex-wrap gap-1 border-b border-hairline bg-code px-3 py-2">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setFilter(tab.id);
                setActiveIndex(0);
              }}
              className={cn(
                "inline-flex h-[26px] cursor-pointer items-center border border-hairline px-2.5 text-xs transition-colors",
                filter === tab.id
                  ? "bg-gray-100 font-semibold text-ink"
                  : "bg-transparent text-muted hover:bg-surface-hover hover:text-ink"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="max-h-[340px] overflow-y-auto p-1.5">
          {visibleItems.length === 0 ? (
            <div className="p-7 text-center text-[13px] text-muted">{t("emptyResult")}</div>
          ) : (
            visibleItems.map((item, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => handleSelect(item.href)}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between gap-2 border-l-2 px-3 py-2 text-left text-[12.5px] transition-colors",
                    active
                      ? "border-l-accent-text bg-surface font-semibold text-ink"
                      : "border-l-transparent text-muted hover:bg-surface-hover hover:text-ink"
                  )}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Badge>{item.badge}</Badge>
                    <span className="truncate font-medium text-ink">{item.label}</span>
                  </span>
                  <span className="font-mono-ui shrink-0 text-[11px] text-subtle">
                    {item.meta} ↵
                  </span>
                </button>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
