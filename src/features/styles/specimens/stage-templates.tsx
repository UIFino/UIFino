"use client";

import { useState, type CSSProperties } from "react";
import type { ResolvedStylePlaygroundPhysics, UiStyleSpec } from "@/core/styles";

export interface StageTemplateContext {
  readonly style: UiStyleSpec;
  readonly physics: ResolvedStylePlaygroundPhysics;
  readonly cardStyle: CSSProperties;
  readonly isZh: boolean;
}

export function LandingStageTemplate({ style, physics: p, cardStyle, isZh }: StageTemplateContext) {
  const { palette } = p;
  const featureCards = isZh
    ? [
        { code: "01", title: "双色令牌契约", desc: "画布底色、表面层级与主按钮高对比配对一次锁定。" },
        { code: "02", title: "圆角与边框物理", desc: "卡片与按钮圆角比例联动，拒绝混搭失真。" },
        { code: "03", title: "零依赖导出", desc: "一键输出 CSS 变量与 Tailwind v4 @theme。" }
      ]
    : [
        { code: "01", title: "Token Contract", desc: "Synchronized canvas, surface, border & high-contrast CTA." },
        { code: "02", title: "Surface Physics", desc: "Proportionally scaled card and control corner radii." },
        { code: "03", title: "CSS & Tailwind v4", desc: "Zero-dependency variables ready for production." }
      ];

  return (
    <div className="grid gap-4">
      <div
        className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5"
        style={cardStyle}
      >
        <div className="flex items-center gap-2 font-semibold text-sm" style={{ fontFamily: p.fontDisplayCss }}>
          <span
            className="inline-block h-2.5 w-2.5"
            style={{ backgroundColor: palette.accent, borderRadius: `${p.badgeRadiusPx}px` }}
          />
          <span>{isZh ? style.nameZh : style.name} Studio</span>
        </div>
        <div className="hidden items-center gap-5 text-xs sm:flex" style={{ color: palette.muted }}>
          <span>{isZh ? "产品特性" : "Features"}</span>
          <span>{isZh ? "定价" : "Pricing"}</span>
          <span>{isZh ? "文档" : "Docs"}</span>
        </div>
        <button
          type="button"
          className="h-8 px-3.5 text-xs font-semibold"
          style={{
            backgroundColor: palette.accent,
            color: palette.accentFg,
            borderRadius: `${p.ctrlRadiusPx}px`,
            boxShadow: p.buttonShadow
          }}
        >
          {isZh ? "立即接入" : "Get Started"}
        </button>
      </div>

      <div className="grid gap-4 px-5 py-7 text-center" style={cardStyle}>
        <div className="mx-auto">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[11px] font-medium"
            style={{
              backgroundColor: p.elevatedAlphaBg,
              color: palette.accent,
              border: `1px solid ${palette.border}`,
              borderRadius: `${p.badgeRadiusPx}px`
            }}
          >
            {isZh ? `${style.nameZh}视觉体系 · 实景样板` : `${style.name} System · Live Spec`}
          </span>
        </div>
        <h3
          className="mx-auto max-w-[600px] text-[clamp(22px,3vw,34px)] leading-[1.12] font-bold"
          style={{ fontFamily: p.fontDisplayCss, letterSpacing: p.letterSpacing }}
        >
          {isZh ? "用真实材质与色阶打造第一眼质感" : "Ship authentic interfaces with calibrated surface physics."}
        </h3>
        <p className="mx-auto max-w-[520px] text-sm leading-relaxed" style={{ color: palette.muted }}>
          {isZh ? style.summaryZh : style.summaryEn}
        </p>
        <div className="mt-1 flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            className="h-10 px-5 text-sm font-semibold"
            style={{
              backgroundColor: palette.accent,
              color: palette.accentFg,
              borderRadius: `${p.ctrlRadiusPx}px`,
              boxShadow: p.buttonShadow
            }}
          >
            {isZh ? "复制设计变量 →" : "Copy Design Tokens →"}
          </button>
          <button
            type="button"
            className="h-10 px-5 text-sm font-medium"
            style={{
              backgroundColor: p.elevatedAlphaBg,
              color: palette.ink,
              border: `${p.borderWidthPx}px solid ${palette.border}`,
              borderRadius: `${p.ctrlRadiusPx}px`
            }}
          >
            {isZh ? "浏览组件库" : "Browse Components"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
        {featureCards.map((fc) => (
          <div key={fc.code} className="grid gap-1.5 p-4" style={cardStyle}>
            <span className="font-mono text-[11px] font-semibold" style={{ color: palette.accent }}>
              {fc.code}
            </span>
            <div className="text-sm font-semibold" style={{ fontFamily: p.fontDisplayCss }}>
              {fc.title}
            </div>
            <p className="text-xs leading-relaxed" style={{ color: palette.muted }}>
              {fc.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardsAuthStageTemplate({ physics: p, cardStyle, isZh }: StageTemplateContext) {
  const { palette } = p;
  const [email, setEmail] = useState("alex@uifino.dev");
  const [autoSync, setAutoSync] = useState(true);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Left: Sign In / Passkey Card */}
      <div className="grid gap-3.5 p-5" style={cardStyle}>
        <div>
          <div className="text-base font-semibold" style={{ fontFamily: p.fontDisplayCss }}>
            {isZh ? "登录工作区" : "Sign in to workspace"}
          </div>
          <p className="mt-1 text-xs" style={{ color: palette.muted }}>
            {isZh ? "输入企业邮箱或使用硬件 Passkey 快速认证。" : "Authenticate with enterprise SSO or security passkey."}
          </p>
        </div>

        <div className="grid gap-1.5">
          <span className="text-xs font-medium">{isZh ? "工作邮箱" : "Work Email"}</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-9 px-3 text-xs outline-none"
            style={{
              backgroundColor: p.elevatedAlphaBg,
              color: palette.ink,
              border: `${p.borderWidthPx}px solid ${palette.border}`,
              borderRadius: `${p.ctrlRadiusPx}px`,
              boxShadow: p.inputInsetShadow
            }}
          />
        </div>

        <button
          type="button"
          className="h-9 w-full cursor-pointer text-xs font-semibold"
          style={{
            backgroundColor: palette.accent,
            color: palette.accentFg,
            borderRadius: `${p.ctrlRadiusPx}px`,
            boxShadow: p.buttonShadow
          }}
        >
          {isZh ? "发送登录验证链接" : "Continue with Email"}
        </button>

        <button
          type="button"
          className="h-9 w-full cursor-pointer text-xs font-medium"
          style={{
            backgroundColor: p.elevatedAlphaBg,
            color: palette.ink,
            border: `${p.borderWidthPx}px solid ${palette.border}`,
            borderRadius: `${p.ctrlRadiusPx}px`
          }}
        >
          {isZh ? "使用 Passkey 密钥登录" : "Sign in with Passkey"}
        </button>
      </div>

      {/* Right: Subscription Plan + Notification Toggle Card */}
      <div className="grid gap-3.5">
        <div className="grid gap-2.5 p-5" style={cardStyle}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold" style={{ fontFamily: p.fontDisplayCss }}>
              Pro Workspace
            </span>
            <span
              className="px-2 py-0.5 font-mono text-[10.5px] font-semibold"
              style={{
                backgroundColor: p.elevatedAlphaBg,
                color: palette.accent,
                borderRadius: `${p.badgeRadiusPx}px`
              }}
            >
              ACTIVE
            </span>
          </div>
          <div className="text-2xl font-bold tabular-nums" style={{ fontFamily: p.fontDisplayCss }}>
            $29 <span className="text-xs font-normal" style={{ color: palette.muted }}>/ month</span>
          </div>
          <div className="h-2 w-full overflow-hidden" style={{ backgroundColor: p.elevatedAlphaBg, borderRadius: `${p.badgeRadiusPx}px` }}>
            <div className="h-full w-3/4" style={{ backgroundColor: palette.accent }} />
          </div>
          <div className="flex justify-between font-mono text-[11px]" style={{ color: palette.muted }}>
            <span>75,400 / 100,000 API calls</span>
            <span>75%</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 p-4" style={cardStyle}>
          <div>
            <div className="text-xs font-semibold">{isZh ? "自动同步 DESIGN.md" : "Auto-sync DESIGN.md"}</div>
            <div className="mt-0.5 text-[11.5px]" style={{ color: palette.muted }}>
              {isZh ? "仓库推送后更新样式令牌校验。" : "Re-validate style contrast on push."}
            </div>
          </div>
          <button
            type="button"
            aria-pressed={autoSync}
            onClick={() => setAutoSync((v) => !v)}
            className="flex h-6 w-11 shrink-0 cursor-pointer items-center px-0.5 transition-all"
            style={{
              backgroundColor: autoSync ? palette.accent : p.elevatedAlphaBg,
              border: `1px solid ${palette.border}`,
              borderRadius: `${p.badgeRadiusPx === 999 ? 999 : p.ctrlRadiusPx}px`,
              justifyContent: autoSync ? "flex-end" : "flex-start"
            }}
          >
            <span
              className="h-4 w-4"
              style={{
                backgroundColor: autoSync ? palette.accentFg : palette.ink,
                borderRadius: `${p.badgeRadiusPx === 999 ? 999 : Math.max(0, p.ctrlRadiusPx - 2)}px`
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export function TypographyStageTemplate({ style, physics: p, cardStyle, isZh }: StageTemplateContext) {
  const { palette } = p;

  return (
    <div className="grid gap-4 p-6" style={cardStyle}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3" style={{ borderColor: palette.border }}>
        <span className="font-mono text-xs uppercase" style={{ color: palette.accent }}>
          {isZh ? "字阶与排版规范样本" : "TYPE SCALE & HIERARCHY"}
        </span>
        <span className="font-mono text-xs" style={{ color: palette.muted }}>
          Display: {style.fonts.display} · Body: {style.fonts.body} · Mono: {style.fonts.mono}
        </span>
      </div>

      <div className="grid gap-3">
        <div>
          <span className="font-mono text-[10.5px]" style={{ color: palette.muted }}>
            DISPLAY / 36px · TRACKING {style.fonts.tracking}
          </span>
          <div
            className="mt-1 text-[clamp(26px,3.2vw,36px)] leading-[1.1] font-bold"
            style={{ fontFamily: p.fontDisplayCss, letterSpacing: p.letterSpacing }}
          >
            {isZh ? "精准版式比装饰更决定产品质感" : "Precision hierarchy outlasts surface decoration."}
          </div>
        </div>

        <div className="border-t pt-3" style={{ borderColor: palette.border }}>
          <span className="font-mono text-[10.5px]" style={{ color: palette.muted }}>
            HEADING H2 / 20px · SEMIBOLD
          </span>
          <div className="mt-1 text-xl font-semibold" style={{ fontFamily: p.fontDisplayCss }}>
            {isZh ? "跨组件保持统一字距、等宽数字与行高基准" : "Consistent tracking, tabular numerals & baseline rhythm"}
          </div>
        </div>

        <div className="border-t pt-3" style={{ borderColor: palette.border }}>
          <span className="font-mono text-[10.5px]" style={{ color: palette.muted }}>
            BODY / 14.5px · LINE-HEIGHT 1.65
          </span>
          <p className="mt-1 max-w-[68ch] text-[14.5px] leading-[1.65]" style={{ color: palette.muted }}>
            {isZh
              ? "正文与辅助说明采用清晰可读的字符对比度。所有实时计数、价格与时间戳强制启用 tabular-nums 等宽数字对齐，保证刷新切换时不抖动。"
              : "Body copy keeps line length constrained near 65ch with calibrated muted contrast. Numeric KPIs and timestamps enable tabular-nums to prevent layout jitter."}
          </p>
        </div>

        <div
          className="mt-1 flex flex-wrap items-center justify-between gap-3 p-3.5 font-mono text-xs"
          style={{
            backgroundColor: p.elevatedAlphaBg,
            border: `1px solid ${palette.border}`,
            borderRadius: `${p.ctrlRadiusPx}px`
          }}
        >
          <span>0123456789 · $1,284.90 · 99.98% SLA</span>
          <span style={{ color: palette.accent }}>font-variant-numeric: tabular-nums</span>
        </div>
      </div>
    </div>
  );
}
