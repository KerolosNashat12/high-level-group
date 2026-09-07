import { db } from "@/db";
import { visitRequests } from "@/db/schema";
import { desc } from "drizzle-orm";
import LeadsTable from "@/components/LeadsTable";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await db
    .select()
    .from(visitRequests)
    .orderBy(desc(visitRequests.createdAt));

  const serialized = leads.map((l) => ({
    ...l,
    preferredDate: l.preferredDate ? l.preferredDate.toISOString() : null,
    createdAt: l.createdAt.toISOString(),
  }));

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">طلبات المعاينة</h1>
      <p className="text-sm text-ink-soft mt-1">
        كل طلب معاينة جاي من موقعك مربوط تلقائيًا بالباقة والتفاصيل المالية اللي اختارها العميل من حاسبة التقسيط.
      </p>

      <div className="mt-8">
        <LeadsTable leads={serialized} />
      </div>
    </div>
  );
}
