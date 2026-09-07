"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Send, MessageCircle } from "lucide-react";

type Msg = { from: "bot" | "user"; text: string };

const QUICK_QUESTIONS = [
  "إيه هي باقات التقسيط المتاحة؟",
  "مدة تنفيذ التشطيب قد إيه؟",
  "هل الباقات بتشمل كهرباء وسباكة؟",
  "فين مناطق تغطية الخدمة؟",
];

const DEFAULT_WHATSAPP = "201080146022";
const DEFAULT_PHONE = "01080146022";
const DEFAULT_EMAIL = "Info@highlevel.com";
const DEFAULT_ADDRESS = "2116 المعراج العلوى، زهراء المعادى، القاهرة";

type PkgBasic = { id: number; nameAr: string; pricePerMeter: number };

function fmt(n: number) {
  return Math.round(n).toLocaleString("ar-EG");
}

// Pulls a "100 متر" / "150 م2" / "٢٠٠ متر مربع" style area out of free text,
// normalizing Arabic-Indic digits first so both digit styles work.
function extractArea(q: string): number | null {
  const normalized = q.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
  const m = normalized.match(/(\d{2,4})\s*(متر مربع|م\s*2|م²|متر)/);
  return m ? Number(m[1]) : null;
}

// Finds which package (if any) the question names, matching on loose
// keywords rather than the exact package name.
function extractPackage(q: string, packages: PkgBasic[]): PkgBasic | null {
  if (/توفير|اقتصادي|الأرخص|ارخص/.test(q)) {
    return packages.find((p) => /توفير/.test(p.nameAr)) ?? null;
  }
  if (/سوبر لوكس|الترا|فخم جدا|فاخرة جدا/.test(q)) {
    return packages.find((p) => /الترا|لوكس/.test(p.nameAr)) ?? null;
  }
  if (/سوبر/.test(q)) {
    return packages.find((p) => /^باقة السوبر$|سوبر(?!.*لوكس)/.test(p.nameAr)) ?? null;
  }
  return null;
}

function answerFor(question: string, ctx: { phone: string; email: string; address: string; packages: PkgBasic[] }): string {
  const q = question.trim();
  const { phone, email, address, packages } = ctx;

  // Greetings & small talk first, so they don't fall through to the generic reply.
  if (/^(سلام|السلام عليكم|اهلا|أهلا|هاي|هلا|صباح الخير|مساء الخير|ازيك|إزيك|عامل ايه)/.test(q)) {
    return "وعليكم السلام وأهلاً بيك! 👋 اسألني عن الباقات وأسعارها، مدة التنفيذ، التقسيط، أو مناطق التغطية وهجاوبك على طول.";
  }
  if (/شكرا|شكرًا|تسلم|تمام كده|ربنا يخليك|متشكر/.test(q)) {
    return "العفو! 🙏 لو حابب تحدد موعد معاينة مجانية، تقدر تملأ نموذج طلب المعاينة تحت وفريقنا هيتواصل معاك.";
  }

  // Smart cost estimate: "شقة 100 متر تكلف كام؟" — extracts the area and,
  // if a specific package was named, prices just that one; otherwise all three.
  const area = extractArea(q);
  const asksCost = /تكلف|يكلف|هيكلفني|كلفة|بكام|كام|سعر|اسعار|أسعار|ثمن|تمن|حساب|قد ايه|قد إيه/.test(q);
  if (area && asksCost && packages.length) {
    const named = extractPackage(q, packages);
    const rows = (named ? [named] : packages)
      .map((p) => `${p.nameAr}: ${fmt(area * p.pricePerMeter)} ج.م`)
      .join(" — ");
    return `تكلفة تشطيب ${area} متر تقريبًا: ${rows}. الأرقام دي تقديرية، وتقدر تحسب قسطك الشهري بالظبط في حاسبة التقسيط الذكية بصفحة الباقات، أو اطلب معاينة مجانية لتسعير دقيق.`;
  }

  if (/باقات|باقة|سعر|اسعار|أسعار|تكلفة|فلوس|جنيه|بكام|كام|ثمن|تمن/.test(q)) {
    if (packages.length) {
      const rows = packages.map((p) => `${p.nameAr} (${fmt(p.pricePerMeter)} ج.م/م²)`).join("، ");
      return `عندنا ${packages.length} باقات: ${rows}. كل الباقات بتشمل إشراف هندسي كامل وتقسيط مريح. تقدر تشوف التفاصيل كاملة في صفحة الباقات، أو قولي مساحة شقتك وهقولك التكلفة التقريبية على طول.`;
    }
    return "عندنا باقات متعددة تناسب كل الميزانيات، وتقدر تشوف التفاصيل كاملة في صفحة الباقات.";
  }
  if (/مدة|وقت التنفيذ|قد ايه.*تنفيذ|قد إيه.*تنفيذ|فترة التنفيذ|هيستغرق|هياخد وقت|أد ايه/.test(q)) {
    return "مدة التنفيذ بتختلف حسب مساحة الوحدة ونوع الباقة، وعادة بتتراوح بين 45 لـ 90 يوم عمل مع إشراف هندسي يومي والتزام كامل بالمواعيد.";
  }
  if (/كهرباء|سباكة|تأسيس|تاسيس/.test(q)) {
    return "أيوه، كل الباقات بتشمل تأسيس كامل للكهرباء والسباكة بخامات معتمدة (السويدي، أطقم صحي تركي/ألماني حسب الباقة)، والتفاصيل الدقيقة موجودة في جدول مقارنة الباقات.";
  }
  if (/تقسيط|مقدم|قسط|شهر|فايدة|فائدة/.test(q)) {
    return "أنظمة التقسيط عندنا بتبدأ من 12 شهر لحد 60 شهر في حالات خاصة، بمقدم بسيط بيبدأ من 10%. جرب حاسبة التقسيط الذكية في صفحة الباقات عشان تعرف قسطك الشهري التقديري فورًا.";
  }
  if (/منطقة|تغطية|فين.*(تشتغل|بتغط)|أماكن|اماكن|بتغطوا/.test(q)) {
    return "بنغطي كل مناطق القاهرة الكبرى والمدن الجديدة: التجمع الخامس، القاهرة الجديدة، الشيخ زايد، 6 أكتوبر، العاصمة الإدارية، المعادي، مدينة نصر، وأماكن تانية كتير. اسأل عن منطقتك وهنأكدلك.";
  }
  if (/ضمان/.test(q)) {
    return "بنقدم ضمان حقيقي وشامل على كل بنود التنفيذ، بيصل لسنوات طويلة حسب الباقة، عشان راحة بالك مضمونة.";
  }
  if (/3d|٣d|تصميم|رسم|رسمة|ديزاين|مودل/.test(q)) {
    return "أيوه، كل الباقات بتشمل رسم تصميم للوحدة (2D أو 3D حسب الباقة) مجانًا قبل ما نبدأ التنفيذ، عشان تشوف شكل بيتك الجديد قبل التنفيذ.";
  }
  if (/فين مكانكم|عنوانكم|لوكيشن|موقعكم/.test(q)) {
    return `مكتبنا في ${address}. تقدر كمان تتواصل معانا على ${phone} أو ${email}.`;
  }
  if (/تواصل|رقم|اتصل|واتس|هاتف|ايميل|إيميل|ميل/.test(q)) {
    return `تقدر تتواصل معانا مباشرة على ${phone}، على إيميل ${email}، أو من خلال واتساب، وفريقنا هيرد عليك خلال 24 ساعة.`;
  }
  return "شكرًا لسؤالك! فريقنا المتخصص هيقدر يجاوبك بدقة أكتر على واتساب، أو املأ نموذج طلب المعاينة وهنتواصل معاك خلال 24 ساعة.";
}

export default function AiAssistant({
  whatsappNumber,
  contactPhone,
  contactEmail,
  address,
  packages,
}: {
  whatsappNumber?: string | null;
  contactPhone?: string | null;
  contactEmail?: string | null;
  address?: string | null;
  packages?: PkgBasic[];
}) {
  const WHATSAPP_NUMBER = whatsappNumber || DEFAULT_WHATSAPP;
  const PHONE = contactPhone || DEFAULT_PHONE;
  const EMAIL = contactEmail || DEFAULT_EMAIL;
  const ADDRESS = address || DEFAULT_ADDRESS;
  const PACKAGES = packages ?? [];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "bot",
      text: "أهلاً بيك في هاى ليفيل جروب 👋 أنا مساعدك الذكي، اسألني عن الباقات، الأسعار، التقسيط، أو مناطق التغطية.",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-ai-assistant", handler);
    return () => window.removeEventListener("open-ai-assistant", handler);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function send(text: string) {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { from: "bot", text: answerFor(text, { phone: PHONE, email: EMAIL, address: ADDRESS, packages: PACKAGES }) },
      ]);
    }, 500);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="المساعد الذكي"
        className="fixed bottom-6 left-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-white shadow-xl animate-pulse-ring"
      >
        {open ? <X size={24} /> : <Sparkles size={24} />}
      </button>

      {open && (
        <div className="fixed bottom-24 left-6 z-[60] flex h-[28rem] w-[22rem] max-w-[90vw] flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-2xl">
          <div className="flex items-center gap-3 bg-ink px-5 py-4 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient">
              <Sparkles size={18} />
            </span>
            <div>
              <div className="text-sm font-bold">المساعد الذكي</div>
              <div className="text-[11px] text-white/50">هاى ليفيل جروب</div>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm no-scrollbar">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                  m.from === "bot"
                    ? "bg-black/5 text-ink"
                    : "mr-auto bg-gold-gradient text-white"
                }`}
                style={m.from === "user" ? { marginRight: "auto", marginLeft: 0 } : {}}
              >
                {m.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {messages.length < 3 && (
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-gold/30 px-3 py-1.5 text-[11px] text-gold hover:bg-gold/10 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-black/10 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب سؤالك هنا..."
              className="flex-1 rounded-full border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient text-white"
              aria-label="إرسال"
            >
              <Send size={16} />
            </button>
          </form>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-black/[0.03] py-2.5 text-xs font-bold text-ink-soft hover:text-gold transition"
          >
            <MessageCircle size={14} /> تفضل التحدث مع فريق حقيقي على واتساب
          </a>
        </div>
      )}
    </>
  );
}
