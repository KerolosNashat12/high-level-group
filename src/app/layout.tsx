import type { Metadata, Viewport } from "next";
import { Tajawal } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "تشطيب شقق وفلل بالتقسيط في مصر | باقات ذكية | هاى ليفيل للتشطيبات",
  description:
    "هاى ليفيل جروب - الخيار الأول لتشطيب الشقق والفلل بالتقسيط في القاهرة والجيزة والمدن الجديدة. 3 باقات ذكية، إشراف هندسي كامل، وضمان يصل لسنوات طويلة.",
};

export const viewport: Viewport = {
  themeColor: "#b48b4e",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");

  return (
    <html lang={isEnglish ? "en" : "ar"} dir={isEnglish ? "ltr" : "rtl"}>
      <body className={`${tajawal.variable} font-sans antialiased bg-white text-ink`}>
        {children}
      </body>
    </html>
  );
}
