import type { CatalogScrapedData } from "@/core/design-md";

export const linearScrapedData: CatalogScrapedData = {
  capturedAt: "2026-11-27",
  containerMaxWidth: "1200px",
  pages: [
    {
      id: "home",
      titleZh: "产品首页",
      titleEn: "Home",
      path: "/",
      url: "https://linear.app/",
      desktopImg: "/catalog/linear/pages/home-desktop.jpg",
      mobileImg: "/catalog/linear/pages/home-mobile.jpg",
      anatomy: [
        {
          index: "01",
          nameZh: "吸顶毛玻璃导航栏",
          nameEn: "Sticky Blur Navbar",
          layoutZh: "单行三段式",
          layoutEn: "3-Zone Bar",
          noteZh: "高度 73px，20px 背景模糊配 8% 透明度细底边，右侧放置实心银白胶囊注册按钮。",
          noteEn: "73px height, blur(20px) backdrop, 1px rgba(255,255,255,0.08) bottom rule, silver-white pill CTA.",
          bounds: {
            desktop: { topPct: 0, heightPct: 2.5 },
            mobile: { topPct: 0, heightPct: 3.1 }
          }
        },
        {
          index: "02",
          nameZh: "左对齐大字首屏与工作台实景",
          nameEn: "Left-Aligned Hero & App Stage",
          layoutZh: "上下叠层",
          layoutEn: "Stacked Stage",
          noteZh: "64px Inter Variable 紧凑主标题（字重 510），下方紧接带侧边栏与 Agent 浮窗的真实软件界面框。",
          noteEn: "64px Inter Variable headline (510 weight, -1.4px tracking) above a framed dark workspace + Agent PR drawer.",
          bounds: {
            desktop: { topPct: 2.5, heightPct: 10.6 },
            mobile: { topPct: 3.1, heightPct: 12.3 }
          }
        },
        {
          index: "03",
          nameZh: "客户标志横条与三栏核心理念",
          nameEn: "Logo Strip & 3-Pillar Grid",
          layoutZh: "7 标 + 3 等列",
          layoutEn: "7 Logos + 3-Col",
          noteZh: "纯白单色客户标志居中横排，下方以细线线框插画呈现三列产品哲学。",
          noteEn: "Monochrome white customer logos followed by a 3-column architectural wireframe illustration grid.",
          bounds: {
            desktop: { topPct: 13.1, heightPct: 12.39 },
            mobile: { topPct: 15.4, heightPct: 16.59 }
          }
        },
        {
          index: "04",
          nameZh: "需求收集与规划双栏展示组",
          nameEn: "Intake & Planning Split Showcases",
          layoutZh: "双栏错位 + 叠卡",
          layoutEn: "2-Col Header + Cards",
          noteZh: "上左 48px 章节标题、上右正文导语，下方并排叠放 Slack 对话流与看板视图卡片。",
          noteEn: "2-column header (48px title left, copy right) above layered Slack thread and issue board surfaces.",
          bounds: {
            desktop: { topPct: 25.49, heightPct: 24.77 },
            mobile: { topPct: 31.99, heightPct: 19.83 }
          }
        },
        {
          index: "05",
          nameZh: "AI 协同与代码评审分格",
          nameEn: "AI Workflows & Code Diffs",
          layoutZh: "双栏对比",
          layoutEn: "2-Col Split",
          noteZh: "采用 Berkeley Mono 等宽字体渲染红绿行级代码差异与 PR 状态。",
          noteEn: "Renders syntax-highlighted code review diffs and agent task timelines in Berkeley Mono.",
          bounds: {
            desktop: { topPct: 50.26, heightPct: 39.97 },
            mobile: { topPct: 51.82, heightPct: 27.95 }
          }
        },
        {
          index: "06",
          nameZh: "居中转化横幅与六栏页脚",
          nameEn: "Centered CTA & 6-Column Footer",
          layoutZh: "居中主行动 + 6 列",
          layoutEn: "Centered + 6-Col",
          noteZh: "收尾仅保留一句主标题与双胶囊按钮，页脚按品牌标 + 5 组纯文字链接网格对齐。",
          noteEn: "Minimal closing headline with dual pill buttons, anchored by a 6-column muted sitemap footer.",
          bounds: {
            desktop: { topPct: 90.23, heightPct: 9.77 },
            mobile: { topPct: 79.77, heightPct: 20.23 }
          }
        }
      ]
    },
    {
      id: "pricing",
      titleZh: "定价方案",
      titleEn: "Pricing",
      path: "/pricing",
      url: "https://linear.app/pricing",
      desktopImg: "/catalog/linear/pages/pricing-desktop.jpg",
      mobileImg: "/catalog/linear/pages/pricing-mobile.jpg",
      anatomy: [
        {
          index: "01",
          nameZh: "四档细线竖分套餐卡",
          nameEn: "4-Tier Vertical Hairline Cards",
          layoutZh: "4 等列竖线",
          layoutEn: "4-Col Divided",
          noteZh: "Free / Basic / Business / Enterprise 四列仅靠 1px 竖向细线分隔，主推档采用实心浅白按钮与靛紫开关。",
          noteEn: "4 equal columns separated by 1px vertical hairlines; Business tier highlighted strictly via inverse white CTA.",
          bounds: {
            desktop: { topPct: 0, heightPct: 17.49 },
            mobile: { topPct: 0, heightPct: 33.13 }
          }
        },
        {
          index: "02",
          nameZh: "分组全量特性对比矩阵",
          nameEn: "Grouped Feature Comparison Matrix",
          layoutZh: "5 列吸顶对账表",
          layoutEn: "5-Col Matrix",
          noteZh: "左侧功能分组名，右侧四列勾选圆点对齐，无花哨背景底色干扰。",
          noteEn: "Clean 5-column check/cross feature table grouped by Core, AI Agents, Integrations, and Security.",
          bounds: {
            desktop: { topPct: 17.49, heightPct: 66.93 },
            mobile: { topPct: 33.13, heightPct: 51.3 }
          }
        },
        {
          index: "03",
          nameZh: "底部双按钮转化与页脚",
          nameEn: "Bottom CTA & Footer",
          layoutZh: "居中 + 6 列",
          layoutEn: "Centered + 6-Col",
          noteZh: "与首页保持完全一致的底部转化区与六栏站点地图。",
          noteEn: "Consistent closing conversion band and 6-column architectural footer.",
          bounds: {
            desktop: { topPct: 84.42, heightPct: 15.58 },
            mobile: { topPct: 84.43, heightPct: 15.57 }
          }
        }
      ]
    },
    {
      id: "changelog",
      titleZh: "更新日志",
      titleEn: "Changelog",
      path: "/changelog",
      url: "https://linear.app/changelog",
      desktopImg: "/catalog/linear/pages/changelog-desktop.jpg",
      mobileImg: "/catalog/linear/pages/changelog-mobile.jpg",
      anatomy: [
        {
          index: "01",
          nameZh: "Now 频道头部与订阅入口",
          nameEn: "Changelog Header",
          layoutZh: "单栏左对齐",
          layoutEn: "Single-Col Header",
          noteZh: "简洁大号标题配极淡分割线，直入最近版本动态。",
          noteEn: "Clean editorial header leading directly into chronological product releases.",
          bounds: {
            desktop: { topPct: 0, heightPct: 1.5 },
            mobile: { topPct: 0, heightPct: 1.5 }
          }
        },
        {
          index: "02",
          nameZh: "左日期轴 + 右图文日志流",
          nameEn: "Sticky Date Rail + Release Stream",
          layoutZh: "左窄右宽双栏",
          layoutEn: "2-Col Timeline",
          noteZh: "左侧固定等宽发布日期，右侧展示 16:10 功能配图与精炼更新正文。",
          noteEn: "Left monospace release date rail paired with wide dark product screenshots and release notes.",
          bounds: {
            desktop: { topPct: 1.5, heightPct: 98.5 },
            mobile: { topPct: 1.5, heightPct: 98.5 }
          }
        }
      ]
    },
    {
      id: "login",
      titleZh: "登录入口",
      titleEn: "Log in",
      path: "/login",
      url: "https://linear.app/login",
      desktopImg: "/catalog/linear/pages/login-desktop.jpg",
      mobileImg: "/catalog/linear/pages/login-mobile.jpg",
      anatomy: [
        {
          index: "01",
          nameZh: "全屏纯黑居中认证栈",
          nameEn: "Centered Auth Pill Stack",
          layoutZh: "单列 320px 居中",
          layoutEn: "Centered 320px",
          noteZh: "零外框卡片，纯 #08090A 背景正中纵向排列品牌图标、标题与 4 枚全圆角登录胶囊按钮（主项采用 #5E6AD2 靛紫）。",
          noteEn: "Zero outer card box; centered logo + 4 stacked full-pill buttons (#5E6AD2 Google primary + 3 #1A1C20 secondary options).",
          bounds: {
            desktop: { topPct: 24, heightPct: 52 },
            mobile: { topPct: 22, heightPct: 56 }
          }
        }
      ]
    }
  ],
  sections: [
    {
      id: "linear-sec-01",
      index: "01",
      nameZh: "吸顶毛玻璃顶栏",
      nameEn: "Sticky Blur Header",
      selector: "<header>",
      bbox: "1440 × 73px (y: 0px)",
      img: "/catalog/linear/sections/01-header.jpg",
      noteZh: "实测 backdrop-filter: blur(20px)，底部 1px rgba(255,255,255,0.08) 分割线，胶囊形 Sign up 主按钮。",
      noteEn: "Measured blur(20px) header with 1px 8%-white hairline and #E5E5E6 pill Sign up button."
    },
    {
      id: "linear-sec-02",
      index: "02",
      nameZh: "大字首屏与双层应用舞台",
      nameEn: "Hero & Layered Workspace Stage",
      selector: "<section>",
      bbox: "1440 × 1024px (y: 271px)",
      img: "/catalog/linear/sections/02-section.jpg",
      noteZh: "64px Inter Variable 标题左对齐，下方嵌套真实暗色三栏应用界面与右下角 Agent 审查浮窗。",
      noteEn: "64px tight-tracked Inter Variable title above a multi-pane dark product UI and floating Agent review card."
    },
    {
      id: "linear-sec-03",
      index: "03",
      nameZh: "双栏错位标题与叠层看板",
      nameEn: "Intake & Kanban Split Section",
      selector: "<section>",
      bbox: "1440 × 1226px (y: 2546px)",
      img: "/catalog/linear/sections/03-section.jpg",
      noteZh: "48px 标题与灰白导语左右分栏，下方前景悬浮讨论串卡片、背景平铺多列任务看板。",
      noteEn: "2-column split heading above an elevated foreground thread card overlapping a dark kanban grid."
    },
    {
      id: "linear-sec-04",
      index: "04",
      nameZh: "项目规划与周期时间轴",
      nameEn: "Planning & Timeline Telemetry",
      selector: "<section>",
      bbox: "1440 × 1229px (y: 3782px)",
      img: "/catalog/linear/sections/04-section.jpg",
      noteZh: "极低饱和度暗色甘特时间轴与折线指标卡，仅靠微亮描边与小圆点标识关键节点。",
      noteEn: "Restrained dark timeline & cycle telemetry cards accented only by subtle hairline borders."
    },
    {
      id: "linear-sec-05",
      index: "05",
      nameZh: "四列竖线分割定价矩阵",
      nameEn: "4-Tier Hairline Pricing Grid",
      selector: "<section>",
      bbox: "1440 × 760px (/pricing y: 80px)",
      img: "/catalog/linear/sections/05-pricing-tiers.jpg",
      noteZh: "四档套餐零独立方框背景，共用纵向 1px 细分割线，靛紫色仅用于年付开关拨片。",
      noteEn: "Border-collapsed 4-tier pricing columns; #5E6AD2 reserved for billing switches and inverse white pill on Business."
    },
    {
      id: "linear-sec-06",
      index: "06",
      nameZh: "六栏极简建筑页脚",
      nameEn: "6-Column Architectural Footer",
      selector: "<footer>",
      bbox: "1440 × 524px (y: 9466px)",
      img: "/catalog/linear/sections/06-footer.jpg",
      noteZh: "左侧单色圆标，右侧五列紧凑目录（#8A8F98），无社交花哨彩标与订阅大输入框。",
      noteEn: "Monochrome mark on the left + 5 clean sitemap columns in #8A8F98 muted gray."
    }
  ],
  measuredColors: [
    { roleZh: "全局画布底色", roleEn: "Body Canvas", cssVar: "--brand-canvas", hex: "#08090A", share: "68%" },
    { roleZh: "应用卡片底色", roleEn: "Panel Surface", cssVar: "--brand-surface", hex: "#0F1011", share: "16%" },
    { roleZh: "浮窗与次按钮底", roleEn: "Elevated Control", cssVar: "--brand-elevated", hex: "#1A1C20", share: "6%" },
    { roleZh: "1px 半透细边框", roleEn: "Hairline Border (8% White)", cssVar: "--brand-border", hex: "#23252A", share: "4%" },
    { roleZh: "主标题亮白字", roleEn: "Primary Ink", cssVar: "--brand-ink", hex: "#F7F8F8", share: "3%" },
    { roleZh: "正文说明冷灰", roleEn: "Secondary Copy", cssVar: "--brand-muted", hex: "#8A8F98", share: "2%" },
    { roleZh: "高反差胶囊主按钮", roleEn: "Inverse Pill CTA", cssVar: "--brand-cta-light", hex: "#E5E5E6", share: "0.5%" },
    { roleZh: "品牌靛紫焦点色", roleEn: "Brand Indigo Accent", cssVar: "--brand-accent", hex: "#5E6AD2", share: "0.5%" }
  ],
  measuredTypography: [
    {
      level: "H1 Hero",
      detectedFamily: "Inter Variable",
      freeAlternative: "Inter",
      size: "64px",
      weight: "510",
      lineHeight: "64px (1.00)",
      tracking: "-1.408px (-0.022em)",
      cssSnippet:
        'font-family: "Inter", system-ui, sans-serif; font-size: 64px; font-weight: 510; line-height: 1; letter-spacing: -0.022em; color: #F7F8F8;'
    },
    {
      level: "H2 Section",
      detectedFamily: "Inter Variable",
      freeAlternative: "Inter",
      size: "48px",
      weight: "510",
      lineHeight: "48px (1.00)",
      tracking: "-1.056px (-0.022em)",
      cssSnippet:
        'font-family: "Inter", system-ui, sans-serif; font-size: 48px; font-weight: 510; line-height: 1; letter-spacing: -0.022em;'
    },
    {
      level: "Body Copy",
      detectedFamily: "Inter Variable",
      freeAlternative: "Inter",
      size: "15px",
      weight: "400",
      lineHeight: "24px (1.60)",
      tracking: "-0.165px (-0.011em)",
      cssSnippet:
        'font-family: "Inter", system-ui, sans-serif; font-size: 15px; font-weight: 400; line-height: 1.6; letter-spacing: -0.011em; color: #8A8F98;'
    },
    {
      level: "Code & Meta",
      detectedFamily: "Berkeley Mono",
      freeAlternative: "JetBrains Mono / Geist Mono",
      size: "12px",
      weight: "400",
      lineHeight: "20px (1.66)",
      tracking: "-0.182px",
      cssSnippet:
        'font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 12px; line-height: 20px; font-variant-numeric: tabular-nums; color: #D0D6E0;'
    }
  ],
  measuredGeometry: [
    {
      targetZh: "官网胶囊按钮（Sign up / Login）",
      targetEn: "Marketing Pill Button",
      radius: "9999px",
      border: "1px solid #E5E5E6",
      shadow: "none",
      extra: "height: 32px · padding: 0 14px",
      cssSnippet:
        "height: 32px; padding: 0 14px; border-radius: 9999px; background: #E5E5E6; color: #08090A; font-size: 13px; font-weight: 500;"
    },
    {
      targetZh: "工作台演示窗与业务卡片",
      targetEn: "App Frame & Feature Card",
      radius: "8px",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      shadow: "0 24px 60px rgba(0, 0, 0, 0.65)",
      extra: "background: #0F1011",
      cssSnippet:
        "background: #0F1011; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.65);"
    },
    {
      targetZh: "吸顶导航栏毛玻璃层",
      targetEn: "Sticky Glass Header",
      radius: "0px",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      shadow: "none",
      extra: "backdrop-filter: blur(20px) · height: 73px",
      cssSnippet:
        "height: 73px; background: rgba(8, 9, 10, 0.72); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255, 255, 255, 0.08);"
    }
  ],
  hoverDiffs: [
    {
      targetZh: "银白主胶囊按钮（Sign up / Get started）",
      targetEn: "Inverse Silver Pill CTA",
      restBg: "#E5E5E6",
      restBorder: "#E5E5E6",
      restColor: "#08090A",
      hoverBg: "#FFFFFF",
      hoverBorder: "#FFFFFF",
      hoverColor: "#08090A",
      transition: "160ms cubic-bezier(0.25, 1, 0.5, 1)",
      cssSnippet:
        ".linear-pill-cta { background: #E5E5E6; color: #08090A; border-radius: 9999px; transition: background-color 160ms cubic-bezier(0.25, 1, 0.5, 1); }\n.linear-pill-cta:hover { background: #FFFFFF; }"
    },
    {
      targetZh: "靛紫品牌操作按钮（Google SSO / Switch）",
      targetEn: "Indigo Accent Action",
      restBg: "#5E6AD2",
      restBorder: "#5E6AD2",
      restColor: "#FFFFFF",
      hoverBg: "#6E79DF",
      hoverBorder: "#6E79DF",
      hoverColor: "#FFFFFF",
      transition: "160ms ease-out",
      cssSnippet:
        ".linear-indigo-btn { background: #5E6AD2; color: #FFFFFF; border-radius: 9999px; transition: background-color 160ms ease-out; }\n.linear-indigo-btn:hover { background: #6E79DF; }"
    },
    {
      targetZh: "顶栏与页脚次级文字链接",
      targetEn: "Muted Nav & Footer Link",
      restBg: "#08090A",
      restBorder: "#23252A",
      restColor: "#8A8F98",
      hoverBg: "#16181C",
      hoverBorder: "#2E2E32",
      hoverColor: "#F7F8F8",
      transition: "140ms ease",
      cssSnippet:
        ".linear-nav-link { color: #8A8F98; transition: color 140ms ease; }\n.linear-nav-link:hover { color: #F7F8F8; }"
    }
  ]
};
