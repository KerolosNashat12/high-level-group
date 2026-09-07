"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, CalendarX2 } from "lucide-react";

type PackageOption = { id: number; nameAr: string };
type Slot = { time: string; taken: boolean };

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default function VisitRequestForm({
  packages,
  defaultPackageId,
}: {
  packages: PackageOption[];
  defaultPackageId?: number;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [availability, setAvailability] = useState<{
    open: boolean;
    reason: string | null;
    slots: Slot[];
  } | null>(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  useEffect(() => {
    if (!preferredDate) {
      setAvailability(null);
      return;
    }
    let cancelled = false;
    setCheckingAvailability(true);
    setPreferredTime("");
    fetch(`/api/availability?date=${preferredDate}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setAvailability(data);
      })
      .catch(() => {
        if (!cancelled) setAvailability(null);
      })
      .finally(() => {
        if (!cancelled) setCheckingAvailability(false);
      });
    return () => {
      cancelled = true;
    };
  }, [preferredDate]);

  const needsSlotChoice = Boolean(availability?.open && availability.slots.length > 0);
  const canSubmit = !preferredDate || (availability?.open && (!needsSlotChoice || preferredTime));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      phone: data.get("phone"),
      city: data.get("city"),
      area: data.get("area"),
      propertyType: data.get("propertyType"),
      packageId: data.get("packageId") ? Number(data.get("packageId")) : null,
      preferredDate: preferredDate || null,
      preferredTime: preferredTime || null,
      notes: data.get("notes"),
    };

    try {
      const res = await fetch("/api/visit-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "حدث خطأ، حاول مرة أخرى");
      }
      setStatus("success");
      form.reset();
      setPreferredDate("");
      setPreferredTime("");
      setAvailability(null);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "حدث خطأ، حاول مرة أخرى");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-gold/10 border border-gold/30 p-8 text-center">
        <CheckCircle2 className="mx-auto text-gold mb-3" size={40} />
        <h3 className="text-lg font-bold text-ink">تم إرسال طلبك بنجاح!</h3>
        <p className="text-sm text-ink-soft mt-2">
          سيتواصل معك فريقنا خلال 24 ساعة لتحديد موعد المعاينة.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-gold underline underline-offset-4"
        >
          إرسال طلب آخر
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2">
        <h3 className="text-xl font-bold text-ink">اطلب معاينة مجانية</h3>
        <p className="text-sm text-ink-soft mt-1">
          فريقنا الهندسي هيتواصل معاك لتحديد ميعاد معاينة مناسب لبيتك.
        </p>
      </div>

      <input
        name="name"
        required
        placeholder="الاسم بالكامل"
        className="rounded-xl border border-black/10 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none"
      />
      <div className="flex gap-2">
        <select
          name="countryCode"
          defaultValue="+20"
          className="rounded-xl border border-black/10 px-2 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none"
        >
          <option value="+20">🇪🇬 +20</option>
          <option value="+966">🇸🇦 +966</option>
          <option value="+971">🇦🇪 +971</option>
          <option value="+965">🇰🇼 +965</option>
          <option value="+974">🇶🇦 +974</option>
          <option value="+973">🇧🇭 +973</option>
          <option value="+968">🇴🇲 +968</option>
          <option value="+218">🇱🇾 +218</option>
        </select>
        <input
          name="phone"
          required
          type="tel"
          pattern="^01[0-9]{9}$"
          title="رقم موبايل مصري صحيح مثال: 01012345678"
          placeholder="رقم الموبايل"
          className="flex-1 rounded-xl border border-black/10 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none"
        />
      </div>
      <select
        name="city"
        required
        defaultValue=""
        className="rounded-xl border border-black/10 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none"
      >
        <option value="" disabled>
          المحافظة
        </option>
        <option value="القاهرة">القاهرة</option>
        <option value="الجيزة">الجيزة</option>
      </select>
      <input
        name="area"
        placeholder="المنطقة (اختياري)"
        className="rounded-xl border border-black/10 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none"
      />
      <select
        name="propertyType"
        defaultValue=""
        className="rounded-xl border border-black/10 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none"
      >
        <option value="">نوع العقار</option>
        <option value="شقة">شقة</option>
        <option value="فيلا">فيلا</option>
        <option value="دوبلكس">دوبلكس</option>
      </select>
      <select
        name="packageId"
        defaultValue={defaultPackageId ?? ""}
        className="rounded-xl border border-black/10 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none"
      >
        <option value="">الباقة المهتم بها (اختياري)</option>
        {packages.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nameAr}
          </option>
        ))}
      </select>
      <input
        name="preferredDate"
        type="date"
        min={todayStr()}
        value={preferredDate}
        onChange={(e) => setPreferredDate(e.target.value)}
        className="rounded-xl border border-black/10 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none"
      />

      {preferredDate && (
        <div className="sm:col-span-2">
          {checkingAvailability ? (
            <div className="flex items-center gap-2 text-sm text-ink-soft">
              <Loader2 className="animate-spin" size={16} /> جارِ التحقق من المواعيد المتاحة...
            </div>
          ) : availability && !availability.open ? (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 text-red-700 px-4 py-3 text-sm">
              <CalendarX2 size={16} />
              {availability.reason || "هذا اليوم غير متاح، الرجاء اختيار يوم آخر"}
            </div>
          ) : needsSlotChoice ? (
            <div>
              <div className="text-xs font-bold text-ink-soft mb-2">اختر الموعد المناسب</div>
              <div className="flex flex-wrap gap-2">
                {availability!.slots.map((s) => (
                  <button
                    key={s.time}
                    type="button"
                    disabled={s.taken}
                    onClick={() => setPreferredTime(s.time)}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      s.taken
                        ? "cursor-not-allowed border border-black/5 text-ink-soft/40 line-through"
                        : preferredTime === s.time
                        ? "bg-gold-gradient text-white"
                        : "border border-black/10 text-ink-soft hover:border-gold/40"
                    }`}
                  >
                    {s.time}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}

      <textarea
        name="notes"
        placeholder="ملاحظات إضافية (اختياري)"
        rows={3}
        className="sm:col-span-2 rounded-xl border border-black/10 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none resize-none"
      />

      {status === "error" && (
        <p className="sm:col-span-2 text-sm text-red-600">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !canSubmit}
        className="sm:col-span-2 rounded-xl bg-gold-gradient text-white font-bold py-3.5 flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60"
      >
        {status === "loading" && <Loader2 className="animate-spin" size={18} />}
        {status === "loading" ? "جارِ الإرسال..." : "إرسال طلب المعاينة"}
      </button>
    </form>
  );
}
