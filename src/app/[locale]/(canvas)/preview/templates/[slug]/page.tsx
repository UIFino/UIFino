import { notFound } from "next/navigation";
import { findTemplateById, TemplatePreviewFrame } from "@/registry/templates";

export default async function IsolatedTemplatePreviewPage({
  params
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = findTemplateById(slug);
  if (!template) {
    notFound();
  }

  return (
    <div className="min-h-dvh p-6" style={{ backgroundColor: template.canvas }}>
      <TemplatePreviewFrame template={template} />
    </div>
  );
}
