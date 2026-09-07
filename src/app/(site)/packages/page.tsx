import { getPackagesWithFeatures } from "@/lib/data";
import PackageCard from "@/components/PackageCard";
import VisitRequestForm from "@/components/VisitRequestForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "الباقات والأسعار | هاى ليفيل جروب",
};

export default async function PackagesPage() {
  const packages = await getPackagesWithFeatures();

  return (
    <>
      <section className="bg-ink text-white py-16">
        <div className="container-page text-center">
          <h1 className="text-4xl font-extrabold">باقات التشطيب والأسعار</h1>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            اختار الباقة المناسبة لميزانيتك، بأنظمة تقسيط مريحة تبدأ من 10% مقدم.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page grid md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      <section id="visit-request" className="py-20 bg-black/[0.02]">
        <div className="container-page max-w-2xl">
          <div className="rounded-3xl border border-black/10 bg-white p-8 sm:p-10 shadow-sm">
            <VisitRequestForm
              packages={packages.map((p) => ({ id: p.id, nameAr: p.nameAr }))}
            />
          </div>
        </div>
      </section>
    </>
  );
}
