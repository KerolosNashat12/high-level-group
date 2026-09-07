import "dotenv/config";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "./index";
import { adminUsers, packages, packageFeatures } from "./schema";

async function main() {
  console.log("Seeding database...");

  const seedPackages = [
    {
      slug: "economy",
      nameAr: "باقة التوفير",
      nameEn: "Economy Package",
      tagline: "تشطيب متكامل بأفضل سعر وجودة مضمونة",
      pricePerMeter: 2800,
      downPaymentPct: 10,
      installmentMonths: 24,
      color: "#8a8a8a",
      featured: false,
      order: 1,
      features: [
        "دهانات وعوازل كاملة",
        "أرضيات بورسلين اقتصادي",
        "مطبخ وحدات خشب MDF",
        "تركيبات كهرباء وسباكة أساسية",
        "أبواب داخلية خشبية",
      ],
    },
    {
      slug: "super",
      nameAr: "باقة السوبر",
      nameEn: "Super Package",
      tagline: "التوازن الأمثل بين الجودة والتصميم العصري",
      pricePerMeter: 3800,
      downPaymentPct: 10,
      installmentMonths: 36,
      color: "#b48b4e",
      featured: true,
      order: 2,
      features: [
        "تصميم ديكور داخلي احترافي",
        "أرضيات بورسلين درجة أولى",
        "مطبخ وحدات خشب عالي الجودة",
        "إضاءة مخفية وديكورات جبس",
        "أدوات صحية ماركات مصرية مميزة",
        "ضمان 5 سنوات",
      ],
    },
    {
      slug: "ultra-luxury",
      nameAr: "باقة ألترا لوكس",
      nameEn: "Ultra Luxury Package",
      tagline: "الفخامة المطلقة بأرقى خامات عالمية",
      pricePerMeter: 5500,
      downPaymentPct: 10,
      installmentMonths: 48,
      color: "#1a1a1a",
      featured: false,
      order: 3,
      features: [
        "تصميم داخلي 3D مخصص بالكامل",
        "رخام وبورسلين مستورد فاخر",
        "مطبخ ألمانى بالكامل",
        "سمارت هوم متكامل",
        "أدوات صحية وخلاطات ماركات عالمية",
        "إشراف هندسي يومي على التنفيذ",
        "ضمان 10 سنوات",
      ],
    },
  ];

  for (const pkg of seedPackages) {
    const { features, ...pkgData } = pkg;
    const [inserted] = await db
      .insert(packages)
      .values(pkgData)
      .onConflictDoUpdate({
        target: packages.slug,
        set: pkgData,
      })
      .returning();

    await db.delete(packageFeatures).where(eq(packageFeatures.packageId, inserted.id));

    for (let i = 0; i < features.length; i++) {
      await db.insert(packageFeatures).values({
        packageId: inserted.id,
        label: features[i],
        order: i,
      });
    }
  }

  const adminEmail = process.env.ADMIN_SEED_EMAIL || "admin@highlevelgroup.com";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || "ChangeMe123!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await db
    .insert(adminUsers)
    .values({
      name: "Kerolos Nashat",
      email: adminEmail,
      passwordHash,
      role: "owner",
    })
    .onConflictDoNothing();

  console.log("Seed complete.");
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
