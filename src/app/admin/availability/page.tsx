import { getWeeklyAvailability, getBlockedDates } from "@/lib/data";
import AvailabilityManager from "@/components/AvailabilityManager";

export const dynamic = "force-dynamic";

const DAY_LABELS = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
const DEFAULT_SLOTS = "10:00,12:00,14:00,16:00";

export default async function AdminAvailabilityPage() {
  const [weekRows, blocked] = await Promise.all([getWeeklyAvailability(), getBlockedDates()]);

  const week = DAY_LABELS.map((label, dayOfWeek) => {
    const existing = weekRows.find((r) => r.dayOfWeek === dayOfWeek);
    return {
      dayOfWeek,
      label,
      isOpen: existing?.isOpen ?? (dayOfWeek !== 5 && dayOfWeek !== 6),
      slots: existing?.slots ?? DEFAULT_SLOTS,
    };
  });

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">مواعيد المعاينة</h1>
      <p className="text-sm text-ink-soft mt-1">
        حدد أيام وأوقات المعاينة المتاحة أسبوعيًا، وأقفل أي يوم بعينه (إجازة، يوم مشغول بالكامل).
        العميل هيشوف بالظبط نفس المواعيد دي وهو بيحجز على الموقع.
      </p>

      <div className="mt-8">
        <AvailabilityManager initialWeek={week} initialBlocked={blocked} />
      </div>
    </div>
  );
}
