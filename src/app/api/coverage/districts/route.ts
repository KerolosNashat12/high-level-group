import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { districts } from "@/db/schema";

const schema = z.object({
  governorateId: z.number(),
  nameAr: z.string().min(1),
  order: z.number().int().optional(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "بيانات غير صحيحة" }, { status: 400 });
  }

  const [created] = await db
    .insert(districts)
    .values({
      governorateId: parsed.data.governorateId,
      nameAr: parsed.data.nameAr,
      order: parsed.data.order ?? 0,
    })
    .returning();

  return NextResponse.json({ ok: true, district: created });
}
