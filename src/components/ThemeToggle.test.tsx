import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle", () => {
  test("toggles theme classes on html element", () => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add("light");
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.style.colorScheme = "light";

    // localStorage mock
    const setItem = vi.spyOn(window.localStorage.__proto__, "setItem");

    render(<ThemeToggle />);

    const btn = screen.getByRole("button");
    // click to switch to dark
    fireEvent.click(btn);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(document.documentElement.style.colorScheme).toBe("dark");
    expect(setItem).toHaveBeenCalled();
  });
});
