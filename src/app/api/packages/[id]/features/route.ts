import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { packageFeatures } from "@/db/schema";

const schema = z.object({
  label: z.string().min(1),
  labelEn: z.string().optional().nullable(),
  order: z.number().int().optional(),
});

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
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

  const packageId = Number(params.id);
  const [created] = await db
    .insert(packageFeatures)
    .values({
      packageId,
      label: parsed.data.label,
      labelEn: parsed.data.labelEn || null,
      order: parsed.data.order ?? 0,
    })
    .returning();

  return NextResponse.json({ ok: true, feature: created });
}
