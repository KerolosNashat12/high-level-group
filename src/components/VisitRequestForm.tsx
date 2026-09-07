"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

type PackageOption = { id: number; nameAr: string };

export default function VisitRequestForm({
  packages,
  defaultPackageId,
}: {
  packages: PackageOption[];
  defaultPackageId?: number;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

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
      preferredDate: data.get("preferredDate") || null,
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
        className="rounded-xl border border-black/10 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none"
      />
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
        disabled={status === "loading"}
        className="sm:col-span-2 rounded-xl bg-gold-gradient text-white font-bold py-3.5 flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60"
      >
        {status === "loading" && <Loader2 className="animate-spin" size={18} />}
        {status === "loading" ? "جارِ الإرسال..." : "إرسال طلب المعاينة"}
      </button>
    </form>
  );
}
