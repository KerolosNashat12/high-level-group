import type { Metadata, Viewport } from "next";
import { Tajawal } from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} font-sans antialiased bg-white text-ink`}>
        {children}
      </body>
    </html>
  );
}
