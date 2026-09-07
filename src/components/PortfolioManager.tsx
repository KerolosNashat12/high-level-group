"use client";

import { useState } from "react";
import { Plus, Trash2, Save, Loader2, CheckCircle2, Eye, EyeOff } from "lucide-react";
import ImageUploadField from "@/components/ImageUploadField";

type Project = {
  id: number;
  nameAr: string;
  category: string;
  beforeImageUrl: string | null;
  afterImageUrl: string | null;
  order: number;
  published: boolean;
};

function ProjectCard({
  project,
  onDeleted,
}: {
  project: Project;
  onDeleted: (id: number) => void;
}) {
  const [form, setForm] = useState(project);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [deleting, setDeleting] = useState(false);

  function update<K extends keyof Project>(key: K, value: Project[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setStatus("idle");
  }

  async function save() {
    setStatus("saving");
    try {
      const res = await fetch(`/api/portfolio/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameAr: form.nameAr,
          category: form.category,
          beforeImageUrl: form.beforeImageUrl,
          afterImageUrl: form.afterImageUrl,
          order: Number(form.order),
          published: form.published,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  }

  async function remove() {
    if (!confirm(`متأكد إنك عايز تحذف "${project.nameAr}"؟`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/portfolio/${project.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      onDeleted(project.id);
    } catch {
      setDeleting(false);
      alert("تعذّر الحذف، حاول مرة أخرى");
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-black/5 p-6">
      <div className="flex items-start justify-between gap-3 mb-4">
        <input
          value={form.nameAr}
          onChange={(e) => update("nameAr", e.target.value)}
          className="font-bold text-lg text-ink border-b border-transparent hover:border-black/10 focus:border-gold outline-none bg-transparent flex-1"
        />
        <button
          onClick={remove}
          disabled={deleting}
          className="text-red-500 hover:text-red-700 p-1.5"
          aria-label="حذف"
        >
          {deleting ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4 text-sm">
        <select
          value={form.category}
          onChange={(e) => update("category", e.target.value)}
          className="rounded-lg border border-black/10 px-3 py-2 text-sm focus:border-gold outline-none"
        >
          <option value="سكني">سكني</option>
          <option value="تجاري">تجاري</option>
        </select>

        <div>
          <label className="text-xs text-ink-soft ml-1">الترتيب</label>
          <input
            type="number"
            value={form.order}
            onChange={(e) => update("order", Number(e.target.value) as never)}
            className="w-16 rounded-lg border border-black/10 px-2 py-2 text-sm focus:border-gold outline-none"
          />
        </div>

        <button
          onClick={() => update("published", !form.published)}
          className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold transition ${
            form.published ? "bg-green-50 text-green-700" : "bg-black/5 text-ink-soft"
          }`}
        >
          {form.published ? <Eye size={14} /> : <EyeOff size={14} />}
          {form.published ? "ظاهر على الموقع" : "مخفي"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ImageUploadField
          label="صورة قبل (Before)"
          value={form.beforeImageUrl}
          onChange={(v) => update("beforeImageUrl", v)}
        />
        <ImageUploadField
          label="صورة بعد (After)"
          value={form.afterImageUrl}
          onChange={(v) => update("afterImageUrl", v)}
        />
      </div>

      <button
        onClick={save}
        disabled={status === "saving"}
        className="mt-5 flex items-center gap-2 rounded-xl bg-gold-gradient text-white text-sm font-bold px-5 py-2.5 disabled:opacity-60"
      >
        {status === "saving" && <Loader2 className="animate-spin" size={16} />}
        {status === "saved" && <CheckCircle2 size={16} />}
        {status === "idle" && <Save size={16} />}
        {status === "saving" ? "جارِ الحفظ..." : status === "saved" ? "تم الحفظ" : "حفظ التغييرات"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600 mt-2">حدث خطأ أثناء الحفظ، حاول مرة أخرى.</p>
      )}
    </div>
  );
}

export default function PortfolioManager({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [adding, setAdding] = useState(false);

  async function addProject() {
    setAdding(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameAr: "مشروع جديد",
          category: "سكني",
          order: projects.length,
          published: true,
        }),
      });
      if (!res.ok) throw new Error();
      const { project } = await res.json();
      setProjects((p) => [...p, project]);
    } catch {
      alert("تعذّر إضافة المشروع، حاول مرة أخرى");
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {projects.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            onDeleted={(id) => setProjects((prev) => prev.filter((x) => x.id !== id))}
          />
        ))}
      </div>

      <button
        onClick={addProject}
        disabled={adding}
        className="flex items-center gap-2 rounded-xl border-2 border-dashed border-gold/30 text-gold font-bold px-6 py-4 hover:bg-gold/5 transition disabled:opacity-60"
      >
        {adding ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
        إضافة مشروع جديد
      </button>
    </div>
  );
}
