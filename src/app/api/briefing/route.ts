import { NextResponse } from "next/server";
import { buildMockBriefing } from "@/core/briefing";

export async function GET() {
  return NextResponse.json(buildMockBriefing());
}
