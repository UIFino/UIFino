import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { PageBanner } from "@/components/patterns/page-banner";
import { LoadingGridSkeleton } from "@/components/patterns/state-views";
import { TemplatesListView } from "@/features/templates/template-list";

export default async function TemplatesIndexPage() {
  const t = await getTranslations("templates");
  const tCommon = await getTranslations("common");

  return (
    <div>
      <PageBanner
        breadcrumbs={[{ label: "Home", href: "/" }, { label: tCommon("navTemplates") }]}
        title={t("bannerTitle")}
        description={t("bannerDesc")}
      />
      <Suspense fallback={<LoadingGridSkeleton count={4} />}>
        <TemplatesListView />
      </Suspense>
    </div>
  );
}
