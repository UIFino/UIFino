import type { AppLocale } from "@/i18n/routing";
import { BLOCK_CATEGORIES } from "@/registry/components/blocks";
import { MOTION_CATEGORIES } from "@/registry/components/motion";
import { SECTION_CATEGORIES } from "@/registry/components/sections";
import { EXPRESSIVE_STYLE_ITEMS, MINIMAL_STYLE_ITEMS } from "@/registry/styles";

export type NavChannelKey =
  | "catalog"
  | "styles"
  | "components"
  | "templates"
  | "tools"
  | "mcp";

export interface GlobalNavLink {
  readonly label: string;
  readonly href: string;
  readonly swatch?: readonly [string, string];
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
        heading: isZh ? "探索" : "Explore",
        elevatedLinks: [
          { label: isZh ? "全部图鉴" : "All Specs", href: "/catalog" },
          { label: isZh ? "桌面网站" : "Websites", href: "/catalog?kind=website" },
          { label: isZh ? "移动应用" : "Apps", href: "/catalog?kind=app" }
        ]
      },
      columns: [
        {
          heading: isZh ? "领域" : "Domains",
          links: [
            { label: isZh ? "人工智能" : "AI", href: "/catalog?category=AI+%26+LLM" },
            { label: isZh ? "开发工具" : "DevTools", href: "/catalog?category=DevTools" },
            { label: isZh ? "效率办公" : "Productivity", href: "/catalog?category=Productivity" },
            { label: isZh ? "金融支付" : "Fintech", href: "/catalog?category=Fintech" },
            {
              label: isZh ? "内容社区" : "Community",
              href: "/catalog?category=Content+%26+Community"
            },
            {
              label: isZh ? "生活出行" : "Travel",
              href: "/catalog?category=Consumer+%26+Travel"
            }
          ]
        },
        {
          heading: isZh ? "网站精选" : "Websites",
          links: [
            { label: "Linear", href: "/catalog/linear" },
            { label: "Claude", href: "/catalog/claude" },
            { label: "Vercel", href: "/catalog/vercel" },
            { label: "Stripe", href: "/catalog/stripe" },
            { label: "Raycast", href: "/catalog/raycast" }
          ]
        },
        {
          heading: isZh ? "应用精选" : "Apps",
          links: [
            { label: "Arc", href: "/catalog/arc-search" },
            { label: "Flighty", href: "/catalog/flighty" },
            { label: "Luma", href: "/catalog/luma-app" },
            { label: "Mercury", href: "/catalog/mercury-app" }
          ]
        }
      ]
    },

    styles: {
      primary: {
        heading: isZh ? "探索" : "Explore",
        elevatedLinks: [
          { label: isZh ? "全部风格" : "All Styles", href: "/styles" },
          { label: isZh ? "换肤对比" : "Playground", href: "/styles?view=compare" },
          { label: isZh ? "深色系" : "Dark", href: "/styles?tone=dark" },
          { label: isZh ? "浅色系" : "Light", href: "/styles?tone=light" }
        ]
      },
      columns: [
        {
          heading: isZh ? "现代克制" : "Minimal",
          links: MINIMAL_STYLE_ITEMS.map((item) => ({
            label: isZh ? item.nameZh : item.name,
            href: `/styles/${item.slug}`,
            swatch: item.swatch
          }))
        },
        {
          heading: isZh ? "质感先锋" : "Expressive",
          links: EXPRESSIVE_STYLE_ITEMS.map((item) => ({
            label: isZh ? item.nameZh : item.name,
            href: `/styles/${item.slug}`,
            swatch: item.swatch
          }))
        },
        {
          heading: isZh ? "适用场景" : "Scenes",
          links: [
            { label: isZh ? "宣传官网" : "Landing", href: "/styles?scenario=landing" },
            { label: isZh ? "数据后台" : "Dashboard", href: "/styles?scenario=dashboard" },
            { label: isZh ? "智能工作台" : "AI Studio", href: "/styles?scenario=ai-workspace" },
            { label: isZh ? "文档阅读" : "Docs", href: "/styles?scenario=docs" }
          ]
        }
      ]
    },

    components: {
      primary: {
        heading: isZh ? "探索" : "Explore",
        elevatedLinks: [
          { label: isZh ? "全部组件" : "All", href: "/components" },
          { label: isZh ? "官网区块" : "Sections", href: "/components?type=section" },
          { label: isZh ? "功能模块" : "Blocks", href: "/components?type=block" },
          { label: isZh ? "交互动效" : "Motion", href: "/components?type=motion" }
        ]
      },
      columns: [
        {
          heading: isZh ? "官网区块" : "Sections",
          links: SECTION_CATEGORIES.map((cat) => ({
            label: isZh ? cat.nameZh : cat.name,
            href: `/components/${cat.id}`
          }))
        },
        {
          heading: isZh ? "功能模块" : "Blocks",
          links: BLOCK_CATEGORIES.map((cat) => ({
            label: isZh ? cat.nameZh : cat.name,
            href: `/components/${cat.id}`
          }))
        },
        {
          heading: isZh ? "交互动效" : "Motion",
          links: MOTION_CATEGORIES.map((cat) => ({
            label: isZh ? cat.nameZh : cat.name,
            href: `/components/${cat.id}`
          }))
        }
      ]
    },

    templates: {
      primary: {
        heading: isZh ? "探索" : "Explore",
        elevatedLinks: [
          { label: isZh ? "全部模板" : "All", href: "/templates" },
          { label: isZh ? "整站工程" : "Starters", href: "/templates?kind=starter" },
          { label: isZh ? "单页模板" : "Pages", href: "/templates?kind=page" }
        ]
      },
      columns: [
        {
          heading: isZh ? "整站场景" : "Starters",
          links: [
            { label: isZh ? "产品官网" : "SaaS", href: "/templates?kind=starter&scene=saas" },
            {
              label: isZh ? "智能工作台" : "AI Studio",
              href: "/templates?kind=starter&scene=ai-studio"
            },
            { label: isZh ? "数据后台" : "Admin", href: "/templates?kind=starter&scene=admin" },
            { label: isZh ? "技术文档" : "Docs", href: "/templates?kind=starter&scene=docs" },
            {
              label: isZh ? "个人主页" : "Portfolio",
              href: "/templates?kind=starter&scene=portfolio"
            },
            { label: isZh ? "博客周刊" : "Blog", href: "/templates?kind=starter&scene=blog" }
          ]
        },
        {
          heading: isZh ? "单页模板" : "Pages",
          links: [
            { label: isZh ? "落地首页" : "Landing", href: "/templates?kind=page&scene=landing" },
            { label: isZh ? "定价方案" : "Pricing", href: "/templates?kind=page&scene=pricing" },
            { label: isZh ? "登录认证" : "Auth", href: "/templates?kind=page&scene=auth" },
            { label: isZh ? "监控看板" : "Overview", href: "/templates?kind=page&scene=overview" },
            {
              label: isZh ? "更新日志" : "Changelog",
              href: "/templates?kind=page&scene=changelog"
            },
            { label: isZh ? "设置中心" : "Settings", href: "/templates?kind=page&scene=settings" }
          ]
        },
        {
          heading: isZh ? "精选成品" : "Featured",
          links: [
            { label: isZh ? "黑曜石官网" : "Obsidian", href: "/templates/obsidian-saas-kit" },
            { label: isZh ? "人文工作台" : "Editorial", href: "/templates/parchment-agent-desk" },
            { label: isZh ? "极简文档站" : "Protocol", href: "/templates/monochrome-docs-hub" },
            { label: isZh ? "金融监控台" : "Ledger", href: "/templates/ledger-telemetry-admin" }
          ]
        }
      ]
    },

    tools: {
      primary: {
        heading: isZh ? "探索" : "Explore",
        elevatedLinks: [
          { label: isZh ? "全部工具" : "All", href: "/tools" },
          { label: isZh ? "背景纹理" : "Backgrounds", href: "/tools/background" },
          { label: isZh ? "多层阴影" : "Shadows", href: "/tools/shadow" },
          { label: isZh ? "配色对比" : "Colors", href: "/tools/colors" },
          { label: isZh ? "字号排版" : "Typography", href: "/tools/typography" },
          { label: isZh ? "交互动效" : "Motion", href: "/tools/motion" }
        ]
      },
      columns: [
        {
          heading: isZh ? "表面预设" : "Surfaces",
          links: [
            { label: isZh ? "细线网格" : "Grid", href: "/tools/background?preset=linear-grid" },
            { label: isZh ? "点阵矩阵" : "Dots", href: "/tools/background?preset=dot-matrix" },
            { label: isZh ? "极光弥散" : "Aurora", href: "/tools/background?preset=borealis-lime" },
            { label: isZh ? "微浮面板" : "Subtle", href: "/tools/shadow?preset=linear-panel" },
            { label: isZh ? "硬边投影" : "Offset", href: "/tools/shadow?preset=brutal-offset" }
          ]
        },
        {
          heading: isZh ? "色彩排版" : "Color Type",
          links: [
            { label: isZh ? "色阶生成" : "OKLCH", href: "/tools/colors?tab=shades" },
            { label: isZh ? "对比度检查" : "Contrast", href: "/tools/colors?tab=contrast" },
            { label: isZh ? "流体字阶" : "Fluid Type", href: "/tools/typography" }
          ]
        },
        {
          heading: isZh ? "动效圆角" : "Motion Radii",
          links: [
            { label: isZh ? "弹簧曲线" : "Spring", href: "/tools/motion" },
            { label: isZh ? "同心圆角" : "Concentric", href: "/tools/shadow#radius-calc" },
            { label: isZh ? "磨砂模糊" : "Blur", href: "/tools/shadow" }
          ]
        }
      ]
    },

    mcp: {
      primary: {
        heading: isZh ? "探索" : "Explore",
        elevatedLinks: [
          { label: isZh ? "快速接入" : "Quickstart", href: "/mcp" },
          { label: isZh ? "检索沙盒" : "Sandbox", href: "/mcp#sandbox" },
          { label: isZh ? "命令行" : "CLI", href: "/mcp#cli" },
          { label: isZh ? "护栏规则" : "Rules", href: "/mcp#skill" },
          { label: isZh ? "提示词库" : "Prompts", href: "/mcp#prompts" }
        ]
      },
      columns: [
        {
          heading: isZh ? "百宝箱能力" : "Capabilities",
          links: [
            { label: isZh ? "检索图鉴" : "Catalog", href: "/catalog" },
            { label: isZh ? "匹配风格" : "Styles", href: "/styles" },
            { label: isZh ? "拉取组件" : "Components", href: "/components" },
            { label: isZh ? "安装模板" : "Templates", href: "/templates" },
            { label: isZh ? "计算令牌" : "Tokens", href: "/tools" }
          ]
        },
        {
          heading: isZh ? "交付方式" : "Delivery",
          links: [
            { label: isZh ? "在线接口" : "HTTP MCP", href: "/mcp" },
            { label: isZh ? "组件注册表" : "Registry", href: "/mcp#cli" },
            { label: isZh ? "防丑规则" : "Skill", href: "/mcp#skill" },
            { label: isZh ? "单次指令" : "Prompt", href: "/mcp#sandbox" }
          ]
        },
        {
          heading: isZh ? "支持软件" : "Clients",
          links: [
            { label: "Claude Code", href: "/mcp?client=claude-code" },
            { label: "Cursor", href: "/mcp?client=cursor" },
            { label: "Windsurf", href: "/mcp?client=windsurf" },
            { label: "Codex", href: "/mcp?client=codex" },
            { label: "Cline", href: "/mcp?client=cline" }
          ]
        }
      ]
    }
  };
}
