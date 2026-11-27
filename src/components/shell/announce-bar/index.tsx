"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/primitives/badge";
import { Link } from "@/i18n/navigation";
import { useShellUiStore } from "@/stores/shell-ui.store";

export function AnnounceBar() {
  const t = useTranslations("common");
  const dismissed = useShellUiStore((s) => s.announceDismissed);
  const dismissAnnounce = useShellUiStore((s) => s.dismissAnnounce);

  if (dismissed) return null;

  return (
    <aside
      aria-label="Announcement"
      className="relative flex min-h-9 items-center justify-center gap-2.5 border-b border-hairline bg-elevated px-10 py-1.5 text-[12.5px]"
    >
      <Badge variant="accent">{t("announceTag")}</Badge>
      <span className="truncate text-body">{t("announceText")}</span>
      <Link
        href="/mcp"
        className="font-mono-ui shrink-0 text-xs font-semibold text-accent-text hover:underline"
      >
        {t("announceAction")}
      </Link>
      <button
        type="button"
        aria-label="Close announcement"
        onClick={dismissAnnounce}
        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer p-1 text-subtle transition-colors hover:text-ink"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </aside>
  );
}
