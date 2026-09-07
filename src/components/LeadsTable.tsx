"use client";

import { useState } from "react";

type Lead = {
  id: number;
  name: string;
  phone: string;
  city: string;
  district: string | null;
  packageNameSnapshot: string | null;
  areaSqm: number | null;
  downPct: number | null;
  installmentMonths: number | null;
  monthlyInstallment: number | null;
  totalCost: number | null;
  preferredDate: string | null;
  preferredTime: string | null;
  notes: string | null;
  mediaType: string | null;
  mediaUrls: string[] | null;
  status: string;
  createdAt: string;
};

const statusOptions = [
  { value: "new", label: "جديد", color: "bg-blue-50 text-blue-700" },
  { value: "contacted", label: "تم التواصل", color: "bg-amber-50 text-amber-700" },
  { value: "scheduled", label: "تم تحديد موعد", color: "bg-purple-50 text-purple-700" },
  { value: "done", label: "تمت المعاينة", color: "bg-green-50 text-green-700" },
  { value: "cancelled", label: "ملغي", color: "bg-red-50 text-red-700" },
];

function fmt(n: number | null) {
  if (n === null || n === undefined) return "—";
  return Math.round(n).toLocaleString("ar-EG");
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const [rows, setRows] = useState(leads);

  async function updateStatus(id: number, status: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    await fetch(`/api/visit-requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-black/5">
      <table className="w-full text-sm min-w-[1000px]">
        <thead>
          <tr className="text-right text-ink-soft border-b border-black/5 bg-black/[0.015]">
            <th className="p-4 font-medium">الاسم</th>
            <th className="p-4 font-medium">الهاتف</th>
            <th className="p-4 font-medium">المحافظة</th>
            <th className="p-4 font-medium">الباقة والمساحة</th>
            <th className="p-4 font-medium">تفاصيل التقسيط</th>
            <th className="p-4 font-medium">موعد المعاينة</th>
            <th className="p-4 font-medium">صور/فيديو الشقة</th>
            <th className="p-4 font-medium">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((lead) => {
            const opt = statusOptions.find((s) => s.value === lead.status);
            return (
              <tr key={lead.id} className="border-b border-black/5 last:border-0 align-top">
                <td className="p-4 font-medium text-ink">
                  {lead.name}
                  {lead.notes && (
                    <p className="text-xs text-ink-soft font-normal mt-1 max-w-[200px]">{lead.notes}</p>
                  )}
                </td>
                <td className="p-4 text-ink-soft" dir="ltr">
                  <a href={`tel:${lead.phone}`} className="hover:text-gold">{lead.phone}</a>
                </td>
                <td className="p-4 text-ink-soft">
                  {lead.city}
                  {lead.district && <span className="text-xs block mt-0.5 text-ink-soft/70">{lead.district}</span>}
                </td>
                <td className="p-4 text-ink-soft">
                  <span className="font-bold text-gold">{lead.packageNameSnapshot ?? "—"}</span>
                  {lead.areaSqm && <span className="text-xs block mt-0.5">{fmt(lead.areaSqm)} م²</span>}
                </td>
                <td className="p-4 text-ink-soft text-xs leading-relaxed">
                  {lead.downPct != null && <div>مقدم {lead.downPct}%</div>}
                  {lead.installmentMonths != null && <div>{lead.installmentMonths} شهر</div>}
                  {lead.monthlyInstallment != null && (
                    <div className="font-bold text-ink">{fmt(lead.monthlyInstallment)} ج.م/ش</div>
                  )}
                  {lead.totalCost != null && (
                    <div className="text-ink-soft/70">إجمالي {fmt(lead.totalCost)} ج.م</div>
                  )}
                </td>
                <td className="p-4 text-ink-soft">
                  {lead.preferredDate ? new Date(lead.preferredDate).toLocaleDateString("ar-EG") : "—"}
                  {lead.preferredTime && (
                    <span className="text-xs block text-gold font-bold" dir="ltr">
                      {lead.preferredTime}
                    </span>
                  )}
                </td>
                <td className="p-4">
                  {lead.mediaUrls && lead.mediaUrls.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 max-w-[140px]">
                      {lead.mediaType === "video" ? (
                        <a
                          href={lead.mediaUrls[0]}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-bold text-gold underline underline-offset-2"
                        >
                          مشاهدة الفيديو
                        </a>
                      ) : (
                        lead.mediaUrls.map((url, i) => (
                          <a key={url} href={url} target="_blank" rel="noreferrer">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={url}
                              alt={`صورة ${i + 1}`}
                              className="w-10 h-10 rounded-lg object-cover border border-black/10"
                            />
                          </a>
                        ))
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-ink-soft/50">—</span>
                  )}
                </td>
                <td className="p-4">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                    className={`text-xs font-bold px-2.5 py-1.5 rounded-full border-0 outline-none cursor-pointer ${opt?.color}`}
                  >
                    {statusOptions.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr>
              <td colSpan={8} className="p-8 text-center text-ink-soft">
                لا توجد طلبات معاينة بعد
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
