"use client";

import { useLocale } from "next-intl";
import { Badge } from "@/components/primitives/badge";
import { Link } from "@/i18n/navigation";

export function ToolsOverviewView() {
  const locale = useLocale();
  const isZh = locale === "zh";

  const studios = [
    {
      num: "01",
      href: "/tools/background",
      title: isZh ? "背景纹理" : "Backgrounds",
      tag: "Grid · Dots · Aurora · Mask",
      desc: isZh
        ? "纯 CSS 调节网格、点阵、极光、噪点与四周径向渐隐遮罩，并在画布叠加真实首屏按钮压测可读性。"
        : "Layer structural grids, dots, aurora glows, grain, and radial edge fade masks over live hero typography."
    },
    {
      num: "02",
      href: "/tools/shadow",
      title: isZh ? "多层阴影" : "Shadows",
      tag: "3-Tier · Rim Light · Concentric",
      desc: isZh
        ? "同步计算卡片/下拉/弹窗三档高度投影、1px 顶光内高光与背景模糊，附可视化同心圆角卡尺。"
        : "Compute 3-tier ambient shadows, 1px top rim highlights, backdrop blur, and concentric radii."
    },
    {
      num: "03",
      href: "/tools/colors",
      title: isZh ? "配色对比" : "Colors",
      tag: "OKLCH · Neutral · WCAG Matrix",
      desc: isZh
        ? "OKLCH 均匀色阶智能落点、冷暖中性灰配比，常驻真实微缩组件预览与全套 AA/AAA 对比度绿灯矩阵。"
        : "Perceptual OKLCH 50–950 ladders, paired neutral grays, live UI specimens, and full AA/AAA audits."
    },
    {
      num: "04",
      href: "/tools/typography",
      title: isZh ? "字号排版" : "Typography",
      tag: "Clamp() Fluid · Font Pairings",
      desc: isZh
        ? "一键切换固定比例或 Utopia 流体 clamp() 自适应字阶，配大厂负字距、开源字体三件套与双语长文预览。"
        : "Toggle modular or Utopia fluid clamp() scales, negative tracking, OFL font pairings, and bilingual prose."
    },
    {
      num: "05",
      href: "/tools/motion",
      title: isZh ? "交互动效" : "Motion",
      tag: "Dual-Track · CSS linear() Spring",
      desc: isZh
        ? "生硬匀速对照组 vs 当前曲线同台赛跑，支持抽屉/弹窗/悬浮卡三场景预览与原生 CSS linear() 弹簧导出。"
        : "Side-by-side linear baseline vs tuned curve across drawer, modal & hover scenes with CSS linear() export."
    }
  ] as const;

  return (
    <div className="band-full">
      <section className="shell-wrap">
        <div className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-2 xl:grid-cols-3">
          {studios.map((st) => (
            <div key={st.href} className="lined-cell">
              <Link
                href={st.href}
                className="group flex h-full flex-col justify-between gap-5 p-7 transition-colors hover:bg-surface"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="eyebrow-mono text-accent-text">STUDIO {st.num}</span>
                    <Badge>{st.tag}</Badge>
                  </div>
                  <h2 className="mt-3 text-xl font-semibold text-ink group-hover:text-accent-text">
                    {st.title}
                  </h2>
                  <p className="mt-2 text-[13.5px] leading-[1.58] text-muted">{st.desc}</p>
                </div>

                <div className="font-mono-ui text-xs font-semibold text-ink">
                  {isZh ? "进入工作室 →" : "Open Studio →"}
                </div>
              </Link>
            </div>
          ))}

          <div className="lined-cell">
            <Link
              href="/mcp"
              className="group flex h-full flex-col justify-between gap-5 bg-surface/50 p-7 transition-colors hover:bg-surface"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="eyebrow-mono text-accent-text">MCP + REGISTRY</span>
                  <Badge variant="accent">POST /api/mcp</Badge>
                </div>
                <h2 className="mt-3 text-xl font-semibold text-ink group-hover:text-accent-text">
                  {isZh ? "接入到 AI 引擎" : "Connect AI Agents"}
                </h2>
                <p className="mt-2 text-[13.5px] leading-[1.58] text-muted">
                  {isZh
                    ? "五大工作室参数已通过 MCP 工具 compute_surface_tokens 与 shadcn 注册表实时向 AI 开放。"
                    : "All five studios are exposed live via MCP compute_surface_tokens and the shadcn registry."}
                </p>
              </div>
              <div className="font-mono-ui text-xs font-semibold text-accent-text">
                {isZh ? "前往接入到 AI →" : "Open Connect AI →"}
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
