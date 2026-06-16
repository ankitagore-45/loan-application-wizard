import { render, screen } from "@testing-library/react";
import Input from "../components/common/Input";

test("renders input label", () => {
  render(<Input id="name" label="Full Name" />);
  expect(screen.getByText("Full Name")).toBeInTheDocument();
});