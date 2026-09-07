"use client";

import { useState } from "react";
import { Save, Loader2, CheckCircle2, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

type Feature = { id: number; label: string; order: number };

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
  features: Feature[];
};

function FeatureRow({
  feature,
  onChanged,
  onDeleted,
  onMove,
  isFirst,
  isLast,
}: {
  feature: Feature;
  onChanged: (id: number, label: string) => void;
  onDeleted: (id: number) => void;
  onMove: (id: number, dir: "up" | "down") => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [label, setLabel] = useState(feature.label);
  const [saving, setSaving] = useState(false);

  async function commit() {
    if (label === feature.label) return;
    setSaving(true);
    try {
      await fetch(`/api/packages/features/${feature.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label }),
      });
      onChanged(feature.id, label);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex flex-col">
        <button
          type="button"
          disabled={isFirst}
          onClick={() => onMove(feature.id, "up")}
          className="text-ink-soft/50 hover:text-gold disabled:opacity-20"
        >
          <ArrowUp size={12} />
        </button>
        <button
          type="button"
          disabled={isLast}
          onClick={() => onMove(feature.id, "down")}
          className="text-ink-soft/50 hover:text-gold disabled:opacity-20"
        >
          <ArrowDown size={12} />
        </button>
      </div>
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        onBlur={commit}
        className="flex-1 rounded-lg border border-black/10 px-2.5 py-1.5 text-xs focus:border-gold outline-none"
      />
      {saving && <Loader2 className="animate-spin text-gold shrink-0" size={14} />}
      <button
        type="button"
        onClick={() => onDeleted(feature.id)}
        className="text-red-400 hover:text-red-600 shrink-0"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

export default function PackageEditor({ pkg }: { pkg: Pkg }) {
  const [form, setForm] = useState(pkg);
  const [features, setFeatures] = useState(
    [...pkg.features].sort((a, b) => a.order - b.order)
  );
  const [newFeature, setNewFeature] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [addingFeature, setAddingFeature] = useState(false);

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

  async function addFeature() {
    if (!newFeature.trim()) return;
    setAddingFeature(true);
    try {
      const res = await fetch(`/api/packages/${pkg.id}/features`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: newFeature.trim(), order: features.length }),
      });
      if (!res.ok) throw new Error();
      const { feature } = await res.json();
      setFeatures((f) => [...f, feature]);
      setNewFeature("");
    } catch {
      alert("تعذّرت إضافة البند، حاول مرة أخرى");
    } finally {
      setAddingFeature(false);
    }
  }

  async function deleteFeature(id: number) {
    setFeatures((f) => f.filter((x) => x.id !== id));
    await fetch(`/api/packages/features/${id}`, { method: "DELETE" });
  }

  function changeFeatureLabel(id: number, label: string) {
    setFeatures((f) => f.map((x) => (x.id === id ? { ...x, label } : x)));
  }

  async function moveFeature(id: number, dir: "up" | "down") {
    const idx = features.findIndex((f) => f.id === id);
    const swapWith = dir === "up" ? idx - 1 : idx + 1;
    if (swapWith < 0 || swapWith >= features.length) return;

    const reordered = [...features];
    [reordered[idx], reordered[swapWith]] = [reordered[swapWith], reordered[idx]];
    setFeatures(reordered);

    await Promise.all(
      reordered.map((f, i) =>
        fetch(`/api/packages/features/${f.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: i }),
        })
      )
    );
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

      <div className="mt-6 border-t border-black/5 pt-5">
        <h4 className="text-xs font-bold text-ink-soft mb-3">بنود الباقة (تظهر كنقاط تحت السعر)</h4>
        <div className="space-y-2">
          {features.map((f, i) => (
            <FeatureRow
              key={f.id}
              feature={f}
              onChanged={changeFeatureLabel}
              onDeleted={deleteFeature}
              onMove={moveFeature}
              isFirst={i === 0}
              isLast={i === features.length - 1}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addFeature()}
            placeholder="بند جديد..."
            className="flex-1 rounded-lg border border-black/10 px-2.5 py-1.5 text-xs focus:border-gold outline-none"
          />
          <button
            type="button"
            onClick={addFeature}
            disabled={addingFeature}
            className="flex items-center gap-1 rounded-lg bg-gold/10 text-gold text-xs font-bold px-3 py-1.5 disabled:opacity-60"
          >
            {addingFeature ? <Loader2 className="animate-spin" size={12} /> : <Plus size={12} />}
            إضافة
          </button>
        </div>
      </div>
    </div>
  );
}
