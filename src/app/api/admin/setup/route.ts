import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { adminUsers, packages, packageFeatures } from "@/db/schema";
import { eq } from "drizzle-orm";

// One-time production setup endpoint: creates tables (if missing) and seeds
// initial packages + admin user. Protected by SETUP_SECRET. Safe to call
// more than once (idempotent) but intended to be removed/disabled after
// first successful run.
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (!process.env.SETUP_SECRET || secret !== process.env.SETUP_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const log: string[] = [];

  const statements = [
    `CREATE TABLE IF NOT EXISTS "admin_users" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" text NOT NULL,
      "email" text NOT NULL,
      "password_hash" text NOT NULL,
      "role" text DEFAULT 'admin' NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL,
      CONSTRAINT "admin_users_email_unique" UNIQUE("email")
    )`,
    `CREATE TABLE IF NOT EXISTS "contact_messages" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" text NOT NULL,
      "phone" text NOT NULL,
      "message" text NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS "packages" (
      "id" serial PRIMARY KEY NOT NULL,
      "slug" text NOT NULL,
      "name_ar" text NOT NULL,
      "name_en" text NOT NULL,
      "tagline" text,
      "price_per_meter" integer NOT NULL,
      "down_payment_pct" integer NOT NULL,
      "installment_months" integer NOT NULL,
      "color" text DEFAULT '#b48b4e' NOT NULL,
      "featured" boolean DEFAULT false NOT NULL,
      "order" integer DEFAULT 0 NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL,
      CONSTRAINT "packages_slug_unique" UNIQUE("slug")
    )`,
    `CREATE TABLE IF NOT EXISTS "package_features" (
      "id" serial PRIMARY KEY NOT NULL,
      "package_id" integer NOT NULL,
      "label" text NOT NULL,
      "order" integer DEFAULT 0 NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS "visit_requests" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" text NOT NULL,
      "phone" text NOT NULL,
      "city" text NOT NULL,
      "area" text,
      "property_type" text,
      "package_id" integer,
      "preferred_date" timestamp,
      "notes" text,
      "status" text DEFAULT 'new' NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    )`,
  ];

  for (const stmt of statements) {
    await db.execute(sql.raw(stmt));
  }

  await db.execute(
    sql.raw(
      `ALTER TABLE "package_features" DROP CONSTRAINT IF EXISTS "package_features_package_id_packages_id_fk"`
    )
  );
  await db.execute(
    sql.raw(
      `ALTER TABLE "package_features" ADD CONSTRAINT "package_features_package_id_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action`
    )
  );
  await db.execute(
    sql.raw(
      `ALTER TABLE "visit_requests" DROP CONSTRAINT IF EXISTS "visit_requests_package_id_packages_id_fk"`
    )
  );
  await db.execute(
    sql.raw(
      `ALTER TABLE "visit_requests" ADD CONSTRAINT "visit_requests_package_id_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE no action ON UPDATE no action`
    )
  );

  log.push("Tables ensured.");

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
  log.push("Packages seeded.");

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
  log.push(`Admin ensured: ${adminEmail}`);

  return NextResponse.json({ ok: true, log });
}
