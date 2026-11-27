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
}
