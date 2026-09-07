import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { visitRequests } from "@/db/schema";
import { notifyNewVisitRequest } from "@/lib/email";
import { getAvailabilityForDate } from "@/lib/data";

// A visit request can now ONLY be created from the installment calculator's
// booking flow, so the full package snapshot is required — no request can be
// submitted without it.
const schema = z.object({
  name: z.string().min(2, "الاسم قصير جدًا"),
  phone: z.string().regex(/^01[0-9]{9}$/, "رقم موبايل غير صحيح"),
  city: z.string().min(2, "اختر المحافظة"),
  preferredDate: z.string().min(1, "اختر تاريخ المعاينة"),
  preferredTime: z.string().min(1, "اختر موعد المعاينة"),
  notes: z.string().optional().nullable(),
  packageId: z.number({ error: "اختر باقة" }),
  packageName: z.string().min(1, "اختر باقة"),
  areaSqm: z.number().positive("مساحة غير صحيحة"),
  downPct: z.number().min(0).max(100),
  installmentMonths: z.number().positive(),
  monthlyInstallment: z.number().nonnegative(),
  totalCost: z.number().nonnegative(),
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
    const availability = await getAvailabilityForDate(data.preferredDate);
    if (!availability.open) {
      return NextResponse.json(
        { error: availability.reason || "هذا اليوم غير متاح، اختر يوم آخر" },
        { status: 409 }
      );
    }
    if (availability.slots.length > 0) {
      const slot = availability.slots.find((s) => s.time === data.preferredTime);
      if (!slot || slot.taken) {
        return NextResponse.json(
          { error: "هذا الموعد تم حجزه للتو، اختر موعدًا آخر" },
          { status: 409 }
        );
      }
    }

    const [created] = await db
      .insert(visitRequests)
      .values({
        name: data.name,
        phone: data.phone,
        city: data.city,
        packageId: data.packageId,
        packageNameSnapshot: data.packageName,
        areaSqm: Math.round(data.areaSqm),
        downPct: Math.round(data.downPct),
        installmentMonths: Math.round(data.installmentMonths),
        monthlyInstallment: Math.round(data.monthlyInstallment),
        totalCost: Math.round(data.totalCost),
        preferredDate: new Date(data.preferredDate),
        preferredDateStr: data.preferredDate,
        preferredTime: data.preferredTime,
        notes: data.notes || null,
      })
      .returning();

    await notifyNewVisitRequest({
      name: data.name,
      phone: data.phone,
      city: data.city,
      packageName: data.packageName,
      areaSqm: data.areaSqm,
      downPct: data.downPct,
      installmentMonths: data.installmentMonths,
      monthlyInstallment: data.monthlyInstallment,
      totalCost: data.totalCost,
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
