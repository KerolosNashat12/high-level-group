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

export const mainServices = [
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
];

export const extraServices = [
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
];

export default function ServicesGrid({ compact = false }: { compact?: boolean }) {
  return (
    <section className="py-24">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">
            Elite Specialized Services
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink">خبراتنا المتخصصة</h2>
          <p className="mt-3 text-ink-soft">حلول متكاملة لتشطيب منزلك من الأساس حتى الفرش</p>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainServices.map((s, i) => (
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
            {extraServices.map((s, i) => (
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
              href="/services"
              className="inline-block rounded-full border border-gold px-8 py-3.5 font-bold text-gold hover:bg-gold hover:text-white transition"
            >
              عرض كافة الخدمات والباقات
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
