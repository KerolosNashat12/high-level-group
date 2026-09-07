"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/Reveal";

const faqs: Record<"ar" | "en", { q: string; a: string }[]> = {
  ar: [
    {
      q: "كيف يمكنني تشطيب شقتي بالتقسيط مع هاى ليفيل؟",
      a: "ببساطة، تواصل معنا أو املأ نموذج طلب المعاينة، وسيقوم فريقنا الهندسي بزيارة وحدتك، تحديد الباقة المناسبة، ثم توقيع عقد التنفيذ ونظام التقسيط الذي يناسب ميزانيتك بمقدم يبدأ من نسبة بسيطة وتقسيط يصل حتى 60 شهرًا.",
    },
    {
      q: "ما هي مدة تنفيذ أعمال التشطيب والديكور؟",
      a: "تختلف المدة حسب مساحة الوحدة والباقة المختارة، لكنها تتراوح غالبًا بين 45 و90 يوم عمل، مع إشراف هندسي يومي والتزام تام بالجدول الزمني المتفق عليه.",
    },
    {
      q: "هل تشمل الباقات أعمال الكهرباء والسباكة؟",
      a: "نعم، جميع باقاتنا الثلاث تشمل تأسيس كامل لأعمال الكهرباء (خامات السويدي) والسباكة (أطقم صحي معتمدة) بمعايير جودة وسلامة عالية.",
    },
    {
      q: "هل تقدمون خدمات التصميم 3D قبل البدء؟",
      a: "أكيد، كل الباقات تشمل رسم تصميم مجاني (2D في باقة التوفير، وتصميم 3D كامل في باقة الالترا سوبر لوكس) حتى تشاهد شكل منزلك النهائي قبل بدء التنفيذ الفعلي.",
    },
    {
      q: "أين تقع مناطق تغطية شركة هاى ليفيل؟",
      a: "نغطي كافة أنحاء القاهرة الكبرى والمدن الجديدة، من التجمع الخامس والقاهرة الجديدة إلى الشيخ زايد وأكتوبر والعاصمة الإدارية، بالإضافة إلى الإسكندرية والساحل الشمالي ومدن أخرى — تواصل معنا للتأكد من تغطية منطقتك.",
    },
  ],
  en: [
    {
      q: "How can I finish my apartment on installments with High Level?",
      a: "Simply reach out to us or fill in the visit request form, and our engineering team will visit your unit, help you choose the right package, then sign the execution contract with an installment plan that fits your budget — a modest down payment and terms of up to 60 months.",
    },
    {
      q: "How long does finishing and decor work take?",
      a: "Timelines vary by unit size and chosen package, but typically range between 45 and 90 working days, with daily engineering supervision and full commitment to the agreed schedule.",
    },
    {
      q: "Do the packages include electrical and plumbing work?",
      a: "Yes — all three of our packages include complete electrical (Elsewedy materials) and plumbing (certified sanitary fittings) installation, to high quality and safety standards.",
    },
    {
      q: "Do you offer 3D design before construction begins?",
      a: "Absolutely — every package includes a free design (2D for the Saving package, and a full 3D design for the Ultra Super Lux package) so you can see exactly what your home will look like before work begins.",
    },
    {
      q: "Which areas does High Level cover?",
      a: "We cover all of Greater Cairo and the new cities — from the Fifth Settlement and New Cairo to Sheikh Zayed, 6th of October, and the New Administrative Capital — as well as Alexandria, the North Coast, and other cities. Contact us to confirm coverage in your area.",
    },
  ],
};

export default function FaqAccordion({ lang = "ar" }: { lang?: "ar" | "en" }) {
  const isEn = lang === "en";
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const list = faqs[lang];

  return (
    <section className="py-24">
      <div className="container-page max-w-3xl">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink">
            {isEn ? "Frequently Asked Questions" : "الأسئلة الشائعة"}
          </h2>
          <p className="mt-3 text-ink-soft">{isEn ? "Everything on your mind" : "كل ما يدور في ذهنك"}</p>
        </Reveal>

        <div className="space-y-3">
          {list.map((item, i) => (
            <Reveal key={item.q} delay={i * 60}>
              <div className="overflow-hidden rounded-2xl border border-black/10">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className={`flex w-full items-center justify-between gap-4 px-6 py-5 font-bold text-ink hover:bg-black/[0.02] transition ${
                    isEn ? "text-left" : "text-right"
                  }`}
                >
                  {item.q}
                  <ChevronDown
                    className={`shrink-0 text-gold transition-transform ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                    size={18}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    openIndex === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm text-ink-soft leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
