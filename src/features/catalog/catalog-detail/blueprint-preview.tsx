"use client";

import type { CatalogBrandSpec, CatalogPageSectionAnatomy } from "@/core/design-md";
import type { ThemeMode } from "@/core/tokens";
import { useClipboard } from "@/hooks/use-clipboard";
import { cn } from "@/lib/cn";

export interface BlueprintPageDef {
  readonly id: string;
  readonly titleZh: string;
  readonly titleEn: string;
  readonly path: string;
  readonly anatomy: readonly CatalogPageSectionAnatomy[];
}

export function getFallbackBlueprintPages(item: CatalogBrandSpec): readonly BlueprintPageDef[] {
  if (item.kind === "app") {
    return [
      {
        id: "home",
        titleZh: "主视图",
        titleEn: "Home",
        path: "/home",
        anatomy: [
          {
            index: "01",
            nameZh: "状态栏与顶部导航",
            nameEn: "Status & Top Nav",
            layoutZh: "单行紧凑",
            layoutEn: "Compact Bar",
            noteZh: `使用 ${item.fonts.display} 居中标题与轻量化操作图标。`,
            noteEn: `Compact mobile header in ${item.fonts.display} with minimal icon actions.`
          },
          {
            index: "02",
            nameZh: "核心实时状态卡",
            nameEn: "Primary Status Card",
            layoutZh: "圆角卡片",
            layoutEn: "Surface Card",
            noteZh: `圆角 ${item.defaultRadius}，配合等宽数字与高反差状态标签。`,
            noteEn: `Surface card with ${item.defaultRadius} radius and tabular-nums metrics.`
          },
          {
            index: "03",
            nameZh: "快捷操作列表与底栏",
            nameEn: "Action Sheet & Tab Bar",
            layoutZh: "拇指热区",
            layoutEn: "Thumb Zone",
            noteZh: `主操作按钮采用 ${item.dark.accent} 焦点色，单手轻松触达。`,
            noteEn: `Thumb-zone primary CTA anchored in ${item.dark.accent}.`
          }
        ]
      },
      {
        id: "detail",
        titleZh: "详情流",
        titleEn: "Detail",
        path: "/detail",
        anatomy: [
          {
            index: "01",
            nameZh: "顶部返回与标题头",
            nameEn: "Detail Header",
            layoutZh: "大字标题",
            layoutEn: "Large Title",
            noteZh: "明确返回层级，避免多层冗余面包屑。",
            noteEn: "Clean back navigation with focused header metadata."
          },
          {
            index: "02",
            nameZh: "数据明细与时间线",
            nameEn: "Telemetry Timeline",
            layoutZh: "纵向列表",
            layoutEn: "List Feed",
            noteZh: "1px 细线分割每一条记录，时间与数值等宽对齐。",
            noteEn: "1px hairline dividers separating aligned metric rows."
          }
        ]
      }
    ];
  }

  return [
    {
      id: "home",
      titleZh: "产品首页",
      titleEn: "Home",
      path: "/",
      anatomy: [
        {
          index: "01",
          nameZh: "顶部导航栏",
          nameEn: "Top Navigation",
          layoutZh: "单行三段",
          layoutEn: "3-Zone Bar",
          noteZh: `固定高度导航配 1px 边框，右侧放置 ${item.ctaLabel} 主按钮。`,
          noteEn: `Single-row header with 1px hairline border and "${item.ctaLabel}" CTA.`
        },
        {
          index: "02",
          nameZh: "首屏核心视觉与行动区",
          nameEn: "Hero Fold & Product Stage",
          layoutZh: "焦点排版",
          layoutEn: "Hero Stage",
          noteZh: `采用 ${item.fonts.display} 标题（字距 ${item.fonts.tracking}），克制留白。`,
          noteEn: `Headline set in ${item.fonts.display} (${item.fonts.tracking} tracking) over clean canvas.`
        },
        {
          index: "03",
          nameZh: "三栏特性矩阵",
          nameEn: "3-Column Feature Grid",
          layoutZh: "3 列网格",
          layoutEn: "3-Col Grid",
          noteZh: `统一 ${item.defaultRadius} 圆角卡片承载核心能力指标。`,
          noteEn: `Uniform ${item.defaultRadius} surface cards highlighting key metrics.`
        },
        {
          index: "04",
          nameZh: "底部号召与索引页脚",
          nameEn: "Closing CTA & Footer",
          layoutZh: "收口页脚",
          layoutEn: "Sitemap Footer",
          noteZh: "弱化次级链接色彩，保留清晰结构分割线。",
          noteEn: "Muted footer links anchored by subtle hairline dividers."
        }
      ]
    },
    {
      id: "pricing",
      titleZh: "定价方案",
      titleEn: "Pricing",
      path: "/pricing",
      anatomy: [
        {
          index: "01",
          nameZh: "套餐切换与标题头",
          nameEn: "Billing Toggle Header",
          layoutZh: "居中开关",
          layoutEn: "Centered Header",
          noteZh: "月付 / 年付切换开关配清晰折扣标签。",
          noteEn: "Monthly/yearly segmented toggle paired with concise subtitle."
        },
        {
          index: "02",
          nameZh: "三档对比卡片组",
          nameEn: "3-Tier Pricing Grid",
          layoutZh: "3 列对比",
          layoutEn: "3-Col Tiers",
          noteZh: `主推套餐使用 ${item.dark.accent} 焦点色边框或实心主按钮突出。`,
          noteEn: `Recommended tier highlighted cleanly via ${item.dark.accent} accent CTA.`
        }
      ]
    },
    {
      id: "login",
      titleZh: "登录入口",
      titleEn: "Login",
      path: "/login",
      anatomy: [
        {
          index: "01",
          nameZh: "居中极简认证卡片",
          nameEn: "Centered Auth Card",
          layoutZh: "单卡居中",
          layoutEn: "Single Card",
          noteZh: "聚焦邮箱与单点登录入口，无多余营销干扰。",
          noteEn: "Distraction-free authentication card with SSO & email flow."
        }
      ]
    }
  ];
}

export function CatalogBlueprintPages({
  item,
  pageId,
  vp,
  mode,
  selectedIdx,
  hoveredIdx,
  onSelectSection,
  onHoverChange
}: {
  readonly item: CatalogBrandSpec;
  readonly pageId: string;
  readonly vp: "desktop" | "mobile";
  readonly mode: ThemeMode;
  readonly selectedIdx: number | null;
  readonly hoveredIdx: number | null;
  readonly onSelectSection: (idx: number) => void;
  readonly onHoverChange: (idx: number | null) => void;
}) {
  const p = mode === "light" ? item.light : item.dark;
  const fontDisplay = item.fonts.serif ? "var(--font-serif)" : "var(--font-sans)";
  const isMobile = vp === "mobile" || item.kind === "app";

  const frameStyle = (idx: number) => {
    const isSel = selectedIdx === idx;
    const isHov = hoveredIdx === idx && !isSel;
    return {
      outline: isSel
        ? "2px solid #FF4D4F"
        : isHov
          ? "1px dashed rgba(255,77,79,0.75)"
          : "1px solid transparent",
      outlineOffset: "-2px"
    };
  };

  return (
    <div
      className={cn(
        "mx-auto min-h-[calc(100dvh-var(--header-h)-44px)] transition-all duration-200",
        isMobile ? "my-5 max-w-[390px] border" : "w-full"
      )}
      style={{
        backgroundColor: p.canvas,
        color: p.ink,
        borderColor: isMobile ? p.border : "transparent"
      }}
    >
      {pageId === "pricing" ? (
        <div className="grid gap-6 px-8 py-12">
          <div
            onClick={() => onSelectSection(0)}
            onMouseEnter={() => onHoverChange(0)}
            onMouseLeave={() => onHoverChange(null)}
            className="cursor-pointer p-4 text-center"
            style={frameStyle(0)}
          >
            <div className="font-mono text-[10px] uppercase" style={{ color: p.accent }}>
              {item.name} Pricing
            </div>
            <div
              className="mt-2 text-3xl font-semibold"
              style={{ fontFamily: fontDisplay, letterSpacing: item.fonts.tracking }}
            >
              Simple, transparent plans
            </div>
            <div
              className="mx-auto mt-4 inline-flex border p-0.5 text-[11px]"
              style={{
                backgroundColor: p.surface,
                borderColor: p.border,
                borderRadius: item.defaultRadius
              }}
            >
              <span className="px-3 py-1 font-semibold" style={{ backgroundColor: p.elevated }}>
                Monthly
              </span>
              <span className="px-3 py-1" style={{ color: p.muted }}>
                Yearly -20%
              </span>
            </div>
          </div>

          <div
            onClick={() => onSelectSection(1)}
            onMouseEnter={() => onHoverChange(1)}
            onMouseLeave={() => onHoverChange(null)}
            className={cn("grid cursor-pointer gap-4 p-2", isMobile ? "grid-cols-1" : "grid-cols-3")}
            style={frameStyle(1)}
          >
            {[
              { name: "Free", price: "$0", featured: false },
              { name: "Pro", price: "$24", featured: true },
              { name: "Team", price: "$79", featured: false }
            ].map((tier) => (
              <div
                key={tier.name}
                className="flex flex-col justify-between gap-5 border p-5"
                style={{
                  backgroundColor: p.surface,
                  borderColor: tier.featured ? p.accent : p.border,
                  borderRadius: item.defaultRadius
                }}
              >
                <div>
                  <div className="text-xs font-semibold">{tier.name}</div>
                  <div className="font-mono mt-2 text-3xl font-bold tabular-nums">{tier.price}</div>
                  <div className="mt-4 grid gap-2">
                    <div className="h-1.5 w-4/5" style={{ backgroundColor: p.border }} />
                    <div className="h-1.5 w-2/3" style={{ backgroundColor: p.border }} />
                  </div>
                </div>
                <span
                  className="inline-flex h-9 items-center justify-center text-xs font-semibold"
                  style={{
                    backgroundColor: tier.featured ? p.accent : p.elevated,
                    color: tier.featured ? p.accentFg : p.ink,
                    borderRadius: item.defaultRadius
                  }}
                >
                  {item.ctaLabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : pageId === "login" || pageId === "detail" ? (
        <div
          onClick={() => onSelectSection(0)}
          onMouseEnter={() => onHoverChange(0)}
          onMouseLeave={() => onHoverChange(null)}
          className="flex min-h-[540px] cursor-pointer items-center justify-center p-8"
          style={frameStyle(0)}
        >
          <div
            className="grid w-full max-w-[360px] gap-4 border p-6"
            style={{
              backgroundColor: p.surface,
              borderColor: p.border,
              borderRadius: item.defaultRadius
            }}
          >
            <div className="text-center">
              <div className="text-base font-semibold">{item.name}</div>
              <div className="mt-1 text-xs" style={{ color: p.muted }}>
                {pageId === "detail" ? "Live activity stream" : "Sign in to workspace"}
              </div>
            </div>
            <div
              className="h-9 border px-3 text-xs leading-9"
              style={{
                backgroundColor: p.canvas,
                borderColor: p.border,
                borderRadius: item.defaultRadius,
                color: p.muted
              }}
            >
              name@company.com
            </div>
            <div
              className="flex h-9 items-center justify-center text-xs font-semibold"
              style={{
                backgroundColor: p.accent,
                color: p.accentFg,
                borderRadius: item.defaultRadius
              }}
            >
              {item.ctaLabel}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid">
          {/* 01 Navbar */}
          <div
            onClick={() => onSelectSection(0)}
            onMouseEnter={() => onHoverChange(0)}
            onMouseLeave={() => onHoverChange(null)}
            className="flex cursor-pointer items-center justify-between border-b px-7 py-4"
            style={{ borderColor: p.border, ...frameStyle(0) }}
          >
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="inline-block h-2.5 w-2.5" style={{ backgroundColor: p.accent }} />
              <span>{item.name}</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]" style={{ color: p.muted }}>
              {!isMobile ? (
                <>
                  <span>Product</span>
                  <span>Pricing</span>
                  <span>Docs</span>
                </>
              ) : null}
              <span
                className="px-3 py-1 font-semibold"
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

          {/* 02 Hero */}
          <div
            onClick={() => onSelectSection(1)}
            onMouseEnter={() => onHoverChange(1)}
            onMouseLeave={() => onHoverChange(null)}
            className="cursor-pointer px-8 py-16 text-center"
            style={frameStyle(1)}
          >
            <span
              className="inline-block border px-2.5 py-0.5 font-mono text-[10px]"
              style={{
                borderColor: p.border,
                backgroundColor: p.surface,
                color: p.accent,
                borderRadius: item.defaultRadius
              }}
            >
              {item.platformLabel}
            </span>
            <h2
              className="mx-auto mt-4 max-w-[600px] text-[34px] leading-[1.08] font-semibold"
              style={{ fontFamily: fontDisplay, letterSpacing: item.fonts.tracking }}
            >
              {item.summaryEn}
            </h2>
            <div className="mt-6 flex justify-center gap-2.5">
              <span
                className="inline-flex h-9 items-center px-4 text-xs font-semibold"
                style={{
                  backgroundColor: p.accent,
                  color: p.accentFg,
                  borderRadius: item.defaultRadius
                }}
              >
                {item.ctaLabel}
              </span>
              <span
                className="inline-flex h-9 items-center border px-4 text-xs"
                style={{
                  backgroundColor: p.surface,
                  borderColor: p.border,
                  borderRadius: item.defaultRadius
                }}
              >
                Explore
              </span>
            </div>
          </div>

          {/* 03 Bento / Feature Grid */}
          <div
            onClick={() => onSelectSection(2)}
            onMouseEnter={() => onHoverChange(2)}
            onMouseLeave={() => onHoverChange(null)}
            className={cn(
              "grid cursor-pointer gap-4 border-t px-8 py-10",
              isMobile ? "grid-cols-1" : "grid-cols-3"
            )}
            style={{ borderColor: p.border, ...frameStyle(2) }}
          >
            {[
              ["Latency P95", "11.2 ms"],
              ["Design Radius", item.defaultRadius],
              ["Display Font", item.fonts.display]
            ].map(([k, v]) => (
              <div
                key={k}
                className="border p-5"
                style={{
                  backgroundColor: p.surface,
                  borderColor: p.border,
                  borderRadius: item.defaultRadius
                }}
              >
                <div className="text-[11px]" style={{ color: p.muted }}>
                  {k}
                </div>
                <div className="font-mono mt-2 truncate text-base font-semibold">{v}</div>
              </div>
            ))}
          </div>

          {/* 04 Footer */}
          {item.kind === "website" ? (
            <div
              onClick={() => onSelectSection(3)}
              onMouseEnter={() => onHoverChange(3)}
              onMouseLeave={() => onHoverChange(null)}
              className="flex cursor-pointer items-center justify-between border-t px-8 py-6 text-[11px]"
              style={{ borderColor: p.border, color: p.muted, ...frameStyle(3) }}
            >
              <span>© {item.name}</span>
              <span className="font-mono">{item.slug}</span>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export function CatalogBlueprintSections({
  item,
  isZh
}: {
  readonly item: CatalogBrandSpec;
  readonly isZh: boolean;
}) {
  const { copy } = useClipboard();
  const p = item.dark;
  const fontDisplay = item.fonts.serif ? "var(--font-serif)" : "var(--font-sans)";

  const cards = [
    {
      idx: "01",
      titleZh: "顶栏导航标本",
      titleEn: "Navbar Specimen",
      css: `background: ${p.canvas}; border-bottom: 1px solid ${p.border}; height: 56px;`,
      render: (
        <div
          className="flex items-center justify-between border px-4 py-3"
          style={{ backgroundColor: p.canvas, borderColor: p.border, color: p.ink }}
        >
          <span className="text-xs font-bold">{item.name}</span>
          <span
            className="px-2.5 py-1 text-[11px] font-semibold"
            style={{ backgroundColor: p.accent, color: p.accentFg, borderRadius: item.defaultRadius }}
          >
            {item.ctaLabel}
          </span>
        </div>
      )
    },
    {
      idx: "02",
      titleZh: "首屏标题与行动按钮",
      titleEn: "Hero Headline & CTA",
      css: `font-family: ${item.fonts.display}; letter-spacing: ${item.fonts.tracking}; border-radius: ${item.defaultRadius};`,
      render: (
        <div className="border p-6" style={{ backgroundColor: p.canvas, borderColor: p.border, color: p.ink }}>
          <div
            className="text-xl font-semibold"
            style={{ fontFamily: fontDisplay, letterSpacing: item.fonts.tracking }}
          >
            {item.name} Interface System
          </div>
          <div className="mt-3 flex gap-2">
            <span
              className="px-3 py-1.5 text-xs font-semibold"
              style={{ backgroundColor: p.accent, color: p.accentFg, borderRadius: item.defaultRadius }}
            >
              {item.ctaLabel}
            </span>
            <span
              className="border px-3 py-1.5 text-xs"
              style={{
                backgroundColor: p.surface,
                borderColor: p.border,
                borderRadius: item.defaultRadius
              }}
            >
              Secondary
            </span>
          </div>
        </div>
      )
    },
    {
      idx: "03",
      titleZh: "表面卡片与等宽指标",
      titleEn: "Surface Card & Metrics",
      css: `background: ${p.surface}; border: 1px solid ${p.border}; border-radius: ${item.defaultRadius};`,
      render: (
        <div
          className="grid grid-cols-2 gap-3 p-4"
          style={{ backgroundColor: p.canvas, color: p.ink }}
        >
          {[
            ["Availability", "99.98%"],
            ["Radius", item.defaultRadius]
          ].map(([k, v]) => (
            <div
              key={k}
              className="border p-3.5"
              style={{
                backgroundColor: p.surface,
                borderColor: p.border,
                borderRadius: item.defaultRadius
              }}
            >
              <div className="text-[11px]" style={{ color: p.muted }}>
                {k}
              </div>
              <div className="font-mono mt-1 text-base font-bold tabular-nums">{v}</div>
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="grid gap-4">
      {cards.map((c) => (
        <div key={c.idx} className="overflow-hidden border border-hairline bg-surface">
          <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-ink">
              <span className="font-mono text-accent-text">{c.idx}</span>
              <span>{isZh ? c.titleZh : c.titleEn}</span>
            </div>
            <button
              type="button"
              onClick={() => void copy(c.css, `Copied ${c.titleEn} CSS`)}
              className="cursor-pointer font-mono text-[11px] text-accent-text hover:underline"
            >
              {isZh ? "复制样式" : "Copy CSS"}
            </button>
          </div>
          <div className="bg-code p-4">{c.render}</div>
        </div>
      ))}
    </div>
  );
}
