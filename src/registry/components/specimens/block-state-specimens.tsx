"use client";

import { useState } from "react";
import { AlertCircle, Loader2, RotateCcw, SearchX } from "lucide-react";
import type { ComponentAssetMeta } from "@/core/codegen";
import type { ResolvedWorkbenchTokens } from "@/core/tokens";

export interface BlockStateStageProps {
  readonly item: ComponentAssetMeta;
  readonly tokens: ResolvedWorkbenchTokens;
  readonly isMobile: boolean;
  readonly isZh: boolean;
}

type BlockStateKind = "loading" | "empty";

export function BlockStateStage({ item, tokens: tk, isMobile, isZh }: BlockStateStageProps) {
  const [stateKind, setStateKind] = useState<BlockStateKind>(
    item.archetype === "empty-state" ? "empty" : "loading"
  );

  const isLoading = stateKind === "loading";
  const pad = isMobile ? "16px" : tk.padStage;

  const renderStateBody = () => {
    switch (item.archetype) {
      case "data-table":
        return (
          <div
            className="overflow-x-auto border"
            style={{ backgroundColor: tk.surface, borderColor: tk.border, borderRadius: tk.card }}
          >
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr
                  className="border-b font-mono text-[10.5px]"
                  style={{ borderColor: tk.border, color: tk.muted }}
                >
                  <th className="px-3 py-2">{isZh ? "资源服务" : "RESOURCE"}</th>
                  <th className="px-3 py-2">{isZh ? "类型" : "TYPE"}</th>
                  <th className="px-3 py-2">{isZh ? "状态" : "STATUS"}</th>
                  <th className="px-3 py-2 text-right">{isZh ? "延迟" : "LATENCY"}</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  [0, 1, 2].map((row) => (
                    <tr key={row} className="border-t" style={{ borderColor: tk.border }}>
                      <td className="px-3 py-3">
                        <div
                          className="h-3 w-32 animate-pulse"
                          style={{ backgroundColor: tk.border, borderRadius: tk.ctrl }}
                        />
                      </td>
                      <td className="px-3 py-3">
                        <div
                          className="h-3 w-14 animate-pulse"
                          style={{ backgroundColor: tk.elevated, borderRadius: tk.ctrl }}
                        />
                      </td>
                      <td className="px-3 py-3">
                        <div
                          className="h-3 w-16 animate-pulse"
                          style={{ backgroundColor: tk.elevated, borderRadius: tk.ctrl }}
                        />
                      </td>
                      <td className="px-3 py-3">
                        <div
                          className="ml-auto h-3 w-10 animate-pulse"
                          style={{ backgroundColor: tk.border, borderRadius: tk.ctrl }}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center">
                      <div className="mx-auto grid max-w-[300px] justify-items-center gap-2">
                        <SearchX className="h-5 w-5" style={{ color: tk.muted }} />
                        <div className="font-semibold">
                          {isZh ? "当前筛选条件下无匹配记录" : "No matching audit records"}
                        </div>
                        <span
                          className="inline-flex items-center gap-1 border px-2.5 py-1 text-[11px]"
                          style={{
                            borderColor: tk.border,
                            borderRadius: tk.ctrl,
                            color: tk.accent
                          }}
                        >
                          <RotateCcw className="h-3 w-3" />
                          {isZh ? "清空筛选条件" : "Reset filters"}
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );

      case "stats-kpi":
        return isLoading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: tk.gap
            }}
          >
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                className="grid gap-2.5 border p-3.5"
                style={{
                  backgroundColor: tk.surface,
                  borderColor: tk.border,
                  borderRadius: tk.card
                }}
              >
                <div className="flex justify-between">
                  <div
                    className="h-3 w-16 animate-pulse"
                    style={{ backgroundColor: tk.border, borderRadius: tk.ctrl }}
                  />
                  <div
                    className="h-3 w-10 animate-pulse"
                    style={{ backgroundColor: tk.elevated, borderRadius: tk.badge }}
                  />
                </div>
                <div
                  className="h-6 w-24 animate-pulse"
                  style={{ backgroundColor: tk.border, borderRadius: tk.ctrl }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="flex flex-wrap items-center justify-between gap-3 border p-4"
            style={{ backgroundColor: tk.surface, borderColor: "#FF5C5C", borderRadius: tk.card }}
          >
            <div className="flex items-center gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 text-[#FF5C5C]" />
              <div>
                <div className="text-xs font-semibold">
                  {isZh ? "指标聚合流暂时断开" : "Telemetry feed temporarily unavailable"}
                </div>
                <div className="text-[11px]" style={{ color: tk.muted }}>
                  {isZh ? "最近一次成功快照来自 4 分钟前" : "Last healthy snapshot captured 4m ago"}
                </div>
              </div>
            </div>
            <span
              className="inline-flex h-8 items-center gap-1.5 border px-3 text-xs font-semibold"
              style={{
                borderColor: tk.border,
                backgroundColor: tk.elevated,
                borderRadius: tk.ctrl
              }}
            >
              <RotateCcw className="h-3 w-3" />
              {isZh ? "重新拉取" : "Retry Sync"}
            </span>
          </div>
        );

      case "auth-card":
      case "form-dialog":
        return (
          <div className="flex justify-center">
            <div
              className="grid w-full max-w-[380px] gap-3 border"
              style={{
                backgroundColor: tk.surface,
                borderColor: isLoading ? tk.border : "#FF5C5C",
                borderRadius: tk.card,
                padding: tk.padCard
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">
                  {item.archetype === "form-dialog"
                    ? isZh
                      ? "配置回调地址"
                      : "Webhook Endpoint"
                    : isZh
                      ? "登录工作区"
                      : "Sign in to Workspace"}
                </span>
                {isLoading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" style={{ color: tk.accent }} />
                ) : (
                  <AlertCircle className="h-3.5 w-3.5 text-[#FF5C5C]" />
                )}
              </div>

              <div className="grid gap-1">
                <div
                  className="flex h-9 items-center border px-3 font-mono text-xs"
                  style={{
                    backgroundColor: tk.canvas,
                    borderColor: isLoading ? tk.border : "#FF5C5C",
                    borderRadius: tk.ctrl,
                    color: isLoading ? tk.muted : tk.ink
                  }}
                >
                  {item.archetype === "form-dialog" ? "http://insecure.example.com" : "alex@gmail"}
                </div>
                {!isLoading ? (
                  <span className="text-[11px] text-[#FF5C5C]">
                    {item.archetype === "form-dialog"
                      ? isZh
                        ? "生产回调地址必须使用 HTTPS 协议"
                        : "Production webhook URL must use HTTPS"
                      : isZh
                        ? "请输入完整的企业邮箱地址格式"
                        : "Enter a valid corporate email address"}
                  </span>
                ) : null}
              </div>

              <div
                className="flex h-9 items-center justify-center gap-2 text-xs font-semibold"
                style={{
                  backgroundColor: isLoading ? tk.elevated : tk.accent,
                  color: isLoading ? tk.muted : tk.accentFg,
                  borderRadius: tk.ctrl
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>{isZh ? "正在验证提交中…" : "Submitting request…"}</span>
                  </>
                ) : (
                  <span>{isZh ? "修正后重试" : "Fix & Resubmit"}</span>
                )}
              </div>
            </div>
          </div>
        );

      case "ai-chat-thread":
        return (
          <div
            className="mx-auto grid max-w-[460px] gap-2.5 border p-3.5"
            style={{ backgroundColor: tk.surface, borderColor: tk.border, borderRadius: tk.card }}
          >
            {isLoading ? (
              <>
                <div
                  className="ml-auto px-3 py-1.5 text-xs"
                  style={{ backgroundColor: tk.elevated, borderRadius: tk.ctrl }}
                >
                  {isZh ? "排查过去一小时欧洲节点的延迟抖动" : "Inspect eu-west P99 latency spikes"}
                </div>
                <div
                  className="grid gap-1.5 border px-3 py-2.5 text-xs"
                  style={{
                    backgroundColor: tk.canvas,
                    borderColor: tk.border,
                    borderRadius: tk.ctrl
                  }}
                >
                  <div
                    className="flex items-center gap-1.5 font-mono text-[10.5px]"
                    style={{ color: tk.accent }}
                  >
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span>
                      {isZh ? "正在检索 fra1 边缘轨迹日志…" : "Querying fra1 trace logs…"}
                    </span>
                  </div>
                  <div
                    className="h-2.5 w-3/4 animate-pulse"
                    style={{ backgroundColor: tk.border, borderRadius: tk.ctrl }}
                  />
                </div>
              </>
            ) : (
              <div className="grid justify-items-center gap-2 py-4 text-center">
                <div className="text-xs font-semibold">
                  {isZh ? "输入问题开始排查日志或生成组件" : "Start a new trace inspection thread"}
                </div>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {[
                    isZh ? "查看 5xx 错误分布" : "Inspect 5xx rate",
                    isZh ? "生成定价页区块" : "Scaffold pricing tier"
                  ].map((promptChip) => (
                    <span
                      key={promptChip}
                      className="border px-2.5 py-1 text-[11px]"
                      style={{
                        backgroundColor: tk.canvas,
                        borderColor: tk.border,
                        borderRadius: tk.ctrl,
                        color: tk.muted
                      }}
                    >
                      {promptChip}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "cmdk-palette":
        return (
          <div className="flex justify-center">
            <div
              className="w-full max-w-[460px] overflow-hidden border"
              style={{ backgroundColor: tk.surface, borderColor: tk.border, borderRadius: tk.card }}
            >
              <div
                className="flex items-center justify-between border-b px-3.5 py-2.5 text-xs"
                style={{ borderColor: tk.border, color: tk.ink }}
              >
                <span className="font-mono">
                  {isLoading ? (isZh ? "正在索引节点…" : "billing-edge…") : "billing-legacy-v0"}
                </span>
                <span
                  className="border px-1.5 py-px font-mono text-[10px]"
                  style={{ borderColor: tk.border, borderRadius: tk.badge, color: tk.muted }}
                >
                  ESC
                </span>
              </div>
              {isLoading ? (
                <div className="grid gap-2 p-3">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-7 w-full animate-pulse"
                      style={{ backgroundColor: tk.elevated, borderRadius: tk.ctrl }}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid justify-items-center gap-2 px-4 py-6 text-center text-xs">
                  <SearchX className="h-4 w-4" style={{ color: tk.muted }} />
                  <div style={{ color: tk.muted }}>
                    {isZh
                      ? "未找到匹配「billing-legacy-v0」的结果"
                      : 'No results matching "billing-legacy-v0"'}
                  </div>
                  <span className="font-mono text-[11px]" style={{ color: tk.accent }}>
                    {isZh ? "按 Backspace 清空查询" : "Clear search query"}
                  </span>
                </div>
              )}
            </div>
          </div>
        );

      case "empty-state":
        return (
          <div className="flex justify-center">
            <div
              className="grid w-full max-w-[420px] justify-items-center gap-2.5 border border-dashed p-6 text-center"
              style={{
                backgroundColor: tk.surface,
                borderColor: isLoading ? tk.border : "#FF5C5C",
                borderRadius: tk.card
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" style={{ color: tk.accent }} />
                  <div className="text-xs font-semibold">
                    {isZh ? "正在同步部署列表…" : "Loading deployment history…"}
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-[#FF5C5C]" />
                  <div className="text-xs font-semibold">
                    {isZh
                      ? "无法拉取集群记录 (502 Bad Gateway)"
                      : "Failed to fetch cluster deployments (502)"}
                  </div>
                  <span
                    className="inline-flex h-8 items-center gap-1.5 px-3 text-xs font-semibold"
                    style={{
                      backgroundColor: tk.accent,
                      color: tk.accentFg,
                      borderRadius: tk.ctrl
                    }}
                  >
                    <RotateCcw className="h-3 w-3" />
                    {isZh ? "重新加载" : "Retry Request"}
                  </span>
                </>
              )}
            </div>
          </div>
        );

      case "sidebar-nav":
      case "navbar-bar":
      default:
        return (
          <div
            className="grid gap-3 border p-4"
            style={{ backgroundColor: tk.surface, borderColor: tk.border, borderRadius: tk.card }}
          >
            {isLoading ? (
              <>
                <div className="flex items-center justify-between">
                  <div
                    className="h-4 w-28 animate-pulse"
                    style={{ backgroundColor: tk.border, borderRadius: tk.ctrl }}
                  />
                  <div
                    className="h-6 w-20 animate-pulse"
                    style={{ backgroundColor: tk.elevated, borderRadius: tk.ctrl }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-3 w-full animate-pulse"
                      style={{ backgroundColor: tk.elevated, borderRadius: tk.ctrl }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span style={{ color: tk.muted }}>
                  {isZh ? "当前工作区尚未固定快捷项目" : "No pinned workspace items yet"}
                </span>
                <span
                  className="inline-flex h-7 items-center px-2.5 text-[11px] font-semibold"
                  style={{ backgroundColor: tk.accent, color: tk.accentFg, borderRadius: tk.ctrl }}
                >
                  {isZh ? "+ 新建目录" : "+ Add Item"}
                </span>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div style={{ backgroundColor: tk.canvas, color: tk.ink, padding: pad }}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-[11px]" style={{ color: tk.muted }}>
          {isZh ? `模块状态预览 · ${item.nameZh ?? item.name}` : `STATE PREVIEW · ${item.name}`}
        </span>
        <div
          className="inline-flex border text-[11px]"
          style={{ borderColor: tk.border, backgroundColor: tk.surface, borderRadius: tk.ctrl }}
        >
          {(
            [
              ["loading", isZh ? "加载骨架" : "Loading"],
              [
                "empty",
                item.archetype === "auth-card" || item.archetype === "form-dialog"
                  ? isZh
                    ? "校验报错"
                    : "Error"
                  : isZh
                    ? "空态/报错"
                    : "Empty / Error"
              ]
            ] as const
          ).map(([kind, lbl]) => {
            const active = stateKind === kind;
            return (
              <button
                key={kind}
                type="button"
                onClick={() => setStateKind(kind)}
                className="cursor-pointer px-2.5 py-1 font-medium transition-colors"
                style={{
                  backgroundColor: active ? tk.elevated : "transparent",
                  color: active ? tk.accent : tk.muted
                }}
              >
                {lbl}
              </button>
            );
          })}
        </div>
      </div>

      {renderStateBody()}
    </div>
  );
}
