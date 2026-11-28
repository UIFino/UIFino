import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageBanner } from "@/components/patterns/page-banner";
import { LoadingGridSkeleton } from "@/components/patterns/state-views";
import { BackgroundStudioView } from "@/features/tools/background-studio";
import { ColorsStudioView } from "@/features/tools/colors-studio";
import { MotionStudioView } from "@/features/tools/motion-studio";
import { ShadowStudioView } from "@/features/tools/shadow-studio";
import { TypographyStudioView } from "@/features/tools/typography-studio";

const VALID_STUDIOS = ["background", "shadow", "colors", "typography", "motion"] as const;

export function generateStaticParams() {
  return VALID_STUDIOS.map((studio) => ({ studio }));
}

export default async function ToolsStudioPage({
  params
}: {
  readonly params: Promise<{ studio: string }>;
}) {
  const { studio } = await params;
  if (!VALID_STUDIOS.includes(studio as (typeof VALID_STUDIOS)[number])) {
    notFound();
  }

  const t = await getTranslations("tools");
  const tCommon = await getTranslations("common");

  return (
    <div>
      <PageBanner
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: tCommon("navTools"), href: "/tools" }
        ]}
        title={t("bannerTitle")}
        description={t("bannerDesc")}
      />
      <Suspense fallback={<LoadingGridSkeleton count={4} />}>
        {studio === "shadow" ? (
          <ShadowStudioView />
        ) : studio === "colors" ? (
          <ColorsStudioView />
        ) : studio === "typography" ? (
          <TypographyStudioView />
        ) : studio === "motion" ? (
          <MotionStudioView />
        ) : (
          <BackgroundStudioView />
        )}
      </Suspense>
    </div>
  );
}
