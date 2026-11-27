import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { PageBanner } from "@/components/patterns/page-banner";
import { LoadingGridSkeleton } from "@/components/patterns/state-views";
import { CatalogListView } from "@/features/catalog/catalog-list";

export default async function CatalogIndexPage() {
  const t = await getTranslations("catalog");
  const tCommon = await getTranslations("common");

  return (
    <div>
      <PageBanner
        breadcrumbs={[{ label: "Home", href: "/" }, { label: tCommon("navCatalog") }]}
        title={t("bannerTitle")}
        description={t("bannerDesc")}
      />
      <Suspense fallback={<LoadingGridSkeleton count={8} />}>
        <CatalogListView />
      </Suspense>
    </div>
  );
}
