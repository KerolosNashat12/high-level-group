import { getPackagesWithFeatures, getPortfolioProjects } from "@/lib/data";
import PackageCard from "@/components/PackageCard";
import VisitRequestForm from "@/components/VisitRequestForm";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Partners from "@/components/Partners";
import ServicesGrid from "@/components/ServicesGrid";
import Specializations from "@/components/Specializations";
import Workflow from "@/components/Workflow";
import PortfolioTeaser from "@/components/PortfolioTeaser";
import Testimonials from "@/components/Testimonials";
import FaqAccordion from "@/components/FaqAccordion";
import CoverageAreas from "@/components/CoverageAreas";
import InstallmentCalculator from "@/components/InstallmentCalculator";
import Reveal from "@/components/Reveal";
import { Star } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [packages, portfolioProjects] = await Promise.all([
    getPackagesWithFeatures(),
    getPortfolioProjects(),
  ]);

  return (
    <>
      <Hero />
      <WhyUs />
      <Partners />
      <ServicesGrid compact />
      <Specializations />
      <Workflow />

      {/* Packages preview */}
      <section className="py-24">
        <div className="container-page">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1 text-gold text-sm font-bold">
              <Star size={14} fill="currentColor" /> باقاتنا
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mt-2">
              اختار الباقة المناسبة لك
            </h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 100}>
                <PackageCard pkg={pkg} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PortfolioTeaser projects={portfolioProjects} />
      <Testimonials />

      <InstallmentCalculator
        packages={packages.map((p) => ({
          id: p.id,
          nameAr: p.nameAr,
          pricePerMeter: p.pricePerMeter,
          downPaymentPct: p.downPaymentPct,
        }))}
      />

      <FaqAccordion />
      <CoverageAreas />

      {/* Visit request */}
      <section id="visit-request" className="py-24">
        <div className="container-page max-w-2xl">
          <Reveal className="rounded-3xl border border-black/10 p-8 sm:p-10 shadow-sm">
            <VisitRequestForm
              packages={packages.map((p) => ({ id: p.id, nameAr: p.nameAr }))}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
