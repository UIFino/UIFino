import { findCatalogBrandById } from "@/registry/catalog";
import { findUiStyleBySlug } from "@/registry/styles";
import type { StarterTemplateSpec } from "./_taxonomy";

export type SandboxRouteKind =
  | "landing"
  | "pricing"
  | "docs"
  | "changelog"
  | "login"
  | "dashboard"
  | "chat"
  | "settings";

export interface TemplateRoutePageSpec {
  readonly path: string;
  readonly labelZh: string;
  readonly labelEn: string;
  readonly summaryZh: string;
  readonly summaryEn: string;
  readonly kind: SandboxRouteKind;
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

function resolveRouteKind(routeName: string, tplScene: StarterTemplateSpec["scene"]): SandboxRouteKind {
  const r = routeName.toLowerCase();
  if (r.includes("pric") || r.includes("tier") || r.includes("addon") || r.includes("faq")) return "pricing";
  if (r.includes("doc") || r.includes("api") || r.includes("guide") || r.includes("search")) return "docs";
  if (r.includes("change") || r.includes("release") || r.includes("note") || r.includes("post")) return "changelog";
  if (r.includes("sign") || r.includes("login") || r.includes("passkey") || r.includes("auth") || r.includes("reset")) return "login";
  if (r.includes("chat") || r.includes("thread") || r.includes("artifact") || r.includes("memory")) return "chat";
  if (r.includes("setting") || r.includes("key") || r.includes("member") || r.includes("billing")) return "settings";
  if (r.includes("overview") || r.includes("node") || r.includes("log") || r.includes("alert") || r.includes("kpi") || r.includes("table") || tplScene === "admin") {
    return "dashboard";
  }
  return "landing";
}

function buildRoutePath(routeName: string, index: number, kind: StarterTemplateSpec["kind"]): string {
  if (index === 0) return "/";
  const slug = routeName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return kind === "page" ? `/#${slug}` : `/${slug}`;
}

const DEFAULT_BLOCKS_BY_SCENE: Record<string, readonly TemplateIncludedBlock[]> = {
  "ai-studio": [
    { id: "ai-chat-agent-thread", href: "/components/ai-chat/ai-chat-agent-thread", nameZh: "Agent 工具链对话流", nameEn: "Agent Tool Thread", roleZh: "主会话区", roleEn: "Chat Workspace" },
    { id: "sidebar-collapsible-rail", href: "/components/sidebars/sidebar-collapsible-rail", nameZh: "可折叠工作区侧栏", nameEn: "Collapsible Sidebar", roleZh: "会话导航", roleEn: "Session Rail" },
    { id: "cmdk-protocol-palette", href: "/components/command/cmdk-protocol-palette", nameZh: "全局指令检索框", nameEn: "Command Palette", roleZh: "快捷呼出", roleEn: "Quick Actions" },
    { id: "empty-wireframe-state", href: "/components/empty/empty-wireframe-state", nameZh: "建筑线框空态占位", nameEn: "Wireframe Empty State", roleZh: "新建引导", roleEn: "Zero State" }
  ],
  admin: [
    { id: "sidebar-collapsible-rail", href: "/components/sidebars/sidebar-collapsible-rail", nameZh: "可折叠侧边栏", nameEn: "Workspace Sidebar", roleZh: "模块菜单", roleEn: "Nav Rail" },
    { id: "stats-kpi-strip", href: "/components/stats/stats-kpi-strip", nameZh: "4 列核心指标条", nameEn: "KPI Strip", roleZh: "实时概览", roleEn: "Top Metrics" },
    { id: "table-telemetry-directory", href: "/components/tables/table-telemetry-directory", nameZh: "等宽遥测数据表", nameEn: "Telemetry Table", roleZh: "节点明细", roleEn: "Data Grid" },
    { id: "form-webhook-modal", href: "/components/forms/form-webhook-modal", nameZh: "表单配置对话框", nameEn: "Webhook Modal", roleZh: "新增操作", roleEn: "Form Action" }
  ],
  auth: [
    { id: "auth-passkey-card", href: "/components/auth/auth-passkey-card", nameZh: "Passkey 通行密钥卡", nameEn: "Passkey Auth Card", roleZh: "主登录框", roleEn: "Auth Core" },
    { id: "auth-sso-split", href: "/components/auth/auth-sso-split", nameZh: "双栏企业 SSO 认证", nameEn: "SSO Split Auth", roleZh: "安全登录", roleEn: "SSO Panel" }
  ]
};

const MARKETING_BLOCKS: readonly TemplateIncludedBlock[] = [
  { id: "navbar-sticky-flyout", href: "/components/navbars/navbar-sticky-flyout", nameZh: "吸顶结构化顶栏", nameEn: "Sticky Navbar", roleZh: "全局导航", roleEn: "Top Nav" },
  { id: "hero-telemetry-counter", href: "/components/hero/hero-telemetry-counter", nameZh: "等宽计数首屏", nameEn: "Telemetry Hero", roleZh: "首屏转化", roleEn: "Hero Fold" },
  { id: "bento-protocol-grid", href: "/components/bento/bento-protocol-grid", nameZh: "结构化便当网格", nameEn: "Protocol Bento Grid", roleZh: "核心卖点", roleEn: "Features" },
  { id: "pricing-3tier-divided", href: "/components/pricing/pricing-3tier-divided", nameZh: "1px 分割三档定价", nameEn: "Three-Tier Pricing", roleZh: "商业报价", roleEn: "Pricing" },
  { id: "cta-cli-launchpad", href: "/components/cta/cta-cli-launchpad", nameZh: "CLI 安装号召带", nameEn: "CLI Launchpad CTA", roleZh: "收口引导", roleEn: "Bottom CTA" },
  { id: "footer-architectural-columns", href: "/components/footers/footer-architectural-columns", nameZh: "多栏建筑网格页脚", nameEn: "Sitemap Footer", roleZh: "底部索引", roleEn: "Footer" }
];

const ROUTE_SUMMARIES: Record<SandboxRouteKind, { readonly zh: string; readonly en: string }> = {
  landing: { zh: "含吸顶导航、大字标题首屏、双行动按钮与核心卖点矩阵。", en: "Sticky nav, hero fold, dual CTA & core capabilities grid." },
  pricing: { zh: "按月/按年切换开关、三档透明对比与企业版 CTA。", en: "Monthly/yearly toggle, 3-tier feature matrix & enterprise CTA." },
  docs: { zh: "左侧文档树、结构化 API 说明正文与代码块复制条。", en: "Sidebar tree, API reference prose & copyable code snippets." },
  changelog: { zh: "按版本号与时间线排列的更新发布卡片流。", en: "Chronological release notes with semantic version badges." },
  login: { zh: "邮箱验证码、GitHub/Google SSO 与硬件 Passkey 登录。", en: "Email verification, SSO providers & hardware passkey auth." },
  dashboard: { zh: "顶部实时 KPI 等宽指标栏与可交互状态筛选表格。", en: "Tabular KPI metrics strip paired with live telemetry table." },
  chat: { zh: "多步骤工具调用输出流、引用溯源卡与底部指令输入框。", en: "Streaming tool trace cards, citations & bottom prompt composer." },
  settings: { zh: "工作区权限开关、API Key 列表与安全策略表单。", en: "Workspace policy switches, API tokens table & team roles." }
};

export function getTemplateDetailBundle(template: StarterTemplateSpec): TemplateDetailBundle {
  const brand = findCatalogBrandById(template.skinId);
  const style = findUiStyleBySlug(template.skinId);
  const fonts = brand?.fonts ?? style?.fonts ?? {
    display: "Geist",
    body: "Inter",
    mono: "JetBrains Mono",
    tracking: "-0.025em"
  };

  const isStarter = template.kind === "starter";

  const goodForZh = isStarter
    ? [`${template.category} 完整多页应用`, "需要统一明暗主题变量", "快速接入 AI 扩展子页"]
    : [`${template.category} 标准独立页`, "单文件直接嵌入现有项目", "高复用板块快速装配"];
  const goodForEn = isStarter
    ? [`Full multi-route ${template.category} app`, "Shared Light/Dark CSS tokens", "AI-ready page expansion"]
    : [`Standalone ${template.category} page`, "Drop into existing Next.js app", "Modular section composition"];

  const notForZh = ["非预期业务强耦合复杂 ERP", "未开启 Tailwind v4 的旧工程"];
  const notForEn = ["Legacy non-Tailwind codebases", "Heavy custom Canvas/WebGL apps"];

  const routePages: TemplateRoutePageSpec[] = template.routes.map((routeName, idx) => {
    const kind = resolveRouteKind(routeName, template.scene);
    const path = buildRoutePath(routeName, idx, template.kind);
    const summary = ROUTE_SUMMARIES[kind];
    return {
      path,
      labelZh: idx === 0 ? `首页 ${routeName}` : routeName,
      labelEn: routeName,
      summaryZh: summary.zh,
      summaryEn: summary.en,
      kind
    };
  });

  const includedBlocks = DEFAULT_BLOCKS_BY_SCENE[template.scene] ?? MARKETING_BLOCKS;

  const directoryTree = isStarter
    ? `${template.id}/
├── DESIGN.md                     # 配套设计协议（AI 施工护栏）
├── package.json                  # Next.js 15 + React 19 + Tailwind v4
└── src/
    ├── styles/
    │   └── tokens.css            # ${template.skinLabel} 双主题 CSS 变量
    ├── components/
    │   ├── shell/                # 顶栏与页脚公共壳层
    │   └── sections/             # 可独立拆走复用的界面积木
    └── app/
${routePages
  .map((rp) => {
    const seg = rp.path === "/" ? "page.tsx" : `${rp.path.replace(/^\//, "")}/page.tsx`;
    return `        ├── ${seg.padEnd(22, " ")} # ${rp.labelEn}`;
  })
  .join("\n")}`
    : `${template.id}/
├── DESIGN.md                     # 页面约束与色阶契约
└── src/
    ├── styles/
    │   └── tokens.css            # ${template.skinLabel} 变量
    ├── components/
${includedBlocks
  .slice(0, 4)
  .map((b) => `    │   └── ${b.id}.tsx`)
  .join("\n")}
    └── app/${template.scene}/page.tsx`;

  const cssVariables = `/* Template Tokens: ${template.name} (${template.skinLabel}) */
:root {
  --tpl-canvas: ${template.canvas};
  --tpl-surface: ${template.surface};
  --tpl-border: ${template.border};
  --tpl-accent: ${template.accent};
  --tpl-font-display: "${fonts.display}", system-ui, sans-serif;
  --tpl-font-body: "${fonts.body}", system-ui, sans-serif;
  --tpl-font-mono: "${fonts.mono}", ui-monospace, monospace;
}`;

  const aiPrompt = `# 全站模板 AI 复刻指令 — ${template.nameZh} (${template.id})

请直接按以下工程规格生成或重构目标项目，不要反问：

## 1. 模板与皮肤契约
- 模板类型：${isStarter ? "多路由整站工程 (Next.js App Router)" : "单页高复用组合模板"}
- 视觉基准：${template.skinLabel}
- 页面结构：${routePages.map((p) => `${p.labelZh} (${p.path})`).join(" · ")}

## 2. 强制色彩与字体令牌
\`\`\`css
${cssVariables}
\`\`\`

## 3. 核心组成积木与工程目录树
\`\`\`
${directoryTree}
\`\`\`

## 4. 落地要求
- 所有界面色值绑定 \`--tpl-*\` 变量，禁止硬编码孤岛颜色。
- 严格遵循桌面端响应式栅格与数字 \`tabular-nums\` 对齐。
- 优先使用命令行快速生成骨架：\`npx uifino@latest create ${template.id}\``;

  return {
    goodForZh,
    goodForEn,
    notForZh,
    notForEn,
    routePages,
    includedBlocks,
    fontDisplay: fonts.display,
    fontBody: fonts.body,
    fontMono: fonts.mono,
    licenseNoteZh: "开源可商用字体配对（Google Fonts OFL 协议）",
    licenseNoteEn: "Commercial-ready open-source font pairing (OFL)",
    directoryTree,
    cssVariables,
    aiPrompt
  };
}
