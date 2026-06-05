export function jsonPostRequest(
  path: string,
  body: unknown,
  cookies?: Record<string, string>
): Request {
  const headers = new Headers({ "Content-Type": "application/json" });

  if (cookies && Object.keys(cookies).length > 0) {
    headers.set(
      "Cookie",
      Object.entries(cookies)
        .map(([name, value]) => `${name}=${value}`)
        .join("; ")
    );
  }

  return new Request(`http://localhost:3000${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
}

export async function readJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

export function getSetCookie(response: Response): string | null {
  return response.headers.get("set-cookie");
}

export function parseSessionCookie(setCookieHeader: string | null): string | undefined {
  if (!setCookieHeader) {
    return undefined;
  }

  const match = setCookieHeader.match(/verihire_admin_session=([^;]+)/);
  return match?.[1];
}
