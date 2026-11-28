"use client";

import { useLocale } from "next-intl";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { DualSwatch } from "@/components/primitives/dual-swatch";
import { StyleMiniPreview } from "@/features/styles/specimens/mini-card-preview";
import { Link } from "@/i18n/navigation";
import { STYLE_ITEMS } from "@/registry/styles";
import { TEMPLATE_ITEMS } from "@/registry/templates";

export function HomeStylesAndTemplatesStrip() {
  const locale = useLocale();
  const isZh = locale === "zh";

  const featuredStyles = STYLE_ITEMS.slice(0, 4);
  const featuredTemplates = TEMPLATE_ITEMS.slice(0, 3);

  return (
    <div className="band-full">
      <section className="shell-wrap">
        <div className="border-hairline flex flex-wrap items-center justify-between gap-3 border-b px-6 py-[18px]">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="heading-section">
              {isZh ? "通用设计风格与模板" : "UI Styles & Starter Templates"}
            </h2>
            <Badge variant="accent">10 Styles · 12 Templates</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/styles">
              <Button variant="hairline">{isZh ? "全部风格 →" : "All Styles →"}</Button>
            </Link>
            <Link href="/templates">
              <Button variant="hairline">{isZh ? "全部模板 →" : "All Templates →"}</Button>
            </Link>
          </div>
        </div>

        {/* 4 Styles Row */}
        <div className="lined-grid-4 border-hairline border-b">
          {featuredStyles.map((style) => (
            <div key={style.slug} className="lined-cell">
              <Link href={`/styles/${style.slug}`} className="group flex flex-col gap-2.5 p-5">
                <div className="border-hairline group-hover:border-accent-border overflow-hidden border transition-colors">
                  <StyleMiniPreview style={style} mode={style.primaryTone} isZh={isZh} />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-2">
                    <DualSwatch swatch={style.swatch} />
                    <span className="text-ink truncate text-sm font-semibold">
                      {isZh ? style.nameZh : style.name}
                    </span>
                  </span>
                  <span className="text-subtle font-mono text-[11px]">
                    R:{style.defaultRadius}px
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* 3 Templates Row */}
        <div className="lined-grid-3">
          {featuredTemplates.map((tpl) => (
            <div key={tpl.id} className="lined-cell">
              <Link
                href={`/templates/${tpl.id}`}
                className="group hover:bg-surface flex h-full flex-col justify-between gap-3 p-6 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="eyebrow-mono text-accent-text">
                      {tpl.kind === "starter"
                        ? isZh
                          ? "整站工程"
                          : "STARTER KIT"
                        : isZh
                          ? "单页模板"
                          : "SINGLE PAGE"}
                    </span>
                    <Badge>{tpl.routes.length} routes</Badge>
                  </div>
                  <div className="text-ink group-hover:text-accent-text mt-2 text-[15px] font-semibold">
                    {isZh ? tpl.nameZh : tpl.name}
                  </div>
                  <p className="text-muted mt-1 line-clamp-2 text-[12.5px] leading-[1.5]">
                    {isZh ? tpl.descZh : tpl.descEn}
                  </p>
                </div>
                <div className="text-subtle flex items-center justify-between font-mono text-[11px]">
                  <span>{tpl.skinLabel}</span>
                  <span className="text-ink">{isZh ? "打开沙盒 →" : "Live Sandbox →"}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
