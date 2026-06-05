import { NextRequest, NextResponse } from "next/server";
import { adminSessionCookie } from "@/lib/admin-auth";

function clearSessionCookie(response: NextResponse) {
  response.cookies.delete({
    name: adminSessionCookie.name,
    path: adminSessionCookie.path,
  });
  return response;
}

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/admin", request.url));
  return clearSessionCookie(response);
}

export async function POST() {
  const response = NextResponse.json({ success: true });
  return clearSessionCookie(response);
}
