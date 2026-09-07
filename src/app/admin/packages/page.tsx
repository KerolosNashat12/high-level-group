import { getPackagesWithFeatures } from "@/lib/data";
import PackageEditor from "@/components/PackageEditor";

export const dynamic = "force-dynamic";

export default async function AdminPackagesPage() {
  const pkgs = await getPackagesWithFeatures();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">الباقات والأسعار</h1>
      <p className="text-sm text-ink-soft mt-1">
        عدّل أسعار المتر، نسبة المقدم، ومدة التقسيط — تظهر التغييرات مباشرة على الموقع.
      </p>

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        {pkgs.map((pkg) => (
          <PackageEditor key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}
