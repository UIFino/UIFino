"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Search, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Button } from "@/components/primitives/button";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { getMegaMenuPanels, type NavChannelKey } from "@/registry/navigation/mega-menus";
import { useShellUiStore } from "@/stores/shell-ui.store";
import { MegaMenuViewport } from "../mega-menu";
import { TokenCustomizerPopover } from "../token-customizer";

export function SiteHeader() {
  const t = useTranslations("common");
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const setCmdkOpen = useShellUiStore((s) => s.setCmdkOpen);
  const starred = useShellUiStore((s) => s.starred);
  const starCount = useShellUiStore((s) => s.starCount);
  const toggleStar = useShellUiStore((s) => s.toggleStar);

  const [openMenu, setOpenMenu] = useState<NavChannelKey | null>(null);
  const [menuPosition, setMenuPosition] = useState({ left: 16, width: 650 });
  const headerInnerRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
  }, [pathname]);

  const cancelCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleCloseMenu = useCallback(() => {
    cancelCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenMenu(null);
    }, 135);
  }, [cancelCloseTimer]);

  const handleOpenMenu = useCallback(
    (key: NavChannelKey, triggerEl: HTMLElement) => {
      cancelCloseTimer();
      const headerEl = headerInnerRef.current;
      if (!headerEl) return;

      const panels = getMegaMenuPanels(locale);
      const desiredWidth = panels[key].width;
      const containerRect = headerEl.getBoundingClientRect();
      const triggerRect = triggerEl.getBoundingClientRect();

      const maxAvail = Math.max(280, containerRect.width - 32);
      const finalWidth = Math.min(desiredWidth, maxAvail);
      let targetLeft = triggerRect.left - containerRect.left;
      if (targetLeft + finalWidth > containerRect.width - 16) {
        targetLeft = Math.max(16, containerRect.width - finalWidth - 16);
      }
      targetLeft = Math.max(16, Math.round(targetLeft));

      setMenuPosition({ left: targetLeft, width: finalWidth });
      setOpenMenu(key);
    },
    [cancelCloseTimer, locale]
  );

  const activeChannel: NavChannelKey | "" = pathname.startsWith("/catalog")
    ? "catalog"
    : pathname.startsWith("/components")
      ? "components"
      : pathname.startsWith("/templates")
        ? "templates"
        : pathname.startsWith("/tools")
          ? "tools"
          : pathname.startsWith("/mcp")
            ? "mcp"
            : "";

  const navChannels: readonly {
    readonly key: NavChannelKey;
    readonly label: string;
    readonly href: string;
    readonly aiPill?: boolean;
  }[] = [
    { key: "catalog", label: t("navCatalog"), href: "/catalog" },
    { key: "components", label: t("navComponents"), href: "/components" },
    { key: "templates", label: t("navTemplates"), href: "/templates" },
    { key: "tools", label: t("navTools"), href: "/tools/background" },
    { key: "mcp", label: t("navMcp"), href: "/mcp", aiPill: true }
  ];

  const handleSwitchLocale = () => {
    const nextLocale: AppLocale = locale === "zh" ? "en" : "zh";
    const search = typeof window !== "undefined" ? window.location.search : "";
    router.replace(`${pathname}${search}`, { locale: nextLocale });
  };

  const starFormatted = starred
    ? `${(starCount / 1000).toFixed(1)}k`
    : `${(starCount / 1000).toFixed(1)}k`;

  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-40 h-[var(--header-h)] border-b border-hairline bg-canvas">
      <div
        ref={headerInnerRef}
        className="relative mx-auto flex h-full max-w-[var(--container-max)] items-center justify-between gap-3 border-x border-hairline px-4"
      >
        <div className="flex min-w-0 items-center gap-3.5">
          <Link
            href="/"
            className="font-pixel-brand pr-1.5 text-lg font-bold text-ink"
          >
            ui<span className="text-accent-text">fino</span>
          </Link>

          <nav
            aria-label="Primary"
            onMouseLeave={scheduleCloseMenu}
            className="flex items-center overflow-x-auto"
          >
            {navChannels.map((ch) => {
              const isMenuOpen = openMenu === ch.key;
              const isActive = activeChannel === ch.key;
              return (
                <Link
                  key={ch.key}
                  href={ch.href}
                  aria-haspopup="true"
                  aria-expanded={isMenuOpen}
                  onMouseEnter={(e) => handleOpenMenu(ch.key, e.currentTarget)}
                  className={cn(
                    "relative inline-flex h-[var(--header-h)] items-center gap-[5px] whitespace-nowrap px-3 text-[13.5px] font-medium transition-colors duration-140",
                    isActive
                      ? "font-semibold text-ink shadow-[inset_0_-2px_0_var(--accent-text)]"
                      : "text-muted hover:bg-surface-hover hover:text-ink",
                    isMenuOpen && "bg-surface-hover text-ink"
                  )}
                >
                  <span>{ch.label}</span>
                  {ch.aiPill ? (
                    <span className="inline-flex items-center border border-accent-border bg-accent-soft px-[5px] py-px font-mono text-[9.5px] leading-[1.25] font-bold tracking-[0.04em] text-accent-text">
                      AI
                    </span>
                  ) : null}
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 shrink-0 opacity-65 transition-transform duration-180",
                      isMenuOpen && "rotate-180 text-accent-text opacity-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Chrome Controls */}
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="hairline"
            size="sm"
            onClick={() => setCmdkOpen(true)}
            className="h-8 px-2.5 text-muted"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="font-mono-ui text-[11.5px]">⌘K</span>
          </Button>

          <TokenCustomizerPopover onOpenTrigger={() => setOpenMenu(null)} />

          <button
            type="button"
            onClick={toggleStar}
            className="hidden h-8 cursor-pointer items-stretch border border-hairline bg-surface sm:inline-flex"
          >
            <span className="inline-flex items-center bg-gray-100 px-2 text-xs">
              <Star
                className={cn(
                  "h-3.5 w-3.5",
                  starred ? "fill-[var(--star-amber)] text-[var(--star-amber)]" : "text-ink"
                )}
              />
            </span>
            <span className="font-mono-ui inline-flex items-center border-l border-hairline px-2 text-[11.5px]">
              {starFormatted}
            </span>
          </button>

          <Button
            variant="hairline"
            size="sm"
            onClick={handleSwitchLocale}
            className="font-mono-ui h-8 px-2.5 text-[11.5px]"
          >
            {locale === "zh" ? "中文" : "EN"}
          </Button>

          <Button
            variant="hairline"
            size="sm"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="font-mono-ui h-8 px-2.5 text-[11.5px]"
          >
            {isDark ? "◐ Dark" : "◑ Light"}
          </Button>
        </div>

        <MegaMenuViewport
          activeMenu={openMenu}
          locale={locale}
          leftOffset={menuPosition.left}
          panelWidth={menuPosition.width}
          onMouseEnter={cancelCloseTimer}
          onMouseLeave={scheduleCloseMenu}
          onClose={() => setOpenMenu(null)}
        />
      </div>
    </header>
  );
}
