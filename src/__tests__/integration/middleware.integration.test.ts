import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "@/middleware";

describe("middleware admin protection", () => {
  beforeEach(() => {
    vi.stubEnv("ADMIN_SESSION_TOKEN", "integration-test-session-token");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  function createRequest(path: string, cookieValue?: string) {
    const headers = cookieValue
      ? { cookie: `verihire_admin_session=${cookieValue}` }
      : undefined;

    return new NextRequest(new URL(`http://localhost:3000${path}`), { headers });
  }

  it("redirects unauthenticated users away from /admin/entries", () => {
    const response = middleware(createRequest("/admin/entries"));

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost:3000/admin");
  });

  it("allows authenticated users to access /admin/entries", () => {
    const response = middleware(
      createRequest("/admin/entries", "integration-test-session-token")
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
  });

  it("returns 401 for unauthenticated admin entries API calls", async () => {
    const response = middleware(createRequest("/api/admin/entries"));
    const body = (await response.json()) as { error: string };

    expect(response.status).toBe(401);
    expect(body.error).toBe("Unauthorized.");
  });

  it("redirects authenticated users from /admin to /admin/entries", () => {
    const response = middleware(
      createRequest("/admin", "integration-test-session-token")
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost:3000/admin/entries"
    );
  });
});
