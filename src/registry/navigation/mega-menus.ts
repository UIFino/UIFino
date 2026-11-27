import type { AppLocale } from "@/i18n/routing";

export type NavChannelKey = "catalog" | "components" | "templates" | "tools" | "mcp";

export interface GlobalNavLink {
  readonly label: string;
  readonly href: string;
}

export interface GlobalNavPrimaryColumn {
  readonly heading: string;
  readonly elevatedLinks: readonly GlobalNavLink[];
  readonly secondaryLinks?: readonly GlobalNavLink[];
}

export interface GlobalNavSecondaryColumn {
  readonly heading: string;
  readonly links: readonly GlobalNavLink[];
}

export interface GlobalNavFlyoutConfig {
  readonly primary: GlobalNavPrimaryColumn;
  readonly columns: readonly GlobalNavSecondaryColumn[];
}

export function getGlobalNavFlyouts(
  locale: AppLocale
): Record<NavChannelKey, GlobalNavFlyoutConfig> {
  const isZh = locale === "zh";

  return {
    catalog: {
      primary: {
        heading: isZh ? "探索设计图鉴" : "Explore Design Specs",
        elevatedLinks: [
          { label: isZh ? "浏览全部图鉴" : "Explore All Specs", href: "/catalog" },
          { label: "Linear", href: "/catalog/linear" },
          { label: "Claude", href: "/catalog/claude" },
          { label: "Vercel", href: "/catalog/vercel" },
          { label: "Stripe", href: "/catalog/stripe" },
          { label: "Raycast", href: "/catalog/raycast" },
          { label: "Flighty iOS", href: "/catalog/flighty" }
        ]
      },
      columns: [
        {
          heading: isZh ? "更多标杆品牌" : "More Brands",
          links: [
            { label: "Supabase", href: "/catalog/supabase" },
            { label: "Notion", href: "/catalog/notion" },
            { label: "Resend", href: "/catalog/resend" },
            { label: "Arc Search", href: "/catalog/arc-search" },
            { label: "Luma", href: "/catalog/luma-app" },
            { label: "Mercury Banking", href: "/catalog/mercury-app" }
          ]
        },
        {
          heading: isZh ? "按平台与行业" : "Platforms & Domains",
          links: [
            { label: isZh ? "Websites 桌面网站" : "Websites", href: "/catalog?kind=website" },
            { label: isZh ? "Mobile Apps 移动应用" : "Mobile Apps", href: "/catalog?kind=app" },
            { label: isZh ? "AI 与大模型" : "AI & LLM Platforms", href: "/catalog?category=AI+%26+LLM" },
            { label: isZh ? "开发者工具" : "Developer Tools", href: "/catalog?category=DevTools" },
            { label: isZh ? "效率与协作" : "Productivity & SaaS", href: "/catalog?category=Productivity" },
            { label: isZh ? "金融与账单" : "Fintech & Payments", href: "/catalog?category=Fintech" }
          ]
        }
      ]
    },

    components: {
      primary: {
        heading: isZh ? "探索组件库" : "Explore Components",
        elevatedLinks: [
          { label: isZh ? "浏览全部分类" : "Explore All Components", href: "/components" },
          {
            label: isZh ? "三栏实时工作台" : "3-Column Workbench",
            href: "/components/hero/hero-telemetry-counter"
          },
          { label: isZh ? "首屏区块 (Hero)" : "Hero Sections", href: "/components/hero" },
          { label: isZh ? "特性与便当格" : "Bento & Features", href: "/components/bento-features" },
          { label: isZh ? "定价与套餐" : "Pricing & Tiers", href: "/components/pricing" },
          { label: isZh ? "登录与身份认证" : "Authentication", href: "/components/auth" },
          { label: isZh ? "数据表格与日志" : "Data Tables & Logs", href: "/components/data-table" }
        ]
      },
      columns: [
        {
          heading: isZh ? "区块与模块" : "Sections & Blocks",
          links: [
            { label: isZh ? "口碑与客户墙" : "Testimonials & Logos", href: "/components/social-proof" },
            { label: isZh ? "底部转化与页脚" : "CTA & Footers", href: "/components/cta-footer" },
            { label: isZh ? "命令面板 (⌘K)" : "Command & Search", href: "/components/command-menu" },
            { label: isZh ? "设置与密钥管理" : "Settings & API Keys", href: "/components/settings-billing" },
            { label: isZh ? "空状态与异常恢复" : "Empty & Error States", href: "/components/empty-states" }
          ]
        },
        {
          heading: isZh ? "整页与动效" : "Pages & Motion",
          links: [
            { label: isZh ? "完整产品落地页" : "Product Landing Pages", href: "/components/landing-pages" },
            { label: isZh ? "后台工作台整页" : "Workspace Dashboards", href: "/components/dashboard-pages" },
            { label: isZh ? "文档与更新日志页" : "Docs & Changelog Pages", href: "/components/docs-changelog" },
            { label: isZh ? "数字滚动与跳动" : "Counters & Tickers", href: "/components/counters-tickers" },
            { label: isZh ? "光标聚光与微光" : "Spotlight & Sheen", href: "/components/pointer-surfaces" },
            { label: isZh ? "序列入场与进度" : "Stagger & Progress", href: "/components/stagger-reveal" }
          ]
        },
        {
          heading: isZh ? "代码框架" : "Frameworks",
          links: [
            { label: "React", href: "/components/hero/hero-telemetry-counter?fw=react" },
            { label: "Vue", href: "/components/hero/hero-telemetry-counter?fw=vue" },
            { label: "Svelte", href: "/components/hero/hero-telemetry-counter?fw=svelte" },
            { label: "Solid", href: "/components/hero/hero-telemetry-counter?fw=solid" }
          ]
        }
      ]
    },

    templates: {
      primary: {
        heading: isZh ? "探索整站模板" : "Explore Templates",
        elevatedLinks: [
          { label: isZh ? "浏览全部模板" : "Explore All Templates", href: "/templates" },
          { label: isZh ? "Obsidian SaaS 整站" : "Obsidian SaaS Starter", href: "/templates/obsidian-saas-kit" },
          { label: isZh ? "Editorial AI 工作台" : "Editorial AI Workspace", href: "/templates/parchment-agent-desk" },
          { label: isZh ? "Protocol 技术文档站" : "Protocol Docs & SDK Hub", href: "/templates/monochrome-docs-hub" },
          { label: isZh ? "Ledger 监控后台" : "Fintech Telemetry Console", href: "/templates/ledger-telemetry-admin" }
        ]
      },
      columns: [
        {
          heading: isZh ? "按场景分类" : "Categories",
          links: [
            { label: isZh ? "SaaS 与 AI 产品" : "SaaS & AI", href: "/templates?category=SaaS+%26+AI" },
            { label: isZh ? "技术文档与 SDK" : "Docs & Changelog", href: "/templates?category=Docs" },
            { label: isZh ? "监控与管理后台" : "Dashboards & Admin", href: "/templates?category=Dashboard" }
          ]
        },
        {
          heading: isZh ? "设计规范联动" : "Design Skins",
          links: [
            { label: isZh ? "套用 Linear 皮肤预览" : "Preview with Linear Skin", href: "/components/landing-pages/page-devtools-launch?skin=linear" },
            { label: isZh ? "套用 Claude 皮肤预览" : "Preview with Claude Skin", href: "/components/landing-pages/page-editorial-ai?skin=claude" },
            { label: isZh ? "套用 Vercel 皮肤预览" : "Preview with Vercel Skin", href: "/components/docs-changelog/page-3col-reference?skin=vercel" },
            { label: isZh ? "套用 Stripe 皮肤预览" : "Preview with Stripe Skin", href: "/components/dashboard-pages/page-observability-console?skin=stripe" }
          ]
        }
      ]
    },

    tools: {
      primary: {
        heading: isZh ? "探索视觉工具" : "Explore Studios",
        elevatedLinks: [
          { label: isZh ? "参数化背景生成器" : "Background Generator", href: "/tools/background" },
          { label: isZh ? "阴影与表面令牌实验室" : "Shadow & Surface Lab", href: "/tools/shadow" }
        ]
      },
      columns: [
        {
          heading: isZh ? "背景预设直达" : "Background Presets",
          links: [
            { label: isZh ? "Obsidian 精密网格" : "Obsidian Grid", href: "/tools/background?preset=linear-grid" },
            { label: isZh ? "单色建筑细线" : "Monochrome Wire", href: "/tools/background?preset=vercel-hairline" },
            { label: isZh ? "荧光极光渐变" : "Chartreuse Aurora", href: "/tools/background?preset=borealis-lime" },
            { label: isZh ? "电光蓝紫弥散" : "Blurple Glow", href: "/tools/background?preset=stripe-mesh" },
            { label: isZh ? "暖纸胶片颗粒" : "Warm Parchment Grain", href: "/tools/background?preset=claude-grain" },
            { label: isZh ? "精密点阵矩阵" : "Precision Dot Matrix", href: "/tools/background?preset=dot-matrix" }
          ]
        },
        {
          heading: isZh ? "阴影预设直达" : "Shadow Presets",
          links: [
            { label: isZh ? "零阴影细线平铺" : "Hairline Flat", href: "/tools/shadow?preset=hairline-flat" },
            { label: isZh ? "微浮层面板阴影" : "Subtle Panel", href: "/tools/shadow?preset=linear-panel" },
            { label: isZh ? "悬浮命令框阴影" : "Floating Command", href: "/tools/shadow?preset=raycast-float" },
            { label: isZh ? "清爽亮色卡片阴影" : "Crisp Light Card", href: "/tools/shadow?preset=stripe-clean" }
          ]
        }
      ]
    },

    mcp: {
      primary: {
        heading: isZh ? "接入到 AI" : "Connect to AI",
        elevatedLinks: [
          { label: isZh ? "MCP 接入概览" : "MCP Server Setup", href: "/mcp" },
          { label: isZh ? "智能检索沙盒" : "Live Retrieval Sandbox", href: "/mcp#sandbox" },
          { label: "Claude Code", href: "/mcp?client=claude-code" },
          { label: "Cursor", href: "/mcp?client=cursor" },
          { label: "Windsurf", href: "/mcp?client=windsurf" },
          { label: "Codex CLI", href: "/mcp?client=codex" }
        ]
      },
      columns: [
        {
          heading: isZh ? "按风格检索预览" : "Retrieve by Style",
          links: [
            { label: isZh ? "暗色极简细线风" : "Dark Minimal Hairline", href: "/mcp?style=dark-minimal#sandbox" },
            { label: isZh ? "温暖人文衬线风" : "Warm Editorial Serif", href: "/mcp?style=warm-editorial#sandbox" },
            { label: isZh ? "黑白开发者工具风" : "Monochrome DevTools", href: "/mcp?style=monochrome-devtools#sandbox" },
            { label: isZh ? "金融清晰账单风" : "Fintech Clean Ledger", href: "/mcp?style=fintech-clean#sandbox" }
          ]
        },
        {
          heading: isZh ? "协议能力范围" : "Exposed Capabilities",
          links: [
            { label: isZh ? "检索品牌 DESIGN.md" : "Search Brand DESIGN.md", href: "/catalog" },
            { label: isZh ? "匹配区块与模块" : "Match UI Sections & Blocks", href: "/components" },
            { label: isZh ? "拉取多框架组件源码" : "Fetch Multi-Framework Code", href: "/components/hero/hero-telemetry-counter?tab=code" },
            { label: isZh ? "生成表面与背景令牌" : "Generate Surface Tokens", href: "/tools/background" }
          ]
        }
      ]
    }
  };
}
