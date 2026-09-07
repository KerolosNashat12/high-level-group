"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/Reveal";

const faqs = [
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
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24">
      <div className="container-page max-w-3xl">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink">الأسئلة الشائعة</h2>
          <p className="mt-3 text-ink-soft">كل ما يدور في ذهنك</p>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((item, i) => (
            <Reveal key={item.q} delay={i * 60}>
              <div className="overflow-hidden rounded-2xl border border-black/10">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-right font-bold text-ink hover:bg-black/[0.02] transition"
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
