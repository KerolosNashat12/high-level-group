import Link from "next/link";
import ServicesGrid from "@/components/ServicesGrid";

export const metadata = {
  title: "خدمات التشطيب والديكور | هاى ليفيل للتشطيبات",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-ink text-white py-20">
        <div className="container-page text-center">
          <Link href="/" className="text-xs text-white/50 hover:text-gold">
            العودة للرئيسية
          </Link>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold">خدماتنا المعمارية</h1>
          <p className="mt-5 text-white/70 max-w-2xl mx-auto leading-relaxed italic">
            &ldquo;حلول متكاملة وإبداع هندسي يحول منزلك إلى تحفة فنية، مع أدق
            التفاصيل وأفضل أنظمة التقسيط.&rdquo;
          </p>
        </div>
      </section>

      <ServicesGrid />

      <section className="py-20 bg-ink text-white text-center">
        <div className="container-page">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-balance max-w-xl mx-auto italic">
            &ldquo;لا تكتفِ بالسكن، عش الرفاهية في كل زاوية من منزلك مع أفضل
            فريق هندسي في مصر.&rdquo;
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/packages#calculator"
              className="rounded-full bg-gold-gradient px-8 py-4 font-bold hover:opacity-90 transition"
            >
              اطلب معاينة الآن
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border border-white/30 px-8 py-4 font-bold hover:bg-white/10 transition"
            >
              مشاهدة سابقة أعمالنا
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
