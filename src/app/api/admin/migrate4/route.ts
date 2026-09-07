import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/db";
import { governorates, districts } from "@/db/schema";
import { EGYPT_LOCATIONS } from "@/lib/egypt-locations";

// TEMPORARY idempotent migration — creates the governorates/districts tables,
// adds visit_requests.district, and seeds all 27 Egyptian governorates plus
// their districts/areas. Remove this route once run successfully in
// production.
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.SETUP_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    await db.execute(
      sql.raw(`
        CREATE TABLE IF NOT EXISTS governorates (
          id SERIAL PRIMARY KEY,
          name_ar TEXT NOT NULL UNIQUE,
          name_en TEXT,
          enabled BOOLEAN NOT NULL DEFAULT true,
          "order" INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS districts (
          id SERIAL PRIMARY KEY,
          governorate_id INTEGER NOT NULL REFERENCES governorates(id) ON DELETE CASCADE,
          name_ar TEXT NOT NULL,
          name_en TEXT,
          enabled BOOLEAN NOT NULL DEFAULT true,
          "order" INTEGER NOT NULL DEFAULT 0
        );

        ALTER TABLE visit_requests ADD COLUMN IF NOT EXISTS district TEXT;
      `)
    );

    let govCount = 0;
    let distCount = 0;

    for (let i = 0; i < EGYPT_LOCATIONS.length; i++) {
      const g = EGYPT_LOCATIONS[i];
      const [row] = await db
        .insert(governorates)
        .values({ nameAr: g.nameAr, nameEn: g.nameEn, order: i })
        .onConflictDoNothing({ target: governorates.nameAr })
        .returning();

      let govId = row?.id;
      if (!govId) {
        const existing = await db.execute(
          sql`SELECT id FROM governorates WHERE name_ar = ${g.nameAr} LIMIT 1`
        );
        govId = (existing as unknown as { id: number }[])[0]?.id;
      } else {
        govCount++;
      }
      if (!govId) continue;

      for (let j = 0; j < g.districts.length; j++) {
        const d = g.districts[j];
        const existingDist = await db.execute(
          sql`SELECT id FROM districts WHERE governorate_id = ${govId} AND name_ar = ${d.nameAr} LIMIT 1`
        );
        if ((existingDist as unknown as unknown[]).length > 0) continue;

        await db.insert(districts).values({
          governorateId: govId,
          nameAr: d.nameAr,
          nameEn: d.nameEn,
          order: j,
        });
        distCount++;
      }
    }

    return NextResponse.json({
      ok: true,
      governoratesInserted: govCount,
      districtsInserted: distCount,
    });
  } catch (err) {
    console.error("[migrate4] error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "unknown error" },
      { status: 500 }
    );
  }
}
