import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders the Next.js logo and docs link", () => {
    render(<Home />);
    expect(screen.getByAltText(/Next\.js logo/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Read our docs/i })).toBeInTheDocument();
  });
});
