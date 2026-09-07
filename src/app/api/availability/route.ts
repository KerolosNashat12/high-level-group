import { NextRequest, NextResponse } from "next/server";
import { getAvailabilityForDate } from "@/lib/data";

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "التاريخ مطلوب" }, { status: 400 });
  }
  const result = await getAvailabilityForDate(date);
  return NextResponse.json(result);
}
