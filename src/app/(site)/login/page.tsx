import Link from "next/link";
import { MessageCircle } from "lucide-react";

export const metadata = {
  title: "بوابة العملاء | هاى ليفيل للتشطيبات",
};

export default function ClientLoginPage() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-ink text-white py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-ink to-ink" />
      <div className="container-page relative max-w-md text-center">
        <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase">
          High Level Identity
        </span>
        <h1 className="mt-4 text-3xl font-extrabold">بوابة العملاء</h1>
        <p className="mt-4 text-white/60 leading-relaxed">
          بوابتك الخاصة لمتابعة تطورات مشروعك وأقساطك ومخططاتك الهندسية قيد
          التطوير حاليًا وستكون متاحة قريبًا.
        </p>
        <p className="mt-2 text-white/60 leading-relaxed">
          لحين إطلاقها، تواصل مباشرة مع فريقنا للاستفسار عن حالة مشروعك.
        </p>
        <a
          href="https://wa.me/201080146022"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-8 py-4 font-bold hover:opacity-90 transition"
        >
          <MessageCircle size={18} /> تواصل عبر واتساب
        </a>
        <div className="mt-6">
          <Link href="/" className="text-sm text-white/40 hover:text-gold">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </section>
  );
}
