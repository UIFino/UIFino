import { notFound } from "next/navigation";
import { TemplateDetailView } from "@/features/templates/template-detail";
import { findTemplateById, TEMPLATE_ITEMS } from "@/registry/templates";

export function generateStaticParams() {
  return TEMPLATE_ITEMS.map((tpl) => ({ slug: tpl.id }));
}

export default async function TemplateDetailPage({
  params
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = findTemplateById(slug);
  if (!template) {
    notFound();
  }

  return <TemplateDetailView template={template} />;
}
