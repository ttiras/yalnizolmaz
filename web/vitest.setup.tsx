import "@testing-library/jest-dom/vitest";
import React from "react";

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return React.createElement("img", props);
  },
}));
