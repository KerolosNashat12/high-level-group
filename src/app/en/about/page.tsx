import Image from "next/image";
import { Target, Eye, Award } from "lucide-react";
import { getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Us | High Level Group",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <section className="bg-ink text-white py-16">
        <div className="container-page text-center">
          <h1 className="text-4xl font-extrabold">About Us</h1>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            High Level Group is a leading finishing company for apartments and villas, offering
            comfortable installment plans, with over 10 years of experience in the Egyptian market.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop"
              alt="Our team"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-ink">Our Story</h2>
            <p className="mt-4 text-ink-soft leading-relaxed whitespace-pre-line">
              {settings.aboutTextEn ||
                settings.aboutTextAr ||
                `We started our journey with a single goal: to make it easier for every Egyptian family
to own the home of their dreams without having to pay the full amount upfront.
Through smart installment packages and a complete engineering team, we've delivered
hundreds of projects across Cairo and Giza to the highest standards of quality and
punctuality.`}
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-6">
              <div>
                <Target className="text-gold" size={26} />
                <h3 className="font-bold mt-3">Our Mission</h3>
                <p className="text-sm text-ink-soft mt-1">
                  Delivering high-quality finishing with easy payment plans for everyone.
                </p>
              </div>
              <div>
                <Eye className="text-gold" size={26} />
                <h3 className="font-bold mt-3">Our Vision</h3>
                <p className="text-sm text-ink-soft mt-1">
                  To be the number one choice for finishing on installments in Egypt.
                </p>
              </div>
              <div>
                <Award className="text-gold" size={26} />
                <h3 className="font-bold mt-3">Our Values</h3>
                <p className="text-sm text-ink-soft mt-1">
                  Transparency, quality, and commitment in every project we deliver.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
