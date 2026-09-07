"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2, Loader2 } from "lucide-react";

type District = { id: number; nameAr: string; enabled: boolean };
type Governorate = { id: number; nameAr: string; enabled: boolean; districts: District[] };

function GovernorateRow({
  gov,
  onToggleGov,
  onToggleDistrict,
  onAddDistrict,
  onDeleteDistrict,
}: {
  gov: Governorate;
  onToggleGov: (enabled: boolean) => void;
  onToggleDistrict: (id: number, enabled: boolean) => void;
  onAddDistrict: (name: string) => void;
  onDeleteDistrict: (id: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [newDistrict, setNewDistrict] = useState("");
  const [adding, setAdding] = useState(false);
  const enabledCount = gov.districts.filter((d) => d.enabled).length;

  async function addDistrict() {
    if (!newDistrict.trim()) return;
    setAdding(true);
    try {
      await onAddDistrict(newDistrict.trim());
      setNewDistrict("");
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className={`rounded-xl border ${gov.enabled ? "border-black/10" : "border-black/5 bg-black/[0.015]"}`}>
      <div className="flex items-center justify-between gap-3 p-4">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 flex-1 text-right"
        >
          {open ? <ChevronUp size={16} className="text-ink-soft" /> : <ChevronDown size={16} className="text-ink-soft" />}
          <span className="font-bold text-ink text-sm">{gov.nameAr}</span>
          <span className="text-xs text-ink-soft">
            ({enabledCount}/{gov.districts.length} منطقة مفعّلة)
          </span>
        </button>
        <label className="flex items-center gap-2 text-xs font-bold text-ink-soft shrink-0">
          <input type="checkbox" checked={gov.enabled} onChange={(e) => onToggleGov(e.target.checked)} />
          {gov.enabled ? "مفتوحة" : "مقفولة"}
        </label>
      </div>

      {open && (
        <div className="border-t border-black/5 p-4 space-y-2">
          {gov.districts.map((d) => (
            <div key={d.id} className="flex items-center justify-between gap-2 text-sm">
              <label className="flex items-center gap-2 flex-1">
                <input
                  type="checkbox"
                  checked={d.enabled}
                  onChange={(e) => onToggleDistrict(d.id, e.target.checked)}
                />
                <span className={d.enabled ? "text-ink" : "text-ink-soft/50 line-through"}>{d.nameAr}</span>
              </label>
              <button onClick={() => onDeleteDistrict(d.id)} className="text-red-400 hover:text-red-600">
                <Trash2 size={13} />
              </button>
            </div>
          ))}
          {gov.districts.length === 0 && (
            <p className="text-xs text-ink-soft/60">لا توجد مناطق مضافة لهذه المحافظة بعد.</p>
          )}
          <div className="flex items-center gap-2 pt-2">
            <input
              value={newDistrict}
              onChange={(e) => setNewDistrict(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addDistrict()}
              placeholder="إضافة منطقة جديدة..."
              className="flex-1 rounded-lg border border-black/10 px-2.5 py-1.5 text-xs focus:border-gold outline-none"
            />
            <button
              onClick={addDistrict}
              disabled={adding}
              className="flex items-center gap-1 rounded-lg bg-gold/10 text-gold text-xs font-bold px-3 py-1.5 disabled:opacity-60"
            >
              {adding ? <Loader2 className="animate-spin" size={12} /> : <Plus size={12} />}
              إضافة
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CoverageManager({ initialGovernorates }: { initialGovernorates: Governorate[] }) {
  const [governorates, setGovernorates] = useState(initialGovernorates);

  async function toggleGov(id: number, enabled: boolean) {
    setGovernorates((gs) => gs.map((g) => (g.id === id ? { ...g, enabled } : g)));
    await fetch(`/api/coverage/governorates/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled }),
    });
  }

  async function toggleDistrict(govId: number, distId: number, enabled: boolean) {
    setGovernorates((gs) =>
      gs.map((g) =>
        g.id === govId
          ? { ...g, districts: g.districts.map((d) => (d.id === distId ? { ...d, enabled } : d)) }
          : g
      )
    );
    await fetch(`/api/coverage/districts/${distId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled }),
    });
  }

  async function addDistrict(govId: number, name: string) {
    const res = await fetch(`/api/coverage/districts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ governorateId: govId, nameAr: name }),
    });
    if (!res.ok) return;
    const { district } = await res.json();
    setGovernorates((gs) =>
      gs.map((g) => (g.id === govId ? { ...g, districts: [...g.districts, district] } : g))
    );
  }

  async function deleteDistrict(govId: number, distId: number) {
    setGovernorates((gs) =>
      gs.map((g) => (g.id === govId ? { ...g, districts: g.districts.filter((d) => d.id !== distId) } : g))
    );
    await fetch(`/api/coverage/districts/${distId}`, { method: "DELETE" });
  }

  return (
    <div className="space-y-3">
      {governorates.map((g) => (
        <GovernorateRow
          key={g.id}
          gov={g}
          onToggleGov={(enabled) => toggleGov(g.id, enabled)}
          onToggleDistrict={(distId, enabled) => toggleDistrict(g.id, distId, enabled)}
          onAddDistrict={(name) => addDistrict(g.id, name)}
          onDeleteDistrict={(distId) => deleteDistrict(g.id, distId)}
        />
      ))}
      {governorates.length === 0 && (
        <p className="text-sm text-ink-soft">لا توجد محافظات مضافة بعد.</p>
      )}
    </div>
  );
}
