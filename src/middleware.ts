import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminSessionToken } from "@/lib/admin-auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("verihire_admin_session")?.value;
  const isAuthenticated = verifyAdminSessionToken(token);

  if (pathname.startsWith("/admin/entries")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  if (pathname.startsWith("/api/admin/entries")) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
  }

  if (pathname === "/admin" && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/entries", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/entries", "/api/admin/entries"],
};
