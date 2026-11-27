import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { PageBanner } from "@/components/patterns/page-banner";
import { LoadingGridSkeleton } from "@/components/patterns/state-views";
import { StylesListView } from "@/features/styles/styles-list";

export default async function StylesIndexPage() {
  const t = await getTranslations("styles");
  const tCommon = await getTranslations("common");

  return (
    <div>
      <PageBanner
        breadcrumbs={[{ label: "Home", href: "/" }, { label: tCommon("navStyles") }]}
        title={t("bannerTitle")}
        description={t("bannerDesc")}
      />
      <Suspense fallback={<LoadingGridSkeleton count={6} />}>
        <StylesListView />
      </Suspense>
    </div>
  );
}
