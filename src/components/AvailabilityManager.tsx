"use client";

import { useState } from "react";
import { Save, Loader2, CheckCircle2, Plus, Trash2, Ban, Copy, X } from "lucide-react";

type DayRow = { dayOfWeek: number; label: string; isOpen: boolean; slots: string };
type BlockedDate = { id: number; date: string; reason: string | null };

function parseSlots(slots: string): string[] {
  return slots
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .sort();
}

function DayRowEditor({
  day,
  onToggleOpen,
  onSlotsChange,
  onCopyToAll,
}: {
  day: DayRow;
  onToggleOpen: (open: boolean) => void;
  onSlotsChange: (slots: string) => void;
  onCopyToAll: () => void;
}) {
  const [newTime, setNewTime] = useState("10:00");
  const times = parseSlots(day.slots);

  function addTime() {
    if (!newTime || times.includes(newTime)) return;
    onSlotsChange(parseSlots([...times, newTime].join(",")).join(","));
  }

  function removeTime(t: string) {
    onSlotsChange(times.filter((x) => x !== t).join(","));
  }

  return (
    <div className={`rounded-xl border p-4 transition ${day.isOpen ? "border-black/10" : "border-black/5 bg-black/[0.015]"}`}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <label className="flex items-center gap-2 font-bold text-sm text-ink">
          <input
            type="checkbox"
            checked={day.isOpen}
            onChange={(e) => onToggleOpen(e.target.checked)}
          />
          {day.label}
        </label>
        {day.isOpen && times.length > 0 && (
          <button
            type="button"
            onClick={onCopyToAll}
            className="flex items-center gap-1 text-[11px] text-ink-soft hover:text-gold"
            title="طبّق نفس المواعيد على كل الأيام المفتوحة"
          >
            <Copy size={12} /> تطبيق على كل الأيام المفتوحة
          </button>
        )}
      </div>

      {day.isOpen && (
        <>
          <div className="flex flex-wrap gap-2 mb-3">
            {times.length === 0 && (
              <span className="text-xs text-ink-soft/60">لا توجد مواعيد مضافة لهذا اليوم بعد</span>
            )}
            {times.map((t) => (
              <span
                key={t}
                className="flex items-center gap-1.5 rounded-full bg-gold/10 text-gold text-xs font-bold px-3 py-1.5"
                dir="ltr"
              >
                {t}
                <button type="button" onClick={() => removeTime(t)} className="hover:text-red-600">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="rounded-lg border border-black/10 px-2.5 py-1.5 text-sm focus:border-gold outline-none"
              dir="ltr"
            />
            <button
              type="button"
              onClick={addTime}
              className="flex items-center gap-1 rounded-lg bg-black/5 text-ink text-xs font-bold px-3 py-1.5 hover:bg-gold/10 hover:text-gold transition"
            >
              <Plus size={12} /> إضافة موعد
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function AvailabilityManager({
  initialWeek,
  initialBlocked,
}: {
  initialWeek: DayRow[];
  initialBlocked: BlockedDate[];
}) {
  const [week, setWeek] = useState(initialWeek);
  const [blocked, setBlocked] = useState(initialBlocked);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [newDate, setNewDate] = useState("");
  const [newReason, setNewReason] = useState("");
  const [addingBlocked, setAddingBlocked] = useState(false);

  function updateDay<K extends keyof DayRow>(dayOfWeek: number, key: K, value: DayRow[K]) {
    setWeek((w) => w.map((d) => (d.dayOfWeek === dayOfWeek ? { ...d, [key]: value } : d)));
    setStatus("idle");
  }

  function copyToAllOpenDays(sourceDayOfWeek: number) {
    const source = week.find((d) => d.dayOfWeek === sourceDayOfWeek);
    if (!source) return;
    setWeek((w) => w.map((d) => (d.isOpen ? { ...d, slots: source.slots } : d)));
    setStatus("idle");
  }

  async function saveWeek() {
    setStatus("saving");
    try {
      const res = await fetch("/api/availability/weekly", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          days: week.map((d) => ({ dayOfWeek: d.dayOfWeek, isOpen: d.isOpen, slots: d.slots })),
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  }

  async function addBlocked() {
    if (!newDate) return;
    setAddingBlocked(true);
    try {
      const res = await fetch("/api/availability/blocked", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: newDate, reason: newReason || null }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "خطأ");
      setBlocked((b) => [...b, body.blocked].sort((a, c) => a.date.localeCompare(c.date)));
      setNewDate("");
      setNewReason("");
    } catch (e) {
      alert(e instanceof Error ? e.message : "تعذّرت الإضافة");
    } finally {
      setAddingBlocked(false);
    }
  }

  async function removeBlocked(id: number) {
    setBlocked((b) => b.filter((x) => x.id !== id));
    await fetch(`/api/availability/blocked/${id}`, { method: "DELETE" });
  }

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-2xl border border-black/5 p-6">
        <h2 className="font-bold text-ink mb-4">الجدول الأسبوعي</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {week.map((day) => (
            <DayRowEditor
              key={day.dayOfWeek}
              day={day}
              onToggleOpen={(open) => updateDay(day.dayOfWeek, "isOpen", open)}
              onSlotsChange={(slots) => updateDay(day.dayOfWeek, "slots", slots)}
              onCopyToAll={() => copyToAllOpenDays(day.dayOfWeek)}
            />
          ))}
        </div>
        <button
          onClick={saveWeek}
          disabled={status === "saving"}
          className="mt-5 flex items-center gap-2 rounded-xl bg-gold-gradient text-white text-sm font-bold px-6 py-3 disabled:opacity-60"
        >
          {status === "saving" && <Loader2 className="animate-spin" size={16} />}
          {status === "saved" && <CheckCircle2 size={16} />}
          {status === "idle" && <Save size={16} />}
          {status === "saving" ? "جارِ الحفظ..." : status === "saved" ? "تم الحفظ بنجاح" : "حفظ الجدول الأسبوعي"}
        </button>
        {status === "error" && <p className="text-sm text-red-600 mt-2">حدث خطأ أثناء الحفظ.</p>}
      </section>

      <section className="bg-white rounded-2xl border border-black/5 p-6">
        <h2 className="font-bold text-ink mb-1">أيام مقفولة (إجازات / أيام مشغولة)</h2>
        <p className="text-xs text-ink-soft mb-4">
          أي تاريخ تضيفه هنا هيظهر للعميل على إنه غير متاح للحجز، حتى لو كان يوم مفتوح أصلاً في الجدول الأسبوعي.
        </p>

        <div className="space-y-2 mb-4">
          {blocked.length === 0 && (
            <p className="text-sm text-ink-soft/60">لا توجد أيام مقفولة حاليًا.</p>
          )}
          {blocked.map((b) => (
            <div
              key={b.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-black/5 px-4 py-2.5"
            >
              <div className="flex items-center gap-2 text-sm">
                <Ban size={14} className="text-red-500" />
                <span className="font-bold text-ink" dir="ltr">{b.date}</span>
                {b.reason && <span className="text-ink-soft">— {b.reason}</span>}
              </div>
              <button onClick={() => removeBlocked(b.id)} className="text-red-500 hover:text-red-700">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="rounded-lg border border-black/10 px-3 py-2 text-sm focus:border-gold outline-none"
          />
          <input
            value={newReason}
            onChange={(e) => setNewReason(e.target.value)}
            placeholder="السبب (اختياري) — مثال: إجازة رسمية"
            className="flex-1 min-w-[180px] rounded-lg border border-black/10 px-3 py-2 text-sm focus:border-gold outline-none"
          />
          <button
            onClick={addBlocked}
            disabled={addingBlocked || !newDate}
            className="flex items-center gap-1.5 rounded-lg bg-ink text-white text-sm font-bold px-4 py-2 disabled:opacity-50"
          >
            {addingBlocked ? <Loader2 className="animate-spin" size={14} /> : <Plus size={14} />}
            إقفال اليوم
          </button>
        </div>
      </section>
    </div>
  );
}
