import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ReadingProgress } from "./ReadingProgress";

describe("ReadingProgress", () => {
  it("renders progress bar container", () => {
    const { container } = render(<ReadingProgress />);
    const bar = container.querySelector("div");
    expect(bar).toBeTruthy();
  });
});
