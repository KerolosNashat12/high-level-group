import { getContactMessages } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">رسائل التواصل</h1>
      <p className="text-sm text-ink-soft mt-1">
        الرسائل اللي بتوصل من نموذج &quot;تواصل معنا&quot; في صفحة اتصل بنا.
      </p>

      <div className="mt-8 space-y-3">
        {messages.length === 0 && (
          <div className="bg-white rounded-2xl border border-black/5 p-10 text-center text-ink-soft">
            لا توجد رسائل بعد.
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className="bg-white rounded-2xl border border-black/5 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="font-bold text-ink">{m.name}</div>
              <div className="flex items-center gap-3 text-xs text-ink-soft">
                <a href={`tel:${m.phone}`} className="hover:text-gold" dir="ltr">
                  {m.phone}
                </a>
                <span>{new Date(m.createdAt).toLocaleString("ar-EG")}</span>
              </div>
            </div>
            <p className="text-sm text-ink-soft leading-relaxed whitespace-pre-wrap">{m.message}</p>
            <a
              href={`https://wa.me/2${m.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-xs font-bold text-gold hover:underline"
            >
              الرد على واتساب
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
