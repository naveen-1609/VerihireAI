import { NextResponse } from "next/server";
import {
  adminSessionCookie,
  getAdminSessionToken,
  isAdminAuthConfigured,
} from "@/lib/admin-auth";
import { verifyAdminPassword } from "@/lib/admin-password";

export async function POST(request: Request) {
  try {
    if (!isAdminAuthConfigured()) {
      return NextResponse.json(
        { error: "Admin access is not configured on this environment." },
        { status: 503 }
      );
    }

    const body = (await request.json()) as { password?: string };
    const password = body.password?.trim() || "";

    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    const sessionToken = getAdminSessionToken();

    if (!sessionToken) {
      return NextResponse.json(
        { error: "Admin session token is not configured." },
        { status: 503 }
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(adminSessionCookie.name, sessionToken, adminSessionCookie);

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Unable to sign in right now. Please try again." },
      { status: 500 }
    );
  }
}
