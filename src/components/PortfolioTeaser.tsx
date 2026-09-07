"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";

const projects = [
  {
    name: "شقة رويال - التجمع الخامس",
    category: "سكني",
    before:
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=900&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "فيلا نيوكاسل - القاهرة الجديدة",
    category: "سكني",
    before:
      "https://images.unsplash.com/photo-1580237072353-751a8a5b2600?q=80&w=900&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=900&auto=format&fit=crop",
  },
];

const filters = ["الكل", "سكني", "تجاري"];

export default function PortfolioTeaser() {
  const [filter, setFilter] = useState("الكل");
  const visible = projects.filter((p) => filter === "الكل" || p.category === filter);

  return (
    <section className="py-24">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">
            Transformations
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink">
            شاهد سحر التحول المعماري
          </h2>
          <p className="mt-3 text-ink-soft">
            نحن لا نغير الديكور، نحن نعيد صياغة مفهوم الفراغ ليناسب أسلوب حياتك.
          </p>
        </Reveal>

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
              {f}
            </button>
          ))}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-8">
          {visible.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div className="group relative h-80 overflow-hidden rounded-3xl">
                <Image
                  src={p.before}
                  alt={`${p.name} - قبل`}
                  fill
                  className="object-cover"
                />
                <Image
                  src={p.after}
                  alt={`${p.name} - بعد`}
                  fill
                  className="object-cover opacity-0 transition duration-700 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="absolute top-4 right-4 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold text-white backdrop-blur transition group-hover:opacity-0">
                  BEFORE PHASE
                </span>
                <span className="absolute top-4 right-4 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-bold text-white opacity-0 transition group-hover:opacity-100">
                  AFTER TRANSFORMATION
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="font-bold">{p.name}</h3>
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

        <div className="mt-10 text-center">
          <Link
            href="/portfolio"
            className="inline-block rounded-full border border-gold px-8 py-3.5 font-bold text-gold hover:bg-gold hover:text-white transition"
          >
            معرض الأعمال بالكامل
          </Link>
        </div>
      </div>
    </section>
  );
}
