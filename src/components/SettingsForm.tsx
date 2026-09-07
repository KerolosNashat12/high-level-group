"use client";

import { useState } from "react";
import { Save, Loader2, CheckCircle2 } from "lucide-react";
import ImageUploadField from "@/components/ImageUploadField";

type Settings = {
  logoUrl: string | null;
  whatsappNumber: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  facebookUrl: string | null;
  facebookEnabled: boolean;
  instagramUrl: string | null;
  instagramEnabled: boolean;
  tiktokUrl: string | null;
  tiktokEnabled: boolean;
  youtubeUrl: string | null;
  youtubeEnabled: boolean;
  linkedinUrl: string | null;
  linkedinEnabled: boolean;
};

const SOCIALS: { key: "facebook" | "instagram" | "tiktok" | "youtube" | "linkedin"; label: string }[] = [
  { key: "facebook", label: "فيسبوك" },
  { key: "instagram", label: "انستجرام" },
  { key: "tiktok", label: "تيك توك" },
  { key: "youtube", label: "يوتيوب" },
  { key: "linkedin", label: "لينكدإن" },
];

export default function SettingsForm({ settings }: { settings: Settings }) {
  const [form, setForm] = useState(settings);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setStatus("idle");
  }

  async function handleSave() {
    setStatus("saving");
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-2xl border border-black/5 p-6">
        <h2 className="font-bold text-ink mb-4">الشعار</h2>
        <div className="max-w-[220px]">
          <ImageUploadField
            label="شعار الشركة"
            value={form.logoUrl}
            onChange={(v) => update("logoUrl", v)}
            aspect="aspect-square"
          />
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
        <h2 className="font-bold text-ink">بيانات التواصل</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-ink-soft">رقم واتساب (بصيغة دولية بدون +)</label>
            <input
              value={form.whatsappNumber}
              onChange={(e) => update("whatsappNumber", e.target.value)}
              placeholder="201080146022"
              className="w-full mt-1 rounded-lg border border-black/10 px-3 py-2.5 text-sm focus:border-gold outline-none"
              dir="ltr"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-ink-soft">رقم الهاتف المعروض</label>
            <input
              value={form.contactPhone}
              onChange={(e) => update("contactPhone", e.target.value)}
              placeholder="01080146022"
              className="w-full mt-1 rounded-lg border border-black/10 px-3 py-2.5 text-sm focus:border-gold outline-none"
              dir="ltr"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-ink-soft">البريد الإلكتروني</label>
            <input
              value={form.contactEmail}
              onChange={(e) => update("contactEmail", e.target.value)}
              placeholder="Info@highlevel.com"
              className="w-full mt-1 rounded-lg border border-black/10 px-3 py-2.5 text-sm focus:border-gold outline-none"
              dir="ltr"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-ink-soft">العنوان</label>
            <input
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              className="w-full mt-1 rounded-lg border border-black/10 px-3 py-2.5 text-sm focus:border-gold outline-none"
            />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
        <h2 className="font-bold text-ink">روابط السوشيال ميديا</h2>
        <p className="text-xs text-ink-soft -mt-2">
          فعّل أي منصة عشان تظهر أيقونتها في الفوتر، وحط الرابط الخاص بيها.
        </p>
        {SOCIALS.map((s) => {
          const urlKey = `${s.key}Url` as keyof Settings;
          const enabledKey = `${s.key}Enabled` as keyof Settings;
          return (
            <div key={s.key} className="flex items-center gap-3">
              <label className="flex items-center gap-2 w-28 shrink-0 text-sm font-bold text-ink">
                <input
                  type="checkbox"
                  checked={Boolean(form[enabledKey])}
                  onChange={(e) => update(enabledKey, e.target.checked as never)}
                />
                {s.label}
              </label>
              <input
                value={(form[urlKey] as string) ?? ""}
                onChange={(e) => update(urlKey, e.target.value as never)}
                placeholder={`رابط ${s.label}`}
                dir="ltr"
                className="flex-1 rounded-lg border border-black/10 px-3 py-2 text-sm focus:border-gold outline-none disabled:opacity-50"
              />
            </div>
          );
        })}
      </section>

      <button
        onClick={handleSave}
        disabled={status === "saving"}
        className="flex items-center gap-2 rounded-xl bg-gold-gradient text-white text-sm font-bold px-6 py-3 disabled:opacity-60"
      >
        {status === "saving" && <Loader2 className="animate-spin" size={16} />}
        {status === "saved" && <CheckCircle2 size={16} />}
        {status === "idle" && <Save size={16} />}
        {status === "saving" ? "جارِ الحفظ..." : status === "saved" ? "تم الحفظ بنجاح" : "حفظ الإعدادات"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">حدث خطأ أثناء الحفظ، حاول مرة أخرى.</p>
      )}
    </div>
  );
}
