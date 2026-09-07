import PortfolioTeaser from "@/components/PortfolioTeaser";
import { getPortfolioProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "سابقة أعمالنا | هاى ليفيل للتشطيبات",
};

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();

  return (
    <>
      <section className="bg-ink text-white py-20">
        <div className="container-page text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold">معرض الأعمال</h1>
          <p className="mt-5 text-white/70 max-w-2xl mx-auto">
            شاهد نتائج إبداعنا في تشطيب الشقق والفلل بمختلف الباقات.
          </p>
        </div>
      </section>

      <PortfolioTeaser projects={projects} />
    </>
  );
}
