"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/packages", label: "باقات التقسيط" },
  { href: "/portfolio", label: "أعمالنا" },
  { href: "/services", label: "خدماتنا" },
  { href: "/blog", label: "المدونة" },
];

const DEFAULT_WHATSAPP = "201080146022";

export default function Header({
  logoUrl,
  whatsappNumber,
}: {
  logoUrl?: string | null;
  whatsappNumber?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const waNumber = whatsappNumber || DEFAULT_WHATSAPP;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gold/20">
      <div className="container-page flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-2">
          {logoUrl ? (
            <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-md">
              <Image src={logoUrl} alt="High Level" fill className="object-contain" unoptimized />
            </span>
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gold-gradient text-white font-extrabold text-sm">
              HL
            </span>
          )}
          <span className="text-2xl font-extrabold tracking-tight">
            <span className="text-ink">HIGH</span>
            <span className="text-gold"> LEVEL</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold-gradient px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:opacity-90 transition"
          >
            تواصل واتساب
          </a>
        </div>

        <button
          className="md:hidden p-2 text-ink"
          onClick={() => setOpen(!open)}
          aria-label="القائمة"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gold/20 bg-white">
          <div className="container-page py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-soft hover:text-gold"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-bold text-center text-white"
            >
              تواصل واتساب
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
