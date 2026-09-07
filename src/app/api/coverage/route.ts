import { NextResponse } from "next/server";
import { getGovernoratesWithDistricts } from "@/lib/data";

// Public — feeds the booking form's governorate/district selects with only
// what the admin has enabled. Must stay dynamic — otherwise Next.js
// prerenders this route at build time (it takes no params, so its static
// analysis treats it as cacheable) and every visitor gets whatever the DB
// looked like during the build instead of live enable/disable state.
export const dynamic = "force-dynamic";

export async function GET() {
  const governorates = await getGovernoratesWithDistricts(true);
  return NextResponse.json({ governorates });
}
