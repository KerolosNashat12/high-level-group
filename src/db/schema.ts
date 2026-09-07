import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  serial,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const packages = pgTable("packages", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en").notNull(),
  tagline: text("tagline"),
  taglineEn: text("tagline_en"),
  pricePerMeter: integer("price_per_meter").notNull(),
  downPaymentPct: integer("down_payment_pct").notNull(),
  installmentMonths: integer("installment_months").notNull(),
  color: text("color").notNull().default("#b48b4e"),
  featured: boolean("featured").notNull().default(false),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const packageFeatures = pgTable("package_features", {
  id: serial("id").primaryKey(),
  packageId: integer("package_id")
    .notNull()
    .references(() => packages.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  labelEn: text("label_en"),
  order: integer("order").notNull().default(0),
});

export const visitRequests = pgTable("visit_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  city: text("city").notNull(),
  area: text("area"),
  district: text("district"),
  propertyType: text("property_type"),
  packageId: integer("package_id").references(() => packages.id),
  // Snapshot of the calculator selection at submission time, so the dashboard
  // always shows exactly what the customer confirmed, even if the package or
  // its pricing changes later.
  packageNameSnapshot: text("package_name_snapshot"),
  areaSqm: integer("area_sqm"),
  downPct: integer("down_pct"),
  installmentMonths: integer("installment_months"),
  monthlyInstallment: integer("monthly_installment"),
  totalCost: integer("total_cost"),
  preferredDate: timestamp("preferred_date"),
  // "YYYY-MM-DD" — kept alongside preferredDate for easy, timezone-safe availability lookups.
  preferredDateStr: text("preferred_date_str"),
  // "HH:MM" — the booked time slot, matched against weeklyAvailability.slots.
  preferredTime: text("preferred_time"),
  notes: text("notes"),
  status: text("status").notNull().default("new"), // new, contacted, scheduled, done, cancelled
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Singleton row (id = 1) holding global site branding & contact/social settings,
// editable from the admin dashboard.
export const siteSettings = pgTable("site_settings", {
  id: integer("id").primaryKey().default(1),
  logoUrl: text("logo_url"),
  whatsappNumber: text("whatsapp_number").notNull().default("201080146022"),
  contactEmail: text("contact_email").notNull().default("Info@highlevel.com"),
  contactPhone: text("contact_phone").notNull().default("01080146022"),
  address: text("address").notNull().default("2116 المعراج العلوى، زهراء المعادى، القاهرة"),
  facebookUrl: text("facebook_url"),
  facebookEnabled: boolean("facebook_enabled").notNull().default(false),
  instagramUrl: text("instagram_url"),
  instagramEnabled: boolean("instagram_enabled").notNull().default(false),
  tiktokUrl: text("tiktok_url"),
  tiktokEnabled: boolean("tiktok_enabled").notNull().default(false),
  youtubeUrl: text("youtube_url"),
  youtubeEnabled: boolean("youtube_enabled").notNull().default(false),
  linkedinUrl: text("linkedin_url"),
  linkedinEnabled: boolean("linkedin_enabled").notNull().default(false),
  heroTitleAr: text("hero_title_ar"),
  heroTitleEn: text("hero_title_en"),
  heroSubtitleAr: text("hero_subtitle_ar"),
  heroSubtitleEn: text("hero_subtitle_en"),
  aboutTextAr: text("about_text_ar"),
  aboutTextEn: text("about_text_en"),
  workingHoursAr: text("working_hours_ar"),
  workingHoursEn: text("working_hours_en"),
  mapUrl: text("map_url"),
  seoTitleAr: text("seo_title_ar"),
  seoTitleEn: text("seo_title_en"),
  seoDescriptionAr: text("seo_description_ar"),
  seoDescriptionEn: text("seo_description_en"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const portfolioProjects = pgTable("portfolio_projects", {
  id: serial("id").primaryKey(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en"),
  category: text("category").notNull().default("سكني"), // سكني | تجاري
  beforeImageUrl: text("before_image_url"),
  afterImageUrl: text("after_image_url"),
  order: integer("order").notNull().default(0),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// One row per weekday (0 = Sunday ... 6 = Saturday, matching JS Date#getDay()).
export const weeklyAvailability = pgTable("weekly_availability", {
  id: serial("id").primaryKey(),
  dayOfWeek: integer("day_of_week").notNull().unique(),
  isOpen: boolean("is_open").notNull().default(true),
  slots: text("slots").notNull().default(""), // comma-separated "HH:MM" values
});

// Specific closed calendar dates (holidays, fully-booked days, etc).
export const blockedDates = pgTable("blocked_dates", {
  id: serial("id").primaryKey(),
  date: text("date").notNull().unique(), // "YYYY-MM-DD"
  reason: text("reason"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Egypt's 27 governorates — admin can enable/disable which ones the booking
// form offers, independent of the (separate) districts table below.
export const governorates = pgTable("governorates", {
  id: serial("id").primaryKey(),
  nameAr: text("name_ar").notNull().unique(),
  nameEn: text("name_en"),
  enabled: boolean("enabled").notNull().default(true),
  order: integer("order").notNull().default(0),
});

// Districts/areas belonging to a governorate. Admin can enable/disable each
// one individually; the booking form always also offers a free-text
// "other, please specify" option per governorate regardless of this list.
export const districts = pgTable("districts", {
  id: serial("id").primaryKey(),
  governorateId: integer("governorate_id")
    .notNull()
    .references(() => governorates.id, { onDelete: "cascade" }),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en"),
  enabled: boolean("enabled").notNull().default(true),
  order: integer("order").notNull().default(0),
});

export const governoratesRelations = relations(governorates, ({ many }) => ({
  districts: many(districts),
}));

export const districtsRelations = relations(districts, ({ one }) => ({
  governorate: one(governorates, {
    fields: [districts.governorateId],
    references: [governorates.id],
  }),
}));

export const packagesRelations = relations(packages, ({ many }) => ({
  features: many(packageFeatures),
  visitRequests: many(visitRequests),
}));

export const packageFeaturesRelations = relations(packageFeatures, ({ one }) => ({
  package: one(packages, {
    fields: [packageFeatures.packageId],
    references: [packages.id],
  }),
}));

export const visitRequestsRelations = relations(visitRequests, ({ one }) => ({
  package: one(packages, {
    fields: [visitRequests.packageId],
    references: [packages.id],
  }),
}));
