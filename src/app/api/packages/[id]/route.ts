import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { packages } from "@/db/schema";

const schema = z.object({
  nameAr: z.string().min(2).optional(),
  nameEn: z.string().min(2).optional(),
  tagline: z.string().optional().nullable(),
  taglineEn: z.string().optional().nullable(),
  pricePerMeter: z.number().int().positive().optional(),
  downPaymentPct: z.number().int().min(0).max(100).optional(),
  installmentMonths: z.number().int().positive().optional(),
  color: z.string().optional(),
  featured: z.boolean().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

  const id = Number(params.id);
  await db
    .update(packages)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(packages.id, id));

  return NextResponse.json({ ok: true });
}
