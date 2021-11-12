import { render, screen } from "@testing-library/react";
import Homepage from "./Homepage";

describe("Homepage", () => {
  test("homepage heading and button", () => {
    render(<Homepage />);
    const heading = screen.getByText(/Join us as we build something special/i);
    const button = screen.getByRole("button");
    const heroImage = screen.getByRole("img");
    expect(heading).toBeInTheDocument();
    expect(button).toHaveTextContent(/view open positions/i);
    expect(heroImage).toBeVisible();
  });
});
