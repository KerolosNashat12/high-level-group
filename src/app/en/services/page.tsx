import Link from "next/link";
import ServicesGrid from "@/components/ServicesGrid";

export const metadata = {
  title: "Finishing & Decor Services | High Level Finishing",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-ink text-white py-20">
        <div className="container-page text-center">
          <Link href="/en" className="text-xs text-white/50 hover:text-gold">
            Back to Home
          </Link>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold">Our Architectural Services</h1>
          <p className="mt-5 text-white/70 max-w-2xl mx-auto leading-relaxed italic">
            &ldquo;Complete solutions and engineering creativity that turn your home into a work of
            art, down to the finest detail and the best installment plans.&rdquo;
          </p>
        </div>
      </section>

      <ServicesGrid lang="en" />

      <section className="py-20 bg-ink text-white text-center">
        <div className="container-page">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-balance max-w-xl mx-auto italic">
            &ldquo;Don&apos;t just live there — experience luxury in every corner of your home with
            the best engineering team in Egypt.&rdquo;
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/en/packages#calculator"
              className="rounded-full bg-gold-gradient px-8 py-4 font-bold hover:opacity-90 transition"
            >
              Request a Visit Now
            </Link>
            <Link
              href="/en/portfolio"
              className="rounded-full border border-white/30 px-8 py-4 font-bold hover:bg-white/10 transition"
            >
              View Our Portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
