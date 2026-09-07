import Link from "next/link";
import { db } from "@/db";
import { visitRequests, packages } from "@/db/schema";
import { Users, Package as PackageIcon, Clock } from "lucide-react";
import { desc, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [leadsCount] = await db.select({ count: sql<number>`count(*)::int` }).from(visitRequests);
  const [newLeadsCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(visitRequests)
    .where(sql`${visitRequests.status} = 'new'`);
  const [packagesCount] = await db.select({ count: sql<number>`count(*)::int` }).from(packages);
  const recentLeads = await db
    .select()
    .from(visitRequests)
    .orderBy(desc(visitRequests.createdAt))
    .limit(5);

  const cards = [
    { label: "إجمالي طلبات المعاينة", value: leadsCount.count, icon: Users, color: "bg-blue-50 text-blue-600", href: "/admin/leads" },
    { label: "طلبات جديدة", value: newLeadsCount.count, icon: Clock, color: "bg-amber-50 text-amber-600", href: "/admin/leads" },
    { label: "الباقات النشطة", value: packagesCount.count, icon: PackageIcon, color: "bg-gold/10 text-gold", href: "/admin/packages" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">نظرة عامة</h1>
      <p className="text-sm text-ink-soft mt-1">ملخص سريع على نشاط الموقع.</p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="bg-white rounded-2xl border border-black/5 p-6 hover:border-gold/40 transition"
          >
            <span className={`inline-flex p-3 rounded-xl ${c.color}`}>
              <c.icon size={20} />
            </span>
            <div className="text-3xl font-extrabold text-ink mt-4">{c.value}</div>
            <div className="text-sm text-ink-soft mt-1">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-10 bg-white rounded-2xl border border-black/5 p-6">
        <h2 className="font-bold text-ink mb-4">أحدث طلبات المعاينة</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-ink-soft border-b border-black/5">
                <th className="pb-3 font-medium">الاسم</th>
                <th className="pb-3 font-medium">الهاتف</th>
                <th className="pb-3 font-medium">المدينة</th>
                <th className="pb-3 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-black/5 last:border-0">
                  <td className="py-3 font-medium text-ink">{lead.name}</td>
                  <td className="py-3 text-ink-soft" dir="ltr">{lead.phone}</td>
                  <td className="py-3 text-ink-soft">{lead.city}</td>
                  <td className="py-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-black/5">
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
              {recentLeads.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-ink-soft">
                    لا توجد طلبات بعد
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
