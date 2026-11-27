import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageBanner } from "@/components/patterns/page-banner";
import { LoadingGridSkeleton } from "@/components/patterns/state-views";
import { BackgroundStudioView } from "@/features/tools/background-studio";
import { ShadowStudioView } from "@/features/tools/shadow-studio";

export function generateStaticParams() {
  return [{ studio: "background" }, { studio: "shadow" }];
}

export default async function ToolsStudioPage({
  params
}: {
  readonly params: Promise<{ studio: string }>;
}) {
  const { studio } = await params;
  if (studio !== "background" && studio !== "shadow") {
    notFound();
  }

  const t = await getTranslations("tools");
  const tCommon = await getTranslations("common");

  return (
    <div>
      <PageBanner
        breadcrumbs={[{ label: "Home", href: "/" }, { label: tCommon("navTools") }]}
        title={t("bannerTitle")}
        description={t("bannerDesc")}
      />
      <Suspense fallback={<LoadingGridSkeleton count={4} />}>
        {studio === "shadow" ? <ShadowStudioView /> : <BackgroundStudioView />}
      </Suspense>
    </div>
  );
}
