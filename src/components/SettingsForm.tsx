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
  heroTitleAr: string | null;
  heroTitleEn: string | null;
  heroSubtitleAr: string | null;
  heroSubtitleEn: string | null;
  aboutTextAr: string | null;
  aboutTextEn: string | null;
  workingHoursAr: string | null;
  workingHoursEn: string | null;
  mapUrl: string | null;
  seoTitleAr: string | null;
  seoTitleEn: string | null;
  seoDescriptionAr: string | null;
  seoDescriptionEn: string | null;
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
        <h2 className="font-bold text-ink">الصفحة الرئيسية (Hero)</h2>
        <p className="text-xs text-ink-soft -mt-2">العنوان والوصف اللي بيظهر أول ما حد يفتح الموقع. اسيبه فاضي عشان يفضل يظهر النص الافتراضي.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-ink-soft">العنوان الرئيسي (عربي)</label>
            <textarea
              value={form.heroTitleAr ?? ""}
              onChange={(e) => update("heroTitleAr", (e.target.value || null) as never)}
              rows={2}
              placeholder="تشطيب شقق بالتقسيط في مصر"
              className="w-full mt-1 rounded-lg border border-black/10 px-3 py-2.5 text-sm focus:border-gold outline-none resize-none"
            />
          </div>
          <div dir="ltr">
            <label className="text-xs font-bold text-ink-soft">Hero Title (English)</label>
            <textarea
              value={form.heroTitleEn ?? ""}
              onChange={(e) => update("heroTitleEn", (e.target.value || null) as never)}
              rows={2}
              placeholder="Apartment Finishing in Installments in Egypt"
              className="w-full mt-1 rounded-lg border border-black/10 px-3 py-2.5 text-sm focus:border-gold outline-none resize-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-ink-soft">الوصف الفرعي (عربي)</label>
            <textarea
              value={form.heroSubtitleAr ?? ""}
              onChange={(e) => update("heroSubtitleAr", (e.target.value || null) as never)}
              rows={2}
              className="w-full mt-1 rounded-lg border border-black/10 px-3 py-2.5 text-sm focus:border-gold outline-none resize-none"
            />
          </div>
          <div dir="ltr">
            <label className="text-xs font-bold text-ink-soft">Hero Subtitle (English)</label>
            <textarea
              value={form.heroSubtitleEn ?? ""}
              onChange={(e) => update("heroSubtitleEn", (e.target.value || null) as never)}
              rows={2}
              className="w-full mt-1 rounded-lg border border-black/10 px-3 py-2.5 text-sm focus:border-gold outline-none resize-none"
            />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
        <h2 className="font-bold text-ink">من نحن</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-ink-soft">وصف الشركة (عربي)</label>
            <textarea
              value={form.aboutTextAr ?? ""}
              onChange={(e) => update("aboutTextAr", (e.target.value || null) as never)}
              rows={4}
              className="w-full mt-1 rounded-lg border border-black/10 px-3 py-2.5 text-sm focus:border-gold outline-none resize-none"
            />
          </div>
          <div dir="ltr">
            <label className="text-xs font-bold text-ink-soft">About Us (English)</label>
            <textarea
              value={form.aboutTextEn ?? ""}
              onChange={(e) => update("aboutTextEn", (e.target.value || null) as never)}
              rows={4}
              className="w-full mt-1 rounded-lg border border-black/10 px-3 py-2.5 text-sm focus:border-gold outline-none resize-none"
            />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
        <h2 className="font-bold text-ink">ساعات العمل والموقع على الخريطة</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-ink-soft">ساعات العمل (عربي)</label>
            <input
              value={form.workingHoursAr ?? ""}
              onChange={(e) => update("workingHoursAr", (e.target.value || null) as never)}
              placeholder="من 10 صباحًا حتى 8 مساءً، طوال أيام الأسبوع"
              className="w-full mt-1 rounded-lg border border-black/10 px-3 py-2.5 text-sm focus:border-gold outline-none"
            />
          </div>
          <div dir="ltr">
            <label className="text-xs font-bold text-ink-soft">Working Hours (English)</label>
            <input
              value={form.workingHoursEn ?? ""}
              onChange={(e) => update("workingHoursEn", (e.target.value || null) as never)}
              placeholder="Daily, 10 AM - 8 PM"
              className="w-full mt-1 rounded-lg border border-black/10 px-3 py-2.5 text-sm focus:border-gold outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-ink-soft">رابط الموقع على خرائط جوجل</label>
            <input
              value={form.mapUrl ?? ""}
              onChange={(e) => update("mapUrl", (e.target.value || null) as never)}
              placeholder="https://maps.google.com/?q=..."
              dir="ltr"
              className="w-full mt-1 rounded-lg border border-black/10 px-3 py-2.5 text-sm focus:border-gold outline-none"
            />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
        <h2 className="font-bold text-ink">تحسين محركات البحث (SEO)</h2>
        <p className="text-xs text-ink-soft -mt-2">العنوان والوصف اللي بيظهر في نتائج جوجل.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-ink-soft">عنوان الموقع (عربي)</label>
            <input
              value={form.seoTitleAr ?? ""}
              onChange={(e) => update("seoTitleAr", (e.target.value || null) as never)}
              className="w-full mt-1 rounded-lg border border-black/10 px-3 py-2.5 text-sm focus:border-gold outline-none"
            />
          </div>
          <div dir="ltr">
            <label className="text-xs font-bold text-ink-soft">Site Title (English)</label>
            <input
              value={form.seoTitleEn ?? ""}
              onChange={(e) => update("seoTitleEn", (e.target.value || null) as never)}
              className="w-full mt-1 rounded-lg border border-black/10 px-3 py-2.5 text-sm focus:border-gold outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-ink-soft">وصف الموقع (عربي)</label>
            <textarea
              value={form.seoDescriptionAr ?? ""}
              onChange={(e) => update("seoDescriptionAr", (e.target.value || null) as never)}
              rows={2}
              className="w-full mt-1 rounded-lg border border-black/10 px-3 py-2.5 text-sm focus:border-gold outline-none resize-none"
            />
          </div>
          <div dir="ltr">
            <label className="text-xs font-bold text-ink-soft">Site Description (English)</label>
            <textarea
              value={form.seoDescriptionEn ?? ""}
              onChange={(e) => update("seoDescriptionEn", (e.target.value || null) as never)}
              rows={2}
              className="w-full mt-1 rounded-lg border border-black/10 px-3 py-2.5 text-sm focus:border-gold outline-none resize-none"
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
