export interface StyleFitAndRefs {
  readonly goodForZh: readonly string[];
  readonly goodForEn: readonly string[];
  readonly notForZh: readonly string[];
  readonly notForEn: readonly string[];
  readonly relatedBrandIds: readonly string[];
}

export const STYLE_FIT_REFS: Record<string, StyleFitAndRefs> = {
  "hairline-grid": {
    goodForZh: ["开发者官网", "API 技术文档", "SaaS 定价与更新日志", "工程监控面板"],
    goodForEn: ["DevTools Marketing", "API Docs", "SaaS Pricing", "Telemetry Consoles"],
    notForZh: ["情绪化艺术海报", "电商促销秒杀页", "儿童教育娱乐"],
    notForEn: ["Festive Promo Banners", "Flash-Sale E-commerce", "Playful Kids Apps"],
    relatedBrandIds: ["linear", "vercel", "resend"]
  },
  "monochrome-minimal": {
    goodForZh: ["技术架构白皮书", "极简命令行工具", "个人作品集", "长文阅读与博客"],
    goodForEn: ["Technical Docs", "CLI Landing Pages", "Minimal Portfolios", "Longform Blogs"],
    notForZh: ["多状态红绿告警监控", "饱和度营销广告页", "重度数据图表 BI"],
    notForEn: ["Multi-Color Telemetry", "Ad Landing Funnels", "Dense BI Heatmaps"],
    relatedBrandIds: ["vercel", "notion", "resend"]
  },
  "swiss-typographic": {
    goodForZh: ["设计机构官网", "建筑与创意工作室", "新闻资讯期刊", "品牌视觉规范站"],
    goodForEn: ["Design Studios", "Editorial Magazines", "Brand Portals", "Conference Sites"],
    notForZh: ["重度嵌套表格后台", "聊天机器人悬浮窗", "夜间游戏工具"],
    notForEn: ["Dense Admin Tables", "Floating Chat Widgets", "Gaming Overlays"],
    relatedBrandIds: ["vercel", "stripe", "notion"]
  },
  "clean-saas": {
    goodForZh: ["B2B 客户控制台", "支付与账单系统", "多团队协作后台", "通用产品官网"],
    goodForEn: ["B2B Dashboards", "Billing & Fintech", "Team Workspaces", "Product Marketing"],
    notForZh: ["硬核黑客终端工具", "强个性化独立品牌海报", "极简纯文字周刊"],
    notForEn: ["Hacker CLI Tools", "Avant-Garde Posters", "Pure-Text Essays"],
    relatedBrandIds: ["stripe", "supabase", "linear"]
  },
  "editorial-serif": {
    goodForZh: ["AI 深度写作对话", "研究报告与知识库", "思想周刊与长文", "人文质感官网"],
    goodForEn: ["AI Writing Desks", "Research Knowledge Bases", "Substacks & Essays", "Editorial Home"],
    notForZh: ["实时高频金融交易盘", "密集指标数据大屏", "赛博朋克娱乐产品"],
    notForEn: ["High-Freq Trading", "KPI Wallboards", "Neon Gaming UIs"],
    relatedBrandIds: ["claude", "notion"]
  },
  "frosted-glass": {
    goodForZh: ["桌面效率启动器", "AI 空间对话浮层", "日历与活动邀请页", "浏览器新品官网"],
    goodForEn: ["Desktop Launchers", "Spatial AI Overlays", "Event Invites", "Modern Browsers"],
    notForZh: ["高对比度无障碍政务系统", "低配老旧浏览器内网", "长篇技术表格后台"],
    notForEn: ["Legacy Enterprise Tables", "Low-End GPU Kiosks", "Dense Financial Ledgers"],
    relatedBrandIds: ["raycast", "arc-search", "luma-app"]
  },
  "bento-modular": {
    goodForZh: ["新品发布核心卖点区", "AI 能力矩阵展示", "硬件与软件混合官网", "定价对比概览"],
    goodForEn: ["Product Feature Showcases", "AI Capability Grids", "Hardware Launches", "Plan Overviews"],
    notForZh: ["深度层级文件夹树", "长篇法律条款文档", "单线程线性教程"],
    notForEn: ["Deep Folder Trees", "Legal Contracts", "Linear Step Tutorials"],
    relatedBrandIds: ["linear", "raycast", "luma-app"]
  },
  "neo-brutalism": {
    goodForZh: ["独立开发者小工具", "开源黑客松活动页", "潮流电商与周边店", "高互动问卷表单"],
    goodForEn: ["Indie Micro-Tools", "Hackathon Pages", "Streetwear Stores", "Playful Quizzes"],
    notForZh: ["银行医疗合规后台", "长时间阅读的知识库", "稳重大客户企业 ERP"],
    notForEn: ["Banking & Healthcare", "Longform Reading", "Conservative Enterprise ERP"],
    relatedBrandIds: ["raycast", "luma-app"]
  },
  "soft-tactile": {
    goodForZh: ["移动端硬件控制 App", "金融银行记账与支付", "音频播客与媒体播放器", "习惯打卡工具"],
    goodForEn: ["Hardware Companion Apps", "Modern Consumer Banking", "Media Players", "Habit Trackers"],
    notForZh: ["千行万列数据审计表", "命令行脚本参考手册", "极端紧凑型代码 IDE"],
    notForEn: ["Dense Audit Grids", "CLI Manuals", "Compact Code IDEs"],
    relatedBrandIds: ["mercury-app", "flighty", "arc-search"]
  },
  "retro-terminal": {
    goodForZh: ["安全审计与日志流", "实时基础设施监控", "CLI 开源工具官网", "航空调度信息卡"],
    goodForEn: ["Security & Log Streams", "Infra Telemetry", "CLI Tool Websites", "Live Dispatch Cards"],
    notForZh: ["奢侈品与生活方式电商", "轻松社交社区应用", "多段落长文杂志"],
    notForEn: ["Luxury E-commerce", "Social Feeds", "Editorial Magazines"],
    relatedBrandIds: ["supabase", "flighty", "vercel"]
  }
};

export function getStyleFitAndRefs(slug: string): StyleFitAndRefs {
  return (
    STYLE_FIT_REFS[slug] ?? {
      goodForZh: ["产品官网", "现代 Web 工作台"],
      goodForEn: ["Product Marketing", "Modern Web Workspaces"],
      notForZh: ["与风格调性冲突的高饱和广告"],
      notForEn: ["Clashing High-Saturation Ads"],
      relatedBrandIds: ["linear", "claude"]
    }
  );
}
