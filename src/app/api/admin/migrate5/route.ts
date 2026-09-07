import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/db";

// TEMPORARY idempotent migration — adds the optional apartment media columns
// to visit_requests. Remove this route once run successfully in production.
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.SETUP_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    await db.execute(
      sql.raw(`
        ALTER TABLE visit_requests ADD COLUMN IF NOT EXISTS media_type TEXT;
        ALTER TABLE visit_requests ADD COLUMN IF NOT EXISTS media_urls JSONB;
      `)
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[migrate5] error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "unknown error" },
      { status: 500 }
    );
  }
}
