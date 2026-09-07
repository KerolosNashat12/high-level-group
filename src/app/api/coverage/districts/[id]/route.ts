import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { districts } from "@/db/schema";

const schema = z.object({
  enabled: z.boolean().optional(),
  nameAr: z.string().min(1).optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "بيانات غير صحيحة" }, { status: 400 });
  }

  const id = Number(params.id);
  await db.update(districts).set(parsed.data).where(eq(districts.id, id));

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const id = Number(params.id);
  await db.delete(districts).where(eq(districts.id, id));

  return NextResponse.json({ ok: true });
}
