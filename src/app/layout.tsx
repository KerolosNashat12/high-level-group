import type { Metadata, Viewport } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "هاى ليفيل جروب للتشطيبات | تشطيب شقق وفلل بالتقسيط في مصر",
  description:
    "شركة هاى ليفيل جروب متخصصة في تشطيب الشقق والفلل بأنظمة تقسيط مريحة في القاهرة والجيزة. باقات توفير، سوبر، وألترا لوكس.",
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
