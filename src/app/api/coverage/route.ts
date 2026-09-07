import { NextResponse } from "next/server";
import { getGovernoratesWithDistricts } from "@/lib/data";

// Public — feeds the booking form's governorate/district selects with only
// what the admin has enabled.
export async function GET() {
  const governorates = await getGovernoratesWithDistricts(true);
  return NextResponse.json({ governorates });
}
