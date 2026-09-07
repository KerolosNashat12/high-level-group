"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, UserCircle2 } from "lucide-react";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/packages", label: "باقات التقسيط" },
  { href: "/portfolio", label: "أعمالنا" },
  { href: "/services", label: "خدماتنا" },
  { href: "/blog", label: "المدونة" },
];

const WHATSAPP_NUMBER = "201080146022";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gold/20">
      <div className="container-page flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gold-gradient text-white font-extrabold text-sm">
            HL
          </span>
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
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-black/10 px-5 py-2.5 text-sm font-bold text-ink-soft hover:border-gold hover:text-gold transition"
          >
            تواصل واتساب
          </a>
          <Link
            href="/login"
            className="flex items-center gap-1.5 rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:opacity-90 transition"
          >
            <UserCircle2 size={16} /> دخول الأعضاء
          </Link>
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
            <Link
              href="/login"
              className="rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-bold text-white text-center"
              onClick={() => setOpen(false)}
            >
              دخول الأعضاء
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-black/10 px-5 py-2.5 text-sm font-bold text-center text-ink-soft"
            >
              تواصل واتساب
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
