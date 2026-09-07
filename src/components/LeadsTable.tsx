"use client";

import { useState } from "react";

type Lead = {
  id: number;
  name: string;
  phone: string;
  city: string;
  area: string | null;
  propertyType: string | null;
  packageName: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  notes: string | null;
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
      <table className="w-full text-sm min-w-[800px]">
        <thead>
          <tr className="text-right text-ink-soft border-b border-black/5 bg-black/[0.015]">
            <th className="p-4 font-medium">الاسم</th>
            <th className="p-4 font-medium">الهاتف</th>
            <th className="p-4 font-medium">المدينة / المنطقة</th>
            <th className="p-4 font-medium">الباقة</th>
            <th className="p-4 font-medium">التاريخ المفضل</th>
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
                  {lead.area && <span className="text-xs"> — {lead.area}</span>}
                </td>
                <td className="p-4 text-ink-soft">{lead.packageName ?? "—"}</td>
                <td className="p-4 text-ink-soft">
                  {lead.preferredDate ? new Date(lead.preferredDate).toLocaleDateString("ar-EG") : "—"}
                  {lead.preferredTime && (
                    <span className="text-xs block text-gold font-bold" dir="ltr">
                      {lead.preferredTime}
                    </span>
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
              <td colSpan={6} className="p-8 text-center text-ink-soft">
                لا توجد طلبات معاينة بعد
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
