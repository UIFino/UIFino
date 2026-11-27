import { notFound } from "next/navigation";
import type { ThemeMode } from "@/core/tokens";
import { findTemplateById } from "@/registry/templates";
import { IsolatedTemplateCanvas } from "./canvas";

export default async function IsolatedTemplatePreviewPage({
  params,
  searchParams
}: {
  readonly params: Promise<{ locale: string; slug: string }>;
  readonly searchParams: Promise<{ route?: string; mode?: string }>;
}) {
  const { locale, slug } = await params;
  const sp = await searchParams;
  const template = findTemplateById(slug);
  if (!template) {
    notFound();
  }

  const mode: ThemeMode = sp.mode === "light" ? "light" : "dark";
  return (
    <IsolatedTemplateCanvas
      template={template}
      initialRoute={sp.route}
      initialMode={mode}
      isZh={locale === "zh"}
    />
  );
}
