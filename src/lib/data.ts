import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  packages,
  packageFeatures,
  visitRequests,
  siteSettings,
  portfolioProjects,
  weeklyAvailability,
  blockedDates,
} from "@/db/schema";

const DEFAULT_SETTINGS = {
  id: 1,
  logoUrl: null as string | null,
  whatsappNumber: "201080146022",
  contactEmail: "Info@highlevel.com",
  contactPhone: "01080146022",
  address: "2116 المعراج العلوى، زهراء المعادى، القاهرة",
  facebookUrl: null as string | null,
  facebookEnabled: false,
  instagramUrl: null as string | null,
  instagramEnabled: false,
  tiktokUrl: null as string | null,
  tiktokEnabled: false,
  youtubeUrl: null as string | null,
  youtubeEnabled: false,
  linkedinUrl: null as string | null,
  linkedinEnabled: false,
  heroTitleAr: null as string | null,
  heroTitleEn: null as string | null,
  heroSubtitleAr: null as string | null,
  heroSubtitleEn: null as string | null,
  aboutTextAr: null as string | null,
  aboutTextEn: null as string | null,
  workingHoursAr: null as string | null,
  workingHoursEn: null as string | null,
  mapUrl: null as string | null,
  seoTitleAr: null as string | null,
  seoTitleEn: null as string | null,
  seoDescriptionAr: null as string | null,
  seoDescriptionEn: null as string | null,
};

export async function getSiteSettings() {
  try {
    const [row] = await db.select().from(siteSettings).limit(1);
    return row ?? DEFAULT_SETTINGS;
  } catch {
    // Table may not exist yet (pre-migration) — fall back gracefully.
    return DEFAULT_SETTINGS;
  }
}

export async function getPortfolioProjects() {
  try {
    return await db
      .select()
      .from(portfolioProjects)
      .where(eq(portfolioProjects.published, true))
      .orderBy(asc(portfolioProjects.order));
  } catch {
    return [];
  }
}

export async function getWeeklyAvailability() {
  try {
    return await db.select().from(weeklyAvailability).orderBy(asc(weeklyAvailability.dayOfWeek));
  } catch {
    return [];
  }
}

export async function getBlockedDates() {
  try {
    return await db.select().from(blockedDates).orderBy(asc(blockedDates.date));
  } catch {
    return [];
  }
}

/**
 * Resolves whether a given "YYYY-MM-DD" date is bookable, and if so, which
 * time slots (from the weekly template) are still free. Shared by the public
 * /api/availability endpoint and the visit-request submit handler (which
 * re-validates server-side to prevent double-booking).
 */
export async function getAvailabilityForDate(dateStr: string) {
  const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return { open: false, reason: "تاريخ غير صحيح", slots: [] as { time: string; taken: boolean }[] };

  const [, y, mo, d] = m;
  const dayOfWeek = new Date(Date.UTC(Number(y), Number(mo) - 1, Number(d))).getUTCDay();

  try {
    const [blocked] = await db.select().from(blockedDates).where(eq(blockedDates.date, dateStr)).limit(1);
    if (blocked) {
      return { open: false, reason: blocked.reason || "هذا اليوم غير متاح", slots: [] as { time: string; taken: boolean }[] };
    }

    const [weekRow] = await db
      .select()
      .from(weeklyAvailability)
      .where(eq(weeklyAvailability.dayOfWeek, dayOfWeek))
      .limit(1);

    if (!weekRow || !weekRow.isOpen) {
      return { open: false, reason: "هذا اليوم غير متاح للمعاينة", slots: [] as { time: string; taken: boolean }[] };
    }

    const allSlots = weekRow.slots.split(",").map((s) => s.trim()).filter(Boolean);
    if (allSlots.length === 0) {
      return { open: false, reason: "لا توجد مواعيد متاحة في هذا اليوم", slots: [] as { time: string; taken: boolean }[] };
    }

    const booked = await db
      .select({ time: visitRequests.preferredTime })
      .from(visitRequests)
      .where(eq(visitRequests.preferredDateStr, dateStr));

    const takenTimes = new Set(
      booked.map((b) => b.time).filter((t): t is string => Boolean(t))
    );

    return {
      open: true,
      reason: null as string | null,
      slots: allSlots.map((time) => ({ time, taken: takenTimes.has(time) })),
    };
  } catch {
    // Tables not migrated yet — treat as unrestricted so the form still works.
    return { open: true, reason: null as string | null, slots: [] as { time: string; taken: boolean }[] };
  }
}

export async function getPackagesWithFeatures() {
  const pkgs = await db.select().from(packages).orderBy(asc(packages.order));
  const allFeatures = await db
    .select()
    .from(packageFeatures)
    .orderBy(asc(packageFeatures.order));

  return pkgs.map((pkg) => ({
    ...pkg,
    features: allFeatures.filter((f) => f.packageId === pkg.id),
  }));
}

export async function getPackagesBasic() {
  return db
    .select({
      id: packages.id,
      nameAr: packages.nameAr,
      nameEn: packages.nameEn,
      pricePerMeter: packages.pricePerMeter,
      downPaymentPct: packages.downPaymentPct,
    })
    .from(packages)
    .orderBy(asc(packages.order));
}

export async function getPackageBySlug(slug: string) {
  const [pkg] = await db.select().from(packages).where(eq(packages.slug, slug)).limit(1);
  if (!pkg) return null;
  const features = await db
    .select()
    .from(packageFeatures)
    .where(eq(packageFeatures.packageId, pkg.id))
    .orderBy(asc(packageFeatures.order));
  return { ...pkg, features };
}

export async function getVisitRequests() {
  return db.select().from(visitRequests).orderBy(desc(visitRequests.createdAt));
}
