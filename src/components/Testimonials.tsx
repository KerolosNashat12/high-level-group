import { Star } from "lucide-react";
import Reveal from "@/components/Reveal";

const testimonials: Record<"ar" | "en", { text: string; name: string; role: string; letter: string }[]> = {
  ar: [
    {
      text: "تجربة رائعة مع إدارة هاى ليفيل. الالتزام بالمواعيد كان مذهلاً، والنتيجة النهائية فاقت توقعاتي بكثير. نظام التقسيط سهل عليّ الكثير.",
      name: "أحمد محمود",
      role: "صاحب فيلا بالتجمع",
      letter: "أ",
    },
    {
      text: "أكثر ما أعجبني هو التصميم الـ 3D الذي جعلني أرى بيتي قبل التنفيذ. الدقة في اختيار الخامات والدهانات كانت احترافية جداً.",
      name: "سارة حسن",
      role: "مالكة شقة بمدينتي",
      letter: "س",
    },
    {
      text: "شركة محترمة جداً. تعاملت معهم في تشطيب عيادتي الخاصة، والنتيجة كانت مبهرة لكل المرضى. أنصح بهم بشدة لكل من يبحث عن الفخامة.",
      name: "د. خالد علي",
      role: "طبيب",
      letter: "د",
    },
  ],
  en: [
    {
      text: "A wonderful experience with the High Level team. Their punctuality was impressive, and the final result far exceeded my expectations. The installment plan made everything so much easier for me.",
      name: "أحمد محمود",
      role: "Villa Owner, Fifth Settlement",
      letter: "A",
    },
    {
      text: "What I loved most was the 3D design that let me see my home before construction even started. The precision in choosing materials and paints was truly professional.",
      name: "سارة حسن",
      role: "Apartment Owner, Madinaty",
      letter: "S",
    },
    {
      text: "A truly reputable company. I worked with them on finishing my private clinic, and the result impressed every patient. Highly recommended for anyone looking for genuine luxury.",
      name: "د. خالد علي",
      role: "Physician",
      letter: "D",
    },
  ],
};

export default function Testimonials({ lang = "ar" }: { lang?: "ar" | "en" }) {
  const isEn = lang === "en";
  return (
    <section className="py-24 bg-black/[0.02]">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink">
            {isEn ? "What Do Our Clients Say?" : "ماذا يقول عملاؤنا؟"}
          </h2>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {testimonials[lang].map((t, i) => (
            <Reveal key={t.name + i} delay={i * 100}>
              <div className="h-full rounded-2xl bg-white border border-black/10 p-7">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-ink-soft leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient font-bold text-white">
                    {t.letter}
                  </span>
                  <div>
                    <div className="font-bold text-ink text-sm">{t.name}</div>
                    <div className="text-xs text-ink-soft">{t.role}</div>
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
