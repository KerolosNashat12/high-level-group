"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/packages", label: "الباقات" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gold/20">
      <div className="container-page flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tight">
            <span className="text-ink">HIGH</span>
            <span className="text-gold"> LEVEL</span>
          </span>
          <span className="hidden sm:block text-xs text-ink-soft border-r border-gold/30 pr-2 mr-1">
            جروب للتشطيبات
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
          <Link
            href="/packages#visit-request"
            className="rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:opacity-90 transition"
          >
            اطلب معاينة مجانية
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
              href="/packages#visit-request"
              className="rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-bold text-white text-center"
              onClick={() => setOpen(false)}
            >
              اطلب معاينة مجانية
            </Link>
            <a href="tel:+201000000000" className="flex items-center gap-2 text-sm text-ink-soft">
              <Phone size={16} /> 01000000000
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
