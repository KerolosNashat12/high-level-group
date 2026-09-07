import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/db";

// One-time production migration (round 3): adds English tagline/feature-label
// columns for packages, and seeds English translations for the packages
// already live on the site (matched by their existing Arabic text, so this
// is safe to run once and a no-op on any row it doesn't recognize).
// Protected by SETUP_SECRET, idempotent, removed via a follow-up commit.
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (!process.env.SETUP_SECRET || secret !== process.env.SETUP_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const log: string[] = [];

  const ddl = [
    `ALTER TABLE "packages" ADD COLUMN IF NOT EXISTS "tagline_en" text`,
    `ALTER TABLE "package_features" ADD COLUMN IF NOT EXISTS "label_en" text`,
  ];

  const taglineSeeds: [string, string][] = [
    [
      "تأسيس هندسي متكامل مع تشطيب لوكس يجمع بين الجودة وكفاءة التكاليف.",
      "Comprehensive engineering groundwork with luxury finishing that balances quality and cost efficiency.",
    ],
    [
      "التوازن المثالي لعشاق الأناقة الحديثة مع لمسات ديكورية راقية وجبس بورد متطور.",
      "The perfect balance for lovers of modern elegance, with refined decorative touches and advanced gypsum board work.",
    ],
    [
      "التجربة القصوى للفخامة: تصميم 3D كامل، رخام مستورد، وأنظمة تشغيل منزلية ذكية شاملة.",
      "The ultimate luxury experience: full 3D design, imported marble, and comprehensive smart home systems.",
    ],
  ];

  const featureSeeds: [string, string][] = [
    ["تأسيس سباكة (BR معتمد) وأطقم صحي تركي", "Certified PPR plumbing installation with Turkish sanitary ware sets"],
    ["سلك سويدي معتمد ولوحة 12 خط", "Certified Elsewedy wiring with a 12-way electrical panel"],
    ["3 أبواب غرف موسكي واكسسوارات", "3 Moscky room doors with accessories"],
    ["سيراميك فرز أول (150 ج/م) اختيار العميل", "First-grade ceramic tiles (150 EGP/m) — customer's choice"],
    ["ألوميتال بي أس 7% (زجاج وسلك)", "PS aluminum 7% (glass and mesh)"],
    ["مصيص الشقة بالكامل + رسم 2D مجاناً", "Full apartment plastering + free 2D drawing"],
    ["سباكة كاملة (أطقم تركي/ألماني) وصرف تكييف", "Complete plumbing (Turkish/German sets) with A/C drainage"],
    ["لوحة 18 خط ونقاط انترنت وغرف اختيارية", "18-way electrical panel with internet points and optional rooms"],
    ["4 أبواب غرف موسكي واكسسوارات كاملة", "4 Moscky room doors with full accessories"],
    ["بيت نور في الريسبشن والطرقة (جبس بورد)", "Cove lighting in the reception and hallway (gypsum board)"],
    ["ديكور (ورق حائط أو جلد قطيفة) اختيار العميل", "Decor (wallpaper or velvet cladding) — customer's choice"],
    ["ألوميتال بي أس 7% + رسم 2D مجاناً", "PS aluminum 7% + free 2D drawing"],
    ["بورسلين (400 ج/م) وسيراميك شرايح للغرف", "Porcelain tiles (400 EGP/m) and ceramic strips for rooms"],
    ["باب مصفح تركي وأطقم صحي ديورافيت/ايديال", "Turkish armored door with Duravit/Ideal Standard sanitary ware"],
    ["ساوند سيستم كامل ونقاط طوارئ ولوحة 24 خط", "Full sound system, emergency points, and 24-way panel"],
    ["جبس بورد كامل ومكتبة تليفزيون وديكور فخم", "Full gypsum board, TV unit, and premium decor"],
    ["ألوميتال بي أس 10% (زجاج دبل اختيار العميل)", "PS aluminum 10% (double glazing — customer's choice)"],
    ["رسم الوحدة 3D مجاناً", "Free 3D unit rendering"],
  ];

  try {
    for (const stmt of ddl) {
      await db.execute(sql.raw(stmt));
      log.push(`OK: ${stmt}`);
    }

    for (const [ar, en] of taglineSeeds) {
      const escAr = ar.replace(/'/g, "''");
      const escEn = en.replace(/'/g, "''");
      await db.execute(
        sql.raw(
          `UPDATE "packages" SET "tagline_en" = '${escEn}' WHERE "tagline" = '${escAr}' AND "tagline_en" IS NULL`
        )
      );
      log.push(`OK: tagline seed for "${ar.slice(0, 20)}..."`);
    }

    for (const [ar, en] of featureSeeds) {
      const escAr = ar.replace(/'/g, "''");
      const escEn = en.replace(/'/g, "''");
      await db.execute(
        sql.raw(
          `UPDATE "package_features" SET "label_en" = '${escEn}' WHERE "label" = '${escAr}' AND "label_en" IS NULL`
        )
      );
      log.push(`OK: feature seed for "${ar.slice(0, 20)}..."`);
    }

    return NextResponse.json({ ok: true, log });
  } catch (err) {
    console.error("[migrate3] error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "unknown error", log },
      { status: 500 }
    );
  }
}
