import { db } from "@/db";
import { visitRequests, packages } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import LeadsTable from "@/components/LeadsTable";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await db
    .select({
      id: visitRequests.id,
      name: visitRequests.name,
      phone: visitRequests.phone,
      city: visitRequests.city,
      area: visitRequests.area,
      propertyType: visitRequests.propertyType,
      preferredDate: visitRequests.preferredDate,
      preferredTime: visitRequests.preferredTime,
      notes: visitRequests.notes,
      status: visitRequests.status,
      createdAt: visitRequests.createdAt,
      packageName: packages.nameAr,
    })
    .from(visitRequests)
    .leftJoin(packages, eq(visitRequests.packageId, packages.id))
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
        تابع طلبات &quot;طلب معاينة&quot; الواردة من الموقع وحدّث حالتها.
      </p>

      <div className="mt-8">
        <LeadsTable leads={serialized} />
      </div>
    </div>
  );
}
