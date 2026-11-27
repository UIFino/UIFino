import type { AppLocale } from "@/i18n/routing";

export type NavChannelKey = "catalog" | "components" | "templates" | "tools" | "mcp";

export interface MegaMenuLinkItem {
  readonly title: string;
  readonly desc: string;
  readonly href: string;
  readonly badge?: string;
  readonly dot?: string;
}

export interface MegaMenuFeaturedCard {
  readonly badge: string;
  readonly title: string;
  readonly desc: string;
  readonly cta: string;
  readonly href: string;
  readonly swatches?: readonly string[];
  readonly pills?: readonly string[];
}

export interface MegaMenuQuickAction {
  readonly label: string;
  readonly href: string;
}

export interface StandardMegaPanel {
  readonly kind: "featured";
  readonly width: number;
  readonly featured: MegaMenuFeaturedCard;
  readonly sectionLabel: string;
  readonly items: readonly MegaMenuLinkItem[];
  readonly footerTitle?: string;
  readonly footerLinks?: readonly MegaMenuQuickAction[];
}

export interface ToolsMegaPanel {
  readonly kind: "tools";
  readonly width: number;
  readonly sectionLabel: string;
  readonly studios: readonly {
    readonly badge: string;
    readonly title: string;
    readonly desc: string;
    readonly href: string;
    readonly isShadowCard?: boolean;
    readonly previewStyle: React.CSSProperties;
  }[];
  readonly footerTitle: string;
  readonly quickPresets: readonly MegaMenuQuickAction[];
}

export interface McpMegaPanel {
  readonly kind: "mcp";
  readonly width: number;
  readonly sectionLabel: string;
  readonly sandboxLabel: string;
  readonly cliInstall: string;
  readonly items: readonly MegaMenuLinkItem[];
}

export type MegaMenuPanelConfig = StandardMegaPanel | ToolsMegaPanel | McpMegaPanel;

export function getMegaMenuPanels(locale: AppLocale): Record<NavChannelKey, MegaMenuPanelConfig> {
  const isZh = locale === "zh";

  return {
    catalog: {
      kind: "featured",
      width: 650,
      featured: {
        badge: "DESIGN.MD",
        title: isZh ? "双端真实设计图鉴" : "Website & App Catalog",
        desc: isZh
          ? "逆向拆解 12 个标杆网站与移动应用的明暗色板、字族与圆角阶梯，一键导出 AI 规范。"
          : "Reverse-engineered Light/Dark palettes, typography, and radius scales from 12 real products.",
        cta: isZh ? "浏览全部图鉴 →" : "Browse all specs →",
        href: "/catalog",
        swatches: ["#5E6AD2", "#D97757", "#EDEDED", "#635BFF", "#3ECF8E"]
      },
      sectionLabel: isZh ? "按平台与行业浏览" : "BROWSE BY PLATFORM & DOMAIN",
      items: [
        {
          title: isZh ? "Websites 桌面网站 (8)" : "Websites (8)",
          badge: "WEB",
          desc: isZh ? "Linear · Claude · Vercel · Stripe 等桌面端体系" : "Linear, Claude, Vercel, Stripe & web specs",
          href: "/catalog?kind=website"
        },
        {
          title: isZh ? "Mobile Apps 移动应用 (4)" : "Mobile Apps (4)",
          badge: "IOS",
          desc: isZh ? "Arc Search · Flighty · Luma · Mercury 拇指交互规范" : "Arc Search, Flighty, Luma & Mercury mobile specs",
          href: "/catalog?kind=app"
        },
        {
          title: isZh ? "AI & Editorial 温暖衬线" : "AI & Editorial",
          dot: "#D97757",
          desc: isZh ? "羊皮纸暖底、衬线标题与对话工作台（Claude / Arc）" : "Warm neutrals, serif headlines & prompt studios",
          href: "/catalog?category=AI+%26+LLM"
        },
        {
          title: isZh ? "DevTools 开发者基础设施" : "DevTools & Infra",
          dot: "#3ECF8E",
          desc: isZh ? "暗黑结构线、终端命令与代码高亮（Vercel / Supabase）" : "Monochrome grids, CLI chrome & code blocks",
          href: "/catalog?category=DevTools"
        },
        {
          title: isZh ? "Productivity 效率工具" : "Productivity SaaS",
          dot: "#5E6AD2",
          desc: isZh ? "1px 细边框、紧凑行高与快捷键体系（Linear / Flighty）" : "1px hairlines, dense lists & keycap ergonomics",
          href: "/catalog?category=Productivity"
        },
        {
          title: isZh ? "Fintech 金融与账单" : "Fintech & Ledger",
          dot: "#635BFF",
          desc: isZh ? "高对比等宽数字、清晰账单层级（Stripe / Mercury）" : "Tabular numerals & high-trust ledger hierarchy",
          href: "/catalog?category=Fintech"
        }
      ],
      footerTitle: isZh ? "热门规范直达" : "FEATURED SPECS",
      footerLinks: [
        { label: "Linear DESIGN.md", href: "/catalog/linear" },
        { label: "Claude DESIGN.md", href: "/catalog/claude" },
        { label: "Vercel DESIGN.md", href: "/catalog/vercel" },
        { label: "Flighty iOS", href: "/catalog/flighty" }
      ]
    },

    components: {
      kind: "featured",
      width: 720,
      featured: {
        badge: "WORKBENCH",
        title: isZh ? "三栏实时换肤工作台" : "3-Column Live Workbench",
        desc: isZh
          ? "左侧切换组件树、中间多视口预览、右侧实时微调圆角与品牌皮肤并导出 4 框架代码。"
          : "Switch assets in the left tree, tune radius & brand skins live, and copy React/Vue/Svelte/Solid code.",
        cta: isZh ? "打开交互工作台 →" : "Open Workbench →",
        href: "/components/hero/hero-telemetry-counter",
        pills: ["React", "Vue", "Svelte", "Solid"]
      },
      sectionLabel: isZh ? "热门组件分类直达" : "POPULAR COMPONENT CATEGORIES",
      items: [
        {
          title: isZh ? "Hero 首屏区块" : "Hero Sections",
          badge: "28",
          desc: isZh ? "遥测数字跳动条、双栏 CLI 命令台与衬线首屏" : "Telemetry counters, split CLI stages & serif heroes",
          href: "/components/hero"
        },
        {
          title: isZh ? "Bento 特性网格" : "Bento & Features",
          badge: "34",
          desc: isZh ? "1px 非对称便当盒与 01/02/03 流程展示轨" : "Zero-gap hairline bentos & numbered step rails",
          href: "/components/bento-features"
        },
        {
          title: isZh ? "Pricing 定价套餐" : "Pricing & Tiers",
          badge: "22",
          desc: isZh ? "通栏三档细线分割定价表与按量计费阶梯" : "3-tier divided pricing & token usage ledgers",
          href: "/components/pricing"
        },
        {
          title: isZh ? "Authentication 登录认证" : "Authentication",
          badge: "16",
          desc: isZh ? "Passkey 通行密钥、OAuth 与企业单点登录卡" : "Passkey, OAuth & enterprise SAML sign-in blocks",
          href: "/components/auth"
        },
        {
          title: isZh ? "Command Menu (⌘K)" : "Command & Search",
          badge: "14",
          desc: isZh ? "键盘优先全局命令启动器与快捷键检索框" : "Keyboard-first ⌘K palettes & filter menus",
          href: "/components/command-menu"
        },
        {
          title: isZh ? "Data Tables 数据表" : "Data Tables & Logs",
          badge: "24",
          desc: isZh ? "高密度可排序目录表与 MCP 审计日志流" : "Sortable telemetry directories & log inspectors",
          href: "/components/data-table"
        },
        {
          title: isZh ? "Full Pages 整页编排" : "Full Page Compositions",
          badge: "36",
          desc: isZh ? "完整落地页、监控控制台与三栏 API 文档页" : "Complete landing, dashboard & 3-column docs pages",
          href: "/components/landing-pages"
        },
        {
          title: isZh ? "Motion 动效资产" : "Motion & Tickers",
          badge: "45",
          desc: isZh ? "等宽缓动计数器、1px 聚光边框与分段进度条" : "Tabular counters, 1px pointer spotlight & step rails",
          href: "/components/counters-tickers"
        }
      ],
      footerTitle: isZh ? "按粒度筛选" : "FILTER BY TIER",
      footerLinks: [
        { label: isZh ? "全部组件 (16 类)" : "All Categories (16)", href: "/components" },
        { label: isZh ? "Section 区块" : "Sections", href: "/components?type=section" },
        { label: isZh ? "Block 模块" : "Blocks", href: "/components?type=block" },
        { label: isZh ? "Page 整页" : "Pages", href: "/components?type=page" },
        { label: isZh ? "Motion 动效" : "Motion", href: "/components?type=motion" }
      ]
    },

    templates: {
      kind: "featured",
      width: 610,
      featured: {
        badge: "STARTER KITS",
        title: isZh ? "整站多页工程模板" : "Multi-Page Starter Templates",
        desc: isZh
          ? "预置完整路由结构、明暗设计令牌与配套 DESIGN.md 的生产级起手式模板。"
          : "Multi-page Next.js, Astro, and React starters pre-wired with DESIGN.md tokens.",
        cta: isZh ? "查看全部模板 →" : "Browse all templates →",
        href: "/templates",
        pills: ["Next.js", "Astro", "React"]
      },
      sectionLabel: isZh ? "按场景选择模板" : "STARTERS BY USE CASE",
      items: [
        {
          title: isZh ? "SaaS & AI 产品整站" : "SaaS & AI Starters",
          badge: "2 KITS",
          desc: isZh ? "覆盖营销落地页、定价、登录与 AI 对话工作台" : "Marketing pages, pricing, auth & AI chat studios",
          href: "/templates?category=SaaS+%26+AI"
        },
        {
          title: isZh ? "Docs & Changelog 文档站" : "Docs & Changelog",
          badge: "ASTRO",
          desc: isZh ? "左树右大纲三栏技术规范站与版本发布日志" : "3-column SDK documentation & release timelines",
          href: "/templates?category=Docs"
        },
        {
          title: isZh ? "Telemetry & Admin 后台" : "Analytics & Admin",
          badge: "REACT",
          desc: isZh ? "侧栏折叠框架、实时指标带与密钥管理控制台" : "Collapsible sidebar shell, KPIs & API token tables",
          href: "/templates?category=Dashboard"
        },
        {
          title: isZh ? "套用模板进入工作台" : "Customize in Workbench",
          badge: "LIVE",
          desc: isZh ? "在三栏工作台中预览整页骨架并微调圆角密度" : "Open full-page shells inside the live token tuner",
          href: "/components/landing-pages/page-devtools-launch"
        }
      ]
    },

    tools: {
      kind: "tools",
      width: 560,
      sectionLabel: isZh ? "参数化视觉实验室" : "PARAMETERIZED VISUAL STUDIOS",
      studios: [
        {
          badge: "STUDIO 01",
          title: isZh ? "参数化背景生成器" : "Background Generator",
          desc: isZh
            ? "实时调节精密网格、点阵、极光渐变与胶片颗粒噪点，一键复制 CSS 或 Tailwind。"
            : "Tune hairline grids, dot matrices, aurora glow & film grain with CSS/Tailwind export.",
          href: "/tools/background",
          previewStyle: {
            backgroundColor: "#101114",
            backgroundImage:
              "radial-gradient(circle at 50% 35%,rgba(206,255,0,0.20),transparent 70%),linear-gradient(to right,rgba(206,255,0,0.22) 1px,transparent 1px),linear-gradient(to bottom,rgba(206,255,0,0.22) 1px,transparent 1px)",
            backgroundSize: "100% 100%,18px 18px,18px 18px"
          }
        },
        {
          badge: "STUDIO 02",
          title: isZh ? "阴影与表面令牌实验室" : "Shadow & Surface Lab",
          desc: isZh
            ? "微调多层环境阴影、顶部 1px 内高光描边与表面圆角透明度，告别脏灰投影。"
            : "Craft multi-layer elevation, 1px top inner rim highlights, and crisp border alpha.",
          href: "/tools/shadow",
          isShadowCard: true,
          previewStyle: { backgroundColor: "#121215" }
        }
      ],
      footerTitle: isZh ? "快捷预设" : "QUICK PRESETS",
      quickPresets: [
        { label: "Obsidian Grid", href: "/tools/background?preset=linear-grid" },
        { label: "Chartreuse Aurora", href: "/tools/background?preset=borealis-lime" },
        { label: "Warm Grain", href: "/tools/background?preset=claude-grain" },
        { label: "Floating Command", href: "/tools/shadow?preset=raycast-float" }
      ]
    },

    mcp: {
      kind: "mcp",
      width: 520,
      sectionLabel: isZh ? "连接 AI 编程助手 (MCP 1.0)" : "CONNECT AI CODING AGENTS (MCP 1.0)",
      sandboxLabel: isZh ? "打开检索沙盒 →" : "Open Sandbox →",
      cliInstall: "claude mcp add --transport http uifino https://mcp.uifino.dev/mcp",
      items: [
        {
          title: "Claude Code",
          badge: "CLI",
          desc: isZh ? "终端一行命令接入，支持检索 DESIGN.md 与组件" : "One-line HTTP MCP setup for Claude Code CLI",
          href: "/mcp?client=claude-code"
        },
        {
          title: "Cursor",
          badge: "JSON",
          desc: isZh ? "写入 .cursor/mcp.json 在编辑器内自动拉取源码" : "Configure .cursor/mcp.json for instant UI retrieval",
          href: "/mcp?client=cursor"
        },
        {
          title: "Windsurf",
          badge: "JSON",
          desc: isZh ? "标准 serverUrl 协议接入 Cascade 智能体工作流" : "Connect Windsurf Cascade via mcp_config.json",
          href: "/mcp?client=windsurf"
        },
        {
          title: "Codex CLI",
          badge: "TOML",
          desc: isZh ? "配置 ~/.codex/config.toml 启用规范与令牌查询" : "Add uifino registry endpoint to config.toml",
          href: "/mcp?client=codex"
        }
      ]
    }
  };
}
