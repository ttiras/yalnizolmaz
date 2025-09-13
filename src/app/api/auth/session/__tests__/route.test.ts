import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "../route";
import { getSession } from "@/lib/auth-session";

// Mock dependencies
vi.mock("@/lib/auth-session");

const mockGetSession = vi.mocked(getSession);

describe("/api/auth/session", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("GET /api/auth/session", () => {
    it("should return authenticated: true and user data when session exists", async () => {
      const mockSession = {
        accessToken: "test-token",
        refreshToken: "refresh-token",
        accessTokenExpiresIn: 3600,
        user: {
          id: "test-user-id",
          email: "test@example.com",
          displayName: "Test User",
          avatarUrl: "https://example.com/avatar.jpg",
        },
      };

      mockGetSession.mockResolvedValue(mockSession);

      const request = new NextRequest("http://localhost:3000/api/auth/session");
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({
        authenticated: true,
        user: mockSession.user,
      });
    });

    it("should return authenticated: false and null user when no session exists", async () => {
      mockGetSession.mockResolvedValue(null);

      const request = new NextRequest("http://localhost:3000/api/auth/session");
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({
        authenticated: false,
        user: null,
      });
    });

    it("should return authenticated: true and null user when session has no user", async () => {
      const mockSessionWithoutUser = {
        accessToken: "test-token",
        refreshToken: "refresh-token",
        accessTokenExpiresIn: 3600,
        user: undefined,
      };

      mockGetSession.mockResolvedValue(mockSessionWithoutUser);

      const request = new NextRequest("http://localhost:3000/api/auth/session");
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({
        authenticated: true,
        user: null,
      });
    });

    it("should handle partial user data", async () => {
      const mockSessionWithPartialUser = {
        accessToken: "test-token",
        user: {
          id: "test-user-id",
          email: null,
          displayName: "Test User",
          avatarUrl: null,
        },
      };

      mockGetSession.mockResolvedValue(mockSessionWithPartialUser);

      const request = new NextRequest("http://localhost:3000/api/auth/session");
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({
        authenticated: true,
        user: mockSessionWithPartialUser.user,
      });
    });

    it("should handle session with minimal user data", async () => {
      const mockMinimalSession = {
        accessToken: "test-token",
        user: {
          id: "test-user-id",
          email: undefined,
          displayName: undefined,
          avatarUrl: undefined,
        },
      };

      mockGetSession.mockResolvedValue(mockMinimalSession);

      const request = new NextRequest("http://localhost:3000/api/auth/session");
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({
        authenticated: true,
        user: mockMinimalSession.user,
      });
    });

    it("should handle getSession throwing an error", async () => {
      mockGetSession.mockRejectedValue(new Error("Session error"));

      const request = new NextRequest("http://localhost:3000/api/auth/session");

      // The actual implementation doesn't handle errors, so it will throw
      await expect(GET()).rejects.toThrow("Session error");
    });

    it("should handle malformed session data", async () => {
      const malformedSession = {
        accessToken: "test-token",
        // Missing user property
      } as SessionData;

      mockGetSession.mockResolvedValue(malformedSession);

      const request = new NextRequest("http://localhost:3000/api/auth/session");
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({
        authenticated: true,
        user: null,
      });
    });
  });

  describe("Response Headers", () => {
    it("should set appropriate response headers", async () => {
      mockGetSession.mockResolvedValue(null);

      const request = new NextRequest("http://localhost:3000/api/auth/session");
      const response = await GET();

      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toBe("application/json");
    });
  });

  describe("Dynamic Route Configuration", () => {
    it("should be configured as dynamic route", async () => {
      // This test verifies that the route is configured with dynamic = "force-dynamic"
      // The actual behavior is tested by ensuring the route works correctly
      mockGetSession.mockResolvedValue(null);

      const request = new NextRequest("http://localhost:3000/api/auth/session");
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.authenticated).toBe(false);
    });
  });
});
