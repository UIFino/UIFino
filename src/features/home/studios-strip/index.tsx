import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function HomeStudiosStrip() {
  const t = useTranslations("home");

  const cards = [
    {
      href: "/tools/background",
      tag: "STUDIO 01",
      title: t("studioBgTitle"),
      desc: t("studioBgDesc")
    },
    {
      href: "/tools/shadow",
      tag: "STUDIO 02",
      title: t("studioShadowTitle"),
      desc: t("studioShadowDesc")
    },
    {
      href: "/mcp",
      tag: "MCP SERVER",
      title: t("studioMcpTitle"),
      desc: t("studioMcpDesc")
    }
  ] as const;

  return (
    <div className="band-full">
      <section className="shell-wrap">
        <div className="eyebrow-mono border-b border-hairline px-6 py-2.5">
          TOOLS &amp; AI INTEGRATION
        </div>
        <div className="lined-grid-3">
          {cards.map((card) => (
            <div key={card.tag} className="lined-cell">
              <Link
                href={card.href}
                className="flex h-full w-full flex-col justify-between gap-4 px-6 py-[22px] text-left"
              >
                <div>
                  <div className="eyebrow-mono text-accent-text">{card.tag}</div>
                  <div className="mt-1.5 text-base font-semibold text-ink">{card.title}</div>
                  <p className="mt-1.5 text-[13px] leading-[1.55] text-muted">{card.desc}</p>
                </div>
                <div className="flex items-center justify-between font-mono text-[11.5px] text-ink">
                  <span>{t("openNow")}</span>
                  <span className="inline-flex h-7 w-7 items-center justify-center border border-hairline bg-gray-100">
                    →
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
