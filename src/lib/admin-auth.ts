import { cookies } from "next/headers";

export const adminSessionCookie = {
  name: "verihire_admin_session",
  maxAge: 60 * 60 * 12,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export function isAdminAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_TOKEN);
}

export function getAdminSessionToken(): string | null {
  return process.env.ADMIN_SESSION_TOKEN || null;
}

export function verifyAdminSessionToken(token: string | undefined | null): boolean {
  const expected = getAdminSessionToken();

  if (!token || !expected) {
    return false;
  }

  return token === expected;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(adminSessionCookie.name)?.value;
  return verifyAdminSessionToken(token);
}
