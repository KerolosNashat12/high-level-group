import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.16 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.78 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

const keywords = [
  "تشطيب شقق", "ديكورات داخلية", "تقسيط تشطيب", "تصميم معماري",
  "واجهات فلل", "باقات ذكية", "التجمع الخامس", "زايد والشيخ زايد", "أرقى أحياء القاهرة",
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-page py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <span className="text-xl font-extrabold">
            HIGH <span className="text-gold">LEVEL</span>
          </span>
          <div className="text-[10px] tracking-[0.2em] text-white/40 uppercase mt-1">
            Where Luxury Meets Precision
          </div>
          <p className="mt-4 text-sm text-white/60 leading-relaxed italic">
            &ldquo;نحن لا نبني جدراناً، بل نصيغ تجارب إنسانية راقية. هاى ليفيل
            هي شريكك الأمثل لتحويل مساحة أحلامك إلى حقيقة تتخطى التوقعات.&rdquo;
          </p>
          <div className="flex gap-3 mt-5">
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-gold transition" aria-label="فيسبوك">
              <FacebookIcon />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-gold transition" aria-label="انستجرام">
              <InstagramIcon />
            </a>
            <a href="https://wa.me/201080146022" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-gold transition" aria-label="واتساب">
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4">روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href="/about" className="hover:text-gold">عن الشركة</Link></li>
            <li><Link href="/" className="hover:text-gold">الرئيسية</Link></li>
            <li><Link href="/portfolio" className="hover:text-gold">أعمالنا</Link></li>
            <li><Link href="/services" className="hover:text-gold">خدماتنا</Link></li>
            <li><Link href="/packages" className="hover:text-gold">باقات التقسيط</Link></li>
            <li><Link href="/blog" className="hover:text-gold">المدونة</Link></li>
            <li><Link href="/contact" className="hover:text-gold">اتصل بنا</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">تواصل معنا</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
              2116 المعراج العلوى، زهراء المعادى، القاهرة
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-gold" /> 01080146022
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-gold" /> info@highlevel.com
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">كلمات شائعة</h4>
          <div className="flex flex-wrap gap-2">
            {keywords.map((k) => (
              <span
                key={k}
                className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/50"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <span>© {new Date().getFullYear()} هاى ليفيل للتشطيبات والديكور. جميع الحقوق محفوظة.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gold">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-gold">الشروط والأحكام</Link>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold">
            <span className="rounded border border-white/15 px-2 py-1">INSTAPAY</span>
            <span className="rounded border border-white/15 px-2 py-1">MEEZA</span>
            <span className="rounded border border-white/15 px-2 py-1">ORANGE CASH</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
