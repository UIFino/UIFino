"use client";

import { DualSwatch } from "@/components/primitives/dual-swatch";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { getGlobalNavFlyouts, type NavChannelKey } from "@/registry/navigation/mega-menus";

export interface MegaMenuViewportProps {
  readonly activeMenu: NavChannelKey | null;
  readonly locale: AppLocale;
  readonly onClose: () => void;
}

export function MegaMenuViewport({ activeMenu, locale, onClose }: MegaMenuViewportProps) {
  if (!activeMenu) return null;

  const flyouts = getGlobalNavFlyouts(locale);
  const flyout = flyouts[activeMenu];

  return (
    <div
      role="region"
      aria-label="Global navigation submenu"
      className="absolute inset-x-0 top-full z-50 border-b border-hairline bg-canvas"
    >
      <div className="w-full px-6 pt-9 pb-14">
        <div className="flex flex-wrap items-start gap-y-8">
          {/* Column 1: Elevated Primary Group */}
          <div className="mr-14 min-w-[210px] lg:mr-24">
            <h2 className="m-0 mb-3.5 text-xs font-medium text-subtle">
              {flyout.primary.heading}
            </h2>
            <ul className="m-0 grid list-none gap-1 p-0">
              {flyout.primary.elevatedLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="inline-block py-1 text-[21px] leading-[1.32] font-semibold tracking-[-0.02em] text-ink transition-colors duration-140 hover:text-accent-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {flyout.primary.secondaryLinks?.length ? (
              <ul className="m-0 mt-3.5 grid list-none gap-1 p-0">
                {flyout.primary.secondaryLinks.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="inline-block py-1 text-[13.5px] leading-[1.45] font-medium text-muted transition-colors duration-140 hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Secondary Compact Directory Columns */}
          <div className="flex flex-wrap items-start gap-x-12 gap-y-8 lg:gap-x-16">
            {flyout.columns.map((col) => (
              <div key={col.heading} className="min-w-[148px]">
                <h2 className="m-0 mb-3.5 text-xs font-medium text-subtle">{col.heading}</h2>
                <ul className="m-0 grid list-none gap-1 p-0">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="inline-flex items-center gap-2 py-[3.5px] text-[13.5px] leading-[1.45] font-medium text-muted transition-colors duration-140 hover:text-ink"
                      >
                        {link.swatch ? <DualSwatch swatch={link.swatch} /> : null}
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
