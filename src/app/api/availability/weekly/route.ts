import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { weeklyAvailability } from "@/db/schema";

const schema = z.object({
  days: z
    .array(
      z.object({
        dayOfWeek: z.number().int().min(0).max(6),
        isOpen: z.boolean(),
        slots: z.string(),
      })
    )
    .length(7),
});

export async function PATCH(req: NextRequest) {
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

  for (const day of parsed.data.days) {
    await db
      .insert(weeklyAvailability)
      .values(day)
      .onConflictDoUpdate({ target: weeklyAvailability.dayOfWeek, set: { isOpen: day.isOpen, slots: day.slots } });
  }

  return NextResponse.json({ ok: true });
}
