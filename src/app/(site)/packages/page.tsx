import { getPackagesWithFeatures } from "@/lib/data";
import PackageCard from "@/components/PackageCard";
import VisitRequestForm from "@/components/VisitRequestForm";
import ComparisonTable from "@/components/ComparisonTable";
import InstallmentCalculator from "@/components/InstallmentCalculator";
import Workflow from "@/components/Workflow";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "باقات التشطيب بالتقسيط | هاى ليفيل للتشطيبات",
};

export default async function PackagesPage() {
  const packages = await getPackagesWithFeatures();
  const names = packages.map((p) => p.nameAr) as [string, string, string];

  return (
    <>
      <section className="bg-ink text-white py-20">
        <div className="container-page text-center">
          <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">
            Financing &amp; Installments
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold">باقات تشطيب بالتقسيط</h1>
          <p className="mt-5 text-white/70 max-w-2xl mx-auto leading-relaxed italic">
            &ldquo;حولنا التحدي المادي إلى رفاهية ممكنة.. تشطيب منزلك الآن
            يبدأ بمقدم بسيط وأطول فترة سداد في مصر.&rdquo;
          </p>
          <a
            href="#calculator"
            className="mt-8 inline-block rounded-full bg-gold-gradient px-8 py-4 font-bold hover:opacity-90 transition"
          >
            ابدأ حساب قسطك الآن
          </a>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page grid md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 100}>
              <PackageCard pkg={pkg} />
            </Reveal>
          ))}
        </div>
      </section>

      {names.length === 3 && <ComparisonTable names={names} />}

      <InstallmentCalculator
        packages={packages.map((p) => ({
          id: p.id,
          nameAr: p.nameAr,
          pricePerMeter: p.pricePerMeter,
          downPaymentPct: p.downPaymentPct,
        }))}
      />

      <Workflow />

      <section id="visit-request" className="py-24 bg-black/[0.02]">
        <div className="container-page max-w-2xl">
          <Reveal className="rounded-3xl border border-black/10 bg-white p-8 sm:p-10 shadow-sm">
            <VisitRequestForm
              packages={packages.map((p) => ({ id: p.id, nameAr: p.nameAr }))}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
