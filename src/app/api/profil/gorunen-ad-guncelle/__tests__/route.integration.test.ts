import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock all the dependencies before importing
vi.mock("@/lib/auth-session", () => ({
  getSession: vi.fn(),
  updateSessionUser: vi.fn(),
}));

vi.mock("@/lib/nhost.server", () => ({
  createServerNhostClient: vi.fn(),
}));

vi.mock("server-only", () => ({}));

// Now import the route
import { POST } from "../route";
import { getSession, updateSessionUser } from "@/lib/auth-session";
import { createServerNhostClient } from "@/lib/nhost.server";
import { NextRequest } from "next/server";

const mockGetSession = vi.mocked(getSession);
const mockUpdateSessionUser = vi.mocked(updateSessionUser);
const mockCreateServerNhostClient = vi.mocked(createServerNhostClient);

describe("/api/profil/gorunen-ad-guncelle - Integration Tests", () => {
  let mockNhostClient: {
    graphql: {
      setAccessToken: vi.Mock;
      request: vi.Mock;
    };
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock Nhost client
    mockNhostClient = {
      graphql: {
        setAccessToken: vi.fn(),
        request: vi.fn(),
      },
    };

    mockCreateServerNhostClient.mockReturnValue(
      mockNhostClient as unknown as ReturnType<typeof createServerNhostClient>,
    );
  });

  const mockSession = {
    accessToken: "test-token",
    user: {
      id: "test-user-id",
      email: "test@example.com",
      displayName: "Old Display Name",
    },
  };

  const createRequest = (body: Record<string, unknown>) => {
    return new NextRequest("http://localhost:3000/api/profil/gorunen-ad-guncelle", {
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

      const request = createRequest({ displayName: "New Name" });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.message).toBe("Unauthorized");
    });

    it("should return 401 when user is not in session", async () => {
      mockGetSession.mockResolvedValue({
        accessToken: "test-token",
        user: undefined,
      });

      const request = createRequest({ displayName: "New Name" });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.message).toBe("Unauthorized");
    });
  });

  describe("Input Validation", () => {
    beforeEach(() => {
      mockGetSession.mockResolvedValue(mockSession);
    });

    it("should return 400 when displayName is missing", async () => {
      const request = createRequest({});
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe("Display name is required");
    });

    it("should return 400 when displayName is not a string", async () => {
      const request = createRequest({ displayName: 123 });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe("Display name is required");
    });

    it("should return 400 when displayName is empty after trimming", async () => {
      const request = createRequest({ displayName: "   " });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe("Display name cannot be empty");
    });

    it("should return 400 when displayName exceeds 100 characters", async () => {
      const longName = "a".repeat(101);
      const request = createRequest({ displayName: longName });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe("Display name must be 100 characters or less");
    });

    it("should accept displayName with exactly 100 characters", async () => {
      const validName = "a".repeat(100);
      const mockUpdatedUser = {
        id: "test-user-id",
        displayName: validName,
      };

      mockNhostClient.graphql.request.mockResolvedValue({
        data: {
          updateUser: mockUpdatedUser,
        },
      });

      const request = createRequest({ displayName: validName });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe("Display name updated successfully");
    });
  });

  describe("Successful Update", () => {
    beforeEach(() => {
      mockGetSession.mockResolvedValue(mockSession);
    });

    it("should update display name successfully", async () => {
      const newDisplayName = "New Display Name";
      const mockUpdatedUser = {
        id: "test-user-id",
        displayName: newDisplayName,
      };

      mockNhostClient.graphql.request.mockResolvedValue({
        data: {
          updateUser: mockUpdatedUser,
        },
      });

      const request = createRequest({ displayName: newDisplayName });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe("Display name updated successfully");
      expect(data.user).toEqual(mockUpdatedUser);

      // Verify GraphQL request was made correctly
      expect(mockNhostClient.graphql.setAccessToken).toHaveBeenCalledWith("test-token");
      expect(mockNhostClient.graphql.request).toHaveBeenCalledWith(
        expect.stringContaining("mutation UpdateDisplayName"),
        {
          userId: "test-user-id",
          displayName: newDisplayName,
        },
      );

      // Verify session was updated
      expect(mockUpdateSessionUser).toHaveBeenCalledWith({
        displayName: newDisplayName,
      });
    });

    it("should trim whitespace from display name", async () => {
      const displayNameWithSpaces = "  Trimmed Name  ";
      const trimmedName = "Trimmed Name";
      const mockUpdatedUser = {
        id: "test-user-id",
        displayName: trimmedName,
      };

      mockNhostClient.graphql.request.mockResolvedValue({
        data: {
          updateUser: mockUpdatedUser,
        },
      });

      const request = createRequest({ displayName: displayNameWithSpaces });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe("Display name updated successfully");

      // Verify trimmed name was used in GraphQL request
      expect(mockNhostClient.graphql.request).toHaveBeenCalledWith(
        expect.stringContaining("mutation UpdateDisplayName"),
        {
          userId: "test-user-id",
          displayName: trimmedName,
        },
      );
    });
  });

  describe("Error Handling", () => {
    beforeEach(() => {
      mockGetSession.mockResolvedValue(mockSession);
    });

    it("should handle GraphQL error", async () => {
      mockNhostClient.graphql.request.mockResolvedValue({
        error: { message: "GraphQL error" },
      });

      const request = createRequest({ displayName: "New Name" });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.message).toBe("Failed to update display name");
    });

    it("should handle missing updateUser in response", async () => {
      mockNhostClient.graphql.request.mockResolvedValue({
        data: {
          updateUser: null,
        },
      });

      const request = createRequest({ displayName: "New Name" });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.message).toBe("Failed to update display name");
    });

    it("should handle unexpected errors", async () => {
      mockGetSession.mockRejectedValue(new Error("Unexpected error"));

      const request = createRequest({ displayName: "New Name" });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.message).toBe("Internal server error");
    });
  });

  describe("Edge Cases", () => {
    beforeEach(() => {
      mockGetSession.mockResolvedValue(mockSession);
    });

    it("should handle empty string display name", async () => {
      const request = createRequest({ displayName: "" });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe("Display name is required");
    });

    it("should handle special characters in display name", async () => {
      const specialName = "Test User 123 !@#$%^&*()";
      const mockUpdatedUser = {
        id: "test-user-id",
        displayName: specialName,
      };

      mockNhostClient.graphql.request.mockResolvedValue({
        data: {
          updateUser: mockUpdatedUser,
        },
      });

      const request = createRequest({ displayName: specialName });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe("Display name updated successfully");
      expect(data.user.displayName).toBe(specialName);
    });
  });
});
