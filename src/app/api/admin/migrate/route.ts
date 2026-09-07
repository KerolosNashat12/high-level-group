import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/db";

// One-time production migration endpoint: adds the new tables/columns for
// site settings, portfolio management, and the visit-booking availability
// system, then seeds sane defaults. Protected by SETUP_SECRET, idempotent
// (safe to call more than once), and removed via a follow-up commit once run.
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (!process.env.SETUP_SECRET || secret !== process.env.SETUP_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const log: string[] = [];

  const statements = [
    `ALTER TABLE "visit_requests" ADD COLUMN IF NOT EXISTS "preferred_date_str" text`,
    `ALTER TABLE "visit_requests" ADD COLUMN IF NOT EXISTS "preferred_time" text`,
    `CREATE TABLE IF NOT EXISTS "site_settings" (
      "id" integer PRIMARY KEY DEFAULT 1,
      "logo_url" text,
      "whatsapp_number" text DEFAULT '201080146022' NOT NULL,
      "contact_email" text DEFAULT 'Info@highlevel.com' NOT NULL,
      "contact_phone" text DEFAULT '01080146022' NOT NULL,
      "address" text DEFAULT '2116 المعراج العلوى، زهراء المعادى، القاهرة' NOT NULL,
      "facebook_url" text,
      "facebook_enabled" boolean DEFAULT false NOT NULL,
      "instagram_url" text,
      "instagram_enabled" boolean DEFAULT false NOT NULL,
      "tiktok_url" text,
      "tiktok_enabled" boolean DEFAULT false NOT NULL,
      "youtube_url" text,
      "youtube_enabled" boolean DEFAULT false NOT NULL,
      "linkedin_url" text,
      "linkedin_enabled" boolean DEFAULT false NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS "portfolio_projects" (
      "id" serial PRIMARY KEY NOT NULL,
      "name_ar" text NOT NULL,
      "category" text DEFAULT 'سكني' NOT NULL,
      "before_image_url" text,
      "after_image_url" text,
      "order" integer DEFAULT 0 NOT NULL,
      "published" boolean DEFAULT true NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS "weekly_availability" (
      "id" serial PRIMARY KEY NOT NULL,
      "day_of_week" integer NOT NULL,
      "is_open" boolean DEFAULT true NOT NULL,
      "slots" text DEFAULT '' NOT NULL,
      CONSTRAINT "weekly_availability_day_of_week_unique" UNIQUE("day_of_week")
    )`,
    `CREATE TABLE IF NOT EXISTS "blocked_dates" (
      "id" serial PRIMARY KEY NOT NULL,
      "date" text NOT NULL,
      "reason" text,
      "created_at" timestamp DEFAULT now() NOT NULL,
      CONSTRAINT "blocked_dates_date_unique" UNIQUE("date")
    )`,
  ];

  for (const stmt of statements) {
    await db.execute(sql.raw(stmt));
  }
  log.push("schema migrated");

  // Seed default site settings (id=1) if it doesn't exist yet.
  await db.execute(
    sql.raw(`
      INSERT INTO "site_settings" ("id") VALUES (1)
      ON CONFLICT ("id") DO NOTHING
    `)
  );
  log.push("site_settings seeded");

  // Seed default weekly template: Sunday(0)-Thursday(4) open, Friday(5) &
  // Saturday(6) closed, if no rows exist yet at all.
  const existing = await db.execute(sql.raw(`SELECT count(*)::int AS c FROM "weekly_availability"`));
  const existingRows = (Array.isArray(existing) ? existing : (existing as { rows?: unknown[] }).rows ?? []) as { c: number }[];
  const count = existingRows[0]?.c ?? 0;
  if (count === 0) {
    const defaults = [0, 1, 2, 3, 4, 5, 6].map((day) => {
      const isOpen = day !== 5 && day !== 6;
      return `(${day}, ${isOpen}, '${isOpen ? "10:00,12:00,14:00,16:00" : ""}')`;
    });
    await db.execute(
      sql.raw(
        `INSERT INTO "weekly_availability" ("day_of_week", "is_open", "slots") VALUES ${defaults.join(",")}`
      )
    );
    log.push("weekly_availability seeded (Sun-Thu open, Fri-Sat closed)");
  } else {
    log.push("weekly_availability already has rows, skipped");
  }

  return NextResponse.json({ ok: true, log });
}
