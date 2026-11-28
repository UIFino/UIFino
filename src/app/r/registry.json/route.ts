import { NextResponse } from "next/server";
import { buildShadcnRegistryIndex } from "@/core/ai-delivery";

export async function GET() {
  return NextResponse.json(buildShadcnRegistryIndex(), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=60"
    }
  });
}
