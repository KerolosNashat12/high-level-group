import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";

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

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82c-.7-.77-1.1-1.77-1.1-2.82h-3.05v13.44a2.59 2.59 0 0 1-4.66 1.55 2.59 2.59 0 0 1 2.28-4.29c.27 0 .53.04.78.11V10.7a5.6 5.6 0 0 0-.78-.06 5.65 5.65 0 1 0 5.65 5.65V9.4a8.2 8.2 0 0 0 4.8 1.53V7.88a4.85 4.85 0 0 1-3.92-2.06Z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.4 3.6 12 3.6 12 3.6s-7.4 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c2 .5 9.4.5 9.4.5s7.4 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4.03 0 4.78 2.6 4.78 6V21h-4v-5.6c0-1.35-.03-3.1-1.9-3.1-1.9 0-2.2 1.48-2.2 3v5.7h-4V9Z" />
    </svg>
  );
}

const KEYWORDS: Record<"ar" | "en", string[]> = {
  ar: ["تشطيب شقق", "ديكورات داخلية", "تقسيط تشطيب", "تصميم معماري", "واجهات فلل", "باقات ذكية", "التجمع الخامس", "زايد والشيخ زايد", "أرقى أحياء القاهرة"],
  en: ["Apartment Finishing", "Interior Decor", "Installment Finishing", "Architectural Design", "Villa Facades", "Smart Packages", "5th Settlement", "Zayed & Sheikh Zayed", "Cairo's Finest Districts"],
};

type Settings = {
  whatsappNumber: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  facebookUrl: string | null;
  facebookEnabled: boolean;
  instagramUrl: string | null;
  instagramEnabled: boolean;
  tiktokUrl: string | null;
  tiktokEnabled: boolean;
  youtubeUrl: string | null;
  youtubeEnabled: boolean;
  linkedinUrl: string | null;
  linkedinEnabled: boolean;
  workingHours?: string | null;
  mapUrl: string | null;
};

export default function Footer({ settings, lang = "ar" }: { settings: Settings; lang?: "ar" | "en" }) {
  const isEn = lang === "en";
  const p = isEn ? "/en" : "";
  const socials = [
    { enabled: settings.facebookEnabled, url: settings.facebookUrl, icon: <FacebookIcon />, label: isEn ? "Facebook" : "فيسبوك" },
    { enabled: settings.instagramEnabled, url: settings.instagramUrl, icon: <InstagramIcon />, label: isEn ? "Instagram" : "انستجرام" },
    { enabled: settings.tiktokEnabled, url: settings.tiktokUrl, icon: <TikTokIcon />, label: isEn ? "TikTok" : "تيك توك" },
    { enabled: settings.youtubeEnabled, url: settings.youtubeUrl, icon: <YoutubeIcon />, label: isEn ? "YouTube" : "يوتيوب" },
    { enabled: settings.linkedinEnabled, url: settings.linkedinUrl, icon: <LinkedinIcon />, label: isEn ? "LinkedIn" : "لينكدإن" },
  ].filter((s) => s.enabled && s.url);

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
            {isEn
              ? '"We don\'t just build walls — we craft refined human experiences. High Level is your ideal partner for turning your dream space into a reality that exceeds expectations."'
              : "“نحن لا نبني جدراناً، بل نصيغ تجارب إنسانية راقية. هاى ليفيل هي شريكك الأمثل لتحويل مساحة أحلامك إلى حقيقة تتخطى التوقعات.”"}
          </p>
          <div className="flex gap-3 mt-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url!}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-gold transition"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
            <a
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-gold transition"
              aria-label="WhatsApp"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4">{isEn ? "Quick Links" : "روابط سريعة"}</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href={`${p}/about`} className="hover:text-gold">{isEn ? "About Us" : "عن الشركة"}</Link></li>
            <li><Link href={p || "/"} className="hover:text-gold">{isEn ? "Home" : "الرئيسية"}</Link></li>
            <li><Link href={`${p}/portfolio`} className="hover:text-gold">{isEn ? "Our Work" : "أعمالنا"}</Link></li>
            <li><Link href={`${p}/services`} className="hover:text-gold">{isEn ? "Services" : "خدماتنا"}</Link></li>
            <li><Link href={`${p}/packages`} className="hover:text-gold">{isEn ? "Installment Packages" : "باقات التقسيط"}</Link></li>
            <li><Link href={`${p}/blog`} className="hover:text-gold">{isEn ? "Blog" : "المدونة"}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">{isEn ? "Contact" : "تواصل معنا"}</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
              {settings.mapUrl ? (
                <a href={settings.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  {settings.address}
                </a>
              ) : (
                settings.address
              )}
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-gold" /> {settings.contactPhone}
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-gold" /> {settings.contactEmail}
            </li>
            {settings.workingHours && (
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-gold" /> {settings.workingHours}
              </li>
            )}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">{isEn ? "Popular Searches" : "كلمات شائعة"}</h4>
          <div className="flex flex-wrap gap-2">
            {KEYWORDS[lang].map((k) => (
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
          <span>
            {isEn
              ? `© ${new Date().getFullYear()} High Level Finishing & Decor. All rights reserved.`
              : `© ${new Date().getFullYear()} هاى ليفيل للتشطيبات والديكور. جميع الحقوق محفوظة.`}
          </span>
          <div className="flex items-center gap-4">
            <Link href={`${p}/privacy`} className="hover:text-gold">{isEn ? "Privacy Policy" : "سياسة الخصوصية"}</Link>
            <Link href={`${p}/terms`} className="hover:text-gold">{isEn ? "Terms & Conditions" : "الشروط والأحكام"}</Link>
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
