import type { ComponentType } from "react";
import type { ThemeMode } from "@/core/tokens";

export type TemplateKind = "starter" | "page";
export type TemplateKindFilter = "all" | TemplateKind;

export type TemplateScene =
  | "saas"
  | "ai-studio"
  | "admin"
  | "docs"
  | "portfolio"
  | "blog"
  | "landing"
  | "pricing"
  | "auth"
  | "overview"
  | "changelog"
  | "settings";

export type TemplateSceneFilter = "all" | TemplateScene;

export type SandboxRouteKind =
  "landing" | "pricing" | "docs" | "changelog" | "login" | "dashboard" | "chat" | "settings";

export interface TemplateRoutePageSpec {
  readonly path: string;
  readonly labelZh: string;
  readonly labelEn: string;
  readonly summaryZh: string;
  readonly summaryEn: string;
  readonly kind?: SandboxRouteKind;
}

export interface TemplateIncludedBlock {
  readonly id: string;
  readonly href: string;
  readonly nameZh: string;
  readonly nameEn: string;
  readonly roleZh: string;
  readonly roleEn: string;
}

export interface TemplateDetailBundle {
  readonly goodForZh: readonly string[];
  readonly goodForEn: readonly string[];
  readonly notForZh: readonly string[];
  readonly notForEn: readonly string[];
  readonly routePages: readonly TemplateRoutePageSpec[];
  readonly includedBlocks: readonly TemplateIncludedBlock[];
  readonly fontDisplay: string;
  readonly fontBody: string;
  readonly fontMono: string;
  readonly licenseNoteZh: string;
  readonly licenseNoteEn: string;
  readonly directoryTree: string;
  readonly cssVariables: string;
  readonly aiPrompt: string;
}

export type TemplateDetailOverride = Partial<
  Omit<TemplateDetailBundle, "cssVariables" | "aiPrompt">
>;

export const STARTER_SCENES: readonly TemplateScene[] = [
  "saas",
  "ai-studio",
  "admin",
  "docs",
  "portfolio",
  "blog"
];

export const PAGE_SCENES: readonly TemplateScene[] = [
  "landing",
  "pricing",
  "auth",
  "overview",
  "changelog",
  "settings"
];

export const TEMPLATE_KIND_LABELS: Record<
  TemplateKindFilter,
  { readonly zh: string; readonly en: string }
> = {
  all: { zh: "全部模板", en: "All" },
  starter: { zh: "整站工程", en: "Starters" },
  page: { zh: "单页模板", en: "Pages" }
};

export const TEMPLATE_SCENE_LABELS: Record<
  TemplateSceneFilter,
  { readonly zh: string; readonly en: string }
> = {
  all: { zh: "全部场景", en: "All" },
  saas: { zh: "产品官网", en: "SaaS" },
  "ai-studio": { zh: "智能工作台", en: "AI Studio" },
  admin: { zh: "数据后台", en: "Admin" },
  docs: { zh: "技术文档", en: "Docs" },
  portfolio: { zh: "个人主页", en: "Portfolio" },
  blog: { zh: "博客周刊", en: "Blog" },
  landing: { zh: "落地首页", en: "Landing" },
  pricing: { zh: "定价方案", en: "Pricing" },
  auth: { zh: "登录认证", en: "Auth" },
  overview: { zh: "监控看板", en: "Overview" },
  changelog: { zh: "更新日志", en: "Changelog" },
  settings: { zh: "设置中心", en: "Settings" }
};

export interface StarterTemplateSpec {
  readonly id: string;
  readonly kind: TemplateKind;
  readonly scene: TemplateScene;
  readonly category: string;
  readonly name: string;
  readonly nameZh: string;
  readonly stack: string;
  readonly skinId: string;
  readonly skinLabel: string;
  readonly accent: string;
  readonly canvas: string;
  readonly surface: string;
  readonly border: string;
  readonly pagesCount: number;
  readonly routes: readonly string[];
  readonly descEn: string;
  readonly descZh: string;
  readonly SandboxComponent?: ComponentType<{
    readonly activePath: string;
    readonly mode: ThemeMode;
    readonly isZh: boolean;
  }>;
  readonly ThumbnailComponent?: ComponentType<{
    readonly mode: ThemeMode;
  }>;
  readonly detailOverride?: TemplateDetailOverride;
}
