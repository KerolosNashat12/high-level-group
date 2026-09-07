import Link from "next/link";
import { UserCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function CustomerPortalCta() {
  return (
    <section className="pb-24">
      <div className="container-page">
        <Reveal className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl bg-ink text-white p-8 sm:p-10">
          <div className="text-center sm:text-right">
            <h3 className="text-xl font-extrabold">هل أنت عميل حالي؟</h3>
            <p className="mt-2 text-sm text-white/60 max-w-md">
              تابع تطورات مشروعك، أقساطك، والمخططات الهندسية من خلال بوابتك الخاصة.
            </p>
          </div>
          <Link
            href="/login"
            className="flex shrink-0 items-center gap-2 rounded-full bg-gold-gradient px-8 py-4 font-bold hover:opacity-90 transition"
          >
            <UserCircle2 size={18} /> تسجيل الدخول لبوابة العملاء
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
