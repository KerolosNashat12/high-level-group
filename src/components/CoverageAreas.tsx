import Reveal from "@/components/Reveal";

const areas = [
  "التجمع الخامس", "القاهرة الجديدة", "الشيخ زايد", "السادس من أكتوبر",
  "العاصمة الإدارية الجديدة", "الزمالك", "المهندسين", "الدقي", "المعادي",
  "القطامية", "مصر الجديدة", "مدينة نصر", "الشروق", "العبور", "مدينة المستقبل",
  "جمعية عرابي", "الساحل الشمالي", "العين السخنة", "العلمين الجديدة",
  "بورسعيد", "الإسكندرية", "الغردقة", "قنا", "الأقصر", "أسوان",
];

export default function CoverageAreas() {
  return (
    <section className="py-24 bg-ink text-white">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold">مناطق تغطية الخدمة</h2>
          <p className="mt-3 text-white/60">نصل إليكم في كل مكان في مصر</p>
        </Reveal>

        <Reveal delay={100} className="mt-10 flex flex-wrap justify-center gap-3">
          {areas.map((a) => (
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
            تفتخر شركة هاى ليفيل (High Level Group) بتقديم أرقى خدمات التشطيب
            والديكور بنظام التقسيط المريح في كافة المدن والمجتمعات العمرانية
            الجديدة. إذا كنت تبحث عن شركة تشطيب موثوقة في التجمع أو نصمم لك
            شقتك في العاصمة الإدارية، فنحن هنا لنحول رؤيتك إلى واقع.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
