"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Package,
  Users,
  LogOut,
  Settings,
  Images,
  CalendarClock,
  MapPin,
  Menu,
  X,
} from "lucide-react";

const links = [
  { href: "/admin", label: "نظرة عامة", icon: LayoutDashboard },
  { href: "/admin/packages", label: "الباقات والأسعار", icon: Package },
  { href: "/admin/portfolio", label: "معرض الأعمال", icon: Images },
  { href: "/admin/availability", label: "مواعيد المعاينة", icon: CalendarClock },
  { href: "/admin/coverage", label: "المحافظات والمناطق", icon: MapPin },
  { href: "/admin/leads", label: "طلبات المعاينة", icon: Users },
  { href: "/admin/settings", label: "إعدادات الموقع", icon: Settings },
];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex-1 space-y-1">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
              active ? "bg-gold text-white" : "text-white/70 hover:bg-white/10"
            }`}
          >
            <link.icon size={18} />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the drawer automatically whenever the route changes, and always
  // on mount — otherwise it can stay open across a client-side navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile top bar — the sidebar below is hidden under sm, so this is
          the only nav entry point on a phone. */}
      <div className="sm:hidden sticky top-0 z-40 flex items-center justify-between bg-ink text-white px-4 py-3">
        <span className="text-lg font-extrabold">
          HIGH <span className="text-gold">LEVEL</span>
        </span>
        <button
          onClick={() => setOpen(true)}
          aria-label="فتح القائمة"
          className="rounded-lg p-2 hover:bg-white/10"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="sm:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 right-0 w-72 max-w-[85vw] bg-ink text-white p-6 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xl font-extrabold">
                  HIGH <span className="text-gold">LEVEL</span>
                </span>
                <p className="text-xs text-white/50 mt-1">لوحة التحكم</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="إغلاق القائمة"
                className="rounded-lg p-2 hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />

            <div className="border-t border-white/10 pt-4 mt-4">
              <p className="text-xs text-white/50 mb-3 truncate">{userName}</p>
              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
              >
                <LogOut size={16} /> تسجيل الخروج
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="w-64 shrink-0 min-h-screen bg-ink text-white p-6 hidden sm:flex sm:flex-col">
        <div className="mb-10">
          <span className="text-xl font-extrabold">
            HIGH <span className="text-gold">LEVEL</span>
          </span>
          <p className="text-xs text-white/50 mt-1">لوحة التحكم</p>
        </div>

        <NavLinks pathname={pathname} />

        <div className="border-t border-white/10 pt-4 mt-4">
          <p className="text-xs text-white/50 mb-3 truncate">{userName}</p>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <LogOut size={16} /> تسجيل الخروج
          </button>
        </div>
      </aside>
    </>
  );
}
