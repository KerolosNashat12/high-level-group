"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import VisitBookingForm from "@/components/VisitBookingForm";

type Pkg = { id: number; nameAr: string; pricePerMeter: number; downPaymentPct: number };

const DURATIONS = [12, 24, 36, 48, 60];

function fmt(n: number) {
  return Math.round(n).toLocaleString("ar-EG");
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  // The input itself is forced to `direction: ltr` in globals.css, so its
  // thumb always travels min→max left→right — this percentage must match
  // that same left-to-right math, independent of the page's RTL layout.
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex justify-between text-sm font-bold text-ink mb-2">
        <span>{label}</span>
        <span className="text-gold">
          {fmt(value)} {unit}
        </span>
      </div>

      <div className="relative pt-7">
        <div
          className="absolute top-0 -translate-x-1/2 rounded-lg bg-ink text-white text-[11px] font-bold px-2 py-1 shadow-md transition-[left] duration-100 pointer-events-none"
          style={{ left: `${pct}%` }}
        >
          {fmt(value)} {unit}
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-ink" />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ ["--range-progress" as string]: `${pct}%` }}
          className="w-full"
        />
      </div>
      <div className="flex justify-between text-[11px] text-ink-soft mt-1" dir="ltr">
        <span>
          {fmt(min)} {unit}
        </span>
        <span>
          {fmt(max)} {unit}
        </span>
      </div>
    </div>
  );
}

export default function InstallmentCalculator({ packages }: { packages: Pkg[] }) {
  const [area, setArea] = useState(100);
  const [months, setMonths] = useState(24);
  const [pkgId, setPkgId] = useState(packages[1]?.id ?? packages[0]?.id);
  const [downPct, setDownPct] = useState(packages[1]?.downPaymentPct ?? 10);
  const [showBooking, setShowBooking] = useState(false);

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
    setShowBooking(false);
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

          <div className="space-y-10">
            <SliderField
              label="مساحة العقار"
              value={area}
              min={60}
              max={800}
              step={10}
              unit="م²"
              onChange={setArea}
            />

            <SliderField
              label="مقدم التعاقد"
              value={downPct}
              min={10}
              max={50}
              step={5}
              unit="%"
              onChange={setDownPct}
            />

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

          {!showBooking && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setShowBooking(true)}
                disabled={!selected}
                className="inline-block rounded-full bg-gold-gradient px-10 py-4 font-bold text-white hover:opacity-90 transition disabled:opacity-60"
              >
                طلب معاينة وتأكيد الباقة
              </button>
            </div>
          )}

          {showBooking && selected && (
            <VisitBookingForm
              snapshot={{
                packageId: selected.id,
                packageName: selected.nameAr,
                areaSqm: area,
                downPct,
                installmentMonths: months,
                monthlyInstallment: monthly,
                totalCost: total,
              }}
              onCancel={() => setShowBooking(false)}
            />
          )}
        </Reveal>
      </div>
    </section>
  );
}
