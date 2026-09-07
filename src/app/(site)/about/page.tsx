import Image from "next/image";
import { Target, Eye, Award } from "lucide-react";

export const metadata = {
  title: "من نحن | هاى ليفيل جروب",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink text-white py-16">
        <div className="container-page text-center">
          <h1 className="text-4xl font-extrabold">من نحن</h1>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            هاى ليفيل جروب شركة رائدة في تشطيبات الشقق والفلل بأنظمة تقسيط
            مريحة، بخبرة تمتد لأكثر من 10 سنوات في السوق المصري.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop"
              alt="فريق العمل"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-ink">قصتنا</h2>
            <p className="mt-4 text-ink-soft leading-relaxed">
              بدأنا رحلتنا بهدف واحد: تسهيل حصول كل أسرة مصرية على منزل أحلامها
              دون الحاجة لدفع المبلغ كاملًا مقدمًا. من خلال باقات تقسيط ذكية
              وفريق هندسي متكامل، نفذنا مئات المشاريع في القاهرة والجيزة
              بأعلى معايير الجودة والالتزام بالمواعيد.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-6">
              <div>
                <Target className="text-gold" size={26} />
                <h3 className="font-bold mt-3">رسالتنا</h3>
                <p className="text-sm text-ink-soft mt-1">
                  تقديم تشطيبات عالية الجودة بأنظمة دفع ميسرة للجميع.
                </p>
              </div>
              <div>
                <Eye className="text-gold" size={26} />
                <h3 className="font-bold mt-3">رؤيتنا</h3>
                <p className="text-sm text-ink-soft mt-1">
                  أن نكون الخيار الأول للتشطيبات بالتقسيط في مصر.
                </p>
              </div>
              <div>
                <Award className="text-gold" size={26} />
                <h3 className="font-bold mt-3">قيمنا</h3>
                <p className="text-sm text-ink-soft mt-1">
                  الشفافية، الجودة، والالتزام في كل مشروع ننفذه.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
