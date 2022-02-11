import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ThemeButton from "./ThemeButton";
import { ThemeProvider } from "react-jss";

describe(ThemeButton.name, () => {
  it("renders a button with `Switch to dark theme` label", () => {
    render(
      <ThemeProvider theme={{ type: "light" }}>
        <ThemeButton />
      </ThemeProvider>
    );
    expect(
      screen.getByRole("button", { name: "Switch to dark theme" })
    ).toBeInTheDocument();
  });
  it("calls `theme.toggle` on click", () => {
    const toggle = jest.fn();
    render(
      <ThemeProvider theme={{ type: "light", toggle }}>
        <ThemeButton />
      </ThemeProvider>
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Switch to dark theme" })
    );
    expect(toggle).toHaveBeenCalled();
  });
  it("renders a button with `Switch to light theme` label", () => {
    render(
      <ThemeProvider theme={{ type: "dark" }}>
        <ThemeButton />
      </ThemeProvider>
    );
    expect(
      screen.getByRole("button", { name: "Switch to light theme" })
    ).toBeInTheDocument();
  });
});
