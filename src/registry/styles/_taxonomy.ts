import type { StyleGroup, StyleScenario, StyleTone } from "@/core/styles";

export type StyleToneFilter = "all" | StyleTone;
export type StyleScenarioFilter = "all" | StyleScenario;

export const STYLE_TONE_FILTERS: readonly StyleToneFilter[] = ["all", "dark", "light"];

export const STYLE_SCENARIO_FILTERS: readonly StyleScenarioFilter[] = [
  "all",
  "landing",
  "dashboard",
  "ai-workspace",
  "docs"
];

export const STYLE_GROUP_LABELS: Record<
  StyleGroup,
  { readonly zh: string; readonly en: string }
> = {
  minimal: { zh: "现代克制", en: "Minimal" },
  expressive: { zh: "质感先锋", en: "Expressive" }
};

export const STYLE_TONE_LABELS: Record<
  StyleToneFilter,
  { readonly zh: string; readonly en: string }
> = {
  all: { zh: "全部", en: "All" },
  dark: { zh: "深色系", en: "Dark" },
  light: { zh: "浅色系", en: "Light" }
};

export const STYLE_SCENARIO_LABELS: Record<
  StyleScenarioFilter,
  { readonly zh: string; readonly en: string }
> = {
  all: { zh: "全部", en: "All" },
  landing: { zh: "宣传官网", en: "Landing" },
  dashboard: { zh: "数据后台", en: "Dashboard" },
  "ai-workspace": { zh: "智能工作台", en: "AI Studio" },
  docs: { zh: "文档阅读", en: "Docs" }
};
