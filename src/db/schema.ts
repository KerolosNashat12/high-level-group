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
  order: integer("order").notNull().default(0),
});

export const visitRequests = pgTable("visit_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  city: text("city").notNull(),
  area: text("area"),
  propertyType: text("property_type"),
  packageId: integer("package_id").references(() => packages.id),
  preferredDate: timestamp("preferred_date"),
  notes: text("notes"),
  status: text("status").notNull().default("new"), // new, contacted, scheduled, done, cancelled
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

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
