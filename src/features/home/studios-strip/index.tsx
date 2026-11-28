import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/primitives/badge";
import { Link } from "@/i18n/navigation";

export function HomeStudiosStrip() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isZh = locale === "zh";

  const studios = [
    {
      href: "/tools/background",
      tag: "STUDIO 01",
      title: isZh ? "背景纹理" : "Backgrounds",
      desc: isZh
        ? "网格、点阵、极光、噪点与径向渐隐遮罩，叠加首屏压测可读性。"
        : "Grid, dot matrix, aurora, grain & radial mask fades over live hero text."
    },
    {
      href: "/tools/shadow",
      tag: "STUDIO 02",
      title: isZh ? "多层阴影" : "Shadows",
      desc: isZh
        ? "三档高度阴影、1px 顶光内高光、背景模糊与同心圆角卡尺。"
        : "3-tier elevation shadows, 1px top rim highlights & concentric radius caliper."
    },
    {
      href: "/tools/colors",
      tag: "STUDIO 03",
      title: isZh ? "配色对比" : "Colors",
      desc: isZh
        ? "OKLCH 50–950 均匀色阶、配套中性灰与 AA/AAA 组件体检矩阵。"
        : "OKLCH shade ladders, neutral grays & live UI component WCAG audit."
    },
    {
      href: "/tools/typography",
      tag: "STUDIO 04",
      title: isZh ? "字号排版" : "Typography",
      desc: isZh
        ? "固定比例或 Utopia 流体 clamp() 字阶、负字距与双语长文预览。"
        : "Modular or Utopia fluid clamp() type scales with OFL font pairings."
    },
    {
      href: "/tools/motion",
      tag: "STUDIO 05",
      title: isZh ? "交互动效" : "Motion",
      desc: isZh
        ? "生硬匀速对照组 vs 物理曲线同台赛跑，导出 CSS linear() 弹簧。"
        : "Baseline vs tuned curve race with native CSS linear() spring export."
    }
  ] as const;

  return (
    <div className="band-full">
      <section className="shell-wrap">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline px-6 py-2.5">
          <span className="eyebrow-mono">5 VISUAL STUDIOS &amp; 4-RING AI DELIVERY</span>
          <Link href="/mcp" className="font-mono text-xs text-accent-text hover:underline">
            POST /api/mcp · /r/registry.json →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-5">
          {studios.map((card) => (
            <div key={card.tag} className="lined-cell">
              <Link
                href={card.href}
                className="flex h-full w-full flex-col justify-between gap-4 px-5 py-5 text-left"
              >
                <div>
                  <div className="eyebrow-mono text-accent-text">{card.tag}</div>
                  <div className="mt-1.5 text-[15px] font-semibold text-ink">{card.title}</div>
                  <p className="mt-1.5 text-[12.5px] leading-[1.52] text-muted">{card.desc}</p>
                </div>
                <div className="flex items-center justify-between font-mono text-[11.5px] text-ink">
                  <span>{t("openNow")}</span>
                  <span className="inline-flex h-6 w-6 items-center justify-center border border-hairline bg-gray-100">
                    →
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <Link
          href="/mcp"
          className="flex flex-wrap items-center justify-between gap-4 border-t border-hairline bg-surface px-6 py-4 transition-colors hover:bg-elevated"
        >
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="ribbon">AI CONNECT</Badge>
            <span className="text-sm font-semibold text-ink">{t("studioMcpTitle")}</span>
            <span className="text-xs text-muted">{t("studioMcpDesc")}</span>
          </div>
          <span className="font-mono text-xs font-semibold text-accent-text">
            {isZh ? "查看四环接入配置 →" : "Open 4-Ring AI Setup →"}
          </span>
        </Link>
      </section>
    </div>
  );
}
