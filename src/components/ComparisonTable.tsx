import Reveal from "@/components/Reveal";

const rows: Record<"ar" | "en", [string, string, string, string][]> = {
  ar: [
    ["تأسيس السباكة", "BR معتمد", "بي أر + صرف تكييف", "بي أر + عزل 2 طبقة + صرف تكييف"],
    ["تأسيس الكهرباء", "السويدي + لوحة 12 خط", "السويدي + لوحة 18 خط + انترنت", "السويدي + لوحة 24 خط + ساوند سيستم"],
    ["نوع الدهانات", "سايبس 2 وش", "جوتن + ديكور (ورق أو قطيفة)", "جوتن + ديكور فخم + بلاط فوم"],
    ["الأرضيات", "سيراميك 150 ج/م", "سيراميك 150 ج/م", "بورسلين 400 ج/م + شرايح غرف"],
    ["الأسقف", "مصيص الشقة", "جبس بورد ريسبشن/طرقة", "جبس بورد كامل + مكتبة تليفزيون"],
    ["النجارة", "3 أبواب موسكي", "4 أبواب موسكي", "أبواب موسكي فخمة + باب مصفح تركي"],
  ],
  en: [
    ["Plumbing Installation", "Certified PPR piping", "PPR piping + A/C drainage", "PPR piping + double-layer insulation + A/C drainage"],
    ["Electrical Installation", "Elsewedy + 12-way panel", "Elsewedy + 18-way panel + internet wiring", "Elsewedy + 24-way panel + sound system wiring"],
    ["Paint Type", "Sipes, 2 coats", "Jotun + decorative finish (wallpaper or velvet)", "Jotun + premium decor + foam cladding"],
    ["Flooring", "Ceramic, 150 EGP/m", "Ceramic, 150 EGP/m", "Porcelain, 400 EGP/m + room strips"],
    ["Ceilings", "Plastered ceiling", "Gypsum board in reception/hallway", "Full gypsum board + TV wall unit"],
    ["Carpentry", "3 Moscky doors", "4 Moscky doors", "Premium Moscky doors + Turkish armored door"],
  ],
};

export default function ComparisonTable({
  names,
  lang = "ar",
}: {
  names: [string, string, string];
  lang?: "ar" | "en";
}) {
  const isEn = lang === "en";
  return (
    <section className="py-24">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink">
            {isEn ? "Compare Specifications" : "قارن المواصفات"}
          </h2>
          <p className="mt-3 text-ink-soft">
            {isEn
              ? "Compare the precise technical details of each package to see the quality of materials we use at High Level."
              : "قارن بين التفاصيل التقنية الدقيقة لكل باقة لتتأكد من جودة الخامات التي نستخدمها في هاى ليفيل."}
          </p>
        </Reveal>

        <Reveal delay={100} className="overflow-x-auto rounded-2xl border border-black/10">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="bg-ink text-white">
                <th className={`px-5 py-4 font-bold ${isEn ? "text-left" : "text-right"}`}>
                  {isEn ? "Finishing Specification" : "مواصفة التشطيب"}
                </th>
                {names.map((n) => (
                  <th key={n} className={`px-5 py-4 font-bold ${isEn ? "text-left" : "text-right"}`}>
                    {n}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows[lang].map((row, i) => (
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
