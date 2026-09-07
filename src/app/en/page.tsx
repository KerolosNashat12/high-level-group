import { getPackagesWithFeatures, getPortfolioProjects, getSiteSettings } from "@/lib/data";
import PackageCard from "@/components/PackageCard";
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

export const metadata = {
  title: "High Level Group | Apartment Finishing on Installments in Egypt",
};

export default async function HomePage() {
  const [packages, portfolioProjects, settings] = await Promise.all([
    getPackagesWithFeatures(),
    getPortfolioProjects(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Hero title={settings.heroTitleEn} subtitle={settings.heroSubtitleEn} lang="en" />
      <WhyUs lang="en" />
      <Partners lang="en" />
      <ServicesGrid compact lang="en" />
      <Specializations lang="en" />
      <Workflow lang="en" />

      {/* Packages preview */}
      <section className="py-24">
        <div className="container-page">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1 text-gold text-sm font-bold">
              <Star size={14} fill="currentColor" /> Our Packages
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mt-2">
              Choose the Package That Suits You
            </h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 100}>
                <PackageCard pkg={pkg} lang="en" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PortfolioTeaser projects={portfolioProjects} lang="en" />
      <Testimonials lang="en" />

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

      <FaqAccordion lang="en" />
      <CoverageAreas lang="en" />
    </>
  );
}
