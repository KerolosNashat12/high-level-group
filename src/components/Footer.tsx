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

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-page py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <span className="text-xl font-extrabold">
            HIGH <span className="text-gold">LEVEL</span>
          </span>
          <p className="mt-3 text-sm text-white/60 leading-relaxed">
            شركة متخصصة في تشطيب الشقق والفلل بأنظمة تقسيط مريحة في القاهرة والجيزة.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-gold transition" aria-label="فيسبوك">
              <FacebookIcon />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-gold transition" aria-label="انستجرام">
              <InstagramIcon />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-gold transition" aria-label="واتساب">
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4">روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href="/" className="hover:text-gold">الرئيسية</Link></li>
            <li><Link href="/packages" className="hover:text-gold">الباقات</Link></li>
            <li><Link href="/about" className="hover:text-gold">من نحن</Link></li>
            <li><Link href="/contact" className="hover:text-gold">تواصل معنا</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">الباقات</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href="/packages#economy" className="hover:text-gold">باقة التوفير</Link></li>
            <li><Link href="/packages#super" className="hover:text-gold">باقة السوبر</Link></li>
            <li><Link href="/packages#ultra-luxury" className="hover:text-gold">باقة ألترا لوكس</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">تواصل معنا</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex items-center gap-2"><Phone size={16} className="text-gold" /> 01000000000</li>
            <li className="flex items-center gap-2"><Mail size={16} className="text-gold" /> info@highlevelgroup.com</li>
            <li className="flex items-center gap-2"><MapPin size={16} className="text-gold" /> القاهرة والجيزة، مصر</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} High Level Group. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
