import Reveal from "@/components/Reveal";

const steps: Record<"ar" | "en", { n: string; title: string; desc: string }[]> = {
  ar: [
    { n: "01", title: "المعاينة والقياس", desc: "زيارة موقعك لرفع المقاسات وفهم احتياجاتك بدقة." },
    { n: "02", title: "التصميم والتعاقد", desc: "عمل تصميمات 3D واختيار نظام التقسيط المناسب." },
    { n: "03", title: "التنفيذ والإشراف", desc: "بدء العمل الفعلي تحت إشراف هندسي يومي." },
    { n: "04", title: "التسليم والضمان", desc: "تسليم منزلك جاهزاً للسكن مع شهادة الضمان." },
  ],
  en: [
    { n: "01", title: "Site Visit & Measurement", desc: "We visit your site to take exact measurements and understand your needs." },
    { n: "02", title: "Design & Contracting", desc: "3D designs are prepared and you choose the installment plan that suits you." },
    { n: "03", title: "Execution & Supervision", desc: "Work begins on site under daily engineering supervision." },
    { n: "04", title: "Handover & Warranty", desc: "Your home is delivered move-in ready, backed by a warranty certificate." },
  ],
};

export default function Workflow({ lang = "ar" }: { lang?: "ar" | "en" }) {
  const isEn = lang === "en";
  return (
    <section className="py-24 bg-ink text-white">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">
            The Workflow
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold">
            {isEn ? "The Architectural Transformation Journey" : "رحلة التحول المعماري"}
          </h2>
        </Reveal>

        <div className="relative mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="hidden lg:block absolute top-6 left-[12%] right-[12%] h-px bg-gradient-to-l from-transparent via-gold/40 to-transparent" />
          {steps[lang].map((s, i) => (
            <Reveal key={s.n} delay={i * 100} className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-lg font-extrabold shadow-lg shadow-gold/20">
                {s.n}
              </div>
              <h3 className="mt-5 font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
