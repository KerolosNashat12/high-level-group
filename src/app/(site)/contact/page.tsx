import { Phone, Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "تواصل معنا | هاى ليفيل جروب",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <section className="bg-ink text-white py-16">
        <div className="container-page text-center">
          <h1 className="text-4xl font-extrabold">تواصل معنا</h1>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            عندك استفسار؟ فريقنا جاهز يرد عليك في أسرع وقت.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-extrabold text-ink mb-6">معلومات التواصل</h2>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="p-3 rounded-full bg-gold/10 text-gold"><Phone size={20} /></span>
                <div>
                  <div className="text-sm text-ink-soft">اتصل بنا</div>
                  <div className="font-bold">{settings.contactPhone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="p-3 rounded-full bg-gold/10 text-gold"><Mail size={20} /></span>
                <div>
                  <div className="text-sm text-ink-soft">راسلنا</div>
                  <div className="font-bold">{settings.contactEmail}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="p-3 rounded-full bg-gold/10 text-gold"><MapPin size={20} /></span>
                <div>
                  <div className="text-sm text-ink-soft">موقعنا</div>
                  <div className="font-bold">{settings.address}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 p-8 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
