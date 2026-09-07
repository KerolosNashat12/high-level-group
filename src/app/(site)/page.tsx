import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Wallet,
  Clock,
  Hammer,
  Star,
  ArrowLeft,
} from "lucide-react";
import { getPackagesWithFeatures } from "@/lib/data";
import PackageCard from "@/components/PackageCard";
import VisitRequestForm from "@/components/VisitRequestForm";

export const dynamic = "force-dynamic";

const stats = [
  { label: "مشروع تم تسليمه", value: "+250" },
  { label: "سنوات خبرة", value: "+10" },
  { label: "عميل راضٍ", value: "+500" },
  { label: "مهندس ومشرف", value: "+30" },
];

const whyUs = [
  {
    icon: Wallet,
    title: "أنظمة تقسيط مرنة",
    desc: "مقدم يبدأ من 10% وتقسيط يصل حتى 48 شهر بدون فوائد.",
  },
  {
    icon: ShieldCheck,
    title: "ضمان حتى 10 سنوات",
    desc: "ضمان شامل على التنفيذ والخامات حسب الباقة المختارة.",
  },
  {
    icon: Clock,
    title: "التزام بالمواعيد",
    desc: "جدول زمني واضح ومتابعة يومية لضمان التسليم في الموعد.",
  },
  {
    icon: Hammer,
    title: "إشراف هندسي كامل",
    desc: "فريق هندسي متخصص يشرف على كل مرحلة من التنفيذ.",
  },
];

export default async function HomePage() {
  const packages = await getPackagesWithFeatures();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 bg-gold-gradient opacity-10" />
        <div className="container-page relative py-24 sm:py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block rounded-full bg-gold/20 text-gold text-xs font-bold px-4 py-1.5 mb-6">
              تشطيب شقق وفلل بالتقسيط
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-balance">
              صمم بيت أحلامك مع{" "}
              <span className="text-gold">هاى ليفيل جروب</span>
            </h1>
            <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-xl">
              باقات تشطيب ذكية بالتقسيط المريح في القاهرة والجيزة — من التصميم
              وحتى التسليم، بإشراف هندسي كامل وضمان يصل لـ 10 سنوات.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#visit-request"
                className="rounded-full bg-gold-gradient px-8 py-4 font-bold hover:opacity-90 transition"
              >
                اطلب معاينة مجانية
              </Link>
              <Link
                href="/packages"
                className="rounded-full border border-white/30 px-8 py-4 font-bold hover:bg-white/10 transition flex items-center gap-2"
              >
                شاهد الباقات <ArrowLeft size={18} />
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
              alt="تشطيب فاخر لشقة"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-black/5">
        <div className="container-page py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold text-gold">{s.value}</div>
              <div className="text-sm text-ink-soft mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="py-20">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-ink">ليه تختار هاى ليفيل جروب؟</h2>
            <p className="mt-3 text-ink-soft">
              خبرة طويلة وفريق متكامل يضمن لك تشطيب بأعلى جودة وأنسب سعر.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item) => (
              <div key={item.title} className="rounded-2xl border border-black/10 p-6">
                <item.icon className="text-gold" size={28} />
                <h3 className="mt-4 font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages preview */}
      <section className="py-20 bg-black/[0.02]">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1 text-gold text-sm font-bold">
              <Star size={14} fill="currentColor" /> باقاتنا
            </span>
            <h2 className="text-3xl font-extrabold text-ink mt-2">اختار الباقة المناسبة لك</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Visit request */}
      <section id="visit-request" className="py-20">
        <div className="container-page max-w-2xl">
          <div className="rounded-3xl border border-black/10 p-8 sm:p-10 shadow-sm">
            <VisitRequestForm
              packages={packages.map((p) => ({ id: p.id, nameAr: p.nameAr }))}
            />
          </div>
        </div>
      </section>
    </>
  );
}
