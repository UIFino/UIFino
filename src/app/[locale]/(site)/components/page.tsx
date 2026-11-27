import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { PageBanner } from "@/components/patterns/page-banner";
import { LoadingGridSkeleton } from "@/components/patterns/state-views";
import { LibraryOverviewView } from "@/features/library/overview";

export default async function ComponentsIndexPage() {
  const t = await getTranslations("library");
  const tCommon = await getTranslations("common");

  return (
    <div>
      <PageBanner
        breadcrumbs={[{ label: "Home", href: "/" }, { label: tCommon("navComponents") }]}
        title={t("bannerTitle")}
        description={t("bannerDesc")}
      />
      <Suspense fallback={<LoadingGridSkeleton count={8} />}>
        <LibraryOverviewView />
      </Suspense>
    </div>
  );
}
