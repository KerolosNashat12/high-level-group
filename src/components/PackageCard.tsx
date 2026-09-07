"use client";

import Link from "next/link";
import { Check, Star } from "lucide-react";

type Feature = { id: number; label: string };
type Pkg = {
  id: number;
  slug: string;
  nameAr: string;
  tagline: string | null;
  pricePerMeter: number;
  downPaymentPct: number;
  installmentMonths: number;
  color: string;
  featured: boolean;
  features: Feature[];
};

export default function PackageCard({ pkg }: { pkg: Pkg }) {
  return (
    <div
      id={pkg.slug}
      className={`relative rounded-3xl border p-8 flex flex-col ${
        pkg.featured
          ? "border-gold shadow-xl shadow-gold/10 scale-[1.02] bg-white"
          : "border-black/10 bg-white"
      }`}
    >
      {pkg.featured && (
        <span className="absolute -top-3 right-8 flex items-center gap-1 rounded-full bg-gold-gradient text-white text-xs font-bold px-3 py-1">
          <Star size={12} fill="white" /> الأكثر طلبًا
        </span>
      )}

      <h3 className="text-xl font-extrabold" style={{ color: pkg.color }}>
        {pkg.nameAr}
      </h3>
      {pkg.tagline && <p className="text-sm text-ink-soft mt-1">{pkg.tagline}</p>}

      <div className="mt-6">
        <span className="text-3xl font-extrabold text-ink">
          {pkg.pricePerMeter.toLocaleString("ar-EG")}
        </span>
        <span className="text-sm text-ink-soft"> جنيه / متر</span>
      </div>
      <div className="mt-2 text-sm text-ink-soft">
        مقدم {pkg.downPaymentPct}% وتقسيط حتى {pkg.installmentMonths} شهر
      </div>

      <ul className="mt-6 space-y-3 flex-1">
        {pkg.features.map((f) => (
          <li key={f.id} className="flex items-start gap-2 text-sm text-ink-soft">
            <Check size={16} className="text-gold mt-0.5 shrink-0" />
            {f.label}
          </li>
        ))}
      </ul>

      <Link
        href={`/packages#visit-request?package=${pkg.id}`}
        className="mt-8 text-center rounded-xl border-2 font-bold py-3 transition hover:text-white"
        style={{ borderColor: pkg.color, color: pkg.color }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = pkg.color)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
      >
        اطلب معاينة لهذه الباقة
      </Link>
    </div>
  );
}
