"use client";

import { Badge } from "@/components/primitives/badge";
import { useClipboard } from "@/hooks/use-clipboard";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { getMegaMenuPanels, type NavChannelKey } from "@/registry/navigation/mega-menus";

export interface MegaMenuViewportProps {
  readonly activeMenu: NavChannelKey | null;
  readonly locale: AppLocale;
  readonly leftOffset: number;
  readonly panelWidth: number;
  readonly onMouseEnter: () => void;
  readonly onMouseLeave: () => void;
  readonly onClose: () => void;
}

export function MegaMenuViewport({
  activeMenu,
  locale,
  leftOffset,
  panelWidth,
  onMouseEnter,
  onMouseLeave,
  onClose
}: MegaMenuViewportProps) {
  const { copy } = useClipboard();

  if (!activeMenu) return null;

  const panels = getMegaMenuPanels(locale);
  const panel = panels[activeMenu];

  return (
    <div
      role="region"
      aria-label="Navigation submenu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ width: `${panelWidth}px`, left: `${leftOffset}px` }}
      className="absolute top-[calc(var(--header-h)+6px)] z-55 border border-strong bg-surface shadow-[var(--floating-shadow)] transition-[left,width] duration-170 ease-[cubic-bezier(0.2,0.8,0.2,1)] before:absolute before:-top-2.5 before:right-0 before:left-0 before:h-2.5 before:content-['']"
    >
      {panel.kind === "tools" ? (
        <div>
          <div className="eyebrow-mono px-3.5 pt-3 pb-1">{panel.sectionLabel}</div>
          <div className="grid grid-cols-1 gap-2.5 px-3 pt-2 pb-3 sm:grid-cols-2">
            {panel.studios.map((st) => (
              <Link
                key={st.href}
                href={st.href}
                onClick={onClose}
                className="flex flex-col justify-between gap-2.5 border border-hairline bg-canvas p-3 text-left transition-colors hover:border-accent-border hover:bg-elevated"
              >
                <div
                  className="flex h-[76px] w-full items-center justify-center border border-hairline p-2.5"
                  style={st.previewStyle}
                >
                  {st.isShadowCard ? (
                    <div className="flex h-11 w-[74%] items-center justify-between rounded-[6px] border border-white/16 bg-[#1d1d20] px-2.5 font-mono text-[9.5px] text-[#ececee] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_10px_24px_rgba(0,0,0,0.55)]">
                      <span>Surface</span>
                      <span className="text-accent-text">6px</span>
                    </div>
                  ) : (
                    <Badge className="bg-[#111113]/82 text-[#ececee]">CSS · Tailwind</Badge>
                  )}
                </div>
                <div>
                  <div className="eyebrow-mono text-accent-text">{st.badge}</div>
                  <div className="mt-[3px] text-[13.5px] font-semibold text-ink">{st.title}</div>
                  <div className="mt-1 line-clamp-2 text-xs leading-[1.45] text-muted">
                    {st.desc}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-hairline bg-code px-3.5 py-2">
            <span className="eyebrow-mono">{panel.footerTitle}</span>
            <div className="flex flex-wrap gap-1.5">
              {panel.quickPresets.map((qp) => (
                <Link key={qp.label} href={qp.href} onClick={onClose}>
                  <Badge className="text-body hover:border-accent-border hover:text-ink">
                    {qp.label} →
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : panel.kind === "mcp" ? (
        <div>
          <div className="flex items-center justify-between gap-2 px-3.5 pt-3 pb-1">
            <span className="eyebrow-mono">{panel.sectionLabel}</span>
            <Link
              href="/mcp"
              onClick={onClose}
              className="font-mono-ui text-[11.5px] text-accent-text hover:underline"
            >
              {panel.sandboxLabel}
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-1 px-3 pt-1.5 pb-3 sm:grid-cols-2">
            {panel.items.map((it) => (
              <Link
                key={it.title}
                href={it.href}
                onClick={onClose}
                className="flex flex-col gap-1 border border-transparent px-3 py-2.5 text-left transition-colors hover:border-hairline hover:bg-elevated"
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span className="text-[13px] font-semibold text-ink">{it.title}</span>
                  {it.badge ? <Badge>{it.badge}</Badge> : null}
                </div>
                <div className="line-clamp-2 text-xs leading-[1.42] text-muted">{it.desc}</div>
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-hairline bg-code px-3.5 py-2">
            <span className="font-mono-ui truncate text-[11px] text-muted">
              <span className="text-accent-text">$</span> {panel.cliInstall}
            </span>
            <button
              type="button"
              onClick={() => void copy(panel.cliInstall, "Copied MCP install command")}
              className="shrink-0 cursor-pointer"
            >
              <Badge className="text-ink hover:border-accent-border">Copy CLI</Badge>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-[224px_minmax(0,1fr)]">
            <Link
              href={panel.featured.href}
              onClick={onClose}
              className="hero-stripes flex flex-col justify-between gap-3.5 border-b border-hairline bg-canvas p-[18px] text-left transition-colors hover:bg-code md:border-r md:border-b-0"
            >
              <div className="grid gap-2">
                <Badge variant="accent" className="w-fit">
                  {panel.featured.badge}
                </Badge>
                <div className="text-[15.5px] leading-[1.22] font-bold tracking-[-0.02em] text-ink">
                  {panel.featured.title}
                </div>
                <p className="m-0 text-[12.5px] leading-[1.52] text-muted">
                  {panel.featured.desc}
                </p>
                {panel.featured.swatches ? (
                  <div className="mt-1 flex gap-[5px]">
                    {panel.featured.swatches.map((hex) => (
                      <span
                        key={hex}
                        className="inline-block h-2 flex-1 border border-strong"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                ) : panel.featured.pills ? (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {panel.featured.pills.map((p) => (
                      <Badge key={p}>{p}</Badge>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="font-mono-ui text-xs font-semibold text-accent-text">
                {panel.featured.cta}
              </div>
            </Link>

            <div className="grid min-w-0 content-start gap-2 p-3">
              <div className="eyebrow-mono px-2 pt-0.5">{panel.sectionLabel}</div>
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {panel.items.map((it) => (
                  <Link
                    key={it.title}
                    href={it.href}
                    onClick={onClose}
                    className="flex min-w-0 flex-col gap-1 border border-transparent px-3 py-2.5 text-left transition-colors hover:border-hairline hover:bg-elevated"
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="inline-flex min-w-0 items-center gap-[7px]">
                        {it.dot ? (
                          <span
                            className="inline-block h-[7px] w-[7px] shrink-0"
                            style={{ backgroundColor: it.dot }}
                          />
                        ) : null}
                        <span className="truncate text-[13px] font-semibold text-ink">
                          {it.title}
                        </span>
                      </span>
                      {it.badge ? <Badge>{it.badge}</Badge> : null}
                    </div>
                    <div className="line-clamp-2 text-xs leading-[1.42] text-muted">
                      {it.desc}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {panel.footerLinks ? (
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-hairline bg-code px-3.5 py-2">
              <span className="eyebrow-mono">{panel.footerTitle}</span>
              <div className="flex flex-wrap gap-1.5">
                {panel.footerLinks.map((fl) => (
                  <Link key={fl.label} href={fl.href} onClick={onClose}>
                    <Badge className="text-body hover:border-accent-border hover:text-ink">
                      {fl.label}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
