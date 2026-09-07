import Reveal from "@/components/Reveal";

const areas: Record<"ar" | "en", string[]> = {
  ar: [
    "التجمع الخامس", "القاهرة الجديدة", "الشيخ زايد", "السادس من أكتوبر",
    "العاصمة الإدارية الجديدة", "الزمالك", "المهندسين", "الدقي", "المعادي",
    "القطامية", "مصر الجديدة", "مدينة نصر", "الشروق", "العبور", "مدينة المستقبل",
    "جمعية عرابي", "الساحل الشمالي", "العين السخنة", "العلمين الجديدة",
    "بورسعيد", "الإسكندرية", "الغردقة", "قنا", "الأقصر", "أسوان",
  ],
  en: [
    "5th Settlement", "New Cairo", "Sheikh Zayed", "6th of October",
    "New Administrative Capital", "Zamalek", "Mohandessin", "Dokki", "Maadi",
    "Katameya", "Heliopolis", "Nasr City", "Shorouk", "Obour", "New Future City",
    "Orabi Society", "North Coast", "Ain Sokhna", "New Alamein",
    "Port Said", "Alexandria", "Hurghada", "Qena", "Luxor", "Aswan",
  ],
};

export default function CoverageAreas({ lang = "ar" }: { lang?: "ar" | "en" }) {
  const isEn = lang === "en";
  return (
    <section className="py-24 bg-ink text-white">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            {isEn ? "Service Coverage Areas" : "مناطق تغطية الخدمة"}
          </h2>
          <p className="mt-3 text-white/60">
            {isEn ? "We reach you anywhere in Egypt" : "نصل إليكم في كل مكان في مصر"}
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-10 flex flex-wrap justify-center gap-3">
          {areas[lang].map((a) => (
            <span
              key={a}
              className="rounded-full border border-white/15 px-4 py-2 text-xs text-white/70 hover:border-gold hover:text-gold transition cursor-default"
            >
              #{a}
            </span>
          ))}
        </Reveal>

        <Reveal delay={200} className="mt-10 max-w-3xl mx-auto text-center text-sm text-white/50 leading-relaxed">
          <p>
            {isEn
              ? "High Level Group is proud to offer the finest finishing and decor services, on a comfortable installment plan, across all of Egypt's cities and new urban communities. Whether you're looking for a trusted finishing company in the Fifth Settlement or want us to design your apartment in the New Administrative Capital, we're here to turn your vision into reality."
              : "تفتخر شركة هاى ليفيل (High Level Group) بتقديم أرقى خدمات التشطيب والديكور بنظام التقسيط المريح في كافة المدن والمجتمعات العمرانية الجديدة. إذا كنت تبحث عن شركة تشطيب موثوقة في التجمع أو نصمم لك شقتك في العاصمة الإدارية، فنحن هنا لنحول رؤيتك إلى واقع."}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
