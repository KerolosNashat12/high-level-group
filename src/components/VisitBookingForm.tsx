"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, CalendarX2 } from "lucide-react";

type Slot = { time: string; taken: boolean };

export type BookingSnapshot = {
  packageId: number;
  packageName: string;
  areaSqm: number;
  downPct: number;
  installmentMonths: number;
  monthlyInstallment: number;
  totalCost: number;
};

function fmt(n: number, lang: "ar" | "en" = "ar") {
  return Math.round(n).toLocaleString(lang === "en" ? "en-US" : "ar-EG");
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default function VisitBookingForm({
  snapshot,
  onCancel,
  lang = "ar",
}: {
  snapshot: BookingSnapshot;
  onCancel: () => void;
  lang?: "ar" | "en";
}) {
  const isEn = lang === "en";
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
  const canSubmit = Boolean(
    preferredDate && availability?.open && (!needsSlotChoice || preferredTime)
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      phone: data.get("phone"),
      city: data.get("city"),
      preferredDate,
      preferredTime,
      notes: data.get("notes"),
      packageId: snapshot.packageId,
      packageName: snapshot.packageName,
      areaSqm: snapshot.areaSqm,
      downPct: snapshot.downPct,
      installmentMonths: snapshot.installmentMonths,
      monthlyInstallment: Math.round(snapshot.monthlyInstallment),
      totalCost: Math.round(snapshot.totalCost),
    };

    try {
      const res = await fetch("/api/visit-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || (isEn ? "Something went wrong, please try again" : "حدث خطأ، حاول مرة أخرى"));
      }
      setStatus("success");
      form.reset();
      setPreferredDate("");
      setPreferredTime("");
      setAvailability(null);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : isEn ? "Something went wrong, please try again" : "حدث خطأ، حاول مرة أخرى"
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-gold/10 border border-gold/30 p-8 text-center">
        <CheckCircle2 className="mx-auto text-gold mb-3" size={40} />
        <h3 className="text-lg font-bold text-ink">
          {isEn ? "Your request was submitted successfully!" : "تم إرسال طلبك بنجاح!"}
        </h3>
        <p className="text-sm text-ink-soft mt-2">
          {isEn ? (
            <>
              Our team will contact you within 24 hours to confirm your visit for the{" "}
              <span className="font-bold text-gold">{snapshot.packageName}</span> package.
            </>
          ) : (
            <>
              سيتواصل معك فريقنا خلال 24 ساعة لتأكيد موعد المعاينة على باقة{" "}
              <span className="font-bold text-gold">{snapshot.packageName}</span>.
            </>
          )}
        </p>
        <button
          onClick={onCancel}
          className="mt-4 text-sm text-gold underline underline-offset-4"
        >
          {isEn ? "Done" : "تم"}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gold/30 bg-gold/[0.04] p-5 sm:p-7 mt-6">
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <h3 className="font-bold text-ink">{isEn ? "Confirm Your Visit Request" : "تأكيد طلب المعاينة"}</h3>
          <p className="text-xs text-ink-soft mt-1">
            {isEn
              ? "Review your package details, then fill in your information to schedule your visit."
              : "راجع تفاصيل باقتك، ثم أكمل بياناتك لتحديد موعد المعاينة."}
          </p>
        </div>
        <button type="button" onClick={onCancel} className="text-xs text-ink-soft hover:text-ink shrink-0">
          {isEn ? "Cancel" : "إلغاء"}
        </button>
      </div>

      {/* Locked-in package summary — required, can't be removed */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 text-center">
        <div className="rounded-xl bg-white border border-black/10 p-3">
          <div className="text-[10px] text-ink-soft">{isEn ? "Package" : "الباقة"}</div>
          <div className="text-sm font-bold text-gold mt-0.5">{snapshot.packageName}</div>
        </div>
        <div className="rounded-xl bg-white border border-black/10 p-3">
          <div className="text-[10px] text-ink-soft">{isEn ? "Area" : "المساحة"}</div>
          <div className="text-sm font-bold text-ink mt-0.5">
            {fmt(snapshot.areaSqm, lang)} {isEn ? "m²" : "م²"}
          </div>
        </div>
        <div className="rounded-xl bg-white border border-black/10 p-3">
          <div className="text-[10px] text-ink-soft">{isEn ? "Installment Term" : "مدة التقسيط"}</div>
          <div className="text-sm font-bold text-ink mt-0.5">
            {snapshot.installmentMonths} {isEn ? "months" : "شهر"}
          </div>
        </div>
        <div className="rounded-xl bg-white border border-black/10 p-3">
          <div className="text-[10px] text-ink-soft">{isEn ? "Monthly Installment" : "القسط الشهري"}</div>
          <div className="text-sm font-bold text-ink mt-0.5">
            {fmt(snapshot.monthlyInstallment, lang)} {isEn ? "EGP" : "ج.م"}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="name"
          required
          placeholder={isEn ? "Full Name" : "الاسم بالكامل"}
          className="rounded-xl border border-black/10 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none bg-white"
        />
        <input
          name="phone"
          required
          type="tel"
          pattern="^01[0-9]{9}$"
          title={isEn ? "A valid Egyptian mobile number, e.g. 01012345678" : "رقم موبايل مصري صحيح مثال: 01012345678"}
          placeholder={isEn ? "Mobile Number" : "رقم الموبايل"}
          className="rounded-xl border border-black/10 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none bg-white"
        />
        <select
          name="city"
          required
          defaultValue=""
          className="rounded-xl border border-black/10 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none bg-white"
        >
          <option value="" disabled>
            {isEn ? "Governorate" : "المحافظة"}
          </option>
          <option value="القاهرة">{isEn ? "Cairo" : "القاهرة"}</option>
          <option value="الجيزة">{isEn ? "Giza" : "الجيزة"}</option>
        </select>
        <input
          name="preferredDate"
          type="date"
          required
          min={todayStr()}
          value={preferredDate}
          onChange={(e) => setPreferredDate(e.target.value)}
          className="rounded-xl border border-black/10 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none bg-white"
        />

        {preferredDate && (
          <div className="sm:col-span-2">
            {checkingAvailability ? (
              <div className="flex items-center gap-2 text-sm text-ink-soft">
                <Loader2 className="animate-spin" size={16} />
                {isEn ? "Checking available dates..." : "جارِ التحقق من المواعيد المتاحة..."}
              </div>
            ) : availability && !availability.open ? (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 text-red-700 px-4 py-3 text-sm">
                <CalendarX2 size={16} />
                {availability.reason ||
                  (isEn ? "This day is unavailable, please choose another day" : "هذا اليوم غير متاح، الرجاء اختيار يوم آخر")}
              </div>
            ) : needsSlotChoice ? (
              <div>
                <div className="text-xs font-bold text-ink-soft mb-2">
                  {isEn ? "Choose a suitable time" : "اختر الموعد المناسب"}
                </div>
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
                          : "border border-black/10 text-ink-soft hover:border-gold/40 bg-white"
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
          placeholder={isEn ? "Additional notes (optional)" : "ملاحظات إضافية (اختياري)"}
          rows={3}
          className="sm:col-span-2 rounded-xl border border-black/10 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none resize-none bg-white"
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
          {status === "loading"
            ? isEn
              ? "Sending..."
              : "جارِ الإرسال..."
            : isEn
            ? "Confirm Booking & Send Visit Request"
            : "تأكيد الحجز وإرسال طلب المعاينة"}
        </button>
        {!canSubmit && (
          <p className="sm:col-span-2 text-[11px] text-ink-soft/70 text-center">
            {isEn
              ? "You need to choose an available date and time slot to confirm your request."
              : "لازم تختار تاريخ وموعد متاح عشان تقدر تأكد الطلب."}
          </p>
        )}
      </form>
    </div>
  );
}
