# UIFino 首轮桌面网站（Web）批量采集标杆池

首轮集中采集 **公开桌面网站（同步抓取电脑 1440px 与手机 390px 双视口）**，按全站 6 大标准行业领域分组。派 `fleet` 时建议每批挑 8～12 个站并发执行。

## 1. 人工智能 (`AI & LLM`)
| id | 品牌名 | 网址 | 主色调预期 | 核心设计看点 |
| :--- | :--- | :--- | :--- | :--- |
| `claude` | Claude | `https://claude.ai` / `https://www.anthropic.com` | `light` | 温暖羊皮纸色阶、人文衬线标题、零科技蓝噪点 |
| `cursor` | Cursor | `https://www.cursor.com` | `dark` | 暗色高密度编辑器实景框、克制微纹理背景与等宽快捷键 |
| `elevenlabs` | ElevenLabs | `https://elevenlabs.io` | `light` | 极简纯白画布、声波微交互卡片与高反差纯黑胶囊按钮 |
| `perplexity` | Perplexity | `https://www.perplexity.ai` | `dark` | 青绿知性点缀、紧凑问答引用卡片与书卷感标题 |
| `v0` | v0 by Vercel | `https://v0.dev` | `dark` | 1px 细框提示词输入舞台与流式生成卡片网格 |
| `midjourney` | Midjourney | `https://www.midjourney.com` | `light` | 画廊级留白与高密度作品瀑布流排版 |
| `mistral` | Mistral AI | `https://mistral.ai` | `light` | 暖米色底板配复古像素橙红阶梯色带，极具辨识度 |
| `exa` | Exa | `https://exa.ai` | `light` | 工程研究笔记风、克制深蓝墨色与搜索结果代码对比 |

## 2. 开发工具 (`DevTools`)
| id | 品牌名 | 网址 | 主色调预期 | 核心设计看点 |
| :--- | :--- | :--- | :--- | :--- |
| `vercel` | Vercel | `https://vercel.com` | `dark` | 通栏 1px 建筑结构线、十字准星节点与极致黑白反差 |
| `supabase` | Supabase | `https://supabase.com` | `dark` | 炭黑底板配翡翠绿细微发光描边与模块化产品矩阵 |
| `resend` | Resend | `https://resend.com` | `dark` | 纯黑聚光灯舞台、顶光 1px 玻璃边框与高质感代码块 |
| `railway` | Railway | `https://railway.com` | `dark` | 深紫黑星轨画布、拓扑节点连线与实时遥测面板 |
| `planetscale` | PlanetScale | `https://planetscale.com` | `dark` | 硬朗纯黑工程排版、高密度性能基准对比图表 |
| `neon` | Neon | `https://neon.tech` | `dark` | 暗色数据库分支可视化与高对比荧光青绿焦点色 |
| `turso` | Turso | `https://turso.tech` | `dark` | 现代边缘计算暗黑几何网格与清爽定价对比表 |
| `trigger-dev` | Trigger.dev | `https://trigger.dev` | `dark` | 任务流水线状态色标、等宽日志流与紧凑卡片 |
| `mintlify` | Mintlify | `https://mintlify.com` | `light` | 现代技术文档站天花板，三栏目录与柔和渐变眉标 |
| `posthog` | PostHog | `https://posthog.com` | `light` | 复古桌面操作系统风、硬边插画与高信息密度诚实定价页 |

## 3. 效率办公 (`Productivity`)
| id | 品牌名 | 网址 | 主色调预期 | 核心设计看点 |
| :--- | :--- | :--- | :--- | :--- |
| `linear` | Linear | `https://linear.app` | `dark` | （已完成样板）曜石黑画布、510 字重紧凑标题、四列细线定价 |
| `raycast` | Raycast | `https://www.raycast.com` | `dark` | 毛玻璃悬浮命令面板、珊瑚红光泽与精细快捷键徽章 |
| `notion` | Notion | `https://www.notion.com` | `light` | 暖白纸张画布、单色简笔插画与积木化功能切换卡 |
| `cal-com` | Cal.com | `https://cal.com` | `light` | 高反差黑白日程组件标本与清爽便当盒布局 |
| `attio` | Attio | `https://attio.com` | `light` | 新一代表格与关系图谱美学，极细灰框与彩色状态胶囊 |
| `craft` | Craft | `https://www.craft.do` | `light` | 苹果原生级细腻圆角、多层纸张投影与优雅排版示范 |
| `cron-notion-calendar` | Notion Calendar | `https://www.notion.com/product/calendar` | `dark` | 时间格像素级对齐与克制日程色块 |
| `plain` | Plain | `https://www.plain.com` | `dark` | 面向开发者的工单客服台，极致干净的列表与快捷键流 |

## 4. 金融支付 (`Fintech`)
| id | 品牌名 | 网址 | 主色调预期 | 核心设计看点 |
| :--- | :--- | :--- | :--- | :--- |
| `stripe` | Stripe | `https://stripe.com` | `light` | 斜切网格线、清透多层蓝紫阴影卡片与精密账单表单标本 |
| `mercury` | Mercury | `https://mercury.com` | `light` | 冷静雾霾蓝灰纸张质感、银行级克制图表与资产卡片 |
| `ramp` | Ramp | `https://ramp.com` | `light` | 明亮柠檬黄绿行动点、紧凑财务审批流与计算器交互 |
| `brex` | Brex | `https://www.brex.com` | `light` | 商务橙重点色、清晰的企业级多档权限对账表 |
| `polar` | Polar | `https://polar.sh` | `dark` | 面向开源开发者的极简暗色订阅结算与收益看板 |
| `lemon-squeezy` | Lemon Squeezy | `https://www.lemonsqueezy.com` | `dark` | 深紫底板配明黄焦点，活泼但不乱的数字商品收银台 |

## 5. 内容社区 (`Content & Community`)
| id | 品牌名 | 网址 | 主色调预期 | 核心设计看点 |
| :--- | :--- | :--- | :--- | :--- |
| `read-cv` | Read.cv / Posts | `https://read.cv` | `light` | 极简个人履历与作品时间轴排版典范 |
| `substack` | Substack | `https://substack.com` | `light` | 暖橙品牌色与沉浸式长文阅读字阶 |
| `ghost` | Ghost | `https://ghost.org` | `light` | 独立出版平台，大字号标题冲击力与创作者数据卡 |
| `peerlist` | Peerlist | `https://peerlist.io` | `light` | 紧凑高密度产品发布榜与个人技能档案卡 |
| `dub` | Dub.co | `https://dub.co` | `light` | 清爽白底细框、精致短链统计折线图与丝滑定价滑块 |
| `framer` | Framer | `https://www.framer.com` | `dark` | 高饱和电光蓝深色舞台与丝滑网格卡片 |

## 6. 生活出行 (`Consumer & Travel`)
| id | 品牌名 | 网址 | 主色调预期 | 核心设计看点 |
| :--- | :--- | :--- | :--- | :--- |
| `luma` | Luma | `https://lu.ma` | `light` | 弥散光晕活动海报卡、圆润轻量表单与时间地点排版 |
| `airbnb` | Airbnb | `https://www.airbnb.com` | `light` | 4:3 圆角房源图卡、分类图标横条与清晰价格层级 |
| `flighty` | Flighty | `https://flighty.com` | `dark` | 航空仪表盘级高密度航班动态卡、机场等宽三字码 |
| `wise` | Wise | `https://wise.com` | `light` | 清脆森林绿配亮绿胶囊、汇率实时换算大卡片 |
| ` Teenage-Engineering` (`teenage-engineering`) | Teenage Engineering | `https://teenage.engineering` | `light` | 瑞士工业设计网格、极简灰底产品图与像素级参数表 |
| ` daylight` (`daylight-computer`) | Daylight Computer | `https://daylightcomputer.com` | `light` | 暖琥珀日光纸张色调、松弛留白与人文叙事节奏 |
