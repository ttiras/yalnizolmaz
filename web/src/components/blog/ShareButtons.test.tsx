import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ShareButtons } from "./ShareButtons";

describe("ShareButtons", () => {
  const url = "https://example.com";
  const title = "Example";

  beforeEach(() => {
    // @ts-expect-error – jsdom
    global.navigator.clipboard = { writeText: vi.fn().mockResolvedValue(undefined) };
  });

  it("renders label and buttons", () => {
    render(<ShareButtons url={url} title={title} />);
    // label
    expect(screen.getAllByText(/Paylaş/i)[0]).toBeInTheDocument();
    // twitter button has aria-label
    expect(screen.getByLabelText(/Twitter|X/i)).toBeInTheDocument();
  });

  it("copies link when device share not supported", async () => {
    const user = userEvent.setup();
    const spy = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
    render(<ShareButtons url={url} title={title} />);
    await user.click(screen.getByLabelText(/Paylaş \(cihaz\)/i));
    // falls back to copy
    expect(spy).toHaveBeenCalledWith(url);
  });
});
