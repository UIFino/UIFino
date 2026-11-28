"use client";

import { useState } from "react";
import type { ViewportSize } from "@/components/patterns/viewport-frame";
import type { ThemeMode } from "@/core/tokens";
import { cn } from "@/lib/cn";
import type { StarterTemplateSpec } from "./_taxonomy";
import type { SandboxRouteKind, TemplateRoutePageSpec } from "./details";

export interface TemplateLiveSandboxProps {
  readonly template: StarterTemplateSpec;
  readonly routes: readonly TemplateRoutePageSpec[];
  readonly activePath: string;
  readonly mode: ThemeMode;
  readonly viewport: ViewportSize;
  readonly isZh: boolean;
  readonly onSelectRoute?: (path: string) => void;
}

function getSandboxPalette(template: StarterTemplateSpec, mode: ThemeMode) {
  if (mode === "light") {
    return {
      canvas: "#FAF9F6",
      surface: "#FFFFFF",
      elevated: "#F2EFE9",
      border: "#E2DFD7",
      ink: "#141413",
      muted: "#5C5B55",
      accent: template.accent,
      accentFg: "#FFFFFF"
    };
  }
  return {
    canvas: template.canvas,
    surface: template.surface,
    elevated: "#1A1B20",
    border: template.border,
    ink: "#F4F4F6",
    muted: "#9CA0AA",
    accent: template.accent,
    accentFg: "#FFFFFF"
  };
}

function renderRouteBody(
  kind: SandboxRouteKind,
  template: StarterTemplateSpec,
  routes: readonly TemplateRoutePageSpec[],
  c: ReturnType<typeof getSandboxPalette>,
  isMobile: boolean,
  isZh: boolean,
  billingYearly: boolean,
  setBillingYearly: (v: boolean) => void
) {
  if (kind === "pricing") {
    const tiers = [
      {
        name: "Starter",
        price: billingYearly ? "$0" : "$0",
        desc: isZh ? "个人开发者与开源" : "Hobby & Open Source",
        featured: false
      },
      {
        name: "Pro Team",
        price: billingYearly ? "$24" : "$29",
        desc: isZh ? "无限团队成员与日志" : "Unlimited seats & logs",
        featured: true
      },
      {
        name: "Enterprise",
        price: billingYearly ? "$199" : "$249",
        desc: isZh ? "私有化与 SSO" : "Custom SLA & SAML SSO",
        featured: false
      }
    ];
    return (
      <div className="grid gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-lg font-semibold" style={{ color: c.ink }}>
              {isZh ? "透明按量计费方案" : "Predictable Pricing Tiers"}
            </div>
            <div className="text-xs" style={{ color: c.muted }}>
              {isZh ? "随时升降配，支持开源团队折扣。" : "Upgrade or cancel anytime."}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setBillingYearly(!billingYearly)}
            className="cursor-pointer border px-2.5 py-1 font-mono text-[11px]"
            style={{
              backgroundColor: c.surface,
              borderColor: c.border,
              color: c.accent
            }}
          >
            {billingYearly
              ? isZh
                ? "已切年付 (-20%)"
                : "Yearly (-20%)"
              : isZh
                ? "按月计费 · 切年付"
                : "Monthly · Switch Yearly"}
          </button>
        </div>
        <div className={cn("grid gap-3", isMobile ? "grid-cols-1" : "grid-cols-3")}>
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="grid gap-2 border p-4"
              style={{
                backgroundColor: c.surface,
                borderColor: tier.featured ? c.accent : c.border
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold" style={{ color: c.ink }}>
                  {tier.name}
                </span>
                {tier.featured ? (
                  <span
                    className="px-1.5 py-0.5 font-mono text-[10px]"
                    style={{ backgroundColor: c.accent, color: c.accentFg }}
                  >
                    PRO
                  </span>
                ) : null}
              </div>
              <div className="font-mono text-2xl font-bold tabular-nums" style={{ color: c.ink }}>
                {tier.price}
                <span className="text-xs font-normal" style={{ color: c.muted }}>
                  /mo
                </span>
              </div>
              <div className="text-[11.5px]" style={{ color: c.muted }}>
                {tier.desc}
              </div>
              <span
                className="mt-1 inline-flex h-7 items-center justify-center font-mono text-[11px] font-medium"
                style={{
                  backgroundColor: tier.featured ? c.accent : c.elevated,
                  color: tier.featured ? c.accentFg : c.ink,
                  border: `1px solid ${tier.featured ? c.accent : c.border}`
                }}
              >
                {isZh ? "选择此方案" : "Select Plan"}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "login") {
    return (
      <div
        className="mx-auto grid w-full max-w-[360px] gap-3 border p-5"
        style={{ backgroundColor: c.surface, borderColor: c.border }}
      >
        <div className="text-base font-semibold" style={{ color: c.ink }}>
          {isZh ? `登录 ${template.nameZh}` : `Sign in to ${template.name}`}
        </div>
        <div className="text-xs" style={{ color: c.muted }}>
          {isZh
            ? "支持硬件 Passkey 与工作邮箱无密登录"
            : "Continue with hardware passkey or work SSO"}
        </div>
        <div
          className="border px-3 py-2 font-mono text-xs"
          style={{ backgroundColor: c.canvas, borderColor: c.border, color: c.muted }}
        >
          founder@acme.dev
        </div>
        <div
          className="flex h-8 items-center justify-center text-xs font-semibold"
          style={{ backgroundColor: c.accent, color: c.accentFg }}
        >
          {isZh ? "使用 Passkey 密钥登录" : "Sign in with Passkey"}
        </div>
      </div>
    );
  }

  if (kind === "docs") {
    return (
      <div
        className={cn("grid gap-4", isMobile ? "grid-cols-1" : "grid-cols-[170px_minmax(0,1fr)]")}
      >
        <div
          className="grid content-start gap-1 border p-3 text-xs"
          style={{ backgroundColor: c.surface, borderColor: c.border }}
        >
          <div className="font-mono text-[10.5px] uppercase" style={{ color: c.accent }}>
            Quickstart
          </div>
          <div className="py-1 font-medium" style={{ color: c.ink }}>
            Installation
          </div>
          <div className="py-1" style={{ color: c.muted }}>
            Authentication
          </div>
          <div className="py-1" style={{ color: c.muted }}>
            CSS Tokens
          </div>
        </div>
        <div
          className="grid gap-3 border p-4"
          style={{ backgroundColor: c.surface, borderColor: c.border }}
        >
          <div className="text-base font-semibold" style={{ color: c.ink }}>
            {isZh ? "快速初始化模板工程" : "Install & Configure SDK"}
          </div>
          <div
            className="border p-3 font-mono text-xs"
            style={{ backgroundColor: c.canvas, borderColor: c.border, color: c.accent }}
          >
            $ npx uifino@latest create {template.id}
          </div>
          <div className="text-xs leading-relaxed" style={{ color: c.muted }}>
            {isZh
              ? "自带亮暗模式与 DESIGN.md 上下文协议，开箱接入 Claude Code 与 Cursor。"
              : "Pre-wired with Light/Dark CSS variables and a DESIGN.md guardrail file."}
          </div>
        </div>
      </div>
    );
  }

  if (kind === "changelog") {
    const releases = [
      {
        v: "v2.4.0",
        date: "Nov 27",
        text: isZh
          ? "新增多路由交互沙盒与 Passkey 鉴权组件。"
          : "Added interactive multi-route sandbox & passkey flows."
      },
      {
        v: "v2.3.1",
        date: "Nov 18",
        text: isZh
          ? "优化深浅双色变量对比度并对齐 1px 细边框。"
          : "Calibrated Light/Dark token contrast & 1px hairlines."
      }
    ];
    return (
      <div className="grid gap-3">
        {releases.map((rel) => (
          <div
            key={rel.v}
            className="grid gap-1.5 border p-4"
            style={{ backgroundColor: c.surface, borderColor: c.border }}
          >
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="font-semibold" style={{ color: c.accent }}>
                {rel.v}
              </span>
              <span style={{ color: c.muted }}>{rel.date}</span>
            </div>
            <div className="text-xs" style={{ color: c.ink }}>
              {rel.text}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "dashboard" || kind === "settings") {
    return (
      <div className="grid gap-3">
        <div className={cn("grid gap-2.5", isMobile ? "grid-cols-1" : "grid-cols-3")}>
          {[
            ["Requests", "12.8M"],
            ["P99 Latency", "14ms"],
            ["Uptime", "99.98%"]
          ].map(([k, v]) => (
            <div
              key={k}
              className="border p-3"
              style={{ backgroundColor: c.surface, borderColor: c.border }}
            >
              <div className="text-[11px]" style={{ color: c.muted }}>
                {k}
              </div>
              <div
                className="mt-1 font-mono text-lg font-bold tabular-nums"
                style={{ color: c.ink }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>
        <div className="border" style={{ backgroundColor: c.surface, borderColor: c.border }}>
          {["us-east-edge-01", "eu-west-core-04", "ap-northeast-02"].map((node, i) => (
            <div
              key={node}
              className="flex items-center justify-between px-3.5 py-2 font-mono text-xs"
              style={{ borderTop: i === 0 ? "none" : `1px solid ${c.border}`, color: c.ink }}
            >
              <span>{node}</span>
              <span style={{ color: c.accent }}>HEALTHY</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "chat") {
    return (
      <div className="grid gap-3">
        <div
          className="border p-3.5 text-xs"
          style={{ backgroundColor: c.surface, borderColor: c.border, color: c.ink }}
        >
          <span className="font-mono text-[10.5px]" style={{ color: c.accent }}>
            USER:{" "}
          </span>
          {isZh
            ? "把定价页切到 Linear 1px 细线质感"
            : "Refactor pricing tiers using 1px architectural hairlines"}
        </div>
        <div
          className="grid gap-2 border p-3.5 text-xs"
          style={{ backgroundColor: c.surface, borderColor: c.border }}
        >
          <div className="font-mono text-[10.5px]" style={{ color: c.accent }}>
            TOOL_CALL · read DESIGN.md (12ms)
          </div>
          <div style={{ color: c.muted }}>
            {isZh
              ? "已读取 8 项明暗色彩令牌并替换 PricingCard 组件。"
              : "Loaded 8 palette tokens & updated PricingCard borders."}
          </div>
        </div>
      </div>
    );
  }

  // Default Landing route
  return (
    <div className="grid gap-4">
      <div
        className="grid gap-2.5 border p-5"
        style={{ backgroundColor: c.surface, borderColor: c.border }}
      >
        <span className="font-mono text-[11px] font-semibold" style={{ color: c.accent }}>
          {template.skinLabel} · {template.category}
        </span>
        <div className="text-xl font-bold tracking-tight" style={{ color: c.ink }}>
          {isZh ? template.descZh : template.descEn}
        </div>
        <div className="mt-1 flex flex-wrap gap-2">
          <span
            className="inline-flex h-8 items-center px-3.5 text-xs font-semibold"
            style={{ backgroundColor: c.accent, color: c.accentFg }}
          >
            {isZh ? "立即使用模板 →" : "Deploy Starter →"}
          </span>
          <span
            className="inline-flex h-8 items-center border px-3.5 text-xs font-medium"
            style={{ borderColor: c.border, color: c.ink }}
          >
            {isZh ? "查看组件" : "Explore Blocks"}
          </span>
        </div>
      </div>
      <div className={cn("grid gap-2.5", isMobile ? "grid-cols-1" : "grid-cols-3")}>
        {routes.slice(0, 3).map((rp) => (
          <div
            key={rp.path}
            className="border p-3"
            style={{ backgroundColor: c.surface, borderColor: c.border }}
          >
            <div className="font-mono text-[10.5px]" style={{ color: c.accent }}>
              {rp.path}
            </div>
            <div className="mt-1 text-xs font-semibold" style={{ color: c.ink }}>
              {isZh ? rp.labelZh : rp.labelEn}
            </div>
            <div className="mt-1 line-clamp-2 text-[11px]" style={{ color: c.muted }}>
              {isZh ? rp.summaryZh : rp.summaryEn}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TemplateLiveSandbox({
  template,
  routes,
  activePath,
  mode,
  viewport,
  isZh,
  onSelectRoute
}: TemplateLiveSandboxProps) {
  const [billingYearly, setBillingYearly] = useState(false);
  const c = getSandboxPalette(template, mode);
  const isMobile = viewport === "mobile";
  const currentRoute = routes.find((r) => r.path === activePath) ?? routes[0]!;
  const CustomSandbox = template.SandboxComponent;

  if (CustomSandbox) {
    return (
      <div
        className="min-h-[380px] transition-colors duration-200"
        style={{ backgroundColor: c.canvas, color: c.ink }}
      >
        <CustomSandbox activePath={currentRoute.path} mode={mode} isZh={isZh} />
      </div>
    );
  }

  return (
    <div
      className="min-h-[380px] transition-colors duration-200"
      style={{ backgroundColor: c.canvas, color: c.ink }}
    >
      {/* Interactive In-Sandbox Top Navigation Bar */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-2.5"
        style={{ backgroundColor: c.surface, borderColor: c.border }}
      >
        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="inline-block h-2.5 w-2.5" style={{ backgroundColor: c.accent }} />
          <span>{isZh ? template.nameZh : template.name}</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {routes.map((rp) => {
            const active = rp.path === currentRoute.path;
            return (
              <button
                key={rp.path}
                type="button"
                onClick={() => onSelectRoute?.(rp.path)}
                className="cursor-pointer px-2 py-1 font-mono text-[11px] transition-colors"
                style={{
                  backgroundColor: active ? c.elevated : "transparent",
                  color: active ? c.accent : c.muted,
                  border: active ? `1px solid ${c.border}` : "1px solid transparent"
                }}
              >
                {rp.path}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rendered Subpage Content */}
      <div className="p-5">
        {renderRouteBody(
          currentRoute.kind ?? "landing",
          template,
          routes,
          c,
          isMobile,
          isZh,
          billingYearly,
          setBillingYearly
        )}
      </div>
    </div>
  );
}

export function TemplateRouteMiniThumb({
  template,
  route
}: {
  readonly template: StarterTemplateSpec;
  readonly route: TemplateRoutePageSpec;
}) {
  return (
    <div
      className="grid h-24 content-between border p-2.5"
      style={{ backgroundColor: template.canvas, borderColor: template.border }}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px]" style={{ color: template.accent }}>
          {route.path}
        </span>
        <span className="h-1.5 w-6" style={{ backgroundColor: template.border }} />
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        <div
          className="col-span-2 h-8 border"
          style={{ backgroundColor: template.surface, borderColor: template.border }}
        />
        <div
          className="h-8 border"
          style={{ backgroundColor: template.surface, borderColor: template.border }}
        />
      </div>
    </div>
  );
}
