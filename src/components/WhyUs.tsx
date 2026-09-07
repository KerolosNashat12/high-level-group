import { ShieldCheck, Wallet, Ruler, Clock3, Gem, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";

const items = [
  {
    icon: ShieldCheck,
    title: "ضمان حقيقي",
    desc: "نقدم ضماناً شاملاً على كافة بنود التنفيذ لضمان راحة بالك لسنوات.",
  },
  {
    icon: Wallet,
    title: "تقسيط بدون ضغط",
    desc: "أنظمة تقسيط متنوعة تبدأ من 12 شهر وتصل لـ 60 شهر بأقل فائدة في مصر.",
  },
  {
    icon: Ruler,
    title: "إشراف هندسي دقيق",
    desc: "كل مسمار في منزلك يتم تحت إشراف هندسي مباشر لضمان أعلى معايير الجودة.",
  },
  {
    icon: Clock3,
    title: "التزام بالمواعيد",
    desc: "نحترم وقتك، ونسلم مشروعك في الموعد المحدد دون أي تأخير.",
  },
  {
    icon: Gem,
    title: "خامات أصلية",
    desc: "نتعامل فقط مع كبرى الشركات (جوتن، السويدي، ديورافيت) لضمان عمر افتراضي أطول.",
  },
  {
    icon: Sparkles,
    title: "تصميمات حصرية",
    desc: "تصميماتنا فريدة ولا تتكرر، مصممة خصيصاً لتناسب ذوقك واحتياجاتك.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-black/[0.02]">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">
            Innovation &amp; Trust
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink text-balance">
            لماذا يستحق منزلك لمستنا المعمارية؟
          </h2>
          <p className="mt-4 text-ink-soft italic leading-relaxed">
            &ldquo;نحن لا نشطب الجدران، نحن نصمم المساحات التي تمنحك شعوراً
            بالفخامة في كل تفصيلة.&rdquo;
          </p>
          <div className="mt-6 text-4xl font-extrabold text-gold">
            <Counter to={15} suffix="+" />
          </div>
          <div className="text-xs text-ink-soft tracking-widest uppercase">
            Years of Excellence
          </div>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-black/10 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/10 hover:border-gold/30">
                <item.icon className="text-gold" size={30} />
                <h3 className="mt-4 font-bold text-ink text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
