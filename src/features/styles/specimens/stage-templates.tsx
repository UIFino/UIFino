"use client";

import { useState, type CSSProperties } from "react";
import { CheckCircle2, KeyRound, Lock, Search, ShieldCheck, Terminal } from "lucide-react";
import type { ResolvedStylePlaygroundPhysics, UiStyleSpec } from "@/core/styles";

export interface StageTemplateContext {
  readonly style: UiStyleSpec;
  readonly physics: ResolvedStylePlaygroundPhysics;
  readonly cardStyle: CSSProperties;
  readonly isZh: boolean;
}

interface StageStyleHelpers {
  readonly btnPrimary: CSSProperties;
  readonly btnSecondary: CSSProperties;
  readonly input: CSSProperties;
  readonly badgeNeutral: CSSProperties;
  readonly badgeAccent: CSSProperties;
}

function makeStageHelpers(p: ResolvedStylePlaygroundPhysics): StageStyleHelpers {
  const { palette } = p;
  return {
    btnPrimary: {
      backgroundColor: palette.accent,
      color: palette.accentFg,
      borderColor: p.borderWidthPx === 2 ? palette.border : palette.accent,
      borderStyle: "solid",
      borderWidth: `${p.borderWidthPx}px`,
      borderRadius: `${p.ctrlRadiusPx}px`,
      boxShadow: p.buttonShadow
    },
    btnSecondary: {
      backgroundColor: p.elevatedAlphaBg,
      color: palette.ink,
      borderColor: palette.border,
      borderStyle: "solid",
      borderWidth: `${p.borderWidthPx}px`,
      borderRadius: `${p.ctrlRadiusPx}px`
    },
    input: {
      backgroundColor: p.elevatedAlphaBg,
      color: palette.ink,
      borderColor: palette.border,
      borderStyle: "solid",
      borderWidth: `${p.borderWidthPx}px`,
      borderRadius: `${p.ctrlRadiusPx}px`,
      boxShadow: p.inputInsetShadow
    },
    badgeNeutral: {
      backgroundColor: p.elevatedAlphaBg,
      color: palette.muted,
      border: `1px solid ${palette.border}`,
      borderRadius: `${p.badgeRadiusPx}px`
    },
    badgeAccent: {
      backgroundColor: p.elevatedAlphaBg,
      color: palette.accent,
      border: `1px solid ${palette.border}`,
      borderRadius: `${p.badgeRadiusPx}px`
    }
  };
}

interface DeploymentRow {
  readonly id: string;
  readonly service: string;
  readonly region: string;
  readonly p99: string;
  readonly status: "healthy" | "degraded";
  readonly cost: string;
  readonly updated: string;
}

export function DashboardStageTemplate({
  style,
  physics: p,
  cardStyle,
  isZh
}: StageTemplateContext) {
  const { palette } = p;
  const h = makeStageHelpers(p);
  const [activeNav, setActiveNav] = useState("deployments");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "healthy" | "degraded">("all");

  const navItems = isZh
    ? [
        { id: "overview", label: "总览面板" },
        { id: "deployments", label: "服务部署" },
        { id: "nodes", label: "边缘节点" },
        { id: "telemetry", label: "实时遥测" },
        { id: "billing", label: "账单用量" }
      ]
    : [
        { id: "overview", label: "Overview" },
        { id: "deployments", label: "Deployments" },
        { id: "nodes", label: "Edge Nodes" },
        { id: "telemetry", label: "Telemetry" },
        { id: "billing", label: "Billing" }
      ];

  const kpis = isZh
    ? [
        { label: "24h 请求量", value: "12.84M", delta: "+18.4%" },
        { label: "P99 延迟", value: "14.2 ms", delta: "-3.1 ms" },
        { label: "可用率 SLA", value: "99.98%", delta: "NOMINAL" },
        { label: "本月费用", value: "$1,420", delta: "72% Cap" }
      ]
    : [
        { label: "24h Requests", value: "12.84M", delta: "+18.4%" },
        { label: "P99 Latency", value: "14.2 ms", delta: "-3.1 ms" },
        { label: "Error Budget", value: "99.98%", delta: "NOMINAL" },
        { label: "Monthly Spend", value: "$1,420", delta: "72% Cap" }
      ];

  const allRows: readonly DeploymentRow[] = [
    {
      id: "edge-gw",
      service: isZh ? "边缘网关路由 · prod-v4" : "edge-gateway-router · prod-v4",
      region: "iad1",
      p99: "11.4ms",
      status: "healthy",
      cost: "$412.00",
      updated: "2m"
    },
    {
      id: "auth-core",
      service: isZh ? "身份密钥鉴权 · passkey" : "auth-passkey-core · v2.8",
      region: "fra1",
      p99: "16.8ms",
      status: "healthy",
      cost: "$290.50",
      updated: "14m"
    },
    {
      id: "tok-compiler",
      service: isZh ? "样式编译工作流 · css-ast" : "design-token-worker · css-ast",
      region: "hnd1",
      p99: "34.1ms",
      status: "degraded",
      cost: "$318.20",
      updated: "29m"
    },
    {
      id: "kv-cache",
      service: isZh ? "多区令牌缓存 · replica" : "kv-token-replica · global",
      region: "sin1",
      p99: "8.9ms",
      status: "healthy",
      cost: "$215.00",
      updated: "1h"
    },
    {
      id: "audit-log",
      service: isZh ? "合规审计索引 · stream" : "audit-stream-sink · cold",
      region: "sfo1",
      p99: "19.2ms",
      status: "healthy",
      cost: "$184.30",
      updated: "3h"
    }
  ];

  const q = searchTerm.trim().toLowerCase();
  const visibleRows = allRows.filter((row) => {
    const statusOk = statusFilter === "all" || row.status === statusFilter;
    const textOk = !q || `${row.service} ${row.region} ${row.id}`.toLowerCase().includes(q);
    return statusOk && textOk;
  });

  const barHeights = [42, 56, 48, 72, 65, 84, 79, 92, 68, 86, 74, 96];
  const regions = [
    { name: "US-EAST (iad1)", pct: 48 },
    { name: "EU-WEST (fra1)", pct: 34 },
    { name: "AP-EAST (hnd1)", pct: 18 }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[188px_minmax(0,1fr)]">
      {/* Mini App Sidebar */}
      <aside className="flex flex-col justify-between gap-4 p-3.5" style={cardStyle}>
        <div className="grid gap-3">
          <div
            className="flex items-center justify-between gap-2 border-b pb-2.5"
            style={{ borderColor: palette.border }}
          >
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 shrink-0"
                style={{
                  backgroundColor: palette.accent,
                  borderRadius: p.badgeRadiusPx === 999 ? "999px" : `${p.ctrlRadiusPx}px`
                }}
              />
              <span className="truncate text-xs font-bold" style={{ fontFamily: p.fontDisplayCss }}>
                {isZh ? style.nameZh : style.name}
              </span>
            </div>
            <span className="px-1.5 py-0.5 font-mono text-[9.5px]" style={h.badgeNeutral}>
              PRO
            </span>
          </div>

          <nav className="grid grid-cols-2 gap-1 md:grid-cols-1">
            {navItems.map((nav) => {
              const active = nav.id === activeNav;
              return (
                <button
                  key={nav.id}
                  type="button"
                  onClick={() => setActiveNav(nav.id)}
                  className="flex cursor-pointer items-center justify-between px-2.5 py-1.5 text-left text-xs transition-opacity"
                  style={{
                    backgroundColor: active ? p.elevatedAlphaBg : "transparent",
                    color: active ? palette.ink : palette.muted,
                    fontWeight: active ? 600 : 400,
                    borderRadius: `${p.ctrlRadiusPx}px`,
                    border: active ? `1px solid ${palette.border}` : "1px solid transparent"
                  }}
                >
                  <span className="truncate">{nav.label}</span>
                  {active ? (
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: palette.accent }}
                    />
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        <div
          className="hidden border-t pt-2.5 md:grid md:gap-1"
          style={{ borderColor: palette.border }}
        >
          <div
            className="flex items-center justify-between font-mono text-[10px]"
            style={{ color: palette.muted }}
          >
            <span>CLUSTER HEALTH</span>
            <span style={{ color: palette.accent }}>99.98%</span>
          </div>
          <div
            className="h-1.5 w-full overflow-hidden"
            style={{ backgroundColor: p.elevatedAlphaBg, borderRadius: "999px" }}
          >
            <div className="h-full w-[94%]" style={{ backgroundColor: palette.accent }} />
          </div>
        </div>
      </aside>

      {/* Main Console Column */}
      <div className="grid min-w-0 gap-3.5">
        {/* Top Action & Filter Toolbar */}
        <div
          className="flex flex-wrap items-center justify-between gap-2.5 px-4 py-2.5"
          style={cardStyle}
        >
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
            <div className="relative min-w-[160px] flex-1 sm:max-w-[230px]">
              <Search
                className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2"
                style={{ color: palette.muted }}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isZh ? "筛选服务或区域…" : "Filter service / region…"}
                className="h-8 w-full pr-2.5 pl-8 font-mono text-[11.5px] outline-none"
                style={h.input}
              />
            </div>

            <div className="flex items-center gap-1">
              {(["all", "healthy", "degraded"] as const).map((st) => {
                const active = statusFilter === st;
                const label =
                  st === "all"
                    ? isZh
                      ? "全部"
                      : "All"
                    : st === "healthy"
                      ? isZh
                        ? "正常"
                        : "Healthy"
                      : isZh
                        ? "抖动"
                        : "Degraded";
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className="h-7 cursor-pointer px-2.5 text-[11px] font-medium"
                    style={
                      active
                        ? { ...h.badgeAccent, borderColor: palette.accent, fontWeight: 600 }
                        : h.badgeNeutral
                    }
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className="h-8 cursor-pointer px-3.5 text-xs font-semibold"
            style={h.btnPrimary}
          >
            {p.hasScanlines ? "[+ DEPLOY]" : isZh ? "+ 发布版本" : "+ New Deploy"}
          </button>
        </div>

        {/* 4-Column KPI Row */}
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {kpis.map((kpi, idx) => (
            <div key={kpi.label} className="grid gap-1 p-3.5" style={cardStyle}>
              <div className="flex items-center justify-between gap-1.5">
                <span
                  className="truncate text-[11px] font-medium"
                  style={{
                    color: palette.muted,
                    textTransform: p.uppercaseLabels ? "uppercase" : "none"
                  }}
                >
                  {p.hasTopHeavyRule ? `0${idx + 1} ${kpi.label}` : kpi.label}
                </span>
                <span
                  className="px-1.5 py-0.5 font-mono text-[10px] font-semibold tabular-nums"
                  style={h.badgeAccent}
                >
                  {kpi.delta}
                </span>
              </div>
              <div
                className="text-[20px] leading-tight font-bold tabular-nums"
                style={{ fontFamily: p.fontDisplayCss, letterSpacing: p.letterSpacing }}
              >
                {kpi.value}
              </div>
            </div>
          ))}
        </div>

        {/* Micro Trend Chart + Regional Traffic Split */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.55fr_1fr]">
          <div className="grid gap-3 p-4" style={cardStyle}>
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="text-xs font-semibold" style={{ fontFamily: p.fontDisplayCss }}>
                  {isZh ? "12 日边缘吞吐趋势" : "12-Day Edge Throughput"}
                </div>
                <div className="text-[11px]" style={{ color: palette.muted }}>
                  {isZh ? "每秒网关请求 · 峰值 18.4k req/s" : "Requests/sec · Peak 18.4k req/s"}
                </div>
              </div>
              <span className="px-2 py-0.5 font-mono text-[10.5px]" style={h.badgeNeutral}>
                14d · UTC
              </span>
            </div>

            <div className="flex h-24 items-end gap-1.5 pt-2">
              {barHeights.map((pct, i) => (
                <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                  <div
                    className="w-full transition-all"
                    style={{
                      height: `${pct}%`,
                      backgroundColor: i >= barHeights.length - 3 ? palette.accent : palette.border,
                      borderRadius: `${Math.min(4, p.ctrlRadiusPx)}px`
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid content-between gap-2.5 p-4" style={cardStyle}>
            <div className="text-xs font-semibold" style={{ fontFamily: p.fontDisplayCss }}>
              {isZh ? "区域节点流量分配" : "Traffic by Edge Region"}
            </div>
            <div className="grid gap-2.5">
              {regions.map((rg) => (
                <div key={rg.name} className="grid gap-1">
                  <div className="flex justify-between font-mono text-[10.5px]">
                    <span style={{ color: palette.muted }}>{rg.name}</span>
                    <span className="font-semibold tabular-nums">{rg.pct}%</span>
                  </div>
                  <div
                    className="h-1.5 w-full overflow-hidden"
                    style={{ backgroundColor: p.elevatedAlphaBg, borderRadius: "999px" }}
                  >
                    <div
                      className="h-full"
                      style={{ width: `${rg.pct}%`, backgroundColor: palette.accent }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Multi-column Deployment & Billing Table */}
        <div className="overflow-x-auto" style={cardStyle}>
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr
                className="font-mono text-[10.5px]"
                style={{
                  color: palette.muted,
                  borderBottom: `1px solid ${palette.border}`,
                  backgroundColor: p.elevatedAlphaBg
                }}
              >
                <th className="px-3.5 py-2 font-medium">{isZh ? "部署服务" : "Service"}</th>
                <th className="px-3 py-2 font-medium">{isZh ? "节点" : "Region"}</th>
                <th className="px-3 py-2 font-medium">P99</th>
                <th className="px-3 py-2 font-medium">{isZh ? "状态" : "Status"}</th>
                <th className="px-3 py-2 text-right font-medium">{isZh ? "月账单" : "Cost"}</th>
                <th className="px-3.5 py-2 text-right font-medium">{isZh ? "更新" : "Age"}</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, idx) => (
                <tr
                  key={row.id}
                  style={{
                    borderTop: idx === 0 ? "none" : `1px solid ${palette.border}`
                  }}
                >
                  <td className="px-3.5 py-2.5 font-medium">{row.service}</td>
                  <td
                    className="px-3 py-2.5 font-mono text-[11px]"
                    style={{ color: palette.muted }}
                  >
                    {row.region}
                  </td>
                  <td className="px-3 py-2.5 font-mono text-[11px] tabular-nums">{row.p99}</td>
                  <td className="px-3 py-2.5">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 font-mono text-[10px] font-semibold"
                      style={
                        row.status === "healthy"
                          ? h.badgeAccent
                          : { ...h.badgeNeutral, color: palette.ink }
                      }
                    >
                      {row.status === "healthy"
                        ? isZh
                          ? "HEALTHY"
                          : "HEALTHY"
                        : isZh
                          ? "SLOW"
                          : "DEGRADED"}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-[11px] tabular-nums">
                    {row.cost}
                  </td>
                  <td
                    className="px-3.5 py-2.5 text-right font-mono text-[11px]"
                    style={{ color: palette.muted }}
                  >
                    {row.updated}
                  </td>
                </tr>
              ))}
              {visibleRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-xs"
                    style={{ color: palette.muted }}
                  >
                    {isZh ? "无匹配部署记录" : "No matching deployments"}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function LandingStageTemplate({ style, physics: p, cardStyle, isZh }: StageTemplateContext) {
  const { palette } = p;
  const h = makeStageHelpers(p);

  const features = isZh
    ? [
        {
          code: "01",
          title: "语义令牌双调契约",
          desc: "画布底色、表面层级与主按钮高对比自动校准，深浅双模切换免手调。",
          kind: "swatches" as const
        },
        {
          code: "02",
          title: "边框圆角材质力学",
          desc: "卡片、输入框与胶囊圆角比例严格联动，支持 1px 细线到硬边偏移阴影。",
          kind: "code" as const
        },
        {
          code: "03",
          title: "实时 WCAG AA/AAA 体检",
          desc: "正文与按钮文字对比度实时过检，等宽数字强制防抖动。",
          kind: "contrast" as const
        }
      ]
    : [
        {
          code: "01",
          title: "Synced Dual-Tone Contract",
          desc: "Canvas, surface layers, and high-contrast CTA tuned together for Dark & Light.",
          kind: "swatches" as const
        },
        {
          code: "02",
          title: "Calibrated Corner & Border Physics",
          desc: "Card, input, and badge radii scale harmoniously across crisp 1px lines or offset depth.",
          kind: "code" as const
        },
        {
          code: "03",
          title: "Built-in WCAG Contrast Gate",
          desc: "Verified contrast pairs and tabular numerals enforced before code generation.",
          kind: "contrast" as const
        }
      ];

  return (
    <div className="grid gap-4">
      {/* Brand Navbar */}
      <header
        className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
        style={cardStyle}
      >
        <div
          className="flex items-center gap-2 text-sm font-bold"
          style={{ fontFamily: p.fontDisplayCss }}
        >
          <span
            className="inline-block h-2.5 w-2.5"
            style={{ backgroundColor: palette.accent, borderRadius: `${p.badgeRadiusPx}px` }}
          />
          <span>{isZh ? style.nameZh : style.name}</span>
          <span className="px-1.5 py-0.5 font-mono text-[9.5px] font-medium" style={h.badgeNeutral}>
            v2.4
          </span>
        </div>

        <nav className="hidden items-center gap-5 text-xs md:flex" style={{ color: palette.muted }}>
          <span>{isZh ? "系统特性" : "Platform"}</span>
          <span>{isZh ? "架构协议" : "Architecture"}</span>
          <span>{isZh ? "定价" : "Pricing"}</span>
          <span>{isZh ? "文档" : "Docs"}</span>
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" className="h-8 px-3 text-xs font-medium" style={h.btnSecondary}>
            {isZh ? "登录" : "Sign in"}
          </button>
          <button type="button" className="h-8 px-3.5 text-xs font-semibold" style={h.btnPrimary}>
            {isZh ? "免费接入" : "Get Started"}
          </button>
        </div>
      </header>

      {/* Hero Stage */}
      <section className="grid gap-5 px-6 py-8 text-center" style={cardStyle}>
        <div className="mx-auto">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[11px] font-medium"
            style={h.badgeAccent}
          >
            {isZh
              ? `${style.nameZh}设计规范 · 即拷即用`
              : `${style.name} Protocol · Production Ready`}
          </span>
        </div>

        <h2
          className="mx-auto max-w-[680px] text-[clamp(26px,3.2vw,40px)] leading-[1.08] font-bold"
          style={{ fontFamily: p.fontDisplayCss, letterSpacing: p.letterSpacing }}
        >
          {isZh
            ? "用经过真实产品验证的质感规范替代模板味界面"
            : "Replace generic templates with calibrated interface physics."}
        </h2>

        <p
          className="mx-auto max-w-[540px] text-sm leading-[1.62]"
          style={{ color: palette.muted }}
        >
          {isZh ? style.summaryZh : style.summaryEn}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button type="button" className="h-10 px-5 text-sm font-semibold" style={h.btnPrimary}>
            {isZh ? "复制样式变量 →" : "Copy Design Tokens →"}
          </button>
          <button type="button" className="h-10 px-5 text-sm font-medium" style={h.btnSecondary}>
            {isZh ? "查看全部组件" : "Browse Components"}
          </button>
        </div>

        <div
          className="mx-auto mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 border-t pt-4 font-mono text-[11px]"
          style={{ borderColor: palette.border, color: palette.muted }}
        >
          <span>14.2ms Edge P99</span>
          <span>0 Runtime Dependencies</span>
          <span>Dark + Light Verified</span>
        </div>
      </section>

      {/* 3-Column Bento Feature Grid with Architectural Previews */}
      <section className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
        {features.map((f) => (
          <div key={f.code} className="flex flex-col justify-between gap-4 p-4" style={cardStyle}>
            <div className="grid gap-1.5">
              <div className="flex items-center justify-between">
                <span
                  className="font-mono text-[11px] font-semibold"
                  style={{ color: palette.accent }}
                >
                  {f.code}
                </span>
                <span className="font-mono text-[10px]" style={{ color: palette.muted }}>
                  SPEC
                </span>
              </div>
              <div className="text-sm font-semibold" style={{ fontFamily: p.fontDisplayCss }}>
                {f.title}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: palette.muted }}>
                {f.desc}
              </p>
            </div>

            {f.kind === "swatches" ? (
              <div
                className="grid grid-cols-4 gap-1.5 border p-2"
                style={{
                  borderColor: palette.border,
                  borderRadius: `${p.ctrlRadiusPx}px`,
                  backgroundColor: p.elevatedAlphaBg
                }}
              >
                {[palette.canvas, palette.surface, palette.border, palette.accent].map((hex, i) => (
                  <span
                    key={`${hex}-${i}`}
                    className="h-5 w-full"
                    style={{
                      backgroundColor: hex,
                      borderRadius: `${Math.min(4, p.ctrlRadiusPx)}px`,
                      border: `1px solid ${palette.border}`
                    }}
                  />
                ))}
              </div>
            ) : f.kind === "code" ? (
              <div
                className="px-2.5 py-2 font-mono text-[10.5px]"
                style={{ ...h.input, color: palette.muted }}
              >
                <span style={{ color: palette.accent }}>--radius:</span> {p.cardRadiusPx}px ·{" "}
                <span style={{ color: palette.accent }}>--border:</span> {p.borderWidthPx}px
              </div>
            ) : (
              <div
                className="flex items-center justify-between px-2.5 py-2 font-mono text-[10.5px]"
                style={h.badgeAccent}
              >
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Ink / Canvas</span>
                </span>
                <span className="font-bold">AAA PASS</span>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Bottom SLA Trust Bar */}
      <footer
        className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 font-mono text-[11px]"
        style={{ ...cardStyle, color: palette.muted }}
      >
        <span>TRUSTED BY ENGINEERING TEAMS SHIPPING REAL SOFTWARE</span>
        <span style={{ color: palette.accent }}>99.99% UPTIME · REACT 19 + TAILWIND V4</span>
      </footer>
    </div>
  );
}

export function CardsAuthStageTemplate({
  style,
  physics: p,
  cardStyle,
  isZh
}: StageTemplateContext) {
  const { palette } = p;
  const h = makeStageHelpers(p);

  const [email, setEmail] = useState("alex@uifino.dev");
  const [workspaceName, setWorkspaceName] = useState(`${style.name} Prod`);
  const [region, setRegion] = useState<"US-East" | "EU-West" | "AP-Tokyo">("US-East");
  const [budgetAlert, setBudgetAlert] = useState("240");
  const [autoSync, setAutoSync] = useState(true);
  const [strictAa, setStrictAa] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const emailValid = email.includes("@") && email.includes(".");
  const numericBudget = Number(budgetAlert);
  const budgetValid = Number.isFinite(numericBudget) && numericBudget >= 50;

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      {/* Left: Passkey + Work Email Auth Card */}
      <div className="flex flex-col justify-between gap-4 p-5" style={cardStyle}>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2 text-sm font-bold"
              style={{ fontFamily: p.fontDisplayCss }}
            >
              <Lock className="h-4 w-4" style={{ color: palette.accent }} />
              <span>{isZh ? "登录工作区" : "Sign in to Workspace"}</span>
            </div>
            <span className="px-2 py-0.5 font-mono text-[10px]" style={h.badgeNeutral}>
              SSO / PASSKEY
            </span>
          </div>

          <p className="text-xs leading-relaxed" style={{ color: palette.muted }}>
            {isZh
              ? "使用硬件密钥一步认证，或填写企业邮箱接收免密登录链接。"
              : "Use hardware passkey authentication or request an instant sign-in link."}
          </p>

          <button
            type="button"
            className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 text-xs font-semibold"
            style={h.btnSecondary}
          >
            <KeyRound className="h-3.5 w-3.5" style={{ color: palette.accent }} />
            <span>{isZh ? "使用 Passkey 密钥登录" : "Continue with Passkey"}</span>
          </button>

          <div
            className="flex items-center gap-3 font-mono text-[10.5px]"
            style={{ color: palette.muted }}
          >
            <span className="h-px flex-1" style={{ backgroundColor: palette.border }} />
            <span>{isZh ? "或邮箱登录" : "OR EMAIL"}</span>
            <span className="h-px flex-1" style={{ backgroundColor: palette.border }} />
          </div>

          <div className="grid gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="style-auth-email" className="font-medium">
                {isZh ? "工作邮箱" : "Work Email"}
              </label>
              <span
                className="font-mono text-[10.5px]"
                style={{ color: emailValid ? palette.accent : "#FF5C5C" }}
              >
                {emailValid
                  ? isZh
                    ? "域名格式正确"
                    : "Valid domain"
                  : isZh
                    ? "请输入有效邮箱"
                    : "Invalid email"}
              </span>
            </div>
            <input
              id="style-auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-9 w-full px-3 font-mono text-xs outline-none"
              style={{
                ...h.input,
                borderColor: emailValid ? palette.border : "#FF5C5C"
              }}
            />
          </div>

          <button
            type="button"
            className="h-10 w-full cursor-pointer text-xs font-semibold"
            style={h.btnPrimary}
          >
            {isZh ? "发送登录验证链接 →" : "Send Magic Link →"}
          </button>
        </div>

        <div
          className="border-t pt-3 font-mono text-[10.5px]"
          style={{ borderColor: palette.border, color: palette.muted }}
        >
          {isZh
            ? "启用 SAML 2.0 单点登录 · 审计日志默认保留 90 天"
            : "SAML 2.0 SSO Ready · 90-day immutable audit logs"}
        </div>
      </div>

      {/* Right: Account Settings Form + Interactive Switches & Validation */}
      <div className="grid gap-4">
        <div className="grid gap-3.5 p-5" style={cardStyle}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold" style={{ fontFamily: p.fontDisplayCss }}>
              {isZh ? "账户与集群设置" : "Workspace & Region Settings"}
            </span>
            {savedNotice ? (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 font-mono text-[10px]"
                style={h.badgeAccent}
              >
                <CheckCircle2 className="h-3 w-3" />
                <span>{isZh ? "已保存" : "SAVED"}</span>
              </span>
            ) : null}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="grid gap-1">
              <label htmlFor="style-ws-name" className="text-xs font-medium">
                {isZh ? "空间名称" : "Workspace Name"}
              </label>
              <input
                id="style-ws-name"
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="h-9 w-full px-3 text-xs outline-none"
                style={h.input}
              />
            </div>

            <div className="grid gap-1">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="style-ws-cap" className="font-medium">
                  {isZh ? "月消费告警阈值 ($)" : "Spend Cap ($)"}
                </label>
                {!budgetValid ? (
                  <span className="font-mono text-[10px] text-[#FF5C5C]">min $50</span>
                ) : null}
              </div>
              <input
                id="style-ws-cap"
                type="number"
                value={budgetAlert}
                onChange={(e) => setBudgetAlert(e.target.value)}
                className="h-9 w-full px-3 font-mono text-xs tabular-nums outline-none"
                style={{
                  ...h.input,
                  borderColor: budgetValid ? palette.border : "#FF5C5C"
                }}
              />
            </div>
          </div>

          <div className="grid gap-1.5">
            <span className="text-xs font-medium">
              {isZh ? "默认主区域" : "Primary Deployment Region"}
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {(["US-East", "EU-West", "AP-Tokyo"] as const).map((rg) => {
                const active = region === rg;
                return (
                  <button
                    key={rg}
                    type="button"
                    onClick={() => setRegion(rg)}
                    className="h-8 cursor-pointer font-mono text-[11px] font-medium"
                    style={
                      active
                        ? { ...h.badgeAccent, borderColor: palette.accent, fontWeight: 700 }
                        : h.btnSecondary
                    }
                  >
                    {rg}
                  </button>
                );
              })}
            </div>
          </div>

          {[
            {
              key: "sync",
              checked: autoSync,
              toggle: () => setAutoSync((v) => !v),
              title: isZh ? "自动同步根目录 DESIGN.md" : "Auto-sync repository DESIGN.md",
              desc: isZh
                ? "推送变更后自动更新色板与变量文件。"
                : "Regenerate CSS tokens automatically on git push."
            },
            {
              key: "aa",
              checked: strictAa,
              toggle: () => setStrictAa((v) => !v),
              title: isZh ? "启用 AA 对比度硬门禁" : "Enforce strict WCAG AA contrast",
              desc: isZh
                ? "阻断正文对比度低于 4.5:1 的皮肤合并。"
                : "Block builds when ink contrast drops below 4.5:1."
            }
          ].map((sw) => (
            <div
              key={sw.key}
              className="flex items-center justify-between gap-3 border-t pt-3"
              style={{ borderColor: palette.border }}
            >
              <div>
                <div className="text-xs font-semibold">{sw.title}</div>
                <div className="text-[11px]" style={{ color: palette.muted }}>
                  {sw.desc}
                </div>
              </div>
              <button
                type="button"
                aria-pressed={sw.checked}
                onClick={sw.toggle}
                className="flex h-6 w-11 shrink-0 cursor-pointer items-center px-0.5 transition-all"
                style={{
                  backgroundColor: sw.checked ? palette.accent : p.elevatedAlphaBg,
                  border: `1px solid ${palette.border}`,
                  borderRadius: `${p.badgeRadiusPx === 999 ? 999 : p.ctrlRadiusPx}px`,
                  justifyContent: sw.checked ? "flex-end" : "flex-start"
                }}
              >
                <span
                  className="h-4 w-4"
                  style={{
                    backgroundColor: sw.checked ? palette.accentFg : palette.ink,
                    borderRadius: `${p.badgeRadiusPx === 999 ? 999 : Math.max(0, p.ctrlRadiusPx - 2)}px`
                  }}
                />
              </button>
            </div>
          ))}

          <div
            className="flex items-center justify-between border-t pt-3"
            style={{ borderColor: palette.border }}
          >
            <span className="font-mono text-[11px]" style={{ color: palette.muted }}>
              75,400 / 100,000 API calls
            </span>
            <button
              type="button"
              onClick={() => setSavedNotice(true)}
              className="h-8 cursor-pointer px-4 text-xs font-semibold"
              style={h.btnPrimary}
            >
              {isZh ? "保存配置" : "Save Settings"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TypographyStageTemplate({
  style,
  physics: p,
  cardStyle,
  isZh
}: StageTemplateContext) {
  const { palette } = p;
  const h = makeStageHelpers(p);

  return (
    <article className="mx-auto grid max-w-[740px] gap-6 p-6 sm:p-8" style={cardStyle}>
      {/* Meta Header */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 font-mono text-[11px]"
        style={{ borderColor: palette.border, color: palette.muted }}
      >
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 font-semibold" style={h.badgeAccent}>
            {isZh ? "设计工程长文" : "ESSAY // DESIGN SYSTEMS"}
          </span>
          <span>{isZh ? "阅读约 6 分钟" : "6 min read"}</span>
        </div>
        <span>
          {style.fonts.display} / {style.fonts.mono}
        </span>
      </div>

      {/* Article Title + Lead */}
      <header className="grid gap-3">
        <h2
          className="text-[clamp(26px,3.4vw,38px)] leading-[1.1] font-bold"
          style={{ fontFamily: p.fontDisplayCss, letterSpacing: p.letterSpacing }}
        >
          {isZh
            ? "结构化字阶与克制留白，比装饰特效更能拉高专业质感"
            : "Calibrated typographic measure outlasts ornamental UI chrome."}
        </h2>
        <p className="text-[15.5px] leading-[1.6]" style={{ color: palette.muted }}>
          {isZh
            ? "优秀的阅读与工程文档界面从行宽、行高、等宽数字对齐以及明暗层次起步，让读者在 3 秒内扫清主次关系。"
            : "High-craft interfaces prioritize reading measure, consistent baseline cadence, and predictable contrast transitions before adding shadow depth."}
        </p>
      </header>

      {/* Section H2 + Body */}
      <section className="grid gap-3 border-t pt-5" style={{ borderColor: palette.border }}>
        <h3 className="text-lg font-semibold" style={{ fontFamily: p.fontDisplayCss }}>
          {isZh ? "01 · 收紧行宽与负字距控制" : "01 · Constrained Measure & Negative Tracking"}
        </h3>
        <p className="text-[14.5px] leading-[1.72]" style={{ color: palette.ink }}>
          {isZh
            ? "将正文阅读行宽稳定控制在 60–70 个英文字符（中文约 34–40 字）内，能够显著减轻长段阅读时的眼动疲劳；大字号标题采用适度负字距收紧字符空气，正文回归自然 0 字距以保证清晰辨识。"
            : "Constraining editorial columns near 65ch dramatically reduces horizontal eye travel. Oversized display headlines tighten tracking slightly to lock silhouette cohesion while body sizes keep crisp open counters."}
        </p>
      </section>

      {/* Blockquote Callout */}
      <blockquote
        className="m-0 border-l-[3px] px-4 py-2.5 text-[14px] leading-[1.65]"
        style={{
          borderColor: palette.accent,
          backgroundColor: p.elevatedAlphaBg,
          color: palette.ink
        }}
      >
        {isZh
          ? "“真正耐看的产品界面从不为空白焦虑；把 90% 的画布交给中性底色，把仅剩的高饱和强调留给最关键的决定动作。”"
          : "“Durable software typography respects quiet negative space—allocating 90% neutral tone so one primary accent signal always reads unmistakably.”"}
      </blockquote>

      {/* Subheading + Code Demonstration Block */}
      <section className="grid gap-3">
        <h4 className="text-sm font-semibold" style={{ fontFamily: p.fontDisplayCss }}>
          {isZh ? "02 · 等宽数字与设计变量契约" : "02 · Tabular Numerals & Token Contract"}
        </h4>
        <div
          className="grid gap-2 p-4 font-mono text-xs"
          style={{
            backgroundColor: p.elevatedAlphaBg,
            border: `${p.borderWidthPx}px solid ${palette.border}`,
            borderRadius: `${p.ctrlRadiusPx}px`
          }}
        >
          <div
            className="flex items-center justify-between border-b pb-2 text-[10.5px]"
            style={{ borderColor: palette.border, color: palette.muted }}
          >
            <span className="inline-flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5" style={{ color: palette.accent }} />
              <span>styles/{style.slug}/tokens.css</span>
            </span>
            <span style={{ color: palette.accent }}>font-variant-numeric: tabular-nums</span>
          </div>
          <pre className="m-0 overflow-x-auto leading-relaxed" style={{ color: palette.ink }}>
            {`:root {
  --ui-canvas: ${palette.canvas};
  --ui-surface: ${palette.surface};
  --ui-accent: ${palette.accent};
  --ui-radius: ${p.cardRadiusPx}px;
}`}
          </pre>
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]"
          style={{ color: palette.muted }}
        >
          <span>0123456789 · $12,840.90 · 99.98% SLA</span>
          <span>Tracking {style.fonts.tracking}</span>
        </div>
      </section>
    </article>
  );
}
