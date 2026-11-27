import { notFound } from "next/navigation";
import { StyleDetailView } from "@/features/styles/style-detail";
import { findUiStyleBySlug, STYLE_ITEMS } from "@/registry/styles";

export function generateStaticParams() {
  return STYLE_ITEMS.map((item) => ({ slug: item.slug }));
}

export default async function StyleDetailPage({
  params
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = findUiStyleBySlug(slug);
  if (!item) {
    notFound();
  }

  return <StyleDetailView item={item} />;
}
