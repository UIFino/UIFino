import { getTranslations } from "next-intl/server";
import { PageBanner } from "@/components/patterns/page-banner";
import { ToolsOverviewView } from "@/features/tools/tools-overview";

export default async function ToolsIndexPage() {
  const t = await getTranslations("tools");
  const tCommon = await getTranslations("common");

  return (
    <div>
      <PageBanner
        breadcrumbs={[{ label: "Home", href: "/" }, { label: tCommon("navTools") }]}
        title={t("bannerTitle")}
        description={t("bannerDesc")}
      />
      <ToolsOverviewView />
    </div>
  );
}
