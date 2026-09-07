const DEFAULT_WHATSAPP = "201080146022";

export default function WhatsAppButton({
  whatsappNumber,
  lang = "ar",
}: {
  whatsappNumber?: string | null;
  lang?: "ar" | "en";
}) {
  const WHATSAPP_NUMBER = whatsappNumber || DEFAULT_WHATSAPP;
  const text =
    lang === "en"
      ? "Hi, I'd like to know more about the installment finishing packages"
      : "أهلاً، حابب أعرف أكتر عن باقات التشطيب بالتقسيط";
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل واتساب"
      className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105"
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M12.01 2C6.48 2 2 6.48 2 12.01c0 1.94.54 3.76 1.48 5.32L2 22l4.83-1.44a9.96 9.96 0 0 0 5.18 1.45h.01c5.53 0 10.01-4.48 10.01-10.01C22.02 6.48 17.54 2 12.01 2Zm5.86 14.3c-.25.7-1.44 1.34-1.98 1.42-.5.08-1.14.11-1.84-.12-.42-.14-.97-.32-1.66-.63-2.93-1.27-4.84-4.24-4.99-4.44-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.6-.37.8-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.25.6.85 2.07.92 2.22.07.15.12.33.02.53-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.73.82 2.02.97.3.15.5.22.57.35.07.13.07.75-.18 1.45Z" />
      </svg>
    </a>
  );
}
