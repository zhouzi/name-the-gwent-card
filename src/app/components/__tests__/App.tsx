import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";

test("renders App", () => {
  render(<App />);
  const paragraph = screen.getByText(/hello world/i);
  expect(paragraph).toBeInTheDocument();
});
