import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock all the dependencies before importing
vi.mock("@/lib/auth-session", () => ({
  getSession: vi.fn(),
}));

vi.mock("@/lib/nhost-server-helper", () => ({
  runAsUser: vi.fn(),
}));

vi.mock("server-only", () => ({}));

// Now import the route
import { POST } from "../route";
import { getSession } from "@/lib/auth-session";
import { runAsUser } from "@/lib/nhost-server-helper";
import { NextRequest } from "next/server";

const mockGetSession = vi.mocked(getSession);
const mockRunAsUser = vi.mocked(runAsUser);

describe("/api/profil/guncelle - Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockSession = {
    accessToken: "test-token",
    user: {
      id: "test-user-id",
      email: "test@example.com",
      displayName: "Test User",
    },
  };

  const createRequest = (body: Record<string, unknown>) => {
    return new NextRequest("http://localhost:3000/api/profil/guncelle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  describe("Authentication", () => {
    it("should return 401 when no session exists", async () => {
      mockGetSession.mockResolvedValue(null);

      const request = createRequest({ bio: "Test bio" });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.message).toBe("Oturum açmanız gerekiyor");
    });

    it("should return 401 when user is not in session", async () => {
      mockGetSession.mockResolvedValue({
        accessToken: "test-token",
        user: undefined,
      });

      const request = createRequest({ bio: "Test bio" });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.message).toBe("Oturum açmanız gerekiyor");
    });
  });

  describe("Input Validation", () => {
    beforeEach(() => {
      mockGetSession.mockResolvedValue(mockSession);
      // Set up default mock for runAsUser
      mockRunAsUser.mockResolvedValue({
        data: { user_profiles: [] },
      });
    });

    it("should return 400 when bio exceeds 500 characters", async () => {
      const longBio = "a".repeat(501);
      const request = createRequest({ bio: longBio });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe("Biyografi 500 karakterden uzun olamaz");
    });

    it("should return 400 when location exceeds 100 characters", async () => {
      const longLocation = "a".repeat(101);
      const request = createRequest({ location: longLocation });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe("Konum 100 karakterden uzun olamaz");
    });

    it("should return 400 when website exceeds 200 characters", async () => {
      const longWebsite = "https://" + "a".repeat(200);
      const request = createRequest({ website: longWebsite });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe("Website URL'si 200 karakterden uzun olamaz");
    });

    it("should return 400 when website URL is invalid", async () => {
      const request = createRequest({ website: "://invalid-url" });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe("Geçerli bir website URL'si girin");
    });
  });

  describe("Profile Creation", () => {
    beforeEach(() => {
      mockGetSession.mockResolvedValue(mockSession);
      mockRunAsUser.mockResolvedValue({
        data: { user_profiles: [] }, // No existing profile
      });
    });

    it("should create new profile with valid data", async () => {
      const mockProfile = {
        user_id: "test-user-id",
        bio: "Test bio",
        location: "Test City",
        website: "https://example.com",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      };

      mockRunAsUser
        .mockResolvedValueOnce({
          data: { user_profiles: [] }, // Check existing profile
        })
        .mockResolvedValueOnce({
          data: {
            insert_user_profiles_one: mockProfile,
          },
        });

      const request = createRequest({
        bio: "Test bio",
        location: "Test City",
        website: "https://example.com",
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe("Profil başarıyla oluşturuldu");
      expect(data.profile).toEqual(mockProfile);
    });

    it("should handle profile creation error", async () => {
      mockRunAsUser
        .mockResolvedValueOnce({
          data: { user_profiles: [] }, // Check existing profile
        })
        .mockResolvedValueOnce({
          error: { message: "Database error" },
        });

      const request = createRequest({ bio: "Test bio" });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.message).toBe("Profil oluşturulurken bir hata oluştu");
    });
  });

  describe("Profile Update", () => {
    beforeEach(() => {
      mockGetSession.mockResolvedValue(mockSession);
      mockRunAsUser.mockResolvedValue({
        data: { user_profiles: [{ user_id: "test-user-id" }] }, // Existing profile
      });
    });

    it("should update existing profile with valid data", async () => {
      const mockUpdatedProfile = {
        user_id: "test-user-id",
        bio: "Updated bio",
        location: "Updated City",
        website: "https://updated.com",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      };

      mockRunAsUser
        .mockResolvedValueOnce({
          data: { user_profiles: [{ user_id: "test-user-id" }] }, // Check existing profile
        })
        .mockResolvedValueOnce({
          data: {
            update_user_profiles: {
              returning: [mockUpdatedProfile],
            },
          },
        });

      const request = createRequest({
        bio: "Updated bio",
        location: "Updated City",
        website: "https://updated.com",
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe("Profil başarıyla güncellendi");
      expect(data.profile).toEqual(mockUpdatedProfile);
    });
  });
});
