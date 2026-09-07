import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { portfolioProjects } from "@/db/schema";

const schema = z.object({
  nameAr: z.string().min(2),
  nameEn: z.string().nullable().optional(),
  category: z.enum(["سكني", "تجاري"]),
  beforeImageUrl: z.string().nullable().optional(),
  afterImageUrl: z.string().nullable().optional(),
  order: z.number().int().optional(),
  published: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "بيانات غير صحيحة" },
      { status: 400 }
    );
  }

  const [created] = await db.insert(portfolioProjects).values(parsed.data).returning();
  return NextResponse.json({ ok: true, project: created });
}
