import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Handles two unrelated jobs in one middleware (Next.js only allows one
// middleware file per project):
// 1. Protects /admin/* behind NextAuth, same as before.
// 2. Forwards the request pathname via an "x-pathname" header so the root
//    layout (a Server Component with no direct access to the pathname) can
//    pick <html lang/dir> — "en"/ltr under /en, "ar"/rtl everywhere else.
export default withAuth(
  function middleware(request) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", request.nextUrl.pathname);
    return NextResponse.next({ request: { headers: requestHeaders } });
  },
  {
    callbacks: {
      // Only enforce the login check for /admin routes (matched below) —
      // every other route hits this middleware purely for the header, and
      // should never require a session.
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;
        if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
          return !!token;
        }
        return true;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
