import Link from "next/link";

export const metadata = {
  title: "مدونة التشطيب والديكور | هاى ليفيل للتشطيبات",
};

export default function BlogPage() {
  return (
    <section className="py-32">
      <div className="container-page text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink">
          مدونة التشطيب والديكور
        </h1>
        <p className="mt-4 text-ink-soft">لا يوجد مقالات منشورة حالياً.</p>
        <p className="text-ink-soft">ترقبوا مقالاتنا الحصرية قريباً جداً.</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-gold-gradient px-8 py-3.5 font-bold text-white hover:opacity-90 transition"
        >
          العودة للرئيسية
        </Link>
      </div>
    </section>
  );
}
