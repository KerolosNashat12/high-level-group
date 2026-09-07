import { getSiteSettings } from "@/lib/data";
import SettingsForm from "@/components/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">إعدادات الموقع</h1>
      <p className="text-sm text-ink-soft mt-1">
        الشعار، بيانات التواصل، وروابط السوشيال ميديا — تظهر مباشرة على الموقع بعد الحفظ.
      </p>

      <div className="mt-8 max-w-3xl">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
