import { getPackagesWithFeatures } from "@/lib/data";
import PackageCard from "@/components/PackageCard";
import ComparisonTable from "@/components/ComparisonTable";
import InstallmentCalculator from "@/components/InstallmentCalculator";
import Workflow from "@/components/Workflow";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Finishing Packages on Installments | High Level Finishing",
};

export default async function PackagesPage() {
  const packages = await getPackagesWithFeatures();
  const names = packages.map((p) => p.nameEn || p.nameAr) as [string, string, string];

  return (
    <>
      <section className="bg-ink text-white py-20">
        <div className="container-page text-center">
          <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">
            Financing &amp; Installments
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold">Finishing Packages on Installments</h1>
          <p className="mt-5 text-white/70 max-w-2xl mx-auto leading-relaxed italic">
            &ldquo;We&apos;ve turned the financial challenge into achievable luxury — finishing your
            home now starts with a modest down payment and the longest payment terms in Egypt.&rdquo;
          </p>
          <a
            href="#calculator"
            className="mt-8 inline-block rounded-full bg-gold-gradient px-8 py-4 font-bold hover:opacity-90 transition"
          >
            Calculate Your Installment Now
          </a>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page grid md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 100}>
              <PackageCard pkg={pkg} lang="en" />
            </Reveal>
          ))}
        </div>
      </section>

      {names.length === 3 && <ComparisonTable names={names} lang="en" />}

      <InstallmentCalculator
        packages={packages.map((p) => ({
          id: p.id,
          nameAr: p.nameAr,
          nameEn: p.nameEn,
          pricePerMeter: p.pricePerMeter,
          downPaymentPct: p.downPaymentPct,
        }))}
        lang="en"
      />

      <Workflow lang="en" />
    </>
  );
}
