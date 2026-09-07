import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { packages, packageFeatures, visitRequests, contactMessages } from "@/db/schema";

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

export async function getContactMessages() {
  return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
}
