import Reveal from "@/components/Reveal";

const rows: [string, string, string, string][] = [
  ["تأسيس السباكة", "BR معتمد", "بي أر + صرف تكييف", "بي أر + عزل 2 طبقة + صرف تكييف"],
  ["تأسيس الكهرباء", "السويدي + لوحة 12 خط", "السويدي + لوحة 18 خط + انترنت", "السويدي + لوحة 24 خط + ساوند سيستم"],
  ["نوع الدهانات", "سايبس 2 وش", "جوتن + ديكور (ورق أو قطيفة)", "جوتن + ديكور فخم + بلاط فوم"],
  ["الأرضيات", "سيراميك 150 ج/م", "سيراميك 150 ج/م", "بورسلين 400 ج/م + شرايح غرف"],
  ["الأسقف", "مصيص الشقة", "جبس بورد ريسبشن/طرقة", "جبس بورد كامل + مكتبة تليفزيون"],
  ["النجارة", "3 أبواب موسكي", "4 أبواب موسكي", "أبواب موسكي فخمة + باب مصفح تركي"],
];

export default function ComparisonTable({
  names,
}: {
  names: [string, string, string];
}) {
  return (
    <section className="py-24">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink">قارن المواصفات</h2>
          <p className="mt-3 text-ink-soft">
            قارن بين التفاصيل التقنية الدقيقة لكل باقة لتتأكد من جودة الخامات
            التي نستخدمها في هاى ليفيل.
          </p>
        </Reveal>

        <Reveal delay={100} className="overflow-x-auto rounded-2xl border border-black/10">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="bg-ink text-white">
                <th className="px-5 py-4 text-right font-bold">مواصفة التشطيب</th>
                {names.map((n) => (
                  <th key={n} className="px-5 py-4 text-right font-bold">
                    {n}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row[0]} className={i % 2 ? "bg-black/[0.02]" : ""}>
                  <td className="px-5 py-4 font-bold text-ink whitespace-nowrap">{row[0]}</td>
                  <td className="px-5 py-4 text-ink-soft">{row[1]}</td>
                  <td className="px-5 py-4 text-ink-soft">{row[2]}</td>
                  <td className="px-5 py-4 text-ink-soft">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
