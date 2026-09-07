import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { visitRequests } from "@/db/schema";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const body = await req.json();
  const status = body.status as string;
  const allowed = ["new", "contacted", "scheduled", "done", "cancelled"];
  if (!allowed.includes(status)) {
    return NextResponse.json({ error: "حالة غير صحيحة" }, { status: 400 });
  }

  const id = Number(params.id);
  await db
    .update(visitRequests)
    .set({ status, updatedAt: new Date() })
    .where(eq(visitRequests.id, id));

  return NextResponse.json({ ok: true });
}
