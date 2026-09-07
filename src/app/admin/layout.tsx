import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Providers from "@/components/Providers";
import AdminSidebar from "@/components/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // The login page itself is excluded from auth by middleware matcher,
  // so `session` may be null only while rendering /admin/login.
  if (!session) {
    return <Providers>{children}</Providers>;
  }

  return (
    <Providers>
      <div className="min-h-screen bg-black/[0.02]" dir="rtl">
        <div className="flex">
          <AdminSidebar userName={session.user?.name ?? ""} />
          <main className="flex-1 min-w-0 p-6 sm:p-10">{children}</main>
        </div>
      </div>
    </Providers>
  );
}
