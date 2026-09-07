"use client";

import { useRef, useState } from "react";
import { ImagePlus, X, Loader2 } from "lucide-react";

const MAX_SIZE_MB = 4;

export default function ImageUploadField({
  label,
  value,
  onChange,
  aspect = "aspect-video",
}: {
  label: string;
  value: string | null | undefined;
  onChange: (dataUrl: string | null) => void;
  aspect?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleFile(file: File | undefined) {
    setError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("الرجاء اختيار ملف صورة صالح");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`حجم الصورة كبير جدًا (الحد الأقصى ${MAX_SIZE_MB} ميجا)`);
      return;
    }
    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      onChange(reader.result as string);
      setLoading(false);
    };
    reader.onerror = () => {
      setError("تعذّر قراءة الصورة");
      setLoading(false);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <label className="text-xs font-bold text-ink-soft">{label}</label>
      <div
        className={`mt-2 relative ${aspect} w-full overflow-hidden rounded-xl border border-dashed border-black/15 bg-black/[0.02] flex items-center justify-center cursor-pointer group`}
        onClick={() => inputRef.current?.click()}
      >
        {loading ? (
          <Loader2 className="animate-spin text-gold" size={22} />
        ) : value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt={label} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="absolute top-2 left-2 rounded-full bg-black/60 p-1.5 text-white opacity-0 group-hover:opacity-100 transition"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-ink-soft/60 text-xs">
            <ImagePlus size={22} />
            اضغط لرفع صورة
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
