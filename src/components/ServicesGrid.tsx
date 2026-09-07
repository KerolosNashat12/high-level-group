import {
  Building2,
  PaintBucket,
  Hammer,
  Wrench,
  Zap,
  Brush,
  TreePine,
  LayoutPanelLeft,
  Layers,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import Link from "next/link";

export const mainServices: Record<"ar" | "en", { icon: typeof Building2; title: string; desc: string }[]> = {
  ar: [
    {
      icon: Building2,
      title: "تشطيب كامل",
      desc: "خدمة متكاملة تشمل جميع أعمال التشطيب من الألف إلى الياء، بدءًا من التصميم وحتى التسليم النهائي.",
    },
    {
      icon: PaintBucket,
      title: "تصميم داخلي",
      desc: "خدمات تصميم داخلي احترافية تناسب ذوقك واحتياجاتك، مع تصورات ثلاثية الأبعاد للتصميم النهائي.",
    },
    {
      icon: Hammer,
      title: "ترميم وتجديد",
      desc: "خدمات ترميم وتجديد للمباني القديمة والمتهالكة، مع الحفاظ على الطابع الأصلي للمبنى.",
    },
  ],
  en: [
    {
      icon: Building2,
      title: "Full Finishing",
      desc: "A complete service covering every stage of finishing, from initial design through to final handover.",
    },
    {
      icon: PaintBucket,
      title: "Interior Design",
      desc: "Professional interior design services tailored to your taste and needs, with 3D visuals of the final design.",
    },
    {
      icon: Hammer,
      title: "Restoration & Renovation",
      desc: "Restoration and renovation services for older, worn buildings, while preserving the property's original character.",
    },
  ],
};

export const extraServices: Record<"ar" | "en", { icon: typeof Wrench; title: string; desc: string }[]> = {
  ar: [
    {
      icon: Wrench,
      title: "أعمال السباكة",
      desc: "تنفيذ جميع أعمال السباكة بأعلى معايير الجودة والسلامة، باستخدام أفضل المواد والتقنيات الحديثة.",
    },
    {
      icon: Zap,
      title: "أعمال الكهرباء",
      desc: "تنفيذ جميع أعمال الكهرباء بدقة واحترافية عالية، مع الالتزام بمعايير السلامة العالمية.",
    },
    {
      icon: Brush,
      title: "أعمال الدهانات",
      desc: "تنفيذ جميع أنواع الدهانات الداخلية والخارجية، مع اختيار أفضل الخامات التي تناسب احتياجاتك.",
    },
    {
      icon: TreePine,
      title: "أعمال النجارة",
      desc: "تصميم وتنفيذ جميع أعمال النجارة بأعلى مستويات الدقة والجودة، باستخدام أجود أنواع الأخشاب.",
    },
    {
      icon: LayoutPanelLeft,
      title: "أعمال الألمنيوم والزجاج",
      desc: "تصميم وتنفيذ جميع أعمال الألمنيوم والزجاج بأحدث التقنيات والتصميمات العصرية.",
    },
    {
      icon: Layers,
      title: "أعمال الجبس والديكور",
      desc: "تصميم وتنفيذ جميع أعمال الجبس والديكور بتصميمات عصرية ومبتكرة تضيف لمسة جمالية للمكان.",
    },
  ],
  en: [
    {
      icon: Wrench,
      title: "Plumbing Works",
      desc: "All plumbing works executed to the highest quality and safety standards, using the best materials and modern techniques.",
    },
    {
      icon: Zap,
      title: "Electrical Works",
      desc: "All electrical works carried out with precision and professionalism, fully compliant with international safety standards.",
    },
    {
      icon: Brush,
      title: "Painting Works",
      desc: "All interior and exterior painting, using the finest materials suited to your needs.",
    },
    {
      icon: TreePine,
      title: "Carpentry Works",
      desc: "Design and execution of all carpentry work to the highest levels of precision and quality, using the finest woods.",
    },
    {
      icon: LayoutPanelLeft,
      title: "Aluminum & Glass Works",
      desc: "Design and execution of all aluminum and glass work with the latest techniques and contemporary designs.",
    },
    {
      icon: Layers,
      title: "Gypsum & Decor Works",
      desc: "Design and execution of all gypsum and decor work with modern, innovative designs that add an aesthetic touch to your space.",
    },
  ],
};

export default function ServicesGrid({ compact = false, lang = "ar" }: { compact?: boolean; lang?: "ar" | "en" }) {
  const isEn = lang === "en";
  const p = isEn ? "/en" : "";
  return (
    <section className="py-24">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">
            Elite Specialized Services
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink">
            {isEn ? "Our Specialized Expertise" : "خبراتنا المتخصصة"}
          </h2>
          <p className="mt-3 text-ink-soft">
            {isEn
              ? "Complete solutions to finish your home from the ground up to the final furnishing touch"
              : "حلول متكاملة لتشطيب منزلك من الأساس حتى الفرش"}
          </p>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainServices[lang].map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="h-full rounded-2xl bg-ink text-white p-7 transition hover:-translate-y-1">
                <s.icon className="text-gold" size={30} />
                <h3 className="mt-4 font-bold text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {!compact && (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {extraServices[lang].map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-black/10 p-7 transition hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/10">
                  <s.icon className="text-gold" size={26} />
                  <h3 className="mt-4 font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {compact && (
          <div className="mt-10 text-center">
            <Link
              href={`${p}/services`}
              className="inline-block rounded-full border border-gold px-8 py-3.5 font-bold text-gold hover:bg-gold hover:text-white transition"
            >
              {isEn ? "View All Services & Packages" : "عرض كافة الخدمات والباقات"}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
