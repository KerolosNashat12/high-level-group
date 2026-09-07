"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Package, Users, LogOut, Settings, Images, CalendarClock, MapPin } from "lucide-react";

const links = [
  { href: "/admin", label: "نظرة عامة", icon: LayoutDashboard },
  { href: "/admin/packages", label: "الباقات والأسعار", icon: Package },
  { href: "/admin/portfolio", label: "معرض الأعمال", icon: Images },
  { href: "/admin/availability", label: "مواعيد المعاينة", icon: CalendarClock },
  { href: "/admin/coverage", label: "المحافظات والمناطق", icon: MapPin },
  { href: "/admin/leads", label: "طلبات المعاينة", icon: Users },
  { href: "/admin/settings", label: "إعدادات الموقع", icon: Settings },
];

export default function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 min-h-screen bg-ink text-white p-6 hidden sm:flex sm:flex-col">
      <div className="mb-10">
        <span className="text-xl font-extrabold">
          HIGH <span className="text-gold">LEVEL</span>
        </span>
        <p className="text-xs text-white/50 mt-1">لوحة التحكم</p>
      </div>

      <nav className="flex-1 space-y-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
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
  );
}
