"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";

type Project = {
  id: number;
  nameAr: string;
  nameEn?: string | null;
  category: string;
  beforeImageUrl: string | null;
  afterImageUrl: string | null;
};

const CATEGORY_LABEL: Record<string, string> = {
  "سكني": "Residential",
  "تجاري": "Commercial",
};

const FILTERS: Record<"ar" | "en", string[]> = {
  ar: ["الكل", "سكني", "تجاري"],
  en: ["All", "سكني", "تجاري"],
};

export default function PortfolioTeaser({
  projects,
  lang = "ar",
}: {
  projects: Project[];
  lang?: "ar" | "en";
}) {
  const isEn = lang === "en";
  const filters = FILTERS[lang];
  const allLabel = filters[0];
  const [filter, setFilter] = useState(allLabel);
  const visible = projects.filter((p) => filter === allLabel || p.category === filter);

  function displayName(p: Project) {
    return isEn ? p.nameEn || p.nameAr : p.nameAr;
  }

  function displayCategory(f: string) {
    if (f === allLabel) return isEn ? "All" : "الكل";
    return isEn ? CATEGORY_LABEL[f] || f : f;
  }

  return (
    <section className="py-24">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">
            Transformations
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink">
            {isEn ? "Witness the Magic of Architectural Transformation" : "شاهد سحر التحول المعماري"}
          </h2>
          <p className="mt-3 text-ink-soft">
            {isEn
              ? "We don't just change the decor — we reshape the concept of space to fit your lifestyle."
              : "نحن لا نغير الديكور، نحن نعيد صياغة مفهوم الفراغ ليناسب أسلوب حياتك."}
          </p>
        </Reveal>

        {projects.length > 0 && (
          <div className="mt-8 flex justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                  filter === f
                    ? "bg-gold-gradient text-white"
                    : "border border-black/10 text-ink-soft hover:border-gold/40"
                }`}
              >
                {displayCategory(f)}
              </button>
            ))}
          </div>
        )}

        {visible.length > 0 ? (
          <>
            <div className="mt-8 grid sm:grid-cols-2 gap-8">
              {visible.map((p, i) => (
                <Reveal key={p.id} delay={i * 100}>
                  <div className="group relative h-80 overflow-hidden rounded-3xl bg-black/5">
                    {p.beforeImageUrl && (
                      <Image
                        src={p.beforeImageUrl}
                        alt={`${displayName(p)} - ${isEn ? "Before" : "قبل"}`}
                        fill
                        unoptimized={p.beforeImageUrl.startsWith("data:")}
                        className="object-cover"
                      />
                    )}
                    {p.afterImageUrl && (
                      <Image
                        src={p.afterImageUrl}
                        alt={`${displayName(p)} - ${isEn ? "After" : "بعد"}`}
                        fill
                        unoptimized={p.afterImageUrl.startsWith("data:")}
                        className="object-cover opacity-0 transition duration-700 group-hover:opacity-100"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <span className="absolute top-4 right-4 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold text-white backdrop-blur transition group-hover:opacity-0">
                      BEFORE PHASE
                    </span>
                    <span className="absolute top-4 right-4 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-bold text-white opacity-0 transition group-hover:opacity-100">
                      AFTER TRANSFORMATION
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <h3 className="font-bold">{displayName(p)}</h3>
                      <span className="text-[10px] uppercase tracking-widest text-white/60">
                        Architectural Metamorphosis
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-ink-soft/60 uppercase tracking-widest">
              Hover to reveal the architecture
            </p>
          </>
        ) : (
          <div className="mt-10 text-center rounded-3xl border border-black/10 bg-black/[0.02] py-16">
            <div className="text-4xl mb-4">🏗️</div>
            <p className="text-ink-soft">
              {projects.length === 0
                ? isEn
                  ? "We're currently working on major projects — stay tuned."
                  : "نحن حالياً في مرحلة التنفيذ لمشاريع كبرى، تابعونا قريبًا."
                : isEn
                ? "There are no projects in this category at the moment."
                : "لا توجد مشاريع في هذا التصنيف حاليًا."}
            </p>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href={isEn ? "/en/portfolio" : "/portfolio"}
            className="inline-block rounded-full border border-gold px-8 py-3.5 font-bold text-gold hover:bg-gold hover:text-white transition"
          >
            {isEn ? "View the Full Portfolio" : "معرض الأعمال بالكامل"}
          </Link>
        </div>
      </div>
    </section>
  );
}
