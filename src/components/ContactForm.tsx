"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);
    const projectType = data.get("projectType");
    const rawMessage = String(data.get("message") || "").trim();
    const payload = {
      name: data.get("name"),
      phone: data.get("phone"),
      message: projectType
        ? `[نوع المشروع: ${projectType}] ${rawMessage}`
        : rawMessage,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "حدث خطأ، حاول مرة أخرى");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "حدث خطأ");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-gold/10 border border-gold/30 p-8 text-center">
        <CheckCircle2 className="mx-auto text-gold mb-3" size={40} />
        <h3 className="text-lg font-bold text-ink">تم إرسال رسالتك بنجاح!</h3>
        <p className="text-sm text-ink-soft mt-2">سنتواصل معك في أقرب وقت.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
      <input
        name="name"
        required
        placeholder="الاسم بالكامل"
        className="rounded-xl border border-black/10 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none"
      />
      <div className="flex gap-2">
        <select
          name="countryCode"
          defaultValue="+20"
          className="rounded-xl border border-black/10 px-2 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none"
        >
          <option value="+20">🇪🇬 +20</option>
          <option value="+966">🇸🇦 +966</option>
          <option value="+971">🇦🇪 +971</option>
          <option value="+965">🇰🇼 +965</option>
          <option value="+974">🇶🇦 +974</option>
          <option value="+973">🇧🇭 +973</option>
          <option value="+968">🇴🇲 +968</option>
          <option value="+218">🇱🇾 +218</option>
        </select>
        <input
          name="phone"
          required
          type="tel"
          pattern="^01[0-9]{9}$"
          placeholder="رقم الهاتف"
          className="flex-1 rounded-xl border border-black/10 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none"
        />
      </div>
      <select
        name="projectType"
        defaultValue=""
        className="rounded-xl border border-black/10 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none"
      >
        <option value="" disabled>
          نوع المشروع
        </option>
        <option value="شقة سكنية">شقة سكنية</option>
        <option value="فيلا">فيلا</option>
        <option value="محل تجاري">محل تجاري</option>
        <option value="مكتب إداري">مكتب إداري</option>
      </select>
      <textarea
        name="message"
        required
        rows={4}
        placeholder="تفاصيل مشروعك"
        className="rounded-xl border border-black/10 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none resize-none"
      />
      {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-xl bg-gold-gradient text-white font-bold py-3.5 flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60"
      >
        {status === "loading" && <Loader2 className="animate-spin" size={18} />}
        {status === "loading" ? "جارِ الإرسال..." : "إرسال الرسالة"}
      </button>
    </form>
  );
}
