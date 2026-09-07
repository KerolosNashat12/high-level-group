import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";

const schema = z.object({
  logoUrl: z.string().nullable().optional(),
  whatsappNumber: z.string().min(5).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().min(5).optional(),
  address: z.string().optional(),
  facebookUrl: z.string().nullable().optional(),
  facebookEnabled: z.boolean().optional(),
  instagramUrl: z.string().nullable().optional(),
  instagramEnabled: z.boolean().optional(),
  tiktokUrl: z.string().nullable().optional(),
  tiktokEnabled: z.boolean().optional(),
  youtubeUrl: z.string().nullable().optional(),
  youtubeEnabled: z.boolean().optional(),
  linkedinUrl: z.string().nullable().optional(),
  linkedinEnabled: z.boolean().optional(),
  heroTitleAr: z.string().nullable().optional(),
  heroTitleEn: z.string().nullable().optional(),
  heroSubtitleAr: z.string().nullable().optional(),
  heroSubtitleEn: z.string().nullable().optional(),
  aboutTextAr: z.string().nullable().optional(),
  aboutTextEn: z.string().nullable().optional(),
  workingHoursAr: z.string().nullable().optional(),
  workingHoursEn: z.string().nullable().optional(),
  mapUrl: z.string().nullable().optional(),
  seoTitleAr: z.string().nullable().optional(),
  seoTitleEn: z.string().nullable().optional(),
  seoDescriptionAr: z.string().nullable().optional(),
  seoDescriptionEn: z.string().nullable().optional(),
});

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "بيانات غير صحيحة" },
      { status: 400 }
    );
  }

  await db
    .insert(siteSettings)
    .values({ id: 1, ...parsed.data, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: siteSettings.id,
      set: { ...parsed.data, updatedAt: new Date() },
    });

  return NextResponse.json({ ok: true });
}
