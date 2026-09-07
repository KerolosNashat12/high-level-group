import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AiAssistant from "@/components/AiAssistant";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getSiteSettings, getPackagesBasic } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, packages] = await Promise.all([getSiteSettings(), getPackagesBasic()]);

  return (
    <>
      <Header logoUrl={settings.logoUrl} whatsappNumber={settings.whatsappNumber} />
      <main>{children}</main>
      <Footer settings={settings} />
      <AiAssistant
        whatsappNumber={settings.whatsappNumber}
        contactPhone={settings.contactPhone}
        contactEmail={settings.contactEmail}
        address={settings.address}
        packages={packages}
      />
      <WhatsAppButton whatsappNumber={settings.whatsappNumber} />
    </>
  );
}
