import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders app title", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /Yalnız Olmaz/i })).toBeInTheDocument();
  });
});
