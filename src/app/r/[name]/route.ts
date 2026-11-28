import { NextResponse } from "next/server";
import { buildShadcnRegistryItem } from "@/core/ai-delivery";

export async function GET(
  _request: Request,
  context: { readonly params: Promise<{ name: string }> }
) {
  const { name } = await context.params;
  const item = buildShadcnRegistryItem(name);

  if (!item) {
    return NextResponse.json(
      { error: `Registry item "${name}" not found. Inspect /r/registry.json for valid entries.` },
      { status: 404, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }

  return NextResponse.json(item, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=60"
    }
  });
}
