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
      tag: "Grid · Dots · Aurora · Grain",
      desc: isZh
        ? "实时调节网格间距、点阵密度、极光弥散与噪点颗粒，一键导出背景样式。"
        : "Tune structural grids, dot matrices, aurora glows, and film grain with live CSS."
    },
    {
      num: "02",
      href: "/tools/shadow",
      title: isZh ? "多层阴影" : "Shadows",
      tag: "Rim Light · Offset · Radius",
      desc: isZh
        ? "调配多层悬浮投影、1px 顶光内高光、硬边偏移投影与同心圆角换算。"
        : "Craft multi-layer ambient elevation, 1px top rim highlights, and concentric radii."
    },
    {
      num: "03",
      href: "/tools/colors",
      title: isZh ? "配色对比" : "Colors",
      tag: "50–950 Shades · WCAG 2.1",
      desc: isZh
        ? "由单一主色自动推导 11 级明暗色阶，并实时检验正文与标题无障碍对比度。"
        : "Generate 11-stop shade ladders from one seed hex and verify WCAG AA/AAA contrast."
    },
    {
      num: "04",
      href: "/tools/typography",
      title: isZh ? "字号排版" : "Typography",
      tag: "Modular Scale · Cubic-Bezier",
      desc: isZh
        ? "按比例系数计算标题到正文完整字号阶梯，并预览常用交互缓动曲线。"
        : "Compute modular rem/px type scales and preview snappy cubic-bezier motion curves."
    }
  ] as const;

  return (
    <div className="band-full">
      <section className="shell-wrap">
        <div className="lined-grid-2">
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
        </div>
      </section>
    </div>
  );
}
