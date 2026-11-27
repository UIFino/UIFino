// Top Navigation Hover Mega-Menu Config & Multi-Page Starter Templates Data

export const TEMPLATE_CATEGORIES = ["All", "SaaS & AI", "Docs", "Dashboard"];

export const TEMPLATE_ITEMS = [
  {
    id: "obsidian-saas-kit",
    name: "Obsidian SaaS Starter",
    nameZh: "Obsidian 开发者 SaaS 整站",
    category: "SaaS & AI",
    stack: "Next.js 15 · Tailwind v4",
    skinId: "linear",
    skinLabel: "Linear DESIGN.md",
    accent: "#5E6AD2",
    canvas: "#08090A",
    surface: "#121316",
    border: "#23252A",
    pagesCount: 6,
    routes: ["Landing", "Pricing", "Changelog", "Sign In", "Docs"],
    descEn: "High-density product marketing & onboarding starter wired with 1px hairline grids and tabular metrics.",
    descZh: "包含营销首页、三档定价、更新日志与通行密钥登录的高密度 SaaS 整站工程。"
  },
  {
    id: "parchment-agent-desk",
    name: "Editorial AI Workspace",
    nameZh: "Editorial 人文 AI 工作台",
    category: "SaaS & AI",
    stack: "Next.js 15 · TypeScript",
    skinId: "claude",
    skinLabel: "Claude DESIGN.md",
    accent: "#D97757",
    canvas: "#191816",
    surface: "#23221F",
    border: "#36332E",
    pagesCount: 5,
    routes: ["Prompt Stage", "Artifact Split", "History", "Settings"],
    descEn: "Warm literary AI chat & split-screen artifact studio with serif display typography and zero cold glare.",
    descZh: "温暖米白与深咖双主题对话工作台，内置左侧会话树与右侧实时文档预览分栏。"
  },
  {
    id: "monochrome-docs-hub",
    name: "Protocol Docs & SDK Hub",
    nameZh: "Protocol 三栏技术文档站",
    category: "Docs",
    stack: "Astro 5 · MDX",
    skinId: "vercel",
    skinLabel: "Vercel DESIGN.md",
    accent: "#EDEDED",
    canvas: "#050507",
    surface: "#0F1014",
    border: "#242424",
    pagesCount: 7,
    routes: ["Overview", "3-Col API Ref", "CLI Guides", "MCP Spec"],
    descEn: "Zero-clutter documentation portal with sticky file tree, multi-framework code tabs, and ⌘K search.",
    descZh: "左目录树、中区可执行代码示例、右侧本页锚点联动的工程文档与更新日志模板。"
  },
  {
    id: "ledger-telemetry-admin",
    name: "Fintech & Telemetry Console",
    nameZh: "Ledger 账单与遥测监控后台",
    category: "Dashboard",
    stack: "React 19 · Vite",
    skinId: "stripe",
    skinLabel: "Stripe DESIGN.md",
    accent: "#635BFF",
    canvas: "#0A2540",
    surface: "#102E4D",
    border: "#21476E",
    pagesCount: 6,
    routes: ["KPI Console", "Usage Ledger", "API Scopes", "Webhooks"],
    descEn: "Collapsible 220px rail paired with tabular billing ledgers, latency strips, and scoped API key tables.",
    descZh: "紧凑侧栏搭配等宽账单流水、毫秒延迟指标条与带权限范围的密钥管理后台。"
  }
];

/**
 * Returns structured shadcn.io-style hover mega-menu definitions for all 5 top-level channels.
 */
export function getMegaMenuPanels(lang = "zh") {
  const isZh = lang === "zh";

  return {
    catalog: {
      width: 650,
      featured: {
        badge: "DESIGN.MD",
        title: isZh ? "双端真实设计图鉴" : "Website & App Catalog",
        desc: isZh
          ? "逆向拆解 12 个标杆网站与移动应用的明暗色板、字族与圆角阶梯，一键导出 AI 规范。"
          : "Reverse-engineered Light/Dark palettes, typography, and radius scales from 12 real products.",
        cta: isZh ? "浏览全部图鉴 →" : "Browse all specs →",
        go: "catalog-index",
        resetCatalog: true,
        swatches: ["#5E6AD2", "#D97757", "#EDEDED", "#635BFF", "#3ECF8E"]
      },
      sectionLabel: isZh ? "按平台与行业浏览" : "BROWSE BY PLATFORM & DOMAIN",
      items: [
        {
          title: isZh ? "Websites 桌面网站 (8)" : "Websites (8)",
          badge: "WEB",
          desc: isZh ? "Linear · Claude · Vercel · Stripe 等桌面端体系" : "Linear, Claude, Vercel, Stripe & web specs",
          go: "catalog-index",
          setState: { catalogKind: "website", catalogCategory: "All" }
        },
        {
          title: isZh ? "Mobile Apps 移动应用 (4)" : "Mobile Apps (4)",
          badge: "IOS",
          desc: isZh ? "Arc Search · Flighty · Luma · Mercury 拇指交互规范" : "Arc Search, Flighty, Luma & Mercury mobile specs",
          go: "catalog-index",
          setState: { catalogKind: "app", catalogCategory: "All" }
        },
        {
          title: isZh ? "AI & Editorial 温暖衬线" : "AI & Editorial",
          dot: "#D97757",
          desc: isZh ? "羊皮纸暖底、衬线标题与对话工作台（Claude / Arc）" : "Warm neutrals, serif headlines & prompt studios",
          go: "catalog-index",
          setState: { catalogKind: "all", catalogCategory: "AI & LLM" }
        },
        {
          title: isZh ? "DevTools 开发者基础设施" : "DevTools & Infra",
          dot: "#3ECF8E",
          desc: isZh ? "暗黑结构线、终端命令与代码高亮（Vercel / Supabase）" : "Monochrome grids, CLI chrome & code blocks",
          go: "catalog-index",
          setState: { catalogKind: "all", catalogCategory: "DevTools" }
        },
        {
          title: isZh ? "Productivity 效率工具" : "Productivity SaaS",
          dot: "#5E6AD2",
          desc: isZh ? "1px 细边框、紧凑行高与快捷键体系（Linear / Flighty）" : "1px hairlines, dense lists & keycap ergonomics",
          go: "catalog-index",
          setState: { catalogKind: "all", catalogCategory: "Productivity" }
        },
        {
          title: isZh ? "Fintech 金融与账单" : "Fintech & Ledger",
          dot: "#635BFF",
          desc: isZh ? "高对比等宽数字、清晰账单层级（Stripe / Mercury）" : "Tabular numerals & high-trust ledger hierarchy",
          go: "catalog-index",
          setState: { catalogKind: "all", catalogCategory: "Fintech" }
        }
      ],
      footerLinks: [
        { label: "Linear DESIGN.md", go: "catalog-detail:linear" },
        { label: "Claude DESIGN.md", go: "catalog-detail:claude" },
        { label: "Vercel DESIGN.md", go: "catalog-detail:vercel" },
        { label: "Flighty iOS", go: "catalog-detail:flighty" }
      ]
    },

    components: {
      width: 720,
      featured: {
        badge: "WORKBENCH",
        title: isZh ? "三栏实时换肤工作台" : "3-Column Live Workbench",
        desc: isZh
          ? "左侧切换组件树、中间多视口预览、右侧实时微调圆角与品牌皮肤并导出 4 框架代码。"
          : "Switch assets in the left tree, tune radius & brand skins live, and copy React/Vue/Svelte/Solid code.",
        cta: isZh ? "打开交互工作台 →" : "Open Workbench →",
        go: "components-detail:hero/hero-telemetry-counter",
        pills: ["React", "Vue", "Svelte", "Solid"]
      },
      sectionLabel: isZh ? "热门组件分类直达" : "POPULAR COMPONENT CATEGORIES",
      items: [
        {
          title: isZh ? "Hero 首屏区块" : "Hero Sections",
          badge: "28",
          desc: isZh ? "遥测数字跳动条、双栏 CLI 命令台与衬线首屏" : "Telemetry counters, split CLI stages & serif heroes",
          go: "components-cat:hero"
        },
        {
          title: isZh ? "Bento 特性网格" : "Bento & Features",
          badge: "34",
          desc: isZh ? "1px 非对称便当盒与 01/02/03 流程展示轨" : "Zero-gap hairline bentos & numbered step rails",
          go: "components-cat:bento-features"
        },
        {
          title: isZh ? "Pricing 定价套餐" : "Pricing & Tiers",
          badge: "22",
          desc: isZh ? "通栏三档细线分割定价表与按量计费阶梯" : "3-tier divided pricing & token usage ledgers",
          go: "components-cat:pricing"
        },
        {
          title: isZh ? "Authentication 登录认证" : "Authentication",
          badge: "16",
          desc: isZh ? "Passkey 通行密钥、OAuth 与企业单点登录卡" : "Passkey, OAuth & enterprise SAML sign-in blocks",
          go: "components-cat:auth"
        },
        {
          title: isZh ? "Command Menu (⌘K)" : "Command & Search",
          badge: "14",
          desc: isZh ? "键盘优先全局命令启动器与快捷键检索框" : "Keyboard-first ⌘K palettes & filter menus",
          go: "components-cat:command-menu"
        },
        {
          title: isZh ? "Data Tables 数据表" : "Data Tables & Logs",
          badge: "24",
          desc: isZh ? "高密度可排序目录表与 MCP 审计日志流" : "Sortable telemetry directories & log inspectors",
          go: "components-cat:data-table"
        },
        {
          title: isZh ? "Full Pages 整页编排" : "Full Page Compositions",
          badge: "36",
          desc: isZh ? "完整落地页、监控控制台与三栏 API 文档页" : "Complete landing, dashboard & 3-column docs pages",
          go: "components-cat:landing-pages"
        },
        {
          title: isZh ? "Motion 动效资产" : "Motion & Tickers",
          badge: "45",
          desc: isZh ? "等宽缓动计数器、1px 聚光边框与分段进度条" : "Tabular counters, 1px pointer spotlight & step rails",
          go: "components-cat:counters-tickers"
        }
      ],
      tierFilters: [
        { label: isZh ? "全部组件 (16 类)" : "All Categories (16)", type: "all" },
        { label: isZh ? "Section 区块" : "Sections", type: "section" },
        { label: isZh ? "Block 模块" : "Blocks", type: "block" },
        { label: isZh ? "Page 整页" : "Pages", type: "page" },
        { label: isZh ? "Motion 动效" : "Motion", type: "motion" }
      ]
    },

    templates: {
      width: 610,
      featured: {
        badge: "STARTER KITS",
        title: isZh ? "整站多页工程模板" : "Multi-Page Starter Templates",
        desc: isZh
          ? "预置完整路由结构、明暗设计令牌与配套 DESIGN.md 的生产级起手式模板。"
          : " Multi-page Next.js, Astro, and React starters pre-wired with DESIGN.md tokens.",
        cta: isZh ? "查看全部模板 →" : "Browse all templates →",
        go: "templates-index",
        setState: { templateCategory: "All" },
        pills: ["Next.js", "Astro", "React"]
      },
      sectionLabel: isZh ? "按场景选择模板" : "STARTERS BY USE CASE",
      items: [
        {
          title: isZh ? "SaaS & AI 产品整站" : "SaaS & AI Starters",
          badge: "2 KITS",
          desc: isZh ? "覆盖营销落地页、定价、登录与 AI 对话工作台" : "Marketing pages, pricing, auth & AI chat studios",
          go: "templates-index",
          setState: { templateCategory: "SaaS & AI" }
        },
        {
          title: isZh ? "Docs & Changelog 文档站" : "Docs & Changelog",
          badge: "ASTRO",
          desc: isZh ? "左树右大纲三栏技术规范站与版本发布日志" : "3-column SDK documentation & release timelines",
          go: "templates-index",
          setState: { templateCategory: "Docs" }
        },
        {
          title: isZh ? "Telemetry & Admin 后台" : "Analytics & Admin",
          badge: "REACT",
          desc: isZh ? "侧栏折叠框架、实时指标带与密钥管理控制台" : "Collapsible sidebar shell, KPIs & API token tables",
          go: "templates-index",
          setState: { templateCategory: "Dashboard" }
        },
        {
          title: isZh ? "套用模板进入工作台" : "Customize in Workbench",
          badge: "LIVE",
          desc: isZh ? "在三栏工作台中预览整页骨架并微调圆角密度" : "Open full-page shells inside the live token tuner",
          go: "components-detail:landing-pages/page-devtools-launch"
        }
      ]
    },

    tools: {
      width: 560,
      sectionLabel: isZh ? "参数化视觉实验室" : "PARAMETERIZED VISUAL STUDIOS",
      studios: [
        {
          badge: "STUDIO 01",
          title: isZh ? "参数化背景生成器" : "Background Generator",
          desc: isZh
            ? "实时调节精密网格、点阵、极光渐变与胶片颗粒噪点，一键复制 CSS 或 Tailwind。"
            : "Tune hairline grids, dot matrices, aurora glow & film grain with CSS/Tailwind export.",
          go: "tools:background",
          previewStyle:
            "background-color:#101114;background-image:radial-gradient(circle at 50% 35%,rgba(206,255,0,0.20),transparent 70%),linear-gradient(to right,rgba(206,255,0,0.22) 1px,transparent 1px),linear-gradient(to bottom,rgba(206,255,0,0.22) 1px,transparent 1px);background-size:100% 100%,18px 18px,18px 18px;"
        },
        {
          badge: "STUDIO 02",
          title: isZh ? "阴影与表面令牌实验室" : "Shadow & Surface Lab",
          desc: isZh
            ? "微调多层环境阴影、顶部 1px 内高光描边与表面圆角透明度，告别脏灰投影。"
            : "Craft multi-layer elevation, 1px top inner rim highlights, and crisp border alpha.",
          go: "tools:shadow",
          previewStyle: "background-color:#121215;",
          isShadowCard: true
        }
      ],
      quickPresets: [
        { label: "Obsidian Grid", go: "tools:background", bgPreset: "linear-grid" },
        { label: "Chartreuse Aurora", go: "tools:background", bgPreset: "borealis-lime" },
        { label: "Warm Grain", go: "tools:background", bgPreset: "claude-grain" },
        { label: "Floating Command", go: "tools:shadow", shPreset: "raycast-float" }
      ]
    },

    mcp: {
      width: 520,
      sectionLabel: isZh ? "连接 AI 编程助手 (MCP 1.0)" : "CONNECT AI CODING AGENTS (MCP 1.0)",
      cliInstall: "claude mcp add --transport http uifino https://mcp.uifino.dev/mcp",
      items: [
        {
          title: "Claude Code",
          badge: "CLI",
          desc: isZh ? "终端一行命令接入，支持检索 DESIGN.md 与组件" : "One-line HTTP MCP setup for Claude Code CLI",
          go: "mcp",
          setState: { mcpClient: "claude-code" }
        },
        {
          title: "Cursor",
          badge: "JSON",
          desc: isZh ? "写入 .cursor/mcp.json 在编辑器内自动拉取源码" : "Configure .cursor/mcp.json for instant UI retrieval",
          go: "mcp",
          setState: { mcpClient: "cursor" }
        },
        {
          title: "Windsurf",
          badge: "JSON",
          desc: isZh ? "标准 serverUrl 协议接入 Cascade 智能体工作流" : "Connect Windsurf Cascade via mcp_config.json",
          go: "mcp",
          setState: { mcpClient: "windsurf" }
        },
        {
          title: "Codex CLI",
          badge: "TOML",
          desc: isZh ? "配置 ~/.codex/config.toml 启用规范与令牌查询" : "Add uifino registry endpoint to config.toml",
          go: "mcp",
          setState: { mcpClient: "codex" }
        }
      ]
    }
  };
}
