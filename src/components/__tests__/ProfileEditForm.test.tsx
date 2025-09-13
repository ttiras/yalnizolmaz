import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfileEditForm from "../ProfileEditForm";

// Mock Next.js dependencies
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock UserAvatar component
vi.mock("../UserAvatar", () => ({
  default: ({
    src,
    name,
    email,
    size,
    className,
  }: {
    src?: string;
    name?: string;
    email?: string;
    size?: number;
    className?: string;
  }) => (
    <div
      data-testid="user-avatar"
      data-src={src}
      data-name={name}
      data-email={email}
      data-size={size}
      className={className}
    >
      {src ? "Avatar Image" : (name || email || "?").charAt(0).toUpperCase()}
    </div>
  ),
}));

describe("ProfileEditForm", () => {
  const mockUser = {
    id: "test-user-id",
    email: "test@example.com",
    displayName: "Test User",
    avatarUrl: "https://example.com/avatar.jpg",
  };

  const mockProfile = {
    user_id: "test-user-id",
    bio: "Test bio",
    location: "Test City",
    website: "https://example.com",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  };

  const mockUserWithoutProfile = {
    id: "test-user-id",
    email: "test@example.com",
    displayName: "Test User",
    avatarUrl: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("Rendering", () => {
    it("should render form with user data", () => {
      render(<ProfileEditForm user={mockUser} profile={mockProfile} />);

      expect(screen.getByText("Profil Düzenle")).toBeInTheDocument();
      expect(screen.getByText("Profil bilgilerinizi güncelleyin")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Test User")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Test bio")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Test City")).toBeInTheDocument();
      expect(screen.getByDisplayValue("https://example.com")).toBeInTheDocument();
    });

    it("should render form with empty profile data", () => {
      render(<ProfileEditForm user={mockUserWithoutProfile} profile={null} />);

      expect(screen.getByDisplayValue("Test User")).toBeInTheDocument();

      const bioInput = screen.getByLabelText("Biyografi");
      const locationInput = screen.getByLabelText("Konum");
      const websiteInput = screen.getByLabelText("Website");

      expect(bioInput).toHaveValue("");
      expect(locationInput).toHaveValue("");
      expect(websiteInput).toHaveValue("");
    });

    it("should render user avatar with correct props", () => {
      render(<ProfileEditForm user={mockUser} profile={mockProfile} />);

      const avatar = screen.getByTestId("user-avatar");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("data-src", "https://example.com/avatar.jpg");
      expect(avatar).toHaveAttribute("data-name", "Test User");
      expect(avatar).toHaveAttribute("data-email", "test@example.com");
      expect(avatar).toHaveAttribute("data-size", "80");
    });

    it("should render character counters", () => {
      render(<ProfileEditForm user={mockUser} profile={mockProfile} />);

      expect(screen.getByText("9/100 karakter")).toBeInTheDocument(); // displayName length
      expect(screen.getByText("8/500 karakter")).toBeInTheDocument(); // bio length
    });

    it("should render disabled email field", () => {
      render(<ProfileEditForm user={mockUser} profile={mockProfile} />);

      const emailInput = screen.getByDisplayValue("test@example.com");
      expect(emailInput).toBeDisabled();
      expect(screen.getByText("E-posta adresi değiştirilemez")).toBeInTheDocument();
    });

    it("should render action buttons", () => {
      render(<ProfileEditForm user={mockUser} profile={mockProfile} />);

      expect(screen.getByRole("link", { name: /Geri/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /İptal/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Kaydet/i })).toBeInTheDocument();
    });
  });

  describe("Form Input Handling", () => {
    it("should update display name when typed", async () => {
      const user = userEvent.setup();
      render(<ProfileEditForm user={mockUser} profile={mockProfile} />);

      const displayNameInput = screen.getByLabelText("Görünen Ad");
      await user.clear(displayNameInput);
      await user.type(displayNameInput, "New Name");

      expect(displayNameInput).toHaveValue("New Name");
      expect(screen.getByText("8/100 karakter")).toBeInTheDocument(); // Updated counter
    });

    it("should update bio when typed", async () => {
      const user = userEvent.setup();
      render(<ProfileEditForm user={mockUser} profile={mockProfile} />);

      const bioInput = screen.getByLabelText("Biyografi");
      await user.clear(bioInput);
      await user.type(bioInput, "New bio content");

      expect(bioInput).toHaveValue("New bio content");
      expect(screen.getByText("15/500 karakter")).toBeInTheDocument(); // Updated counter
    });

    it("should update location when typed", async () => {
      const user = userEvent.setup();
      render(<ProfileEditForm user={mockUser} profile={mockProfile} />);

      const locationInput = screen.getByLabelText("Konum");
      await user.clear(locationInput);
      await user.type(locationInput, "New City");

      expect(locationInput).toHaveValue("New City");
    });

    it("should update website when typed", async () => {
      const user = userEvent.setup();
      render(<ProfileEditForm user={mockUser} profile={mockProfile} />);

      const websiteInput = screen.getByLabelText("Website");
      await user.clear(websiteInput);
      await user.type(websiteInput, "https://newsite.com");

      expect(websiteInput).toHaveValue("https://newsite.com");
    });

    it("should respect maxLength constraints", async () => {
      const user = userEvent.setup();
      render(<ProfileEditForm user={mockUser} profile={mockProfile} />);

      const displayNameInput = screen.getByLabelText("Görünen Ad");
      const longName = "a".repeat(101);
      await user.clear(displayNameInput);
      await user.type(displayNameInput, longName);

      // Should be truncated to 100 characters
      expect(displayNameInput).toHaveValue("a".repeat(100));
    });
  });

  describe("Form Submission", () => {
    it("should submit form successfully when display name changes", async () => {
      const user = userEvent.setup();
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ message: "Display name updated" }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ message: "Profile updated" }),
        });

      render(<ProfileEditForm user={mockUser} profile={mockProfile} />);

      const displayNameInput = screen.getByLabelText("Görünen Ad");
      await user.clear(displayNameInput);
      await user.type(displayNameInput, "New Name");

      const submitButton = screen.getByRole("button", { name: /Kaydet/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledTimes(2);
      });

      expect(mockFetch).toHaveBeenNthCalledWith(1, "/api/profil/gorunen-ad-guncelle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ displayName: "New Name" }),
      });

      expect(mockFetch).toHaveBeenNthCalledWith(2, "/api/profil/guncelle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio: "Test bio",
          location: "Test City",
          website: "https://example.com",
        }),
      });
    });

    it("should submit form successfully when only profile data changes", async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ message: "Profile updated" }),
      });

      render(<ProfileEditForm user={mockUser} profile={mockProfile} />);

      const bioInput = screen.getByLabelText("Biyografi");
      await user.clear(bioInput);
      await user.type(bioInput, "Updated bio");

      const submitButton = screen.getByRole("button", { name: /Kaydet/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });

      expect(mockFetch).toHaveBeenCalledWith("/api/profil/guncelle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio: "Updated bio",
          location: "Test City",
          website: "https://example.com",
        }),
      });
    });

    it("should show loading state during submission", async () => {
      const user = userEvent.setup();
      mockFetch.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));

      render(<ProfileEditForm user={mockUser} profile={mockProfile} />);

      const submitButton = screen.getByRole("button", { name: /Kaydet/i });
      await user.click(submitButton);

      expect(screen.getByText("Kaydediliyor...")).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    it("should handle display name update error", async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: "Display name error" }),
      });

      const { toast } = await import("sonner");
      render(<ProfileEditForm user={mockUser} profile={mockProfile} />);

      const displayNameInput = screen.getByLabelText("Görünen Ad");
      await user.clear(displayNameInput);
      await user.type(displayNameInput, "New Name");

      const submitButton = screen.getByRole("button", { name: /Kaydet/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("Display name güncellenirken bir hata oluştu");
      });
    });

    it("should handle profile update error", async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: "Profile update error" }),
      });

      const { toast } = await import("sonner");
      render(<ProfileEditForm user={mockUser} profile={mockProfile} />);

      const bioInput = screen.getByLabelText("Biyografi");
      await user.clear(bioInput);
      await user.type(bioInput, "Updated bio");

      const submitButton = screen.getByRole("button", { name: /Kaydet/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("Profile update error");
      });
    });

    it("should handle network error", async () => {
      const user = userEvent.setup();
      mockFetch.mockRejectedValue(new Error("Network error"));

      const { toast } = await import("sonner");
      render(<ProfileEditForm user={mockUser} profile={mockProfile} />);

      const submitButton = screen.getByRole("button", { name: /Kaydet/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("Network error");
      });
    });

    it("should show success message on successful submission", async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ message: "Profile updated" }),
      });

      const { toast } = await import("sonner");
      render(<ProfileEditForm user={mockUser} profile={mockProfile} />);

      const submitButton = screen.getByRole("button", { name: /Kaydet/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith("Profil başarıyla güncellendi");
      });
    });
  });

  describe("Form Validation", () => {
    it("should prevent form submission when submitting", async () => {
      const user = userEvent.setup();
      mockFetch.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));

      render(<ProfileEditForm user={mockUser} profile={mockProfile} />);

      const submitButton = screen.getByRole("button", { name: /Kaydet/i });
      await user.click(submitButton);

      // Button should be disabled during submission
      expect(submitButton).toBeDisabled();

      // Clicking again should not trigger another submission
      await user.click(submitButton);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it("should handle form submission with empty values", async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ message: "Profile updated" }),
      });

      render(<ProfileEditForm user={mockUserWithoutProfile} profile={null} />);

      const submitButton = screen.getByRole("button", { name: /Kaydet/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith("/api/profil/guncelle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bio: "",
            location: "",
            website: "",
          }),
        });
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper form labels", () => {
      render(<ProfileEditForm user={mockUser} profile={mockProfile} />);

      expect(screen.getByLabelText("Görünen Ad")).toBeInTheDocument();
      expect(screen.getByLabelText("Biyografi")).toBeInTheDocument();
      expect(screen.getByLabelText("Konum")).toBeInTheDocument();
      expect(screen.getByLabelText("Website")).toBeInTheDocument();
      expect(screen.getByLabelText("E-posta")).toBeInTheDocument();
    });

    it("should have proper form structure", () => {
      render(<ProfileEditForm user={mockUser} profile={mockProfile} />);

      // Form doesn't have a role="form" attribute, so we check for the form element by tag
      const form = document.querySelector("form");
      expect(form).toBeInTheDocument();

      const submitButton = screen.getByRole("button", { name: /Kaydet/i });
      expect(submitButton).toHaveAttribute("type", "submit");
    });

    it("should have proper input types", () => {
      render(<ProfileEditForm user={mockUser} profile={mockProfile} />);

      const websiteInput = screen.getByLabelText("Website");
      expect(websiteInput).toHaveAttribute("type", "url");

      const emailInput = screen.getByLabelText("E-posta");
      // Email input doesn't have explicit type attribute, so it defaults to text
      expect(emailInput).not.toHaveAttribute("type", "email");
    });
  });

  describe("Edge Cases", () => {
    it("should handle user with null values", () => {
      const userWithNulls = {
        id: "test-user-id",
        email: null,
        displayName: null,
        avatarUrl: null,
      };

      render(<ProfileEditForm user={userWithNulls} profile={null} />);

      const displayNameInput = screen.getByLabelText("Görünen Ad");
      const emailInput = screen.getByLabelText("E-posta");

      expect(displayNameInput).toHaveValue("");
      expect(emailInput).toHaveValue("");
    });

    it("should handle profile with null values", () => {
      const profileWithNulls = {
        user_id: "test-user-id",
        bio: null,
        location: null,
        website: null,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      };

      render(<ProfileEditForm user={mockUser} profile={profileWithNulls} />);

      const bioInput = screen.getByLabelText("Biyografi");
      const locationInput = screen.getByLabelText("Konum");
      const websiteInput = screen.getByLabelText("Website");

      expect(bioInput).toHaveValue("");
      expect(locationInput).toHaveValue("");
      expect(websiteInput).toHaveValue("");
    });

    it("should update character counters correctly", async () => {
      const user = userEvent.setup();
      render(<ProfileEditForm user={mockUser} profile={mockProfile} />);

      const bioInput = screen.getByLabelText("Biyografi");
      await user.clear(bioInput);
      await user.type(bioInput, "Short");

      expect(screen.getByText("5/500 karakter")).toBeInTheDocument();
    });
  });
});
