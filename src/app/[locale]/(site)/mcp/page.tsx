import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { PageBanner } from "@/components/patterns/page-banner";
import { LoadingGridSkeleton } from "@/components/patterns/state-views";
import { McpFeatureView } from "@/features/mcp";

export default async function McpPage() {
  const t = await getTranslations("mcp");
  const tCommon = await getTranslations("common");

  return (
    <div>
      <PageBanner
        breadcrumbs={[{ label: "Home", href: "/" }, { label: tCommon("navMcp") }]}
        title={t("bannerTitle")}
        description={t("bannerDesc")}
      />
      <Suspense fallback={<LoadingGridSkeleton count={4} />}>
        <McpFeatureView />
      </Suspense>
    </div>
  );
}
