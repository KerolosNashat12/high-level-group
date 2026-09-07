"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Sparkles } from "lucide-react";

export default function Hero({
  title,
  subtitle,
}: {
  title?: string | null;
  subtitle?: string | null;
} = {}) {
  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-ink text-white">
      <Image
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop"
        alt="تشطيب فاخر لشقة"
        fill
        priority
        className="object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-l from-ink/20 via-transparent to-ink/60" />

      <div className="container-page relative pb-20 pt-40 w-full">
        <div className="max-w-3xl animate-fade-up">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-gold" />
            <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">
              Exceptional Architecture
            </span>
          </div>

          {title ? (
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.15] text-balance">
              {title}
            </h1>
          ) : (
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.15] text-balance">
              تشطيب شقق
              <br />
              <span className="text-gold italic">بالتقسيط في مصر</span>
            </h1>
          )}

          <p className="mt-6 text-white/70 text-base sm:text-lg leading-relaxed max-w-xl">
            {subtitle ||
              "الخيار الأول للرفاهية والتميز. نقدم حلول تشطيب ذكية بـ 3 باقات عالمية تجمع بين الفن المعماري وأسهل أنظمة سداد."}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/packages#calculator"
              className="rounded-full bg-gold-gradient px-8 py-4 font-bold hover:opacity-90 transition shadow-lg shadow-gold/20"
            >
              ابدأ مشروعك الآن
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-ai-assistant"))}
              className="flex items-center gap-2 rounded-full border border-white/25 px-6 py-4 font-bold hover:bg-white/10 transition"
            >
              <Sparkles size={18} className="text-gold" />
              المساعد الذكي
            </button>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-2 text-white/50 text-xs">
          <span>اسحب للأسفل</span>
          <ChevronDown className="animate-bounce-slow" size={18} />
        </div>
      </div>
    </section>
  );
}
