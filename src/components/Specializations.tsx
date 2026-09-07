import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Reveal from "@/components/Reveal";

const items = [
  {
    title: "شقق سكنية",
    desc: "تشطيب شقق سكنية بأعلى المعايير الفندقية.",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "فيلات وقصور",
    desc: "تصميم وتنفيذ لاندسكيب وتشطيبات داخلية فاخرة.",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "مكاتب وإداري",
    desc: "بيئة عمل محفزة بتصاميم عصرية وعملية.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "محلات ومولات",
    desc: "جذب العملاء بتصاميم تجارية مبتكرة ومميزة.",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
  },
];

const WHATSAPP_NUMBER = "201080146022";

export default function Specializations() {
  return (
    <section className="py-24 bg-black/[0.02]">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink">تخصصاتنا المعمارية</h2>
          <p className="mt-3 text-ink-soft">حلول متكاملة لجميع أنواع العقارات</p>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="group relative h-72 overflow-hidden rounded-2xl">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="mt-1 text-xs text-white/70 leading-relaxed">{item.desc}</p>
                  <div className="mt-4 flex flex-col gap-2 opacity-0 translate-y-2 transition group-hover:opacity-100 group-hover:translate-y-0">
                    <Link
                      href="/portfolio"
                      className="flex items-center justify-center gap-1 rounded-full bg-white/15 backdrop-blur px-3 py-2 text-[11px] font-bold hover:bg-white/25"
                    >
                      استكشف المشاريع <ArrowLeft size={12} />
                    </Link>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 rounded-full bg-gold-gradient px-3 py-2 text-[11px] font-bold"
                    >
                      <MessageCircle size={12} /> استفسار عبر واتساب
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
