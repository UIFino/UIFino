"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import type { CatalogBrandSpec } from "@/core/design-md";
import { Link } from "@/i18n/navigation";
import { CATALOG_CATEGORY_LABELS } from "@/registry/catalog";

export interface CatalogDetailHeaderProps {
  readonly item: CatalogBrandSpec;
  readonly isZh: boolean;
  readonly onCopyCss: () => void;
  readonly onCopyMd: () => void;
  readonly onDownloadMd: () => void;
  readonly onApplySkin: () => void;
}

export function CatalogDetailHeader({
  item,
  isZh,
  onCopyCss,
  onCopyMd,
  onDownloadMd,
  onApplySkin
}: CatalogDetailHeaderProps) {
  const t = useTranslations("catalog");
  const tCommon = useTranslations("common");

  const siteHref =
    item.siteUrl ?? (item.kind === "website" ? `https://${item.slug}` : undefined);

  const catLabel = isZh
    ? CATALOG_CATEGORY_LABELS[item.category].zh
    : CATALOG_CATEGORY_LABELS[item.category].en;

  const shortTags = isZh
    ? (item.shortTagsZh ?? [
        item.kind === "app" ? "移动应用" : "桌面网站",
        catLabel,
        `圆角 ${item.defaultRadius}`
      ])
    : (item.shortTagsEn ?? [
        item.kind === "app" ? "Mobile App" : "Website",
        catLabel,
        `Radius ${item.defaultRadius}`
      ]);

  const goodFor = isZh
    ? (item.goodForZh ??
      (item.kind === "app"
        ? ["工具型移动应用", "实时状态卡片", "单手底部导航页"]
        : ["产品宣传官网", "SaaS 定价方案页", "更新日志与文档", "极简登录认证页"]))
    : (item.goodForEn ??
      (item.kind === "app"
        ? ["Utility Mobile Apps", "Live Status Cards", "Thumb-Zone Sheets"]
        : ["Product Marketing", "SaaS Pricing", "Changelogs & Docs", "Minimal Auth"]));

  const notFor = isZh
    ? (item.notForZh ?? ["促销大卖场电商", "高饱和节日活动页", "多图密集资讯门户"])
    : (item.notForEn ?? ["Flash-Sale Marketplaces", "Festive Promo Pages", "Tabloid Portals"]);

  return (
    <div className="border-b border-hairline px-7 pt-7 pb-6">
      <nav className="font-mono-ui flex flex-wrap items-center gap-1.5 text-xs text-muted">
        <Link href="/catalog" className="hover:text-ink">
          {tCommon("navCatalog")}
        </Link>
        <span>/</span>
        <span>{catLabel}</span>
        <span>/</span>
        <span className="text-ink">{item.name}</span>
      </nav>

      {/* Top Row: Title + Live Link + Tags | 4 Action Buttons */}
      <div className="mt-3 flex flex-col justify-between gap-4 xl:flex-row xl:items-start">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="m-0 text-[clamp(24px,2.6vw,32px)] font-semibold tracking-[-0.02em] text-ink">
              {item.name}
            </h1>
            {siteHref ? (
              <a
                href={siteHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-7 items-center border border-hairline bg-surface px-2.5 font-mono text-xs text-accent-text transition-colors hover:border-accent-border"
              >
                {t("visitSite")}
              </a>
            ) : null}
            {shortTags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          <p className="mt-2.5 max-w-[780px] text-[14.5px] leading-[1.6] text-body">
            {isZh ? item.summaryZh : item.summaryEn}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Button variant="contrast" size="md" onClick={onCopyCss}>
            {t("copyCss")}
          </Button>
          <Button variant="hairline" size="md" onClick={onCopyMd}>
            {t("copyMd")}
          </Button>
          <Button variant="hairline" size="md" onClick={onDownloadMd}>
            {t("downloadMd")}
          </Button>
          <Button variant="lime" size="md" onClick={onApplySkin}>
            {t("applyInWorkbench")}
          </Button>
        </div>
      </div>

      {/* Positive / Negative Fit Bar */}
      <div className="mt-5 grid grid-cols-1 gap-2.5 lg:grid-cols-2">
        <div className="flex flex-wrap items-center gap-2 border border-hairline bg-surface px-3.5 py-2.5 text-xs">
          <span className="font-mono-ui shrink-0 font-semibold text-accent-text">
            {t("goodForLabel")}
          </span>
          <span className="text-ink">{goodFor.join(" · ")}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 border border-hairline bg-surface px-3.5 py-2.5 text-xs">
          <span className="font-mono-ui shrink-0 font-semibold text-subtle">
            {t("notForLabel")}
          </span>
          <span className="text-muted">{notFor.join(" · ")}</span>
        </div>
      </div>
    </div>
  );
}
