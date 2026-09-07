import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { packageFeatures } from "@/db/schema";

const schema = z.object({
  label: z.string().min(1).optional(),
  labelEn: z.string().optional().nullable(),
  order: z.number().int().optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: { featureId: string } }) {
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

  const id = Number(params.featureId);
  await db.update(packageFeatures).set(parsed.data).where(eq(packageFeatures.id, id));

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: { featureId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const id = Number(params.featureId);
  await db.delete(packageFeatures).where(eq(packageFeatures.id, id));

  return NextResponse.json({ ok: true });
}
