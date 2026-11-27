"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Search, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Button } from "@/components/primitives/button";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import type { NavChannelKey } from "@/registry/navigation/mega-menus";
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
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    if (!openMenu) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openMenu]);

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
    }, 140);
  }, [cancelCloseTimer]);

  const handleOpenMenu = useCallback(
    (key: NavChannelKey) => {
      cancelCloseTimer();
      setOpenMenu(key);
    },
    [cancelCloseTimer]
  );

  const closeMenuImmediate = useCallback(() => {
    cancelCloseTimer();
    setOpenMenu(null);
  }, [cancelCloseTimer]);

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
  }[] = [
    { key: "catalog", label: t("navCatalog"), href: "/catalog" },
    { key: "components", label: t("navComponents"), href: "/components" },
    { key: "templates", label: t("navTemplates"), href: "/templates" },
    { key: "tools", label: t("navTools"), href: "/tools/background" },
    { key: "mcp", label: t("navMcp"), href: "/mcp" }
  ];

  const handleSwitchLocale = () => {
    closeMenuImmediate();
    const nextLocale: AppLocale = locale === "zh" ? "en" : "zh";
    const search = typeof window !== "undefined" ? window.location.search : "";
    router.replace(`${pathname}${search}`, { locale: nextLocale });
  };

  const starFormatted = `${(starCount / 1000).toFixed(1)}k`;
  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <>
      <header
        onMouseEnter={cancelCloseTimer}
        onMouseLeave={scheduleCloseMenu}
        className={cn(
          "sticky top-0 z-50 h-[var(--header-h)] bg-canvas",
          openMenu ? "border-b border-transparent" : "border-b border-hairline"
        )}
      >
        <div className="mx-auto flex h-full max-w-[var(--container-max)] items-center justify-between gap-3 border-x border-hairline px-6">
          <div className="flex min-w-0 items-center gap-6">
            <Link
              href="/"
              onMouseEnter={closeMenuImmediate}
              className="font-pixel-brand text-lg font-bold text-ink"
            >
              ui<span className="text-accent-text">fino</span>
            </Link>

            <nav aria-label="Primary" className="flex items-center overflow-x-auto">
              {navChannels.map((ch) => {
                const isMenuOpen = openMenu === ch.key;
                const isActive = activeChannel === ch.key;
                return (
                  <Link
                    key={ch.key}
                    href={ch.href}
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen}
                    onMouseEnter={() => handleOpenMenu(ch.key)}
                    onClick={closeMenuImmediate}
                    className={cn(
                      "relative inline-flex h-[var(--header-h)] items-center whitespace-nowrap px-3 text-[13.5px] font-medium transition-colors duration-140",
                      isActive
                        ? "font-semibold text-ink shadow-[inset_0_-2px_0_var(--accent-text)]"
                        : "text-muted hover:text-ink",
                      isMenuOpen &&
                        !isActive &&
                        "text-ink shadow-[inset_0_-2px_0_var(--text-primary)]"
                    )}
                  >
                    {ch.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Chrome Controls */}
          <div
            onMouseEnter={closeMenuImmediate}
            className="flex shrink-0 items-center gap-2"
          >
            <Button
              variant="hairline"
              size="sm"
              onClick={() => setCmdkOpen(true)}
              className="h-8 px-2.5 text-muted"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="font-mono-ui text-[11.5px]">⌘K</span>
            </Button>

            <TokenCustomizerPopover onOpenTrigger={closeMenuImmediate} />

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
        </div>

        <MegaMenuViewport
          activeMenu={openMenu}
          locale={locale}
          onClose={closeMenuImmediate}
        />
      </header>

      {/* Full-Viewport Dim & Blur Backdrop Curtain (shadcn.io / Apple GlobalNav pattern) */}
      {openMenu ? (
        <div
          aria-hidden="true"
          onClick={closeMenuImmediate}
          className={cn(
            "fixed inset-0 z-40 backdrop-blur-md transition-opacity duration-200",
            isDark ? "bg-black/62" : "bg-black/28"
          )}
        />
      ) : null}
    </>
  );
}
