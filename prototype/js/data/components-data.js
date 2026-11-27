// Progressive Components & Motion Registry — 4 First-Class Asset Types: section | block | page | motion

export const ASSET_TYPES = [
  { id: "all", labelEn: "All Assets", labelZh: "全部资产", badge: "ALL" },
  { id: "section", labelEn: "Sections", labelZh: "Section 区块", badge: "SECTION" },
  { id: "block", labelEn: "Blocks", labelZh: "Block 模块", badge: "BLOCK" },
  { id: "page", labelEn: "Pages", labelZh: "Page 整页", badge: "PAGE" },
  { id: "motion", labelEn: "Motion", labelZh: "Motion 动效", badge: "MOTION" }
];

export const COMPONENT_CATEGORIES = [
  // ================= SECTIONS (5) =================
  {
    id: "hero",
    assetType: "section",
    name: "Hero Sections",
    nameZh: "首屏区块 (Hero)",
    totalCount: 28,
    miniKind: "hero",
    descEn: "Above-the-fold sections with telemetry counters, split CLI stages, and editorial typography.",
    descZh: "包含实时遥测数字条、双栏终端命令台与衬线杂志排版的首屏区块。",
    items: [
      {
        id: "hero-telemetry-counter",
        name: "Telemetry Counter Hero",
        subcat: "Stats & Live Data",
        layout: "split-hero",
        archetype: "telemetry-hero",
        tags: ["hero", "counter", "stats", "dark", "saas"],
        descEn: "Centered architectural headline anchored by a 4-column tabular metric counter bar.",
        descZh: "紧凑标题搭配四栏等宽数字跳动指标条，消除数字变化时的宽度抖动。",
        contract: [
          "Apply font-variant-numeric: tabular-nums on all animated metrics.",
          "Collapse 4-column counter grid to 2x2 below 640px without horizontal scroll.",
          "Skip count-up animation immediately when prefers-reduced-motion: reduce matches."
        ]
      },
      {
        id: "hero-split-cli",
        name: "Split CLI & Proof Stage",
        subcat: "Code & Terminal",
        layout: "split-hero",
        archetype: "cli-hero",
        tags: ["hero", "cli", "devtools", "monochrome", "code"],
        descEn: "Two-column micro-striped hero pairing value copy and npx bar with a live protocol diff card.",
        descZh: "左栏竖向细条纹配一键复制命令框，右栏展示实时令牌协议面板。",
        contract: [
          "Keep left column max-width 540px so line length stays within 55–68 characters.",
          "Ensure CLI box truncates gracefully on 375px screens while keeping Copy button >= 36px."
        ]
      },
      {
        id: "hero-editorial-serif",
        name: "Editorial Serif Manifesto",
        subcat: "Editorial",
        layout: "split-hero",
        archetype: "editorial-hero",
        tags: ["hero", "warm", "editorial", "serif", "ai"],
        descEn: "Warm literary display serif headline paired with restrained action strip and artifact card.",
        descZh: "人文衬线大标题配克制留白与文档预览卡，适合 AI 工作台与知识产品。",
        contract: [
          "Tighten display serif tracking to -0.02em with 1.04 line-height above 36px.",
          "Maintain body contrast >= 7:1 on warm parchment backgrounds."
        ]
      }
    ]
  },
  {
    id: "bento-features",
    assetType: "section",
    name: "Bento & Features",
    nameZh: "特性与便当格 (Bento)",
    totalCount: 34,
    miniKind: "bento",
    descEn: "Asymmetric 12-column bento grids, numbered 01/02/03 architectural workflows, and code proof cards.",
    descZh: "非对称 12 列便当盒网格、01/02/03 编号流程条与代码能力展示区块。",
    items: [
      {
        id: "bento-protocol-grid",
        name: "Asymmetric Protocol Bento",
        subcat: "Bento Grids",
        layout: "bento-grid",
        archetype: "bento-grid",
        tags: ["bento", "features", "grid", "saas", "dark"],
        descEn: "Zero-gap hairline bento combining a wide token sync matrix with compact latency and CLI tiles.",
        descZh: "1px 零间距细线便当格，主卡展示令牌同步矩阵，副卡展示延迟与命令行指标。",
        contract: [
          "Set min-w-0 on every CSS grid child containing code snippets or tables.",
          "Stack into single-column cards below 768px while preserving 1px dividers."
        ]
      },
      {
        id: "features-numbered-rail",
        name: "01 / 02 / 03 Architectural Rail",
        subcat: "Workflow Steps",
        layout: "bento-grid",
        archetype: "bento-grid",
        tags: ["steps", "minimal", "monochrome", "workflow"],
        descEn: "Three-column divided workflow strip with monospace step indices and live mini artifacts.",
        descZh: "三栏等分结构线流程区块，使用等宽序号与迷你实景缩略卡替代空洞图标。",
        contract: [
          "Align top eyebrows and bottom action links across all 3 columns using flex-col justify-between."
        ]
      }
    ]
  },
  {
    id: "pricing",
    assetType: "section",
    name: "Pricing & Tiers",
    nameZh: "定价与套餐对比",
    totalCount: 22,
    miniKind: "pricing",
    descEn: "Divided 3-tier SaaS pricing grids, annual billing switches, and seats/usage calculators.",
    descZh: "三档细线分割定价表、年付折扣切换器与按量计费阶梯区块。",
    items: [
      {
        id: "pricing-3tier-divided",
        name: "Three-Tier Hairline Pricing",
        subcat: "Tier Cards",
        layout: "3-tier-divided",
        archetype: "pricing-tiers",
        tags: ["pricing", "fintech", "saas", "clean", "toggle"],
        descEn: "Flush 3-column pricing band with monthly/annual billing toggle and highlighted Pro column.",
        descZh: "通栏三列 1px 分割定价矩阵，支持月付/年付切换与推荐档顶部丝带标记。",
        contract: [
          "Render currency amounts in tabular numerals so toggling annual discount never shifts layout.",
          "Highlight featured tier via top accent border and contrast button rather than scale(1.05) overflow."
        ]
      },
      {
        id: "pricing-usage-ledger",
        name: "Seat & Token Usage Ledger",
        subcat: "Usage Based",
        layout: "3-tier-divided",
        archetype: "pricing-tiers",
        tags: ["pricing", "devtools", "fintech", "calculator"],
        descEn: "Developer infrastructure pricing combining base seat tier with transparent per-million token ledger.",
        descZh: "基础设施按量计费表，左侧基础席位包，右侧清晰列出百万调用单价。",
        contract: [
          "Keep unit rates right-aligned in monospace columns."
        ]
      }
    ]
  },
  {
    id: "social-proof",
    assetType: "section",
    name: "Testimonials & Logos",
    nameZh: "口碑证言与客户墙",
    totalCount: 19,
    miniKind: "quotes",
    descEn: "Monochrome engineering logo strips and compact verified developer quote grids.",
    descZh: "单色克制品牌标志带与真实工程师引用卡片网格。",
    items: [
      {
        id: "quotes-architectural-wall",
        name: "Divided Engineering Quotes",
        subcat: "Quote Grids",
        layout: "bento-grid",
        archetype: "bento-grid",
        tags: ["quotes", "minimal", "social", "clean"],
        descEn: "3-column hairline-divided quote matrix pairing concise metrics with author role metadata.",
        descZh: "三列细线评价墙，突出可量化的交付提升指标与角色署名。",
        contract: [
          "Clamp long quotes cleanly at 4 lines on compact density."
        ]
      }
    ]
  },
  {
    id: "cta-footer",
    assetType: "section",
    name: "CTA & Footers",
    nameZh: "底部转化与页脚",
    totalCount: 18,
    miniKind: "hero",
    descEn: "Terminal install callout bands and structured 5-column documentation footers.",
    descZh: "命令行安装号召横幅与五栏工程目录页脚。",
    items: [
      {
        id: "cta-cli-launchpad",
        name: "CLI Launchpad Banner",
        subcat: "Install Banners",
        layout: "split-hero",
        archetype: "cli-hero",
        tags: ["cta", "cli", "devtools", "dark"],
        descEn: "Full-width striped closing banner with instant npx command copy and secondary docs action.",
        descZh: "页面收尾竖纹转化带，内置一键复制安装命令与文档入口。",
        contract: [
          "Provide immediate visual Copy -> Copied confirmation with aria-live polite."
        ]
      }
    ]
  },

  // ================= BLOCKS (5) =================
  {
    id: "auth",
    assetType: "block",
    name: "Authentication",
    nameZh: "登录与身份认证",
    totalCount: 16,
    miniKind: "auth",
    descEn: "Passkey, OAuth provider, magic-link, and 6-digit OTP verification blocks.",
    descZh: "通行密钥、第三方 OAuth 登录、邮箱魔法链接与六位验证码输入模块。",
    items: [
      {
        id: "auth-passkey-card",
        name: "Minimal Passkey & OAuth Card",
        subcat: "Sign In",
        layout: "auth-card",
        archetype: "auth-card",
        tags: ["auth", "login", "passkey", "minimal", "form"],
        descEn: "380px hairline authentication block featuring GitHub/Google OAuth, work email field, and validation states.",
        descZh: "380px 紧凑认证模块，集成 GitHub/Google 快捷登录、企业邮箱校验与错误提示态。",
        contract: [
          "Associate every input with an explicit <label> and inline error slot.",
          "Maintain 40px minimum button height for comfortable touch and keyboard access."
        ]
      },
      {
        id: "auth-sso-split",
        name: "Enterprise SAML Split Block",
        subcat: "Enterprise SSO",
        layout: "auth-card",
        archetype: "auth-card",
        tags: ["auth", "sso", "saas", "fintech"],
        descEn: "Domain-aware enterprise login block switching automatically to SAML SSO when workspace domain matches.",
        descZh: "支持企业域名自动识别切换 SAML 单点登录的双态认证模块。",
        contract: [
          "Preserve entered email across SSO mode transitions."
        ]
      }
    ]
  },
  {
    id: "command-menu",
    assetType: "block",
    name: "Command & Search",
    nameZh: "命令面板与检索 (⌘K)",
    totalCount: 14,
    miniKind: "cmdk",
    descEn: "Keyboard-first ⌘K command palettes, multi-facet filter drawers, and keycap footer bars.",
    descZh: "键盘优先的 ⌘K 全局命令框、多维筛选抽屉与快捷键底栏模块。",
    items: [
      {
        id: "cmdk-protocol-palette",
        name: "⌘K Protocol & Asset Launcher",
        subcat: "Command Palette",
        layout: "cmdk",
        archetype: "cmdk-palette",
        tags: ["cmdk", "search", "keyboard", "devtools", "dark"],
        descEn: "Grouped instant command menu with category pills, active row highlight, and keycap hints.",
        descZh: "带分类过滤标签、高亮选中行与等宽键帽提示的全局命令启动器。",
        contract: [
          "Support Up/Down arrow traversal, Enter selection, and Escape dismissal.",
          "Render empty-query state with actionable quick jumps."
        ]
      }
    ]
  },
  {
    id: "data-table",
    assetType: "block",
    name: "Data Tables & Logs",
    nameZh: "数据表格与日志流",
    totalCount: 24,
    miniKind: "table",
    descEn: "High-density sortable registries, real-time MCP request logs, and token audit tables.",
    descZh: "高密度可排序目录表、实时请求日志检查器与用量审计表格模块。",
    items: [
      {
        id: "table-telemetry-directory",
        name: "Sortable Telemetry Data Table",
        subcat: "Sortable Tables",
        layout: "data-table",
        archetype: "data-table",
        tags: ["table", "data", "sort", "telemetry", "saas"],
        descEn: "5-column hairline data table with status indicators, right-aligned latency numerals, and filter bar.",
        descZh: "五列高密度工程表格，支持状态圆点、右对齐等宽延迟耗时与快速过滤。",
        contract: [
          "Wrap wide tables in overflow-x-auto inside a min-w-0 parent so 375px screens never break.",
          "Right-align numeric columns with tabular-nums."
        ]
      },
      {
        id: "table-mcp-audit-log",
        name: "MCP Tool Call Inspector",
        subcat: "Log Streams",
        layout: "data-table",
        archetype: "data-table",
        tags: ["table", "logs", "mcp", "devtools"],
        descEn: "Structured request log table displaying timestamp, tool name, matched assets, and response time.",
        descZh: "按时间流展示工具调用名、命中规范资产与响应耗时的审计日志模块。",
        contract: [
          "Truncate long query payloads cleanly with single-line ellipsis."
        ]
      }
    ]
  },
  {
    id: "settings-billing",
    assetType: "block",
    name: "Settings & API Keys",
    nameZh: "设置面板与密钥管理",
    totalCount: 20,
    miniKind: "auth",
    descEn: "Scoped API token generators, webhook configuration cards, and notification matrices.",
    descZh: "带权限范围的 API 密钥管理卡、Webhook 配置与通知开关矩阵。",
    items: [
      {
        id: "settings-api-scopes",
        name: "Scoped MCP Token Manager",
        subcat: "API Keys",
        layout: "data-table",
        archetype: "data-table",
        tags: ["settings", "api", "security", "saas"],
        descEn: "Token management panel with masked secret keys, scope badges, last-used timestamps, and revoke action.",
        descZh: "支持密钥掩码展示、权限标签、最近调用时间与一键吊销的令牌面板。",
        contract: [
          "Never expose raw secret tokens after initial creation modal closes."
        ]
      }
    ]
  },
  {
    id: "empty-states",
    assetType: "block",
    name: "Empty & Error States",
    nameZh: "空状态与异常恢复",
    totalCount: 15,
    miniKind: "bento",
    descEn: "Blueprint zero-data states, search filter reset panels, and retryable diagnostic banners.",
    descZh: "无数据引导面板、筛选零结果重置卡与带诊断码的重试异常块。",
    items: [
      {
        id: "empty-wireframe-state",
        name: "Architectural Zero-Data Panel",
        subcat: "Empty States",
        layout: "auth-card",
        archetype: "auth-card",
        tags: ["empty", "error", "minimal", "clean"],
        descEn: "Dashed hairline empty container with clear primary creation action and CLI import shortcut.",
        descZh: "细虚线结构框空状态模块，仅保留核心创建动作与命令行导入入口。",
        contract: [
          "Provide a direct recovery action (Clear filter / Create item) without decorative filler."
        ]
      }
    ]
  },

  // ================= PAGES (3) =================
  {
    id: "landing-pages",
    assetType: "page",
    name: "Product Landing Pages",
    nameZh: "完整产品落地页",
    totalCount: 12,
    miniKind: "page",
    descEn: "End-to-end single-page compositions combining navbar, split hero, bento proof, pricing, and footer.",
    descZh: "包含顶栏、分栏首屏、便当盒特性、三档定价与页脚的完整单页编排资产。",
    items: [
      {
        id: "page-devtools-launch",
        name: "DevTools Protocol Landing Page",
        subcat: "Developer Marketing",
        layout: "full-page",
        archetype: "page-shell",
        tags: ["page", "landing", "devtools", "dark", "saas"],
        descEn: "Complete 5-section developer product page wired with unified spacing rhythm and 1px section dividers.",
        descZh: "五区块完整开发者产品页，统一收口顶栏、首屏终端、三列特性、定价表与页脚节奏。",
        contract: [
          "Alternate striped hero and solid surface sections separated by 16px wireframe bands.",
          "Keep primary action visible within initial 800px desktop and mobile viewports."
        ]
      },
      {
        id: "page-editorial-ai",
        name: "Warm Editorial AI Product Page",
        subcat: "AI Product",
        layout: "full-page",
        archetype: "page-shell",
        tags: ["page", "ai", "warm", "editorial", "serif"],
        descEn: "Calm literary landing page pairing serif headlines, interactive composer preview, and trust specs.",
        descZh: "温暖人文风 AI 产品整页，融合衬线标题、对话工作台实景与安全合规说明。",
        contract: [
          "Use generous 64px–80px vertical rhythm on desktop collapsing to 40px on mobile."
        ]
      }
    ]
  },
  {
    id: "dashboard-pages",
    assetType: "page",
    name: "Workspace Dashboards",
    nameZh: "后台工作台整页",
    totalCount: 14,
    miniKind: "page",
    descEn: "Collapsible sidebar shells paired with KPI strips, usage charts, and audit tables.",
    descZh: "左侧折叠导航栏搭配顶部核心指标带、趋势条与审计列表的完整后台页。",
    items: [
      {
        id: "page-observability-console",
        name: "Telemetry & Usage Console Page",
        subcat: "Analytics Shell",
        layout: "full-page",
        archetype: "page-shell",
        tags: ["page", "dashboard", "telemetry", "saas", "dark"],
        descEn: "Full application shell featuring 220px navigation rail, 4-KPI header strip, and live request table.",
        descZh: "完整监控后台单页：左侧紧凑导航轨、顶部四格实时指标卡与底部请求明细表。",
        contract: [
          "Collapse left sidebar into a top drawer trigger below 1024px."
        ]
      }
    ]
  },
  {
    id: "docs-changelog",
    assetType: "page",
    name: "Docs & Changelog Pages",
    nameZh: "文档与更新日志整页",
    totalCount: 10,
    miniKind: "page",
    descEn: "Three-column technical specification pages and date-anchored release timelines.",
    descZh: "左树中正文右大纲的三栏技术文档页与按版本锚点排列的更新日志页。",
    items: [
      {
        id: "page-3col-reference",
        name: "Three-Column API Reference Page",
        subcat: "Documentation",
        layout: "full-page",
        archetype: "page-shell",
        tags: ["page", "docs", "minimal", "code"],
        descEn: "Sticky sidebar navigation, prose + runnable code column, and synchronized On This Page outline.",
        descZh: "左目录树、中区说明配可执行代码卡、右侧本页锚点联动的技术规范整页。",
        contract: [
          "Constrain central prose measure to 68ch while allowing code blocks full column width."
        ]
      }
    ]
  },

  // ================= MOTION (3) =================
  {
    id: "counters-tickers",
    assetType: "motion",
    name: "Counters & Tickers",
    nameZh: "数字滚动与状态跳动",
    totalCount: 15,
    miniKind: "motion",
    descEn: "Spring-interpolated tabular counters, live latency badges, and zero-jitter numeric transitions.",
    descZh: "带缓动曲线的等宽数字滚动、毫秒延迟跳动徽标与零抖动数值过渡。",
    items: [
      {
        id: "motion-spring-counter",
        name: "Cubic-Out Tabular Counter Strip",
        subcat: "Numeric Motion",
        layout: "motion-stage",
        archetype: "motion-lab",
        tags: ["motion", "counter", "stats", "tabular"],
        descEn: "60fps requestAnimationFrame counter with cubic-out easing, decimal precision, and reduced-motion bypass.",
        descZh: "60 帧平滑缓动数字增长组件，支持小数位精度锁定与减弱动态偏好自动降级。",
        contract: [
          "Duration capped at 750ms cubic-bezier(0.22, 1, 0.36, 1) so numbers settle briskly.",
          "Honor prefers-reduced-motion by rendering target value on frame 0."
        ]
      }
    ]
  },
  {
    id: "pointer-surfaces",
    assetType: "motion",
    name: "Spotlight & Surface Sheen",
    nameZh: "光标聚光与边框微光",
    totalCount: 18,
    miniKind: "motion",
    descEn: "Pointer-tracking radial hairline borders, subtle top-edge sheen, and stacked card fan physics.",
    descZh: "跟随光标的 1px 径向高光细边框、顶部边缘微光与叠层卡片展开动效。",
    items: [
      {
        id: "motion-hairline-spotlight",
        name: "1px Hairline Pointer Spotlight",
        subcat: "Pointer Reactive",
        layout: "motion-stage",
        archetype: "motion-lab",
        tags: ["motion", "hover", "spotlight", "dark", "hairline"],
        descEn: "GPU-composited radial mask illuminating only the 1px card border near cursor coordinates.",
        descZh: "仅照亮光标附近 1px 边框线的克制聚光动效，避免大面积霓虹光斑污染正文。",
        contract: [
          "Update CSS --mx / --my coordinates via pointermove without triggering React re-renders."
        ]
      }
    ]
  },
  {
    id: "stagger-reveal",
    assetType: "motion",
    name: "Stagger & Step Progress",
    nameZh: "序列入场与分步进度",
    totalCount: 12,
    miniKind: "motion",
    descEn: "Segmented progress rails, 40ms list stagger reveals, and crisp tab underline glides.",
    descZh: "分段自动轮播进度条、40ms 列表依次浮现与平滑下划线切换动效。",
    items: [
      {
        id: "motion-segmented-rail",
        name: "Segmented Workflow Progress Rail",
        subcat: "Progress & Tabs",
        layout: "motion-stage",
        archetype: "motion-lab",
        tags: ["motion", "progress", "tabs", "minimal"],
        descEn: "5-segment linear progress bar synced with step cards, inspired by getdesign.md hero rail.",
        descZh: "源自 getdesign.md 首屏的五段式细线进度条，与步骤内容卡片同步切换。",
        contract: [
          "Animate transform: scaleX() with transform-origin: left for compositor-only 60fps playback."
        ]
      }
    ]
  }
];

export function findCategoryById(catId) {
  return COMPONENT_CATEGORIES.find((c) => c.id === catId) || COMPONENT_CATEGORIES[0];
}

export function findAssetByPath(param) {
  const [catId, itemId] = String(param || "").split("/");
  const category = findCategoryById(catId);
  const item = category.items.find((i) => i.id === itemId) || category.items[0];
  return { category, item };
}

export function getAllAssetsFlat() {
  const out = [];
  for (const cat of COMPONENT_CATEGORIES) {
    for (const item of cat.items) {
      out.push({
        ...item,
        categoryId: cat.id,
        categoryName: cat.name,
        categoryNameZh: cat.nameZh,
        assetType: cat.assetType
      });
    }
  }
  return out;
}
