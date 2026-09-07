import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { governorates } from "@/db/schema";

const schema = z.object({
  enabled: z.boolean(),
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
  await db.update(governorates).set({ enabled: parsed.data.enabled }).where(eq(governorates.id, id));

  return NextResponse.json({ ok: true });
}
