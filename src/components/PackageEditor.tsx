"use client";

import { useState } from "react";
import { Save, Loader2, CheckCircle2 } from "lucide-react";

type Pkg = {
  id: number;
  nameAr: string;
  nameEn: string;
  tagline: string | null;
  pricePerMeter: number;
  downPaymentPct: number;
  installmentMonths: number;
  color: string;
  featured: boolean;
};

export default function PackageEditor({ pkg }: { pkg: Pkg }) {
  const [form, setForm] = useState(pkg);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  function update<K extends keyof Pkg>(key: K, value: Pkg[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setStatus("idle");
  }

  async function handleSave() {
    setStatus("saving");
    try {
      const res = await fetch(`/api/packages/${pkg.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameAr: form.nameAr,
          tagline: form.tagline,
          pricePerMeter: Number(form.pricePerMeter),
          downPaymentPct: Number(form.downPaymentPct),
          installmentMonths: Number(form.installmentMonths),
          featured: form.featured,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-black/5 p-6">
      <div className="flex items-center justify-between mb-4">
        <input
          value={form.nameAr}
          onChange={(e) => update("nameAr", e.target.value)}
          className="font-bold text-lg text-ink border-b border-transparent hover:border-black/10 focus:border-gold outline-none bg-transparent"
          style={{ color: form.color }}
        />
        <label className="flex items-center gap-2 text-xs text-ink-soft">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => update("featured", e.target.checked)}
          />
          الأكثر طلبًا
        </label>
      </div>

      <input
        value={form.tagline ?? ""}
        onChange={(e) => update("tagline", e.target.value)}
        placeholder="وصف مختصر"
        className="w-full text-sm text-ink-soft mb-4 border-b border-transparent hover:border-black/10 focus:border-gold outline-none bg-transparent"
      />

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-ink-soft">السعر / متر (جنيه)</label>
          <input
            type="number"
            value={form.pricePerMeter}
            onChange={(e) => update("pricePerMeter", Number(e.target.value) as never)}
            className="w-full mt-1 rounded-lg border border-black/10 px-3 py-2 text-sm focus:border-gold outline-none"
          />
        </div>
        <div>
          <label className="text-xs text-ink-soft">المقدم (%)</label>
          <input
            type="number"
            value={form.downPaymentPct}
            onChange={(e) => update("downPaymentPct", Number(e.target.value) as never)}
            className="w-full mt-1 rounded-lg border border-black/10 px-3 py-2 text-sm focus:border-gold outline-none"
          />
        </div>
        <div>
          <label className="text-xs text-ink-soft">مدة التقسيط (شهر)</label>
          <input
            type="number"
            value={form.installmentMonths}
            onChange={(e) => update("installmentMonths", Number(e.target.value) as never)}
            className="w-full mt-1 rounded-lg border border-black/10 px-3 py-2 text-sm focus:border-gold outline-none"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={status === "saving"}
        className="mt-5 flex items-center gap-2 rounded-xl bg-gold-gradient text-white text-sm font-bold px-5 py-2.5 disabled:opacity-60"
      >
        {status === "saving" && <Loader2 className="animate-spin" size={16} />}
        {status === "saved" && <CheckCircle2 size={16} />}
        {status === "idle" && <Save size={16} />}
        {status === "saving" ? "جارِ الحفظ..." : status === "saved" ? "تم الحفظ" : "حفظ التغييرات"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600 mt-2">حدث خطأ أثناء الحفظ، حاول مرة أخرى.</p>
      )}
    </div>
  );
}
