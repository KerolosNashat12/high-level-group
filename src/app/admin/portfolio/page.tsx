import { db } from "@/db";
import { portfolioProjects } from "@/db/schema";
import { asc } from "drizzle-orm";
import PortfolioManager from "@/components/PortfolioManager";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioPage() {
  const projects = await db.select().from(portfolioProjects).orderBy(asc(portfolioProjects.order));

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink">معرض الأعمال</h1>
      <p className="text-sm text-ink-soft mt-1">
        أضف مشاريعك، واختار لكل مشروع صورة &quot;قبل&quot; وصورة &quot;بعد&quot; بشكل منفصل — تظهر
        مباشرة في صفحة أعمالنا والصفحة الرئيسية.
      </p>

      <div className="mt-8">
        <PortfolioManager initialProjects={projects} />
      </div>
    </div>
  );
}
