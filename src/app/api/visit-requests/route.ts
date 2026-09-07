import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { visitRequests, packages } from "@/db/schema";
import { notifyNewVisitRequest } from "@/lib/email";
import { getAvailabilityForDate } from "@/lib/data";

const schema = z.object({
  name: z.string().min(2, "الاسم قصير جدًا"),
  phone: z.string().regex(/^01[0-9]{9}$/, "رقم موبايل غير صحيح"),
  city: z.string().min(2, "اختر المحافظة"),
  area: z.string().optional().nullable(),
  propertyType: z.string().optional().nullable(),
  packageId: z.number().nullable().optional(),
  preferredDate: z.string().optional().nullable(),
  preferredTime: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "بيانات غير صحيحة" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Re-validate the requested slot server-side — the client already filters
    // this, but a second visitor could have taken it (or an admin could have
    // just closed the day) between page-load and submit.
    if (data.preferredDate) {
      const availability = await getAvailabilityForDate(data.preferredDate);
      if (!availability.open) {
        return NextResponse.json(
          { error: availability.reason || "هذا اليوم غير متاح، اختر يوم آخر" },
          { status: 409 }
        );
      }
      if (data.preferredTime && availability.slots.length > 0) {
        const slot = availability.slots.find((s) => s.time === data.preferredTime);
        if (!slot || slot.taken) {
          return NextResponse.json(
            { error: "هذا الموعد تم حجزه للتو، اختر موعدًا آخر" },
            { status: 409 }
          );
        }
      }
    }

    const [created] = await db
      .insert(visitRequests)
      .values({
        name: data.name,
        phone: data.phone,
        city: data.city,
        area: data.area || null,
        propertyType: data.propertyType || null,
        packageId: data.packageId || null,
        preferredDate: data.preferredDate ? new Date(data.preferredDate) : null,
        preferredDateStr: data.preferredDate || null,
        preferredTime: data.preferredTime || null,
        notes: data.notes || null,
      })
      .returning();

    let packageName: string | null = null;
    if (data.packageId) {
      const [pkg] = await db
        .select()
        .from(packages)
        .where(eq(packages.id, data.packageId))
        .limit(1);
      packageName = pkg?.nameAr ?? null;
    }

    await notifyNewVisitRequest({
      name: data.name,
      phone: data.phone,
      city: data.city,
      area: data.area,
      packageName,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      notes: data.notes,
    });

    return NextResponse.json({ ok: true, id: created.id }, { status: 201 });
  } catch (err) {
    console.error("[visit-requests] error:", err);
    return NextResponse.json({ error: "حدث خطأ في الخادم" }, { status: 500 });
  }
}
