import Link from "next/link";
import PortfolioTeaser from "@/components/PortfolioTeaser";

export const metadata = {
  title: "سابقة أعمالنا | هاى ليفيل للتشطيبات",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="bg-ink text-white py-20">
        <div className="container-page text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold">معرض الأعمال</h1>
          <p className="mt-5 text-white/70 max-w-2xl mx-auto">
            شاهد نتائج إبداعنا في تشطيب الشقق والفلل بمختلف الباقات.
          </p>
        </div>
      </section>

      <PortfolioTeaser />

      <section className="pb-24 text-center">
        <div className="container-page rounded-3xl border border-black/10 bg-black/[0.02] py-16">
          <div className="text-4xl mb-4">🏗️</div>
          <h2 className="text-2xl font-extrabold text-ink">قريباً.. قصص نجاح جديدة</h2>
          <p className="mt-3 text-ink-soft">
            نحن حالياً في مرحلة التنفيذ لمشاريع كبرى، تابعونا.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full bg-gold-gradient px-8 py-3.5 font-bold text-white hover:opacity-90 transition"
          >
            كن أول من يشاهد مشروعنا القادم
          </Link>
        </div>
      </section>
    </>
  );
}
