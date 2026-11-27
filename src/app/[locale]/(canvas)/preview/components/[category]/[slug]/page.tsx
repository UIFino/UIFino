import { notFound } from "next/navigation";
import { resolveWorkbenchTokens } from "@/core/tokens";
import { CATALOG_ITEMS } from "@/registry/catalog";
import { AssetStage, findComponentAsset } from "@/registry/components";

export default async function IsolatedComponentPreviewPage({
  params,
  searchParams
}: {
  readonly params: Promise<{ category: string; slug: string }>;
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { category: categoryId, slug } = await params;
  const query = await searchParams;
  const found = findComponentAsset(categoryId, slug);
  if (!found) {
    notFound();
  }

  const tokens = resolveWorkbenchTokens({
    radius: query.radius ? Number(query.radius) : 4,
    density: typeof query.density === "string" ? query.density : "default",
    skinId: typeof query.skin === "string" ? query.skin : "linear",
    mode: typeof query.mode === "string" ? query.mode : "dark",
    brands: CATALOG_ITEMS
  });

  return (
    <div className="min-h-dvh" style={{ backgroundColor: tokens.canvas }}>
      <AssetStage item={found.item} tokens={tokens} viewport="desktop" />
    </div>
  );
}
