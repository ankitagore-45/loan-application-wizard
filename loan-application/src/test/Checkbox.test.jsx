import { render, screen } from "@testing-library/react";
import Checkbox from "../components/common/Checkbox";

test("renders checkbox label", () => {
  render(<Checkbox id="agree" label="I agree to the terms" />);
  expect(screen.getByText("I agree to the terms")).toBeInTheDocument();
});