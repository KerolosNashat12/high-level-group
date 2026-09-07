import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/db";

// One-time production migration endpoint (round 2): adds the visit-booking
// snapshot columns, the new site-settings content fields (hero/about/hours/
// map/SEO, AR+EN), a portfolio English-name column, and drops the retired
// contact_messages table. Protected by SETUP_SECRET, idempotent, and removed
// via a follow-up commit once confirmed.
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (!process.env.SETUP_SECRET || secret !== process.env.SETUP_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const log: string[] = [];

  const statements = [
    `ALTER TABLE "visit_requests" ADD COLUMN IF NOT EXISTS "package_name_snapshot" text`,
    `ALTER TABLE "visit_requests" ADD COLUMN IF NOT EXISTS "area_sqm" integer`,
    `ALTER TABLE "visit_requests" ADD COLUMN IF NOT EXISTS "down_pct" integer`,
    `ALTER TABLE "visit_requests" ADD COLUMN IF NOT EXISTS "installment_months" integer`,
    `ALTER TABLE "visit_requests" ADD COLUMN IF NOT EXISTS "monthly_installment" integer`,
    `ALTER TABLE "visit_requests" ADD COLUMN IF NOT EXISTS "total_cost" integer`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "hero_title_ar" text`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "hero_title_en" text`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "hero_subtitle_ar" text`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "hero_subtitle_en" text`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "about_text_ar" text`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "about_text_en" text`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "working_hours_ar" text`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "working_hours_en" text`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "map_url" text`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "seo_title_ar" text`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "seo_title_en" text`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "seo_description_ar" text`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "seo_description_en" text`,
    `ALTER TABLE "portfolio_projects" ADD COLUMN IF NOT EXISTS "name_en" text`,
    `DROP TABLE IF EXISTS "contact_messages"`,
  ];

  try {
    for (const stmt of statements) {
      await db.execute(sql.raw(stmt));
      log.push(`OK: ${stmt.slice(0, 70)}...`);
    }
    return NextResponse.json({ ok: true, log });
  } catch (err) {
    console.error("[migrate2] error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "unknown error", log },
      { status: 500 }
    );
  }
}
