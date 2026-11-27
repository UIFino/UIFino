import { Suspense } from "react";
import { notFound } from "next/navigation";
import { LoadingGridSkeleton } from "@/components/patterns/state-views";
import { ComponentWorkbenchView } from "@/features/library/workbench";
import { COMPONENT_CATEGORIES, findComponentAsset } from "@/registry/components";

export function generateStaticParams() {
  return COMPONENT_CATEGORIES.flatMap((cat) =>
    cat.items.map((item) => ({ category: cat.id, slug: item.id }))
  );
}

export default async function ComponentWorkbenchPage({
  params
}: {
  readonly params: Promise<{ category: string; slug: string }>;
}) {
  const { category: categoryId, slug } = await params;
  const found = findComponentAsset(categoryId, slug);
  if (!found) {
    notFound();
  }

  return (
    <Suspense fallback={<LoadingGridSkeleton count={4} />}>
      <ComponentWorkbenchView category={found.category} item={found.item} />
    </Suspense>
  );
}
