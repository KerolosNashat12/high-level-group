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

const WHATSAPP_NUMBER = "201080146022";

function answerFor(question: string): string {
  const q = question.trim();

  if (/باقات|سعر|اسعار|تكلفة|فلوس|جنيه/.test(q)) {
    return "عندنا 3 باقات: باقة التوفير (3,500 ج.م/م²)، باقة السوبر (4,500 ج.م/م²) وهي الأكثر طلبًا، وباقة الالترا سوبر لوكس (6,000 ج.م/م²). كل الباقات بتشمل إشراف هندسي كامل وتقسيط مريح. تقدر تشوف التفاصيل كاملة في صفحة الباقات.";
  }
  if (/مدة|وقت|قد ايه|قد إيه|فترة التنفيذ/.test(q)) {
    return "مدة التنفيذ بتختلف حسب مساحة الوحدة ونوع الباقة، وعادة بتتراوح بين 45 لـ 90 يوم عمل مع إشراف هندسي يومي والتزام كامل بالمواعيد.";
  }
  if (/كهرباء|سباكة/.test(q)) {
    return "أيوه، كل الباقات بتشمل تأسيس كامل للكهرباء والسباكة بخامات معتمدة (السويدي، أطقم صحي تركي/ألماني حسب الباقة)، والتفاصيل الدقيقة موجودة في جدول مقارنة الباقات.";
  }
  if (/تقسيط|مقدم|شهر|فايدة|فائدة/.test(q)) {
    return "أنظمة التقسيط عندنا بتبدأ من 12 شهر لحد 60 شهر في حالات خاصة، بمقدم بسيط. جرب حاسبة التقسيط الذكية في صفحة الباقات عشان تعرف قسطك الشهري التقديري فورًا.";
  }
  if (/منطقة|تغطية|فين|أماكن|اماكن/.test(q)) {
    return "بنغطي كل مناطق القاهرة الكبرى والمدن الجديدة: التجمع الخامس، القاهرة الجديدة، الشيخ زايد، 6 أكتوبر، العاصمة الإدارية، المعادي، مدينة نصر، وأماكن تانية كتير. اسأل عن منطقتك وهنأكدلك.";
  }
  if (/ضمان/.test(q)) {
    return "بنقدم ضمان حقيقي وشامل على كل بنود التنفيذ، بيصل لسنوات طويلة حسب الباقة، عشان راحة بالك مضمونة.";
  }
  if (/3d|تصميم|رسم/.test(q)) {
    return "أيوه، كل الباقات بتشمل رسم تصميم للوحدة (2D أو 3D حسب الباقة) مجانًا قبل ما نبدأ التنفيذ، عشان تشوف شكل بيتك الجديد قبل التنفيذ.";
  }
  if (/تواصل|رقم|اتصل|واتس|هاتف/.test(q)) {
    return "تقدر تتواصل معانا مباشرة على 01080146022 أو من خلال واتساب، وفريقنا هيرد عليك خلال 24 ساعة.";
  }
  return "شكرًا لسؤالك! فريقنا المتخصص هيقدر يجاوبك بدقة أكتر على واتساب، أو املأ نموذج طلب المعاينة وهنتواصل معاك خلال 24 ساعة.";
}

export default function AiAssistant() {
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
      setMessages((m) => [...m, { from: "bot", text: answerFor(text) }]);
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
