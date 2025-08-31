import { render } from "@testing-library/react";
import { OptimizedVideo } from "./OptimizedVideo";

describe("OptimizedVideo", () => {
  test("renders placeholder then video element", () => {
    const { container, rerender } = render(
      <OptimizedVideo src="/videos/sample.mp4" alt="alt" caption="cap" />,
    );
    // Initially placeholder exists (showVideo=false)
    expect(container.textContent).toContain("Video will load when visible");

    // Priority true shows video immediately
    rerender(<OptimizedVideo src="/videos/sample.mp4" alt="alt" priority />);
    const video = container.querySelector("video");
    expect(video).toBeTruthy();
    expect(video).toHaveAttribute("preload", "metadata");
  });
});
