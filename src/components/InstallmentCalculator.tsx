"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";

type Pkg = { id: number; nameAr: string; pricePerMeter: number; downPaymentPct: number };

const DURATIONS = [12, 24, 36, 48, 60];

function fmt(n: number) {
  return Math.round(n).toLocaleString("ar-EG");
}

export default function InstallmentCalculator({ packages }: { packages: Pkg[] }) {
  const [area, setArea] = useState(100);
  const [months, setMonths] = useState(24);
  const [pkgId, setPkgId] = useState(packages[1]?.id ?? packages[0]?.id);
  const [downPct, setDownPct] = useState(packages[1]?.downPaymentPct ?? 10);

  const selected = packages.find((p) => p.id === pkgId) ?? packages[0];

  const { total, down, monthly } = useMemo(() => {
    if (!selected) return { total: 0, down: 0, monthly: 0 };
    const total = area * selected.pricePerMeter;
    const down = total * (downPct / 100);
    const monthly = (total - down) / months;
    return { total, down, monthly };
  }, [area, months, selected, downPct]);

  function selectPkg(p: Pkg) {
    setPkgId(p.id);
    setDownPct(p.downPaymentPct);
  }

  return (
    <section id="calculator" className="py-24 bg-black/[0.02]">
      <div className="container-page max-w-4xl">
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">
            Financial Planning
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink">
            محرك التقسيط الذكي
          </h2>
          <p className="mt-3 text-ink-soft">
            SMART FINANCING ENGINE — احسب تكلفة مشروعك وقسطك الشهري التقديري فورًا
          </p>
        </Reveal>

        <Reveal delay={100} className="rounded-3xl border border-black/10 bg-white p-6 sm:p-10 shadow-sm">
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {packages.map((p) => (
              <button
                key={p.id}
                onClick={() => selectPkg(p)}
                className={`rounded-2xl border-2 p-4 text-right transition ${
                  pkgId === p.id
                    ? "border-gold bg-gold/5"
                    : "border-black/10 hover:border-gold/40"
                }`}
              >
                <div className="font-bold text-ink text-sm">{p.nameAr}</div>
                <div className="mt-1 text-lg font-extrabold text-gold">
                  {fmt(p.pricePerMeter)}{" "}
                  <span className="text-xs font-normal text-ink-soft">ج.م/م²</span>
                </div>
              </button>
            ))}
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex justify-between text-sm font-bold text-ink mb-2">
                <span>مساحة العقار</span>
                <span className="text-gold">{area} م²</span>
              </div>
              <input
                type="range"
                min={60}
                max={800}
                step={10}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                style={{ ["--range-progress" as string]: `${((area - 60) / (800 - 60)) * 100}%` }}
                className="w-full"
              />
              <div className="flex justify-between text-[11px] text-ink-soft mt-1">
                <span>60 م²</span>
                <span>800 م²</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold text-ink mb-2">
                <span>مقدم التعاقد</span>
                <span className="text-gold">{downPct}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={downPct}
                onChange={(e) => setDownPct(Number(e.target.value))}
                style={{ ["--range-progress" as string]: `${((downPct - 10) / (50 - 10)) * 100}%` }}
                className="w-full"
              />
            </div>

            <div>
              <div className="text-sm font-bold text-ink mb-2">مدة التقسيط المفضلة</div>
              <div className="flex flex-wrap gap-2">
                {DURATIONS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMonths(m)}
                    className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                      months === m
                        ? "bg-gold-gradient text-white"
                        : "border border-black/10 text-ink-soft hover:border-gold/40"
                    }`}
                  >
                    {m} شهر
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid sm:grid-cols-3 gap-4 text-center">
            <div className="rounded-2xl bg-ink text-white p-6">
              <div className="text-xs text-white/50 mb-2">التكلفة التقديرية للمشروع</div>
              <div className="text-2xl font-extrabold">{fmt(total)} <span className="text-sm font-normal">ج.م</span></div>
            </div>
            <div className="rounded-2xl border border-black/10 p-6">
              <div className="text-xs text-ink-soft mb-2">مقدم التعاقد ({downPct}%)</div>
              <div className="text-2xl font-extrabold text-ink">{fmt(down)} <span className="text-sm font-normal">ج.م</span></div>
            </div>
            <div className="rounded-2xl bg-gold-gradient text-white p-6">
              <div className="text-xs text-white/80 mb-2">القسط الشهري التقديري</div>
              <div className="text-2xl font-extrabold">{fmt(monthly)} <span className="text-sm font-normal">ج.م/ش</span></div>
            </div>
          </div>

          <p className="mt-6 text-[11px] text-ink-soft/70 leading-relaxed">
            ** هذه الأسعار تقديرية تخضع لمعايير الجودة العالمية لدى هاى ليفيل
            وبناءً على معاينة الموقع الفعلية. المحارة تُحسب بسعر 350 ج.م/م²،
            الجبس بورد الإضافي 550 ج.م/م² شامل الدهان، والألوميتال الإضافي
            3,200 ج.م/م² شامل الزجاج والسلك.
          </p>

          <div className="mt-6 text-center">
            <Link
              href="#visit-request"
              className="inline-block rounded-full bg-gold-gradient px-10 py-4 font-bold text-white hover:opacity-90 transition"
            >
              طلب معاينة وتأكيد الباقة
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
