import { notFound } from "next/navigation";
import { CatalogDetailView } from "@/features/catalog/catalog-detail";
import { CATALOG_ITEMS, findCatalogBrandById } from "@/registry/catalog";

export function generateStaticParams() {
  return CATALOG_ITEMS.map((item) => ({ slug: item.id }));
}

export default async function CatalogDetailPage({
  params
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = findCatalogBrandById(slug);
  if (!item) {
    notFound();
  }

  return <CatalogDetailView item={item} />;
}
