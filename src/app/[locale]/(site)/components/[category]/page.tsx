import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageBanner } from "@/components/patterns/page-banner";
import { LibraryCategoryView } from "@/features/library/category";
import { COMPONENT_CATEGORIES, findComponentCategoryById } from "@/registry/components";

export function generateStaticParams() {
  return COMPONENT_CATEGORIES.map((cat) => ({ category: cat.id }));
}

export default async function ComponentsCategoryPage({
  params
}: {
  readonly params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category: categoryId } = await params;
  const category = findComponentCategoryById(categoryId);
  if (!category) {
    notFound();
  }

  const tCommon = await getTranslations("common");
  const isZh = locale === "zh";

  return (
    <div>
      <PageBanner
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: tCommon("navComponents"), href: "/components" },
          { label: isZh ? category.nameZh : category.name }
        ]}
        title={isZh ? category.nameZh : category.name}
        description={isZh ? category.descZh : category.descEn}
      />
      <LibraryCategoryView category={category} />
    </div>
  );
}
