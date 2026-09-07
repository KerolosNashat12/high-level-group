import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { packages, packageFeatures } from "@/db/schema";

// One-time endpoint to refresh package data with the real business content
// (prices, names, feature bullets) copied from the live high-level-group.com
// site. Protected by SETUP_SECRET, removed after use.
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (!process.env.SETUP_SECRET || secret !== process.env.SETUP_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const seedPackages = [
    {
      slug: "economy",
      nameAr: "باقة التوفير",
      nameEn: "Economy Package",
      tagline: "تأسيس هندسي متكامل مع تشطيب لوكس يجمع بين الجودة وكفاءة التكاليف.",
      pricePerMeter: 3500,
      downPaymentPct: 10,
      installmentMonths: 24,
      color: "#8a8a8a",
      featured: false,
      order: 1,
      features: [
        "تأسيس سباكة (BR معتمد) وأطقم صحي تركي",
        "سلك سويدي معتمد ولوحة 12 خط",
        "3 أبواب غرف موسكي واكسسوارات",
        "سيراميك فرز أول (150 ج/م) اختيار العميل",
        "ألوميتال بي أس 7% (زجاج وسلك)",
        "مصيص الشقة بالكامل + رسم 2D مجاناً",
      ],
    },
    {
      slug: "super",
      nameAr: "باقة السوبر",
      nameEn: "Super Package",
      tagline: "التوازن المثالي لعشاق الأناقة الحديثة مع لمسات ديكورية راقية وجبس بورد متطور.",
      pricePerMeter: 4500,
      downPaymentPct: 10,
      installmentMonths: 36,
      color: "#b48b4e",
      featured: true,
      order: 2,
      features: [
        "سباكة كاملة (أطقم تركي/ألماني) وصرف تكييف",
        "لوحة 18 خط ونقاط انترنت وغرف اختيارية",
        "4 أبواب غرف موسكي واكسسوارات كاملة",
        "بيت نور في الريسبشن والطرقة (جبس بورد)",
        "ديكور (ورق حائط أو جلد قطيفة) اختيار العميل",
        "ألوميتال بي أس 7% + رسم 2D مجاناً",
      ],
    },
    {
      slug: "ultra-luxury",
      nameAr: "باقة الالترا سوبر لوكس",
      nameEn: "Ultra Super Luxury Package",
      tagline: "التجربة القصوى للفخامة: تصميم 3D كامل، رخام مستورد، وأنظمة تشغيل منزلية ذكية شاملة.",
      pricePerMeter: 6000,
      downPaymentPct: 10,
      installmentMonths: 48,
      color: "#1a1a1a",
      featured: false,
      order: 3,
      features: [
        "بورسلين (400 ج/م) وسيراميك شرايح للغرف",
        "باب مصفح تركي وأطقم صحي ديورافيت/ايديال",
        "ساوند سيستم كامل ونقاط طوارئ ولوحة 24 خط",
        "جبس بورد كامل ومكتبة تليفزيون وديكور فخم",
        "ألوميتال بي أس 10% (زجاج دبل اختيار العميل)",
        "رسم الوحدة 3D مجاناً",
      ],
    },
  ];

  const log: string[] = [];

  for (const pkg of seedPackages) {
    const { features, ...pkgData } = pkg;
    const [inserted] = await db
      .insert(packages)
      .values(pkgData)
      .onConflictDoUpdate({ target: packages.slug, set: pkgData })
      .returning();

    await db.delete(packageFeatures).where(eq(packageFeatures.packageId, inserted.id));
    for (let i = 0; i < features.length; i++) {
      await db.insert(packageFeatures).values({
        packageId: inserted.id,
        label: features[i],
        order: i,
      });
    }
    log.push(`${pkg.nameAr} updated`);
  }

  return NextResponse.json({ ok: true, log });
}
