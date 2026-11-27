import { useTranslations } from "next-intl";
import { Button } from "@/components/primitives/button";
import { Link } from "@/i18n/navigation";

export default function LocaleNotFound() {
  const t = useTranslations("common");

  return (
    <div className="band-full min-h-[65dvh] flex items-center">
      <div className="shell-wrap py-20 text-center">
        <div className="font-mono-ui text-xs text-accent-text">404 · NOT FOUND</div>
        <h1 className="mt-3 text-2xl font-bold text-ink">{t("notFoundTitle")}</h1>
        <div className="mt-6 flex justify-center">
          <Link href="/">
            <Button variant="contrast">{t("notFoundAction")} →</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
