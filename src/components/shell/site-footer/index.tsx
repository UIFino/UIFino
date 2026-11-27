import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("common");

  return (
    <footer className="border-t border-hairline bg-canvas">
      <div className="shell-wrap grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6 px-7 py-9">
        <div>
          <div className="font-pixel-brand text-[17px] font-bold">
            ui<span className="text-accent-text">fino</span>
          </div>
          <p className="mt-2.5 text-[12.5px] leading-[1.55] text-muted">{t("footerTagline")}</p>
        </div>

        <div>
          <div className="eyebrow-mono mb-2.5">CATALOG</div>
          <div className="grid gap-1.5 text-[13px] text-muted">
            <Link href="/catalog/linear" className="hover:text-ink">
              Linear DESIGN.md
            </Link>
            <Link href="/catalog/claude" className="hover:text-ink">
              Claude DESIGN.md
            </Link>
            <Link href="/catalog/vercel" className="hover:text-ink">
              Vercel DESIGN.md
            </Link>
            <Link href="/catalog/flighty" className="hover:text-ink">
              Flighty iOS Spec
            </Link>
          </div>
        </div>

        <div>
          <div className="eyebrow-mono mb-2.5">COMPONENTS</div>
          <div className="grid gap-1.5 text-[13px] text-muted">
            <Link href="/components/hero" className="hover:text-ink">
              Hero Sections
            </Link>
            <Link href="/components/auth" className="hover:text-ink">
              Authentication
            </Link>
            <Link href="/components/landing-pages" className="hover:text-ink">
              Product Landing
            </Link>
            <Link href="/components/counters-tickers" className="hover:text-ink">
              Motion &amp; Counters
            </Link>
          </div>
        </div>

        <div>
          <div className="eyebrow-mono mb-2.5">TEMPLATES &amp; TOOLS</div>
          <div className="grid gap-1.5 text-[13px] text-muted">
            <Link href="/templates" className="hover:text-ink">
              Starter Templates
            </Link>
            <Link href="/tools/background" className="hover:text-ink">
              Background Generator
            </Link>
            <Link href="/tools/shadow" className="hover:text-ink">
              Shadow &amp; Token Lab
            </Link>
            <Link href="/mcp" className="hover:text-ink">
              MCP Server Setup
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
