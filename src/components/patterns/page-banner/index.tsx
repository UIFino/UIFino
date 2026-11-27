import { Fragment } from "react";
import { Link } from "@/i18n/navigation";

export interface BreadcrumbItem {
  readonly label: string;
  readonly href?: string;
}

export interface PageBannerProps {
  readonly breadcrumbs: readonly BreadcrumbItem[];
  readonly title: string;
  readonly description?: string;
}

export function PageBanner({ breadcrumbs, title, description }: PageBannerProps) {
  return (
    <div className="band-full">
      <section className="shell-wrap hero-stripes relative px-5 py-[30px] sm:px-9 sm:py-[44px]">
        <span className="crosshair-plus -bottom-[6px] -left-[6px]" aria-hidden="true" />
        <span className="crosshair-plus -right-[6px] -bottom-[6px]" aria-hidden="true" />
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-[7px] font-mono text-xs text-subtle"
        >
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <Fragment key={`${crumb.label}-${index}`}>
                {!isLast && crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-ink">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={isLast ? "font-medium text-ink" : undefined}>{crumb.label}</span>
                )}
                {!isLast && <span aria-hidden="true">/</span>}
              </Fragment>
            );
          })}
        </nav>
        <h1 className="mt-3 text-[clamp(28px,3.2vw,38px)] leading-[1.1] font-bold tracking-[-0.03em] text-ink">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.62] text-muted">{description}</p>
        ) : null}
      </section>
    </div>
  );
}
