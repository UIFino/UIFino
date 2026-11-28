import type { CatalogBrandSpec } from "@/core/design-md";
import type { ThemeMode } from "@/core/tokens";
import { cn } from "@/lib/cn";

export interface BrandLogoMarkProps {
  readonly item: CatalogBrandSpec;
  readonly className?: string;
}

export function BrandLogoMark({ item, className }: BrandLogoMarkProps) {
  if (item.logoSvg) {
    return (
      <span
        aria-hidden="true"
        className={cn("inline-flex h-4 w-4 shrink-0 items-center justify-center text-ink [&>svg]:h-full [&>svg]:w-full", className)}
        dangerouslySetInnerHTML={{ __html: item.logoSvg }}
      />
    );
  }

  if (item.logoUrl) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={item.logoUrl}
        alt=""
        aria-hidden="true"
        className={cn("h-4 w-4 shrink-0 object-contain", className)}
      />
    );
  }

  return null;
}

export interface BrandPortraitProps {
  readonly item: CatalogBrandSpec;
  readonly mode?: ThemeMode;
}

export function BrandPortrait({ item, mode = "dark" }: BrandPortraitProps) {
  const p = mode === "light" ? item.light : item.dark;
  const fontFam = item.fonts.serif ? "var(--font-serif)" : "var(--font-sans)";
  const coverSrc = item.coverImg ?? item.scraped?.pages[0]?.desktopImg;

  if (coverSrc) {
    return (
      <div className="relative h-full w-full overflow-hidden" style={{ backgroundColor: p.canvas }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverSrc}
          alt={`${item.name} hero cover`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
        />
        <div className="absolute inset-x-2.5 bottom-2.5 flex gap-1">
          {[p.canvas, p.surface, p.border, p.ink, p.accent].map((hex, i) => (
            <span
              key={`${hex}-${i}`}
              className="inline-block h-1.5 flex-1 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)]"
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (item.kind === "app") {
    return (
      <div
        className="flex h-full w-full items-center justify-center p-[18px]"
        style={{ backgroundColor: mode === "light" ? "#E8EAEF" : "#111215" }}
      >
        <div
          className="flex h-[94%] w-[78%] flex-col justify-between rounded-[22px] border-2 px-3 py-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.35)]"
          style={{
            backgroundColor: p.canvas,
            color: p.ink,
            borderColor: p.border
          }}
        >
          <div>
            <div
              className="flex items-center justify-between font-mono text-[9px]"
              style={{ color: p.muted }}
            >
              <span>09:41</span>
              <span
                className="inline-block h-1.5 w-[34px] rounded-full"
                style={{ backgroundColor: p.border }}
              />
              <span>5G</span>
            </div>
            <div
              className="mt-3 font-mono text-[9px] uppercase"
              style={{ color: p.accent }}
            >
              {item.platformLabel}
            </div>
            <div className="mt-[3px] text-sm leading-[1.15] font-bold tracking-[-0.02em]">
              {item.name}
            </div>
          </div>

          <div className="my-auto grid gap-[7px]">
            <div
              className="rounded-xl border p-[9px]"
              style={{ backgroundColor: p.surface, borderColor: p.border }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9.5px]" style={{ color: p.muted }}>
                  LIVE STATUS
                </span>
                <span
                  className="font-mono text-[9.5px] font-bold"
                  style={{ color: p.accent }}
                >
                  ACTIVE
                </span>
              </div>
              <div className="font-mono-ui mt-[5px] text-base font-bold">99.94%</div>
            </div>
            <div
              className="flex items-center justify-between rounded-xl border p-2"
              style={{ backgroundColor: p.surface, borderColor: p.border }}
            >
              <div
                className="h-1.5 w-[52%] rounded-[3px]"
                style={{ backgroundColor: p.border }}
              />
              <span className="font-mono-ui text-[9px]" style={{ color: p.muted }}>
                +18.2%
              </span>
            </div>
          </div>

          <div
            className="flex h-7 items-center justify-center rounded-full text-[10.5px] font-semibold"
            style={{ backgroundColor: p.accent, color: p.accentFg }}
          >
            {item.ctaLabel}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex h-full w-full flex-col justify-between p-3.5"
      style={{ backgroundColor: p.canvas, color: p.ink }}
    >
      <div>
        <div
          className="flex items-center justify-between border-b pb-[9px]"
          style={{ borderColor: p.border }}
        >
          <div className="flex items-center gap-1.5">
            <span
              className="inline-block h-2 w-2 rounded-[2px]"
              style={{ backgroundColor: p.accent }}
            />
            <span className="text-[11px] font-bold tracking-[-0.02em]">{item.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="inline-block h-1 w-5"
              style={{ backgroundColor: p.border }}
            />
            <span
              className="px-1.5 py-0.5 text-[8.5px] font-semibold"
              style={{
                backgroundColor: p.accent,
                color: p.accentFg,
                borderRadius: item.defaultRadius
              }}
            >
              {item.ctaLabel}
            </span>
          </div>
        </div>

        <div className="px-0.5 pt-3.5 pb-2.5">
          <div
            className="font-mono text-[8.5px] tracking-[0.08em] uppercase"
            style={{ color: p.muted }}
          >
            {item.category}
          </div>
          <div
            className="mt-[5px] leading-[1.12] font-semibold"
            style={{
              fontFamily: fontFam,
              fontSize: item.fonts.serif ? "19px" : "16px",
              letterSpacing: item.fonts.tracking
            }}
          >
            Precision interface system built for shipping.
          </div>
          <div
            className="mt-2 h-[5px] w-[78%] rounded-[2px]"
            style={{ backgroundColor: p.border }}
          />
        </div>
      </div>

      <div className="grid gap-[7px]">
        <div
          className="border p-[9px]"
          style={{
            backgroundColor: p.surface,
            borderColor: p.border,
            borderRadius: item.defaultRadius
          }}
        >
          <div
            className="flex justify-between font-mono text-[8.5px]"
            style={{ color: p.muted }}
          >
            <span>DESIGN.md</span>
            <span style={{ color: p.accent }}>{item.defaultRadius}</span>
          </div>
          <div className="mt-[7px] grid grid-cols-3 gap-[5px]">
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                className="h-[26px] rounded-[3px] border"
                style={{ backgroundColor: p.elevated, borderColor: p.border }}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-1">
          {[p.canvas, p.surface, p.border, p.ink, p.accent].map((hex, i) => (
            <span
              key={`${hex}-${i}`}
              className="inline-block h-1.5 flex-1 border"
              style={{ backgroundColor: hex, borderColor: p.border }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
