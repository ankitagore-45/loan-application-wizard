import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Select from "../components/common/Select";

test("renders select label", () => {
  render(
    <Select
      id="city"
      label="City"
      options={[{ value: "pune", label: "Pune" }]}
    />
  );

  expect(screen.getByText("City")).toBeInTheDocument();
});